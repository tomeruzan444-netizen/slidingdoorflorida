import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { allPages, bodyText, mdxToText, readMdx, ROOT, type Issue } from "./lib/content";

/**
 * AI-style linter, built from CONTENT-GUIDE.md Part C.
 * error = forbidden (em dash, blocklisted words/patterns, emoji, over-threshold overuse words)
 * warn  = context-dependent words a human should eyeball
 */

const FORBIDDEN_WORDS = [
  "delve", "leverage", "elevate", "unlock", "unleash", "empower", "embark", "foster", "streamline",
  "revolutionize", "harness", "boasts?", "showcase", "underscores?",
  "seamless", "seamlessly", "robust", "comprehensive", "cutting-edge", "state-of-the-art", "top-notch",
  "world-class", "unparalleled", "unmatched", "second to none", "innovative", "meticulous", "vibrant",
  "nestled", "bustling", "pivotal", "ever-evolving", "game-changing", "hassle-free", "stress-free",
  "worry-free", "premier", "tapestry", "realm", "testament", "peace of mind", "one-stop shop",
  "your trusted partner", "look no further", "rest assured", "we pride ourselves", "above and beyond",
  "we've got you covered", "it's important to note", "it's worth noting", "in today's world",
  "at the end of the day", "a wide range of", "in the realm of", "dive into", "deep dive", "game-changer",
  "the bottom line",
];

const CONTEXT_WORDS = ["navigate", "landscape", "journey", "transform", "tailor(?:ed)?", "trusted"];

/** Allowed at most once per page. */
const OVERUSE = ["ensure", "crucial", "essential", "moreover", "furthermore", "additionally", "consequently", "notably", "indeed"];

