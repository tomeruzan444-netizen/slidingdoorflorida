/** Cross-section of an aluminum sliding door sill with numbered damage pins and the fix for each. */
const T = { fill: "#1c2626", fontSize: 12.5, fontFamily: "var(--font-body), sans-serif" } as const;

function Pin({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" fill="#9a5b2e" />
      <text x={x} y={y + 4.5} textAnchor="middle" fill="#fff" fontSize="12.5" fontWeight="700" fontFamily="var(--font-mono), monospace">{n}</text>
    </g>
  );
}

const ROWS: [string, string][] = [
  ["Sand and grit packed into the channel", "Vacuum, wipe and dry it, then apply only the lubricant your door's maker names"],
  ["Weep slot clogged with dirt, bugs or leaves", "Pour in a cup of water. If it doesn't drain outside, clear the slot with a pipe cleaner or thin wire, gently"],
  ["Caulk smeared over the outside weep hole", "Cut and scrape the caulk out. Weep holes should never be sealed"],
  ["Top of the rail worn flat, grooved or dinged", "A stainless track cap bonded over the old rail, once the rail's height and width are measured"],
  ["Rail bent or dented in one spot", "Careful straightening if the metal isn't cracked, then a cap if the top is rough"],
  ["Rail cracked, broken or missing", "A new track section or sill. A cap has nothing to grip without a rail underneath"],
  ["Dark gray residue on bare aluminum", "Oxidation. Wipe it off with a fine pad and protect finished surfaces"],
  ["Water spilling over the inside lip", "Clear the weeps first. If it still overflows, the sill needs an on-site look"],
];

export function TrackCrossSection() {
  return (
    <figure aria-labelledby="tc-cap">
      <div className="rounded border border-alu bg-white p-4 sm:p-6">
        <p className="config-label">SILL CROSS-SECTION</p>
        <svg viewBox="0 0 640 300" role="img" aria-labelledby="tc-t tc-d" className="mt-3 h-auto w-full">
          <title id="tc-t">Cross-section of a sliding door sill with eight common kinds of damage</title>
          <desc id="tc-d">
            Interior on the left, exterior on the right. The sill has an inside lip, a raised rail for the glass door rollers, a
            second rail for the fixed panel or screen, a channel that collects water, and weep slots that drain it to an exterior
            weep hole. Numbered pins mark the eight problems listed in the table below.
          </desc>
          <text x="20" y="28" {...T} fontWeight="700">INTERIOR</text>
          <text x="545" y="28" {...T} fontWeight="700">EXTERIOR</text>
          {/* floor */}
          <path d="M0 236h80" stroke="#b9c2c4" strokeWidth="3" />
          {/* sill body */}
          <path
            d="M80 236V150h22v62h70v-58h12v58h120v-46h12v46h110v24l92 30H80z"
            fill="#dde2e3"
            stroke="#3d4a4a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* weep slot */}
          <rect x="420" y="208" width="18" height="10" fill="#f7f4ee" stroke="#3d4a4a" strokeWidth="1.5" />
          {/* exterior weep hole */}
          <rect x="508" y="246" width="20" height="8" fill="#f7f4ee" stroke="#3d4a4a" strokeWidth="1.5" transform="rotate(18 518 250)" />
          {/* sand in channel */}
          <path d="M104 212q12-8 24 0t24 0t18 0" stroke="#9a5b2e" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55" />
          {/* ghost roller */}
          <circle cx="178" cy="132" r="22" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="2" strokeDasharray="4 3" />
          <text x="138" y="96" {...T}>Roller (for context)</text>
          {/* labels */}
          <text x="62" y="140" {...T} textAnchor="end">Inside lip</text>
          <text x="196" y="182" {...T}>Main rail</text>
          <text x="318" y="182" {...T}>Screen or fixed rail</text>
          <text x="400" y="200" {...T}>Weep slot</text>
          <text x="470" y="290" {...T}>Exterior weep hole</text>
          {/* sill riser dimension */}
          <path d="M70 150v62M64 150h12M64 212h12" stroke="#0f5c5e" strokeWidth="1.3" />
          <text x="20" y="192" {...T} fill="#0f5c5e">Sill riser</text>

          <Pin x={128} y={196} n={1} />
          <Pin x={429} y={232} n={2} />
          <Pin x={548} y={252} n={3} />
          <Pin x={178} y={142} n={4} />
          <Pin x={290} y={164} n={5} />
          <Pin x={372} y={150} n={6} />
          <Pin x={600} y={262} n={7} />
          <Pin x={92} y={124} n={8} />
        </svg>
        <table className="mt-5 w-full text-[0.95rem]">
          <thead>
            <tr>
              <th scope="col" className="w-10">#</th>
              <th scope="col">What you see</th>
              <th scope="col">What fixes it</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([damage, fix], i) => (
              <tr key={damage}>
                <td className="font-mono font-bold text-bronze-dark">{i + 1}</td>
                <td>{damage}</td>
                <td>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="tc-cap" className="figcap">
        Work through track problems in order: clean, clear the weeps, then cap or straighten. A broken rail, or a sill that still
        floods with clear weeps, needs someone on site.
      </figcaption>
    </figure>
  );
}
