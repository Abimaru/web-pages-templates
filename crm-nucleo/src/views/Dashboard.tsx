import { DollarSign, Briefcase, Target, UserPlus, ArrowUpRight } from "lucide-react";
import { KpiCard } from "../components/ui";
import { LineAreaChart, DonutChart } from "../components/Charts";
import { revenueSeries, sourceSplit, activities, deals, money } from "../data/crm";

export default function Dashboard() {
  const abiertos = deals.filter((d) => d.stage !== "Ganado").length;
  const topDeals = [...deals].sort((a, b) => b.value - a.value).slice(0, 4);

  return (
    <div className="view-in space-y-6">
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Ingresos del mes" value="$141M" delta="12,4%" up icon={<DollarSign size={20} />} />
        <KpiCard label="Negocios abiertos" value={String(abiertos)} delta="3 nuevos" up icon={<Briefcase size={20} />} />
        <KpiCard label="Tasa de conversión" value="32%" delta="1,8%" up icon={<Target size={20} />} />
        <KpiCard label="Nuevos contactos" value="48" delta="5,1%" up={false} icon={<UserPlus size={20} />} />
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold">Ingresos por mes</h3>
              <p className="text-sm text-muted">En millones de COP · últimos 8 meses</p>
            </div>
            <span className="chip bg-emerald/12 text-emerald">▲ +18% vs. año anterior</span>
          </div>
          <LineAreaChart data={revenueSeries} />
        </div>

        <div className="card p-6">
          <h3 className="font-display text-lg font-bold">Origen de clientes</h3>
          <p className="text-sm text-muted">De dónde llegan tus negocios</p>
          <div className="mt-2 flex justify-center"><DonutChart data={sourceSplit} /></div>
          <ul className="mt-4 space-y-2">
            {sourceSplit.map((s) => (
              <li key={s.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} /> {s.label}</span>
                <span className="font-semibold text-ink">{s.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actividad + Top negocios */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-display text-lg font-bold">Actividad reciente</h3>
          <ul className="mt-4 space-y-4">
            {activities.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ background: a.color }}>{a.who[0]}</span>
                <div className="text-sm">
                  <p className="text-ink"><span className="font-semibold">{a.who}</span> {a.action}</p>
                  <p className="text-xs text-muted">{a.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Negocios destacados</h3>
            <button className="flex items-center gap-1 text-sm font-semibold text-brand">Ver todos <ArrowUpRight size={15} /></button>
          </div>
          <ul className="space-y-3">
            {topDeals.map((d) => (
              <li key={d.id} className="flex items-center justify-between rounded-xl border border-line p-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{d.title}</p>
                  <p className="text-xs text-muted">{d.company} · {d.stage}</p>
                </div>
                <span className="font-display font-bold text-ink">{money(d.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
