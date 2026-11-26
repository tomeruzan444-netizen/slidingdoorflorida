import Link from "next/link";
import { business, countyList, isPlaceholder, known, telHref } from "@/content/business";
import type { Faq as FaqItem } from "@/lib/schema";

export function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-frame-soft">
        <li>
          <Link href="/" className="text-teal underline-offset-4 hover:underline">Home</Link>
        </li>
        <li aria-hidden="true" className="text-alu">//</li>
        <li aria-current="page" className="text-frame">{name}</li>
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Faq({ items, heading }: { items: FaqItem[]; heading: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="faq mt-16">
      <p className="config-label">FAQ</p>
      <h2 id="faq-heading" className="mt-2 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)]">{heading}</h2>
      <div className="mt-5 border-t border-alu">
        {items.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <div>
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Real data only: every value comes from business.ts. */
export function TrustStrip() {
  // Only facts the owner has supplied. A missing license or insurance line is left out, never shown as a placeholder.
  const items = [
    { k: "Founded by", v: business.founderName },
    { k: "Experience", v: known(business.yearsInBusiness) ? `${business.yearsInBusiness} years on sliding doors` : "" },
    { k: "License", v: known(business.licenseNumber) ? `${business.licenseType} #${business.licenseNumber}` : "" },
    { k: "Insurance", v: business.insurance },
    { k: "Service area", v: countyList },
  ].filter((i) => known(i.v));
  return (
    <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y-[5px] border-double border-alu py-3 text-sm sm:grid-cols-4">
      {items.slice(0, 4).map((i) => (
        <li key={i.k}>
          <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">{i.k}</span>
          <span className="text-frame">{i.v}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({ text }: { text: string }) {
  return (
    <section className="mt-16 rounded border border-alu bg-sea px-5 py-7 sm:px-8" aria-label="Contact">
      <p className="max-w-xl text-lg text-frame">{text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href={telHref} className="rounded bg-bronze px-5 py-3 font-semibold text-white no-underline hover:bg-bronze-dark">
          Call {business.phone}
        </a>
        <Link href="/contact#quote" className="rounded border border-teal bg-white px-5 py-3 font-semibold text-teal no-underline hover:bg-sea-soft">
          Send a photo
        </Link>
      </div>
    </section>
  );
}

/** Shown only once a real person holds the reviewer role. */
export function ReviewLine({ date }: { date: string }) {
  const { name, role } = business.reviewer;
  if (isPlaceholder(name) || isPlaceholder(role)) return null;
  const pretty = new Date(date + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <p className="mt-10 text-sm text-frame-soft">
      Last reviewed <time dateTime={date}>{pretty}</time> by {name}, {role}.
    </p>
  );
}
