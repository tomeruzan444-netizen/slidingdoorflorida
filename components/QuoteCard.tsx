import { business, telHref } from "@/content/business";
import { PhoneIcon } from "./Icons";
import { QuoteForm } from "./QuoteForm";

/**
 * The quote form card. Every page renders it directly under the H1 (owner rule, 2026-11-28),
 * so "#quote" resolves on every page. Full-bleed on mobile, rounded card from sm up.
 */
export function QuoteCard({ className = "" }: { className?: string }) {
  return (
    <section
      id="quote"
      aria-label="Get a quote"
      className={`-mx-4 scroll-mt-24 border-t-4 border-bronze bg-white px-4 py-6 text-left text-frame shadow-[0_24px_60px_-28px_rgb(28_38_38/0.5)] ring-1 ring-alu/50 sm:mx-0 sm:rounded-2xl sm:p-8 ${className}`}
    >
      <QuoteForm wide />
      <a href={telHref} className="mt-5 inline-flex items-center gap-2 font-bold text-teal no-underline hover:underline">
        <PhoneIcon className="h-4 w-4" /> Rather talk? Call {business.phone}
      </a>
    </section>
  );
}
