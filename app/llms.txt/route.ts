import { business, countyList, serviceCities, siteUrl } from "@/content/business";
import { pages, pathFor } from "@/content/pages";

export const dynamic = "force-static";

/** Short business summary for LLM tools. Google has said it doesn't use llms.txt; it replaces nothing else. */
export function GET() {
  const services = pages.filter((p) => p.kind !== "utility");
  const body = [
    `# ${business.brandName}`,
    "",
    `> ${business.about} Service area: ${countyList}, Florida. Phone: ${business.phone}. Email: ${business.email}. License: ${business.licenseType} #${business.licenseNumber}.`,
    "",
    "## Services",
    ...services.map((p) => `- [${p.h1}](${siteUrl}${pathFor(p.slug)}): ${p.description}`),
    "",
    "## Company",
    `- [About](${siteUrl}/about)`,
    `- [Contact and quote](${siteUrl}/contact)`,
    "",
    `## Service areas (${serviceCities.length} cities)`,
    ...business.serviceAreas.map((c) => `- ${c.county}: ${c.cities.map((x) => x.name).join(", ")}`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
