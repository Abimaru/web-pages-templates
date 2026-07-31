import { Handshake } from "lucide-react";
import Section from "../components/Section";

const PRINCIPLES = [
  "Entender el contexto",
  "Construir con el cliente",
  "Hacer visibles las decisiones",
  "Transferir conocimiento",
  "Evitar dependencia innecesaria",
  "Dejar capacidad instalada",
];

export default function Coequipo() {
  return (
    <Section id="coequipo" alt eyebrow="Forma de colaborar">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Trabajamos como <span className="text-gradient">coequipo</span>, no como fábrica de
            entregables
          </h2>
          <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-ink/80">
            El objetivo no es entregar una caja negra. Es construir una solución que el negocio y el
            equipo puedan comprender, operar y evolucionar.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[0.9rem] text-ink/85">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass flex items-center justify-center rounded-2xl p-10">
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-cyan/15 text-cyan">
              <Handshake size={30} />
            </span>
            <p className="mt-4 font-display text-lg font-bold">Capacidad instalada</p>
            <p className="mt-1 text-sm text-muted">Que el conocimiento quede en tu equipo, no solo en el entregable.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
