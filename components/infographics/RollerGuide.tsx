/** Roller identification and measuring guide: labeled SVG views plus a write-it-down checklist. */
const T = { fill: "#1c2626", fontSize: 13, fontFamily: "var(--font-body), sans-serif" } as const;
const L = { fill: "#7e4924", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-mono), monospace" } as const;
const dim = { stroke: "#9a5b2e", strokeWidth: 1.4 } as const;

function SideView() {
  return (
    <svg viewBox="0 0 420 250" role="img" aria-labelledby="rg-side-t rg-side-d" className="h-auto w-full">
      <title id="rg-side-t">Side view of a sliding door roller assembly</title>
      <desc id="rg-side-d">
        Labels: A wheel diameter, B housing length, C housing height, D adjustment screw at the end of the housing, E mounting tab.
      </desc>
      {/* housing */}
      <rect x="90" y="70" width="230" height="78" rx="6" fill="#dde2e3" stroke="#3d4a4a" strokeWidth="2" />
      {/* mounting tab */}
      <rect x="60" y="92" width="32" height="20" rx="3" fill="#b9c2c4" stroke="#3d4a4a" strokeWidth="1.5" />
      <rect x="318" y="92" width="32" height="20" rx="3" fill="#b9c2c4" stroke="#3d4a4a" strokeWidth="1.5" />
      {/* adjustment screw */}
      <circle cx="304" cy="88" r="8" fill="#f7f4ee" stroke="#3d4a4a" strokeWidth="2" />
      <path d="M298 88h12M304 82v12" stroke="#3d4a4a" strokeWidth="1.6" />
      {/* wheel */}
      <circle cx="205" cy="160" r="42" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="3" />
      <circle cx="205" cy="160" r="12" fill="#f7f4ee" stroke="#0f5c5e" strokeWidth="2" />
      {/* track */}
      <path d="M20 204h380M20 210h380" stroke="#b9c2c4" strokeWidth="2" />

      {/* A: wheel diameter */}
      <path d="M140 118v84M134 118h12M134 202h12" {...dim} />
      <text x="96" y="165" {...L}>A</text>
      {/* B: housing length */}
      <path d="M90 50h230M90 44v12M320 44v12" {...dim} />
      <text x="196" y="40" {...L}>B</text>
      {/* C: housing height */}
      <path d="M372 70v78M366 70h12M366 148h12" {...dim} />
      <text x="384" y="114" {...L}>C</text>
      {/* D: screw */}
      <path d="M312 82l40-36" {...dim} />
      <text x="356" y="44" {...L}>D</text>
      {/* E: tab */}
      <path d="M70 92l-30-40" {...dim} />
      <text x="26" y="46" {...L}>E</text>
      <text x="20" y="236" {...T}>Track (the rail the wheel rides on)</text>
    </svg>
  );
}

