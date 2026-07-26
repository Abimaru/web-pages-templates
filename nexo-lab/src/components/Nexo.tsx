/* Nexo — copiloto visual y narrativo (§6).
 * PLACEHOLDER SVG ORIGINAL. No es un avatar de terceros ni una imagen del propietario.
 * TODO(propietario): reemplazable por el asset aprobado de Nexo cuando exista.
 *
 * TRANSPARENCIA: Nexo NO usa IA en tiempo real, no analiza el sistema del visitante,
 * no realiza diagnósticos automáticos reales ni guarda conversaciones. Es una guía por
 * reglas frontend con mensajes predefinidos. */

interface NexoAvatarProps {
  size?: number;
  className?: string;
  floating?: boolean;
}

export function NexoAvatar({ size = 72, className = "", floating = true }: NexoAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${floating ? "animate-float" : ""} ${className}`}
      role="img"
      aria-label="Nexo, guía de NEXO LAB"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nexo-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2740" />
          <stop offset="1" stopColor="#0d1424" />
        </linearGradient>
        <linearGradient id="nexo-visor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id="nexo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* halo */}
      <circle cx="60" cy="62" r="52" fill="url(#nexo-glow)" />

      {/* antena / nodo superior */}
      <line x1="60" y1="20" x2="60" y2="34" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="16" r="5" fill="#22d3ee" className="node-pulse" />

      {/* cabeza hexagonal redondeada */}
      <path
        d="M60 30 L86 45 L86 77 L60 92 L34 77 L34 45 Z"
        fill="url(#nexo-body)"
        stroke="#ffffff26"
        strokeWidth="1.5"
      />

      {/* visor */}
      <rect x="42" y="52" width="36" height="16" rx="8" fill="#070b14" stroke="#ffffff1f" />
      <rect x="45" y="55" width="30" height="10" rx="5" fill="url(#nexo-visor)" opacity="0.9" />
      {/* ojos de datos */}
      <circle cx="53" cy="60" r="2.4" fill="#0a0b12" />
      <circle cx="67" cy="60" r="2.4" fill="#0a0b12" />

      {/* nodos laterales (conexión) */}
      <circle cx="34" cy="61" r="3.2" fill="#8b5cf6" />
      <circle cx="86" cy="61" r="3.2" fill="#22d3ee" />

      {/* base / señal */}
      <path d="M50 92 L70 92 L66 100 L54 100 Z" fill="url(#nexo-body)" stroke="#ffffff1f" strokeWidth="1" />
      <circle cx="60" cy="104" r="3" fill="#22d3ee" className="node-pulse" />
    </svg>
  );
}

interface NexoCalloutProps {
  message: string;
  align?: "left" | "center";
  size?: number;
  className?: string;
}

/** Nexo + panel contextual (callout). Guía narrativa reutilizable. */
export function NexoCallout({ message, align = "left", size = 60, className = "" }: NexoCalloutProps) {
  return (
    <div
      className={`flex items-start gap-3 ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      <div className="shrink-0">
        <NexoAvatar size={size} />
      </div>
      <div className="glass relative rounded-2xl px-4 py-3 max-w-md">
        <span
          className="absolute -left-1.5 top-5 w-3 h-3 rotate-45 border-l border-b border-line-2 bg-[#0d1424]"
          aria-hidden="true"
        />
        <p className="text-sm text-ink/90 leading-relaxed">
          <span className="chip chip-cyan mr-2 align-middle">Nexo</span>
          {message}
        </p>
      </div>
    </div>
  );
}
