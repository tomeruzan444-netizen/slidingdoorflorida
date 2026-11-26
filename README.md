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

## City pages (15)

`/sliding-glass-door-repair-{city}` for the 15 footer cities (kind `"city"` in `content/pages.ts`). Each has a research brief with verified local facts and sources in `briefs/cities/{slug}.md`, and its metadata and 5 local FAQs in `briefs/cities/{slug}.meta.json`. `python scripts/add-city-pages.py` re-registers them in `pages.ts` and `faq-registry.json` after editing a meta file.

- Every city page links to 2-4 pages in its body: a neighboring city (south-to-north ring in `lib/sidebar.ts`) and 1-2 service pages. Each city also gets a contextual link from a relevant service page. QC enforces 2-4 out and 2+ in.
- The footer links a city only when its page exists (`lib/areas.ts`).
- Owner request: city pages carry the three "near me" phrases verbatim, once each, body only. The linter enforces that exception; "near me" anywhere else still fails.
- BUILD-PROMPT section 10 also asks for a real local job story per city. None exists yet; add one per city when the owner supplies it.
- Some facts were read from official pages through search results because the sites block automated fetches (marked in each brief). Open those in a browser before relying on them.

## Live address

Production: **https://davisslidingdoorflorida.com** (Vercel project `slidingdoorflorida`, team tomer7). `www.davisslidingdoorflorida.com` 308-redirects to the apex. Every push to `main` deploys.

DNS is managed at box.co.il (not Vercel): apex `A` record to Vercel, `www` `CNAME` to Vercel. Vercel issues the SSL certificate once DNS points at it.

The `*.vercel.app` addresses still serve the site but send `X-Robots-Tag: noindex, nofollow` (`proxy.ts`), so only the real domain gets indexed. Staging mode (`SITE_STAGING=1`) still exists to take the whole site out of search if ever needed.

## Owner data: what's in, what's missing

In `content/business.ts`: brand, phone, email, founder (Joseph Davis), years (15), service-area business with 15 cities in 3 counties, one real job story. Joseph's interview answers are recorded verbatim in `briefs/site-pages-facts.md` section E and quoted on pages through `<JosephSays>` (trim, never reword).

**Visitors never see a placeholder.** Every component checks `known()` and leaves out a fact that hasn't been supplied (license, insurance, hours, case notes). `npm run qc` still lists every missing value.

Still missing: `{{LICENSE_TYPE}}` `{{LICENSE_NUMBER}}`, `{{INSURANCE}}`, `{{HOURS}}`, `{{GBP_URL}}` and other listings, `{{REVIEWER_NAME}}`, `{{PRICE_RANGES}}`, job stories with photos for the other 6 services, Joseph's photo, and the privacy policy's processors/retention details (legal review).

- `{/* OWNER-CONFIRM */}` comments in each MDX file mark statements about how the business works. Check them against reality before launch.
- Quote form email: set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` in Vercel. Until then the form tells visitors to call instead of pretending to send.
- Pages are written as the team ("we": 10 technicians in crews across Florida, led by Joseph Davis) and carry a "Written by the Davis Sliding Door Repair team" byline. Add "Reviewed by Joseph Davis" only after Joseph has actually read and approved each page.

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
