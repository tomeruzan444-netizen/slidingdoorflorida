import { business } from "@/content/business";

/** Mark: a door frame with a fixed (O) and an operable (X) panel on a double track. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="3" width="36" height="31" rx="1.5" fill="none" stroke="#0f5c5e" strokeWidth="2.5" />
      <rect x="6" y="7" width="14" height="23" fill="#d6ebe7" stroke="#0f5c5e" strokeWidth="1.5" />
      <rect x="17" y="7" width="17" height="23" fill="#ffffff" fillOpacity="0.7" stroke="#9a5b2e" strokeWidth="1.5" />
      <path d="M30 17v4" stroke="#9a5b2e" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 36.5h36M2 39h36" stroke="#b9c2c4" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold leading-tight tracking-tight text-frame">
        {business.brandName}
        <span className="block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-teal">
          Sliding door repair &middot; Florida
        </span>
      </span>
    </span>
  );
}
