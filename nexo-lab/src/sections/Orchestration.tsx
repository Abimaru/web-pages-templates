import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Section from "../components/Section";

const NODES = [
  { k: "Negocio", d: "El objetivo real y el valor esperado. Todo empieza aquí, no en la tecnología." },
  { k: "Procesos", d: "Cómo trabaja hoy la organización y qué debería cambiar." },
  { k: "Experiencia", d: "La interfaz y el recorrido para personas y equipos." },
  { k: "Software", d: "Frontend, backend y aplicaciones que soportan el proceso." },
  { k: "Datos e integraciones", d: "La información y las conexiones entre herramientas." },
  { k: "Cloud e infraestructura", d: "Dónde y cómo corre, con resiliencia y costo bajo control." },
  { k: "Seguridad y calidad", d: "Controles, pruebas y validación transversales, no un extra." },
  { k: "Operación y evolución", d: "Monitoreo, mantenimiento y mejora continua después del lanzamiento." },
];

export default function Orchestration() {
  const [active, setActive] = useState(0);
  const node = NODES[active];

  return (
    <Section
      id="orquestacion"
      alt
      eyebrow="Orquestación tecnológica"
      title="La tecnología aislada no transforma una empresa"
      intro="La transformación ocurre cuando procesos, personas, software, datos, cloud, seguridad y operación funcionan como un solo sistema. Recorre las capas."
    >
      <div className="mt-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="Capas de orquestación">
        {NODES.map((n, i) => (
          <div key={n.k} className="flex items-center gap-2">
            <button
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-lg border px-3 py-2 text-[0.82rem] font-medium transition-all ${
                i === active
                  ? "border-cyan/60 bg-cyan-soft text-cyan"
                  : "border-line bg-white/[0.03] text-muted hover:text-ink hover:border-line-2"
              }`}
            >
              {n.k}
            </button>
            {i < NODES.length - 1 && <ArrowRight size={13} className="hidden text-steel sm:block" />}
          </div>
        ))}
      </div>

      <div aria-live="polite" className="glass mt-4 rounded-2xl p-6">
        <h3 className="font-display text-lg font-bold text-cyan">{node.k}</h3>
        <p className="mt-2 text-[0.98rem] text-ink/80 leading-relaxed">{node.d}</p>
      </div>
    </Section>
  );
}
