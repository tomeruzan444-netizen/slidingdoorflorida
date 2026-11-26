import { allPages, contextualLinks, readMdx, type Issue } from "./lib/content";
import { pathFor } from "../content/pages";
import { services } from "../content/services";

const MIN_INBOUND = 2;
const MAX_OUTBOUND = 8;

/** No broken internal links; every service page has >= 2 contextual inbound links from other pages' body text. */
export function checkLinks(): Issue[] {
  const issues: Issue[] = [];
  const valid = new Set(allPages.map((p) => pathFor(p.slug)));
  const inbound = new Map<string, Set<string>>();

  for (const p of allPages) {
    const from = pathFor(p.slug);
    const links = contextualLinks(readMdx(p.slug));
    for (const l of links) {
      if (!valid.has(l)) issues.push({ level: "error", check: "links", msg: `${from} links to missing page ${l}` });
      if (l !== from) {
        if (!inbound.has(l)) inbound.set(l, new Set());
        inbound.get(l)!.add(from);
      }
    }
    const uniqueOut = new Set(links.filter((l) => l !== from));
    if (p.kind === "service" && uniqueOut.size > MAX_OUTBOUND) {
      issues.push({ level: "warn", check: "links", msg: `${from} has ${uniqueOut.size} contextual internal links (max ${MAX_OUTBOUND})` });
    }
    if (p.kind === "service" && !links.includes("/")) {
      issues.push({ level: "error", check: "links", msg: `${from} never links back to the homepage in its body text` });
    }
  }

  // Sidebar relationships must point at real pages too.
  for (const s of services) for (const r of s.related) {
    if (!valid.has(pathFor(r.slug))) issues.push({ level: "error", check: "links", msg: `services.ts: ${s.slug} relates to missing page "${r.slug}"` });
  }

  for (const p of allPages.filter((p) => p.kind === "service")) {
    const path = pathFor(p.slug);
    const from = inbound.get(path) ?? new Set();
    if (from.size < MIN_INBOUND) {
      issues.push({ level: "error", check: "links", msg: `orphan: ${path} has ${from.size} contextual inbound link(s) (need ${MIN_INBOUND})${from.size ? `: ${[...from].join(", ")}` : ""}` });
    }
    if (!from.has("/")) issues.push({ level: "error", check: "links", msg: `${path} is not linked from the homepage body` });
  }
  return issues;
}
