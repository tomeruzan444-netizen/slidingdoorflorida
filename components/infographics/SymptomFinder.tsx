import Link from "next/link";

/**
 * Symptom Finder. Built on native <details name="symptom"> (an exclusive accordion),
 * so it's interactive with zero JavaScript and every answer is in the initial HTML.
 */
const SYMPTOMS = [
  {
    code: "01",
    label: "Sticks or grinds",
    see: "You need two hands, or you hear a gritty rumble as the panel moves.",
    cause: "Sand packed into the track, rollers worn flat or seized, or a panel that has dropped low enough to drag.",
    check: "Vacuum the track and watch the gap along the top of the panel. If it narrows at one end, the panel is out of level.",
    fix: "Clean the track, then adjust or replace the rollers.",
    href: "/sliding-door-roller-replacement",
    link: "Roller adjustment and replacement",
  },
  {
    code: "02",
    label: "Jumps the track",
    see: "The bottom of the panel pops out of the rail, or the door wobbles when you slide it.",
    cause: "A broken roller, rollers set too low to stay in the rail, a bent track, or debris that lifts the wheel out.",
    check: "Look along the rail at floor level for dents, bends or a raised lip.",
    fix: "Straighten or cap the track, and reset the rollers so they ride in the groove.",
    href: "/sliding-door-track-repair",
    link: "Track straightening, caps and sill repair",
  },
  {
    code: "03",
    label: "Won't lock",
    see: "The latch closes on nothing, or you have to lift the handle to make it catch.",
    cause: "Usually the panel has sagged and the hook now misses the keeper. Less often the lock itself is worn out.",
    check: "Lift the handle side slightly while you lock it. If it catches, the lock is fine and the door needs raising.",
    fix: "Raise the panel first, then realign the keeper or replace the lock.",
    href: "/sliding-door-lock-and-handle-repair",
    link: "Lock alignment and replacement",
  },
  {
    code: "04",
    label: "Leaks or drafts",
    see: "Water on the floor after a storm, a whistle in the wind, or daylight at the edge of the panel.",
    cause: "Clogged weep holes in the sill, worn weatherstrip, or a panel set so high that the seals no longer meet.",
    check: "Pour a cup of water into the sill track. It should run out through the small slots on the outside face of the sill.",
    fix: "Clear the weep holes, replace weatherstrip, and set the panel height correctly.",
    href: "/sliding-door-track-repair",
    link: "Sill drainage and weep hole repair",
  },
  {
    code: "05",
    label: "Fog between the panes",
    see: "A haze or droplets inside the double glass that you can't wipe off from either side.",
    cause: "The seal around the insulated glass unit has failed and the drying agent inside is saturated.",
    check: "Wipe both faces. If the haze stays, it's inside the unit and cleaning won't touch it.",
    fix: "Replace the glass unit or the panel. Check the door's glass warranty first.",
    href: "/sliding-glass-door-replacement",
    link: "Glass and door replacement options",
  },
  {
    code: "06",
    label: "Cracked glass",
    see: "A crack, a chip that's spreading, or a pane that has crazed into small cubes.",
    cause: "Impact, a frame twisting as the house settles, or a panel slammed into the jamb.",
    check: "Keep kids and pets away from it. Tape is a stopgap for a day or two, nothing more.",
    fix: "A new safety-glass pane made to size. Tempered glass can't be cut down to fit.",
    href: "/sliding-glass-door-replacement",
    link: "Safety glass and replacement",
  },
];

export function SymptomFinder() {
  return (
    <figure id="symptoms" className="!max-w-none scroll-mt-24" aria-labelledby="symptom-caption">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {SYMPTOMS.map((s, i) => (
          <details key={s.code} name="symptom" className="symptom rounded border border-alu bg-white" open={i === 0}>
            <summary className="symptom-tab flex items-center justify-between gap-3 rounded-t px-4 py-3.5 transition-colors">
              <span>
                <span className="config-label">{s.code}</span>
                <span className="block font-[family-name:var(--font-display)] text-lg font-semibold">{s.label}</span>
              </span>
              <span aria-hidden="true" className="text-2xl leading-none">+</span>
            </summary>
            <dl className="space-y-2.5 px-4 pb-4 pt-3 text-[0.97rem]">
              <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">What you notice</dt><dd>{s.see}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">Likely cause</dt><dd>{s.cause}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">Check it yourself</dt><dd>{s.check}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">The fix</dt><dd>{s.fix}</dd></div>
              <dd><Link href={s.href} className="font-semibold">{s.link} &rarr;</Link></dd>
            </dl>
          </details>
        ))}
      </div>
      <figcaption id="symptom-caption" className="figcap">
        Four of these six symptoms start at the bottom of the door: rollers, track and sill drainage. Glass problems are the exception.
      </figcaption>
    </figure>
  );
}
