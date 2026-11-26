import { business, known, serviceCities, siteUrl } from "@/content/business";
import { pages, pathFor } from "@/content/pages";

export const dynamic = "force-static";

/** Short business summary for LLM tools. Google has said it doesn't use llms.txt; it replaces nothing else. */
export function GET() {
  const services = pages.filter((p) => p.kind === "home" || p.kind === "service");
  const cities = pages.filter((p) => p.kind === "city");
  const body = [
    `# ${business.brandName}`,
    "",
    `> ${business.about} Service area: Florida (crews statewide, based in ${business.homeBase}). Phone: ${business.phone}. Email: ${business.email}.${known(business.licenseNumber) ? ` License: ${business.licenseType} #${business.licenseNumber}.` : ""}`,
    "",
    "## Services",
    ...services.map((p) => `- [${p.h1}](${siteUrl}${pathFor(p.slug)}): ${p.description}`),
    "",
    ...(cities.length ? ["## City pages", ...cities.map((p) => `- [${p.h1}](${siteUrl}${pathFor(p.slug)})`), ""] : []),
    "## Company",
    `- [About](${siteUrl}/about)`,
    `- [Contact and quote](${siteUrl}/contact)`,
    "",
    `## Some of the cities we serve (${serviceCities.length} listed; crews work across Florida)`,
    ...business.serviceAreas.map((c) => `- ${c.county}: ${c.cities.map((x) => x.name).join(", ")}`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
