import { business, known } from "@/content/business";

/** Repair-or-replace decision matrix. */
const ROWS: [string, string, string][] = [
  ["Frame", "Straight and solid. Corrosion only on the surface.", "Corroded through, cracked at the corners, or bent so the panel can't be squared."],
  ["Rollers, track, lock", "Worn parts that are still made or have a good match.", "Parts discontinued and nothing fits, or the bottom rail that holds the rollers is split."],
  ["Glass", "One cracked pane or one fogged glass unit that can be swapped.", "Several fogged units, or you want impact glass the frame wasn't built for."],
  ["Energy and comfort", "Drafts from worn weatherstrip or a panel set too high.", "Single-pane glass baking a room, or condensation on the frame every summer."],
  ["Storm protection", "You already have approved shutters or impact glass.", "No opening protection, and you'd rather not put up shutters every storm."],
  ["Door age and repair history", "First real repair in years.", "One repair keeps leading to the next."],
];

export function RepairReplaceMatrix() {
  return (
    <figure aria-labelledby="rr-cap">
      <div className="overflow-x-auto rounded border border-alu bg-white">
        <table className="min-w-[38rem] text-[0.95rem]">
          <caption className="px-4 pt-4 text-left">
            <span className="config-label">DECISION MATRIX</span>
            <span className="mt-1 block font-[family-name:var(--font-display)] text-lg font-semibold text-frame">Repair or replace?</span>
          </caption>
          <thead>
            <tr>
              <th scope="col">Look at</th>
              <th scope="col">Points to repair</th>
              <th scope="col">Points to replacement</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([k, repair, replace]) => (
              <tr key={k}>
                <th scope="row" className="!bg-transparent">{k}</th>
                <td>{repair}</td>
                <td>{replace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="rr-cap" className="figcap">
        One column on the right usually isn&apos;t enough. A bad frame, or two or three rows pointing to replacement, is when a new door
        starts to make sense.
      </figcaption>
    </figure>
  );
}

function Config({ code }: { code: string }) {
  const n = code.length;
  const w = 220 / n;
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" className="h-auto w-full">
      <rect x="8" y="8" width="224" height="96" fill="none" stroke="#3d4a4a" strokeWidth="3" />
      {[...code].map((c, i) => {
        const x = 10 + i * w;
        const moving = c === "X";
        return (
          <g key={i}>
            <rect x={x + 2} y={moving ? 13 : 11} width={w - 4} height={moving ? 86 : 90} fill={moving ? "#d6ebe7" : "#e8f3f0"} stroke={moving ? "#9a5b2e" : "#0f5c5e"} strokeWidth="2" />
            <text x={x + w / 2} y={66} textAnchor="middle" fontSize="22" fontWeight="700" fill={moving ? "#7e4924" : "#0f5c5e"} fontFamily="var(--font-mono), monospace">{c}</text>
          </g>
        );
      })}
      <path d="M8 112h224M8 117h224" stroke="#b9c2c4" strokeWidth="1.5" />
    </svg>
  );
}

const CONFIGS: [string, string][] = [
  ["XO", "Two panels. The left one slides, seen from outside."],
  ["OX", "Two panels. The right one slides, seen from outside."],
  ["OXO", "Three panels. The center one slides between two fixed panels."],
  ["OXXO", "Four panels. The two center panels slide apart and meet in the middle."],
];

export function ConfigDiagram() {
  return (
    <figure aria-labelledby="cfg-cap">
      <div className="rounded border border-alu bg-white p-4 sm:p-6">
        <p className="config-label">CONFIGURATION CODES</p>
        <ul className="mt-4 grid gap-5 !pl-0 sm:grid-cols-2">
          {CONFIGS.map(([code, text]) => (
            <li key={code} className="!pl-0 before:!hidden">
              <Config code={code} />
              <p className="mt-2 text-[0.95rem]"><span className="font-mono font-bold text-bronze-dark">{code}</span> {text}</p>
            </li>
          ))}
        </ul>
      </div>
      <figcaption id="cfg-cap" className="figcap">
        X is a panel that slides and O is a fixed panel, always read from outside the house. Ordering OX when you meant XO puts the
        handle on the wrong side.
      </figcaption>
    </figure>
  );
}

/** The business's own license line, from business.ts. */
export function LicenseLine() {
  if (!known(business.licenseNumber)) return null;
  return (
    <p className="rounded border border-alu bg-sea-soft px-4 py-3">
      Our license: <strong>{business.licenseType}</strong>, license number <strong>{business.licenseNumber}</strong>.
    </p>
  );
}

/** Insurance wording, shown only once the owner supplies it. */
export function InsuranceLine() {
  if (!known(business.insurance)) return null;
  return <p>Insurance: {business.insurance}.</p>;
}
