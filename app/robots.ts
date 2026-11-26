import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/business";

/**
 * All crawlers allowed, including AI search crawlers.
 * Blocking training crawlers (GPTBot, Google-Extended, CCBot) is the owner's call. Default: allow.
 */
export default function robots(): MetadataRoute.Robots {
  const aiSearch = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Applebot", "Bingbot", "Googlebot"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiSearch.map((ua) => ({ userAgent: ua, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
