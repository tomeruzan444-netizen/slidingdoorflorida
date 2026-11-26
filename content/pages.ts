import { business } from "./business";

/**
 * Page registry. Every URL on the site is listed here, flat under the domain.
 * Body copy lives in content/pages/{slug}.mdx (homepage: home.mdx).
 * FAQs live in content/faq-registry.json.
 *
 * `updated` is the date the CONTENT last changed. It feeds sitemap lastmod and the
 * review line. Change it only when the page text actually changes.
 */

export type PageKind = "home" | "service" | "utility";

export type PageEntry = {
  slug: string; // "" for the homepage
  kind: PageKind;
  metaTitle: string; // <= ~60 chars, primary keyword first
  description: string; // <= ~155 chars
  h1: string;
  subline: string; // 1-2 sentences under the H1
  answer?: string; // 40-60 word answer block (service pages)
  breadcrumb: string; // short name for breadcrumbs
  primaryKeyword: string;
  updated: string; // YYYY-MM-DD
  ogLabel?: string; // config notation shown in the hero and on the OG image
  faqHeading?: string; // unique per page
  closing?: string; // short closing CTA line, unique per page
};

export const pages: PageEntry[] = [
  {
    slug: "",
    kind: "home",
    metaTitle: "Sliding Glass Door Repair in Florida | Diagnose and Fix",
    description:
      "What your sliding door is doing, why Florida conditions cause it, and the repair that fixes it. Rollers, tracks, locks, glass and screens.",
    h1: "Sliding glass door repair in Florida",
    subline:
      "Tell us what the door is doing. Dragging, jumping the track, refusing to lock, leaking at the sill: each one points to a different part, and most are fixable without a new door.",
    breadcrumb: "Home",
    primaryKeyword: "sliding glass door repair",
    updated: "2026-11-26",
    ogLabel: "OXXO",
    faqHeading: "Sliding door repair questions from Florida homeowners",
    closing: "Not sure which part has failed? Send a photo and a sentence about what the door does, and we'll tell you what we think it is.",
  },
  {
    slug: "sliding-glass-door-replacement",
    kind: "service",
    metaTitle: "Sliding Glass Door Replacement in Florida: Permits, Impact",
    description:
      "When a sliding door is worth replacing, what Florida requires (permits, product approval, impact glass in HVHZ), and what install day looks like.",
    h1: "Sliding glass door replacement in Florida",
    subline:
      "A new door is the right call less often than people expect. When it is, Florida adds rules about permits, product approval and impact glass that shape what you can install.",
    breadcrumb: "Door replacement",
    primaryKeyword: "sliding glass door replacement",
    updated: "2026-11-26",
    ogLabel: "OXO",
    answer: "Sliding glass door replacement means removing the old frame and panels and installing a new door with Florida product approval for your location. It makes sense when the frame is corroded or bent, or when you want impact glass. In Florida it needs a building permit, and in Broward and Miami-Dade the door must be approved for the High-Velocity Hurricane Zone.",
    faqHeading: "Replacement questions: permits, impact glass and timing",
    closing: "Thinking about a new door but not sure the old one is done? Send us photos of the frame corners and the sill first. Sometimes the answer is a repair.",
  },
  {
    slug: "patio-door-repair",
    kind: "service",
    metaTitle: "Patio Door Repair in Florida: Sliders, French, Multi-Slide",
    description:
      "Figure out which patio door you have, what usually fails on that type, and what a repair involves. Sliding, hinged French and multi-slide doors.",
    h1: "Patio door repair for Florida homes",
    subline:
      "Sliding, hinged and multi-panel patio doors fail in different places. Start by working out which one you have.",
    breadcrumb: "Patio door repair",
    primaryKeyword: "patio door repair",
    updated: "2026-11-26",
    ogLabel: "XO",
    answer: "Patio door repair depends on the type of door. Sliders and multi-slide systems wear at the rollers, tracks and sill drainage, so repairs focus on leveling panels and clearing water paths. Hinged French doors sag at the hinges and stop meeting their strike, so the fix is hinge adjustment, shims and lock alignment.",
    faqHeading: "Patio door questions by door type",
    closing: "Not sure what kind of patio door you have? Send us a photo from inside with the door half open, and we'll tell you what it is and what usually wears on it.",
  },
  {
    slug: "sliding-door-roller-replacement",
    kind: "service",
    metaTitle: "Sliding Door Roller Replacement: Identify, Measure, Fix",
    description:
      "How to tell if your sliding door rollers are worn, try the adjustment screw first, and measure the roller so the replacement actually fits.",
    h1: "Sliding door roller replacement",
    subline:
      "If the door takes two hands or grinds as it moves, the rollers under the panel are the first suspect. Here's how to check them, measure them, and decide who swaps them.",
    breadcrumb: "Roller replacement",
    primaryKeyword: "sliding door roller replacement",
    updated: "2026-11-26",
    ogLabel: "OX",
    answer: "Sliding door roller replacement means swapping the small wheel assemblies in the bottom of the glass panel. You need it when the door drags or grinds and raising the rollers with their adjustment screws doesn't help. The panel comes out, the old rollers are matched by size and mounting, and new ones go in and get leveled.",
    faqHeading: "Roller questions, from adjustment screws to stainless",
    closing: "Measured your roller and still not sure it's the right one? Send us a photo of it next to a ruler and we'll tell you what we'd use.",
  },
  {
    slug: "sliding-door-lock-and-handle-repair",
    kind: "service",
    metaTitle: "Sliding Door Lock Repair and Handle Replacement, Florida",
    description:
      "Why a sliding door latch stops catching, how to measure for a replacement handle, and the security layers worth adding to a patio slider.",
    h1: "Sliding door lock repair and handle replacement",
    subline:
      "A latch that won't catch is usually a door that has dropped, not a broken lock. We check the fit first, then replace hardware only when it's actually worn out.",
    breadcrumb: "Locks and handles",
    primaryKeyword: "sliding door lock repair",
    updated: "2026-11-26",
    ogLabel: "XO",
    answer: "Sliding door lock repair starts with the fit. When a latch stops catching, the panel has usually sagged and the hook misses the keeper, so raising the rollers and moving the keeper often fixes it. Locks and handles get replaced when the hook is bent, the lever slips, or the parts are worn loose.",
    faqHeading: "Lock, latch and handle questions",
    closing: "Send a photo of the handle, the edge of the panel and the keeper on the frame. We can usually tell from those whether it's a fit problem or a worn-out lock.",
  },
  {
    slug: "sliding-screen-door-repair",
    kind: "service",
    metaTitle: "Sliding Screen Door Repair in Florida: Mesh, Frames, Rollers",
    description:
      "Rescreening, bent frames and screen door rollers, plus which mesh holds up to Florida sun, pets and no-see-ums.",
    h1: "Sliding screen door repair",
    subline:
      "Florida screens take more sun, salt and bugs than most. Picking the right mesh matters as much as the repair itself.",
    breadcrumb: "Screen doors",
    primaryKeyword: "sliding screen door repair",
    updated: "2026-11-26",
    ogLabel: "OX",
    answer: "Sliding screen door repair covers the three parts that fail: torn or sun-brittle mesh, bent aluminum frames, and the small spring rollers that keep the screen on its track. A straight frame gets rescreened, often with a mesh suited to Florida bugs, pets or sun. Worn rollers get replaced, and badly bent frames get a new screen door.",
    faqHeading: "Screen door questions",
    closing: "Tell us whether the screen is torn, bent or falling off the track, and what you'd like it to keep out. A photo of the bottom corner helps.",
  },
  {
    slug: "sliding-door-track-repair",
    kind: "service",
    metaTitle: "Sliding Door Track Repair: Clean, Straighten, Cap or Replace",
    description:
      "How to tell whether your sliding door track needs cleaning, straightening, a track cap or a new sill, and why clogged weep holes flood the floor.",
    h1: "Sliding door track repair",
    subline:
      "The rail under your door takes every grain of sand that blows in. Some damage cleans out, some straightens, and some needs a cap or a new sill.",
    breadcrumb: "Track repair",
    primaryKeyword: "sliding door track repair",
    updated: "2026-11-26",
    ogLabel: "OXO",
    answer: "Sliding door track repair fixes the aluminum rail and sill your door rolls on. You need it when the door bumps or grinds over one spot, jumps the track, or water pools in the sill. Depending on the damage, the fix is a deep cleaning and clearing the weep holes, straightening, a stainless cap, or a new sill section.",
    faqHeading: "Track and sill questions",
    closing: "Send us a close-up photo of the rail with a coin on it for scale. That's usually enough for us to tell cleaning from a cap from a new sill.",
  },
  {
    slug: "sliding-closet-door-repair",
    kind: "service",
    metaTitle: "Sliding Closet Door Repair: Bypass and Mirrored Doors",
    description:
      "Fix bypass and mirrored closet doors that fall off the track, scrape the floor or won't close. How to tell your hardware type and what fails.",
    h1: "Sliding closet door repair",
    subline:
      "Closet sliders hang from the top, not the bottom, so they fail differently than a patio door. Most fixes take a screwdriver and the right part.",
    breadcrumb: "Closet doors",
    primaryKeyword: "sliding closet door repair",
    updated: "2026-11-26",
    ogLabel: "XX",
    answer: "Sliding closet door repair fixes bypass and mirrored doors that fall off the track, scrape the floor, or leave a gap at the wall. These are interior doors that either hang from the top track or roll on a floor track. Most repairs are a height adjustment, a new roller or hanger, or a replacement floor guide.",
    faqHeading: "Closet door questions",
    closing: "Send a photo of the bottom corner of the door and the floor track, and we'll tell you whether it's an adjustment, a part, or something you can do yourself.",
  },
  {
    slug: "about",
    kind: "utility",
    metaTitle: `About ${business.brandName} | ${business.region}`,
    description: `${business.brandName}: ${business.teamSize} sliding door technicians in crews across Florida, led by founder ${business.founderName}, ${business.yearsInBusiness} years on sliding doors.`,
    h1: `About ${business.brandName}`,
    subline: `${business.teamSize} technicians, crews across Florida, and ${business.yearsInBusiness} years of sliding door work behind every job.`,
    breadcrumb: "About",
    primaryKeyword: "about",
    updated: "2026-11-26",
  },
  {
    slug: "contact",
    kind: "utility",
    metaTitle: `Contact ${business.brandName} | ${business.phone}`,
    description: `Call ${business.phone} or send a photo of your sliding door for a quote. Our crews come to homes across Florida.`,
    h1: "Contact us",
    subline: "A photo of the door and a sentence about what it's doing gets you the most useful answer.",
    breadcrumb: "Contact",
    primaryKeyword: "contact",
    updated: "2026-11-26",
  },
  {
    slug: "privacy-policy",
    kind: "utility",
    metaTitle: "Privacy Policy",
    description: "What information this site collects through the quote form and analytics, how it's used, who it's shared with, and your choices.",
    h1: "Privacy policy",
    subline: "Draft pending legal review.",
    breadcrumb: "Privacy policy",
    primaryKeyword: "privacy policy",
    updated: "2026-11-26",
  },
  {
    slug: "accessibility-statement",
    kind: "utility",
    metaTitle: "Accessibility Statement",
    description: "Our accessibility target (WCAG 2.1 AA, working toward 2.2 AA), what we've done, known limits, and how to report a problem.",
    h1: "Accessibility statement",
    subline: "How we build this site so everyone can use it, and how to tell us when we fall short.",
    breadcrumb: "Accessibility",
    primaryKeyword: "accessibility statement",
    updated: "2026-11-26",
  },
];

export const pageBySlug = (slug: string) => pages.find((p) => p.slug === slug);
export const pathFor = (slug: string) => (slug ? `/${slug}` : "/");
