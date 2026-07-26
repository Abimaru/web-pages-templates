import { ArrowRight } from "lucide-react";
import Section from "../components/Section";

const FLOW = ["Descubrir", "Diagnosticar", "Diseñar", "Construir", "Validar", "Transferir"];

const PRINCIPLES = [
  { t: "Comunicación", d: "Claridad de estado y decisiones en todo momento." },
  { t: "Alcance", d: "Definido y acordado antes de empezar." },
  { t: "Evidencia", d: "Hallazgos y decisiones respaldados, no opiniones." },
  { t: "Iteraciones", d: "Avances revisables por incremento." },
  { t: "Validaciones", d: "Pruebas, calidad y operación antes de cerrar." },
  { t: "Handoff", d: "Documentación y traspaso de conocimiento." },
];

const MODES = [
  "Evaluación",
  "Sprint",
  "Acompañamiento",
  "Implementación",
  "Consultoría",
  "Documentación",
];

export default function WayOfWorking() {
  return (
    <Section
      id="forma-trabajo"
      eyebrow="Forma de trabajo"
      title="Del contexto a la transferencia"
      intro="Un recorrido claro, con evidencia y validaciones en cada paso. Sin caja negra."
    >
      {/* Flujo */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {FLOW.map((f, i) => (
          <div key={f} className="flex items-center gap-2">
            <span className="rounded-lg border border-line bg-white/[0.03] px-3.5 py-2 font-display text-[0.85rem] font-medium text-ink/85">
              {f}
            </span>
            {i < FLOW.length - 1 && <ArrowRight size={14} className="text-steel" />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div key={p.t} className="rounded-xl border border-line bg-white/[0.03] p-4">
            <p className="font-display text-[0.95rem] font-semibold text-cyan">{p.t}</p>
            <p className="mt-1 text-[0.85rem] text-muted leading-relaxed">{p.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest text-steel">Modalidades</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {MODES.map((m) => (
              <span key={m} className="chip chip-violet text-[0.72rem]">
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold text-ink">Cotización personalizada</p>
          <p className="text-[0.8rem] text-muted">Según alcance, no plantillas de precio.</p>
        </div>
      </div>
    </Section>
  );
}
