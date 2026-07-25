import { LayoutDashboard, Users, KanbanSquare, CheckSquare, BarChart3, Settings, LifeBuoy, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ViewKey = "dashboard" | "contactos" | "pipeline" | "tareas" | "reportes";

const nav: { key: ViewKey; label: string; icon: LucideIcon }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "contactos", label: "Contactos", icon: Users },
  { key: "pipeline", label: "Negocios", icon: KanbanSquare },
  { key: "tareas", label: "Tareas", icon: CheckSquare },
  { key: "reportes", label: "Reportes", icon: BarChart3 },
];

export default function Sidebar({ view, onChange, open, onClose }: { view: ViewKey; onChange: (v: ViewKey) => void; open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div onClick={onClose} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}
      <aside className={`fixed z-40 flex h-full w-64 flex-col bg-sidebar text-white transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white font-display font-extrabold">N</span>
            <span className="font-display text-lg font-extrabold tracking-tight">NÚCLEO</span>
          </div>
          <button onClick={onClose} className="text-white/60 lg:hidden" aria-label="Cerrar"><X size={20} /></button>
        </div>

        <p className="px-6 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-white/35">Menú</p>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((n) => {
            const active = view === n.key;
            return (
              <button key={n.key} onClick={() => { onChange(n.key); onClose(); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${active ? "bg-brand text-white shadow-lg shadow-brand/30" : "text-white/65 hover:bg-sidebar-2 hover:text-white"}`}>
                <n.icon size={19} strokeWidth={2} /> {n.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 px-3 pb-3">
          {[{ label: "Configuración", icon: Settings }, { label: "Soporte", icon: LifeBuoy }].map((n) => (
            <button key={n.label} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/55 transition hover:bg-sidebar-2 hover:text-white">
              <n.icon size={19} /> {n.label}
            </button>
          ))}
        </div>

        <div className="m-3 rounded-xl bg-sidebar-2 p-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-violet text-sm font-bold">AB</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Abimaru</p>
              <p className="truncate text-xs text-white/50">Administrador</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
