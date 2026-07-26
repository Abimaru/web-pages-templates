import { useState } from "react";
import { Heart, Check, Plus, GitCompare, Gauge, Fuel, Cog, Calendar } from "lucide-react";
import type { Vehicle } from "../data/vehicles";
import { estimateMonthly } from "../lib/finance";
import { formatCOP, formatCOPShort } from "../lib/format";
import { useVehicles, MAX_COMPARE } from "../store/vehiclesStore";

export default function VehicleCard({ v }: { v: Vehicle }) {
  const { openDetail, toggleCompare, isComparing, compareFull, setSimulate } = useVehicles();
  const [fav, setFav] = useState(false);
  const cuota = estimateMonthly(v.price);
  const comparing = isComparing(v.id);
  const canAdd = comparing || !compareFull;

  const simular = () => {
    setSimulate(v.id);
    document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="card card-hover flex flex-col overflow-hidden">
      <div className="relative">
        <button onClick={() => openDetail(v.id)} className="block w-full" aria-label={`Ver detalle de ${v.name}`}>
          <img src={v.image} alt={`${v.brand} ${v.name}`} className="h-48 w-full object-cover" loading="lazy" />
        </button>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-1.5">
            {v.tags.slice(0, 2).map((t) => (
              <span key={t} className="chip bg-graphite/80 text-cobre-2 backdrop-blur">{t}</span>
            ))}
          </div>
          <button
            onClick={() => setFav((f) => !f)}
            className={`pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-graphite/80 backdrop-blur transition ${fav ? "text-cobre" : "text-ink/70 hover:text-cobre"}`}
            aria-label="Favorito" aria-pressed={fav}
          >
            <Heart size={17} fill={fav ? "currentColor" : "none"} />
          </button>
        </div>
        <span className="absolute bottom-3 left-3 chip bg-graphite/85 text-ink backdrop-blur">{v.condition}</span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-wide text-muted">{v.brand} · {v.year}</p>
        <h3 className="mt-0.5 font-display text-lg font-bold">{v.name}</h3>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span className="flex items-center gap-1"><Cog size={12} /> {v.transmission}</span>
          <span className="flex items-center gap-1"><Fuel size={12} /> {v.fuel}</span>
          {v.rangeKm ? (
            <span className="flex items-center gap-1"><Gauge size={12} /> {v.rangeKm} km</span>
          ) : (
            <span className="flex items-center gap-1"><Calendar size={12} /> {v.km.toLocaleString("es-CO")} km</span>
          )}
        </div>

        <div className="mt-3">
          <p className="font-display text-xl font-bold text-ink">{formatCOP(v.price)}</p>
          <p className="text-xs text-muted">Cuota estimada <span className="font-semibold text-cobre-2">{formatCOPShort(cuota)}/mes</span></p>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          <button onClick={() => openDetail(v.id)} className="btn btn-ghost btn-sm flex-1">Ver detalle</button>
          <button onClick={simular} className="btn btn-cobre btn-sm flex-1">Simular</button>
          <button
            onClick={() => toggleCompare(v.id)}
            disabled={!canAdd}
            title={comparing ? "Quitar del comparador" : compareFull ? `Máximo ${MAX_COMPARE}` : "Agregar al comparador"}
            aria-label={comparing ? "Quitar del comparador" : "Agregar al comparador"}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition ${
              comparing ? "border-cyan bg-cyan-soft text-cyan" : canAdd ? "border-line-2 text-muted hover:text-ink" : "border-line text-steel opacity-50"
            }`}
          >
            {comparing ? <Check size={16} /> : compareFull ? <GitCompare size={15} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </article>
  );
}
