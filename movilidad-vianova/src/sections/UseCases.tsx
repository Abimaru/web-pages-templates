import { Car, Repeat, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

const cases = [
  { icon: Car, t: "Primera compra", d: "Buscas tu primer vehículo y necesitas entender cuánto pagarías al mes según tu presupuesto.", href: "#perfil", cta: "Arma tu perfil" },
  { icon: Repeat, t: "Cambio de vehículo", d: "Quieres vender o retomar el actual y financiar una opción nueva, todo en un mismo flujo.", href: "#venta", cta: "Valorar mi vehículo" },
  { icon: TrendingUp, t: "Reorganización de crédito", d: "Ya tienes un crédito y quieres revisar si tu cuota podría mejorar con compra de cartera.", href: "#cartera", cta: "Comparar mi crédito" },
  { icon: ShieldCheck, t: "Protección", d: "Ya tienes vehículo y quieres comparar coberturas para viajar tranquilo.", href: "#seguros", cta: "Ver planes" },
];

export default function UseCases() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="mb-12 text-center">
        <span className="kicker text-cobre-2">Casos de uso</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">¿En cuál te reconoces?</h2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {cases.map((c, i) => (
          <Reveal key={c.t} delay={(i % 2) * 80}>
            <div className="card card-hover flex h-full items-start gap-4 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cobre-soft text-cobre-2"><c.icon size={22} /></span>
              <div>
                <h3 className="font-display text-lg font-bold">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.d}</p>
                <a href={c.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cobre-2 hover:text-cobre">{c.cta} <ArrowRight size={14} /></a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
