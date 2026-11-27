import Link from "next/link";
import { business, known, mailHref, socialProfiles, telHref } from "@/content/business";
import { services } from "@/content/services";
import { cityHref } from "@/lib/areas";
import { LogoMark } from "./Logo";
import { FacebookIcon, PhoneIcon } from "./Icons";

/** Every value comes from content/business.ts. Nothing about the business is hardcoded here. */
export function Footer() {
  return (
    <footer className="mt-20 border-t-[5px] border-double border-alu bg-frame text-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.25fr_1fr_1.15fr_0.8fr]">
        {/* Contact block. NAP must match the Google Business Profile character for character.
            Service-area business: no street address is shown. */}
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9 rounded bg-sand p-0.5" />
            <p className="text-lg font-bold">{business.brandName}</p>
          </div>
          <p className="mt-4 text-[0.97rem] leading-relaxed text-alu-light">
            Sliding door repair and installation across Florida. {business.teamSize} technicians in crews around the state, led by founder {business.founderName}.
          </p>
          <ul className="mt-5 space-y-2.5">
            <li>
              <a href={telHref} className="inline-flex items-center gap-2 text-lg font-bold text-white no-underline hover:underline">
                <PhoneIcon className="h-4 w-4 text-bronze" /> {business.phone}
              </a>
            </li>
            <li>
              <a href={mailHref} className="break-all text-alu-light underline decoration-frame-soft underline-offset-4 hover:text-white">
                {business.email}
              </a>
            </li>
            {socialProfiles.map((s) => (
              <li key={s.url}>
                {/* rel="me": this profile belongs to the business (identity signal); it opens in a new tab. */}
                <a
                  href={s.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 text-alu-light no-underline hover:text-white"
                >
                  <FacebookIcon className="h-5 w-5 text-bronze" />
                  <span className="underline decoration-frame-soft underline-offset-4">{business.brandName} on {s.name}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-5 space-y-1 text-sm leading-relaxed text-alu-light">
            <li>Founded by {business.founderName}. {business.yearsInBusiness} years on sliding doors.</li>
            {known(business.licenseNumber) && (
              <li>
                {business.licenseType} license #{business.licenseNumber}
              </li>
            )}
            {known(business.insurance) && <li>{business.insurance}</li>}
            {known(business.hoursText) && <li>Hours: {business.hoursText}</li>}
          </ul>
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
          <p className="config-label !text-alu">SERVICE AREAS</p>
          <p className="mt-3 text-[0.95rem] text-alu-light">Crews across Florida. Some of the cities we serve:</p>
          <div className="mt-3 space-y-4">
            {business.serviceAreas.map((c) => (
              <div key={c.county}>
                <p className="font-bold text-white">{c.county}</p>
                <ul className="mt-1 text-[0.95rem] leading-relaxed text-alu-light">
                  {c.cities.map((city) => {
                    const href = cityHref(city);
                    return (
                      <li key={city.name} className="inline after:content-[',_'] last:after:content-none">
                        {href ? <Link href={href} className="text-alu-light underline underline-offset-2 hover:text-white">{city.name}</Link> : city.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="config-label !text-alu">COMPANY</p>
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
          &copy; {new Date().getFullYear()} {business.brandName}. Crews across Florida, based in {business.homeBase}.
        </p>
      </div>
    </footer>
  );
}
