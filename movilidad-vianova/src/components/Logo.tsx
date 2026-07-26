export default function Logo({ size = 34, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="vnLogo" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#e8873a" />
            <stop offset="0.55" stopColor="#f4a24d" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="15" fill="#0e1626" />
        <path d="M15 16 L30 47 L38 30" stroke="url(#vnLogo)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 30 L49 12" stroke="url(#vnLogo)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="49" cy="12" r="5" fill="#22d3ee" />
      </svg>
      {showText && (
        <span className="font-display text-xl font-bold tracking-tight text-ink">
          Vía<span className="text-cobre-2">Nova</span>
        </span>
      )}
    </span>
  );
}
