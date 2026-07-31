import { Lock } from "lucide-react";
import Section from "../components/Section";

const CAPABILITIES = [
  "Clasificación de datos",
  "Validación",
  "Control de acceso",
  "Dependencias",
  "Secretos",
  "Configuración",
  "Privacidad",
  "Trazabilidad",
  "Observabilidad",
  "Recuperación",
  "Incidentes",
  "Continuidad",
];

export default function Security() {
  return (
    <Section
      id="seguridad"
      eyebrow="Seguridad desde el diseño"
      title="Digitalizar sin seguridad solo traslada el problema"
      intro="La seguridad no es una capa al final: se piensa desde el diseño. Estas son las áreas que considero según el contexto de cada solución."
    >
      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-violet/30 bg-violet-soft p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet/15 text-violet">
          <Lock size={22} />
        </span>
        <p className="text-[0.95rem] text-ink/85 leading-relaxed">
          Digitalizar sin seguridad solo traslada el problema y crea nuevos riesgos. El objetivo es
          reducir la superficie de riesgo, no ignorarla.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {CAPABILITIES.map((c) => (
          <span key={c} className="chip chip-violet text-[0.78rem]">{c}</span>
        ))}
      </div>

      <p className="mt-6 text-[0.8rem] italic text-steel">
        Nota: las demostraciones del ecosistema son prototipos; no todas cuentan con una evaluación
        completa de seguridad. El alcance de seguridad se define por proyecto.
      </p>
    </Section>
  );
}
