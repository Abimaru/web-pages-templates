import { Car, Calculator, Tag, Sparkles, TrendingUp, Gauge } from "lucide-react";
import Reveal from "../components/Reveal";
import { vehicles } from "../data/vehicles";
import { estimateMonthly } from "../lib/finance";
import { formatCOPShort } from "../lib/format";

const cheapest = Math.min(...vehicles.map((v) => v.price));
const cuotaDesde = estimateMonthly(cheapest);

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-glow pt-28 lg:pt-36">
      <div className="bg-grid absolute inset-0 opacity-60" />
      {/* Motivo de ruta */}
      <svg className="pointer-events-none absolute inset-x-0 top-24 h-40 w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1200 160">
        <path className="route-line" d="M-50 130 C 250 60, 450 150, 700 90 S 1050 40, 1260 110" fill="none" stroke="#22d3ee" strokeWidth="2" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <span className="kicker inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan-soft px-3.5 py-1.5 text-cyan">
            <Sparkles size={13} /> Experiencia digital de movilidad
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            Todo lo que necesitas para <span className="text-gradient">avanzar sobre ruedas</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Encuentra tu próximo vehículo, compara opciones, simula tu financiación, mejora
            tu crédito actual y protege lo que te mueve. Todo en una sola ruta.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#marketplace" className="btn btn-cobre"><Car size={18} /> Explorar vehículos</a>
            <a href="#cockpit" className="btn btn-ghost"><Calculator size={16} /> Simular mi crédito</a>
            <a href="#venta" className="btn btn-ghost"><Tag size={16} /> Quiero vender</a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-mint" /> Experiencia digital simulada</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cobre" /> Nuevos y usados</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-electric" /> Simulación en tiempo real</span>
          </div>
        </Reveal>

        {/* Visual: vehículo + panel financiero */}
        <Reveal delay={150} className="relative">
          <div className="overflow-hidden rounded-[2rem] rounded-tr-[5rem] border border-line">
            <img
              src={`${import.meta.env.BASE_URL}img/1552519507-da3b142c6e3d.jpg`}
              alt="Vehículo deportivo en carretera"
              className="h-[360px] w-full object-cover sm:h-[440px]"
              loading="eager"
            />
          </div>
          {/* Panel de cuota */}
          <div className="animate-float absolute -left-4 bottom-8 w-56 rounded-2xl border border-line bg-panel/95 p-4 backdrop-blur">
            <p className="flex items-center gap-1.5 text-xs text-muted"><Gauge size={13} className="text-cobre" /> Cuota estimada desde</p>
            <p className="font-display text-2xl font-bold text-ink">{formatCOPShort(cuotaDesde)}<span className="text-sm font-normal text-muted">/mes</span></p>
            <div className="mt-2 flex items-center gap-1 text-xs text-mint"><TrendingUp size={13} /> Simulación ilustrativa</div>
          </div>
          {/* Sello */}
          <div className="absolute -right-3 top-6 hidden rounded-2xl border border-cyan/30 bg-night/90 px-4 py-3 backdrop-blur md:block">
            <p className="font-display text-lg font-bold text-cyan">VíaNova</p>
            <p className="text-xs text-muted">Tu movilidad, en una sola ruta</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
