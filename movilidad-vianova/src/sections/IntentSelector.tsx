import { useState } from "react";
import { ArrowRight, Compass } from "lucide-react";
import Reveal from "../components/Reveal";
import { intents, routes } from "../data/intents";

export default function IntentSelector() {
  const [selected, setSelected] = useState<string>("comprar");
  const active = intents.find((i) => i.id === selected)!;
  const route = routes.find((r) => r.id === active.route)!;

  const go = () => {
    const el = document.getElementById(active.target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="intencion" className="relative border-y border-line bg-night/40 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10 text-center">
          <span className="kicker text-cobre-2">Tu ruta empieza aquí</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">¿Qué quieres hacer hoy?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">Elige tu objetivo y te llevamos por el camino correcto. Puedes cambiarlo cuando quieras.</p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {intents.map((it, i) => {
            const on = selected === it.id;
            return (
              <Reveal key={it.id} delay={(i % 3) * 70}>
                <button
                  onClick={() => setSelected(it.id)}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    on ? "border-cobre bg-cobre-soft shadow-[0_0_0_1px_rgba(232,135,58,.3)]" : "border-line bg-panel/40 hover:border-line-2"
                  }`}
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition ${on ? "bg-cobre text-graphite" : "bg-white/5 text-cobre-2"}`}>
                    <it.icon size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-ink">{it.label}</span>
                    <span className="block text-sm text-muted">{it.sub}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Panel de orientación (aria-live para lectores de pantalla) */}
        <Reveal className="mt-6">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-gradient-to-br from-panel to-night p-6 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-soft text-cyan"><Compass size={22} /></span>
              <div>
                <p className="chip bg-cyan-soft text-cyan">Ruta: {route.label}</p>
                <p className="mt-2 max-w-xl text-ink/85">{active.guidance}</p>
              </div>
            </div>
            <button onClick={go} className="btn btn-cobre shrink-0 whitespace-nowrap">
              {active.cta} <ArrowRight size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
