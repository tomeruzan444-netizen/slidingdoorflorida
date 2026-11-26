import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CaseNote } from "@/components/CaseNote";
import { infographics } from "@/components/infographics";

const components: MDXComponents = {
  a: ({ href = "", children, ...rest }) =>
    href.startsWith("/") ? (
      <Link href={href} {...rest}>{children}</Link>
    ) : (
      <a href={href} rel="noopener" {...rest}>{children}</a>
    ),
  CaseNote,
  ...infographics,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
