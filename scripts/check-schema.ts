import { allPages, type Issue } from "./lib/content";
import { business } from "../content/business";
import { faqsFor } from "../lib/faqs";
import { graphFor } from "../lib/schema";

type Node = Record<string, unknown>;

const REQUIRED: Record<string, string[]> = {
  Organization: ["@id", "name", "url"],
  WebSite: ["@id", "url", "name"],
  WebPage: ["@id", "url", "name"],
  // No "address": this is a service-area business (business.serviceAreaType).
  HomeAndConstructionBusiness: ["@id", "name", "telephone", "url", "areaServed"],
  Service: ["serviceType", "provider", "areaServed"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
};

/** JSON-LD is valid JSON, carries required properties, matches business.ts, and never fakes reviews. */
export function checkSchema(): Issue[] {
  const issues: Issue[] = [];
  for (const p of allPages) {
    const where = p.slug || "home";
    const graph = graphFor(p, faqsFor(p.slug));
    const json = JSON.stringify(graph);
    try { JSON.parse(json); } catch { issues.push({ level: "error", check: "schema", msg: `${where}: invalid JSON-LD` }); continue; }
    if (/aggregateRating|"review"/i.test(json)) issues.push({ level: "error", check: "schema", msg: `${where}: review/aggregateRating markup is not allowed without real reviews` });

    const nodes = (graph["@graph"] as Node[]) ?? [];
    for (const n of nodes) {
      const type = String(n["@type"]);
      for (const key of REQUIRED[type] ?? []) {
        if (n[key] === undefined) issues.push({ level: "error", check: "schema", msg: `${where}: ${type} missing ${key}` });
      }
      if ((type === "Organization" || type === "HomeAndConstructionBusiness") && n.name !== business.brandName) {
        issues.push({ level: "error", check: "schema", msg: `${where}: ${type}.name doesn't match business.ts` });
      }
      if (type === "HomeAndConstructionBusiness" && n.telephone !== business.phoneE164) {
        issues.push({ level: "error", check: "schema", msg: `${where}: telephone doesn't match business.ts` });
      }
      if (type === "FAQPage") {
        const q = (n.mainEntity as Node[]).length;
        if (q !== faqsFor(p.slug).length) issues.push({ level: "error", check: "schema", msg: `${where}: FAQPage count differs from visible FAQ` });
      }
    }
    const types = nodes.map((n) => n["@type"]);
    if (p.kind === "home" && !types.includes("HomeAndConstructionBusiness")) issues.push({ level: "error", check: "schema", msg: "home: missing LocalBusiness" });
    if ((p.kind === "service" || p.kind === "city") && !types.includes("Service")) issues.push({ level: "error", check: "schema", msg: `${where}: missing Service` });
    if (p.kind !== "home" && !types.includes("BreadcrumbList")) issues.push({ level: "error", check: "schema", msg: `${where}: missing BreadcrumbList` });
  }
  return issues;
}
