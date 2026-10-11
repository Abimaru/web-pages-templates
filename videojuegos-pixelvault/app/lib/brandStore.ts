"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_BRAND, accentTheme, isDefaultBrand, readBrandFromSearch, resolveBrand, type Brand } from "./brand";

const KEY = "pixelvault-brand";

/** Marca inicial: enlace compartido (?marca=&color=) > última marca guardada > PIXELVAULT. */
function load(): Brand {
  try {
    const fromUrl = readBrandFromSearch(window.location.search);
    if (fromUrl) return resolveBrand(fromUrl);
  } catch { /* sin window (pruebas/SSR) */ }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return resolveBrand(JSON.parse(raw));
  } catch { /* sin almacenamiento */ }
  return resolveBrand(null);
}

// `draft` es lo que se escribe en el panel (puede tener el nombre vacío mientras se teclea);
// `resolved` es la marca efectiva que ve toda la app.
let draft: Brand = load();
let resolved: Brand = resolveBrand(draft);
const listeners = new Set<() => void>();

let titleName: string = DEFAULT_BRAND.name;

/** Sustituye el nombre de la marca en el título de la pestaña (Next lo restablece al hidratar y al navegar). */
export function syncTitle(b: Brand = resolved) {
  if (typeof document === "undefined") return;
  let t = document.title;
  for (const old of new Set([DEFAULT_BRAND.name, titleName])) if (old) t = t.split(old).join(b.name);
  if (document.title !== t) document.title = t;
  titleName = b.name;
}

function apply(b: Brand) {
  if (typeof document === "undefined") return;
  const t = accentTheme(b.color);
  const root = document.documentElement.style;
  root.setProperty("--color-neon-cyan", t.accent);
  root.setProperty("--neon-rgb", t.rgb);
  syncTitle(b);
}

function persist(b: Brand) {
  try {
    if (isDefaultBrand(b)) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify({ name: b.name, color: b.color }));
  } catch { /* noop */ }
}

export function setBrandDraft(next: Brand) {
  draft = next;
  resolved = resolveBrand(next);
  apply(resolved);
  persist(resolved);
  listeners.forEach((l) => l());
}

export const resetBrand = () => setBrandDraft(resolveBrand(null));

const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };

/** Marca efectiva (la que se pinta en la app). */
export const useBrand = () => useSyncExternalStore(subscribe, () => resolved, () => resolveBrand(null));
/** Lo que hay escrito en el panel (nombre puede estar vacío al teclear). */
export const useBrandDraft = () => useSyncExternalStore(subscribe, () => draft, () => resolveBrand(null));

apply(resolved); // aplica el tema inicial (enlace compartido o última marca) antes del primer render

export { DEFAULT_BRAND };
