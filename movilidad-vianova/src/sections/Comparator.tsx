import { GitCompare, X, Calculator, Trophy, AlertTriangle } from "lucide-react";
import Reveal from "../components/Reveal";
import { getVehicle, type Vehicle } from "../data/vehicles";
import { insurancePlans } from "../data/insurance";
import { estimateMonthly } from "../lib/finance";
import { formatCOP } from "../lib/format";
import { useVehicles } from "../store/vehiclesStore";

const seguro = insurancePlans.find((p) => p.featured)!.monthlyFrom;

function badgesFor(v: Vehicle, all: Vehicle[]): string[] {
  const b: string[] = [];
  const cuota = (x: Vehicle) => estimateMonthly(x.price);
  if (v.id === [...all].sort((a, c) => cuota(a) - cuota(c))[0].id) b.push("Menor cuota");
  if (v.id === [...all].sort((a, c) => a.price - c.price)[0].id) b.push("Menor precio");
  if (v.id === [...all].sort((a, c) => c.year - a.year)[0].id) b.push("Más nuevo");
  if (v.id === [...all].sort((a, c) => c.seats - a.seats)[0].id && v.seats >= 7) b.push("Mayor capacidad");
  if (v.fuel === "Eléctrico" || v.fuel === "Híbrido") b.push("Mayor eficiencia");
  if (v.useCase === "Ciudad") b.push("Mejor para ciudad");
  if (v.useCase === "Carretera") b.push("Mejor para carretera");
  return b;
}

function consideraciones(v: Vehicle): string[] {
  const c: string[] = [];
  if (v.condition === "Usado") c.push("Revisar historial e inspección");
  if (v.fuel === "Eléctrico") c.push("Requiere punto de carga");
  if (v.price >= 180_000_000) c.push("Inversión y seguro más altos");
  if (v.transmission === "Mecánica") c.push("Transmisión mecánica");
  if (c.length === 0) c.push("Sin observaciones destacadas");
  return c;
}

function Row({ k, val, strong }: { k: string; val: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-2 text-sm">
      <span className="text-muted">{k}</span>
      <span className={strong ? "font-display font-bold text-cobre-2" : "font-medium text-ink"}>{val}</span>
    </div>
  );
}

export default function Comparator() {
  const { compare, removeCompare, openDetail, setSimulate } = useVehicles();
  const vs = compare.map((id) => getVehicle(id)!).filter(Boolean);

  return (
    <section id="comparador" className="border-y border-line bg-night/40 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10">
          <span className="kicker text-cobre-2">Comparador</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Enfrenta hasta 3 opciones</h2>
          <p className="mt-3 max-w-xl text-muted">Agrega vehículos desde el catálogo y compáralos lado a lado. Te resaltamos lo mejor de cada uno.</p>
        </Reveal>

        {vs.length < 2 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line-2 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-soft text-cyan"><GitCompare size={26} /></span>
            <p className="max-w-sm text-muted">Selecciona al menos <strong className="text-ink">2 vehículos</strong> con el botón <span className="text-cyan">＋</span> en las tarjetas del catálogo para compararlos aquí.</p>
            <a href="#marketplace" className="btn btn-ghost btn-sm">Ir al catálogo</a>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vs.map((v) => (
              <div key={v.id} className="card overflow-hidden">
                <div className="relative">
                  <img src={v.image} alt={v.name} className="h-40 w-full object-cover" />
                  <button onClick={() => removeCompare(v.id)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-graphite/80 text-ink/80 backdrop-blur hover:text-cobre" aria-label={`Quitar ${v.name}`}><X size={15} /></button>
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">{v.brand} · {v.year}</p>
                  <h3 className="font-display text-lg font-bold">{v.name}</h3>

                  {badgesFor(v, vs).length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {badgesFor(v, vs).map((b) => (
                        <span key={b} className="chip bg-mint/12 text-mint"><Trophy size={11} /> {b}</span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3">
                    <Row k="Precio" val={formatCOP(v.price)} />
                    <Row k="Cuota estimada" val={formatCOP(estimateMonthly(v.price)) + "/mes"} strong />
                    <Row k="Condición" val={v.condition} />
                    <Row k="Combustible" val={v.fuel} />
                    <Row k="Transmisión" val={v.transmission} />
                    <Row k={v.rangeKm ? "Autonomía" : "Kilometraje"} val={v.rangeKm ? `${v.rangeKm} km` : v.km.toLocaleString("es-CO") + " km"} />
                    <Row k="Puestos" val={String(v.seats)} />
                    <Row k="Uso ideal" val={v.useCase} />
                    <Row k="Seguro estimado" val={formatCOP(seguro) + "/mes"} />
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold text-muted">A considerar</p>
                    <ul className="mt-1 space-y-1">
                      {consideraciones(v).map((c) => (
                        <li key={c} className="flex items-start gap-1.5 text-xs text-ink/70"><AlertTriangle size={12} className="mt-0.5 shrink-0 text-cobre" /> {c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button onClick={() => openDetail(v.id)} className="btn btn-ghost btn-sm flex-1">Detalle</button>
                    <button onClick={() => { setSimulate(v.id); document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-cobre btn-sm flex-1"><Calculator size={15} /> Simular</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
