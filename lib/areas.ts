import type { ServiceCity } from "../content/business";
import { pageBySlug, pathFor } from "../content/pages";

/**
 * Link target for a city, or null while its page doesn't exist.
 * A city links only when `page` is set in business.ts AND that page is registered in pages.ts,
 * so the footer and service-area lists can never point to a 404.
 */
export function cityHref(city: ServiceCity): string | null {
  if (!city.page) return null;
  return pageBySlug(city.page) ? pathFor(city.page) : null;
}
