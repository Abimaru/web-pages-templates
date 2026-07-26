import { ShieldCheck, Check, Star, Info } from "lucide-react";
import Reveal from "../components/Reveal";
import { insurancePlans } from "../data/insurance";
import { formatCOP } from "../lib/format";

export default function Insurance() {
  return (
    <section id="seguros" className="border-y border-line bg-night/40 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10 text-center">
          <span className="kicker text-cobre-2">Protección integrada</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Protege lo que te mueve</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">Compara planes y elige la cobertura que necesitas. Se integran a tu simulación y a tu solicitud.</p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {insurancePlans.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <div className={`relative flex h-full flex-col rounded-2xl border p-6 ${p.featured ? "border-cobre bg-cobre-soft" : "border-line bg-panel/40"}`}>
                {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 chip bg-cobre text-graphite"><Star size={11} /> Más elegido</span>}
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${p.featured ? "bg-cobre text-graphite" : "bg-cyan-soft text-cyan"}`}><ShieldCheck size={24} /></span>
                <h3 className="mt-4 font-display text-xl font-bold">Plan {p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                <p className="mt-4 font-display text-2xl font-extrabold">{formatCOP(p.monthlyFrom)}<span className="text-sm font-normal text-muted">/mes</span></p>
                <ul className="mt-4 flex-1 space-y-2">
                  {p.coverage.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-ink/80"><Check size={15} className="mt-0.5 shrink-0 text-mint" /> {c}</li>
                  ))}
                </ul>
                <p className="mt-4 rounded-lg bg-white/5 px-3 py-2 text-xs text-muted">Ideal para: <span className="text-ink">{p.recommendedFor}</span></p>
                <a href="#solicitud" className={`btn btn-sm mt-4 w-full ${p.featured ? "btn-cobre" : "btn-ghost"}`}>Elegir este plan</a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="flex items-center justify-center gap-2 text-center text-xs text-steel"><Info size={13} /> Planes y coberturas demostrativos. No representan pólizas reales ni aseguradoras; sin logos de terceros.</p>
        </Reveal>
      </div>
    </section>
  );
}
