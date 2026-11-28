import type { PageEntry } from "@/content/pages";
import { faqsFor } from "@/lib/faqs";
import { graphFor } from "@/lib/schema";
import { Breadcrumbs, CtaBand, Faq, JsonLd, ReviewLine, TrustStrip } from "./Bits";
import { Sidebar } from "./Sidebar";
import { ExpertByline } from "./Expert";
import { QuoteCard } from "./QuoteCard";

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
          {/* Owner rule (2026-11-28): the quote form comes directly after the H1 on every page. */}
          <QuoteCard className="mt-5 sm:max-w-3xl" />
          {!isContact && <p className="mt-6 max-w-2xl text-lg text-frame-soft sm:text-xl">{page.subline}</p>}
          {isService && <div className="max-w-4xl"><TrustStrip /></div>}
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
