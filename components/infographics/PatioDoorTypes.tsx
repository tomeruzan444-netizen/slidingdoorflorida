import Link from "next/link";

/** "Which patio door do you have?" ID cards with plan-view sketches (looking down from above). */
const S = { stroke: "#0f5c5e", strokeWidth: 3, fill: "none" } as const;
const wall = <path d="M4 40h18M178 40h18" stroke="#3d4a4a" strokeWidth="6" />;

const ART: Record<string, React.ReactNode> = {
  slider: (
    <svg viewBox="0 0 200 64" aria-hidden="true" className="h-auto w-full">
      {wall}
      <path d="M22 44h80" {...S} />
      <path d="M96 36h82" stroke="#9a5b2e" strokeWidth="3" />
      <path d="M150 22h-40M118 15l-8 7 8 7" stroke="#9a5b2e" strokeWidth="2" fill="none" />
    </svg>
  ),
  multi: (
    <svg viewBox="0 0 200 64" aria-hidden="true" className="h-auto w-full">
      {wall}
      <path d="M22 44h40M138 44h40" {...S} />
      <path d="M58 36h44M98 36h44" stroke="#9a5b2e" strokeWidth="3" />
      <path d="M90 20h-24M74 13l-8 7 8 7M110 20h24M126 13l8 7-8 7" stroke="#9a5b2e" strokeWidth="2" fill="none" />
    </svg>
  ),
  stacking: (
    <svg viewBox="0 0 200 64" aria-hidden="true" className="h-auto w-full">
      {wall}
      <path d="M22 50h36" {...S} />
      <path d="M22 42h36M22 34h36" stroke="#9a5b2e" strokeWidth="3" />
      <path d="M60 26h40M100 26h40" stroke="#b9c2c4" strokeWidth="2" strokeDasharray="5 4" />
      <text x="70" y="58" fontSize="11" fill="#3d4a4a" fontFamily="var(--font-body), sans-serif">panels stack at one end</text>
    </svg>
  ),
  pocket: (
    <svg viewBox="0 0 200 64" aria-hidden="true" className="h-auto w-full">
      <rect x="4" y="30" width="56" height="20" fill="#efe9de" stroke="#3d4a4a" strokeWidth="2" />
      <path d="M178 40h18" stroke="#3d4a4a" strokeWidth="6" />
      <path d="M10 36h46M10 44h46" stroke="#9a5b2e" strokeWidth="3" />
      <path d="M150 22h-60M98 15l-8 7 8 7" stroke="#9a5b2e" strokeWidth="2" fill="none" />
      <text x="6" y="62" fontSize="11" fill="#3d4a4a" fontFamily="var(--font-body), sans-serif">wall pocket</text>
    </svg>
  ),
  hinged: (
    <svg viewBox="0 0 200 64" aria-hidden="true" className="h-auto w-full">
      {wall}
      <path d="M22 40l46-30M178 40l-46-30" stroke="#9a5b2e" strokeWidth="3" />
      <path d="M68 10a54 54 0 0 1 32 30M132 10a54 54 0 0 0-32 30" stroke="#b9c2c4" strokeWidth="2" strokeDasharray="4 3" fill="none" />
    </svg>
  ),
};

const CARDS = [
  {
    key: "slider",
    name: "Two-panel slider",
    code: "XO / OX",
    spot: "One panel slides, one stays put, and the screen rides on the outside.",
    fails: "Drags as rollers wear, the latch misses once the panel sags, water sits in the sill when weep holes clog.",
    href: "/sliding-door-roller-replacement",
    link: "Start with the rollers",
  },
  {
    key: "multi",
    name: "Three or four panel slider",
    code: "OXO / OXXO",
    spot: "More glass, often two panels that slide toward the middle and meet.",
    fails: "Everything a two-panel slider does, on every moving panel, plus panels that don't meet evenly where they lock together.",
    href: "/sliding-door-track-repair",
    link: "Check the track and sill",
  },
  {
    key: "stacking",
    name: "Stacking multi-slide",
    code: "Stacker",
    spot: "Three or more panels on parallel tracks that slide behind each other to one or both ends.",
    fails: "Each panel has its own rollers to keep level, the overlaps between panels drift out of line, and the wide sill has to drain well.",
    href: "/sliding-door-roller-replacement",
    link: "Roller height on each panel",
  },
  {
    key: "pocket",
    name: "Pocketing multi-slide",
    code: "Pocket",
    spot: "The panels disappear into a pocket built into the wall, so the whole opening clears.",
    fails: "Debris collects in the pocket, the end panel drags as it goes in, and the pocket needs its own drainage.",
    href: "/sliding-door-track-repair",
    link: "Sill drainage and tracks",
  },
  {
    key: "hinged",
    name: "Hinged French door",
    code: "Swing",
    spot: "Panels swing on hinges, usually one active panel with the handle and one passive panel bolted at top and bottom.",
    fails: "Sags and rubs at the top corner, the latch stops meeting the strike, and multipoint locks and weatherstrip wear out.",
    href: "/sliding-door-lock-and-handle-repair",
    link: "Locks and latches",
  },
];

export function PatioDoorTypes() {
  return (
    <figure aria-labelledby="pd-cap">
      <ul className="grid gap-4 !pl-0 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <li key={c.key} className="panel-track !pl-0 before:!hidden">
            <div className="panel h-full p-4">
              <p className="config-label">{c.code}</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">{c.name}</p>
              <div className="mt-2 rounded bg-white/70 px-2 py-1">{ART[c.key]}</div>
              <p className="mt-3 text-[0.93rem]"><span className="font-semibold">How to spot it:</span> {c.spot}</p>
              <p className="mt-2 text-[0.93rem]"><span className="font-semibold">What usually fails:</span> {c.fails}</p>
              <p className="mt-3 text-[0.93rem]"><Link href={c.href} className="font-semibold">{c.link} &rarr;</Link></p>
            </div>
          </li>
        ))}
      </ul>
      <figcaption id="pd-cap" className="figcap">
        Watch how the panel moves: it slides, stacks, disappears into the wall, or swings. That tells you which parts wear out. The
        sketches are drawn from above, looking down at the threshold.
      </figcaption>
    </figure>
  );
}
