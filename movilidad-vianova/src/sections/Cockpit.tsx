import { useEffect, useMemo, useState } from "react";
import { Calculator, TrendingDown, Scale, Zap, Info, ArrowRight, ShieldCheck, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import EffortMeter from "../components/EffortMeter";
import { vehicles, getVehicle } from "../data/vehicles";
import { scenarios, effortLevel, DEFAULT_RATE_MONTHLY, monthlyToEA, type ScenarioKey } from "../lib/finance";
import { formatCOP } from "../lib/format";
import { useVehicles } from "../store/vehiclesStore";

const iconFor: Record<ScenarioKey, typeof TrendingDown> = {
  baja: TrendingDown,
  equilibrado: Scale,
  rapido: Zap,
};
const noteFor: Record<ScenarioKey, string> = {
  baja: "Cuota más cómoda hoy, pero pagas más intereses en total.",
  equilibrado: "El punto medio recomendado entre cuota y costo total.",
  rapido: "Te liberas antes y pagas menos intereses, con cuota más alta.",
};
const defaultId = vehicles.find((v) => v.featured)!.id;

export default function Cockpit() {
  const { simulateId } = useVehicles();
  const [vid, setVid] = useState(simulateId ?? defaultId);
  const [downPct, setDownPct] = useState(0.2);
  const [income, setIncome] = useState(4_500_000);

  useEffect(() => { if (simulateId) setVid(simulateId); }, [simulateId]);

  const vehicle = getVehicle(vid)!;
  const value = vehicle.price;
  const down = Math.round(value * downPct);

  const scen = useMemo(() => scenarios(value, down, income), [value, down, income]);
  const recommended = scen.find((s) => s.key === "equilibrado")!;
  const eff = effortLevel(recommended.cuota, income);

  return (
    <section id="cockpit" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="mb-10">
        <span className="kicker text-cobre-2">Simulador · Cockpit financiero</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Compara escenarios, no solo cuotas</h2>
        <p className="mt-3 max-w-xl text-muted">Ajusta el vehículo, tu cuota inicial y tus ingresos. Te mostramos tres caminos para que elijas el que mejor se ajusta a ti.</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Controles */}
        <Reveal>
          <div className="card p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-cobre-soft text-cobre"><Calculator size={22} /></span>
              <div><h3 className="font-display text-lg font-bold">Tu simulación</h3><p className="text-sm text-muted">Valores ilustrativos</p></div>
            </div>

            <label className="mb-1 block text-sm font-medium text-muted">Vehículo</label>
            <select value={vid} onChange={(e) => setVid(e.target.value)} className="field mb-4">
              {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name} — {formatCOP(v.price)}</option>)}
            </select>

            <div className="mb-4 rounded-xl border border-line bg-panel/50 p-3">
              <div className="flex items-center justify-between text-sm"><span className="text-muted">Valor</span><span className="font-display font-bold">{formatCOP(value)}</span></div>
            </div>

            <label className="mb-1 flex items-center justify-between text-sm"><span className="text-muted">Cuota inicial</span><span className="font-semibold text-cobre-2">{formatCOP(down)} · {(downPct * 100).toFixed(0)}%</span></label>
            <input type="range" min={0} max={0.6} step={0.05} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className="range" />
            <div className="mt-1 mb-4 flex justify-between text-xs text-steel"><span>0%</span><span>60%</span></div>

            <label className="mb-1 flex items-center justify-between text-sm"><span className="text-muted">Ingresos mensuales</span><span className="font-semibold">{formatCOP(income)}</span></label>
            <input type="range" min={1_500_000} max={30_000_000} step={100_000} value={income} onChange={(e) => setIncome(+e.target.value)} className="range" />
            <div className="mt-1 flex justify-between text-xs text-steel"><span>$1,5M</span><span>$30M</span></div>

            <div className="mt-5 border-t border-line pt-4">
              <EffortMeter ratio={eff.ratio} level={eff.level} />
              <p className="mt-2 text-xs text-muted">Sobre la cuota del plan equilibrado. Orientación, no una decisión crediticia.</p>
            </div>
          </div>
        </Reveal>

        {/* Escenarios */}
        <div className="grid gap-4 sm:grid-cols-3">
          {scen.map((s, i) => {
            const Icon = iconFor[s.key];
            const rec = s.key === "equilibrado";
            const e = effortLevel(s.cuota, income);
            return (
              <Reveal key={s.key} delay={i * 80}>
                <div className={`relative flex h-full flex-col rounded-2xl border p-5 ${rec ? "border-cobre bg-cobre-soft" : "border-line bg-panel/40"}`}>
                  {rec && <span className="absolute -top-3 left-1/2 -translate-x-1/2 chip bg-cobre text-graphite">Recomendado</span>}
                  <div className="flex items-center gap-2 text-cobre-2"><Icon size={18} /><span className="font-display text-sm font-semibold">{s.label}</span></div>
                  <p className="mt-4 text-xs text-muted">Cuota mensual</p>
                  <p className="font-display text-2xl font-extrabold leading-tight">{formatCOP(s.cuota)}</p>
                  <div className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-muted">Plazo</span><span className="font-medium">{s.months} meses</span></div>
                    <div className="flex justify-between"><span className="text-muted">Intereses</span><span className="font-medium">{formatCOP(s.interest)}</span></div>
                    <div className="flex justify-between"><span className="text-muted">Costo total</span><span className="font-medium">{formatCOP(s.total)}</span></div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs"><span className="text-muted">Esfuerzo</span><span style={{ color: e.level === "comodo" ? "#34d399" : e.level === "moderado" ? "#f4a24d" : e.level === "alto" ? "#f87171" : "#6f7d95" }}>{e.level === "sin-dato" ? "—" : `${(e.ratio * 100).toFixed(0)}%`}</span></div>
                  </div>
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-ink/65">{noteFor[s.key]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Advertencia + CTA */}
      <Reveal className="mt-6">
        <div className="flex items-start gap-3 rounded-2xl border border-cobre/25 bg-cobre-soft p-4 text-sm text-ink/80">
          <Info size={20} className="mt-0.5 shrink-0 text-cobre" />
          <p><strong className="text-ink">Esta simulación es ilustrativa</strong> y no representa una aprobación ni una oferta financiera. Las condiciones finales dependen del análisis de cada solicitud. Tasa de referencia {(monthlyToEA(DEFAULT_RATE_MONTHLY) * 100).toFixed(1)}% E.A. aprox.</p>
        </div>
      </Reveal>

      <Reveal className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href="#solicitud" className="btn btn-cobre flex-1 sm:flex-none"><Check size={17} /> Solicitar esta financiación <ArrowRight size={15} /></a>
        <a href="#seguros" className="btn btn-ghost flex-1 sm:flex-none"><ShieldCheck size={16} /> Proteger mi vehículo</a>
      </Reveal>
    </section>
  );
}
