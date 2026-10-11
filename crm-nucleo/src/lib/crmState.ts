import {
  contacts as seedContacts, deals as seedDeals, tasks as seedTasks, activities as seedActivities,
  type Contact, type ContactStatus, type Deal, type Stage, type Task, type Priority, type Activity,
} from "../data/crm";

/** Estado en memoria de la demo (sin backend): se reinicia al recargar. */
export type CrmState = { contacts: Contact[]; deals: Deal[]; tasks: Task[]; activities: Activity[] };

export const initialState = (): CrmState => ({
  contacts: [...seedContacts], deals: [...seedDeals], tasks: [...seedTasks], activities: [...seedActivities],
});

export type Draft =
  | { kind: "contact"; name: string; company: string; email: string; phone: string; status: ContactStatus }
  | { kind: "task"; title: string; who: string; due: string; priority: Priority }
  | { kind: "deal"; title: string; company: string; value: string; stage: Stage; owner: string };

export type Result = { ok: true; state: CrmState } | { ok: false; error: string };

export const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

/** "$ 12.500.000" → 12500000; lo no numérico se ignora. */
export const parseMoney = (s: string) => Number(String(s).replace(/\D/g, "")) || 0;

const nextId = (list: { id: number }[]) => list.reduce((m, x) => Math.max(m, x.id), 0) + 1;
const MAX_ACTIVITIES = 8;
const log = (state: CrmState, action: string, color: string): Activity[] =>
  [{ who: "Tú", action, when: "ahora", color }, ...state.activities].slice(0, MAX_ACTIVITIES);

/** Crea un contacto, tarea o negocio validando los campos. No muta el estado recibido. */
export function create(state: CrmState, draft: Draft): Result {
  if (draft.kind === "contact") {
    const name = draft.name.trim(), company = draft.company.trim();
    if (!name) return { ok: false, error: "Escribe el nombre del contacto." };
    if (!company) return { ok: false, error: "Escribe la empresa." };
    if (draft.email.trim() && !isValidEmail(draft.email)) return { ok: false, error: "El correo no parece válido." };
    const c: Contact = { id: nextId(state.contacts), name, company, email: draft.email.trim(), phone: draft.phone.trim(), status: draft.status, value: 0, lastContact: "Hoy" };
    return { ok: true, state: { ...state, contacts: [c, ...state.contacts], activities: log(state, `agregaste a ${name} como ${draft.status.toLowerCase()}`, "#f59e0b") } };
  }
  if (draft.kind === "task") {
    const title = draft.title.trim();
    if (!title) return { ok: false, error: "Escribe qué hay que hacer." };
    const t: Task = { id: nextId(state.tasks), title, who: draft.who.trim() || "Sin asignar", due: draft.due.trim() || "Hoy", priority: draft.priority, done: false };
    return { ok: true, state: { ...state, tasks: [t, ...state.tasks], activities: log(state, `creaste la tarea “${title}”`, "#8b5cf6") } };
  }
  const title = draft.title.trim(), company = draft.company.trim(), value = parseMoney(draft.value);
  if (!title) return { ok: false, error: "Escribe el nombre del negocio." };
  if (!company) return { ok: false, error: "Escribe la empresa." };
  if (value <= 0) return { ok: false, error: "Indica un valor mayor a cero." };
  const d: Deal = { id: nextId(state.deals), title, company, value, stage: draft.stage, owner: draft.owner.trim() || "Tú" };
  return { ok: true, state: { ...state, deals: [d, ...state.deals], activities: log(state, `abriste el negocio “${title}”`, "#4f46e5") } };
}

export function moveDeal(state: CrmState, id: number, stage: Stage): CrmState {
  const deal = state.deals.find((d) => d.id === id);
  if (!deal || deal.stage === stage) return state;
  return {
    ...state,
    deals: state.deals.map((d) => (d.id === id ? { ...d, stage } : d)),
    activities: log(state, `moviste “${deal.title}” a ${stage}`, "#4f46e5"),
  };
}

export function toggleTask(state: CrmState, id: number): CrmState {
  return { ...state, tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) };
}

export const pendingTasks = (state: CrmState) => state.tasks.filter((t) => !t.done).length;

/** Filtra contactos por texto (nombre, empresa, correo) y estado. */
export function filterContacts(list: Contact[], query: string, status: ContactStatus | "Todos"): Contact[] {
  const q = query.trim().toLowerCase();
  return list.filter((c) => (status === "Todos" || c.status === status) && (!q || (c.name + " " + c.company + " " + c.email).toLowerCase().includes(q)));
}