function EndView() {
  return (
    <svg viewBox="0 0 420 250" role="img" aria-labelledby="rg-end-t rg-end-d" className="h-auto w-full">
      <title id="rg-end-t">End view of the roller and three wheel edge profiles</title>
      <desc id="rg-end-d">
        Labels: F housing width, G wheel width, H wheel edge profile. The three profiles shown are flat, concave and center groove.
      </desc>
      {/* housing end */}
      <rect x="60" y="40" width="90" height="100" rx="5" fill="#dde2e3" stroke="#3d4a4a" strokeWidth="2" />
      {/* wheel edge-on */}
      <rect x="90" y="110" width="30" height="88" rx="4" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="3" />
      <path d="M30 204h160M30 210h160" stroke="#b9c2c4" strokeWidth="2" />
      {/* F */}
      <path d="M60 24h90M60 18v12M150 18v12" {...dim} />
      <text x="100" y="14" {...L}>F</text>
      {/* G */}
      <path d="M90 226h30M90 220v12M120 220v12" {...dim} />
      <text x="100" y="246" {...L}>G</text>

      {/* H profiles */}
      <text x="232" y="30" {...L}>H</text>
      <text x="250" y="30" {...T}>Edge profile</text>
      <g transform="translate(232 50)">
        <rect x="0" y="0" width="34" height="56" rx="3" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2.5" />
        <text x="-2" y="78" {...T}>Flat</text>
      </g>
      <g transform="translate(296 50)">
        <path d="M0 0h34v56H0z" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2.5" />
        <path d="M0 56q17-14 34 0" fill="#f7f4ee" stroke="#0f5c5e" strokeWidth="2.5" />
        <text x="-8" y="78" {...T}>Concave</text>
      </g>
      <g transform="translate(360 50)">
        <rect x="0" y="0" width="34" height="56" rx="3" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2.5" />
        <path d="M12 56v-10h10v10" fill="#f7f4ee" stroke="#0f5c5e" strokeWidth="2.5" />
        <text x="-12" y="78" {...T}>Groove</text>
      </g>
      {/* single vs tandem */}
      <g transform="translate(232 160)">
        <rect x="0" y="0" width="64" height="26" rx="4" fill="#dde2e3" stroke="#3d4a4a" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="12" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2" />
        <text x="0" y="66" {...T}>Single</text>
      </g>
      <g transform="translate(316 160)">
        <rect x="0" y="0" width="88" height="26" rx="4" fill="#dde2e3" stroke="#3d4a4a" strokeWidth="1.5" />
        <circle cx="24" cy="32" r="12" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2" />
        <circle cx="64" cy="32" r="12" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2" />
        <text x="0" y="66" {...T}>Tandem</text>
      </g>
    </svg>
  );
}

const LABELS: [string, string, string][] = [
  ["A", "Wheel diameter", "Edge to edge through the center. Common sizes run from 1 in. to about 1-11/16 in."],
  ["B", "Housing length", "End to end of the metal or plastic body, not counting tabs."],
  ["C", "Housing height", "Bottom to top with the wheel screwed all the way up."],
  ["D", "Adjustment screw", "Note where it sits: end, side or top. The new roller needs its screw in the same spot, or you can't reach it through the panel."],
  ["E", "Mounting", "Tabs that hook into slots, a screw hole, or a plain back held by the rail."],
  ["F", "Housing width", "Side to side. It has to fit the channel in the bottom of your panel."],
  ["G", "Wheel width", "Measure the tread of the wheel only, not the axle or hub."],
  ["H", "Edge profile", "Flat, concave or center groove. It must match the shape of your track."],
];

export function RollerGuide() {
  return (
    <figure aria-labelledby="rg-cap">
      <div className="rounded border border-alu bg-white p-4 sm:p-6">
        <p className="config-label">MEASURING GUIDE</p>
        <div className="mt-3 grid gap-6 md:grid-cols-2">
          <SideView />
          <EndView />
        </div>
        <dl className="mt-6 grid gap-x-8 gap-y-3 text-[0.95rem] sm:grid-cols-2">
          {LABELS.map(([k, name, how]) => (
            <div key={k} className="flex gap-3">
              <dt className="w-6 shrink-0 font-mono font-bold text-bronze-dark">{k}</dt>
              <dd><span className="font-semibold">{name}.</span> {how}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 rounded border border-dashed border-teal bg-sea-soft p-4 text-[0.95rem]">
          <p className="font-semibold">Write this down before you order</p>
          <p className="mt-1">
            All eight measurements above, wheel material (nylon, steel or stainless), single or tandem, and the door brand if a label
            is visible on the frame or in the corner of the glass. Measure in 1/16 in. steps. A worn wheel reads smaller than a new
            one, so compare the housing first.
          </p>
        </div>
      </div>
      <figcaption id="rg-cap" className="figcap">
        Rollers are matched by housing size, wheel size and mounting style. There is no universal sliding door roller, so measure
        the old one before buying a new one.
      </figcaption>
    </figure>
  );
}
