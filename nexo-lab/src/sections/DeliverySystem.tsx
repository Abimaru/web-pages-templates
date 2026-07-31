import { ArrowRight } from "lucide-react";
import Section from "../components/Section";
import Icon from "../components/Icon";

const STAGES = [
  { n: 1, name: "Nexo Compass", role: "Descubrir · Mapear", desc: "Entender el problema, los usuarios, el proceso y el contexto antes de proponer nada.", naf: ["Descubrir", "Mapear"], icon: "Compass" },
  { n: 2, name: "Nexo Blueprint", role: "Diagnosticar · Diseñar", desc: "Diagnosticar con evidencia y diseñar la solución con drivers y trade-offs.", naf: ["Diagnosticar", "Diseñar"], icon: "PenTool" },
  { n: 3, name: "Nexo Build", role: "Ejecutar", desc: "Construir: UX/UI, frontend, backend, integraciones e infraestructura.", naf: ["Ejecutar"], icon: "Hammer" },
  { n: 4, name: "Nexo Assurance", role: "Validar", desc: "Validar seguridad, calidad, accesibilidad, rendimiento y operación.", naf: ["Validar"], icon: "ShieldCheck" },
  { n: 5, name: "Nexo Transfer & Evolution", role: "Transferir", desc: "Documentación, handoff, capacitación, mantenimiento y evolución continua.", naf: ["Transferir"], icon: "Share2" },
];

export default function DeliverySystem() {
  return (
    <Section
      id="delivery-system"
      alt
      eyebrow="Nexo Delivery System"
      title="Una sola forma de entregar, en ambas líneas"
      intro="El sistema que conecta Estudio Abimaru y NEXO LAB: del descubrimiento a la evolución, con evidencia, seguridad, calidad, operación y transferencia. Es la versión comercial de la metodología NAF; no es una certificación externa."
    >
      <ol className="mt-9 grid gap-4 lg:grid-cols-5">
        {STAGES.map((s, i) => (
          <li key={s.name} className="relative">
            <div className="card h-full p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan/15 text-cyan">
                  <Icon name={s.icon} size={18} />
                </span>
                <span className="font-display text-sm font-bold">{s.n}</span>
              </div>
              <h3 className="mt-3 font-display text-[0.98rem] font-bold leading-tight">{s.name}</h3>
              <p className="mt-1 text-[0.72rem] uppercase tracking-widest text-steel">{s.role}</p>
              <p className="mt-2 text-[0.83rem] text-ink/75 leading-relaxed">{s.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.naf.map((n) => (
                  <span key={n} className="chip chip-violet text-[0.66rem]">NAF · {n}</span>
                ))}
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <ArrowRight
                size={16}
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-steel lg:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 rounded-xl border border-line bg-white/[0.03] p-4 text-[0.9rem] text-ink/80">
        <span className="font-semibold text-cyan">Compass</span> y{" "}
        <span className="font-semibold text-cyan">Blueprint</span> también existen como experiencias
        en la web: el diagnóstico de Estudio Abimaru y la ruta recomendada. Lo demás se acuerda por
        proyecto con una cotización personalizada.
      </p>
    </Section>
  );
}
