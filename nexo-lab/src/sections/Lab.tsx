import { useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import Section from "../components/Section";

const EXPERIENCES = [
  "AS-IS / TO-BE",
  "Estilos de arquitectura",
  "Lambda vs contenedores",
  "Pipeline",
  "Matriz de riesgos",
  "Progressive disclosure",
];

export default function Lab() {
  const [tab, setTab] = useState(0);

  return (
    <Section
      id="laboratorio"
      eyebrow="Laboratorio interactivo"
      title="Pensamiento arquitectónico, para explorar"
      intro="Modelos genéricos y anonimizados para mostrar cómo razono las decisiones. Nada de datos confidenciales: son ejemplos ilustrativos."
    >
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Experiencias del laboratorio">
        {EXPERIENCES.map((e, i) => (
          <button
            key={e}
            role="tab"
            aria-selected={tab === i}
            aria-controls="lab-panel"
            onClick={() => setTab(i)}
            className={`rounded-lg border px-3.5 py-2 text-[0.82rem] font-medium transition-all ${
              tab === i
                ? "border-cyan/60 bg-cyan-soft text-cyan"
                : "border-line bg-white/[0.03] text-muted hover:text-ink hover:border-line-2"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <div id="lab-panel" role="tabpanel" className="glass mt-4 rounded-2xl p-6 sm:p-7">
        {tab === 0 && <AsIsToBe />}
        {tab === 1 && <ArchStyles />}
        {tab === 2 && <LambdaVsContainers />}
        {tab === 3 && <Pipeline />}
        {tab === 4 && <RiskMatrix />}
        {tab === 5 && <ProgressiveDisclosure />}
      </div>
    </Section>
  );
}

/* ---------- Experiencia 1: AS-IS / Migración / TO-BE ---------- */
function AsIsToBe() {
  const stages = [
    {
      key: "AS-IS",
      desc: "Monolito acoplado. Un despliegue, un punto de fallo, cambios costosos.",
      nodes: ["monolito"],
    },
    {
      key: "Migración",
      desc: "Strangler: se extraen módulos por riesgo y valor, conviviendo con el monolito.",
      nodes: ["monolito", "api", "core"],
    },
    {
      key: "TO-BE",
      desc: "Módulos y servicios con contratos claros, integración por eventos y observabilidad.",
      nodes: ["api", "core", "jobs", "eventos"],
    },
  ];
  const [i, setI] = useState(0);
  const s = stages[i];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((st, idx) => (
          <button
            key={st.key}
            onClick={() => setI(idx)}
            aria-pressed={i === idx}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              i === idx ? "border-cyan/60 bg-cyan-soft text-cyan" : "border-line text-muted hover:text-ink"
            }`}
          >
            {st.key}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5" aria-hidden="true">
        {s.nodes.map((n) => (
          <span
            key={n}
            className="rounded-lg border border-cyan/40 bg-white/[0.03] px-4 py-3 font-mono text-sm text-ink/85"
          >
            {n}
          </span>
        ))}
      </div>
      <p className="mt-4 text-[0.92rem] text-ink/80 leading-relaxed">{s.desc}</p>
    </div>
  );
}

/* ---------- Experiencia 2: Estilos de arquitectura ---------- */
function ArchStyles() {
  const styles = [
    {
      key: "Monolito",
      good: ["Simple de operar al inicio", "Menos infra", "Transacciones locales"],
      cost: ["Acoplamiento creciente", "Despliegue único", "Escala en bloque"],
    },
    {
      key: "Modular",
      good: ["Límites claros", "Evoluciona por partes", "Menos infra que servicios"],
      cost: ["Requiere disciplina", "Aún despliegue conjunto (según diseño)"],
    },
    {
      key: "Servicios",
      good: ["Despliegue independiente", "Escala focalizada", "Autonomía de equipos"],
      cost: ["Complejidad operativa", "Consistencia distribuida", "Más observabilidad"],
    },
  ];
  const [i, setI] = useState(1);
  const s = styles[i];
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {styles.map((st, idx) => (
          <button
            key={st.key}
            onClick={() => setI(idx)}
            aria-pressed={i === idx}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              i === idx ? "border-violet/60 bg-violet-soft text-violet" : "border-line text-muted hover:text-ink"
            }`}
          >
            {st.key}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest text-mint">A favor</p>
          <ul className="mt-2 space-y-1.5">
            {s.good.map((g) => (
              <li key={g} className="text-[0.86rem] text-ink/80">+ {g}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.7rem] uppercase tracking-widest text-amber">A considerar</p>
          <ul className="mt-2 space-y-1.5">
            {s.cost.map((c) => (
              <li key={c} className="text-[0.86rem] text-ink/80">− {c}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-[0.8rem] italic text-steel">
        Ninguna opción es mejor siempre: depende de drivers, equipo y contexto.
      </p>
    </div>
  );
}

/* ---------- Experiencia 3: Lambda vs contenedores ---------- */
function LambdaVsContainers() {
  const rows: { dim: string; lambda: string; container: string }[] = [
    { dim: "Patrón de carga", lambda: "Picos / intermitente", container: "Sostenida / constante" },
    { dim: "Operación", lambda: "Gestionada", container: "Mayor control" },
    { dim: "Latencia", lambda: "Cold start posible", container: "Estable (caliente)" },
    { dim: "Escalamiento", lambda: "Automático por evento", container: "Orquestado" },
    { dim: "Costos", lambda: "Por uso", container: "Por capacidad" },
    { dim: "Complejidad", lambda: "Baja al inicio", container: "Media / alta" },
    { dim: "Observabilidad", lambda: "Integrada, granular", container: "Configurable, completa" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-left text-[0.86rem]">
        <thead>
          <tr className="text-[0.72rem] uppercase tracking-widest text-steel">
            <th className="pb-2 font-medium">Dimensión</th>
            <th className="pb-2 font-medium text-cyan">Lambda</th>
            <th className="pb-2 font-medium text-violet">Contenedores</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.dim} className="border-t border-line">
              <td className="py-2.5 pr-4 font-medium text-ink/85">{r.dim}</td>
              <td className="py-2.5 pr-4 text-ink/75">{r.lambda}</td>
              <td className="py-2.5 text-ink/75">{r.container}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-[0.8rem] italic text-steel">
        Comparación cualitativa e ilustrativa. La elección depende del caso concreto.
      </p>
    </div>
  );
}

/* ---------- Experiencia 4: Pipeline animado ---------- */
function Pipeline() {
  const steps = ["Commit", "Build", "Test", "Quality", "Security", "Artifact", "Deploy", "Observe"];
  const [run, setRun] = useState(-1);
  const play = () => {
    setRun(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= steps.length) {
        clearInterval(id);
        return;
      }
      setRun(i);
    }, 420);
  };
  return (
    <div>
      <button onClick={play} className="btn btn-primary btn-sm">
        <Play size={14} /> Ejecutar pipeline
      </button>
      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <span
              className={`rounded-md border px-2.5 py-1.5 font-mono text-[0.74rem] transition-all ${
                run >= i && run >= 0
                  ? "border-mint/60 bg-mint/15 text-mint"
                  : "border-line bg-white/[0.03] text-ink/70"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && <ArrowRight size={12} className="text-steel" />}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.86rem] text-ink/75">
        No considero terminada una solución hasta que construye, prueba, pasa calidad y seguridad,
        se despliega y puede observarse.
      </p>
    </div>
  );
}

/* ---------- Experiencia 5: Matriz de riesgos ---------- */
function RiskMatrix() {
  const risks: Record<string, { title: string; evidence: string; mitigation: string }> = {
    "2-2": {
      title: "Dependencia desactualizada",
      evidence: "Versiones en conflicto en el build.",
      mitigation: "Fijar y alinear dependencias; validar en CI.",
    },
    "2-1": {
      title: "Cobertura baja en módulo crítico",
      evidence: "Sin pruebas alrededor de reglas clave.",
      mitigation: "Pruebas de caracterización antes de refactor.",
    },
    "1-2": {
      title: "Timeout no alineado",
      evidence: "Capas con límites distintos.",
      mitigation: "Alinear timeouts y reintentos idempotentes.",
    },
  };
  const [cell, setCell] = useState("2-2");
  const active = risks[cell];
  const impact = ["Bajo", "Medio", "Alto"];
  const prob = ["Baja", "Media", "Alta"];
  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
      <div>
        <div className="flex">
          <div className="flex flex-col justify-around pr-2 text-[0.66rem] text-steel">
            {impact.slice().reverse().map((im) => (
              <span key={im} className="h-16 leading-[4rem]">{im}</span>
            ))}
          </div>
          <div>
            <div className="grid grid-cols-3 gap-1.5">
              {[2, 1, 0].map((row) =>
                [0, 1, 2].map((col) => {
                  const key = `${row}-${col}`;
                  const level = row + col; // 0..4
                  const has = Boolean(risks[key]);
                  const color =
                    level >= 3 ? "border-rose/50" : level === 2 ? "border-amber/50" : "border-mint/40";
                  return (
                    <button
                      key={key}
                      onClick={() => has && setCell(key)}
                      aria-label={`Impacto ${impact[row]}, probabilidad ${prob[col]}${has ? ", con riesgo de ejemplo" : ""}`}
                      className={`h-16 w-16 rounded-lg border ${color} transition-all ${
                        has
                          ? `cursor-pointer bg-white/[0.05] ${cell === key ? "ring-2 ring-cyan" : ""}`
                          : "cursor-default bg-white/[0.015] opacity-50"
                      }`}
                    >
                      {has && <span className="text-lg">▲</span>}
                    </button>
                  );
                })
              )}
            </div>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-center text-[0.66rem] text-steel">
              {prob.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-1 text-[0.66rem] text-steel">Impacto (vertical) × Probabilidad (horizontal)</p>
      </div>

      <div className="rounded-xl border border-line bg-white/[0.03] p-4" aria-live="polite">
        <h4 className="font-display font-bold text-ink">{active.title}</h4>
        <p className="mt-2 text-[0.82rem] text-muted">
          <span className="text-steel uppercase text-[0.66rem] tracking-widest">Evidencia · </span>
          {active.evidence}
        </p>
        <p className="mt-2 text-[0.82rem] text-ink/80">
          <span className="text-steel uppercase text-[0.66rem] tracking-widest">Mitigación · </span>
          {active.mitigation}
        </p>
      </div>
    </div>
  );
}

/* ---------- Experiencia 6: Progressive disclosure ---------- */
function ProgressiveDisclosure() {
  const layers = [
    { k: "Instrucciones esenciales", d: "Lo mínimo para actuar bien: siempre cargado." },
    { k: "Referencias", d: "Detalle que se consulta bajo demanda." },
    { k: "Scripts", d: "Automatizaciones reutilizables." },
    { k: "Assets", d: "Plantillas y recursos de apoyo." },
    { k: "Evaluaciones", d: "Cómo se verifica que el conocimiento funciona." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <div>
      <p className="text-[0.9rem] text-ink/80">
        El conocimiento se divide en capas: solo lo esencial está siempre presente; el resto se
        revela cuando hace falta. Así escala para personas y agentes.
      </p>
      <div className="mt-4 space-y-2">
        {layers.map((l, i) => (
          <div key={l.k} className="overflow-hidden rounded-xl border border-line">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan/15 text-[0.75rem] font-bold text-cyan">
                  {i + 1}
                </span>
                <span className="text-[0.9rem] font-medium text-ink/90">{l.k}</span>
              </span>
              <span className="text-cyan">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="px-4 pb-3 pl-14 text-[0.84rem] text-muted">{l.d}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
