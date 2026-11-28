import Link from "next/link";
import { business, telHref } from "@/content/business";
import { relatedFor } from "@/lib/sidebar";
import { PhoneIcon } from "./Icons";

export function Sidebar({ slug, showRelated = true }: { slug: string; showRelated?: boolean }) {
  const related = showRelated ? relatedFor(slug) : [];
  return (
    <aside aria-label="Help and related services" className="space-y-8 lg:sticky lg:top-24">
      <div className="panel-track">
        <div className="panel p-5">
          <p className="config-label">XO</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">Need help now?</p>
          <p className="mt-1 text-[0.95rem] text-frame-soft">Tell us what the door is doing. A photo helps.</p>
          <a
            href={telHref}
            className="mt-4 flex items-center justify-center gap-2 rounded bg-bronze px-4 py-3 font-semibold text-white no-underline hover:bg-bronze-dark"
          >
            <PhoneIcon /> {business.phone}
          </a>
          <Link
            href="#quote"
            className="mt-2 block rounded border border-teal px-4 py-3 text-center font-semibold text-teal no-underline hover:bg-sea-soft"
          >
            Send a photo for a quote
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <nav aria-labelledby="related-heading">
          <p className="config-label">RELATED</p>
          <p id="related-heading" className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
            Related services
          </p>
          <ul className="mt-3 divide-y divide-alu border-y border-alu">
            {related.map((r) => (
              <li key={r.slug || "home"}>
                <Link
                  href={r.slug ? `/${r.slug}` : "/"}
                  className="block py-3 text-[0.97rem] font-medium leading-snug text-teal no-underline hover:text-bronze-dark"
                >
                  {r.reason}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
