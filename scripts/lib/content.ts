import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pages, type PageEntry } from "../../content/pages";
import { faqsFor } from "../../lib/faqs";

export const ROOT = join(import.meta.dirname, "..", "..");

export const mdxPath = (slug: string) => join(ROOT, "content", "pages", `${slug || "home"}.mdx`);

export const readMdx = (slug: string) => {
  const p = mdxPath(slug);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

/** Internal links written in the MDX body: markdown links and href="/..." attributes. */
export function contextualLinks(mdx: string): string[] {
  const out: string[] = [];
  const md = /\]\((\/[^)\s#]*)(?:#[^)]*)?\)/g;
  const attr = /href=["'](\/[^"'#]*)(?:#[^"']*)?["']/g;
  for (const re of [md, attr]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(mdx))) out.push(m[1].replace(/\/$/, "") || "/");
  }
  return out;
}

/** Plain prose from MDX: drop imports/exports, JSX tags, comments, markdown syntax. */
export function mdxToText(mdx: string): string {
  return mdx
    .replace(/^(import|export)\s.*$/gm, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Body text used for similarity: answer block + MDX prose + FAQs. Header/footer/sidebar excluded by construction. */
export function bodyText(page: PageEntry): string {
  const faqs = faqsFor(page.slug).map((f) => `${f.q} ${f.a}`).join(" ");
  return [page.answer ?? "", mdxToText(readMdx(page.slug)), faqs].join(" ");
}

export const allPages = pages;

export type Issue = { level: "error" | "warn"; check: string; msg: string };
export const report = (issues: Issue[]) => {
  for (const i of issues) console.log(`${i.level === "error" ? "  ✗" : "  !"} [${i.check}] ${i.msg}`);
};
