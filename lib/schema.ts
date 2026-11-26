import { business, isPlaceholder, siteUrl } from "../content/business";
import { pathFor, type PageEntry } from "../content/pages";
import { serviceBySlug } from "../content/services";

type Json = Record<string, unknown>;
export type Faq = { q: string; a: string };

export const ids = {
  org: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  business: `${siteUrl}/#localbusiness`,
};

const real = <T,>(v: T): T | undefined => (isPlaceholder(v) ? undefined : v);
const clean = (o: Json): Json =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0)),
  );

const sameAs = () => [real(business.gbpUrl), ...business.socialUrls].filter(Boolean) as string[];

export function organizationSchema(): Json {
  return clean({
    "@type": "Organization",
    "@id": ids.org,
    name: business.brandName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    telephone: business.phoneE164,
    email: real(business.email),
    sameAs: sameAs(),
  });
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: siteUrl,
    name: business.brandName,
    inLanguage: "en-US",
    publisher: { "@id": ids.org },
  };
}

export function localBusinessSchema(): Json {
  const showAddress = business.serviceAreaType === "storefront";
  const hours = business.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
  const areas = business.serviceAreas.filter((a) => !isPlaceholder(a));
  return clean({
    "@type": "HomeAndConstructionBusiness",
    "@id": ids.business,
    name: business.brandName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: business.phoneE164,
    email: real(business.email),
    address: clean({
      "@type": "PostalAddress",
      streetAddress: showAddress ? business.address.street : undefined,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: showAddress ? business.address.postalCode : undefined,
      addressCountry: business.address.country,
    }),
    geo:
      business.geo.lat != null && business.geo.lng != null
        ? { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng }
        : undefined,
    openingHoursSpecification: hours,
    areaServed: [
      { "@type": "State", name: "Florida" },
      ...areas.map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    parentOrganization: { "@id": ids.org },
    sameAs: sameAs(),
  });
}

export function serviceSchema(page: PageEntry): Json {
  const svc = serviceBySlug(page.slug);
  return {
    "@type": "Service",
    "@id": `${siteUrl}${pathFor(page.slug)}#service`,
    name: svc?.title ?? page.h1,
    serviceType: svc?.serviceType ?? page.h1,
    description: page.description,
    url: `${siteUrl}${pathFor(page.slug)}`,
    provider: { "@id": ids.business },
    areaServed: { "@type": "State", name: "Florida" },
  };
}

export function homeServiceSchema(page: PageEntry): Json {
  return {
    "@type": "Service",
    "@id": `${siteUrl}/#service`,
    name: "Sliding glass door repair",
    serviceType: "Sliding glass door repair",
    description: page.description,
    url: `${siteUrl}/`,
    provider: { "@id": ids.business },
    areaServed: { "@type": "State", name: "Florida" },
  };
}

export function breadcrumbSchema(page: PageEntry): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: `${siteUrl}${pathFor(page.slug)}` },
    ],
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema(page: PageEntry): Json {
  return {
    "@type": "WebPage",
    "@id": `${siteUrl}${pathFor(page.slug)}#webpage`,
    url: `${siteUrl}${pathFor(page.slug)}`,
    name: page.metaTitle,
    description: page.description,
    inLanguage: "en-US",
    isPartOf: { "@id": ids.website },
    dateModified: page.updated,
  };
}

/** The full @graph for a page. Used by the page and by scripts/check-schema.ts. */
export function graphFor(page: PageEntry, faqs: Faq[]): Json {
  const graph: Json[] = [organizationSchema(), websiteSchema(), webPageSchema(page)];
  if (page.kind === "home") graph.push(localBusinessSchema(), homeServiceSchema(page));
  if (page.kind === "service") graph.push(serviceSchema(page));
  if (page.kind !== "home") graph.push(breadcrumbSchema(page));
  if (faqs.length) graph.push(faqSchema(faqs));
  return { "@context": "https://schema.org", "@graph": graph };
}
