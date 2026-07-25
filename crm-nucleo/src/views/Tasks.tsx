import { useState } from "react";
import { Check, Clock, Building2 } from "lucide-react";
import { PriorityChip } from "../components/ui";
import { tasks as seed } from "../data/crm";

export default function Tasks() {
  const [tasks, setTasks] = useState(seed);
  const [tab, setTab] = useState<"pendientes" | "completadas">("pendientes");

  const toggle = (id: number) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const list = tasks.filter((t) => (tab === "pendientes" ? !t.done : t.done));
  const pending = tasks.filter((t) => !t.done).length;

  return (
    <div className="view-in mx-auto max-w-3xl space-y-5">
      <div className="flex items-center gap-2">
        {(["pendientes", "completadas"] as const).map((x) => (
          <button key={x} onClick={() => setTab(x)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${tab === x ? "bg-brand text-white" : "bg-surface text-muted border border-line hover:text-ink"}`}>
            {x} {x === "pendientes" && <span className="ml-1 opacity-80">({pending})</span>}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((t) => (
          <div key={t.id} className="card flex items-center gap-4 p-4">
            <button onClick={() => toggle(t.id)} aria-label="Completar"
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition ${t.done ? "border-emerald bg-emerald text-white" : "border-line hover:border-brand"}`}>
              {t.done && <Check size={15} strokeWidth={3} />}
            </button>
            <div className="min-w-0 flex-1">
              <p className={`font-semibold ${t.done ? "text-muted line-through" : "text-ink"}`}>{t.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <span className="flex items-center gap-1"><Building2 size={13} /> {t.who}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {t.due}</span>
              </div>
            </div>
            <PriorityChip p={t.priority} />
          </div>
        ))}
        {list.length === 0 && <div className="card p-12 text-center text-muted">No hay tareas {tab}.</div>}
      </div>
    </div>
  );
}
