import { useMemo, useState } from "react";
import { useCrm } from "../store/crmStore";
import { filterContacts } from "../lib/crmState";
import { contactsToCsv } from "../lib/csv";
import { Search, Mail, Phone, Download } from "lucide-react";
import { Avatar, StatusChip } from "../components/ui";
import { money, type ContactStatus } from "../data/crm";

const filters: (ContactStatus | "Todos")[] = ["Todos", "Cliente", "Prospecto", "Inactivo"];

export default function Contacts({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const { contacts } = useCrm();
  const [f, setF] = useState<ContactStatus | "Todos">("Todos");

  const rows = useMemo(() => filterContacts(contacts, query, f), [contacts, query, f]);

  // Exporta exactamente lo que se ve (filtros incluidos) como CSV compatible con Excel.
  const exportCsv = () => {
    const blob = new Blob(["\uFEFF" + contactsToCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "contactos-nucleo.csv";
    document.body.appendChild(a); a.click(); a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="view-in space-y-5">
      {/* Controles */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => onQuery(e.target.value)} aria-label="Buscar contactos" placeholder="Buscar por nombre, empresa o correo…" className="field !pl-9" />
        </div>
        <div className="flex gap-1.5">
          {filters.map((x) => (
            <button key={x} onClick={() => setF(x)} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${f === x ? "bg-brand text-white" : "bg-surface text-muted border border-line hover:text-ink"}`}>{x}</button>
          ))}
        </div>
        <button onClick={exportCsv} disabled={rows.length === 0} className="btn btn-ghost disabled:opacity-50"><Download size={16} /> Exportar CSV</button>
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
                      {c.phone ? <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="grid h-8 w-8 place-items-center rounded-lg border border-line transition hover:text-brand" title={c.phone} aria-label={`Llamar a ${c.name}`}><Phone size={15} /></a> : null}
                    </div>
                  </td>
                  <td className="px-5 py-3"><StatusChip status={c.status} /></td>
                  <td className="px-5 py-3 text-right font-display font-bold text-ink">{c.value ? money(c.value) : "—"}</td>
                  <td className="hidden px-5 py-3 text-muted lg:table-cell">{c.lastContact}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-muted">Sin resultados para tu búsqueda.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-sm text-muted">{rows.length} de {contacts.length} contactos</p>
    </div>
  );
}
