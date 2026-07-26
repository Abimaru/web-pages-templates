import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Icon from "../components/Icon";
import { NexoAvatar } from "../components/Nexo";
import { useReveal } from "../hooks/useReveal";
import { problems } from "../data/problems";
import { recommendFor } from "../lib/recommender";

export default function ProblemSelector() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? recommendFor(selected) : null;

  return (
    <section id="selector" aria-labelledby="selector-title" className="py-16 sm:py-20 border-y border-line bg-white/[0.015]">
      <div ref={ref} className={`mx-auto max-w-6xl px-5 sm:px-6 reveal ${visible ? "is-visible" : ""}`}>
        <div className="flex items-start gap-4">
          <div className="hidden sm:block shrink-0">
            <NexoAvatar size={64} />
          </div>
          <div>
            <p className="kicker text-cyan mb-2">Guiado por Nexo</p>
            <h2 id="selector-title" className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              ¿Qué necesitas resolver?
            </h2>
            <p className="mt-2 max-w-2xl text-muted text-[0.98rem]">
              Elige el punto de partida y te muestro servicios, un caso relacionado y una ruta de
              trabajo. Es una guía orientativa por reglas —{" "}
              <span className="text-ink/80">no un diagnóstico automático</span>.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Opciones */}
          <div role="listbox" aria-label="Opciones de problema" className="grid gap-2.5 sm:grid-cols-2">
            {problems.map((p) => {
              const active = p.id === selected;
              return (
                <button
                  key={p.id}
                  role="option"
                  aria-selected={active}
                  onClick={() => setSelected(p.id)}
                  className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    active
                      ? "border-cyan/60 bg-cyan-soft"
                      : "border-line bg-white/[0.03] hover:border-line-2 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                      active ? "bg-cyan/20 text-cyan" : "bg-white/[0.05] text-muted group-hover:text-ink"
                    }`}
                  >
                    <Icon name={p.icon} size={18} />
                  </span>
                  <span className="text-[0.9rem] font-medium leading-tight">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Resultado / recomendación */}
          <div aria-live="polite" className="min-h-[280px]">
            {!rec ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-line-2 bg-white/[0.02] p-8 text-center">
                <NexoAvatar size={70} />
                <p className="mt-4 max-w-xs text-sm text-muted">
                  Selecciona un reto a la izquierda y te propongo una ruta con servicios y un caso
                  relacionado.
                </p>
              </div>
            ) : (
              <div className="glass rounded-2xl p-5">
                <p className="text-[0.7rem] uppercase tracking-widest text-steel">Ruta sugerida para</p>
                <h3 className="font-display text-xl font-bold">{rec.problem.label}</h3>

                {/* Ruta */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {rec.route.map((step, i) => (
                    <span key={step} className="flex items-center gap-1.5">
                      <span className="chip chip-cyan">{step}</span>
                      {i < rec.route.length - 1 && <ArrowRight size={12} className="text-steel" />}
                    </span>
                  ))}
                </div>

                {/* Servicios recomendados */}
                <p className="mt-5 text-[0.7rem] uppercase tracking-widest text-steel">Servicios</p>
                <ul className="mt-2 space-y-1.5">
                  {rec.packages.map((pkg) => (
                    <li key={pkg.id} className="flex items-start gap-2 text-sm">
                      <Check size={15} className="mt-0.5 shrink-0 text-mint" />
                      <a href="#servicios" className="text-ink/85 hover:text-cyan transition-colors">
                        {pkg.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Caso relacionado */}
                {rec.relatedCase && (
                  <p className="mt-4 text-sm text-muted">
                    Caso relacionado:{" "}
                    <a href="#casos" className="text-cyan hover:underline">
                      {rec.relatedCase.title}
                    </a>
                  </p>
                )}

                <a href={rec.cta.target} className="btn btn-primary btn-sm mt-5 w-full">
                  {rec.cta.label} <ArrowRight size={15} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
