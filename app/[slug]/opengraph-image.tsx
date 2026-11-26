import { pageBySlug, pages } from "@/content/pages";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Page preview";

export function generateStaticParams() {
  return pages.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = pageBySlug((await params).slug);
  return renderOg(p?.h1 ?? "Sliding door repair in Florida", p?.ogLabel ?? "XO");
}
