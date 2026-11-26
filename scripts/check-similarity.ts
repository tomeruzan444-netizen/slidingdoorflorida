import { allPages, bodyText, type Issue } from "./lib/content";

const MAX = 0.15;
const N = 5;

const words = (t: string) => t.toLowerCase().replace(/[^a-z0-9' ]+/g, " ").split(/\s+/).filter(Boolean);
const shingles = (t: string) => {
  const w = words(t);
  const s = new Set<string>();
  for (let i = 0; i + N <= w.length; i++) s.add(w.slice(i, i + N).join(" "));
  return s;
};

/** Pairwise 5-word-shingle Jaccard on body content. Fails above 15%. */
export function checkSimilarity(): Issue[] {
  const issues: Issue[] = [];
  const items = allPages
    .map((p) => ({ slug: p.slug || "home", sh: shingles(bodyText(p)) }))
    .filter((x) => x.sh.size > 50);
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j];
      const shared = [...a.sh].filter((s) => b.sh.has(s));
      const jac = shared.length / (a.sh.size + b.sh.size - shared.length);
      if (jac > MAX) {
        issues.push({ level: "error", check: "similarity", msg: `${a.slug} vs ${b.slug}: ${(jac * 100).toFixed(1)}% overlap. Shared: "${shared.slice(0, 8).join('" | "')}"` });
      } else if (jac > MAX * 0.6) {
        issues.push({ level: "warn", check: "similarity", msg: `${a.slug} vs ${b.slug}: ${(jac * 100).toFixed(1)}% overlap (limit 15%)` });
      }
    }
  }
  return issues;
}
