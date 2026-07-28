import { useMemo, useState } from "react";
import { Wallet, Car, ShieldCheck, Info, ArrowRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import EffortMeter from "../components/EffortMeter";
import {
  financedAmount,
  amortization,
  effortLevel,
  DEFAULT_RATE_MONTHLY,
  monthlyToEA,
} from "../lib/finance";
import { insurancePlans, suggestPlanId } from "../data/insurance";
import type { VehicleType, Condition } from "../data/vehicles";
import { formatCOP, formatCOPShort } from "../lib/format";

const TYPES: VehicleType[] = ["SUV", "Sedán", "Pickup", "Compacto", "Híbrido", "Eléctrico"];
const TERMS = [12, 36, 60, 84];
const PRESETS = [60_000_000, 100_000_000, 150_000_000, 200_000_000];
// Tasa mensual ilustrativa: los usados suelen tener una tasa un poco mayor.
const rateFor = (condition: Condition) => (condition === "Usado" ? 0.015 : DEFAULT_RATE_MONTHLY);

export default function FreeCredit() {
  const [value, setValue] = useState(90_000_000);
  const [type, setType] = useState<VehicleType>("SUV");
  const [condition, setCondition] = useState<Condition>("Nuevo");
  const [downPct, setDownPct] = useState(0.2);
  const [months, setMonths] = useState(60);
  const [income, setIncome] = useState(4_500_000);

  const rate = rateFor(condition);
  const down = Math.round(value * downPct);
  const principal = financedAmount(value, down);

  const credit = useMemo(() => amortization(principal, months, rate), [principal, months, rate]);
  const eff = effortLevel(credit.cuota, income);
  const plan = useMemo(() => {
    const id = suggestPlanId(value, condition);
    return insurancePlans.find((p) => p.id === id) ?? insurancePlans[1];
  }, [value, condition]);

  // Botón "continuar" NO enlaza a un canal real: VíaNova es un prototipo y no vende
  // vehículos ni tramita créditos. Al pulsar muestra un aviso demostrativo.
  const [demoNote, setDemoNote] = useState(false);

  return (
    <section id="credito-libre" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="mb-10">
        <span className="kicker text-cobre-2">Crédito a tu medida</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          ¿Ya tienes un vehículo en mente? Financia por monto
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          No necesitas elegir uno de la lista: indica cuánto cuesta el vehículo que quieres, de qué
          tipo es, cuánto darías de inicial y en cuánto tiempo lo pagarías. Te mostramos tu cuota y
          el seguro sugerido.
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Controles */}
        <Reveal>
          <div className="card p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-cobre-soft text-cobre">
                <Wallet size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">Tu crédito</h3>
                <p className="text-sm text-muted">Valores ilustrativos</p>
              </div>
            </div>

            {/* Monto */}
            <label htmlFor="fc-monto" className="mb-1 block text-sm font-medium text-muted">
              Valor del vehículo
            </label>
            <div className="flex items-center gap-2">
              <span className="text-muted">$</span>
              <input
                id="fc-monto"
                type="number"
                min={20_000_000}
                max={400_000_000}
                step={1_000_000}
                value={value}
                onChange={(e) => setValue(Math.max(0, +e.target.value))}
                className="field"
                inputMode="numeric"
              />
            </div>
            <input
              type="range"
              min={20_000_000}
              max={400_000_000}
              step={1_000_000}
              value={Math.min(value, 400_000_000)}
              onChange={(e) => setValue(+e.target.value)}
              className="range mt-3"
              aria-label="Valor del vehículo"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setValue(p)}
                  className={`chip btn-sm ${value === p ? "bg-cobre text-graphite" : "border border-line-2 text-muted"}`}
                >
                  {formatCOPShort(p)}
                </button>
              ))}
            </div>

            {/* Tipo + condición */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="fc-tipo" className="mb-1 block text-sm font-medium text-muted">
                  Tipo
                </label>
                <select id="fc-tipo" value={type} onChange={(e) => setType(e.target.value as VehicleType)} className="field">
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="mb-1 block text-sm font-medium text-muted">Condición</span>
                <div className="flex overflow-hidden rounded-lg border border-line-2" role="group" aria-label="Condición">
                  {(["Nuevo", "Usado"] as Condition[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCondition(c)}
                      aria-pressed={condition === c}
                      className={`flex-1 py-2 text-sm font-medium transition ${
                        condition === c ? "bg-cobre text-graphite" : "text-muted hover:text-ink"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inicial */}
            <label className="mb-1 mt-4 flex items-center justify-between text-sm">
              <span className="text-muted">Cuota inicial</span>
              <span className="font-semibold text-cobre-2">{formatCOP(down)} · {(downPct * 100).toFixed(0)}%</span>
            </label>
            <input type="range" min={0} max={0.6} step={0.05} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className="range" aria-label="Cuota inicial" />
            <div className="mt-1 flex justify-between text-xs text-steel"><span>0%</span><span>60%</span></div>

            {/* Plazo */}
            <span className="mb-1 mt-4 block text-sm font-medium text-muted">Plazo</span>
            <div className="flex gap-2">
              {TERMS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  aria-pressed={months === m}
                  className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition ${
                    months === m ? "border-cobre bg-cobre-soft text-cobre-2" : "border-line-2 text-muted hover:text-ink"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>

            {/* Ingresos */}
            <label className="mb-1 mt-4 flex items-center justify-between text-sm">
              <span className="text-muted">Ingresos mensuales</span>
              <span className="font-semibold">{formatCOP(income)}</span>
            </label>
            <input type="range" min={1_500_000} max={30_000_000} step={100_000} value={income} onChange={(e) => setIncome(+e.target.value)} className="range" aria-label="Ingresos mensuales" />
            <div className="mt-1 flex justify-between text-xs text-steel"><span>$1,5M</span><span>$30M</span></div>
          </div>
        </Reveal>

        {/* Resultado */}
        <div className="grid gap-4">
          <Reveal>
            <div className="card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip bg-panel-2 text-ink/80"><Car size={13} className="mr-1" /> {type}</span>
                <span className="chip bg-panel-2 text-ink/80">{condition}</span>
                <span className="chip bg-panel-2 text-ink/80">{months} meses</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-cobre bg-cobre-soft p-5">
                  <p className="text-xs text-muted">Cuota mensual estimada</p>
                  <p className="font-display text-3xl font-extrabold leading-tight text-cobre-2">{formatCOP(credit.cuota)}</p>
                  <p className="mt-1 text-xs text-muted">durante {months} meses</p>
                </div>
                <div className="rounded-2xl border border-line bg-panel/40 p-5">
                  <p className="text-xs text-muted">Monto a financiar</p>
                  <p className="font-display text-xl font-bold">{formatCOP(principal)}</p>
                  <p className="mt-1 text-xs text-muted">Valor {formatCOPShort(value)} − inicial {formatCOPShort(down)}</p>
                </div>
                <div className="rounded-2xl border border-line bg-panel/40 p-5">
                  <p className="text-xs text-muted">Costo total del crédito</p>
                  <p className="font-display text-xl font-bold">{formatCOP(credit.total)}</p>
                  <p className="mt-1 text-xs text-muted">Intereses {formatCOP(credit.interest)}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <EffortMeter ratio={eff.ratio} level={eff.level} />
                <p className="mt-2 text-xs text-muted">
                  Esfuerzo sobre tus ingresos. Orientación, no una decisión crediticia. Tasa de
                  referencia {(monthlyToEA(rate) * 100).toFixed(1)}% E.A. aprox. ({condition.toLowerCase()}).
                </p>
              </div>
            </div>
          </Reveal>

          {/* Seguro sugerido */}
          <Reveal>
            <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-soft text-cyan">
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-steel">Seguro sugerido</p>
                  <p className="font-display text-lg font-bold">Plan {plan.name} · desde {formatCOP(plan.monthlyFrom)}/mes</p>
                  <p className="text-sm text-muted">{plan.recommendedFor}.</p>
                </div>
              </div>
              <a href="#seguros" className="btn btn-ghost shrink-0"><ShieldCheck size={16} /> Ver seguros</a>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex items-start gap-3 rounded-2xl border border-cobre/25 bg-cobre-soft p-4 text-sm text-ink/80">
              <Info size={20} className="mt-0.5 shrink-0 text-cobre" />
              <p>
                <strong className="text-ink">Simulación ilustrativa.</strong> No representa una
                aprobación ni una oferta financiera. Los valores dependen del análisis de cada
                solicitud y del vehículo elegido.
              </p>
            </div>
          </Reveal>

          <Reveal className="flex flex-col gap-3 sm:flex-row">
            <a href="#solicitud" className="btn btn-cobre flex-1 sm:flex-none">
              <Check size={17} /> Solicitar este crédito <ArrowRight size={15} />
            </a>
            <button
              type="button"
              onClick={() => setDemoNote((v) => !v)}
              aria-expanded={demoNote}
              className="btn btn-ghost flex-1 sm:flex-none"
            >
              Continuar mi solicitud
            </button>
          </Reveal>

          {demoNote && (
            <Reveal>
              <div
                aria-live="polite"
                className="flex items-start gap-3 rounded-2xl border border-cyan/25 bg-cyan-soft p-4 text-sm text-ink/80"
              >
                <Info size={20} className="mt-0.5 shrink-0 text-cyan" />
                <p>
                  <strong className="text-ink">Función demostrativa.</strong> En una implementación
                  real, aquí conectaríamos tu solicitud con el flujo de originación y un asesor.
                  VíaNova es un prototipo de Estudio Abimaru: <strong>no vende vehículos ni tramita
                  créditos</strong>. Próximamente: seguimiento de solicitud y estados en tiempo real.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
