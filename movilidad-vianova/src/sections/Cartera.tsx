import { useMemo, useState } from "react";
import { TrendingUp, ArrowRight, Info, ArrowDown, ArrowUp } from "lucide-react";
import Reveal from "../components/Reveal";
import { carteraCompare, DEFAULT_RATE_MONTHLY } from "../lib/finance";
import { formatCOP, formatPct } from "../lib/format";

export default function Cartera() {
  const [balance, setBalance] = useState(45_000_000);
  const [currentRate, setCurrentRate] = useState(0.019);
  const [remaining, setRemaining] = useState(36);

  const r = useMemo(
    () => carteraCompare({ balance, currentRate, remainingMonths: remaining }),
    [balance, currentRate, remaining]
  );
  const viaRate = DEFAULT_RATE_MONTHLY * 0.85; // tasa mensual ilustrativa de referencia
  const ahorroMensual = r.monthlyDiff > 0;
  const ahorroTotal = r.totalDiff > 0;

  return (
    <section id="cartera" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="mb-10">
        <span className="kicker text-cobre-2">Compra de cartera</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">¿Ya tienes un crédito? Compara un antes y un después</h2>
        <p className="mt-3 max-w-xl text-muted">Indica tu saldo, la <strong className="text-ink/80">tasa mensual</strong> que te cobran y el plazo que te queda. Te mostramos cómo podrían cambiar tu cuota y tu costo total, con transparencia total.</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Reveal>
          <div className="card p-6">
            <h3 className="mb-5 font-display text-lg font-bold">Tu crédito actual</h3>

            <label className="mb-1 flex justify-between text-sm"><span className="text-muted">Saldo</span><span className="font-semibold">{formatCOP(balance)}</span></label>
            <input type="range" min={5_000_000} max={120_000_000} step={1_000_000} value={balance} onChange={(e) => setBalance(+e.target.value)} className="range" aria-label="Saldo" />

            <label className="mb-1 mt-4 flex justify-between text-sm"><span className="text-muted">Tasa mensual que te cobran</span><span className="font-semibold text-cobre-2">{formatPct(currentRate, 2)}</span></label>
            <input type="range" min={0.008} max={0.03} step={0.0005} value={currentRate} onChange={(e) => setCurrentRate(+e.target.value)} className="range" aria-label="Tasa mensual actual" />
            <div className="mt-1 flex justify-between text-xs text-steel"><span>0,8%</span><span>3,0%</span></div>

            <label className="mb-1 mt-4 flex justify-between text-sm"><span className="text-muted">Plazo restante</span><span className="font-semibold">{remaining} meses</span></label>
            <input type="range" min={6} max={72} step={1} value={remaining} onChange={(e) => setRemaining(+e.target.value)} className="range" aria-label="Plazo restante" />

            <div className="mt-5 rounded-xl border border-line bg-panel/50 p-3">
              <div className="flex items-center justify-between text-sm"><span className="text-muted">Cuota actual estimada</span><span className="font-display font-bold">{formatCOP(r.currentPayment)}</span></div>
              <p className="mt-1 text-xs text-steel">Derivada de tu saldo, tasa y plazo.</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-panel/40 p-6">
              <p className="chip w-fit bg-white/8 text-muted">Hoy</p>
              <p className="mt-3 text-xs text-muted">Cuota actual estimada</p>
              <p className="font-display text-3xl font-extrabold">{formatCOP(r.currentPayment)}<span className="text-sm font-normal text-muted">/mes</span></p>
              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted">Tu tasa mensual</span><span className="font-medium">{formatPct(currentRate, 2)}</span></div>
                <div className="flex justify-between"><span className="text-muted">Plazo restante</span><span className="font-medium">{remaining} meses</span></div>
                <div className="flex justify-between"><span className="text-muted">Pagarías en total</span><span className="font-medium">{formatCOP(r.currentTotal)}</span></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-2xl border border-cobre/30 bg-cobre-soft p-6">
              <p className="chip w-fit bg-cobre text-graphite">Con VíaNova</p>
              <p className="mt-3 text-xs text-muted">Nueva cuota estimada</p>
              <p className="font-display text-3xl font-extrabold text-cobre-2">{formatCOP(r.newPayment)}<span className="text-sm font-normal text-muted">/mes</span></p>
              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted">Tasa ref. VíaNova</span><span className="font-medium">{formatPct(viaRate, 2)}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted">Diferencia mensual</span><span className={`flex items-center gap-1 font-semibold ${ahorroMensual ? "text-mint" : "text-[#f87171]"}`}>{ahorroMensual ? <ArrowDown size={13} /> : <ArrowUp size={13} />} {formatCOP(Math.abs(r.monthlyDiff))}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted">Diferencia total</span><span className={`flex items-center gap-1 font-semibold ${ahorroTotal ? "text-mint" : "text-[#f87171]"}`}>{ahorroTotal ? "Ahorras" : "Cuesta más"} {formatCOP(Math.abs(r.totalDiff))}</span></div>
              </div>
              <a href="#solicitud" className="btn btn-cobre btn-sm mt-auto pt-0"><TrendingUp size={15} /> Evaluar mi crédito <ArrowRight size={14} /></a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-6">
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-panel/40 p-4 text-sm text-muted">
          <Info size={20} className="mt-0.5 shrink-0 text-cobre" />
          <p><strong className="text-ink">Ojo:</strong> reducir la cuota suele <strong>ampliar el plazo</strong>, y ampliar el plazo puede <strong>aumentar el costo total</strong> aunque pagues menos cada mes. Todos los valores son ilustrativos y no representan una aprobación.</p>
        </div>
      </Reveal>
    </section>
  );
}
