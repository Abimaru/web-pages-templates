import type { ReactNode } from "react";
import { avatarColor, initials, type ContactStatus, type Priority } from "../data/crm";

export function Avatar({ name, size = 38 }: { name: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, background: avatarColor(name), fontSize: size * 0.36 }}>
      {initials(name)}
    </span>
  );
}

const statusStyle: Record<ContactStatus, string> = {
  Cliente: "bg-emerald/12 text-emerald",
  Prospecto: "bg-brand/12 text-brand",
  Inactivo: "bg-muted/15 text-muted",
};
export function StatusChip({ status }: { status: ContactStatus }) {
  return <span className={`chip ${statusStyle[status]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

const prioStyle: Record<Priority, string> = {
  Alta: "bg-rose/12 text-rose",
  Media: "bg-amber/15 text-amber",
  Baja: "bg-sky/12 text-sky",
};
export function PriorityChip({ p }: { p: Priority }) {
  return <span className={`chip ${prioStyle[p]}`}>{p}</span>;
}

export function KpiCard({ label, value, delta, up, icon }: { label: string; value: string; delta: string; up: boolean; icon: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand">{icon}</span>
        <span className={`text-xs font-semibold ${up ? "text-emerald" : "text-rose"}`}>{up ? "▲" : "▼"} {delta}</span>
      </div>
      <p className="mt-4 font-display text-2xl font-extrabold text-ink">{value}</p>
      <p className="mt-0.5 text-sm text-muted">{label}</p>
    </div>
  );
}
