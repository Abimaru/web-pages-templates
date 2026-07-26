import Section from "../components/Section";
import Icon from "../components/Icon";
import { techGroups } from "../data/technologies";

export default function Technologies() {
  return (
    <Section
      id="tecnologias"
      eyebrow="Tecnologías"
      title="Herramientas al servicio del problema"
      intro="La tecnología respalda la propuesta, no la protagoniza. Primero los atributos de calidad; luego, la herramienta adecuada."
    >
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techGroups.map((g) => (
          <article key={g.id} className="card p-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] text-cyan">
                <Icon name={g.icon} size={18} />
              </span>
              <h3 className="font-display font-bold">{g.label}</h3>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <li key={it} className="chip text-[0.72rem] text-ink/75">
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-5 text-[0.8rem] italic text-steel">
        No afirmo dominio experto absoluto de toda tecnología: trabajo con criterio, evidencia y
        aprendizaje continuo.
      </p>
    </Section>
  );
}
