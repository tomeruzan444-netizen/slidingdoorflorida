import { business, countyList, known, mailHref, telHref } from "@/content/business";
import { PhoneIcon } from "../Icons";

/** Phone, email, hours and coverage, straight from business.ts. Service-area business: no address. */
export function ContactCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a href={telHref} className="panel flex items-center gap-3 p-5 no-underline">
        <PhoneIcon className="h-6 w-6 text-bronze" />
        <span>
          <span className="block text-sm text-frame-soft">Call</span>
          <span className="block font-[family-name:var(--font-display)] text-xl font-semibold text-frame">{business.phone}</span>
        </span>
      </a>
      <div className="panel p-5">
        <span className="block text-sm text-frame-soft">Email</span>
        <a href={mailHref} className="break-all font-semibold">{business.email}</a>
        {known(business.hoursText) && (
          <>
            <span className="mt-2 block text-sm text-frame-soft">Hours</span>
            <span>{business.hoursText}</span>
          </>
        )}
      </div>
      <div className="panel p-5 sm:col-span-2">
        <span className="block text-sm text-frame-soft">Where we work</span>
        <span>
          We come to you in {countyList}. There&apos;s no walk-in location.
        </span>
      </div>
    </div>
  );
}

/** Email and phone for policy pages. */
export function PolicyContact() {
  return (
    <p>
      Email <a href={`mailto:${business.email}`}>{business.email}</a> or call <a href={telHref}>{business.phone}</a>.
    </p>
  );
}

export function BrandName() {
  return <>{business.brandName}</>;
}

/* Inline business facts for MDX prose, so page copy never hardcodes them. */
export const Founder = () => <>{business.founderName}</>;
export const Years = () => <>{business.yearsInBusiness}</>;
export const Counties = () => <>{countyList}</>;
export const Phone = () => <a href={telHref}>{business.phone}</a>;
export const Email = () => <a href={mailHref}>{business.email}</a>;
