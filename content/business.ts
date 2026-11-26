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
  location: string; // city or area, as approved by the owner
  story: string; // what was wrong, what we found, what we did
  beforeImage?: string; // path under /public, real job photo only
  afterImage?: string;
};

export type DayHours = { days: string[]; opens: string; closes: string };

export const business = {
  brandName: "{{BRAND_NAME}}",
  domain: "{{DOMAIN}}", // e.g. https://www.example.com (no trailing slash)
  phone: "{{PHONE}}", // display format, e.g. (305) 555-0100
  phoneE164: "{{PHONE}}", // tel: format, e.g. +13055550100
  email: "{{EMAIL}}",

  /** "storefront" shows the street address publicly; "service-area" hides it (GBP rule). */
  serviceAreaType: "{{SERVICE_AREA_TYPE}}" as "storefront" | "service-area" | string,
  address: {
    street: "{{ADDRESS}}",
    city: "{{ADDRESS}}",
    region: "FL",
    postalCode: "{{ADDRESS}}",
    country: "US",
  },
  geo: { lat: null as number | null, lng: null as number | null },

  licenseType: "{{LICENSE_TYPE}}",
  licenseNumber: "{{LICENSE_NUMBER}}",
  insurance: "{{INSURANCE}}",
  yearsInBusiness: "{{YEARS_IN_BUSINESS}}",
  founderName: "{{FOUNDER_NAME}}",

  /** Byline is shown only once a real person fills this role. */
  reviewer: { name: "{{REVIEWER_NAME}}", role: "{{REVIEWER_ROLE}}" },

  /** Human-readable hours line for the footer, plus structured hours for schema. */
  hoursText: "{{HOURS}}",
  hours: [] as DayHours[],

  /** Florida counties or cities, exactly as listed on the Google Business Profile. */
  serviceAreas: ["{{SERVICE_AREAS}}"] as string[],

  gbpUrl: "{{GBP_URL}}",
  socialUrls: [] as string[], // {{SOCIAL_URLS}}: Yelp, BBB, Facebook, Nextdoor...

  /** Only filled if the owner approves publishing price ranges. */
  priceRanges: "{{PRICE_RANGES}}",

  /** Real job stories with real photos ({{CASE_NOTES}}). Empty until the owner supplies them. */
  caseNotes: [] as CaseNote[],
} as const;

export const isPlaceholder = (v: unknown): boolean =>
  typeof v === "string" && /\{\{[A-Z_]+\}\}/.test(v);

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

/** The brand name for display; falls back to a neutral descriptor while it's a placeholder. */
export const displayBrand = business.brandName;
