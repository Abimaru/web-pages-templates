import { useEffect } from "react";
import { X, Check, Calculator, GitCompare, ShieldCheck, Info } from "lucide-react";
import { getVehicle } from "../data/vehicles";
import { insurancePlans } from "../data/insurance";
import { estimateMonthly, financedAmount, DEFAULT_RATE_MONTHLY, monthlyToEA } from "../lib/finance";
import { formatCOP, formatKm } from "../lib/format";
import { useVehicles } from "../store/vehiclesStore";

export default function VehicleDetail() {
  const { detailId, closeDetail, toggleCompare, isComparing, compareFull, setSimulate } = useVehicles();
  const v = detailId ? getVehicle(detailId) : null;

  useEffect(() => {
    if (!v) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDetail();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [v, closeDetail]);

  if (!v) return null;

  const down = v.price * 0.2;
  const cuota = estimateMonthly(v.price);
  const plan = insurancePlans.find((p) => p.featured) ?? insurancePlans[0];
  const comparing = isComparing(v.id);

  const ficha: { k: string; val: string }[] = [
    { k: "Tipo", val: v.type },
    { k: "Condición", val: v.condition },
    { k: "Año", val: String(v.year) },
    { k: "Combustible", val: v.fuel },
    { k: "Transmisión", val: v.transmission },
    { k: v.rangeKm ? "Autonomía" : "Kilometraje", val: v.rangeKm ? `${v.rangeKm} km` : formatKm(v.km) },
    { k: "Puestos", val: String(v.seats) },
    { k: "Uso ideal", val: v.useCase },
  ];

  const simular = () => {
    setSimulate(v.id);
    closeDetail();
    setTimeout(() => document.getElementById("cockpit")?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={`Detalle de ${v.name}`}>
      <div className="absolute inset-0 bg-graphite/80 backdrop-blur-sm" onClick={closeDetail} />
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-night sm:rounded-3xl">
        <button onClick={closeDetail} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-graphite/80 text-ink/80 backdrop-blur transition hover:text-ink" aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="overflow-y-auto">
          <img src={v.image} alt={`${v.brand} ${v.name}`} className="h-56 w-full object-cover sm:h-72" />

          <div className="p-6">
            <div className="flex flex-wrap gap-1.5">
              {v.tags.map((t) => <span key={t} className="chip bg-cobre-soft text-cobre-2">{t}</span>)}
            </div>
            <p className="mt-3 text-xs uppercase tracking-wide text-muted">{v.brand} · {v.year}</p>
            <h2 className="font-display text-2xl font-bold">{v.name}</h2>
            <p className="mt-2 leading-relaxed text-muted">{v.description}</p>

            {/* Precio + estimación */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-panel/50 p-4">
                <p className="text-xs text-muted">Precio</p>
                <p className="font-display text-2xl font-bold">{formatCOP(v.price)}</p>
              </div>
              <div className="rounded-2xl border border-cobre/30 bg-cobre-soft p-4">
                <p className="text-xs text-muted">Cuota estimada (20% inicial · 60 meses)</p>
                <p className="font-display text-2xl font-bold text-cobre-2">{formatCOP(cuota)}<span className="text-sm font-normal text-muted">/mes</span></p>
                <p className="mt-0.5 text-[11px] text-muted">Inicial {formatCOP(down)} · financia {formatCOP(financedAmount(v.price, down))} · {(monthlyToEA(DEFAULT_RATE_MONTHLY) * 100).toFixed(1)}% E.A. aprox.</p>
              </div>
            </div>

            {/* Ficha técnica */}
            <h3 className="mt-6 font-display text-lg font-semibold">Ficha técnica</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-4">
              {ficha.map((f) => (
                <div key={f.k} className="border-b border-line py-2.5">
                  <dt className="text-xs text-muted">{f.k}</dt>
                  <dd className="font-medium text-ink">{f.val}</dd>
                </div>
              ))}
            </dl>

            {/* Características */}
            <h3 className="mt-6 font-display text-lg font-semibold">Características</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {v.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink/80"><Check size={15} className="shrink-0 text-mint" /> {f}</li>
              ))}
            </ul>

            {/* Seguro sugerido */}
            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel/40 p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-soft text-cyan"><ShieldCheck size={22} /></span>
                <div>
                  <p className="text-sm font-semibold">Protección sugerida: Plan {plan.name}</p>
                  <p className="text-xs text-muted">Desde {formatCOP(plan.monthlyFrom)}/mes · {plan.recommendedFor}</p>
                </div>
              </div>
              <a href="#seguros" onClick={closeDetail} className="btn btn-ghost btn-sm shrink-0">Ver planes</a>
            </div>

            {/* Aviso */}
            <p className="mt-4 flex items-start gap-2 text-xs text-steel"><Info size={14} className="mt-0.5 shrink-0" /> Contenido demostrativo. Especificaciones y valores ilustrativos, no constituyen una oferta.</p>

            {/* CTAs */}
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button onClick={simular} className="btn btn-cobre flex-1"><Calculator size={17} /> Simular este vehículo</button>
              <button onClick={() => toggleCompare(v.id)} disabled={!comparing && compareFull} className={`btn flex-1 ${comparing ? "btn-electric" : "btn-ghost"}`}>
                <GitCompare size={16} /> {comparing ? "En el comparador" : "Agregar al comparador"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
