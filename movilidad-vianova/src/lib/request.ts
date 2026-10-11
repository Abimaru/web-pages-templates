import { formatCOP, formatPct } from "./format";
import { monthlyToEA, type EffortLevel } from "./finance";

/** Número del asesor/concesionario real. Vacío en la demo: WhatsApp deja elegir el chat. */
export const STORE_WHATSAPP = "";

export const whatsappUrl = (message: string) => `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;

/** Valor positivo y finito, o 0: el mensaje nunca muestra NaN ni montos negativos. */
const pos = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);

const EFFORT: Record<EffortLevel, string> = { comodo: "cómodo", moderado: "moderado", alto: "alto", "sin-dato": "sin dato" };

export type SimulationInput = {
  name: string;
  value: number; type: string; condition: string;
  down: number; months: number; rateMonthly: number;
  cuota: number; total: number;
  planName: string; effort: EffortLevel;
};

/** Simulación de "crédito por monto" lista para enviar a un asesor. No incluye ingresos. */
export function buildSimulationMessage(i: SimulationInput): string {
  return [
    "Hola VíaNova, quiero avanzar con esta simulación de crédito:",
    "",
    `• Vehículo: ${i.type} ${i.condition.toLowerCase()} de ${formatCOP(pos(i.value))}`,
    `• Cuota inicial: ${formatCOP(pos(i.down))}`,
    `• Plazo: ${Math.floor(pos(i.months))} meses`,
    `• Cuota mensual estimada: ${formatCOP(pos(i.cuota))} (total ${formatCOP(pos(i.total))})`,
    `• Tasa de la simulación: ${formatPct(pos(i.rateMonthly), 2)} M.V. (≈ ${formatPct(monthlyToEA(pos(i.rateMonthly)), 1)} E.A.)`,
    `• Seguro sugerido: plan ${i.planName}`,
    `• Esfuerzo cuota/ingreso: ${EFFORT[i.effort]}`,
    "",
    `Nombre: ${i.name.trim() || "—"}`,
    "Entiendo que es una simulación orientativa, sujeta a análisis.",
  ].join("\n");
}

export type ApplicationSummary = {
  name: string; city: string;
  vehicleName: string; vehiclePrice: number; downPct: number; plazo: number;
  cuota: number; planName: string; channel: string;
};

/**
 * Resumen de la solicitud por pasos. A propósito NO incluye documento de identidad, ingresos ni correo:
 * son datos sensibles que se piden por un canal seguro, no por un chat.
 */
export function buildApplicationMessage(a: ApplicationSummary): string {
  return [
    "Hola VíaNova, completé la solicitud de financiación (demo). Este es mi resumen:",
    "",
    `• Vehículo: ${a.vehicleName} (${formatCOP(pos(a.vehiclePrice))})`,
    `• Cuota inicial: ${Math.round(pos(a.downPct) * 100)}%`,
    `• Plazo: ${Math.floor(pos(a.plazo))} meses`,
    `• Cuota estimada: ${formatCOP(pos(a.cuota))}`,
    `• Protección: plan ${a.planName}`,
    `• Contacto preferido: ${a.channel}`,
    "",
    `Nombre: ${a.name.trim() || "—"}`,
    ...(a.city.trim() ? [`Ciudad: ${a.city.trim()}`] : []),
    "Mis datos de identidad e ingresos los comparto por un canal seguro.",
  ].join("\n");
}
