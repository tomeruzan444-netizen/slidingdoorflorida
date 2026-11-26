import Image from "next/image";
import Link from "next/link";
import { business, known, telHref } from "@/content/business";
import { pageBySlug } from "@/content/pages";
import { services } from "@/content/services";
import { faqsFor } from "@/lib/faqs";
import { metadataFor } from "@/lib/meta";
import { graphFor } from "@/lib/schema";
import { CtaBand, Faq, JsonLd } from "@/components/Bits";
import { ArrowIcon, BadgeIcon, CheckIcon, ClockIcon, PhoneIcon, PinIcon, RulerIcon, ShieldIcon } from "@/components/Icons";
import { JosephSays } from "@/components/Expert";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceArt } from "@/components/ServiceArt";
import Body from "@/content/pages/home.mdx";
import heroImage from "@/public/images/sliding-door-repair-florida.jpg";

const page = pageBySlug("")!;
export const metadata = metadataFor(page);

/** Most common repairs first; replacement last, because most doors can be repaired. */
const CARD_ORDER = [
  "sliding-door-roller-replacement",
  "sliding-door-track-repair",
  "sliding-door-lock-and-handle-repair",
  "sliding-screen-door-repair",
  "patio-door-repair",
  "sliding-closet-door-repair",
  "sliding-glass-door-replacement",
];
const cards = CARD_ORDER.map((slug) => services.find((s) => s.slug === slug)).filter((s) => s !== undefined);

const STEPS = [
  { t: "Describe the problem", d: "Dragging, jumping the track, a lock that won't catch. One sentence is enough." },
  { t: "Add a photo if you can", d: "One of the whole door from inside, and one close-up of whatever is wrong." },
  // OWNER-CONFIRM: callback process before a visit
  { t: "We call you back", d: "With the likely cause and what the repair involves, before anyone drives out." },
];

