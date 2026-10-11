import { computeCredit, computeSavings, creditEA, formatCOP, CREDIT_MONTHLY_RATE } from "./finance";

/** Número de la entidad real. Vacío en la demo: WhatsApp deja elegir el chat. */
export const STORE_WHATSAPP = "";

export const whatsappUrl = (message: string) => `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;

/** Valor positivo y finito, o 0 (el mensaje nunca muestra NaN ni montos negativos). */
const pos = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);

const pct = (n: number, d = 1) => ((Number.isFinite(n) ? n : 0) * 100).toFixed(d).replace(".", ",") + "%";

/** Solicitud de crédito con los valores del simulador. Todo es ilustrativo y se dice en el mensaje. */
export function buildCreditMessage(amountIn: number, monthsIn: number, name: string): string {
  const amount = pos(amountIn), months = Math.floor(pos(monthsIn));
  const { cuota, total, interest } = computeCredit(amount, months);
  return [
    "Hola PRÓSPERA, quiero solicitar un crédito (simulación):",
    "",
    `• Monto: ${formatCOP(amount)}`,
    `• Plazo: ${months} meses`,
    `• Cuota mensual estimada: ${formatCOP(cuota)}`,
    `• Total a pagar: ${formatCOP(total)} (intereses ${formatCOP(interest)})`,
    `• Tasa de la simulación: ${pct(CREDIT_MONTHLY_RATE)} M.V. (≈ ${pct(creditEA)} E.A.)`,
    "",
    `Nombre: ${name.trim() || "—"}`,
    "Entiendo que los valores son orientativos y sujetos a estudio.",
  ].join("\n");
}

/** Apertura de Cuenta Progreso con los valores del simulador. */
export function buildSavingsMessage(amountIn: number, daysIn: number, ea: number, name: string): string {
  const amount = pos(amountIn), days = Math.floor(pos(daysIn));
  const { final, interest } = computeSavings(amount, days, ea);
  return [
    "Hola PRÓSPERA, quiero abrir una Cuenta Progreso (simulación):",
    "",
    `• Monto a invertir: ${formatCOP(amount)}`,
    `• Plazo: ${days} días`,
    `• Tasa de la simulación: ${pct(ea, 2)} E.A.`,
    `• Valor estimado al final: ${formatCOP(final)} (ganancia ${formatCOP(interest)})`,
    "",
    `Nombre: ${name.trim() || "—"}`,
    "Entiendo que los valores son orientativos.",
  ].join("\n");
}
