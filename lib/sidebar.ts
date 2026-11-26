import { services, serviceBySlug, type RelatedLink } from "../content/services";
import { pageBySlug } from "../content/pages";

/** Geographic order, south to north. Neighbors in this list are neighbors on the map. */
export const CITY_RING = [
  "miami", "hialeah", "miami-gardens", "miramar", "pembroke-pines", "hollywood", "fort-lauderdale", "davie",
  "plantation", "sunrise", "coral-springs", "pompano-beach", "deerfield-beach", "boca-raton", "west-palm-beach",
].map((c) => `sliding-glass-door-repair-${c}`);

function cityRelated(slug: string): RelatedLink[] {
  const i = CITY_RING.indexOf(slug);
  const near = [CITY_RING[i - 1], CITY_RING[i + 1]]
    .filter((s): s is string => Boolean(s) && Boolean(pageBySlug(s!)))
    .map((s) => ({ slug: s, reason: `Sliding door repair in ${pageBySlug(s)!.city?.name ?? s}, next door` }));
  return [...near, ...defaultRelated(slug)].slice(0, 5);
}

/** Manual `related` list first, then fill from topic overlap. Never the current page. 3-5 items. */
export function relatedFor(slug: string, max = 5): RelatedLink[] {
  if (CITY_RING.includes(slug)) return cityRelated(slug);
  const current = serviceBySlug(slug);
  const picked: RelatedLink[] = (current?.related ?? []).filter((r) => r.slug !== slug).slice(0, max);
  if (picked.length >= 3 || !current) return picked.length ? picked : defaultRelated(slug);

  const taken = new Set([slug, ...picked.map((p) => p.slug)]);
  const scored = services
    .filter((s) => !taken.has(s.slug))
    .map((s) => ({ s, score: s.topics.filter((t) => current.topics.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  for (const { s } of scored) {
    if (picked.length >= 3) break;
    picked.push({ slug: s.slug, reason: `${s.title}: ${s.menuBlurb.toLowerCase()}` });
  }
  return picked;
}

/** Utility pages (about, contact...) get the three most common repairs. */
function defaultRelated(slug: string): RelatedLink[] {
  return ["sliding-door-roller-replacement", "sliding-door-track-repair", "sliding-door-lock-and-handle-repair"]
    .filter((s) => s !== slug)
    .map((s) => {
      const svc = serviceBySlug(s)!;
      return { slug: s, reason: `${svc.title}: ${svc.menuBlurb.toLowerCase()}` };
    });
}
