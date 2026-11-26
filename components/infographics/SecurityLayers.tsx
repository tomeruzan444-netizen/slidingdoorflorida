/** "Layers of sliding door security" diagram plus handle and mortise lock measuring steps. */
const T = { fill: "#1c2626", fontSize: 13, fontFamily: "var(--font-body), sans-serif" } as const;

function Pin({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="12" fill="#0f5c5e" />
      <text x={x} y={y + 4.5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="var(--font-mono), monospace">{n}</text>
    </g>
  );
}

const LAYERS: [string, string][] = [
  ["The latch and keeper", "Holds the door shut. It only works when the panel sits at the right height and the keeper lines up with the hook."],
  ["Keyed cylinder (optional)", "Locks the latch from outside. Some non-keyed handle sets accept a conversion kit."],
  ["Something in the track", "A security bar, a screw-down track blocker or a cut dowel stops the panel from sliding even if the latch is beaten."],
  ["Pin or foot lock", "Pins the sliding panel to the fixed panel or the sill. A pin hole has to be placed clear of the glass and the latch."],
  ["Anti-lift in the header", "Screws or blocks in the top track, set so the door still slides but can't be lifted off its rollers."],
  ["Rollers set correctly", "A sagging panel is easier to lift out and makes the hook miss the keeper."],
  ["Exit alarm on pool doors", "One of the options in Florida's pool safety law: 85 dB A at 10 feet on doors that open to the pool."],
];

export function SecurityLayers() {
  return (
    <figure aria-labelledby="sl-cap">
      <div className="rounded border border-alu bg-white p-4 sm:p-6">
        <p className="config-label">SECURITY LAYERS &middot; XO</p>
        <div className="mt-3 grid items-start gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <svg viewBox="0 0 380 330" role="img" aria-labelledby="sl-t sl-d" className="h-auto w-full">
            <title id="sl-t">Inside view of a two-panel sliding door with seven security layers marked</title>
            <desc id="sl-d">
              The fixed panel is on the left and the sliding panel on the right. Pins mark: 1 latch and keeper at the meeting edge,
              2 keyed cylinder at the handle, 3 a bar or blocker in the track, 4 a pin lock through both panels, 5 anti-lift screws
              in the header, 6 rollers at the bottom of the sliding panel, 7 an exit alarm sensor at the top corner.
            </desc>
            {/* frame */}
            <rect x="20" y="20" width="340" height="270" fill="none" stroke="#3d4a4a" strokeWidth="6" />
            {/* fixed panel O */}
            <rect x="30" y="30" width="165" height="250" fill="#e8f3f0" stroke="#0f5c5e" strokeWidth="3" />
            <text x="104" y="160" {...T} fontSize="28" fontWeight="700" fill="#b9c2c4">O</text>
            {/* sliding panel X */}
            <rect x="185" y="34" width="165" height="246" fill="#d6ebe7" stroke="#9a5b2e" strokeWidth="3" />
            <text x="256" y="160" {...T} fontSize="28" fontWeight="700" fill="#b9c2c4">X</text>
            {/* handle */}
            <rect x="196" y="140" width="10" height="46" rx="3" fill="#7e4924" />
            {/* security bar */}
            <path d="M38 210 L340 210" stroke="#3d4a4a" strokeWidth="5" strokeLinecap="round" />
            {/* track */}
            <path d="M20 300h340M20 306h340" stroke="#b9c2c4" strokeWidth="2" />
            {/* header screws */}
            <circle cx="232" cy="25" r="3.5" fill="#3d4a4a" />
            <circle cx="304" cy="25" r="3.5" fill="#3d4a4a" />
            {/* rollers */}
            <circle cx="212" cy="284" r="6" fill="#fff" stroke="#0f5c5e" strokeWidth="2" />
            <circle cx="322" cy="284" r="6" fill="#fff" stroke="#0f5c5e" strokeWidth="2" />
            {/* alarm sensor */}
            <rect x="330" y="38" width="16" height="10" rx="2" fill="#9a5b2e" />

            <Pin x={190} y={110} n={1} />
            <Pin x={222} y={163} n={2} />
            <Pin x={110} y={210} n={3} />
            <Pin x={190} y={250} n={4} />
            <Pin x={268} y={50} n={5} />
            <Pin x={267} y={284} n={6} />
            <Pin x={338} y={70} n={7} />
          </svg>
          <ol className="space-y-2.5 text-[0.95rem]">
            {LAYERS.map(([name, what], i) => (
              <li key={name} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal font-mono text-sm font-bold text-white">{i + 1}</span>
                <span><span className="font-semibold">{name}.</span> {what}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-5 rounded border border-dashed border-bronze bg-sand p-3 text-[0.95rem]">
          <span className="font-semibold">Bedroom slider used as an escape route?</span> Every layer on it should open from inside by
          hand, with no key or tool. Ask your local building department before adding a key-inside lock or a fixed bar.
        </p>

        <div className="track-divider track-divider--tight" />

        <p className="config-label">MEASURING FOR NEW HARDWARE</p>
        <div className="mt-3 grid gap-6 md:grid-cols-2">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">Handle set</p>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[0.95rem]">
              <li>Find the two screws that hold the inside handle on.</li>
              <li>Measure from the center of the top screw hole to the center of the bottom one. Not edge to edge, and not the handle&apos;s overall length.</li>
              <li>Compare with sizes sold as replacements: 3-15/16, 4-15/16, 5, 6-1/2 and 6-5/8 inches are common, and 3-1/2 exists.</li>
              <li>Measure the panel&apos;s thickness where the handle mounts and check it against the new set&apos;s listed range.</li>
              <li>Note whether the latch is a separate lock body in the door edge or built into the handle, and photograph the old parts.</li>
            </ol>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">Mortise lock body</p>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[0.95rem]">
              <li>Remove the two screws on the edge of the sliding panel and slide the lock body out.</li>
              <li>Measure the faceplate&apos;s screw holes center to center. Listings show sizes such as 3-11/16, 3-7/8, 4-5/8 and 5-3/8 inches.</li>
              <li>Note the keyway angle (45 or 90 degrees when locked) and whether the faceplate ends are round or square.</li>
              <li>Take the old lock, or a photo with the measurements, when you buy the new one.</li>
            </ol>
          </div>
        </div>
      </div>
      <figcaption id="sl-cap" className="figcap">
        The latch alone isn&apos;t much security. Block the slide, block the lift, and keep the panel at the right height so the
        latch can do its part.
      </figcaption>
    </figure>
  );
}
