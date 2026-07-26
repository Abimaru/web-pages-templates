import { Car, Calculator, Route } from "lucide-react";
import Reveal from "../components/Reveal";

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cobre/30 bg-gradient-to-br from-panel to-night px-6 py-14 text-center sm:px-16">
          <svg className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 opacity-30" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path className="route-line" d="M-40 90 C 300 20, 500 110, 760 60 S 1100 30, 1260 80" fill="none" stroke="#e8873a" strokeWidth="2" />
          </svg>
          <div className="relative">
            <span className="kicker text-cobre-2">Da el primer paso</span>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl">Tu próxima ruta puede empezar hoy.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">Explora vehículos, compara escenarios y descubre cómo se siente una experiencia digital de movilidad hecha a tu medida.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#marketplace" className="btn btn-cobre"><Car size={18} /> Explorar vehículos</a>
              <a href="#cockpit" className="btn btn-ghost"><Calculator size={16} /> Simular financiación</a>
              <a href="#intencion" className="btn btn-ghost"><Route size={16} /> Iniciar mi ruta</a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
