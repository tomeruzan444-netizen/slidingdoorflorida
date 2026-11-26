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
  },
  {
    slug: "about",
    kind: "utility",
    metaTitle: "About Us | Sliding Door Repair in Florida",
    description:
      "Who repairs your door, the Florida license and insurance behind the work, where we work, and the jobs we turn down.",
    h1: "About us",
    subline: "The people, license and limits behind the work.",
    breadcrumb: "About",
    primaryKeyword: "about",
    updated: "2026-11-26",
  },
  {
    slug: "contact",
    kind: "utility",
    metaTitle: "Contact Us | Sliding Door Repair Quote in Florida",
    description:
      "Call or send a photo of your sliding door for a quote. Service areas, hours and what to include so we can tell you what's wrong faster.",
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
