/**
 * Utilidades financieras — VíaNova (prototipo, valores ILUSTRATIVOS).
 * Funciones puras y testeables. No representan una oferta ni aprobación.
 */

// Tasa mensual ilustrativa de referencia (~17,4% E.A.). Editable.
export const DEFAULT_RATE_MONTHLY = 0.0135;
export const monthlyToEA = (m: number) => Math.pow(1 + m, 12) - 1;

export type Amort = { cuota: number; total: number; interest: number };

/** Cuota fija (sistema francés). Maneja casos límite. */
export function amortization(principal: number, months: number, monthlyRate: number): Amort {
  const p = Math.max(principal, 0);
  if (!Number.isFinite(p) || p <= 0 || months <= 0) {
    return { cuota: 0, total: 0, interest: 0 };
  }
  if (monthlyRate <= 0) {
    const cuota = p / months;
    return { cuota, total: p, interest: 0 };
  }
  const cuota = (p * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  const total = cuota * months;
  return { cuota, total, interest: total - p };
}

/** Monto financiado = valor - cuota inicial (nunca negativo). */
export function financedAmount(value: number, down: number): number {
  return Math.max((value || 0) - (down || 0), 0);
}

/** Cuota mensual estimada rápida (para tarjetas del marketplace). */
export function estimateMonthly(
  price: number,
  downPct = 0.2,
  months = 60,
  rate = DEFAULT_RATE_MONTHLY
): number {
  const principal = financedAmount(price, price * downPct);
  return amortization(principal, months, rate).cuota;
}

/* ---------- Escenarios comparativos ---------- */
export type ScenarioKey = "baja" | "equilibrado" | "rapido";
export type Scenario = {
  key: ScenarioKey;
  label: string;
  months: number;
  cuota: number;
  total: number;
  interest: number;
  effortRatio: number; // cuota / ingreso (0 si ingreso 0)
};

/**
 * Tres escenarios: cuota más baja (plazo largo), equilibrado, págalo rápido.
 * value: valor vehículo · down: cuota inicial · income: ingreso mensual.
 */
export function scenarios(
  value: number,
  down: number,
  income: number,
  rate = DEFAULT_RATE_MONTHLY
): Scenario[] {
  const principal = financedAmount(value, down);
  const defs: { key: ScenarioKey; label: string; months: number }[] = [
    { key: "baja", label: "Cuota más baja", months: 84 },
    { key: "equilibrado", label: "Plan equilibrado", months: 60 },
    { key: "rapido", label: "Págalo más rápido", months: 36 },
  ];
  return defs.map((d) => {
    const a = amortization(principal, d.months, rate);
    return {
      ...d,
      cuota: a.cuota,
      total: a.total + down,
      interest: a.interest,
      effortRatio: income > 0 ? a.cuota / income : 0,
    };
  });
}

/* ---------- Indicador de esfuerzo mensual ---------- */
export type EffortLevel = "comodo" | "moderado" | "alto" | "sin-dato";
export function effortLevel(cuota: number, income: number): { ratio: number; level: EffortLevel } {
  if (!income || income <= 0) return { ratio: 0, level: "sin-dato" };
  const ratio = cuota / income;
  const level: EffortLevel = ratio <= 0.3 ? "comodo" : ratio <= 0.45 ? "moderado" : "alto";
  return { ratio, level };
}

/* ---------- Compra de cartera (antes / después) ---------- */
export type CarteraInput = {
  balance: number; // saldo actual
  currentPayment?: number; // cuota actual (si se conoce)
  currentRate?: number; // tasa mensual actual (deriva la cuota si se provee)
  remainingMonths: number; // plazo restante
  newRate?: number; // tasa mensual nueva ilustrativa
  newMonths?: number; // plazo nuevo
};
export type CarteraResult = {
  currentPayment: number; // cuota actual (dada o derivada de la tasa)
  newPayment: number;
  monthlyDiff: number; // positivo = ahorro mensual
  currentTotal: number;
  newTotal: number;
  totalDiff: number; // positivo = ahorro total (negativo = cuesta más)
  longerTerm: boolean;
};

export function carteraCompare(input: CarteraInput): CarteraResult {
  const { balance, remainingMonths } = input;
  // Si el cliente indica su tasa mensual actual, derivamos la cuota desde ella.
  const currentPayment =
    input.currentRate !== undefined
      ? amortization(balance, remainingMonths, input.currentRate).cuota
      : input.currentPayment ?? 0;
  const newRate = input.newRate ?? DEFAULT_RATE_MONTHLY * 0.85; // ~15% mejor, ilustrativo
  const newMonths = input.newMonths ?? Math.max(remainingMonths, 12);
  const a = amortization(balance, newMonths, newRate);
  const currentTotal = currentPayment * remainingMonths;
  const newTotal = a.total;
  return {
    currentPayment,
    newPayment: a.cuota,
    monthlyDiff: currentPayment - a.cuota,
    currentTotal,
    newTotal,
    totalDiff: currentTotal - newTotal,
    longerTerm: newMonths > remainingMonths,
  };
}
