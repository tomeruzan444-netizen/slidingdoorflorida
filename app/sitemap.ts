import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/business";
import { pages, pathFor } from "@/content/pages";

/** lastmod comes from each page's `updated` field (real content change date), never the build date. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${siteUrl}${p.slug ? pathFor(p.slug) : ""}`,
    lastModified: p.updated,
  }));
}
