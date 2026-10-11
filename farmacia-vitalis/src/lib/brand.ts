/** "Pruébalo con tu marca": personalización en vivo de la demo (nombre, color y logo). */

export type Brand = { name: string; color: string; logo?: string };

export const DEFAULT_BRAND: Brand = { name: "VITALIS", color: "#0e78d4" };

/** Colores de acento sugeridos (el usuario también puede elegir uno libre). */
export const PRESET_COLORS = ["#0e78d4", "#0e7c4a", "#0f766e", "#6b4e8c", "#c2410c", "#be185d", "#1f4e79", "#3a3a3a"];

export const MAX_NAME = 24;

/** Acepta "#rgb", "#rrggbb" (con o sin #) y devuelve "#rrggbb" en minúsculas, o null. */
export function normalizeHex(input: string): string | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1];
  return "#" + h.toLowerCase();
}

const toRgb = (hex: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
const toHex = (rgb: number[]) => "#" + rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");

/** Mezcla `hex` con `other` (t = 0 deja `hex`, t = 1 deja `other`). */
export function mix(hex: string, other: string, t: number): string {
  const a = toRgb(hex), b = toRgb(other);
  return toHex(a.map((v, i) => v + (b[i] - v) * t));
}

const channel = (v: number) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
export const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Oscurece el color hasta que se lea sobre blanco/porcelana (contraste ≥ 3). */
export function ensureReadable(hex: string, min = 3): string {
  let c = hex;
  for (let i = 0; i < 20 && contrast(c, "#ffffff") < min; i++) c = mix(c, "#000000", 0.12);
  return c;
}

export type AccentTheme = { medic: string; medicDark: string; soft: string };

/** Variables de tema derivadas del color de acento (primario, su variante oscura y un fondo suave). */
export function accentTheme(color: string): AccentTheme {
  const medic = ensureReadable(normalizeHex(color) ?? DEFAULT_BRAND.color);
  return { medic, medicDark: mix(medic, "#000000", 0.25), soft: mix(medic, "#ffffff", 0.86) };
}

export function cleanName(input: string): string {
  return input.replace(/\s+/g, " ").trim().slice(0, MAX_NAME);
}

/** Marca efectiva: valores vacíos o inválidos caen al valor por defecto. */
export function resolveBrand(partial: Partial<Brand> | null | undefined): Brand {
  const name = cleanName(partial?.name ?? "");
  const color = normalizeHex(partial?.color ?? "") ?? DEFAULT_BRAND.color;
  return { name: name || DEFAULT_BRAND.name, color, logo: partial?.logo };
}

/** Lee ?marca=Nombre&color=%23hex (enlace para compartir con un prospecto). */
export function readBrandFromSearch(search: string): Partial<Brand> | null {
  const q = new URLSearchParams(search);
  const name = cleanName(q.get("marca") ?? "");
  const color = normalizeHex(q.get("color") ?? "");
  if (!name && !color) return null;
  return { ...(name ? { name } : {}), ...(color ? { color } : {}) };
}

export const isDefaultBrand = (b: Brand) =>
  b.name === DEFAULT_BRAND.name && b.color === DEFAULT_BRAND.color && !b.logo;

/** Query string para compartir: solo lo que difiere del valor por defecto (el logo no viaja). */
export function brandToSearch(b: Brand): string {
  const q = new URLSearchParams();
  if (b.name !== DEFAULT_BRAND.name) q.set("marca", b.name);
  if (b.color !== DEFAULT_BRAND.color) q.set("color", b.color);
  const s = q.toString();
  return s ? "?" + s : "";
}

/** Mensaje para el estudio: el prospecto pide esta farmacia con su marca. */
export function buildInterestMessage(b: Brand): string {
  return [
    "Hola, probé la demo de farmacia de Estudio Abimaru con mi marca y quiero una página así.",
    `Mi farmacia: ${b.name}`,
    `Color de marca: ${b.color}`,
    b.logo ? "(Ya probé con mi logo.)" : "",
  ].filter(Boolean).join("\n");
}

/**
 * Wordmark: la marca por defecto es "VITAL" + "IS" (acento). Con un nombre propio, todas las palabras menos la última
 * van en tinta y la última con el acento; con una sola palabra, toda va con el acento.
 */
export function wordmarkParts(name: string): { head: string; tail: string } {
  if (name === DEFAULT_BRAND.name) return { head: "VITAL", tail: "IS" };
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { head: "", tail: "" };
  return { head: words.slice(0, -1).join(" "), tail: words[words.length - 1] };
}

/** Sin espacio entre cabeza y cola cuando es la marca por defecto (VITAL+IS); con espacio en nombres propios. */
export const wordmarkJoin = (name: string) => (name === DEFAULT_BRAND.name ? "" : " ");
