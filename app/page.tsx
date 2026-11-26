import Image from "next/image";
import Link from "next/link";
import { business, telHref } from "@/content/business";
import { pageBySlug } from "@/content/pages";
import { faqsFor } from "@/lib/faqs";
import { metadataFor } from "@/lib/meta";
import { graphFor } from "@/lib/schema";
import { CtaBand, Faq, JsonLd, TrustStrip } from "@/components/Bits";
import { PhoneIcon } from "@/components/Icons";
import Body from "@/content/pages/home.mdx";
import heroImage from "@/public/images/sliding-door-repair-florida.jpg";

const page = pageBySlug("")!;
export const metadata = metadataFor(page);

export default function Home() {
  const faqs = faqsFor("");
  return (
    <>
      <JsonLd data={graphFor(page, faqs)} />
      <section className="relative overflow-hidden border-b border-alu/70 bg-gradient-to-br from-sea via-sea-soft to-sand">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10 lg:pt-14">
          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-12">
            {/* Text first in the HTML; on mobile the photo is moved above it visually. */}
            <div>
              <p className="config-label">{page.ogLabel}</p>
              <h1 className="mt-3 text-[clamp(2.2rem,1.4rem+2.4vw,3.5rem)] font-bold leading-[1.05]">{page.h1}</h1>
              <p className="mt-5 max-w-xl text-lg text-frame-soft sm:text-xl">{page.subline}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={telHref} className="inline-flex items-center gap-2 rounded bg-bronze px-5 py-3.5 text-lg font-semibold text-white no-underline hover:bg-bronze-dark">
                  <PhoneIcon className="h-5 w-5" /> Call {business.phone}
                </a>
                <Link href="#symptoms" className="rounded border border-teal bg-white/80 px-5 py-3.5 text-lg font-semibold text-teal no-underline hover:bg-white">
                  Find your symptom
                </Link>
              </div>
            </div>
            {/* The photo sits in a door frame on a track; two glass panels slide open to reveal it. */}
            <div className="order-first lg:order-last">
              <div className="panel-track">
                <div className="hero-frame group relative aspect-[3/2] overflow-hidden sm:aspect-[16/10]">
                  <Image
                    src={heroImage}
                    alt="Technician kneeling at the bottom rail of a sliding glass door, adjusting it with a screwdriver, with a waterfront patio outside"
                    fill
                    priority
                    placeholder="blur"
                    sizes="(min-width: 1152px) 600px, (min-width: 1024px) 52vw, 100vw"
                    className="object-cover object-[30%_50%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div aria-hidden="true" className="hero-glass hero-glass--left" />
                  <div aria-hidden="true" className="hero-glass hero-glass--right" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-8"><TrustStrip /></div>
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
