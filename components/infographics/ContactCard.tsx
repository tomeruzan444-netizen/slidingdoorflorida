import { business, telHref } from "@/content/business";
import { PhoneIcon } from "../Icons";

/** Phone, email, hours and (storefront only) address, straight from business.ts. */
export function ContactCard() {
  const a = business.address;
  const storefront = business.serviceAreaType === "storefront";
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
        <a href={`mailto:${business.email}`} className="font-semibold">{business.email}</a>
        <span className="mt-2 block text-sm text-frame-soft">Hours</span>
        <span>{business.hoursText}</span>
      </div>
      {storefront && (
        <div className="panel p-5 sm:col-span-2">
          <span className="block text-sm text-frame-soft">Address</span>
          <span>{a.street}, {a.city}, {a.region} {a.postalCode}</span>
        </div>
      )}
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
