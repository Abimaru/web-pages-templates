// ⚠️ Tasas ILUSTRATIVAS de referencia (estilo mercado colombiano). Este es un
// prototipo de demostración: NO constituye una oferta ni asesoría financiera.

export const formatCOP = (n: number) =>
  "$" + Math.round(n).toLocaleString("es-CO");

/* ---------- AHORRO: Cuenta Progreso (a plazo, en días) ---------- */
export type SavingsTerm = { days: number; ea: number }; // ea = tasa efectiva anual

export const savingsTerms: SavingsTerm[] = [
  { days: 60, ea: 0.090 },
  { days: 90, ea: 0.0975 },
  { days: 120, ea: 0.105 },
  { days: 180, ea: 0.1125 },
  { days: 360, ea: 0.125 },
  { days: 720, ea: 0.1375 },
];

export function computeSavings(amount: number, days: number, ea: number) {
  const a = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const d = Number.isFinite(days) && days > 0 ? days : 0;
  const rate = Number.isFinite(ea) && ea > -1 ? ea : 0;
  const final = a * Math.pow(1 + rate, d / 365);
  return { final, interest: final - a };
}

// Serie de valor mes a mes (para el gráfico de crecimiento)
export function savingsSeries(amount: number, days: number, ea: number, points = 12) {
  const arr: { t: number; value: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const d = (days / points) * i;
    arr.push({ t: d, value: amount * Math.pow(1 + ea, d / 365) });
  }
  return arr;
}

/* ---------- CRÉDITO: cuota fija (sistema francés) ---------- */
export const CREDIT_MONTHLY_RATE = 0.019; // 1.9% mensual (~25.3% E.A. aprox.)
export const creditEA = Math.pow(1 + CREDIT_MONTHLY_RATE, 12) - 1;

export function computeCredit(amount: number, months: number, r = CREDIT_MONTHLY_RATE) {
  const p = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const n = Number.isFinite(months) && months > 0 ? Math.floor(months) : 0;
  if (p <= 0 || n <= 0) return { cuota: 0, total: 0, interest: 0 };
  // Tasa cero o inválida → cuota lineal (sin intereses).
  if (!Number.isFinite(r) || r <= 0) {
    const cuota = p / n;
    return { cuota, total: p, interest: 0 };
  }
  const cuota = (p * r) / (1 - Math.pow(1 + r, -n));
  const total = cuota * n;
  return { cuota, total, interest: total - p };
}
