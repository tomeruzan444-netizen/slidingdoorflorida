import Link from "next/link";
import { business, telHref } from "@/content/business";
import { services } from "@/content/services";
import { Logo } from "./Logo";
import { ChevronIcon, MenuIcon, PhoneIcon } from "./Icons";

/** Zero-JS header: menus are native <details>, so they work without hydration. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-alu/70 bg-sand/90 backdrop-blur supports-[backdrop-filter]:bg-sand/80">
      <a href="#main" className="sr-only-focusable absolute left-3 top-3 z-50 rounded bg-teal px-3 py-2 text-white">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded px-3 py-2 font-medium text-frame hover:text-teal [&::-webkit-details-marker]:hidden">
              Services <ChevronIcon className="h-3.5 w-3.5 transition group-open:rotate-180" />
            </summary>
            <div className="absolute left-0 top-full mt-2 w-[22rem] rounded border border-alu bg-white p-2 shadow-lg">
              <Link href="/" className="block rounded px-3 py-2 no-underline hover:bg-sea-soft">
                <span className="block font-semibold text-frame">Sliding glass door repair</span>
                <span className="block text-sm text-frame-soft">Start here if you&apos;re not sure what&apos;s wrong</span>
              </Link>
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className="block rounded px-3 py-2 no-underline hover:bg-sea-soft">
                  <span className="block font-semibold text-frame">{s.title}</span>
                  <span className="block text-sm text-frame-soft">{s.menuBlurb}</span>
                </Link>
              ))}
            </div>
          </details>
          <Link href="/about" className="rounded px-3 py-2 font-medium text-frame no-underline hover:text-teal">About</Link>
          <Link href="/contact" className="rounded px-3 py-2 font-medium text-frame no-underline hover:text-teal">Contact</Link>
          <a
            href={telHref}
            className="ml-2 inline-flex items-center gap-2 rounded bg-bronze px-4 py-2 font-semibold text-white no-underline hover:bg-bronze-dark"
          >
            <PhoneIcon /> {business.phone}
          </a>
        </nav>

        <details className="group md:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded p-2 text-frame [&::-webkit-details-marker]:hidden" aria-label="Open menu">
            <MenuIcon />
          </summary>
          <nav aria-label="Mobile" className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-alu bg-sand px-4 pb-6 pt-2 shadow-lg">
            <p className="config-label mt-2">SERVICES</p>
            <ul className="mt-2 space-y-1">
              <li><Link href="/" className="block py-2 font-semibold text-frame no-underline">Sliding glass door repair</Link></li>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="block py-2 font-semibold text-frame no-underline">{s.title}</Link>
                </li>
              ))}
            </ul>
            <div className="track-divider track-divider--tight" />
            <ul className="space-y-1">
              <li><Link href="/about" className="block py-2 font-semibold text-frame no-underline">About</Link></li>
              <li><Link href="/contact" className="block py-2 font-semibold text-frame no-underline">Contact</Link></li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
