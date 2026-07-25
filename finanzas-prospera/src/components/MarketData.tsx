import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Lightbulb, ChevronRight } from "lucide-react";
import { markets, tips } from "../data/market";
import Reveal from "./Reveal";

function Spark({ data, up }: { data: number[]; up: boolean }) {
  const w = 100, h = 34;
  const min = Math.min(...data), max = Math.max(...data);
  const range = Math.max(max - min, 1);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const color = up ? "#16c98a" : "#e0567a";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-9 w-24" preserveAspectRatio="none">
      <path d={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MarketData() {
  const cards = markets.slice(0, 4);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTip((t) => (t + 1) % tips.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="kicker text-forest">Datos de interés</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">El mercado, de un vistazo</h2>
        </div>
        <span className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-slate">Valores ilustrativos · actualizado hoy</span>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        {/* Tarjetas de mercado */}
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((m, i) => {
            const up = m.change >= 0;
            return (
              <Reveal key={m.symbol} delay={i * 70}>
                <div className="card flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate/60">{m.symbol}</p>
                    <p className="font-display text-base font-bold">{m.name}</p>
                    <p className="mt-1 font-display text-2xl font-extrabold">{m.value}</p>
                    <p className={`mt-0.5 flex items-center gap-1 text-sm font-semibold ${up ? "text-green" : "text-rose-500"}`}>
                      {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {up ? "+" : ""}{m.change.toFixed(2)}%
                    </p>
                  </div>
                  <Spark data={m.spark} up={up} />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Tip financiero rotativo */}
        <Reveal delay={120}>
          <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-forest to-navy p-7 text-white">
            <div className="flex items-center gap-2 text-gold-light">
              <Lightbulb size={20} /> <span className="kicker">Tip financiero</span>
            </div>
            <p key={tip} className="my-6 font-display text-xl font-semibold leading-snug" style={{ animation: "float 0.5s ease" }}>
              {tips[tip]}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {tips.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i === tip ? "w-5 bg-gold-light" : "w-1.5 bg-white/30"}`} />
                ))}
              </div>
              <button onClick={() => setTip((t) => (t + 1) % tips.length)} className="flex items-center gap-1 text-sm text-white/80 transition hover:text-white" aria-label="Siguiente tip">
                Siguiente <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
