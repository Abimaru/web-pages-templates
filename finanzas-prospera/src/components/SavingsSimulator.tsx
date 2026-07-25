import { useMemo, useState } from "react";
import { PiggyBank, TrendingUp, Sparkles } from "lucide-react";
import { savingsTerms, computeSavings, savingsSeries, formatCOP } from "../lib/finance";

const W = 340;
const H = 170;
const PAD = 14;

export default function SavingsSimulator() {
  const [amount, setAmount] = useState(3_000_000);
  const [termIdx, setTermIdx] = useState(4); // 360 días

  const term = savingsTerms[termIdx];
  const { final, interest } = computeSavings(amount, term.days, term.ea);

  const { linePath, areaPath, endPt } = useMemo(() => {
    const series = savingsSeries(amount, term.days, term.ea, 24);
    const min = series[0].value;
    const max = series[series.length - 1].value;
    const range = Math.max(max - min, 1);
    const pts = series.map((p, i) => {
      const x = PAD + (i / (series.length - 1)) * (W - PAD * 2);
      const y = H - PAD - ((p.value - min) / range) * (H - PAD * 2);
      return [x, y] as const;
    });
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - PAD} L${pts[0][0].toFixed(1)},${H - PAD} Z`;
    return { linePath: line, areaPath: area, endPt: pts[pts.length - 1] };
  }, [amount, term]);

  const chartKey = `${amount}-${term.days}`;

  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft-green text-forest"><PiggyBank size={22} /></span>
        <div>
          <h3 className="font-display text-xl font-bold">Cuenta Progreso</h3>
          <p className="text-sm text-slate">Deja tu dinero y míralo crecer</p>
        </div>
      </div>

      {/* Monto */}
      <label className="mb-1 flex items-center justify-between text-sm font-medium">
        <span className="text-slate">Monto a invertir</span>
        <span className="font-display text-lg font-bold text-forest">{formatCOP(amount)}</span>
      </label>
      <input type="range" min={500_000} max={100_000_000} step={500_000} value={amount} onChange={(e) => setAmount(+e.target.value)} className="range" />
      <div className="mt-1 flex justify-between text-xs text-slate/60"><span>$500 mil</span><span>$100 millones</span></div>

      {/* Plazo */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-slate">Plazo (días) · tasa E.A.</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {savingsTerms.map((t, i) => (
            <button key={t.days} onClick={() => setTermIdx(i)} className={`rounded-lg border px-2 py-2 text-center transition ${termIdx === i ? "border-forest bg-forest text-white" : "border-mist text-slate hover:border-forest/50"}`}>
              <span className="block text-sm font-bold">{t.days}</span>
              <span className={`block text-[10px] ${termIdx === i ? "text-white/80" : "text-slate/60"}`}>{(t.ea * 100).toFixed(2)}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-forest to-navy p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-white/70"><TrendingUp size={15} /> Crecimiento estimado</span>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-gold-light">{(term.ea * 100).toFixed(2)}% E.A.</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" preserveAspectRatio="none" key={chartKey}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16c98a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#16c98a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#areaGrad)" />
          <path d={linePath} fill="none" stroke="#16c98a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={1000} strokeDashoffset={1000} style={{ animation: "draw 1.4s ease-out forwards" }} />
          <circle cx={endPt[0]} cy={endPt[1]} r={5} fill="#e4c777" stroke="#fff" strokeWidth={2} />
        </svg>
        <div className="mt-3 grid grid-cols-2 gap-4 border-t border-white/15 pt-4">
          <div>
            <p className="text-xs text-white/60">Recibes al final</p>
            <p className="font-display text-2xl font-extrabold">{formatCOP(final)}</p>
          </div>
          <div>
            <p className="text-xs text-white/60">Ganancia</p>
            <p className="font-display text-2xl font-extrabold text-gold-light">+{formatCOP(interest)}</p>
          </div>
        </div>
      </div>

      <button onClick={() => alert("Prototipo de demostración: la apertura de cuenta no es real.")} className="btn-primary mt-5 w-full justify-center">
        <Sparkles size={16} /> Abrir mi Cuenta Progreso
      </button>
    </div>
  );
}
