import { Check } from "lucide-react";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { packages } from "../data/packages";

const ACCENT: Record<string, string> = {
  cyan: "text-cyan",
  electric: "text-electric",
  violet: "text-violet",
  amber: "text-amber",
  mint: "text-mint",
};

export default function Packages() {
  return (
    <Section
      id="servicios"
      alt
      eyebrow="Servicios empaquetados"
      title="Puntos de partida claros"
      intro="Alcances definidos con entregables concretos. Cada uno se ajusta al contexto; el valor se acuerda con una cotización personalizada."
    >
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {packages.map((p) => (
          <article key={p.id} className="card card-hover flex flex-col p-6">
            <div className="flex items-start gap-3">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.05] ${ACCENT[p.accent]}`}>
                <Icon name={p.icon} size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{p.summary}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-line pt-4">
              <p className="text-[0.7rem] uppercase tracking-widest text-steel">Entregables</p>
              <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-[0.83rem] text-ink/80">
                    <Check size={14} className="mt-0.5 shrink-0 text-mint" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contacto" className="btn btn-ghost btn-sm mt-5 self-start">
              Cotización personalizada
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}
