import type { MetadataRoute } from "next";
import { isStaging, siteUrl } from "@/content/business";

/**
 * Every crawler is allowed. The owner wants the site visible in Google and in AI search and answer engines,
 * so search, assistant and AI crawlers are also named explicitly (some only honor a rule that names them).
 * Only /api/ is off limits (the quote form endpoint). CSS, JS and images stay crawlable so Google can render pages.
 */
const NAMED_CRAWLERS = [
  // Search engines
  "Googlebot", "Googlebot-Image", "Bingbot", "Applebot", "DuckDuckBot", "YandexBot",
  // Google AI (Gemini, AI Overviews grounding) and Apple Intelligence
  "Google-Extended", "Applebot-Extended",
  // OpenAI: ChatGPT search, user-triggered browsing, model crawler
  "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  // Anthropic: Claude search, user-triggered fetches, crawler
  "Claude-SearchBot", "Claude-User", "ClaudeBot",
  // Perplexity
  "PerplexityBot", "Perplexity-User",
  // Other assistants
  "DuckAssistBot", "Amazonbot", "meta-externalagent", "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  // Staging mode only (SITE_STAGING=1): keep every crawler out.
  if (isStaging) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: NAMED_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
