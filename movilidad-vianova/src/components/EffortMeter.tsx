import type { EffortLevel } from "../lib/finance";

const meta: Record<EffortLevel, { label: string; color: string }> = {
  comodo: { label: "Cómodo", color: "#34d399" },
  moderado: { label: "Moderado", color: "#f4a24d" },
  alto: { label: "Alto", color: "#f87171" },
  "sin-dato": { label: "Sin dato", color: "#6f7d95" },
};

export default function EffortMeter({ ratio, level }: { ratio: number; level: EffortLevel }) {
  const m = meta[level];
  const pct = Math.min(Math.max(ratio, 0), 0.7) / 0.7 * 100; // escala 0–70%
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Esfuerzo mensual</span>
        <span className="chip" style={{ background: m.color + "22", color: m.color }}>{m.label}{level !== "sin-dato" ? ` · ${(ratio * 100).toFixed(0)}%` : ""}</span>
      </div>
      <div className="relative mt-2 h-2.5 overflow-hidden rounded-full" style={{ background: "linear-gradient(90deg,#34d39955,#f4a24d55 55%,#f8717155)" }}>
        {level !== "sin-dato" && (
          <span className="absolute top-1/2 h-4 w-1.5 -translate-y-1/2 rounded-full bg-white shadow" style={{ left: `calc(${pct}% - 3px)` }} />
        )}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-steel"><span>Cómodo</span><span>Moderado</span><span>Alto</span></div>
    </div>
  );
}
