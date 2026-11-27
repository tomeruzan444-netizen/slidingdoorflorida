/**
 * Single source of truth for every fact about the business.
 * Everything on the site (header, footer, schema, contact page, llms.txt) reads from here.
 *
 * Values wrapped in {{...}} are placeholders waiting for the owner.
 * NEVER replace a placeholder with an invented value. A production build
 * fails while any visitor-facing placeholder remains (scripts/check-placeholders.ts).
 */

export type CaseNote = {
  service: string; // service slug
  title: string;
  location?: string; // city or area, only if the owner gave one
  story: string; // what was wrong, what we found, what we did
  beforeImage?: string; // path under /public, real job photo only
  afterImage?: string;
};

export type DayHours = { days: string[]; opens: string; closes: string };

/**
 * A city we serve. `page` is the slug of its city page. Leave it empty until that page
 * is live in content/pages.ts: the footer only links a city whose page exists.
 */
export type ServiceCity = { name: string; page?: string };
export type ServiceCounty = { county: string; cities: ServiceCity[] };

export const business = {
  brandName: "Davis Sliding Door Repair",
  domain: "https://davisslidingdoorflorida.com", // canonical host (www redirects here in Vercel); no trailing slash
  phone: "(954) 807-2446", // display format
  phoneE164: "+19548072446", // tel: format
  email: "davisslidingdoorrepair@gmail.com",

  /**
   * Service-area business: we go to the customer, and there is no public street address.
   * No address appears on the site or in the schema. If this ever becomes "storefront",
   * add the address here and to the footer, contact card and LocalBusiness schema.
   */
  serviceAreaType: "service-area" as "storefront" | "service-area",
  geo: { lat: null as number | null, lng: null as number | null },

  licenseType: "{{LICENSE_TYPE}}",
  licenseNumber: "{{LICENSE_NUMBER}}",
  insurance: "{{INSURANCE}}",
  yearsInBusiness: "15",
  founderName: "Joseph Davis",
  /** Owner-approved one-line description (used in llms.txt and the about page). */
  about:
    "Davis Sliding Door Repair is a sliding door repair and installation company founded by Joseph Davis, with 15 years of experience in sliding door services. A team of 10 technicians works in crews across Florida.",
  /** Owner, 2026-11-26: 10 technicians under Joseph, working in crews across Florida. */
  teamSize: 10,
  /** Coverage label for headlines and labels. */
  region: "Florida",
  /** Where the business is based. Inferred from the 954 number and the city list; OWNER-CONFIRM. */
  homeBase: "South Florida",

  /** Byline is shown only once a real person fills this role. */
  reviewer: { name: "{{REVIEWER_NAME}}", role: "{{REVIEWER_ROLE}}" },

  /** Human-readable hours line for the footer, plus structured hours for schema. */
  hoursText: "{{HOURS}}",
  hours: [] as DayHours[],

  /**
   * Cities we list by name (South Florida base). Crews also work elsewhere in Florida,
   * so these are "some of the cities we serve", not the limit. Must match the Google Business Profile.
   */
  serviceAreas: [
    {
      county: "Miami-Dade County",
      cities: [{ name: "Miami", page: "sliding-glass-door-repair-miami" }, { name: "Hialeah", page: "sliding-glass-door-repair-hialeah" }, { name: "Miami Gardens", page: "sliding-glass-door-repair-miami-gardens" }],
    },
    {
      county: "Broward County",
      cities: [
        { name: "Fort Lauderdale", page: "sliding-glass-door-repair-fort-lauderdale" },
        { name: "Pembroke Pines", page: "sliding-glass-door-repair-pembroke-pines" },
        { name: "Hollywood", page: "sliding-glass-door-repair-hollywood" },
        { name: "Miramar", page: "sliding-glass-door-repair-miramar" },
        { name: "Coral Springs", page: "sliding-glass-door-repair-coral-springs" },
        { name: "Pompano Beach", page: "sliding-glass-door-repair-pompano-beach" },
        { name: "Davie", page: "sliding-glass-door-repair-davie" },
        { name: "Plantation", page: "sliding-glass-door-repair-plantation" },
        { name: "Sunrise", page: "sliding-glass-door-repair-sunrise" },
        { name: "Deerfield Beach", page: "sliding-glass-door-repair-deerfield-beach" },
      ],
    },
    {
      county: "Palm Beach County",
      cities: [{ name: "West Palm Beach", page: "sliding-glass-door-repair-west-palm-beach" }, { name: "Boca Raton", page: "sliding-glass-door-repair-boca-raton" }],
    },
  ] as ServiceCounty[],

  gbpUrl: "{{GBP_URL}}",
  /**
   * The business's own profiles (owner-supplied). They feed schema sameAs, the footer and the contact card.
   * The only outbound links on the site: the owner's no-outbound-links rule covers sources and third parties, not the business's own profiles.
   */
  socialUrls: ["https://www.facebook.com/davisslidingdoorrepair"] as string[],

  /** Only filled if the owner approves publishing price ranges. */
  priceRanges: "{{PRICE_RANGES}}",

  /**
   * Real job stories told by the owner. Never invent one.
   * Owner interview, 2026-11-26 (briefs/site-pages-facts.md, section E). No city or photos given yet.
   */
  caseNotes: [
    {
      service: "sliding-door-roller-replacement",
      title: "The door the homeowner was ready to replace",
      story:
        "The door barely moved, and the homeowner assumed the frame was damaged and the whole door had to go. The frame was fine. The rollers were worn out, and years of dirt and debris had built up in the track. We replaced the rollers, cleaned the track and adjusted the panel, and once everything lined up the door slid smoothly again. The homeowner kept the door they had.",
    },
  ] as CaseNote[],
} as const;

export const isPlaceholder = (v: unknown): boolean =>
  typeof v === "string" && /\{\{[A-Z_]+\}\}/.test(v);

/** True when the owner has supplied this value. Visitor-facing UI renders a fact only when it's known. */
export const known = (v: unknown): boolean => v !== undefined && v !== null && v !== "" && !isPlaceholder(v);

/** Site URL used for canonicals, sitemap and schema. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (isPlaceholder(business.domain)
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://www.example.com"
    : business.domain)
).replace(/\/$/, "");

/**
 * Staging mode: the site is live on a temporary address but must stay out of search results.
 * On when SITE_STAGING=1, and automatically while the domain is still a placeholder.
 * Sends noindex (meta + X-Robots-Tag), blocks robots.txt, and lets the build pass with placeholders.
 */
export const isStaging = process.env.SITE_STAGING === "1" || isPlaceholder(business.domain);

export const telHref = `tel:${business.phoneE164}`;
export const mailHref = `mailto:${business.email}`;

/** Social profiles with a display name derived from the host (facebook.com -> Facebook). */
export const socialProfiles = business.socialUrls.map((url) => {
  const host = new URL(url).hostname.replace(/^www\./, "");
  const known: Record<string, string> = { "facebook.com": "Facebook", "instagram.com": "Instagram", "yelp.com": "Yelp", "nextdoor.com": "Nextdoor", "youtube.com": "YouTube" };
  return { url, name: known[host] ?? host };
});

/** Every city we serve, flat, in county order. */
export const serviceCities = business.serviceAreas.flatMap((c) => c.cities.map((city) => ({ ...city, county: c.county })));
/** "Miami-Dade, Broward and Palm Beach counties" */
export const countyList = (() => {
  const names = business.serviceAreas.map((c) => c.county.replace(/ County$/, ""));
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)} counties` : `${names[0]} County`;
})();

/** The brand name for display; falls back to a neutral descriptor while it's a placeholder. */
export const displayBrand = business.brandName;
