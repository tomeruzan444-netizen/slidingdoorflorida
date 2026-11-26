import type { Metadata } from "next";
import { business } from "../content/business";
import { pathFor, type PageEntry } from "../content/pages";

export function metadataFor(page: PageEntry): Metadata {
  const path = pathFor(page.slug);
  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      title: page.metaTitle,
      description: page.description,
      siteName: business.brandName,
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.description },
  };
}
