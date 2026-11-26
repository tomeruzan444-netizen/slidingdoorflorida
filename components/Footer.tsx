import Link from "next/link";
import { business, telHref } from "@/content/business";
import { services } from "@/content/services";
import { LogoMark } from "./Logo";

export function Footer() {
  const a = business.address;
  const showStreet = business.serviceAreaType === "storefront";
  return (
    <footer className="mt-20 border-t-[5px] border-double border-alu bg-frame text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9 rounded bg-sand p-0.5" />
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">{business.brandName}</p>
          </div>
          {/* NAP: must match the Google Business Profile character for character */}
          <address className="mt-4 not-italic leading-relaxed text-alu-light">
            {showStreet && (
              <>
                {a.street}
                <br />
              </>
            )}
            {a.city}, {a.region} {showStreet && a.postalCode}
            <br />
            <a href={telHref} className="font-semibold text-white underline decoration-bronze underline-offset-4">
              {business.phone}
            </a>
            <br />
            <a href={`mailto:${business.email}`} className="text-alu-light underline underline-offset-4">
              {business.email}
            </a>
          </address>
          <p className="mt-4 text-sm text-alu-light">
            {business.licenseType} license #{business.licenseNumber}
            <br />
            {business.insurance}
          </p>
          <p className="mt-4 text-sm text-alu-light">Hours: {business.hoursText}</p>
        </div>

        <div>
          <p className="config-label !text-alu">SERVICES</p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link href="/" className="text-alu-light hover:text-white">Sliding glass door repair</Link>
            </li>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-alu-light hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="config-label !text-alu">FLORIDA SERVICE AREAS</p>
          <ul className="mt-3 space-y-1.5 text-alu-light">
            {business.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="config-label mt-8 !text-alu">COMPANY</p>
          <ul className="mt-3 space-y-1.5">
            <li><Link href="/about" className="text-alu-light hover:text-white">About</Link></li>
            <li><Link href="/contact" className="text-alu-light hover:text-white">Contact</Link></li>
            <li><Link href="/privacy-policy" className="text-alu-light hover:text-white">Privacy policy</Link></li>
            <li><Link href="/accessibility-statement" className="text-alu-light hover:text-white">Accessibility statement</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-frame-soft">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-alu sm:px-6">
          &copy; {new Date().getFullYear()} {business.brandName}. Serving Florida only.
        </p>
      </div>
    </footer>
  );
}
