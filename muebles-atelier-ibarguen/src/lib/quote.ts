import { useSyncExternalStore } from "react";
import { getProject, type Project } from "../data/projects";

/** Número del taller real. Vacío en la demo: WhatsApp deja elegir el chat. */
export const STORE_WHATSAPP = "";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;

/** Agrega o quita un slug de la lista (sin duplicados). */
export function toggleSlug(list: string[], slug: string): string[] {
  return list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
}

/** Descarta slugs que ya no existen (p. ej. datos viejos en localStorage). */
export function resolvePieces(slugs: string[]): Project[] {
  return slugs.map(getProject).filter((p): p is Project => !!p);
}

export type QuoteRequest = {
  name: string;
  phone: string;
  email?: string;
  type?: string;
  notes?: string;
  pieces: Project[];
};

export function buildQuoteMessage(q: QuoteRequest): string {
  const type = q.type && !q.type.endsWith("…") ? q.type : "";
  return [
    "Hola Atelier Ibargüen, quiero cotizar un proyecto a la medida.",
    "",
    ...(q.pieces.length
      ? ["Piezas que me inspiran:", ...q.pieces.map((p) => `• ${p.name} (${p.category}, ${p.wood})`), ""]
      : []),
    ...(type ? [`Tipo de proyecto: ${type}`] : []),
    `Nombre: ${q.name.trim() || "—"}`,
    `Teléfono: ${q.phone.trim() || "—"}`,
    ...(q.email?.trim() ? [`Correo: ${q.email.trim()}`] : []),
    ...(q.notes?.trim() ? ["", `Mi idea: ${q.notes.trim()}`] : []),
  ].join("\n");
}

/* ---- Lista "Mi cotización" compartida entre páginas (persistida en localStorage) ---- */
const KEY = "atelier-quote";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

let current: string[] = read();
const listeners = new Set<() => void>();

function set(next: string[]) {
  current = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* almacenamiento no disponible: la lista vive solo en memoria */
  }
  listeners.forEach((l) => l());
}

export const toggleInQuote = (slug: string) => set(toggleSlug(current, slug));
export const clearQuote = () => set([]);

export function useQuoteSlugs(): string[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => [],
  );
}
