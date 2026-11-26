# Build prompt: Sliding Glass Door Repair website (Florida)

> Instructions for the coding agent. All site content is written in **American English**.
> Before writing a single line of content, read `CONTENT-GUIDE.md` and follow it. It governs every page on the site, now and in the future.

---

## 0. Mission summary

Build an English-language local service website for sliding glass door repair and replacement that serves **Florida only**. The site must:
- Rank in Google for its service keywords, and be a source that AI search engines cite and recommend (AI Overviews, AI Mode, ChatGPT Search, Perplexity, Claude, Copilot).
- Be extremely fast, visually original, and accessible.
- Give every page genuinely unique content, grounded in real experience and reliable sources.
- Be built so dozens of service pages and Florida city pages can be added later without lowering quality or creating doorway pages.

Business details (name, phone, address, license, years in business) will be provided later. Until then use placeholders only (section 9). **Never invent any factual detail about the business.**

---

## 1. Tech stack and performance

**Stack:**
- Next.js (latest stable, App Router) with TypeScript.
- Every page is statically generated (SSG). No client-side rendering of content. All text, headings, FAQs, and schema must be present in the initial HTML. Many AI crawlers do not execute JavaScript.
- Tailwind CSS. React Server Components by default; Client Components only where there is real interactivity (form, mobile menu, Symptom Finder).
- Page content lives in MDX or TypeScript files under `/content`, separate from components, so new pages are easy to add.
- Deploy to Vercel.
- `next/font` with a self-hosted font (no runtime requests to Google Fonts). `next/image` with AVIF/WebP, explicit dimensions, and lazy loading below the fold.

**Performance targets (mandatory, checked before every deploy):**
- Mobile Lighthouse: Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO = 100.
- LCP < 2.0s, CLS < 0.05, INP < 200ms.
- Client-side JavaScript under 90KB gzipped on a typical service page.
- No heavy animation libraries. CSS animations only, all respecting `prefers-reduced-motion`.
- No chatbots, popups, or render-blocking third-party scripts. Analytics loads after first interaction or with `strategy="lazyOnload"`.

---

## 2. URL structure (completely flat)

**Hard rule:** every page, including every service and every city, sits directly under the domain. No `/services/`, no `/locations/`, no `/fl/`, no intermediate folder of any kind.

```
/                                         ← Homepage (targets Sliding Glass Door Repair)
/sliding-glass-door-replacement
/patio-door-repair
/sliding-door-roller-replacement
/sliding-door-lock-and-handle-repair
/sliding-screen-door-repair
/sliding-door-track-repair
/sliding-closet-door-repair
/about
/contact
/privacy-policy
/accessibility-statement
```

Later: `/sliding-glass-door-repair-miami`, `/sliding-glass-door-repair-tampa`, and so on. Also directly under the domain.

**Important, avoid cannibalization:** the homepage is the only page targeting the "sliding glass door repair / sliding door repair / sliding patio door repair + near me" cluster. **Do not create a separate `/sliding-glass-door-repair` page.** Two pages with the same search intent compete with each other. So there are 7 service pages, and the homepage acts as the eighth and main service page.

**Technical rules:**
- Lowercase, hyphenated slugs, no trailing slash, 301 redirect from the trailing-slash version.
- Self-referencing canonical on every page.
- Auto-generated `sitemap.xml` covering every page, with a real `lastmod` (the date the content actually changed, not the build date).
- Visual breadcrumbs plus BreadcrumbList schema on every page except the homepage (Home > Page Name). The hierarchy is logical only; URLs stay flat.
- A designed 404 page with links to services and the phone number.

---

## 3. Design: original, not generic

### 3.1 Concept
The site must not look like yet another contractor site (stock-photo hero, three icon boxes, blue banner). The concept is **"glass, frame, and track"**: a visual language taken from the physical anatomy of a sliding door.

### 3.2 Color palette
Colors come from the door's own materials:

