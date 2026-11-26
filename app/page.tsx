import Link from "next/link";
import { business, telHref } from "@/content/business";
import { pageBySlug } from "@/content/pages";
import { faqsFor } from "@/lib/faqs";
import { metadataFor } from "@/lib/meta";
import { graphFor } from "@/lib/schema";
import { CtaBand, Faq, JsonLd, TrustStrip } from "@/components/Bits";
import { PhoneIcon } from "@/components/Icons";
import Body from "@/content/pages/home.mdx";

const page = pageBySlug("")!;
export const metadata = metadataFor(page);

export default function Home() {
  const faqs = faqsFor("");
  return (
    <>
      <JsonLd data={graphFor(page, faqs)} />
      <section className="relative overflow-hidden border-b border-alu/70 bg-gradient-to-br from-sea via-sea-soft to-sand">
        {/* Headline and CTA are real HTML from first paint; the glass panels only slide over them. */}
        <div className="relative z-0 mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
          <p className="config-label">{page.ogLabel}</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.3rem,1.5rem+3.6vw,4rem)] font-bold leading-[1.05]">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg text-frame-soft sm:text-xl">{page.subline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={telHref} className="inline-flex items-center gap-2 rounded bg-bronze px-5 py-3.5 text-lg font-semibold text-white no-underline hover:bg-bronze-dark">
              <PhoneIcon className="h-5 w-5" /> Call {business.phone}
            </a>
            <Link href="#symptoms" className="rounded border border-teal bg-white/80 px-5 py-3.5 text-lg font-semibold text-teal no-underline hover:bg-white">
              Find your symptom
            </Link>
          </div>
          <div className="max-w-4xl"><TrustStrip /></div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
          <div className="hero-glass hero-glass--left" />
          <div className="hero-glass hero-glass--right" />
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[7px] border-y-[1.5px] border-alu" />
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="prose-door home-prose">
          <Body />
        </div>
        <div className="max-w-3xl">
          <Faq items={faqs} heading={page.faqHeading ?? "Questions"} />
          {page.closing && <CtaBand text={page.closing} />}
        </div>
      </div>
    </>
  );
}
