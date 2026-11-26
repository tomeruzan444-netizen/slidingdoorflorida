import Link from "next/link";
import { business } from "@/content/business";

const initials = business.founderName
  .split(/\s+/)
  .map((w) => w[0])
  .join("")
  .slice(0, 2);

function Avatar({ size = "h-11 w-11 text-base" }: { size?: string }) {
  // Initials until the owner supplies a real photo. No stock or AI portraits.
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full bg-teal font-bold tracking-wide text-white ${size}`}>
      {initials}
    </span>
  );
}

/**
 * Joseph's own words, from the owner interview (briefs/site-pages-facts.md, section E).
 * Quote only what Joseph actually said. Trim, never reword.
 */
export function JosephSays({ children }: { children: React.ReactNode }) {
  return (
    <figure className="expert-quote not-prose !my-8 rounded-xl bg-white p-5 ring-1 ring-alu/70 sm:p-6">
      <blockquote className="border-l-4 border-bronze pl-4 text-[1.06rem] leading-relaxed text-frame [&>p+p]:mt-3">{children}</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar size="h-10 w-10 text-sm" />
        <span className="text-sm leading-snug">
          <span className="block font-bold text-frame">{business.founderName}</span>
          <span className="block text-frame-soft">
            Founder, {business.brandName} &middot; {business.yearsInBusiness} years on sliding doors
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Byline under the page hero: whose experience the page draws on.
 * It says "field notes from", not "reviewed by": a review claim needs the owner to actually review the page.
 */
export function ExpertByline() {
  return (
    <div className="mt-6 flex max-w-2xl items-center gap-3 rounded-lg bg-white/70 px-4 py-3 ring-1 ring-alu/60">
      <Avatar />
      <p className="text-[0.95rem] leading-snug text-frame-soft">
        With field notes from{" "}
        <Link href="/about" className="font-bold text-frame underline decoration-bronze underline-offset-2">
          {business.founderName}
        </Link>
        , who founded {business.brandName} and has {business.yearsInBusiness} years of hands-on sliding door work in {business.region}.
      </p>
    </div>
  );
}
