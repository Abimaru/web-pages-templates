import { useState } from "react";
import { Banknote, CalendarClock, ArrowRight, CheckCircle2 } from "lucide-react";
import LeadCta from "./LeadCta";
import { buildCreditMessage } from "../lib/request";
import { computeCredit, creditEA, formatCOP, CREDIT_MONTHLY_RATE } from "../lib/finance";

const terms = [6, 12, 18, 24, 36, 48];

export default function CreditSimulator() {
  const [amount, setAmount] = useState(5_000_000);
  const [months, setMonths] = useState(24);

  const { cuota, total, interest } = computeCredit(amount, months);

  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft-green text-forest"><Banknote size={22} /></span>
        <div>
          <h3 className="font-display text-xl font-bold">Simula tu crédito</h3>
          <p className="text-sm text-slate">Cuota fija, sin sorpresas</p>
        </div>
      </div>

      {/* Monto */}
      <label className="mb-1 flex items-center justify-between text-sm font-medium">
        <span className="text-slate">Monto</span>
        <span className="font-display text-lg font-bold text-forest">{formatCOP(amount)}</span>
      </label>
      <input type="range" aria-label="Monto del crédito" aria-valuetext={formatCOP(amount)} min={500_000} max={50_000_000} step={500_000} value={amount} onChange={(e) => setAmount(+e.target.value)} className="range" />
      <div className="mt-1 flex justify-between text-xs text-slate/60"><span>$500 mil</span><span>$50 millones</span></div>

      {/* Plazo */}
      <div className="mt-6">
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-slate"><CalendarClock size={15} /> Plazo (meses)</p>
        <div className="flex flex-wrap gap-2">
          {terms.map((t) => (
            <button key={t} onClick={() => setMonths(t)} aria-pressed={months === t} aria-label={`${t} meses`} className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${months === t ? "border-forest bg-forest text-white" : "border-mist text-slate hover:border-forest/50"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Resultado */}
      <div className="mt-7 rounded-2xl bg-forest p-6 text-white" aria-live="polite">
        <p className="text-sm text-white/70">Tu cuota mensual estimada</p>
        <p className="mt-1 font-display text-4xl font-extrabold">{formatCOP(cuota)}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/15 pt-4 text-sm">
          <div><p className="text-white/60">Total a pagar</p><p className="font-semibold">{formatCOP(total)}</p></div>
          <div><p className="text-white/60">Intereses</p><p className="font-semibold">{formatCOP(interest)}</p></div>
          <div><p className="text-white/60">Tasa</p><p className="font-semibold">{(CREDIT_MONTHLY_RATE * 100).toFixed(1)}% M.V.</p></div>
          <div><p className="text-white/60">E.A. aprox.</p><p className="font-semibold">{(creditEA * 100).toFixed(1)}%</p></div>
        </div>
      </div>

      <LeadCta
        className="btn-gold"
        label={<>Solicitar este crédito <ArrowRight size={16} /></>}
        build={(name) => buildCreditMessage(amount, months, name)}
      />
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate/70">
        <CheckCircle2 size={13} className="shrink-0 text-green" /> Valores ilustrativos: no incluyen seguros ni otros costos y están sujetos a estudio.
      </p>
    </div>
  );
}
