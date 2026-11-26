/** Bypass vs bifold vs pocket closet doors, plus a four-step "how to tell" path. */
function Bypass() {
  return (
    <svg viewBox="0 0 160 110" aria-hidden="true" className="h-auto w-full">
      <rect x="8" y="8" width="144" height="94" fill="none" stroke="#3d4a4a" strokeWidth="3" />
      <rect x="14" y="14" width="80" height="84" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2" />
      <rect x="66" y="16" width="80" height="82" fill="#ffffff" fillOpacity="0.85" stroke="#9a5b2e" strokeWidth="2" />
      <path d="M100 56h30M122 49l8 7-8 7" stroke="#9a5b2e" strokeWidth="2" fill="none" />
    </svg>
  );
}
function Bifold() {
  return (
    <svg viewBox="0 0 160 110" aria-hidden="true" className="h-auto w-full">
      <rect x="8" y="8" width="144" height="94" fill="none" stroke="#3d4a4a" strokeWidth="3" />
      <path d="M14 14l24 8v76l-24-8z" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2" />
      <path d="M38 22l24-8v76l-24 8z" fill="#ffffff" stroke="#0f5c5e" strokeWidth="2" />
      <path d="M146 14l-24 8v76l24-8z" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2" />
      <path d="M122 22l-24-8v76l24 8z" fill="#ffffff" stroke="#0f5c5e" strokeWidth="2" />
      <circle cx="16" cy="18" r="3" fill="#9a5b2e" />
      <circle cx="16" cy="94" r="3" fill="#9a5b2e" />
    </svg>
  );
}
function Pocket() {
  return (
    <svg viewBox="0 0 160 110" aria-hidden="true" className="h-auto w-full">
      <rect x="4" y="8" width="70" height="94" fill="#efe9de" stroke="#b9c2c4" strokeWidth="2" strokeDasharray="5 3" />
      <rect x="74" y="8" width="80" height="94" fill="none" stroke="#3d4a4a" strokeWidth="3" />
      <rect x="40" y="14" width="76" height="86" fill="#d6ebe7" fillOpacity="0.9" stroke="#0f5c5e" strokeWidth="2" />
      <path d="M100 56H62M70 49l-8 7 8 7" stroke="#9a5b2e" strokeWidth="2" fill="none" />
      <text x="10" y="24" fontSize="10" fill="#3d4a4a" fontFamily="var(--font-body), sans-serif">wall</text>
    </svg>
  );
}

const TYPES = [
  {
    name: "Bypass (sliding)",
    art: <Bypass />,
    moves: "Two panels slide past each other on separate channels. Half the closet is open at a time.",
    versions:
      "Top-hung doors carry their weight on hangers in the header track, with a small floor guide to keep them apart. Bottom-rolling doors, which include most mirror doors, sit on rollers in a floor track and only use the top track to stay upright.",
    trouble: "Falls out of the track, drops at one end, rubs the other panel, leaves a gap at the wall.",
    look: "The hanger at the top (top-hung) or the bottom roller nearest the wall (bottom-rolling).",
  },
  {
    name: "Bifold",
    art: <Bifold />,
    moves: "Hinged pairs of panels fold toward the side of the opening on pivots at the top and bottom.",
    versions: "The panel next to the jamb turns on pivots. The other end rides a guide in a top track.",
    trouble: "Drags or binds as it folds, a pivot pops out of its bracket, the doors don't meet in the middle.",
    look: "The bottom pivot bracket and the top pivot. Which one adjusts the height depends on the brand.",
  },
  {
    name: "Pocket",
    art: <Pocket />,
    moves: "One panel slides into a cavity inside the wall.",
    versions: "The door hangs from wheels in a track hidden in the header, with small guides at the floor.",
    trouble: "Scrapes the floor, comes off the track inside the wall, won't slide all the way in.",
    look: "The hangers on top of the door. Getting to them usually means removing the trim along the top of the opening.",
  },
];

export function ClosetTypes() {
  return (
    <figure aria-labelledby="ct-cap">
      <div className="rounded border border-alu bg-white p-4 sm:p-6">
        <p className="config-label">WHICH CLOSET DOOR?</p>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {TYPES.map((t) => (
            <section key={t.name} aria-label={t.name} className="rounded border border-alu-light bg-sand p-4">
              <div className="mx-auto max-w-[11rem]">{t.art}</div>
              <h3 className="!mt-3 text-lg">{t.name}</h3>
              <dl className="mt-2 space-y-2 text-[0.93rem]">
                <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">How it moves</dt><dd>{t.moves}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">Where the weight sits</dt><dd>{t.versions}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">Typical trouble</dt><dd>{t.trouble}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-bronze-dark">Where to adjust</dt><dd>{t.look}</dd></div>
              </dl>
            </section>
          ))}
        </div>
        <div className="mt-6 rounded border border-dashed border-teal bg-sea-soft p-4">
          <p className="font-semibold">How to tell in four steps</p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[0.95rem]">
            <li>Does the door fold? Then it&apos;s a bifold. If not, keep going.</li>
            <li>Does it disappear into the wall? Then it&apos;s a pocket door. If not, it&apos;s a bypass.</li>
            <li>Slide one bypass panel aside and look at the floor. Wheels sitting in a floor track mean bottom-rolling. Just a small guide block means top-hung.</li>
            <li>Check the top to confirm. Hangers with wheels behind the header trim mean top-hung. Only plastic guides or small guide wheels mean bottom-rolling.</li>
          </ol>
        </div>
      </div>
      <figcaption id="ct-cap" className="figcap">
        The door type, and whether its weight hangs from the top or rolls on the bottom, tells you where to adjust it and why it
        keeps leaving the track.
      </figcaption>
    </figure>
  );
}
