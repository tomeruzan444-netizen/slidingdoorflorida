import { business, countyList, known, mailHref, socialProfiles, telHref } from "@/content/business";
import { FacebookIcon, PhoneIcon } from "../Icons";

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
        {socialProfiles.map((s) => (
          <span key={s.url} className="mt-2 block">
            <span className="block text-sm text-frame-soft">{s.name}</span>
            <a href={s.url} target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold">
              <FacebookIcon className="h-4 w-4 text-bronze" /> Find us on {s.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        ))}
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
          Our crews come to you across Florida, from our base in {business.homeBase}. There&apos;s no walk-in location.
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
