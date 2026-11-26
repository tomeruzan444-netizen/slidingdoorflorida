import Link from "next/link";
import { business } from "@/content/business";
import { cityHref } from "@/lib/areas";

/**
 * Service areas by county, straight from business.ts so they always match the footer and GBP.
 * A city becomes a link only once its page is live (see lib/areas.ts).
 */
export function ServiceAreas() {
  return (
    <>
    <div className="!mt-5 grid items-start gap-4 sm:grid-cols-3">
      {business.serviceAreas.map((c) => (
        <div key={c.county} className="rounded-lg border border-alu bg-white p-4">
          <p className="config-label">{c.county.toUpperCase()}</p>
          <ul className="!mt-2 !pl-0">
            {c.cities.map((city) => {
              const href = cityHref(city);
              return (
                <li key={city.name} className="!mt-1 !pl-0 before:!hidden">
                  {href ? <Link href={href}>{city.name}</Link> : city.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
    <p className="!mt-3 text-[0.95rem] text-frame-soft">Our crews also work elsewhere in Florida. Not on the list? Call and ask.</p>
    </>
  );
}
