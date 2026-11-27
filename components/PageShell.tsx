import Link from "next/link";
import { business, telHref } from "@/content/business";
import type { PageEntry } from "@/content/pages";
import { faqsFor } from "@/lib/faqs";
import { graphFor } from "@/lib/schema";
import { Breadcrumbs, CtaBand, Faq, JsonLd, ReviewLine, TrustStrip } from "./Bits";
import { Sidebar } from "./Sidebar";
import { ExpertByline } from "./Expert";
import { PhoneIcon } from "./Icons";
import { QuoteForm } from "./QuoteForm";

type Props = {
  page: PageEntry;
  children: React.ReactNode;
  faqHeading?: string;
  closing?: string;
};

/** Layout for every page except the homepage: hero, answer block, body + sidebar, FAQ, closing CTA. */
export function PageShell({ page, children, faqHeading, closing }: Props) {
  const faqs = faqsFor(page.slug);
  const isService = page.kind === "service" || page.kind === "city";
  const isContact = page.slug === "contact";
  const showRelated = isService || page.slug === "about" || page.slug === "contact";
  return (
    <>
      <JsonLd data={graphFor(page, faqs)} />
      <div className="border-b border-alu/70 bg-gradient-to-b from-sea-soft to-sand">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6">
          <Breadcrumbs name={page.breadcrumb} />
          {page.ogLabel && <p className="config-label mt-8">{page.ogLabel}</p>}
          <h1 className="mt-3 max-w-3xl text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] font-bold">{page.h1}</h1>
          {isContact ? (
            // Contact page: the quote form sits directly under the H1, as the first thing on the page.
            <section
              id="quote"
              aria-labelledby="quote-heading"
              className="-mx-4 mt-6 scroll-mt-24 border-t-4 border-bronze bg-white px-4 py-6 shadow-[0_24px_60px_-28px_rgb(28_38_38/0.5)] ring-1 ring-alu/50 sm:mx-0 sm:max-w-3xl sm:rounded-2xl sm:p-8"
            >
              <p className="config-label">GET A QUOTE</p>
              <h2 id="quote-heading" className="mt-1 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-extrabold">
                Tell us what your door <span className="text-bronze">is doing</span>
              </h2>
              <p className="mt-2 text-frame-soft">{page.subline}</p>
              <div className="mt-5">
                <QuoteForm wide />
              </div>
              <a href={telHref} className="mt-5 inline-flex items-center gap-2 font-bold text-teal no-underline hover:underline">
                <PhoneIcon className="h-4 w-4" /> Rather talk? Call {business.phone}
              </a>
            </section>
          ) : (
            <p className="mt-4 max-w-2xl text-lg text-frame-soft sm:text-xl">{page.subline}</p>
          )}
          {isService && (
            <>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={telHref} className="inline-flex items-center gap-2 rounded bg-bronze px-5 py-3 font-semibold text-white no-underline hover:bg-bronze-dark">
                  <PhoneIcon /> Call {business.phone}
                </a>
                <Link href="/contact#quote" className="rounded border border-teal bg-white px-5 py-3 font-semibold text-teal no-underline hover:bg-sea-soft">
                  Get a quote
                </Link>
              </div>
              <div className="max-w-4xl"><TrustStrip /></div>
            </>
          )}
          {isService && <ExpertByline />}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <article className="min-w-0">
          {page.answer && (
            <div className="mb-10 max-w-2xl border-l-[5px] border-double border-teal bg-white/70 py-4 pl-5 pr-4">
              <p className="config-label">SHORT ANSWER</p>
              <p className="mt-2 text-[1.08rem] leading-relaxed">{page.answer}</p>
            </div>
          )}
          <div className="prose-door">{children}</div>
          {faqHeading && <Faq items={faqs} heading={faqHeading} />}
          {closing && <CtaBand text={closing} />}
          <ReviewLine date={page.updated} />
        </article>
        <Sidebar slug={page.slug} showRelated={showRelated} />
      </div>
    </>
  );
}
