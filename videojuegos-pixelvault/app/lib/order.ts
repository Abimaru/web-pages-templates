import type { Game } from "./games";
import { formatCOP } from "./games";

export type OrderLine = { game: Game; qty: number; platform?: string };

export type DeliveryMode = "digital" | "domicilio";

export type Customer = { name: string; delivery: DeliveryMode; city?: string; notes?: string };

/** Plataforma efectiva de una línea: la elegida si es válida; si no, la primera del juego. */
export const platformOf = (l: OrderLine): string =>
  l.platform && l.game.platforms.includes(l.platform) ? l.platform : l.game.platforms[0];

export const orderTotal = (lines: OrderLine[]) => lines.reduce((n, l) => n + l.game.price * l.qty, 0);

/** Número de la tienda real. Vacío en la demo: WhatsApp deja elegir el chat. */
export const STORE_WHATSAPP = "";

export function buildOrderMessage(lines: OrderLine[], c: Customer, brandName = "PIXELVAULT"): string {
  return [
    `Hola ${brandName}, quiero hacer este pedido:`,
    "",
    ...lines.map((l) => `• ${l.qty} × ${l.game.title} (${platformOf(l)}) — ${formatCOP(l.game.price * l.qty)}`),
    "",
    `Total: ${formatCOP(orderTotal(lines))}`,
    `Entrega: ${c.delivery === "digital" ? "Código digital por correo/WhatsApp" : "Domicilio"}`,
    `Nombre: ${c.name.trim() || "—"}`,
    ...(c.delivery === "domicilio" && c.city?.trim() ? [`Ciudad: ${c.city.trim()}`] : []),
    ...(c.notes?.trim() ? [`Notas: ${c.notes.trim()}`] : []),
  ].join("\n");
}

export const whatsappUrl = (message: string) =>
  `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
