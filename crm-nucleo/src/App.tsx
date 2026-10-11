import { useState } from "react";
import { Info, X, Check } from "lucide-react";
import Sidebar, { type ViewKey } from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./views/Dashboard";
import Contacts from "./views/Contacts";
import Pipeline from "./views/Pipeline";
import Tasks from "./views/Tasks";
import Reports from "./views/Reports";
import NewDialog from "./components/NewDialog";
import { CrmProvider, useCrm } from "./store/crmStore";
import { pendingTasks } from "./lib/crmState";

export default function App() {
  return (
    <CrmProvider>
      <Shell />
    </CrmProvider>
  );
}

function Shell() {
  const crm = useCrm();
  const [view, setView] = useState<ViewKey>("dashboard");
  const [query, setQuery] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // La búsqueda global lleva a Contactos (donde se filtran los resultados).
  const onQuery = (q: string) => { setQuery(q); if (q && view !== "contactos") setView("contactos"); };
  const onCreated = (kind: "contact" | "task" | "deal", label: string) => {
    setNewOpen(false);
    setView(kind === "contact" ? "contactos" : kind === "task" ? "tareas" : "pipeline");
    setQuery("");
    setToast(`${kind === "contact" ? "Contacto" : kind === "task" ? "Tarea" : "Negocio"} creado: ${label}`);
    window.setTimeout(() => setToast(null), 2600);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar view={view} onChange={setView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Topbar view={view} onMenu={() => setSidebarOpen(true)} query={query} onQuery={onQuery} pending={pendingTasks(crm)} onBell={() => setView("tareas")} onNew={() => setNewOpen(true)} />

        {showBanner && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-amber/30 bg-amber/10 px-5 py-2 text-sm text-[#8a5a00] sm:px-8">
            <Info size={16} className="shrink-0" />
            <p className="flex-1 min-w-[220px]"><strong>Prototipo de demostración.</strong> Datos ficticios y sin backend — ideal para validar la interfaz antes de conectar la lógica real.</p>
            <a href="https://abimaru.github.io/web-pages-templates/?utm_source=demo-nucleo&utm_medium=banner&utm_campaign=volver-catalogo" target="_blank" rel="noopener noreferrer" className="rounded-md border border-amber/40 px-2.5 py-1 text-xs font-semibold transition hover:bg-amber/15">Volver al catálogo</a>
            <a href="https://wa.me/573157076691?text=Hola%2C%20vi%20la%20demo%20de%20N%C3%9ACLEO%20CRM%20de%20Estudio%20Abimaru.%20Quisiera%20una%20soluci%C3%B3n%20as%C3%AD%20para%20mi%20negocio." target="_blank" rel="noopener noreferrer" className="rounded-md bg-amber px-2.5 py-1 text-xs font-semibold text-[#3a2600] transition hover:brightness-105">Quiero una solución así</a>
            <button onClick={() => setShowBanner(false)} aria-label="Cerrar aviso"><X size={16} /></button>
          </div>
        )}

        <main className="p-5 sm:p-8">
          {view === "dashboard" && <Dashboard />}
          {view === "contactos" && <Contacts query={query} onQuery={setQuery} />}
          {view === "pipeline" && <Pipeline />}
          {view === "tareas" && <Tasks />}
          {view === "reportes" && <Reports />}
        </main>
      </div>

      {newOpen && <NewDialog view={view} onClose={() => setNewOpen(false)} onCreated={onCreated} />}
      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-xl">
          <Check size={16} className="text-emerald" /> {toast}
        </div>
      )}
    </div>
  );
}
