/**
 * Service catalog. Drives the header menu, footer, sidebar "Related services",
 * Service schema, and llms.txt.
 *
 * `related` is hand-curated: the reason line is the link text shown in the sidebar
 * of THAT page, so it's written for the context of the page it appears on.
 * The homepage is referenced with slug "".
 */

export type RelatedLink = { slug: string; reason: string };

export type Service = {
  slug: string;
  title: string; // full service name
  shortTitle: string; // menu label
  serviceType: string; // schema.org Service.serviceType
  menuBlurb: string; // one line under the menu item / service card
  topics: string[];
  related: RelatedLink[];
};

export const services: Service[] = [
  {
    slug: "sliding-glass-door-replacement",
    title: "Sliding glass door replacement",
    shortTitle: "Door replacement",
    serviceType: "Sliding glass door replacement",
    menuBlurb: "New doors, impact-rated options, permits handled",
    topics: ["replacement", "impact", "glass", "frame", "energy", "permits"],
    related: [
      { slug: "sliding-door-track-repair", reason: "Track repair, when the frame is sound but the rail is worn" },
      { slug: "sliding-door-roller-replacement", reason: "New rollers, the fix that often saves an older door" },
      { slug: "patio-door-repair", reason: "Patio door repair for French and multi-slide doors" },
      { slug: "sliding-door-lock-and-handle-repair", reason: "Lock and handle work if security is the real worry" },
    ],
  },
  {
    slug: "patio-door-repair",
    title: "Patio door repair",
    shortTitle: "Patio door repair",
    serviceType: "Patio door repair",
    menuBlurb: "Sliders, French doors and multi-slide systems",
    topics: ["patio", "movement", "hardware", "glass", "weather"],
    related: [
      { slug: "sliding-door-roller-replacement", reason: "Roller replacement for a patio slider that drags" },
      { slug: "sliding-door-track-repair", reason: "Track repair when sand and salt have pitted the rail" },
      { slug: "sliding-door-lock-and-handle-repair", reason: "Lock repair for a latch that no longer catches" },
      { slug: "sliding-screen-door-repair", reason: "Screen repair for the panel that rides outside" },
      { slug: "sliding-glass-door-replacement", reason: "Replacement, when repairs stop adding up" },
    ],
  },
  {
    slug: "sliding-door-roller-replacement",
    title: "Sliding door roller replacement",
    shortTitle: "Roller replacement",
    serviceType: "Sliding door roller replacement",
    menuBlurb: "For doors that drag, grind or need two hands",
    topics: ["rollers", "movement", "hardware"],
    related: [
      { slug: "sliding-door-track-repair", reason: "Track repair, since new rollers on a bad rail wear out fast" },
      { slug: "sliding-door-lock-and-handle-repair", reason: "Lock alignment, because a sagging door misses the keeper" },
      { slug: "sliding-screen-door-repair", reason: "Screen door rollers, a smaller part with the same job" },
      { slug: "sliding-glass-door-replacement", reason: "Replacement, if the bottom rail itself is corroded" },
    ],
  },
  {
    slug: "sliding-door-lock-and-handle-repair",
    title: "Sliding door lock and handle repair",
    shortTitle: "Locks and handles",
    serviceType: "Sliding door lock and handle repair",
    menuBlurb: "Latches that won't catch, broken handles, added security",
    topics: ["locks", "hardware", "security"],
    related: [
      { slug: "sliding-door-roller-replacement", reason: "Roller adjustment, the usual cause of a lock that won't line up" },
      { slug: "sliding-door-track-repair", reason: "Track repair if the panel rides too low to latch" },
      { slug: "sliding-glass-door-replacement", reason: "Replacement with a multipoint lock for real security gains" },
      { slug: "patio-door-repair", reason: "Patio door repair for hinged doors with worn hardware" },
    ],
  },
  {
    slug: "sliding-screen-door-repair",
    title: "Sliding screen door repair",
    shortTitle: "Screen doors",
    serviceType: "Sliding screen door repair",
    menuBlurb: "Rescreening, bent frames, screen rollers, pet mesh",
    topics: ["screens", "rollers", "movement"],
    related: [
      { slug: "sliding-door-roller-replacement", reason: "Main door rollers, if the glass panel drags too" },
      { slug: "sliding-door-track-repair", reason: "Track repair for the outer rail the screen rides on" },
      { slug: "patio-door-repair", reason: "Patio door repair for the rest of the door system" },
    ],
  },
  {
    slug: "sliding-door-track-repair",
    title: "Sliding door track repair",
    shortTitle: "Track repair",
    serviceType: "Sliding door track repair",
    menuBlurb: "Bent, pitted or flooding tracks and sills",
    topics: ["track", "movement", "water", "frame"],
    related: [
      { slug: "sliding-door-roller-replacement", reason: "Roller replacement, the other half of a smooth slide" },
      { slug: "sliding-glass-door-replacement", reason: "Replacement, when the sill is too far gone to cap" },
      { slug: "patio-door-repair", reason: "Patio door repair for leaks and drafts around the frame" },
      { slug: "sliding-screen-door-repair", reason: "Screen door repair if the screen rail is bent as well" },
    ],
  },
  {
    slug: "sliding-closet-door-repair",
    title: "Sliding closet door repair",
    shortTitle: "Closet doors",
    serviceType: "Sliding closet door repair",
    menuBlurb: "Bypass and mirrored doors that jump the track",
    topics: ["closet", "interior", "rollers", "track"],
    related: [
      { slug: "sliding-door-roller-replacement", reason: "Patio door rollers, a heavier version of the same problem" },
      { slug: "sliding-door-track-repair", reason: "Patio door track repair for the exterior slider" },
      { slug: "", reason: "Sliding glass door repair for the door to your lanai" },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
