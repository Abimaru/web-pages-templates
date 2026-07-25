import { Trophy } from "lucide-react";
import { BarChart, DonutChart } from "../components/Charts";
import { Avatar } from "../components/ui";
import { revenueSeries, sourceSplit, reps, money } from "../data/crm";

export default function Reports() {
  const barData = revenueSeries.map((r) => ({ label: r.m, value: r.v }));
  const maxRev = Math.max(...reps.map((r) => r.revenue));

  return (
    <div className="view-in space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-display text-lg font-bold">Ventas por mes</h3>
          <p className="text-sm text-muted">En millones de COP</p>
          <BarChart data={barData} />
        </div>
        <div className="card p-6">
          <h3 className="font-display text-lg font-bold">Canales</h3>
          <p className="text-sm text-muted">Distribución de origen</p>
          <div className="mt-2 flex justify-center"><DonutChart data={sourceSplit} /></div>
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-5 flex items-center gap-2">
          <Trophy size={18} className="text-amber" />
          <h3 className="font-display text-lg font-bold">Ranking del equipo</h3>
        </div>
        <div className="space-y-4">
          {reps.map((r, i) => (
            <div key={r.name} className="flex items-center gap-4">
              <span className="font-display text-lg font-extrabold text-muted w-5">{i + 1}</span>
              <Avatar name={r.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{r.name}</p>
                  <p className="font-display font-bold text-ink">{money(r.revenue)}</p>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                    <div className="h-full rounded-full bg-brand" style={{ width: (r.revenue / maxRev) * 100 + "%" }} />
                  </div>
                  <span className="text-xs text-muted whitespace-nowrap">{r.deals} negocios</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
