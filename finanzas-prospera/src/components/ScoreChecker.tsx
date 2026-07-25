import { useEffect, useRef, useState } from "react";
import { Gauge, ShieldCheck, RefreshCw } from "lucide-react";

const MIN = 300;
const MAX = 850;
const ARC_LEN = Math.PI * 90; // semicírculo r=90

function category(score: number) {
  if (score >= 740) return { label: "Excelente", color: "#0a6b4a" };
  if (score >= 670) return { label: "Bueno", color: "#10a86e" };
  if (score >= 580) return { label: "Regular", color: "#c99a3f" };
  return { label: "En construcción", color: "#e0567a" };
}

export default function ScoreChecker() {
  const [target, setTarget] = useState<number | null>(null);
  const [display, setDisplay] = useState(MIN);
  const raf = useRef<number>(0);

  const check = () => {
    // Score simulado (aleatorio realista)
    const s = 620 + Math.floor(Math.random() * 200); // 620–819
    setTarget(s);
  };

  useEffect(() => {
    if (target == null) return;
    const start = performance.now();
    const from = MIN;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);

  const fraction = (display - MIN) / (MAX - MIN);
  const cat = category(display);
  const shown = target != null;

  return (
    <div className="card p-6 text-center sm:p-8">
      <div className="mb-2 flex items-center justify-center gap-2">
        <Gauge size={20} className="text-forest" />
        <h3 className="font-display text-xl font-bold">Tu score crediticio</h3>
      </div>
      <p className="text-sm text-slate">Consúltalo gratis, sin afectar tu historial.</p>

      <div className="relative mx-auto mt-6 w-[220px]">
        <svg viewBox="0 0 220 130">
          {/* fondo */}
          <path d="M20,110 A90,90 0 0 1 200,110" fill="none" stroke="#e8f1ec" strokeWidth={16} strokeLinecap="round" />
          {/* progreso */}
          <path
            d="M20,110 A90,90 0 0 1 200,110"
            fill="none"
            stroke={cat.color}
            strokeWidth={16}
            strokeLinecap="round"
            strokeDasharray={ARC_LEN}
            strokeDashoffset={ARC_LEN * (1 - (shown ? fraction : 0))}
            style={{ transition: "stroke-dashoffset .1s linear, stroke .4s ease" }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-1 text-center">
          <p className="font-display text-4xl font-extrabold" style={{ color: shown ? cat.color : "#cbd5cf" }}>
            {shown ? display : "—"}
          </p>
          {shown && <p className="text-sm font-semibold" style={{ color: cat.color }}>{cat.label}</p>}
        </div>
      </div>

      {!shown ? (
        <button onClick={check} className="btn-primary mt-4 w-full justify-center">
          <ShieldCheck size={16} /> Consultar mi score gratis
        </button>
      ) : (
        <>
          <p className="mt-4 text-sm text-slate">
            Con este score podrías acceder a créditos <strong className="text-forest">preaprobados</strong>.
          </p>
          <button onClick={check} className="btn-ghost mt-3 w-full justify-center">
            <RefreshCw size={15} /> Simular otro score
          </button>
        </>
      )}
      <p className="mt-3 text-xs text-slate/60">Valor simulado con fines de demostración.</p>
    </div>
  );
}
