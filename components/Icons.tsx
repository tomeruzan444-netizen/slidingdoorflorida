export const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
  </svg>
);
export const ChevronIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m5 8 5 5 5-5" />
  </svg>
);
export const MenuIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

type IconProps = { className?: string };
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const ClockIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" {...line} /><path d="M12 7v5l3 2" {...line} /></svg>
);
export const BadgeIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" {...line} /><circle cx="9" cy="11" r="2.2" {...line} /><path d="M5.8 16.2c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14.5 10h4M14.5 13.5h3" {...line} /></svg>
);
export const ShieldIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z" {...line} /><path d="M8.8 12.2l2.2 2.2 4.4-4.6" {...line} /></svg>
);
export const PinIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 0113 0C18.5 14.9 12 21 12 21z" {...line} /><circle cx="12" cy="9.8" r="2.3" {...line} /></svg>
);
export const CameraIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><path d="M4 8h3.2l1.6-2.5h6.4L16.8 8H20a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" {...line} /><circle cx="12" cy="13.2" r="3.4" {...line} /></svg>
);
export const ArrowIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" {...line} /></svg>
);
export const CheckIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" {...line} /><path d="M8 12.3l2.7 2.7L16.2 9.5" {...line} /></svg>
);
export const RulerIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false"><rect x="2.5" y="8" width="19" height="8" rx="1.2" {...line} /><path d="M6.5 8v3M10 8v4.5M13.5 8v3M17 8v4.5" {...line} /></svg>
);
