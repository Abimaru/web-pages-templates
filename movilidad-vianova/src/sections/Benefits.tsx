import { Layers, Search, Calculator, Route, Repeat, TrendingUp, ShieldCheck, Smartphone } from "lucide-react";
import Reveal from "../components/Reveal";

const items = [
  { icon: Layers, t: "Una sola experiencia", d: "Vehículos, crédito, venta y protección en un mismo lugar." },
  { icon: Search, t: "Búsqueda y comparación", d: "Filtra y enfrenta hasta 3 opciones con datos claros." },
  { icon: Calculator, t: "Simulación transparente", d: "Tres escenarios, no una cuota suelta." },
  { icon: Route, t: "Rutas personalizadas", d: "La experiencia se adapta a lo que quieres lograr." },
  { icon: Repeat, t: "Venta y retoma", d: "Usa tu vehículo actual como parte de pago." },
  { icon: TrendingUp, t: "Compra de cartera", d: "Compara un antes y un después con honestidad." },
  { icon: ShieldCheck, t: "Protección integrada", d: "Suma cobertura sin salir del flujo." },
  { icon: Smartphone, t: "Diseño responsive", d: "Funciona igual de bien en el celular." },
];

export default function Benefits() {
  return (
    <section className="border-y border-line bg-night/40 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-cobre-2">Por qué VíaNova</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Todo tu camino, sin fricción</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={(i % 4) * 60}>
              <div className="card card-hover h-full p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cobre-soft text-cobre-2"><it.icon size={22} /></span>
                <h3 className="mt-4 font-display text-base font-bold">{it.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
