import { allPages, type Issue } from "./lib/content";
import { allFaqs } from "../lib/faqs";

const STOP = new Set("a an the is are do does can i my you your to of for in on it and or how what why when should will be with if much does".split(" "));
const tokens = (q: string) => new Set(q.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)));
const jaccard = (a: Set<string>, b: Set<string>) => {
  const inter = [...a].filter((x) => b.has(x)).length;
  return inter / (a.size + b.size - inter || 1);
};

/** No duplicate (or near-duplicate) questions anywhere; 8-15 per page; answers 25-60 words. */
export function checkFaqs(): Issue[] {
  const issues: Issue[] = [];
  const map = allFaqs();
  const flat: { page: string; q: string; t: Set<string> }[] = [];

  for (const [page, list] of Object.entries(map)) {
    if (!allPages.some((p) => (p.slug || "home") === page)) issues.push({ level: "error", check: "faq", msg: `registry key "${page}" has no matching page` });
    for (const f of list) {
      flat.push({ page, q: f.q, t: tokens(f.q) });
      const n = f.a.split(/\s+/).length;
      if (n < 20 || n > 70) issues.push({ level: "warn", check: "faq", msg: `${page}: answer is ${n} words (target 25-60): "${f.q}"` });
      if (f.a.toLowerCase().startsWith("great question")) issues.push({ level: "error", check: "faq", msg: `${page}: answer restates/flatters: "${f.q}"` });
    }
  }
  for (const p of allPages.filter((p) => p.kind !== "utility")) {
    const n = (map[p.slug || "home"] ?? []).length;
    if (n < 8 || n > 15) issues.push({ level: "error", check: "faq", msg: `${p.slug || "home"}: ${n} FAQs (need 8-15)` });
  }
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      const s = jaccard(flat[i].t, flat[j].t);
      if (flat[i].q.trim().toLowerCase() === flat[j].q.trim().toLowerCase() || s >= 0.7) {
        issues.push({ level: "error", check: "faq", msg: `duplicate: "${flat[i].q}" (${flat[i].page}) ~ "${flat[j].q}" (${flat[j].page})` });
      } else if (s >= 0.5 && flat[i].page !== flat[j].page) {
        issues.push({ level: "warn", check: "faq", msg: `similar: "${flat[i].q}" (${flat[i].page}) ~ "${flat[j].q}" (${flat[j].page})` });
      }
    }
  }
  return issues;
}
