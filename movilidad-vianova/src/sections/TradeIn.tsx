import { useState } from "react";
import { Tag, Repeat, Car, ArrowRight, Info } from "lucide-react";
import Reveal from "../components/Reveal";
import { formatCOP } from "../lib/format";

function valuation(year: number, km: number, estado: string) {
  const age = Math.max(2026 - year, 0);
  const base = Math.max(90_000_000 - age * 8_000_000, 20_000_000);
  const estadoFactor = estado === "Excelente" ? 1 : estado === "Bueno" ? 0.9 : 0.78;
  const kmFactor = 1 - Math.min(km / 200_000, 0.4);
  const v = base * estadoFactor * kmFactor;
  return { min: v * 0.9, max: v * 1.05 };
}

export default function TradeIn() {
  const [f, setF] = useState({ marca: "", modelo: "", year: 2020, km: 60000, estado: "Bueno", ciudad: "", intencion: "vender" });
  const [res, setRes] = useState<{ min: number; max: number } | null>(null);
  const set = (k: string, v: string | number) => setF((x) => ({ ...x, [k]: v }));

  return (
    <section id="venta" className="border-y border-line bg-night/40 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10">
          <span className="kicker text-cobre-2">Vender · Retomar · Cambiar</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">¿Ya tienes vehículo? Dale un nuevo destino</h2>
          <p className="mt-3 max-w-xl text-muted">Véndelo, úsalo como parte de pago o cámbialo. Te damos un rango de referencia al instante.</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="card p-6">
              <div className="mb-4 flex gap-2">
                {[{ id: "vender", label: "Vender", icon: Tag }, { id: "retomar", label: "Retomar", icon: Repeat }, { id: "cambiar", label: "Cambiar", icon: Car }].map((o) => (
                  <button key={o.id} onClick={() => set("intencion", o.id)} className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${f.intencion === o.id ? "border-cobre bg-cobre-soft text-cobre-2" : "border-line text-muted hover:text-ink"}`}><o.icon size={15} /> {o.label}</button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-sm text-muted">Marca</span><input className="field" value={f.marca} onChange={(e) => set("marca", e.target.value)} placeholder="Ej: Aurora" /></label>
                <label className="block"><span className="mb-1.5 block text-sm text-muted">Modelo</span><input className="field" value={f.modelo} onChange={(e) => set("modelo", e.target.value)} placeholder="Ej: X Line" /></label>
                <label className="block"><span className="mb-1.5 block text-sm text-muted">Año: {f.year}</span><input type="range" min={2005} max={2026} value={f.year} onChange={(e) => set("year", +e.target.value)} className="range" /></label>
                <label className="block"><span className="mb-1.5 block text-sm text-muted">Kilometraje: {f.km.toLocaleString("es-CO")} km</span><input type="range" min={0} max={200000} step={5000} value={f.km} onChange={(e) => set("km", +e.target.value)} className="range" /></label>
                <label className="block"><span className="mb-1.5 block text-sm text-muted">Estado</span><select className="field" value={f.estado} onChange={(e) => set("estado", e.target.value)}><option>Excelente</option><option>Bueno</option><option>Regular</option></select></label>
                <label className="block"><span className="mb-1.5 block text-sm text-muted">Ciudad</span><input className="field" value={f.ciudad} onChange={(e) => set("ciudad", e.target.value)} /></label>
              </div>
              <button onClick={() => setRes(valuation(f.year, f.km, f.estado))} className="btn btn-cobre mt-5 w-full">Solicitar evaluación <ArrowRight size={16} /></button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-gradient-to-br from-panel to-night p-6">
              {res ? (
                <>
                  <p className="chip w-fit bg-cyan-soft text-cyan">Rango estimado de referencia</p>
                  <p className="mt-4 font-display text-3xl font-extrabold text-ink">{formatCOP(res.min)}</p>
                  <p className="text-sm text-muted">a</p>
                  <p className="font-display text-3xl font-extrabold text-cobre-2">{formatCOP(res.max)}</p>
                  <p className="mt-4 flex items-start gap-2 text-xs text-steel"><Info size={14} className="mt-0.5 shrink-0" /> La valoración es una referencia demostrativa y está sujeta a inspección y validación real.</p>
                  <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
                    <a href="#marketplace" className="btn btn-electric btn-sm flex-1">Usar como parte de pago</a>
                    <a href="#marketplace" className="btn btn-ghost btn-sm flex-1">Explorar reemplazo</a>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cobre-soft text-cobre"><Tag size={26} /></span>
                  <p className="max-w-xs text-muted">Completa los datos de tu vehículo y te mostramos un rango estimado aquí.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
