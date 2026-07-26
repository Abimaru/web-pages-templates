import { ArrowRight, Boxes, Layers, Activity } from "lucide-react";
import { NexoAvatar } from "../components/Nexo";

const INDICATORS = [
  "Análisis basado en evidencia",
  "Arquitectura hands-on",
  "Modernización progresiva",
  "Documentación transferible",
  "Validación de calidad",
  "Visión de extremo a extremo",
];

const PIPELINE = ["Commit", "Build", "Test", "Quality", "Security", "Deploy", "Observe"];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid bg-grid-mask absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 pt-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20 lg:pb-24">
        {/* Copy */}
        <div>
          <p className="kicker text-cyan">Software Architecture · Engineering · Modernization</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Arquitectura, modernización y{" "}
            <span className="text-gradient">software que sí llega a producción.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
            Ayudo a empresas y equipos a entender sistemas complejos, diseñar arquitecturas,
            modernizar plataformas y construir soluciones backend, cloud y automatizadas.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#servicios" className="btn btn-primary">
              Explorar servicios <ArrowRight size={17} />
            </a>
            <a href="#casos" className="btn btn-ghost">
              Ver casos de estudio
            </a>
            <a href="#contacto" className="btn btn-violet">
              Cuéntame tu reto
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2.5" aria-label="Capacidades">
            {INDICATORS.map((i) => (
              <li
                key={i}
                className="rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-[0.8rem] text-ink/75"
              >
                {i}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: panel de diagnóstico con arquitectura de nodos + pipeline */}
        <div className="relative">
          <div className="absolute -right-4 -top-8 hidden sm:block">
            <NexoAvatar size={78} />
          </div>

          <div className="glass rounded-2xl p-5 shadow-[0_30px_80px_#00000066]">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="flex items-center gap-2 text-xs text-muted font-mono">
                <Activity size={14} className="text-cyan" /> panel · arquitectura AS-IS → TO-BE
              </span>
              <span className="flex gap-1.5" aria-hidden="true">
                <i className="h-2 w-2 rounded-full bg-rose/70" />
                <i className="h-2 w-2 rounded-full bg-amber/70" />
                <i className="h-2 w-2 rounded-full bg-mint/70" />
              </span>
            </div>

            {/* Diagrama de nodos */}
            <ArchDiagram />

            {/* Pipeline */}
            <div className="mt-4">
              <p className="mb-2 text-[0.7rem] uppercase tracking-widest text-steel">Pipeline</p>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {PIPELINE.map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span className="whitespace-nowrap rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[0.7rem] text-ink/80">
                      {step}
                    </span>
                    {i < PIPELINE.length - 1 && <ArrowRight size={12} className="text-steel shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Leyenda para accesibilidad */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[0.72rem] text-muted">
              <span className="flex items-center gap-1.5">
                <Boxes size={13} className="text-cyan" /> Monolito → módulos → servicios
              </span>
              <span className="flex items-center gap-1.5">
                <Layers size={13} className="text-violet" /> Eventos · observabilidad
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Diagrama de nodos animado. Decorativo → aria-hidden; su significado se explica
 * en la leyenda textual de abajo (§26 equivalente textual). */
function ArchDiagram() {
  return (
    <svg viewBox="0 0 420 190" className="mt-4 w-full" role="img" aria-label="Diagrama de evolución de arquitectura: de un monolito a módulos y servicios conectados por eventos.">
      <defs>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <g aria-hidden="true">
        {/* AS-IS: monolito */}
        <rect x="18" y="66" width="86" height="58" rx="10" fill="#131b2c" stroke="#ffffff26" />
        <text x="61" y="99" textAnchor="middle" fill="#94a1bd" fontSize="11" fontFamily="monospace">
          monolito
        </text>

        {/* enlaces */}
        <g stroke="url(#edge)" strokeWidth="2" fill="none" className="flow-line">
          <path d="M104 95 C 150 95, 150 55, 200 55" />
          <path d="M104 95 C 150 95, 150 95, 200 95" />
          <path d="M104 95 C 150 95, 150 135, 200 135" />
        </g>

        {/* módulos */}
        {[
          { y: 40, label: "api", c: "#22d3ee" },
          { y: 80, label: "core", c: "#3b82f6" },
          { y: 120, label: "jobs", c: "#8b5cf6" },
        ].map((m) => (
          <g key={m.label}>
            <rect x="200" y={m.y} width="70" height="30" rx="8" fill="#0d1424" stroke={m.c} />
            <text x="235" y={m.y + 19} textAnchor="middle" fill="#c3cce0" fontSize="10.5" fontFamily="monospace">
              {m.label}
            </text>
          </g>
        ))}

        {/* enlaces a servicios */}
        <g stroke="url(#edge)" strokeWidth="2" fill="none" className="flow-line">
          <path d="M270 55 C 320 55, 320 70, 360 70" />
          <path d="M270 95 C 320 95, 320 110, 360 110" />
        </g>

        {/* nodos de servicio */}
        <circle cx="378" cy="70" r="12" fill="#0d1424" stroke="#22d3ee" className="node-pulse" />
        <circle cx="378" cy="110" r="12" fill="#0d1424" stroke="#8b5cf6" className="node-pulse" />
        <circle cx="378" cy="70" r="3.5" fill="#22d3ee" />
        <circle cx="378" cy="110" r="3.5" fill="#8b5cf6" />
      </g>
    </svg>
  );
}
