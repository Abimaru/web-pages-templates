import { GitCompare, X, ArrowRight } from "lucide-react";
import { getVehicle } from "../data/vehicles";
import { useVehicles, MAX_COMPARE } from "../store/vehiclesStore";

export default function CompareBar() {
  const { compare, removeCompare, clearCompare } = useVehicles();
  if (compare.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-line-2 bg-night/95 p-3 shadow-2xl backdrop-blur">
        <span className="hidden items-center gap-2 text-sm font-semibold text-ink sm:flex"><GitCompare size={17} className="text-cyan" /> Comparar</span>
        <div className="flex flex-1 items-center gap-2 overflow-x-auto">
          {compare.map((id) => {
            const v = getVehicle(id)!;
            return (
              <span key={id} className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-panel/60 py-1 pl-1 pr-2">
                <img src={v.image} alt="" className="h-8 w-10 rounded object-cover" />
                <span className="text-xs text-ink/85">{v.name}</span>
                <button onClick={() => removeCompare(id)} className="text-muted hover:text-cobre" aria-label={`Quitar ${v.name}`}><X size={13} /></button>
              </span>
            );
          })}
          {Array.from({ length: MAX_COMPARE - compare.length }).map((_, i) => (
            <span key={i} className="hidden h-10 w-16 shrink-0 place-items-center rounded-lg border border-dashed border-line text-[10px] text-steel sm:grid">vacío</span>
          ))}
        </div>
        <button onClick={clearCompare} className="hidden text-xs text-muted hover:text-ink sm:block">Limpiar</button>
        <a href="#comparador" className="btn btn-electric btn-sm shrink-0">Comparar <ArrowRight size={15} /></a>
      </div>
    </div>
  );
}
