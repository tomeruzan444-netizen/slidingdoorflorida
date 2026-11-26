import Image, { type StaticImageData } from "next/image";
import closetRoller from "@/public/images/closet-door-bottom-roller-adjustment.jpg";
import patioLift from "@/public/images/patio-door-panel-lift-pool.jpg";
import screenHeight from "@/public/images/screen-door-height-adjustment.jpg";
import screenRoller from "@/public/images/screen-door-roller-replacement.jpg";
import lockKeeper from "@/public/images/sliding-door-lock-keeper-adjustment.jpg";
import lockRepair from "@/public/images/sliding-door-lock-repair.jpg";
import rollerAdjust from "@/public/images/sliding-door-roller-adjustment.jpg";

/**
 * In-article photos. Each one sits in the section it illustrates; the caption adds the practical point.
 * Alt text describes what's in the frame. Lazy-loaded (none of these is above the fold),
 * served by next/image as AVIF/WebP at the width the reader's screen needs.
 */
const PHOTOS: Record<string, { src: StaticImageData; alt: string; caption: string }> = {
  "roller-adjustment": {
    src: rollerAdjust,
    alt: "Turning the roller height screw at the bottom corner of a sliding glass door panel with a hand screwdriver",
    caption: "The roller adjustment screw sits at the bottom corner of the moving panel. Hand screwdriver, a quarter turn at a time.",
  },
  "lock-repair": {
    src: lockRepair,
    alt: "Adjusting the latch hardware on the edge of a sliding patio door with a screwdriver",
    caption: "Before anyone buys a new lock, the hook and the keeper get checked for alignment. Often a few turns of two screws is the whole fix.",
  },
  "lock-keeper": {
    src: lockKeeper,
    alt: "Fitting a keeper plate to the frame of a sliding glass door with a screwdriver, with a drill and hardware on the floor",
    caption: "The keeper on the frame has to meet the hook on the panel. When the panel sags, the latch closes on nothing.",
  },
  "closet-roller": {
    src: closetRoller,
    alt: "Adjusting the bottom roller of a sliding closet door with a screwdriver, with a replacement roller on the floor",
    caption: "On a bottom-rolling closet door, each roller has its own height screw near the floor. Raise the door until it sits well up in the top channel.",
  },
  "screen-roller": {
    src: screenRoller,
    alt: "Replacing the bottom roller on a sliding screen door, with the old roller and screws on the tile",
    caption: "Screen rollers are small spring-loaded wheels, separate from the glass door's. Measure the old one before ordering.",
  },
  "screen-height": {
    src: screenHeight,
    alt: "Adjusting the roller screw at the bottom corner of a sliding screen door frame",
    caption: "A screen that drags or pops off its rail usually needs its roller height reset before anything gets replaced.",
  },
  "patio-panel-lift": {
    src: patioLift,
    alt: "Lifting a sliding glass door panel in its frame, with a pool and a stepladder outside",
    caption: "Reaching the rollers on most sliders means lifting the panel out of the frame. On a heavy door that takes two people.",
  },
};

export function PagePhoto({ name }: { name: keyof typeof PHOTOS | string }) {
  const p = PHOTOS[name];
  if (!p) return null;
  return (
    <figure className="!my-8">
      <Image
        src={p.src}
        alt={p.alt}
        placeholder="blur"
        sizes="(min-width: 1024px) 672px, 100vw"
        className="h-auto w-full rounded-lg ring-1 ring-alu/60"
      />
      <figcaption className="figcap">{p.caption}</figcaption>
    </figure>
  );
}