| Role | Name | Hex | Inspiration |
|---|---|---|---|
| Primary | Glass Edge Teal | `#0F5C5E` | The green-blue tint visible on the edge of float glass |
| Light secondary | Sea Glass | `#D6EBE7` | Clear glass against Florida light |
| Accent / CTA | Anodized Bronze | `#9A5B2E` | Bronze aluminum frames, very common in Florida homes |
| Background | Sand | `#F7F4EE` | Beach, warm light |
| Text | Deep Frame | `#1C2626` | Dark, not pure black |
| Lines and tracks | Brushed Aluminum | `#B9C2C4` | Tracks and aluminum profiles |

- Check WCAG AA contrast for every text/background pair (4.5:1 for normal text). If bronze fails on a given background, use a darker bronze, but keep the CTA emphasis.
- Shades can be fine-tuned, but the logic (glass teal + frame bronze + sand) stays.

### 3.3 Visual motifs
- **Homepage hero:** two glass "panels" (layers with subtle `backdrop-filter` and a thin frame) that slide apart on load to reveal the headline. CSS only, runs once; under `prefers-reduced-motion` they simply render open. The headline and CTA must be in the HTML from the first paint so the animation never hurts LCP.
- **Track-style section dividers:** two thin parallel lines instead of one, like a double track.
- **Configuration labels:** decorative use of industry notation (`XO`, `OX`, `OXO`, `OXXO`) as a typographic element in section numbering or cards.
- **Cards as panels:** service cards look like a framed glass panel; on hover the panel "slides" a few pixels along its track.
- Photography: only real photos from the business's jobs (to be supplied). Until then use designed placeholders and SVG illustrations. **No stock photos of smiling people in hard hats.**

### 3.4 Typography
- Headings: a geometric/grotesque font with character (e.g. Space Grotesk, Manrope, or Outfit). Not Inter, not Roboto.
- Body: a highly readable font on mobile (e.g. Source Sans 3 or IBM Plex Sans), 17-18px base, 1.6 line height.
- Headings in sentence case, not Title Case. It reads more naturally and less like AI.

### 3.5 Required UI components
- **Header:** thin and sticky. Logo, Services menu (dropdown listing every service), About, Contact, prominent phone button.
- **Mobile sticky call bar:** fixed bottom bar with "Call" and "Get a quote". It never covers content (add bottom padding to the body).
- **Footer:** full NAP (name, address, phone) matching the Google Business Profile exactly, license number, hours, Florida service areas, list of all services, links to Privacy and Accessibility.
- **Quote form:** name, phone, ZIP code (validated for Florida, 32xxx-34xxx), problem type (select), free-text message. Optional photo upload. Submits via an API route (email provider: placeholder). Clear success message. No heavy reCAPTCHA (honeypot + rate limiting).

---

## 4. Dynamic sidebar

Every page **except the homepage** has a sidebar (beside the content on desktop; on mobile it moves below the content, before or after the FAQ).

**Sidebar contents:**
1. A "Need help now?" card with the phone number and a quote button.
2. **"Related services"**: only services related to the page topic, 3 to 5 items, each with a one-line description written specifically for that context.
3. (Once city pages exist) "Areas we serve near {city}" on city pages only.

**How it works:**
- A central data file `content/services.ts`. Each service has: `slug`, `title`, `shortTitle`, `topics: string[]` (e.g. `['rollers','movement','hardware']`), and `related: { slug, reason }[]`, a **hand-curated** list of related services with a reason.
- The sidebar shows the manual `related` list first and fills from `topics` overlap if needed. The current page never appears in its own sidebar.
- Link text is descriptive (`Roller replacement for doors that drag`), never "Learn more".

**Starting relationship map:**

