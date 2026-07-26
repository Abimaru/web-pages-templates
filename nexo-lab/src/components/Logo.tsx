/* Identidad NEXO LAB (§7). SVG original: nodo · enlace · núcleo · letra N.
 * Variantes: isotipo, horizontal (con firma) y monocromático. */

interface IsotypeProps {
  size?: number;
  mono?: boolean;
  title?: string;
}

export function Isotype({ size = 40, mono = false, title = "NEXO LAB" }: IsotypeProps) {
  const stroke = mono ? "currentColor" : "url(#nl-grad)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {!mono && (
        <defs>
          <linearGradient id="nl-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="0.55" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      )}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="15"
        fill={mono ? "transparent" : "#0a0b12"}
        stroke={mono ? "currentColor" : "#ffffff1f"}
        strokeOpacity={mono ? 0.35 : 1}
      />
      <path
        d="M18 46 L18 18 L46 46 L46 18"
        fill="none"
        stroke={stroke}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill={stroke}>
        <circle cx="18" cy="18" r="4.6" />
        <circle cx="46" cy="46" r="4.6" />
      </g>
      <g fill={mono ? "transparent" : "#0a0b12"} stroke={stroke} strokeWidth="2.4">
        <circle cx="46" cy="18" r="3.6" />
        <circle cx="18" cy="46" r="3.6" />
      </g>
      <circle cx="32" cy="32" r="2.4" fill={mono ? "currentColor" : "#22d3ee"} />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  mono?: boolean;
  showSignature?: boolean;
}

export default function Logo({ size = 38, mono = false, showSignature = true }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5" aria-label="NEXO LAB by Abimaru">
      <Isotype size={size} mono={mono} />
      <span className="leading-none">
        <span className="font-display font-bold tracking-tight text-[1.05rem] block">
          NEXO <span className={mono ? "" : "text-gradient"}>LAB</span>
        </span>
        {showSignature && (
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-muted font-medium">
            by Abimaru
          </span>
        )}
      </span>
    </span>
  );
}
