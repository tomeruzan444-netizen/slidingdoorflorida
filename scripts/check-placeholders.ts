import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { business, isStaging } from "../content/business";
import { ROOT, type Issue } from "./lib/content";

const PH = /\{\{([A-Z_]+)\}\}/g;

/**
 * Lists every remaining {{PLACEHOLDER}}.
 * Fails the build on Vercel production (VERCEL_ENV=production) or when STRICT_PLACEHOLDERS=1,
 * but only for placeholders a visitor could see (page copy). business.ts values are guarded by known().
 * Elsewhere it only warns, so previews keep building while owner data is pending.
 * Staging mode (SITE_STAGING=1 or placeholder domain) also only warns: that site is noindexed.
 */
export function checkPlaceholders(): Issue[] {
  const strict =
    process.env.STRICT_PLACEHOLDERS === "1" || (process.env.VERCEL_ENV === "production" && !isStaging);
  const found = new Map<string, Set<string>>();
  const add = (name: string, where: string) => {
    if (!found.has(name)) found.set(name, new Set());
    found.get(name)!.add(where);
  };

  for (const m of JSON.stringify(business).matchAll(PH)) add(m[1], "content/business.ts");
  if (business.caseNotes.length === 0) add("CASE_NOTES", "content/business.ts");

  for (const f of readdirSync(join(ROOT, "content", "pages"))) {
    for (const m of readFileSync(join(ROOT, "content", "pages", f), "utf8").matchAll(PH)) add(m[1], `content/pages/${f}`);
  }
  // <CaseNote> renders {{CASE_NOTE}} until a real story exists for that service.
  const pagesUsingCaseNote = readdirSync(join(ROOT, "content", "pages")).filter((f) =>
    /<CaseNote\b/.test(readFileSync(join(ROOT, "content", "pages", f), "utf8")),
  );
  for (const f of pagesUsingCaseNote) {
    const slug = f.replace(/\.mdx$/, "");
    if (!business.caseNotes.some((n) => n.service === slug)) add("CASE_NOTE", `content/pages/${f}`);
  }

  // business.ts values (and missing case notes) never reach visitors: components render them only when known().
  // Anything else, i.e. a placeholder typed into page copy, would show on the page, so it fails a strict build.
  const hiddenFromVisitors = (where: Set<string>, name: string) =>
    name === "CASE_NOTE" || [...where].every((w) => w === "content/business.ts");
  return [...found.entries()].map(([name, where]) => ({
    level: strict && !hiddenFromVisitors(where, name) ? "error" : "warn",
    check: "placeholders",
    msg: `{{${name}}} in ${[...where].join(", ")}${hiddenFromVisitors(where, name) ? " (hidden from visitors)" : ""}`,
  }));
}