const PATTERNS: { re: RegExp; why: string }[] = [
  { re: /\bnot just\b[^.]{0,60}\b(it's|but)\b/i, why: "negative parallelism (not just X, but Y)" },
  { re: /\bnot only\b[^.]{0,80}\bbut also\b/i, why: "negative parallelism (not only... but also)" },
  { re: /\bless about\b[^.]{0,60}\bmore about\b/i, why: "negative parallelism (less about X, more about Y)" },
  { re: /,\s+(ensuring|highlighting|underscoring|emphasizing|reflecting|showcasing|contributing to|making it)\b/i, why: "trailing -ing clause" },
  { re: /\bwhen it comes to\b/i, why: "generic opener" },
  { re: /\bin today's\b/i, why: "generic opener" },
  { re: /\b(the catch|the result|the kicker|the takeaway)\?/i, why: "rhetorical-question transition" },
  { re: /\bso what does this mean\b/i, why: "rhetorical-question transition" },
  { re: /(^|\.\s+)(in summary|in conclusion|overall|ultimately),/im, why: "section-ending summary" },
  { re: /\bwhether you're\b[^.]{0,80}\bor\b/i, why: "'Whether you're... or...' construction" },
  { re: /\b(experts say|studies show|many homeowners find|research shows)\b/i, why: "vague attribution" },
  { re: /\b(stands as|serves as)\b/i, why: "'serves as/stands as' instead of 'is'" },
  { re: /\b(plays a (vital|key|crucial) role|underscores the importance)\b/i, why: "puffery" },
  { re: /\bmay potentially\b|\bcould possibly\b/i, why: "stacked hedging" },
  { re: /near me\b/i, why: "'near me' written in text" },
];

const EMOJI = /\p{Extended_Pictographic}/u;
const EM_DASH = /—/;

const count = (text: string, word: string) => (text.match(new RegExp(`\\b${word}\\b`, "gi")) ?? []).length;

function lintText(where: string, text: string, issues: Issue[], opts: { overuse: boolean; allowNearMe?: boolean } = { overuse: true }) {
  if (EM_DASH.test(text)) issues.push({ level: "error", check: "lint", msg: `${where}: em dash found (zero allowed site-wide)` });
  if (EMOJI.test(text)) issues.push({ level: "error", check: "lint", msg: `${where}: emoji found` });
  for (const w of FORBIDDEN_WORDS) {
    if (count(text, w)) issues.push({ level: "error", check: "lint", msg: `${where}: blocklisted "${w.replace("?", "")}"` });
  }
  for (const w of CONTEXT_WORDS) {
    if (count(text, w)) issues.push({ level: "warn", check: "lint", msg: `${where}: check context of "${w}"` });
  }
  if (opts.overuse) {
    for (const w of OVERUSE) {
      const n = count(text, w);
      if (n > 1) issues.push({ level: "error", check: "lint", msg: `${where}: "${w}" used ${n} times (max 1 per page)` });
    }
  }
  for (const p of PATTERNS) {
    if (opts.allowNearMe && p.why.includes("near me")) continue;
    const m = text.match(p.re);
    if (m) issues.push({ level: "error", check: "lint", msg: `${where}: ${p.why}: "...${m[0].slice(0, 70)}..."` });
  }
}

/** Title Case heading detector: 3+ capitalized non-initial words that aren't acronyms or proper nouns we use. */
const PROPER = /^(Florida|Miami|Miami-Dade|Broward|Palm|Beach|Tampa|Orlando|HVHZ|NOA|DBPR|CPSC|NFRC|FGIA|AAMA|Low-E|XO|OX|OXO|OXXO|HOA|ZIP|WCAG|I|FL|ENERGY|STAR|Delrin|Phifer|U-factor|SHGC|DP|FAQ|Google|Bing|TCPA)$/;
function lintHeadings(where: string, mdx: string, issues: Issue[]) {
  for (const line of mdx.split("\n")) {
    const m = line.match(/^#{2,4}\s+(.+)$/);
    if (!m) continue;
    const h = m[1];
    if (/:\s/.test(h)) issues.push({ level: "warn", check: "lint", msg: `${where}: colon in heading "${h}"` });
    const rest = h.split(/\s+/).slice(1).filter((w) => /^[A-Za-z]/.test(w) && w.length > 3 && !PROPER.test(w.replace(/[^A-Za-z-]/g, "")));
    const caps = rest.filter((w) => /^[A-Z]/.test(w));
    if (rest.length >= 3 && caps.length / rest.length > 0.6) issues.push({ level: "error", check: "lint", msg: `${where}: Title Case heading "${h}"` });
  }
}

/**
 * Owner rule (2026-11-26): no outbound links, no linked files, and no named sources,
 * manufacturers or competitors anywhere in visitor-facing content.
 */
const OWN_HOSTS = /^(https?:\/\/)?(www\.)?(davisslidingdoorflorida\.com|schema\.org|www\.w3\.org\/2000)/i;
const EXTERNAL_URL = /https?:\/\/[^\s"'`)<>\\]+/gi;
const BARE_DOMAIN = /\b[a-z0-9-]+\.(com|gov|org|net|edu|io|us)\b/gi;
const SOURCE_NAMES = /\b(census|american community survey|noaa|national hurricane center|fema|jeld-?wen|loewen|phifer|tuffscreen|petscreen|suntex|pgt|cgi|marvin|multislide|slimfold|contractors wardrobe|andersen|pella|milgard|building america|department of energy|irs|nfrc|fgia|aama|ansi|cpsc|dbpr|myfloridalicense|floridabuilding|up\.codes|building commission|police department|visitor bureau|home depot|lowe'?s|yelp|angi|homeadvisor|thumbtack|houzz|reddit|wikipedia)\b/i;
const CITATION = /\b(\d+ cfr \d+|florida statutes|sections? [0-9R][0-9]*[.\-][0-9]|\b\d+-\d+\([a-z0-9]+\)|rule \d+[a-z]\d*-|sources?:|according to (the )?(census|city's|county's|a |an ))/i;

function lintSourcesAndLinks(where: string, raw: string, issues: Issue[]) {
  for (const m of raw.match(EXTERNAL_URL) ?? []) {
    if (!OWN_HOSTS.test(m) && !m.includes("${")) issues.push({ level: "error", check: "lint", msg: `${where}: external link "${m.slice(0, 80)}" (no outbound links allowed)` });
  }
  for (const m of raw.replace(EXTERNAL_URL, " ").match(BARE_DOMAIN) ?? []) {
    if (!/davisslidingdoorflorida|schema\.org|w3\.org/i.test(m)) issues.push({ level: "error", check: "lint", msg: `${where}: site name "${m}" in text` });
  }
  const s = raw.match(SOURCE_NAMES);
  if (s) issues.push({ level: "error", check: "lint", msg: `${where}: named source/brand/competitor "${s[0]}"` });
  const c = raw.match(CITATION);
  if (c) issues.push({ level: "error", check: "lint", msg: `${where}: citation-style reference "${c[0]}"` });
}

export function lintContent(): Issue[] {
  const issues: Issue[] = [];
  for (const p of allPages) lintSourcesAndLinks(p.slug || "home", readMdx(p.slug), issues);
  lintSourcesAndLinks("content/faq-registry.json", readFileSync(join(ROOT, "content/faq-registry.json"), "utf8"), issues);
  lintSourcesAndLinks("content/pages.ts", readFileSync(join(ROOT, "content/pages.ts"), "utf8"), issues);
  for (const d of ["components", "components/infographics"]) {
    for (const f of readdirSync(join(ROOT, d))) if (/\.tsx$/.test(f)) lintSourcesAndLinks(`${d}/${f}`, readFileSync(join(ROOT, d, f), "utf8"), issues);
  }
  lintSourcesAndLinks("app/page.tsx", readFileSync(join(ROOT, "app/page.tsx"), "utf8"), issues);
  for (const p of allPages) {
    const where = p.slug || "home";
    // Owner rule (2026-11-26, updated): "near me" is never written anywhere on the site, city pages included.
    lintText(`${where} (body)`, bodyText(p), issues, { overuse: true });
    lintText(`${where} (meta)`, [p.metaTitle, p.description, p.h1, p.subline, p.faqHeading ?? "", p.closing ?? ""].join(" \n "), issues, { overuse: false });
    lintHeadings(where, readMdx(p.slug), issues);
    if (p.metaTitle.length > 62) issues.push({ level: "warn", check: "lint", msg: `${where}: title is ${p.metaTitle.length} chars (target ~60)` });
    if (p.description.length > 158) issues.push({ level: "warn", check: "lint", msg: `${where}: meta description is ${p.description.length} chars (target ~155)` });
    if (p.kind === "service" && p.answer) {
      const n = p.answer.split(/\s+/).length;
      if (n < 38 || n > 65) issues.push({ level: "warn", check: "lint", msg: `${where}: answer block is ${n} words (target 40-60)` });
    }
    const words = mdxToText(readMdx(p.slug)).split(/\s+/).length;
    if (p.kind !== "utility" && words < 300) issues.push({ level: "warn", check: "lint", msg: `${where}: body only ${words} words so far` });
  }

  // Visitor-facing strings in components and data files: em dash and emoji only (no per-page thresholds).
  const dirs = ["components", "components/infographics", "content", "app"];
  for (const d of dirs) {
    for (const f of readdirSync(join(ROOT, d))) {
      if (!/\.(tsx?|json)$/.test(f)) continue;
      const text = readFileSync(join(ROOT, d, f), "utf8");
      if (EM_DASH.test(text)) issues.push({ level: "error", check: "lint", msg: `${d}/${f}: em dash found` });
      if (/\.tsx$/.test(f) && d.includes("infographics")) lintText(`${d}/${f}`, text.replace(/(className|transform|d|viewBox)="[^"]*"/g, ""), issues, { overuse: false });
    }
  }
  return issues;
}
