import { checkFaqs } from "./check-faqs";
import { checkLinks } from "./check-links";
import { checkPlaceholders } from "./check-placeholders";
import { checkSchema } from "./check-schema";
import { checkSimilarity } from "./check-similarity";
import { lintContent } from "./lint-content";
import { report, type Issue } from "./lib/content";

const checks: [string, () => Issue[]][] = [
  ["Cross-page similarity (5-gram Jaccard, max 15%)", checkSimilarity],
  ["AI-style linter (CONTENT-GUIDE Part C)", lintContent],
  ["FAQ registry", checkFaqs],
  ["Internal links and orphans", checkLinks],
  ["Schema (JSON-LD)", checkSchema],
  ["Placeholders", checkPlaceholders],
];

let errors = 0;
let warnings = 0;
for (const [name, fn] of checks) {
  const issues = fn();
  const e = issues.filter((i) => i.level === "error").length;
  const w = issues.length - e;
  errors += e;
  warnings += w;
  console.log(`\n${e ? "FAIL" : "PASS"}  ${name}${w ? `  (${w} warning${w > 1 ? "s" : ""})` : ""}`);
  report(issues);
}
console.log(`\nQC: ${errors} error(s), ${warnings} warning(s)\n`);
if (errors) process.exit(1);
