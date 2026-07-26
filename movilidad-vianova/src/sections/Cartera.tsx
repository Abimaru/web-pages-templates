import { useMemo, useState } from "react";
import { TrendingUp, ArrowRight, Info, ArrowDown, ArrowUp } from "lucide-react";
import Reveal from "../components/Reveal";
import { carteraCompare } from "../lib/finance";
import { formatCOP } from "../lib/format";

export default function Cartera() {
  const [balance, setBalance] = useState(45_000_000);
  const [payment, setPayment] = useState(1_950_000);
  const [remaining, setRemaining] = useState(36);

  const r = useMemo(() => carteraCompare({ balance, currentPayment: payment, remainingMonths: remaining }), [balance, payment, remaining]);
  const ahorroMensual = r.monthlyDiff > 0;
  const ahorroTotal = r.totalDiff > 0;

  return (
    <section id="cartera" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="mb-10">
        <span className="kicker text-cobre-2">Compra de cartera</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">¿Ya tienes un crédito? Compara un antes y un después</h2>
        <p className="mt-3 max-w-xl text-muted">Simula cómo podrían cambiar tu cuota y tu costo total. Con transparencia total sobre las implicaciones.</p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Reveal>
          <div className="card p-6">
            <h3 className="mb-5 font-display text-lg font-bold">Tu crédito actual</h3>
            <label className="mb-1 flex justify-between text-sm"><span className="text-muted">Saldo</span><span className="font-semibold">{formatCOP(balance)}</span></label>
            <input type="range" min={5_000_000} max={120_000_000} step={1_000_000} value={balance} onChange={(e) => setBalance(+e.target.value)} className="range" />
            <label className="mb-1 mt-4 flex justify-between text-sm"><span className="text-muted">Cuota actual</span><span className="font-semibold">{formatCOP(payment)}</span></label>
            <input type="range" min={300_000} max={6_000_000} step={50_000} value={payment} onChange={(e) => setPayment(+e.target.value)} className="range" />
            <label className="mb-1 mt-4 flex justify-between text-sm"><span className="text-muted">Plazo restante</span><span className="font-semibold">{remaining} meses</span></label>
            <input type="range" min={6} max={72} step={1} value={remaining} onChange={(e) => setRemaining(+e.target.value)} className="range" />
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-panel/40 p-6">
              <p className="chip w-fit bg-white/8 text-muted">Hoy</p>
              <p className="mt-3 text-xs text-muted">Cuota actual</p>
              <p className="font-display text-3xl font-extrabold">{formatCOP(payment)}<span className="text-sm font-normal text-muted">/mes</span></p>
              <div className="mt-4 space-y-1.5 text-sm">
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
