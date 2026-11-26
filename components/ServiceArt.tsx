/**
 * Line drawings for the homepage service cards. Each one shows the part the service is about,
 * drawn in the site's "glass, frame, and track" language. Decorative: the card title carries the meaning.
 */
const s = { fill: "none", stroke: "#0f5c5e", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const accent = { ...s, stroke: "#9a5b2e" };
const rail = { fill: "none", stroke: "#b9c2c4", strokeWidth: 2 };
const glass = { fill: "#ffffff", fillOpacity: 0.7 };

function Roller() {
  return (
    <>
      <rect x="40" y="18" width="80" height="44" rx="3" {...s} />
      <path d="M52 30h56" {...rail} />
      <circle cx="80" cy="62" r="17" {...accent} {...glass} />
      <circle cx="80" cy="62" r="5" {...accent} />
      <path d="M20 84h120M20 90h120" {...rail} />
    </>
  );
}
function Track() {
  return (
    <>
      <path d="M18 78h124v10H18z" {...s} />
      <path d="M44 78V54h8v24M92 78V54h8v24" {...s} />
      <path d="M44 54h8M92 54h8" {...accent} strokeWidth={4} />
      <circle cx="72" cy="83" r="2" fill="#9a5b2e" />
      <circle cx="120" cy="83" r="2" fill="#9a5b2e" />
      <path d="M38 30h28v24M86 30h28v24" {...rail} />
    </>
  );
}
function Lock() {
  return (
    <>
      <rect x="34" y="12" width="36" height="76" rx="2" {...s} {...glass} />
      <rect x="62" y="38" width="12" height="26" rx="2" {...s} />
      <path d="M74 46c10 0 14 4 14 10s-4 8-10 8" {...accent} />
      <rect x="96" y="40" width="12" height="28" rx="2" {...accent} />
      <path d="M108 54h20" {...rail} />
    </>
  );
}
function Screen() {
  const lines = [];
  for (let x = 46; x <= 114; x += 8) lines.push(<path key={`v${x}`} d={`M${x} 18v62`} stroke="#b9c2c4" strokeWidth="1.2" />);
  for (let y = 26; y <= 74; y += 8) lines.push(<path key={`h${y}`} d={`M40 ${y}h80`} stroke="#b9c2c4" strokeWidth="1.2" />);
  return (
    <>
      {lines}
      <rect x="38" y="14" width="84" height="70" rx="2" {...s} />
      <path d="M38 84h84" {...accent} />
      <circle cx="54" cy="88" r="4" {...accent} />
      <circle cx="106" cy="88" r="4" {...accent} />
    </>
  );
}
function Closet() {
  return (
    <>
      <path d="M22 14h116M22 20h116" {...rail} />
      <rect x="32" y="22" width="56" height="66" rx="2" {...s} {...glass} />
      <rect x="72" y="26" width="56" height="62" rx="2" {...accent} fill="#d6ebe7" fillOpacity="0.8" />
      <path d="M80 50v14" {...accent} />
      <path d="M22 92h116" {...rail} />
    </>
  );
}
function Replacement() {
  return (
    <>
      <rect x="26" y="12" width="108" height="76" rx="2" {...s} />
      <rect x="34" y="20" width="44" height="60" {...glass} stroke="#b9c2c4" strokeWidth="2" strokeDasharray="5 4" fill="none" />
      <rect x="82" y="20" width="44" height="60" {...accent} fill="#d6ebe7" />
      <path d="M50 50h18M62 44l6 6-6 6" {...accent} />
      <path d="M20 94h120" {...rail} />
    </>
  );
}
function Patio() {
  return (
    <>
      <rect x="34" y="12" width="92" height="78" rx="2" {...s} />
      <rect x="40" y="18" width="38" height="66" {...s} {...glass} strokeWidth={2} />
      <rect x="82" y="18" width="38" height="66" {...s} {...glass} strokeWidth={2} />
      <path d="M72 46v10M88 46v10" {...accent} strokeWidth={3.5} />
      <path d="M40 40h38M82 40h38" {...rail} />
    </>
  );
}
function Unsure() {
  return (
    <>
      <circle cx="72" cy="46" r="26" {...s} />
      <path d="M91 65l22 22" {...accent} strokeWidth={5} />
      <path d="M64 40c0-5 4-8 8.5-8s8 3 8 7.5c0 6-8 6.5-8 12" {...s} />
      <circle cx="72.5" cy="58" r="1.8" fill="#0f5c5e" />
    </>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  "sliding-door-roller-replacement": Roller,
  "sliding-door-track-repair": Track,
  "sliding-door-lock-and-handle-repair": Lock,
  "sliding-screen-door-repair": Screen,
  "sliding-closet-door-repair": Closet,
  "sliding-glass-door-replacement": Replacement,
  "patio-door-repair": Patio,
  unsure: Unsure,
};

export function ServiceArt({ slug, className = "h-24 w-36" }: { slug: string; className?: string }) {
  const Art = ART[slug] ?? Unsure;
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
