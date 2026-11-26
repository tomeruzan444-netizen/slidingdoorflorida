import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { business } from "../content/business";
import { ROOT, type Issue } from "./lib/content";

const PH = /\{\{([A-Z_]+)\}\}/g;

/**
 * Lists every remaining {{PLACEHOLDER}}.
 * Fails the build on Vercel production (VERCEL_ENV=production) or when STRICT_PLACEHOLDERS=1.
 * Elsewhere it only warns, so previews keep building while owner data is pending.
 */
export function checkPlaceholders(): Issue[] {
  const strict = process.env.VERCEL_ENV === "production" || process.env.STRICT_PLACEHOLDERS === "1";
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

  return [...found.entries()].map(([name, where]) => ({
    level: strict ? "error" : "warn",
    check: "placeholders",
    msg: `{{${name}}} in ${[...where].join(", ")}`,
  }));
}
