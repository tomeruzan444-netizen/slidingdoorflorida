import { notFound } from "next/navigation";
import { pageBySlug, pages } from "@/content/pages";
import { metadataFor } from "@/lib/meta";
import { PageShell } from "@/components/PageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = pageBySlug((await params).slug);
  return page ? metadataFor(page) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page) notFound();
  const { default: Body } = await import(`@/content/pages/${slug}.mdx`);
  return (
    <PageShell page={page} faqHeading={page.faqHeading} closing={page.closing}>
      <Body />
    </PageShell>
  );
}
