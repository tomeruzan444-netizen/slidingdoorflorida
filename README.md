# Sliding Glass Door Repair, Florida

English-language local service site for sliding glass door repair and replacement, Florida only. Built to rank in Google and to be cited by AI search engines.

- **Content rules:** [CONTENT-GUIDE.md](CONTENT-GUIDE.md) governs every word on the site.
- **Build spec:** [BUILD-PROMPT.md](BUILD-PROMPT.md).
- **Owner input needed:** [OWNER-QUESTIONNAIRE.md](OWNER-QUESTIONNAIRE.md).
- **Research:** one brief per page in [briefs/](briefs/), with sources and check dates.

## Stack

Next.js 16 (App Router, TypeScript), Tailwind CSS 4, MDX for page bodies, deployed on Vercel. Every page is statically generated. Text, FAQs and JSON-LD are all in the initial HTML. The only client-side component is the quote form. Menus, the Symptom Finder and FAQs use native `<details>`, so they work with zero JavaScript.

```
npm install
npm run dev        # local dev
npm run qc         # all quality checks (also runs automatically before every build)
npm run build      # QC + production build
npm run indexnow -- /changed-path /another   # ping IndexNow after deploying changes
```

Node 20.11+ works. `package.json` overrides `magic-string` to 0.30.x because Tailwind's newest build needs Node 20.19+ otherwise.

## Where things live

| What | File |
|---|---|
| Every business fact (name, phone, license, hours, areas, job stories) | `content/business.ts` |
| Page registry: titles, meta, H1, answer block, update dates | `content/pages.ts` |
| Page body copy | `content/pages/{slug}.mdx` (homepage: `home.mdx`) |
| All FAQs (one registry, duplicates fail the build) | `content/faq-registry.json` |
| Services, menu, sidebar "related" links | `content/services.ts` |
| Infographics (HTML/SVG with real text) | `components/infographics/` |
| JSON-LD | `lib/schema.ts` |
| Quality checks | `scripts/` |

URLs are flat: every page sits directly under the domain. Trailing-slash URLs 301 to the clean version (`proxy.ts`).

## Quality checks (prebuild)

1. **Similarity:** 5-word shingle Jaccard between every pair of pages, max 15%. Current worst pair is under 9%.
2. **AI-style linter:** the CONTENT-GUIDE blocklist: em dashes (zero allowed), banned words and phrases, structural patterns, emoji, Title Case headings, overuse limits.
3. **FAQ registry:** 8-15 per page, no duplicate or near-duplicate questions across the site.
4. **Links:** no broken internal links, every service page has 2+ contextual inbound links and links back to the homepage.
5. **Schema:** required properties, matches `business.ts`, no review markup.
6. **Placeholders:** lists every `{{...}}` left. Warns on previews, **fails the build on Vercel production** (or with `STRICT_PLACEHOLDERS=1`). So production deploys stay blocked until the owner data is in.

## Adding a page

1. Write the brief in `briefs/{slug}.md` (CONTENT-GUIDE section 13).
2. Add the page to `content/pages.ts` (and to `content/services.ts` if it's a service) with `updated` set to today.
3. Write `content/pages/{slug}.mdx`, and add its FAQs to `content/faq-registry.json`.
4. Add a new, useful sentence linking to it on the 1-2 closest existing pages, update their `updated` date, and update `related` in `services.ts`.
5. `npm run qc`, then `npx tsx scripts/brief-links.ts` to refresh the link map in the briefs.

City pages follow BUILD-PROMPT section 10: no city page without 5+ verified local facts and a real local job story.

## Live address and staging mode

Vercel project `slidingdoorflorida` (team tomer7), linked to this repo: every push to `main` deploys to https://slidingdoorflorida.vercel.app.

While `business.domain` is still a placeholder (or `SITE_STAGING=1`), the site runs in staging mode: `noindex, nofollow` meta tag and `X-Robots-Tag` header, robots.txt blocks everything, and the placeholder check only warns. Filling in the real domain turns staging off and makes placeholders fail the production build again.

## Remaining placeholders (waiting on the owner)

All in `content/business.ts` unless noted:

`{{BRAND_NAME}}` `{{DOMAIN}}` `{{PHONE}}` `{{EMAIL}}` `{{ADDRESS}}` `{{SERVICE_AREA_TYPE}}` `{{LICENSE_TYPE}}` `{{LICENSE_NUMBER}}` `{{INSURANCE}}` `{{YEARS_IN_BUSINESS}}` `{{FOUNDER_NAME}}` `{{REVIEWER_NAME}}` `{{REVIEWER_ROLE}}` `{{HOURS}}` `{{SERVICE_AREAS}}` `{{GBP_URL}}` `{{SOCIAL_URLS}}` `{{PRICE_RANGES}}` `{{CASE_NOTES}}`

Plus:
- `{{CASE_NOTE}}` boxes on all 7 service pages (real job stories with photos)
- `about.mdx`: founder bio, team, insurance wording, list of jobs turned down
- `privacy-policy.mdx`: `{{OTHER_PROCESSORS}}`, `{{RETENTION}}`, analytics and call-tracking notes; needs legal review
- `{/* OWNER-CONFIRM */}` comments in each MDX file mark statements about how the business works (scope, visit process, time on site). Check them against reality before launch.
- Quote form email: set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` in Vercel. Until then the form tells visitors to call instead of pretending to send.

## Lighthouse (mobile, local production build, 2026-11-26)

| Page | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| All 12 pages | 90-98 | 100 | 100 | 100 |

CLS is 0 everywhere. Observed LCP is about 0.3 s. Lighthouse's simulated mobile LCP is 2.4-2.8 s, above the 2.0 s target. The cause is the JavaScript payload: about 146 KB gzipped of React plus the Next.js App Router runtime, over the 90 KB target. Site code adds only a few KB. Lighthouse models all of it on a throttled CPU. Already done: inlined CSS, self-hosted fonts with `display: optional`, zero-JS menus and FAQ. Meeting both targets fully would mean a framework that ships no runtime by default (Astro, for example). Scores will also differ on Vercel's CDN.

## After launch

1. Connect the domain on Vercel and set `NEXT_PUBLIC_SITE_URL`.
2. Google Search Console: verify, submit `/sitemap.xml`.
3. Bing Webmaster Tools: verify, submit the sitemap, then `npm run indexnow -- --all`.
4. Google Business Profile: NAP identical to the footer, categories, service areas, real photos, and the site URL.
5. Citations with identical NAP: BBB, Yelp, Angi, Nextdoor, local chambers of commerce. Add each URL to `socialUrls` in `business.ts` (it feeds `sameAs` in the schema).
6. Re-check every code reference against the Florida Building Code 9th edition, which takes effect December 31, 2026.
