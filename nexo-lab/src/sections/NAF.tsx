import { useState } from "react";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { nafStages, nafDisclaimer } from "../data/naf";

export default function NAF() {
  const [active, setActive] = useState(0);
  const stage = nafStages[active];

  return (
    <Section
      id="naf"
      alt
      eyebrow="Metodología"
      title={
        <>
          NAF · <span className="text-gradient">Nexo Architecture Framework</span>
        </>
      }
      intro="Una forma de trabajo en siete etapas, del contexto a la transferencia. Recórrela para ver qué incluye cada una."
    >
      {/* Recorrido: etapas como nodos */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Etapas de NAF">
        {nafStages.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={isActive}
              aria-controls="naf-panel"
              onClick={() => setActive(i)}
              className={`group flex min-w-[128px] flex-1 flex-col items-center gap-2 rounded-xl border px-3 py-3 transition-all ${
                isActive
                  ? "border-cyan/60 bg-cyan-soft"
                  : "border-line bg-white/[0.03] hover:border-line-2"
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-display font-bold ${
                  isActive ? "border-cyan bg-cyan/15 text-cyan" : "border-line-2 text-muted"
                }`}
              >
                {s.n}
              </span>
              <span
                className={`flex items-center gap-1.5 text-[0.8rem] font-medium ${
                  isActive ? "text-ink" : "text-muted group-hover:text-ink"
                }`}
              >
                <Icon name={s.icon} size={14} /> {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel de la etapa activa */}
      <div
        id="naf-panel"
        role="tabpanel"
        aria-live="polite"
        className="glass mt-4 rounded-2xl p-6 sm:p-7"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/15 text-cyan">
            <Icon name={stage.icon} size={24} />
          </span>
          <div>
            <p className="text-[0.7rem] uppercase tracking-widest text-steel">Etapa {stage.n} de 7</p>
            <h3 className="font-display text-xl font-bold">{stage.title}</h3>
          </div>
        </div>
        <p className="mt-3 text-[0.98rem] text-ink/80">{stage.purpose}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {stage.items.map((it) => (
            <li key={it} className="chip chip-cyan">
              {it}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-[0.78rem] italic text-steel">{nafDisclaimer}</p>
    </Section>
  );
}
