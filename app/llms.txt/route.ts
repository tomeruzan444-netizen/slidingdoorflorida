import { business, siteUrl } from "@/content/business";
import { pages, pathFor } from "@/content/pages";

export const dynamic = "force-static";

/** Short business summary for LLM tools. Google has said it doesn't use llms.txt; it replaces nothing else. */
export function GET() {
  const services = pages.filter((p) => p.kind !== "utility");
  const body = [
    `# ${business.brandName}`,
    "",
    `> Sliding glass door repair and replacement in Florida (Florida only). Phone: ${business.phone}. License: ${business.licenseType} #${business.licenseNumber}.`,
    "",
    "## Services",
    ...services.map((p) => `- [${p.h1}](${siteUrl}${pathFor(p.slug)}): ${p.description}`),
    "",
    "## Company",
    `- [About](${siteUrl}/about)`,
    `- [Contact and quote](${siteUrl}/contact)`,
    "",
    `Service areas: ${business.serviceAreas.join(", ")}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
