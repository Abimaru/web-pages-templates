import { Search, GitCompare, Calculator, FileText, ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";

const steps = [
  { icon: Search, t: "Descubre", d: "Explora nuevos y usados con cuota estimada.", href: "#marketplace" },
  { icon: GitCompare, t: "Compara", d: "Enfrenta hasta 3 opciones lado a lado.", href: "#comparador" },
  { icon: Calculator, t: "Simula", d: "Compara 3 escenarios de financiación.", href: "#cockpit" },
  { icon: FileText, t: "Solicita", d: "Un flujo claro en 5 pasos.", href: "#solicitud" },
  { icon: ShieldCheck, t: "Protege", d: "Suma la cobertura que necesitas.", href: "#seguros" },
];

export default function Process() {
  return (
    <section id="proceso" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="mb-12 text-center">
        <span className="kicker text-cobre-2">Cómo funciona</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Una sola ruta, de principio a fin</h2>
      </Reveal>
      <div className="relative">
        <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-cobre/40 to-transparent lg:block" />
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <a href={s.href} className="group flex flex-col items-center rounded-2xl border border-line bg-panel/40 p-5 text-center transition hover:border-cobre/50">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-graphite text-cobre-2 ring-1 ring-line transition group-hover:bg-cobre group-hover:text-graphite"><s.icon size={24} /></span>
                <span className="mt-2 text-xs font-bold text-cobre-2">0{i + 1}</span>
                <h3 className="font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted">{s.d}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
