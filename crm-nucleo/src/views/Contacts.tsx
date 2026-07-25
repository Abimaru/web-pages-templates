import { useMemo, useState } from "react";
import { Search, Mail, Phone, MoreHorizontal, Download } from "lucide-react";
import { Avatar, StatusChip } from "../components/ui";
import { contacts, money, type ContactStatus } from "../data/crm";

const filters: (ContactStatus | "Todos")[] = ["Todos", "Cliente", "Prospecto", "Inactivo"];

export default function Contacts() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<ContactStatus | "Todos">("Todos");

  const rows = useMemo(
    () => contacts.filter((c) => {
      const mq = (c.name + c.company + c.email).toLowerCase().includes(q.toLowerCase());
      const mf = f === "Todos" || c.status === f;
      return mq && mf;
    }),
    [q, f]
  );

  return (
    <div className="view-in space-y-5">
      {/* Controles */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre, empresa o correo…" className="field !pl-9" />
        </div>
        <div className="flex gap-1.5">
          {filters.map((x) => (
            <button key={x} onClick={() => setF(x)} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${f === x ? "bg-brand text-white" : "bg-surface text-muted border border-line hover:text-ink"}`}>{x}</button>
          ))}
        </div>
        <button className="btn btn-ghost"><Download size={16} /> Exportar</button>
      </div>

      {/* Tabla */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Contacto</th>
                <th className="px-5 py-3 font-semibold">Empresa</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Contacto</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 text-right font-semibold">Valor</th>
                <th className="hidden px-5 py-3 font-semibold lg:table-cell">Último</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="row-hover border-b border-line/70 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} />
                      <span className="font-semibold text-ink">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{c.company}</td>
                  <td className="hidden px-5 py-3 lg:py-3 md:table-cell">
                    <div className="flex gap-2 text-muted">
                      <a href={`mailto:${c.email}`} className="grid h-8 w-8 place-items-center rounded-lg border border-line transition hover:text-brand" title={c.email}><Mail size={15} /></a>
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-line" title={c.phone}><Phone size={15} /></span>
                    </div>
                  </td>
                  <td className="px-5 py-3"><StatusChip status={c.status} /></td>
                  <td className="px-5 py-3 text-right font-display font-bold text-ink">{c.value ? money(c.value) : "—"}</td>
                  <td className="hidden px-5 py-3 text-muted lg:table-cell">{c.lastContact}</td>
                  <td className="px-5 py-3 text-right"><button className="text-muted transition hover:text-ink"><MoreHorizontal size={18} /></button></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-muted">Sin resultados para tu búsqueda.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-sm text-muted">{rows.length} de {contacts.length} contactos</p>
    </div>
  );
}
