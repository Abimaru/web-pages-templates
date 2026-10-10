import { getProduct } from "../data/products";

/** Reglas de la demo (ilustrativas y editables). */
export const FREE_DELIVERY_FROM = 60000;
export const DELIVERY_FEE = 5900;
export const MAX_QTY = 10;

export type Line = { productId: string; qty: number };

export const formatCOP = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");

export function addLine(cart: Line[], productId: string, qty = 1): Line[] {
  const q = Math.min(Math.max(1, Math.floor(qty) || 1), MAX_QTY);
  if (cart.some((l) => l.productId === productId)) {
    return cart.map((l) => (l.productId === productId ? { ...l, qty: Math.min(l.qty + q, MAX_QTY) } : l));
  }
  return [...cart, { productId, qty: q }];
}

/** 0 o menos (o no finito) elimina la línea. */
export function setQty(cart: Line[], productId: string, qty: number): Line[] {
  if (!Number.isFinite(qty) || qty <= 0) return cart.filter((l) => l.productId !== productId);
  return cart.map((l) => (l.productId === productId ? { ...l, qty: Math.min(Math.floor(qty), MAX_QTY) } : l));
}

export const countItems = (cart: Line[]) => cart.reduce((n, l) => n + l.qty, 0);

export const subtotal = (cart: Line[]) => cart.reduce((n, l) => n + (getProduct(l.productId)?.price ?? 0) * l.qty, 0);

export const deliveryFor = (sub: number) => (sub <= 0 || sub >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE);

/** Cuánto falta para domicilio gratis (0 si ya lo tiene o el carrito está vacío). */
export const remainingForFreeDelivery = (sub: number) => (sub <= 0 ? 0 : Math.max(0, FREE_DELIVERY_FROM - sub));

/** ¿Hay productos que exigen fórmula médica? */
export const needsPrescription = (cart: Line[]) => cart.some((l) => getProduct(l.productId)?.rx);

export type Customer = { name: string; address: string; notes?: string; recurring?: boolean };

/** Número de la farmacia real. Vacío en la demo: WhatsApp deja elegir el chat. */
export const STORE_WHATSAPP = "";

export const whatsappUrl = (message: string) => `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;

export function buildOrderMessage(cart: Line[], c: Customer): string {
  const rows = cart.flatMap((l) => {
    const p = getProduct(l.productId);
    return p ? [`• ${l.qty} × ${p.name}${p.rx ? " (CON FÓRMULA)" : ""} — ${formatCOP(p.price * l.qty)}`] : [];
  });
  const sub = subtotal(cart);
  const fee = deliveryFor(sub);
  return [
    "Hola VITALIS, quiero hacer este pedido:",
    "",
    ...rows,
    "",
    `Subtotal: ${formatCOP(sub)}`,
    `Domicilio: ${fee === 0 ? "Gratis" : formatCOP(fee)}`,
    `Total: ${formatCOP(sub + fee)}`,
    "",
    `Nombre: ${c.name.trim() || "—"}`,
    `Dirección: ${c.address.trim() || "—"}`,
    ...(needsPrescription(cart) ? ["Fórmula médica: la envío por este chat para validación del farmacéutico."] : []),
    ...(c.recurring ? ["Quiero programar entrega recurrente (cada 30 días)."] : []),
    ...(c.notes?.trim() ? [`Notas: ${c.notes.trim()}`] : []),
  ].join("\n");
}

/** Mensaje genérico para servicios (receta digital, consulta, crónicos…). */
export const serviceMessage = (service: string) => `Hola VITALIS, quiero información sobre: ${service}.`;
