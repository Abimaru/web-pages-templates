import Section from "../components/Section";
import Icon from "../components/Icon";
import { capabilities } from "../data/capabilities";

const ACCENT: Record<string, string> = {
  cyan: "text-cyan",
  electric: "text-electric",
  violet: "text-violet",
  amber: "text-amber",
  mint: "text-mint",
};
const CHIP: Record<string, string> = {
  cyan: "chip-cyan",
  electric: "chip-electric",
  violet: "chip-violet",
  amber: "chip-amber",
  mint: "chip-cyan",
};

export default function Capabilities() {
  return (
    <Section
      id="capacidades"
      eyebrow="Capacidades"
      title="Agrupadas por el problema que resuelven"
      intro="No una lista plana de herramientas: cada capacidad parte de un problema real y conecta análisis, diseño, ejecución y transferencia."
    >
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c) => (
          <article key={c.id} className="card card-hover flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] ${ACCENT[c.accent]}`}>
                <Icon name={c.icon} size={22} />
              </span>
              <h3 className="font-display text-lg font-bold leading-tight">{c.title}</h3>
            </div>
            <p className="mt-3 text-sm text-ink/75 leading-relaxed">{c.message}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {c.services.map((s) => (
                <li key={s} className={`chip ${CHIP[c.accent]} text-[0.68rem]`}>
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
