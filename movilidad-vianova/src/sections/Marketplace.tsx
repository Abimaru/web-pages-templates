import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Reveal from "../components/Reveal";
import VehicleCard from "../components/VehicleCard";
import { vehicles, vehicleTypes, type Fuel } from "../data/vehicles";
import { formatCOPShort } from "../lib/format";

const fuels: Fuel[] = ["Gasolina", "Diésel", "Híbrido", "Eléctrico"];
const maxPrice = Math.max(...vehicles.map((v) => v.price));
type Sort = "relevancia" | "precio-asc" | "precio-desc" | "año-desc";

export default function Marketplace() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("Todos");
  const [condition, setCondition] = useState<string>("Todas");
  const [fuel, setFuel] = useState<string>("Todos");
  const [price, setPrice] = useState<number>(maxPrice);
  const [sort, setSort] = useState<Sort>("relevancia");

  const result = useMemo(() => {
    let list = vehicles.filter((v) => {
      const mq = (v.name + v.brand + v.model).toLowerCase().includes(q.trim().toLowerCase());
      const mt = type === "Todos" || v.type === type;
      const mc = condition === "Todas" || v.condition === condition;
      const mf = fuel === "Todos" || v.fuel === fuel;
      const mp = v.price <= price;
      return mq && mt && mc && mf && mp;
    });
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "año-desc") list = [...list].sort((a, b) => b.year - a.year);
    if (sort === "relevancia") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [q, type, condition, fuel, price, sort]);

  const reset = () => { setQ(""); setType("Todos"); setCondition("Todas"); setFuel("Todos"); setPrice(maxPrice); setSort("relevancia"); };

  return (
    <section id="marketplace" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="mb-10">
        <span className="kicker text-cobre-2">Marketplace</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Encuentra tu próximo vehículo</h2>
        <p className="mt-3 max-w-xl text-muted">Nuevos y usados, con cuota estimada al instante. Filtra, compara hasta 3 y simula tu financiación.</p>
      </Reveal>

      {/* Filtros */}
      <div className="mb-8 rounded-2xl border border-line bg-panel/40 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar marca o modelo…" className="field !pl-9" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="field !w-auto !py-2 text-sm">
              <option value="Todas">Nuevos y usados</option><option>Nuevo</option><option>Usado</option>
            </select>
            <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="field !w-auto !py-2 text-sm">
              <option value="Todos">Todo combustible</option>
              {fuels.map((f) => <option key={f}>{f}</option>)}
            </select>
            <div className="flex items-center gap-1.5 rounded-lg border border-line-2 bg-[#0b111d] px-2.5 py-2">
              <SlidersHorizontal size={13} className="text-muted" />
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent text-sm text-ink/85 outline-none">
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor</option>
                <option value="precio-desc">Precio: mayor</option>
                <option value="año-desc">Más nuevos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tipo (chips) + precio */}
        <div className="mt-4 flex flex-col gap-4 border-t border-line pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {["Todos", ...vehicleTypes].map((t) => (
              <button key={t} onClick={() => setType(t)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${type === t ? "border-cobre bg-cobre-soft text-cobre-2" : "border-line text-muted hover:text-ink"}`}>{t}</button>
            ))}
          </div>
          <label className="flex min-w-[220px] items-center gap-3 text-sm">
            <span className="whitespace-nowrap text-muted">Hasta {formatCOPShort(price)}</span>
            <input type="range" min={50_000_000} max={maxPrice} step={1_000_000} value={price} onChange={(e) => setPrice(+e.target.value)} className="range" />
          </label>
        </div>
      </div>

      <p className="mb-5 text-sm text-muted">{result.length} {result.length === 1 ? "vehículo" : "vehículos"}</p>

      {result.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <span className="text-5xl">🔎</span>
          <p className="text-muted">Ningún vehículo coincide con tu búsqueda.</p>
          <button onClick={reset} className="btn btn-ghost btn-sm"><X size={15} /> Limpiar filtros</button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 60}>
              <VehicleCard v={v} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