export default function Home() {
  const faqs = faqsFor("");
  // Owner-supplied facts only. License and insurance cards appear once those details exist.
  const features = [
    {
      Icon: ClockIcon,
      t: `${business.yearsInBusiness} years on sliding doors`,
      d: <>Our founder, {business.founderName}, has spent {business.yearsInBusiness} years on sliding doors. Every crew works to that standard.</>,
      show: true,
    },
    {
      Icon: BadgeIcon,
      t: "Licensed in Florida",
      d: (
        <>
          {business.licenseType} #{business.licenseNumber}.{" "}
          <a href="https://www2.myfloridalicense.com/how-to-verify-a-license/" className="text-teal underline decoration-bronze underline-offset-2">
            Check it on DBPR
          </a>
        </>
      ),
      show: known(business.licenseNumber),
    },
    { Icon: ShieldIcon, t: "Insured", d: <>{business.insurance}</>, show: known(business.insurance) },
    {
      Icon: CheckIcon,
      t: "An honest repair-or-replace call",
      d: <>If a new door is the better value, we&apos;ll tell you. If new rollers will do it, we&apos;ll tell you that too.</>,
      show: true,
    },
    {
      Icon: RulerIcon,
      t: "Parts matched by measurement",
      d: <>We match rollers and locks to your door&apos;s exact specs, not to how they look.</>,
      show: true,
    },
    {
      Icon: PinIcon,
      t: "Crews across Florida",
      d: <>{business.teamSize} technicians, based in {business.homeBase}. Salt air, sand and humidity are what we work against every day.</>,
      show: true,
    },
  ]
    .filter((f) => f.show)
    .slice(0, 4);

  return (
    <>
      <JsonLd data={graphFor(page, faqs)} />

      {/* ---------- Hero: full-bleed photo, glass panels slide open on load ---------- */}
      <section className="relative isolate overflow-hidden bg-frame">
        <Image
          src={heroImage}
          alt="Technician kneeling at the bottom rail of a sliding glass door, adjusting it with a screwdriver, with a waterfront patio outside"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="-z-20 object-cover object-[32%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_66_68/0.8)_0%,rgb(28_38_38/0.6)_45%,rgb(28_38_38/0.85)_100%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-glass hero-glass--left" />
          <div className="hero-glass hero-glass--right" />
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-36 pt-14 text-center sm:px-6 sm:pb-44 sm:pt-24 lg:pt-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-sea">
            <PinIcon className="h-4 w-4" /> {business.teamSize} technicians &middot; crews across Florida
          </p>
          <h1 className="mt-5 text-[clamp(2.4rem,1.5rem+3.6vw,4.4rem)] font-extrabold leading-[1.02] tracking-tight text-white">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">{page.subline}</p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-bronze px-7 py-4 text-lg font-bold text-white no-underline shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-bronze-dark"
            >
              <PhoneIcon className="h-5 w-5" /> Call {business.phone}
            </a>
            <Link
              href="#quote"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/85 px-7 py-4 text-lg font-bold text-white no-underline transition hover:bg-white hover:text-teal-deep"
            >
              Get a quote <ArrowIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[7px] border-y-[1.5px] border-white/30" />
      </section>

      {/* ---------- Quote card, overlapping the hero ---------- */}
      <section id="quote" aria-labelledby="quote-heading" className="relative z-10 mx-auto -mt-24 max-w-5xl scroll-mt-28 px-4 sm:-mt-32 sm:px-6">
        <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-[0_30px_70px_-25px_rgb(28_38_38/0.45)] ring-1 ring-alu/50 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <p className="config-label">GET A QUOTE</p>
            <h2 id="quote-heading" className="mt-2 text-[clamp(1.7rem,1.3rem+1.4vw,2.3rem)] font-extrabold">
              Tell us what your door <span className="text-bronze">is doing</span>
            </h2>
            <p className="mt-3 text-frame-soft">A photo of the bottom corner or the lock usually tells us more than a long description.</p>
            <ol className="mt-6 space-y-5">
              {STEPS.map((st, i) => (
                <li key={st.t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sea font-bold text-teal-deep">{i + 1}</span>
                  <span>
                    <span className="block font-bold text-frame">{st.t}</span>
                    <span className="block text-[0.98rem] text-frame-soft">{st.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a href={telHref} className="mt-7 inline-flex items-center gap-2 font-bold text-teal no-underline hover:underline">
              <PhoneIcon className="h-4 w-4" /> Rather talk? Call {business.phone}
            </a>
          </div>
          <div className="rounded-xl bg-sand/70 p-5 ring-1 ring-alu/40 sm:p-6">
            <QuoteForm wide />
          </div>
        </div>
      </section>

      {/* ---------- Feature row ---------- */}
      <section aria-label="Why call us" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, t, d }) => (
            <li key={t} className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-bronze shadow-sm ring-1 ring-alu/60">
                <Icon className="h-7 w-7" />
              </span>
              <span>
                <span className="block text-lg font-bold text-frame">{t}</span>
                <span className="mt-1 block text-[0.98rem] text-frame-soft">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Service cards ---------- */}
      <section aria-labelledby="services-heading" className="mt-16 border-y border-alu/60 bg-sea-soft py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="config-label justify-center">SERVICES</p>
            <h2 id="services-heading" className="mt-2 text-[clamp(1.9rem,1.4rem+1.8vw,2.8rem)] font-extrabold">
              What needs fixing?
            </h2>
            <p className="mt-3 text-lg text-frame-soft">
              Pick the part that&apos;s giving you trouble. Each page covers the cause, what you can check yourself, and what the repair involves.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((sv) => (
              <li key={sv.slug}>
                <Link href={`/${sv.slug}`} className="service-card group flex h-full flex-col overflow-hidden rounded-xl bg-white no-underline ring-1 ring-alu/60">
                  <span className="flex h-36 items-center justify-center border-b border-alu/50 bg-gradient-to-br from-white to-sea">
                    <ServiceArt slug={sv.slug} className="h-24 w-36 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-lg font-bold leading-snug text-frame">{sv.title}</span>
                    <span className="mt-1.5 flex-1 text-[0.97rem] text-frame-soft">{sv.menuBlurb}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-bronze-dark">
                      Learn more <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="#symptoms" className="service-card group flex h-full flex-col overflow-hidden rounded-xl bg-teal no-underline">
                <span className="flex h-36 items-center justify-center border-b border-white/15 bg-teal-deep">
                  <span className="rounded-lg bg-white/95 p-2">
                    <ServiceArt slug="unsure" className="h-20 w-32" />
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-lg font-bold leading-snug text-white">Not sure what&apos;s wrong?</span>
                  <span className="mt-1.5 flex-1 text-[0.97rem] text-white/85">Match what the door is doing to the part that usually causes it.</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-sea">
                    Find your symptom <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Meet the founder ---------- */}
      <section aria-labelledby="founder-heading" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="config-label">WHO WE ARE</p>
            <h2 id="founder-heading" className="mt-2 text-[clamp(1.9rem,1.4rem+1.8vw,2.6rem)] font-extrabold">
              {business.teamSize} technicians, one specialty
            </h2>
            <p className="mt-4 text-lg text-frame-soft">
              We&apos;re a team of {business.teamSize} sliding door technicians, working in crews across Florida. Our founder, {business.founderName}, spent years
              on roller swaps, track repairs, lock adjustments and full restorations before starting {business.brandName}, and that&apos;s still all we do:
              sliding doors.
            </p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 font-bold text-teal no-underline hover:underline">
              Meet the team behind the work <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <JosephSays>
            <p>
              I&apos;m always honest with customers about whether a repair makes financial sense. I don&apos;t believe in recommending a repair just to get a job.
            </p>
          </JosephSays>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-14">
        <div className="min-w-0">
          <div className="prose-door home-prose">
            <Body />
          </div>
          <div className="max-w-3xl">
            <Faq items={faqs} heading={page.faqHeading ?? "Questions"} />
            {page.closing && <CtaBand text={page.closing} />}
          </div>
        </div>
        {/* Desktop only: keeps the next step in reach while reading the long guide */}
        <aside aria-label="Get help" className="hidden lg:block">
          <div className="sticky top-28 mt-16 overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-24px_rgb(28_38_38/0.4)] ring-1 ring-alu/60">
            <div className="bg-teal-deep px-5 py-4 text-white">
              <p className="text-lg font-bold leading-snug">Door acting up?</p>
              <p className="mt-1 text-[0.95rem] text-white/80">Call, or send a photo and a sentence about it.</p>
            </div>
            <div className="space-y-3 p-5">
              <a href={telHref} className="flex items-center justify-center gap-2 rounded-md bg-bronze px-4 py-3 font-bold text-white no-underline hover:bg-bronze-dark">
                <PhoneIcon className="h-4 w-4" /> {business.phone}
              </a>
              <Link href="#quote" className="flex items-center justify-center gap-2 rounded-md border-2 border-teal px-4 py-2.5 font-bold text-teal no-underline hover:bg-sea-soft">
                Get a quote <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link href="#symptoms" className="block pt-1 text-center text-[0.95rem] font-semibold text-frame-soft underline decoration-alu underline-offset-4 hover:text-teal">
                Not sure what&apos;s wrong? Find your symptom
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
