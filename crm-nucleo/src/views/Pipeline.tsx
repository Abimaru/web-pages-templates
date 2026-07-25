import { useState, type DragEvent } from "react";
import { GripVertical, Building2 } from "lucide-react";
import { deals as seed, stages, moneyShort, money, type Deal, type Stage } from "../data/crm";

const stageColor: Record<Stage, string> = {
  Prospecto: "#94a3b8",
  Contactado: "#0ea5e9",
  Propuesta: "#8b5cf6",
  Negociación: "#f59e0b",
  Ganado: "#10b981",
};

// En dispositivos táctiles el drag-and-drop nativo no funciona y además
// bloquea el desplazamiento horizontal del tablero; ahí desactivamos draggable.
const isTouch =
  typeof window !== "undefined" &&
  (navigator.maxTouchPoints > 0 || "ontouchstart" in window);

export default function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>(seed);
  const [dragId, setDragId] = useState<number | null>(null);
  const [overStage, setOverStage] = useState<Stage | null>(null);

  const onDrop = (stage: Stage) => {
    if (dragId != null) setDeals((ds) => ds.map((d) => (d.id === dragId ? { ...d, stage } : d)));
    setDragId(null);
    setOverStage(null);
  };

  const allowDrop = (e: DragEvent, stage: Stage) => { e.preventDefault(); if (overStage !== stage) setOverStage(stage); };

  return (
    <div className="view-in">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const items = deals.filter((d) => d.stage === stage);
          const total = items.reduce((s, d) => s + d.value, 0);
          return (
            <div
              key={stage}
              onDragOver={(e) => allowDrop(e, stage)}
              onDragLeave={() => setOverStage((s) => (s === stage ? null : s))}
              onDrop={() => onDrop(stage)}
              className={`kanban-col flex w-72 shrink-0 flex-col rounded-2xl border border-line bg-canvas/60 p-3 transition ${overStage === stage ? "drag-over" : ""}`}
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: stageColor[stage] }} />
                  <h3 className="font-display text-sm font-bold text-ink">{stage}</h3>
                  <span className="rounded-full bg-line px-2 py-0.5 text-xs font-semibold text-muted">{items.length}</span>
                </div>
                <span className="text-xs font-semibold text-muted">{moneyShort(total)}</span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5">
                {items.map((d) => (
                  <div
                    key={d.id}
                    draggable={!isTouch}
                    onDragStart={() => setDragId(d.id)}
                    onDragEnd={() => { setDragId(null); setOverStage(null); }}
                    className={`kanban-card card p-3.5 shadow-sm hover:shadow-md ${dragId === d.id ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-semibold leading-snug text-ink">{d.title}</p>
                      <GripVertical size={16} className="mt-0.5 shrink-0 text-muted/50" />
                    </div>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted"><Building2 size={13} /> {d.company}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-ink">{money(d.value)}</span>
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-light text-[10px] font-bold text-brand">{d.owner[0]}</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-line py-8 text-center text-xs text-muted">Suelta aquí</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-sm text-muted">
        💡 {isTouch
          ? "Desliza horizontalmente para ver todas las etapas del negocio."
          : "Arrastra las tarjetas entre columnas para cambiar la etapa del negocio."}
      </p>
    </div>
  );
}
