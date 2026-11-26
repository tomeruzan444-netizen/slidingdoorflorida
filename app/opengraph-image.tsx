import { pageBySlug } from "@/content/pages";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Sliding glass door repair in Florida";

export default function Image() {
  const p = pageBySlug("")!;
  return renderOg(p.h1, p.ogLabel);
}
