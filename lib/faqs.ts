import registry from "../content/faq-registry.json";
import type { Faq } from "./schema";

const pagesMap = (registry as { pages: Record<string, Faq[]> }).pages;

/** FAQs for a page. Homepage key is "home". */
export const faqsFor = (slug: string): Faq[] => pagesMap[slug || "home"] ?? [];
export const allFaqs = () => pagesMap;
