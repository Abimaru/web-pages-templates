import { useEffect, useState } from "react";
import { X, ArrowRight, ShieldCheck } from "lucide-react";
import Section from "../components/Section";
import { cases, confidentialityNote, type CaseStudy, type CaseCategory } from "../data/cases";

const CATEGORIES: (CaseCategory | "Todos")[] = [
  "Todos",
  "Modernización",
  "Cloud",
  "Legado",
  "Arquitectura",
  "QA",
  "IA",
  "CI/CD",
];

const FLOW: { key: keyof CaseStudy; label: string }[] = [
  { key: "context", label: "Contexto" },
  { key: "challenge", label: "Problema" },
  { key: "evidence", label: "Evidencia" },
  { key: "analysis", label: "Análisis" },
  { key: "decisions", label: "Decisión" },
  { key: "solution", label: "Solución" },
  { key: "validation", label: "Validación" },
  { key: "transfer", label: "Transferencia" },
];

export default function CaseStudies() {
  const [filter, setFilter] = useState<CaseCategory | "Todos">("Todos");
  const [active, setActive] = useState<CaseStudy | null>(null);

  const visible = filter === "Todos" ? cases : cases.filter((c) => c.category === filter);

  return (
    <Section
      id="casos"
      eyebrow="Casos de estudio"
      title="Enfoques reales, datos anonimizados"
      intro="Siete casos que muestran cómo pienso y ejecuto: del contexto a la transferencia. Sin nombres de clientes, repositorios ni métricas confidenciales."
    >
      {/* Nota de confidencialidad (§32) */}
      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-violet/30 bg-violet-soft px-4 py-3">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-violet" />
        <p className="text-[0.83rem] text-ink/80 leading-relaxed">{confidentialityNote}</p>
      </div>

      {/* Filtros */}
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar casos por categoría">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-3.5 py-1.5 text-[0.82rem] font-medium transition-all ${
              filter === cat
                ? "border-cyan/60 bg-cyan-soft text-cyan"
                : "border-line bg-white/[0.03] text-muted hover:text-ink hover:border-line-2"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <article key={c.id} className="card card-hover flex flex-col p-5">
            <span className="chip chip-violet self-start">{c.category}</span>
            <h3 className="mt-3 font-display text-[1.05rem] font-bold leading-tight">{c.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted leading-relaxed">{c.context}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {c.states.map((s) => (
                <span key={s} className="chip chip-cyan text-[0.66rem]">
                  {s}
                </span>
              ))}
            </div>
            <button
              onClick={() => setActive(c)}
              className="btn btn-ghost btn-sm mt-4 self-start"
              aria-haspopup="dialog"
            >
              Ver recorrido <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>

      {active && <CaseModal study={active} onClose={() => setActive(null)} />}
    </Section>
  );
}

function CaseModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-title"
        className="glass relative w-full max-w-2xl rounded-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-line-2 text-muted hover:text-ink"
        >
          <X size={18} />
        </button>

        <span className="chip chip-violet">{study.category}</span>
        <h3 id="case-modal-title" className="mt-3 pr-10 font-display text-xl font-bold">
          {study.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {study.states.map((s) => (
            <span key={s} className="chip chip-cyan text-[0.66rem]">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          {FLOW.map(({ key, label }) => {
            const value = study[key];
            return (
              <div key={label} className="border-l-2 border-cyan/40 pl-4">
                <p className="text-[0.7rem] uppercase tracking-widest text-cyan">{label}</p>
                {Array.isArray(value) ? (
                  <ul className="mt-1 space-y-1">
                    {value.map((v) => (
                      <li key={v} className="text-[0.86rem] text-ink/80">
                        · {v}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-[0.86rem] text-ink/80 leading-relaxed">{value as string}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <p className="text-[0.7rem] uppercase tracking-widest text-steel">Tecnologías</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {study.technologies.map((t) => (
              <span key={t} className="chip chip-electric text-[0.68rem]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-[0.72rem] italic text-steel leading-relaxed">{confidentialityNote}</p>
      </div>
    </div>
  );
}
