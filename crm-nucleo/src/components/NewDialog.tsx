import { useEffect, useId, useState } from "react";
import { X, UserPlus, CheckSquare, Briefcase } from "lucide-react";
import { stages, type ContactStatus, type Priority, type Stage } from "../data/crm";
import type { Draft } from "../lib/crmState";
import { useCrm } from "../store/crmStore";
import type { ViewKey } from "./Sidebar";

type Kind = Draft["kind"];
const kinds: { id: Kind; label: string; icon: typeof UserPlus }[] = [
  { id: "contact", label: "Contacto", icon: UserPlus },
  { id: "task", label: "Tarea", icon: CheckSquare },
  { id: "deal", label: "Negocio", icon: Briefcase },
];
const defaultKind = (view: ViewKey): Kind => (view === "tareas" ? "task" : view === "pipeline" ? "deal" : "contact");

type Props = { view: ViewKey; onClose: () => void; onCreated: (kind: Kind, label: string) => void };

/** Diálogo "Nuevo": crea un contacto, una tarea o un negocio en el estado en memoria de la demo. */
export default function NewDialog({ view, onClose, onCreated }: Props) {
  const { create } = useCrm();
  const [kind, setKind] = useState<Kind>(defaultKind(view));
  const [f, setF] = useState({ name: "", company: "", email: "", phone: "", status: "Prospecto" as ContactStatus, title: "", who: "", due: "", priority: "Media" as Priority, value: "", stage: "Prospecto" as Stage, owner: "" });
  const [error, setError] = useState("");
  const uid = useId();
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => { setF((x) => ({ ...x, [k]: v })); setError(""); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const draft: Draft =
      kind === "contact" ? { kind, name: f.name, company: f.company, email: f.email, phone: f.phone, status: f.status }
      : kind === "task" ? { kind, title: f.title, who: f.who, due: f.due, priority: f.priority }
      : { kind, title: f.title, company: f.company, value: f.value, stage: f.stage, owner: f.owner };
    const err = create(draft);
    if (err) return setError(err);
    onCreated(kind, kind === "contact" ? f.name.trim() : f.title.trim());
  };

  const L = ({ id, children }: { id: string; children: string }) => <label htmlFor={`${uid}-${id}`} className="mb-1 block text-xs font-semibold text-muted">{children}</label>;

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/40 sm:place-items-center sm:p-6" onClick={onClose}>
      <form
        role="dialog"
        aria-modal="true"
        aria-label="Nuevo registro"
        onSubmit={submit}
        noValidate
        onClick={(e) => e.stopPropagation()}
        className="card max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-b-none p-6 shadow-xl sm:rounded-b-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold">Nuevo</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-canvas"><X size={18} /></button>
        </div>

        <div className="mt-4 flex gap-1.5" role="tablist" aria-label="Tipo de registro">
          {kinds.map((k) => (
            <button key={k.id} type="button" role="tab" aria-selected={kind === k.id} onClick={() => { setKind(k.id); setError(""); }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${kind === k.id ? "bg-brand text-white" : "border border-line bg-surface text-muted hover:text-ink"}`}>
              <k.icon size={15} /> {k.label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3.5">
          {kind === "contact" && (
            <>
              <div><L id="name">Nombre *</L><input id={`${uid}-name`} autoFocus value={f.name} onChange={(e) => set("name", e.target.value)} className="field" autoComplete="off" /></div>
              <div><L id="company">Empresa *</L><input id={`${uid}-company`} value={f.company} onChange={(e) => set("company", e.target.value)} className="field" autoComplete="off" /></div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div><L id="email">Correo</L><input id={`${uid}-email`} type="email" value={f.email} onChange={(e) => set("email", e.target.value)} className="field" autoComplete="off" /></div>
                <div><L id="phone">Teléfono</L><input id={`${uid}-phone`} type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} className="field" autoComplete="off" /></div>
              </div>
              <div><L id="status">Estado</L>
                <select id={`${uid}-status`} value={f.status} onChange={(e) => set("status", e.target.value as ContactStatus)} className="field">
                  <option>Prospecto</option><option>Cliente</option><option>Inactivo</option>
                </select>
              </div>
            </>
          )}
          {kind === "task" && (
            <>
              <div><L id="title">¿Qué hay que hacer? *</L><input id={`${uid}-title`} autoFocus value={f.title} onChange={(e) => set("title", e.target.value)} className="field" autoComplete="off" /></div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div><L id="who">Cliente / empresa</L><input id={`${uid}-who`} value={f.who} onChange={(e) => set("who", e.target.value)} className="field" autoComplete="off" /></div>
                <div><L id="due">Para cuándo</L><input id={`${uid}-due`} value={f.due} placeholder="Hoy" onChange={(e) => set("due", e.target.value)} className="field" autoComplete="off" /></div>
              </div>
              <div><L id="prio">Prioridad</L>
                <select id={`${uid}-prio`} value={f.priority} onChange={(e) => set("priority", e.target.value as Priority)} className="field">
                  <option>Alta</option><option>Media</option><option>Baja</option>
                </select>
              </div>
            </>
          )}
          {kind === "deal" && (
            <>
              <div><L id="dtitle">Nombre del negocio *</L><input id={`${uid}-dtitle`} autoFocus value={f.title} onChange={(e) => set("title", e.target.value)} className="field" autoComplete="off" /></div>
              <div><L id="dcompany">Empresa *</L><input id={`${uid}-dcompany`} value={f.company} onChange={(e) => set("company", e.target.value)} className="field" autoComplete="off" /></div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div><L id="value">Valor (COP) *</L><input id={`${uid}-value`} inputMode="numeric" value={f.value} placeholder="12.500.000" onChange={(e) => set("value", e.target.value)} className="field" autoComplete="off" /></div>
                <div><L id="stage">Etapa</L>
                  <select id={`${uid}-stage`} value={f.stage} onChange={(e) => set("stage", e.target.value as Stage)} className="field">
                    {stages.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div><L id="owner">Responsable</L><input id={`${uid}-owner`} value={f.owner} placeholder="Tú" onChange={(e) => set("owner", e.target.value)} className="field" autoComplete="off" /></div>
            </>
          )}
        </div>

        {error && <p role="alert" className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm font-medium text-rose">{error}</p>}
        <div className="mt-5 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="btn btn-ghost">Cancelar</button>
          <button type="submit" className="btn btn-brand">Crear</button>
        </div>
        <p className="mt-3 text-center text-xs text-muted">Demo: se guarda solo en esta sesión; al recargar vuelve a los datos de ejemplo.</p>
      </form>
    </div>
  );
}
