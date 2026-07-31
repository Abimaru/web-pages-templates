import { Sparkles, UserCheck } from "lucide-react";
import Section from "../components/Section";

const AI_HELPS = [
  "Explorar alternativas",
  "Automatizar tareas repetitivas",
  "Comparar opciones",
  "Generar borradores",
  "Acelerar pruebas",
  "Estructurar documentación",
];

const HUMAN_OWNS = [
  "El contexto del negocio",
  "Las decisiones",
  "Los trade-offs",
  "La seguridad",
  "La calidad",
  "La validación",
  "La comunicación",
  "La transferencia",
];

export default function AiHumanLed() {
  return (
    <Section
      id="ia-criterio"
      alt
      eyebrow="AI-assisted, human-led"
      title={
        <>
          IA para acelerar. <span className="text-gradient">Criterio profesional para decidir.</span>
        </>
      }
      intro="Uso inteligencia artificial para acelerar exploración, análisis, prototipado, pruebas y documentación. Las decisiones arquitectónicas, la validación, la seguridad y la responsabilidad final permanecen bajo criterio profesional."
    >
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-soft text-cyan">
              <Sparkles size={22} />
            </span>
            <h3 className="font-display text-lg font-bold">La IA ayuda a</h3>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {AI_HELPS.map((x) => (
              <li key={x} className="chip chip-cyan text-[0.78rem]">{x}</li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-soft text-violet">
              <UserCheck size={22} />
            </span>
            <h3 className="font-display text-lg font-bold">El profesional responde por</h3>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {HUMAN_OWNS.map((x) => (
              <li key={x} className="chip chip-violet text-[0.78rem]">{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 rounded-xl border border-line bg-white/[0.03] p-4 text-[0.92rem] text-ink/80">
        La IA no reemplaza el criterio: lo acelera. Cada entrega pasa por decisiones y validaciones de
        las que respondo como profesional.
      </p>
    </Section>
  );
}
