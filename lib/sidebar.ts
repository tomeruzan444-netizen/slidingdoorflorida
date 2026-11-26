import { services, serviceBySlug, type RelatedLink } from "../content/services";

/** Manual `related` list first, then fill from topic overlap. Never the current page. 3-5 items. */
export function relatedFor(slug: string, max = 5): RelatedLink[] {
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
