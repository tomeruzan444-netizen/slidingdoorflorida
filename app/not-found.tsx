import Link from "next/link";
import { business, telHref } from "@/content/business";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="config-label">O X ? </p>
      <h1 className="mt-3 text-4xl font-bold">This page came off its track</h1>
      <p className="mt-4 max-w-xl text-lg text-frame-soft">
        The address doesn&apos;t match a page on our site. Pick the problem closest to yours, or call and describe it.
      </p>
      <a href={telHref} className="mt-6 inline-block rounded bg-bronze px-5 py-3 font-semibold text-white no-underline hover:bg-bronze-dark">
        Call {business.phone}
      </a>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        <li className="panel-track">
          <Link href="/" className="panel block p-4 no-underline">
            <span className="block font-semibold text-frame">Sliding glass door repair</span>
            <span className="text-sm text-frame-soft">Not sure what&apos;s wrong? Start here.</span>
          </Link>
        </li>
        {services.map((s) => (
          <li key={s.slug} className="panel-track">
            <Link href={`/${s.slug}`} className="panel block p-4 no-underline">
              <span className="block font-semibold text-frame">{s.title}</span>
              <span className="text-sm text-frame-soft">{s.menuBlurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
