# Facts for /about, /privacy-policy, /accessibility-statement

- **Check date for every item:** 2026-11-26
- **Status:** research notes, not page copy, not legal advice. BUILD-PROMPT 8.9 says the privacy policy is marked as a draft for lawyer review; that applies to everything in section B.

---

## A. Contractor license verification (for /about)

| # | Fact | Primary source | Status |
|---|---|---|---|
| A1 | DBPR's online licensee search lives at **https://www.myfloridalicense.com/wl11.asp?mode=0&SID=**, which currently redirects to **https://www.myfloridalicense.com/portalsearches/VerifyLicensee** ("Verify a Licensee"). | Fetched live 2026-11-26 (page clock showed 11/26/2026) | Verified |
| A2 | The search page offers four search types: "Search by Name", "Search by License Number", "Search by City or County", "Search by License Type", with Submit and Clear buttons. | Same page | Verified |
| A3 | Homeowner steps (as the page is laid out): 1) open the Verify a Licensee page; 2) choose "Search by License Number" (fastest, using the number the contractor gives you) or "Search by Name"; 3) submit; 4) in the result, check that the name matches the company or person you are hiring and that the license status is current/active. | Page layout verified; the "check name matches and status is current" advice is DBPR's own wording seen in search snippets from https://www2.myfloridalicense.com/tips-for-hiring-licensed-professionals/ ("verify that the license is current and issued to the company or person you want to hire") | Steps verified from page layout; DBPR tips page returned 403 to fetch, wording seen only in search snippet |
| A4 | DBPR also has a mobile app with "Verify License By Name" and "Verify License By License Number". | https://www2.myfloridalicense.com/how-to-verify-a-license/ (search snippet; page behind Cloudflare challenge) | **UNVERIFIED** (snippet only) |
| A5 | DBPR states it does not license or have jurisdiction over concrete contractors, painters, drywall contractors, cabinetmakers, tile installers, "or anyone doing minor repairs." Relevant: some door repair work may fall outside DBPR licensing, so /about should state only the license(s) the owner actually holds. | DBPR tips page, search snippet only | **UNVERIFIED** (snippet only). Do not paraphrase on site until confirmed |
| A6 | DBPR menu includes "File a Complaint" (https://www2.myfloridalicense.com/file-a-complaint/) and "Unlicensed Activity Search". | Live search page nav, 2026-11-26 | Verified |
| A7 | DBPR address shown on the portal: 2601 Blair Stone Road, Tallahassee FL 32399. | Live search page footer | Verified |

Placeholders for /about: license type and number, insurance, come only from the owner (`{{LICENSE}}` etc. per BUILD-PROMPT section 9).

## B. Privacy and contact law (for /privacy-policy; lawyer review required)

### B1. Florida Digital Bill of Rights (FDBR), ch. 501 part V, F.S.

| # | Fact | Primary source | Status |
|---|---|---|---|
| B1.1 | A "controller" under the FDBR must, among other things, make **more than $1 billion in global gross annual revenue** AND meet one of: (a) 50% or more of global gross revenue from online ad sales; (b) operate a consumer smart speaker/voice assistant service; (c) operate an app store with at least 250,000 apps. Entities controlling or controlled by such a controller are included. | s. 501.702(9), Florida Statutes (2026): https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0501/Sections/0501.702.html | Verified |
| B1.2 | **Conclusion:** a small Florida door repair business is not a "controller", so the FDBR's consumer-rights obligations (access, deletion, etc.) do not apply to it. | Follows from B1.1 | Verified by reading of statute (not legal advice) |
| B1.3 | Exception to watch: s. 501.715 (sensitive data) applies to any for-profit business that does business in Florida and collects personal data (it references only s. 501.702(9)(a)1.-3., without the revenue test). Such a business may not **sell** sensitive personal data without prior consent, and if it sells sensitive data must post "NOTICE: This website may sell your sensitive personal data." Contact-form data (name, phone, email, address, job description) is not sensitive data, and the business should not sell data at all. | s. 501.715 (2026): https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0501/Sections/0501.715.html | Verified that the section exists and cross-references (a)1.-3.; the definition of "sensitive data" (s. 501.702) was not re-read in full, so the "contact data is not sensitive" point is **UNVERIFIED in detail** |

### B2. Florida Information Protection Act (data security / breach), s. 501.171

| # | Fact | Primary source | Status |
|---|---|---|---|
| B2.1 | Applies to any "covered entity": sole proprietorship, partnership, corporation, or other commercial entity that acquires, maintains, stores or uses personal information. No size threshold. | s. 501.171(1)(b), F.S. (2026): https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0501/Sections/0501.171.html | Verified |
| B2.2 | "Personal information" is narrow: name plus SSN, driver license/ID, financial account number with access code, medical or health-insurance info, etc.; or username/email plus password. A typical contact form (name, phone, email, message) does not collect "personal information" in this sense. | s. 501.171(1)(g) | Verified (but avoid collecting SSN/payment data via the form) |
| B2.3 | Covered entities "shall take reasonable measures to protect and secure data in electronic form containing personal information." Breach notice to affected individuals no later than 30 days after determination; notice to the Department of Legal Affairs if 500+ Floridians affected. | s. 501.171(2), (3)(a), (4)(a) | Verified |

### B3. Calling and texting leads back (TCPA and Florida)

| # | Fact | Primary source | Status |
|---|---|---|---|
| B3.1 | TCPA rules are in 47 CFR 64.1200 (FCC regulation). Autodialed or artificial/prerecorded-voice calls to wireless numbers require the called party's prior express consent (64.1200(a)(1)); if the call is telemarketing/advertising, **prior express written consent** is required (64.1200(a)(2)). | https://www.law.cornell.edu/cfr/text/47/64.1200 (fcc.gov consumer guides and eCFR returned 403 to automated fetch) | Verified |
| B3.2 | "Prior express written consent" = a written agreement, signed by the person called (e-signature allowed under E-SIGN per FCC rules; not re-checked), clearly authorizing the seller to deliver such calls/texts, including the phone number. (64.1200(f)(9)) | Same | Verified (E-SIGN note **UNVERIFIED**) |
| B3.3 | Telephone solicitations to residential subscribers may not be made before 8 a.m. or after 9 p.m. local time of the called party (64.1200(c)(1)); numbers on the National Do Not Call Registry are protected (64.1200(c)(2)). | Same | Verified |
| B3.4 | "Established business relationship" for telephone solicitations includes an inquiry or application by the consumer within the previous 3 months, or a purchase/transaction within 18 months (64.1200(f)(5)). Relevant to calling back someone who filled in the form. | Same | Verified |
| B3.5 | Revocation of consent: currently "any reasonable method", honored within a reasonable time not exceeding 10 business days (64.1200(a)(10)). **In flux:** FCC Report and Order in CG Docket 02-278 (fact sheet dated Sept 9, 2026; adopted Sept 30, 2026; Federal Register publication reported late Oct 2026) lets callers designate an exclusive revocation method (e.g. standard words like STOP by reply text, a website or phone number) and narrows "revoke all" for informational calls; effective 30 days after FR publication. A further notice seeks comment on shortening the 10-day window. | FCC fact sheet: https://docs.fcc.gov/public/attachments/DOC-424844A1.pdf (fetched, text extracted); 47 CFR 64.1200 page shows amendment 91 FR 67219 (Oct 26, 2026) | Fact sheet verified; **exact effective date and final 64.1200(a)(10) text UNVERIFIED** |
| B3.6 | The FCC's 2023 "one-to-one consent" rule was vacated by the 11th Circuit on Jan 24, 2025 (Insurance Marketing Coalition v. FCC, No. 24-10277); prior express written consent requirements otherwise continue. | Law-firm summaries via search (mofo.com, venable.com); court opinion not fetched | **UNVERIFIED** against primary source |
| B3.7 | Florida Telephone Solicitation Act, s. 501.059: a "telephonic sales call" includes calls, **text messages** and voicemail for soliciting a sale. A call made "in response to an express request of the person called" is not an unsolicited call. Automated-dialing or recorded-message unsolicited sales calls require prior express written consent (501.059(8)(a)). Before suing over texts, the consumer must reply "STOP"; the sender then has 15 days to stop (501.059(10)(c)). Persons who said they do not want calls may not be contacted (501.059(5)); Florida "no sales solicitation" list in 501.059(4). | s. 501.059, F.S. (2026): https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0501/Sections/0501.059.html | Verified |
| B3.8 | Florida Telemarketing Act, s. 501.616(6): commercial telephone solicitation calls not before 8 a.m. or after 8 p.m. local time of the called person; max 3 calls per 24 hours to a person on the same subject. Whether a callback to a form lead is a "commercial telephone solicitation" under part IV of ch. 501 (which has exemptions) was not checked. | s. 501.616 (2026): https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0501/Sections/0501.616.html | Hours/limit verified; **applicability to lead callbacks UNVERIFIED** |

**Practical notes for the form/policy (for lawyer to confirm):** a consent checkbox (not pre-checked) stating the business may call/text the number provided about the request; state that consent isn't a condition of purchase; honor STOP replies; call within 8 a.m.-8 p.m. local (the stricter Florida window); if dynamic call-tracking numbers or recording are used, say so (BUILD-PROMPT 8.9).

## C. Accessibility (for /accessibility-statement)

| # | Fact | Primary source | Status |
|---|---|---|---|
| C1 | WCAG 2.1 became a W3C Recommendation on 5 June 2018 (later updated 21 Sept 2023, 12 Dec 2024, 6 May 2025). | https://www.w3.org/WAI/standards-guidelines/wcag/ (page last updated 17 Sept 2026) | Verified |
| C2 | WCAG 2.2 became a W3C Recommendation on 5 October 2023; current version dated 12 December 2024. URL: https://www.w3.org/TR/WCAG22/ | Same + https://www.w3.org/TR/WCAG22/ | Verified |
| C3 | W3C: "W3C encourages you to use the latest version of WCAG." Content conforming to 2.2 also conforms to 2.1 and 2.0. | Same | Verified |
| C4 | Three conformance levels: A, AA, AAA. Level AA conformance means meeting all Level A and Level AA success criteria (standard WCAG conformance requirement 1). | https://www.w3.org/TR/WCAG22/ | Levels verified; the exact "all A and AA" wording of the conformance section was not quoted in the fetch (well established, but treat as **to re-quote** before publishing) |
| C5 | New in 2.2 at levels A/AA (relevant to target "2.1 AA, aiming for 2.2 AA"): 2.4.11 Focus Not Obscured (Minimum) AA; 2.5.7 Dragging Movements AA; 2.5.8 Target Size (Minimum) AA; 3.2.6 Consistent Help A; 3.3.7 Redundant Entry A; 3.3.8 Accessible Authentication (Minimum) AA. (AAA additions: 2.4.12, 2.4.13, 3.3.9.) | https://www.w3.org/TR/WCAG22/ | Verified |
| C6 | 4.1.1 Parsing is "Obsolete and removed" in WCAG 2.2. | https://www.w3.org/TR/WCAG22/ | Verified |
| C7 | WCAG 3 is an early draft, not a standard. | https://www.w3.org/WAI/standards-guidelines/wcag/ | Verified |

Practical notes: 3.2.6 Consistent Help maps directly to keeping phone/contact in the same place on every page; 2.5.8 Target Size affects click-to-call buttons on mobile. Statement content per BUILD-PROMPT 8.9: target, what was done, known limitations, how to report (email + phone placeholders), response time (owner), last-updated date.

## Not used / blocked sources

- eCFR (ecfr.gov), fcc.gov consumer pages, www2.myfloridalicense.com content pages: blocked automated fetch (403 / challenge). Cornell LII and govinfo used for CFR text; DBPR search page fetched directly.

## D. Owner-supplied business facts (for /about, /contact, footer, schema)

Supplied by the owner on 2026-11-26. These are business facts, not research: they are published as given and live in `content/business.ts`.

| Fact | Value |
|---|---|
| Business name | Davis Sliding Door Repair |
| Founder | Joseph Davis |
| Phone | (954) 807-2446, tel:+19548072446 |
| Email | davisslidingdoorrepair@gmail.com |
| Years of experience | 15 |
| Business type | Service-area business, no public street address (no address on the site or in schema) |
| Owner's description | "Davis Sliding Door Repair is a sliding door repair and installation company founded by Joseph Davis, with 15 years of experience in sliding door services across South Florida." |
| Service areas | Miami-Dade County: Miami, Hialeah, Miami Gardens. Broward County: Fort Lauderdale, Pembroke Pines, Hollywood, Miramar, Coral Springs, Pompano Beach, Davie, Plantation, Sunrise, Deerfield Beach. Palm Beach County: West Palm Beach, Boca Raton. |

Still missing from the owner: domain, license type and number, insurance wording, hours, Google Business Profile and other listing URLs, technical reviewer, price ranges, job stories with photos, founder bio and photo.

## E. Owner interview: Joseph Davis (2026-11-26)

Joseph's own answers, supplied by the owner. Quotes on the site are taken from this text verbatim (trimmed, never reworded) through the `<JosephSays>` component. Paraphrases stay within what is said here.

Notes for editors:
- Answer 2 names Naples, which is outside the service area. Naples isn't quoted on the site.
- Answer 7 calls the company "Davis Sliding Doors" and says "throughout Florida". The registered brand is Davis Sliding Door Repair and the service area is three counties, so that sentence isn't quoted.
- Answer 4 is the source of the roller-page case note. No city or photos were given.

1. **Most common failures.** "The three most common problems I see are worn-out rollers, damaged or dirty tracks, and faulty sliding door locks. Rollers tend to wear down over time, making doors difficult to open and close. Tracks can collect dirt, sand, and debris, which creates additional friction. Locking mechanisms also wear out or become misaligned, making it difficult to secure the door properly. These are issues I come across regularly in Florida homes."
2. **Hardest areas.** "Coastal areas are particularly tough on sliding glass doors. Places like Miami, Fort Lauderdale, Naples, and other waterfront communities deal with salt air, humidity, and moisture on a daily basis. Salt exposure can accelerate corrosion on metal components, while humidity and sand can contribute to premature wear. Homes near the ocean generally require more frequent maintenance than homes further inland."
3. **Hard-to-source brands.** "Some older or discontinued sliding door systems can be difficult to work on, especially when manufacturers no longer produce replacement components. I've found that older door models from manufacturers like PGT, CGI, and certain discontinued aluminum door brands can sometimes require extra effort to source the correct rollers, handles, or locking mechanisms. The biggest challenge isn't always the brand itself, but identifying the exact model and finding compatible replacement parts."
4. **A memorable job.** Door the homeowner thought needed full replacement; extremely hard to move; assumed frame damage. Cause: worn-out rollers plus years of dirt and debris in the track. Fix: new rollers, cleaned track, adjustment. Door operated smoothly again; homeowner surprised a straightforward repair avoided replacement.
5. **When not to repair.** "I'm always honest with customers about whether a repair makes financial sense. If the door frame is severely damaged, the glass is compromised, or the system has extensive corrosion and multiple failing components, replacement may be the better long-term investment. I don't believe in recommending a repair just to get a job. If replacing the door will provide better value, safety, and reliability, that's what I'll tell the homeowner."
6. **Most common DIY mistake.** "The biggest mistake I see is trying to force a sliding glass door open or attempting to adjust the rollers without understanding how the door is constructed. Sliding doors are heavy, and improper handling can damage the track, rollers, or frame. Another common mistake is purchasing replacement rollers based only on appearance rather than checking the exact measurements and specifications. Even small differences can affect how the door operates."
7. **Getting into the trade.** Enjoyed hands-on work and solving practical problems; learned how sliding doors are built, how components work, how to diagnose common issues; hands-on experience with roller replacements, track repairs, lock adjustments and complete restorations; "After years of working in the field, I realized how much homeowners needed a reliable specialist who genuinely understood these systems." That led to founding the company.
