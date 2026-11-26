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
  domain: "{{DOMAIN}}", // e.g. https://www.example.com (no trailing slash)
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
    "Davis Sliding Door Repair is a sliding door repair and installation company founded by Joseph Davis, with 15 years of experience in sliding door services across South Florida.",
  /** Short region name for headlines and labels. */
  region: "South Florida",

  /** Byline is shown only once a real person fills this role. */
  reviewer: { name: "{{REVIEWER_NAME}}", role: "{{REVIEWER_ROLE}}" },

  /** Human-readable hours line for the footer, plus structured hours for schema. */
  hoursText: "{{HOURS}}",
  hours: [] as DayHours[],

  /** Service areas by county. Must match the Google Business Profile. */
  serviceAreas: [
    {
      county: "Miami-Dade County",
      cities: [{ name: "Miami" }, { name: "Hialeah" }, { name: "Miami Gardens" }],
    },
    {
      county: "Broward County",
      cities: [
        { name: "Fort Lauderdale" },
        { name: "Pembroke Pines" },
        { name: "Hollywood" },
        { name: "Miramar" },
        { name: "Coral Springs" },
        { name: "Pompano Beach" },
        { name: "Davie" },
        { name: "Plantation" },
        { name: "Sunrise" },
        { name: "Deerfield Beach" },
      ],
    },
    {
      county: "Palm Beach County",
      cities: [{ name: "West Palm Beach" }, { name: "Boca Raton" }],
    },
  ] as ServiceCounty[],

  gbpUrl: "{{GBP_URL}}",
  socialUrls: [] as string[], // {{SOCIAL_URLS}}: Yelp, BBB, Facebook, Nextdoor...

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
        "The door barely moved, and the homeowner assumed the frame was damaged and the whole door had to go. The frame was fine. The rollers were worn out, and years of dirt and debris had built up in the track. Joseph replaced the rollers, cleaned the track and adjusted the panel, and once everything lined up the door slid smoothly again. The homeowner kept the door they had.",
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

/** Every city we serve, flat, in county order. */
export const serviceCities = business.serviceAreas.flatMap((c) => c.cities.map((city) => ({ ...city, county: c.county })));
/** "Miami-Dade, Broward and Palm Beach counties" */
export const countyList = (() => {
  const names = business.serviceAreas.map((c) => c.county.replace(/ County$/, ""));
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)} counties` : `${names[0]} County`;
})();

/** The brand name for display; falls back to a neutral descriptor while it's a placeholder. */
export const displayBrand = business.brandName;