| Page | Sidebar services |
|---|---|
| sliding-glass-door-replacement | track-repair (when a ruined track justifies replacement), roller-replacement (when new rollers are enough), patio-door-repair, lock-and-handle-repair |
| patio-door-repair | roller-replacement, track-repair, lock-and-handle-repair, screen-door-repair, replacement |
| sliding-door-roller-replacement | track-repair, lock-and-handle-repair (a sagging door means the lock won't line up), screen-door-repair (screens have rollers too), replacement |
| sliding-door-lock-and-handle-repair | roller-replacement, track-repair, replacement (security upgrade), patio-door-repair |
| sliding-screen-door-repair | roller-replacement, track-repair, patio-door-repair |
| sliding-door-track-repair | roller-replacement, replacement, patio-door-repair, screen-door-repair |
| sliding-closet-door-repair | roller-replacement, track-repair, homepage |

---

## 5. Internal linking

**Principles:**
- Every page gets an inbound link from the homepage (menu and body content) and at least **2 contextual links** from the body text of other relevant pages. Sidebar, header, and footer links don't count toward this.
- Contextual links sit naturally in the text, e.g.: "If the door still drags after the track is cleaned, the [rollers are usually worn flat](/sliding-door-roller-replacement)."
- Descriptive, varied anchor text. Not the same exact anchor everywhere, and not the exact-match keyword over and over.
- Every service page links back to the homepage with a natural anchor about general repair.
- No more than 5-8 contextual internal links on a service page, so links never feel spammy.

**When adding a new page (mandatory process, now and in the future):**
1. Pick the 1-2 existing pages whose topic is closest to the new page.
2. Add a **new, valuable** sentence or paragraph to them that links to the new page. Don't force a link into an existing sentence.
3. Update `related` in `services.ts` for the new page and the related pages.
4. Update `lastmod` only on pages that actually changed.

**Automated build checks (`scripts/check-links.ts`, runs in `prebuild`):**
- No broken internal links.
- No orphan pages (every page has at least 2 inbound contextual links).
- The build fails if either condition is not met.

---

## 6. Technical SEO and structured data

### 6.1 Every page
- `<title>` up to ~60 characters, unique, primary keyword first, "Florida" where natural.
- Meta description up to ~155 characters, unique, describing what the visitor gets. Not a keyword list.
- Exactly one H1, containing the primary keyword.
- Open Graph and Twitter cards with a page-specific image.
- `lang="en-US"`.
- Semantic HTML: `header`, `nav`, `main`, `article`, `aside`, `footer`, and a correct heading hierarchy.

### 6.2 Schema (JSON-LD, generated from the same data files for consistency)
- **Site-wide:** `Organization` + `WebSite`.
- **Homepage:** `HomeAndConstructionBusiness` (a LocalBusiness subtype) with name, telephone, address, geo, openingHoursSpecification, `areaServed` (State: Florida, later a list of cities), url, logo, image, `sameAs` (Google Business Profile, Yelp, BBB, Facebook, once available).
- **Service pages:** `Service` with `serviceType`, `provider` (referencing the LocalBusiness via `@id`), and `areaServed: Florida`.
- **Every page except the homepage:** `BreadcrumbList`.
- **Pages with FAQs:** `FAQPage`. Note: Google currently shows FAQ rich results mainly for government and health sites, so don't expect a rich result. The markup still helps structure, and the FAQ exists for visitors first.
- **Forbidden:** `aggregateRating` or `review` not based on real reviews displayed on the site. Never invent reviews.
- Validation: every schema passes the Rich Results Test and validator.schema.org.

### 6.3 robots.txt and crawlers
- Allow all crawlers, including AI search crawlers: `Googlebot`, `Bingbot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-SearchBot`, `Applebot`. (Whether to block training crawlers like `GPTBot` or `Google-Extended` is the owner's business decision. Default: allow.)
- Point to the sitemap.
- `llms.txt`: a short file describing the business and linking to key pages is fine, but **Google has stated it does not use it**. It replaces nothing else.

### 6.4 Visibility in AI search (no tricks)
Google says explicitly that optimizing for AI Overviews and AI Mode is regular SEO, and that artificial "chunking", special files, or rewriting content "for AI" are unnecessary. What actually works:
- **Non-commodity content:** field experience, numbers, diagnoses, and trade-offs you can't find on every other site.
- **Answer-first:** every H2 phrased as a question is answered in the first 1-2 sentences beneath it, then detail and caveats follow.
- **Clear, consistent entities:** business name, service area, license, and phone are identical everywhere (site, Google Business Profile, directories).
- **Bing Webmaster Tools + IndexNow:** several AI engines rely on Bing's index. Add an IndexNow key and ping every new or updated page.
- **A complete, current Google Business Profile** is a core part of local visibility, including in AI answers.
- Content revealed on click (accordions) must still be in the HTML. Build the FAQ with native `<details>`/`<summary>`.

---

## 7. Service page structure (a flexible framework, not a copy-paste template)

Every service page has these elements, but **the order, headings, and angle change with the topic**. Pages must never open with the same sentence, share the same H2s, or read like one page with a word swapped.

1. **Short hero:** H1, a 1-2 sentence subline that addresses the need directly, phone + quote CTA, trust strip (license, insurance, service area, years in business, real data only).
2. **Answer block:** a 40-60 word paragraph answering "what is it, when do you need it, and what gets done". This is what AI engines quote most.
3. **Body content:** sections built around the page's unique angle (section 8), short paragraphs (2-4 sentences), bullets only for real lists, tables for comparisons.
4. **At least one unique infographic:** built in HTML/SVG with real text (accessible and crawlable), not an image with baked-in text. Each page gets an infographic **different in type and content** (section 8).
5. **"What happens on a visit":** the business's real workflow, based on details the owner provides.
6. **Proof of experience:** a real job story (case note) with before/after photos. Until real details arrive, leave a `{{CASE_NOTE}}` placeholder and don't write an invented story.
7. **FAQ:** 8-15 questions (section 7.1).
8. **Short closing CTA**, not pushy.
9. **Dynamic sidebar** (section 4).
10. **Review line:** "Last reviewed {date} by {{REVIEWER_NAME}}, {{REVIEWER_ROLE}}". Only if a real person holds that role. Otherwise no byline.

### 7.1 FAQ rules
- **8-15 questions on every page** (including the homepage).
- Questions people actually ask: based on "People also ask", related searches, forums (Reddit, Houzz), and questions the owner hears on the phone.
- **No question repeats across pages**, not even reworded. Keep a central registry `content/faq-registry.json`; the build fails on duplicates.
- Each answer: 1-3 sentences, the first one answers directly (yes/no/number/action), then a short caveat or detail if needed.
- Price answers: a range with conditions, only if the owner approved it. Otherwise explain what drives the price.

---

## 8. First pages: a unique angle for each

> These angles are direction. Every technical or regulatory fact (building code, permits, licensing) must be verified against a primary source before publishing, and linked to it when that helps the visitor.

### 8.1 Homepage `/`
- **H1:** `Sliding Glass Door Repair in Florida` (the brand name can be added later, but the phrase must appear in full).
- **Keywords:** sliding glass door repair (primary), sliding door repair, sliding patio door repair, sliding glass door repair near me, sliding door repair near me. "Near me" terms are not written as "near me" in the text. They're answered by being clear about the service area.
- **Angle:** a diagnosis hub. "What your door is doing, why it happens, and what fixes it."
- **Infographic:** an interactive **Symptom Finder** (a small Client Component with a full HTML fallback): door sticks / jumps the track / won't lock / drafts or leaks / fogged glass / cracked glass. Each symptom shows the likely cause and links to the matching service page.
- **Suggested sections:** what we fix; why Florida doors wear differently (salt air, sand in tracks, humidity, sun, hurricane season); repair vs. replace in brief (links to the replacement page); what a visit looks like; service areas.
- **No sidebar.**

### 8.2 `/sliding-glass-door-replacement`
- **Keyword:** sliding glass door replacement.
- **Angle:** the decision, plus Florida regulation. When repair no longer makes sense, and what replacement involves.
- **Topics to verify and cover:** impact-rated vs. non-impact; building permits for replacement; Florida Product Approval (FL#) and Miami-Dade NOA in HVHZ areas (Miami-Dade and Broward); aluminum vs. vinyl; configurations (XO, OXO, OXXO, pocketing); Low-E glass; timeline from order to install; what happens on install day. Licensing: replacement is done by a licensed contractor. Verify with DBPR which license type applies, and display the business's license.
- **Infographic:** a "Repair or replace?" decision matrix (door age, frame condition, glass damage, energy efficiency, impact requirements) plus an XO/OXO/OXXO configuration diagram.

### 8.3 `/patio-door-repair`
- **Keywords:** patio door repair, patio door repair near me.
- **Angle:** identifying the door type. "Patio door" covers sliding doors, French (hinged) doors, and multi-slide systems. The page helps visitors identify what they have and the common problems for each type.
- **⚠️ Confirm with the owner:** does the business also repair hinged patio doors? If not, the page focuses on sliding patio doors and is honest about what's out of scope.
- **Infographic:** "Which patio door do you have?", visual ID cards by type, with the common failures for each.

### 8.4 `/sliding-door-roller-replacement`
- **Keywords:** sliding glass door roller replacement, sliding door roller replacement, sliding door rollers.
- **Angle:** the roller itself. Types (nylon, steel, stainless, ball-bearing), why salt air destroys rollers, the first check to try (the adjustment screw), and how to identify your roller.
- **Note on "sliding door rollers":** some searchers want to buy a part. Give them real value (how to measure and identify a roller), then explain when it's better to have someone replace it.
- **Infographic:** a roller identification and measuring guide (wheel diameter, housing width, mounting type) as a labeled SVG.

### 8.5 `/sliding-door-lock-and-handle-repair`
- **Keywords:** patio door lock replacement, sliding door lock repair, sliding door handle replacement.
- **Angle:** security and fit. Mortise vs. surface-mount locks; why the latch stops catching (usually the door has sagged, meaning a roller problem); measuring handle hole spacing; extra security layers (anti-lift, foot lock, security bar).
- **Infographic:** "Layers of sliding door security" diagram, plus hole-spacing measuring instructions.

### 8.6 `/sliding-screen-door-repair`
- **Keyword:** sliding screen door repair.
- **Angle:** screens in Florida conditions. Rescreening, bent frames, screen door rollers, pet screen, fine mesh for no-see-ums, sun damage.
- **Infographic:** a screen mesh comparison table (density, durability, visibility, best for...).

### 8.7 `/sliding-door-track-repair`
- **Keyword:** sliding door track repair.
- **Angle:** the track. Cleaning vs. repair vs. track cap vs. replacement; sand and salt; bent or worn track; clogged weep holes that flood the sill.
- **Infographic:** a track cross-section with damage types labeled, each paired with its fix.

### 8.8 `/sliding-closet-door-repair`
- **Keyword:** sliding closet door repair.
- **Angle:** interior doors, a completely different product. Bypass doors, mirrored closet doors, top-hung vs. bottom-rolling systems, floor guides, doors that come off the top track.
- **Infographic:** a visual comparison of bypass / bifold / pocket doors and how to tell which you have.

### 8.9 Other pages
- **`/about`:** the real people (real names and photos), license and insurance with a link to verify on DBPR, where the experience comes from, which parts of Florida they work in, and what the business doesn't do. **Forbidden:** invented profiles, AI-generated photos, or false credentials. Google explicitly calls this deception and a low-quality signal.
- **`/contact`:** prominent click-to-call phone, form, address (if customers visit, otherwise service area only), hours, service areas, typical response time (only if real). No heavy embedded Google Map; if needed, a static image linking to the map.
- **`/privacy-policy`:** tailored to actual operations: data collected by the form, analytics, cookies, call tracking (if dynamic tracking numbers are used, state that calls may be recorded or measured), who data is shared with, retention, rights, contact details. Mark it as a draft that should be reviewed by a lawyer.
- **`/accessibility-statement`:** target WCAG 2.1 AA (aiming for 2.2 AA), what has been done, known limitations, how to report a problem (email and phone), response time, last-updated date.

---

## 9. Placeholders: to be provided later

Use exactly these names, in a single `content/business.ts` file that everything pulls from:

```
{{BRAND_NAME}}  {{DOMAIN}}  {{PHONE}}  {{EMAIL}}
{{ADDRESS}}  {{SERVICE_AREA_TYPE}} (storefront / service-area business)
{{LICENSE_TYPE}}  {{LICENSE_NUMBER}}  {{INSURANCE}}
{{YEARS_IN_BUSINESS}}  {{FOUNDER_NAME}}  {{REVIEWER_NAME}}  {{REVIEWER_ROLE}}
{{HOURS}}  {{SERVICE_AREAS}} (Florida counties/cities)
{{GBP_URL}}  {{SOCIAL_URLS}}
{{PRICE_RANGES}} (only if the owner approves)
{{CASE_NOTES}} (real job stories + photos)
```

**Owner experience questionnaire:** create `OWNER-QUESTIONNAIRE.md` with 15-25 questions whose answers will make the content authentic. For example: What's the most common failure you see in homes near the coast? Which door brands do you run into most? What's the most common mistake people make trying to fix it themselves? When do you tell a customer it's not worth repairing? How long does a typical roller replacement take? Which parts do you carry in the truck? Also request 3-5 job stories with photos per service.

---

## 10. Future city pages: rules from day one

City pages are where service sites fall into Google's doorway policy ("pages targeted at specific regions or cities that funnel users to one page"). Therefore:
- **No city page is published without at least 5 unique, verified local facts**: whether the city is in the HVHZ, the local permit office and its requirements, coastal salt exposure, common building stock (condos / older homes / new construction), common HOA or condo rules, neighborhoods where the business actually works, and a real local job story.
- The city page layout adapts to what there is to say about the city. Never "Miami" swapped for "Tampa".
- Each city page is linked from 1-2 neighboring city pages and a relevant service page, and later from a flat `/service-areas` page.
- The similarity check (section 11) applies to them too.

---

## 11. Automated quality control (mandatory)

Scripts that run in `prebuild`; a failure in any of them stops the build:
1. **Cross-page similarity check:** compare every pair of pages using 5-word shingles (Jaccard) on body content, excluding header/footer/sidebar. Maximum overlap: 15%. Above that, the build fails with a report of the overlapping sentences.
2. **AI-style linter:** scans all content against the blocklist in `CONTENT-GUIDE.md` (words, phrases, and patterns, including the em dash `—`). Warns on every hit, and fails on any em dash or above the threshold defined in the guide.
3. **FAQ registry:** no duplicate question across pages.
4. **Links:** no broken links and no orphan pages.
5. **Schema:** valid JSON-LD matching `business.ts`.
6. **Placeholders:** a production build fails if any visitor-facing `{{...}}` remains.

---

## 12. Order of work

1. Read `CONTENT-GUIDE.md`.
2. Set up the project, the design system (color and type tokens), and base components.
3. Build `business.ts`, `services.ts`, `faq-registry.json`, and the QC scripts.
4. **Research each page before writing:** Google results for the keyword (what's covered, and what's **not** covered that we can add), "People also ask", primary sources (sources section of the guide). Write a short brief per page in `/briefs/{slug}.md`: search intent, unique angle, facts with sources, infographic, FAQ list.
5. Write the content page by page, following the guide.
6. Build the infographics.
7. Run all checks, Lighthouse, and an accessibility audit (axe).
8. Produce `OWNER-QUESTIONNAIRE.md` and a list of all remaining placeholders.
9. Summary report: what was built, what's waiting on owner data, and recommended post-launch steps (Search Console, Bing Webmaster Tools, IndexNow, Google Business Profile, local citations: BBB, Yelp, Angi, Nextdoor, chambers of commerce).
