import { getProduct } from "../data/products";

/** Reglas comerciales de la demo (editables). */
export const FREE_SHIPPING_FROM = 150000;
export const SHIPPING_COST = 12900;
export const MAX_QTY = 10;

export type BagLine = { productId: string; size: string; color: string; qty: number };

export const lineKey = (l: Pick<BagLine, "productId" | "size" | "color">) => `${l.productId}|${l.size}|${l.color}`;

export const formatCOP = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");

/** Agrega una línea; si ya existe la misma combinación (id+talla+color) suma cantidades. */
export function addLine(bag: BagLine[], line: BagLine): BagLine[] {
  const qty = Math.min(Math.max(1, Math.floor(line.qty) || 1), MAX_QTY);
  const key = lineKey(line);
  if (bag.some((l) => lineKey(l) === key)) {
    return bag.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l));
  }
  return [...bag, { ...line, qty }];
}

/** Cambia la cantidad; 0 o menos elimina la línea. */
export function setQty(bag: BagLine[], key: string, qty: number): BagLine[] {
  if (!Number.isFinite(qty) || qty <= 0) return bag.filter((l) => lineKey(l) !== key);
  const q = Math.min(Math.floor(qty), MAX_QTY);
  return bag.map((l) => (lineKey(l) === key ? { ...l, qty: q } : l));
}

export const countItems = (bag: BagLine[]) => bag.reduce((n, l) => n + l.qty, 0);

export function subtotal(bag: BagLine[]): number {
  return bag.reduce((sum, l) => sum + (getProduct(l.productId)?.price ?? 0) * l.qty, 0);
}

export const shippingFor = (sub: number) => (sub <= 0 || sub >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST);

/** Cuánto falta para el envío gratis (0 si ya lo tiene o la bolsa está vacía). */
export const remainingForFreeShipping = (sub: number) => (sub <= 0 ? 0 : Math.max(0, FREE_SHIPPING_FROM - sub));

export type Customer = { name: string; city?: string; notes?: string };

/** Mensaje de pedido listo para WhatsApp. */
export function buildOrderMessage(bag: BagLine[], customer: Customer): string {
  const rows = bag
    .map((l) => ({ l, p: getProduct(l.productId) }))
    .filter((r): r is { l: BagLine; p: NonNullable<typeof r.p> } => !!r.p)
    .map(({ l, p }) => `• ${l.qty} × ${p.name} (talla ${l.size}, ${l.color}) — ${formatCOP(p.price * l.qty)}`);
  const sub = subtotal(bag);
  const ship = shippingFor(sub);
  return [
    `Hola MARÚ, quiero hacer este pedido:`,
    "",
    ...rows,
    "",
    `Subtotal: ${formatCOP(sub)}`,
    `Envío: ${ship === 0 ? "Gratis" : formatCOP(ship)}`,
    `Total: ${formatCOP(sub + ship)}`,
    "",
    `Nombre: ${customer.name.trim() || "—"}`,
    ...(customer.city?.trim() ? [`Ciudad: ${customer.city.trim()}`] : []),
    ...(customer.notes?.trim() ? [`Notas: ${customer.notes.trim()}`] : []),
  ].join("\n");
}

/** Número de la tienda real. Vacío en la demo: WhatsApp deja elegir el chat. */
export const STORE_WHATSAPP = "";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
