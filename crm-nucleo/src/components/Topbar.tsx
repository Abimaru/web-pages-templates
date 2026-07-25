import { Menu, Search, Bell, Plus } from "lucide-react";

const titles: Record<string, { t: string; s: string }> = {
  dashboard: { t: "Dashboard", s: "Resumen de tu operación comercial" },
  contactos: { t: "Contactos", s: "Gestiona tus clientes y prospectos" },
  pipeline: { t: "Negocios", s: "Arrastra las tarjetas entre etapas" },
  tareas: { t: "Tareas", s: "Tus pendientes del día" },
  reportes: { t: "Reportes", s: "Métricas y desempeño del equipo" },
};

export default function Topbar({ view, onMenu }: { view: string; onMenu: () => void }) {
  const meta = titles[view] ?? titles.dashboard;
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-line bg-canvas/85 px-5 py-3.5 backdrop-blur-md sm:px-8">
      <button onClick={onMenu} className="text-muted lg:hidden" aria-label="Menú"><Menu size={22} /></button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-xl font-extrabold text-ink">{meta.t}</h1>
        <p className="truncate text-sm text-muted">{meta.s}</p>
      </div>
      <div className="relative hidden md:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input placeholder="Buscar…" className="field !w-56 !pl-9" />
      </div>
      <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted transition hover:text-ink" aria-label="Notificaciones">
        <Bell size={19} />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose" />
      </button>
      <button className="btn btn-brand"><Plus size={17} /> <span className="hidden sm:inline">Nuevo</span></button>
    </header>
  );
}
