import { describe, it, expect } from "vitest";
import {
  amortization,
  financedAmount,
  estimateMonthly,
  scenarios,
  effortLevel,
  carteraCompare,
  monthlyToEA,
  DEFAULT_RATE_MONTHLY,
} from "./finance";

const finite = (n: number) => Number.isFinite(n);

describe("amortization", () => {
  it("cuota fija estándar es positiva y coherente (plazos 12/36/60/84)", () => {
    for (const m of [12, 36, 60, 84]) {
      const a = amortization(30_000_000, m, DEFAULT_RATE_MONTHLY);
      expect(finite(a.cuota)).toBe(true);
      expect(a.cuota).toBeGreaterThan(0);
      expect(a.total).toBeGreaterThan(30_000_000); // con interés, total > principal
      expect(a.interest).toBeGreaterThan(0);
      // El total ~ cuota * meses
      expect(a.total).toBeCloseTo(a.cuota * m, 2);
    }
  });

  it("principal cero → todo cero", () => {
    expect(amortization(0, 60, DEFAULT_RATE_MONTHLY)).toEqual({ cuota: 0, total: 0, interest: 0 });
  });

  it("principal negativo se trata como cero", () => {
    expect(amortization(-5000, 60, DEFAULT_RATE_MONTHLY)).toEqual({ cuota: 0, total: 0, interest: 0 });
  });

  it("plazo cero o negativo → todo cero", () => {
    expect(amortization(1_000_000, 0, DEFAULT_RATE_MONTHLY)).toEqual({ cuota: 0, total: 0, interest: 0 });
    expect(amortization(1_000_000, -12, DEFAULT_RATE_MONTHLY)).toEqual({ cuota: 0, total: 0, interest: 0 });
  });

  it("tasa cero → cuota lineal sin interés", () => {
    const a = amortization(1_200_000, 12, 0);
    expect(a.cuota).toBeCloseTo(100_000, 6);
    expect(a.total).toBe(1_200_000);
    expect(a.interest).toBe(0);
  });

  it("tasa negativa se trata como cero (sin interés)", () => {
    const a = amortization(1_200_000, 12, -0.05);
    expect(a.interest).toBe(0);
    expect(a.total).toBe(1_200_000);
  });

  it("valores no finitos → todo cero", () => {
    expect(amortization(Infinity, 60, DEFAULT_RATE_MONTHLY)).toEqual({ cuota: 0, total: 0, interest: 0 });
    expect(amortization(NaN, 60, DEFAULT_RATE_MONTHLY)).toEqual({ cuota: 0, total: 0, interest: 0 });
  });
});

describe("financedAmount", () => {
  it("valor - cuota inicial", () => {
    expect(financedAmount(50_000_000, 10_000_000)).toBe(40_000_000);
  });
  it("cuota inicial mayor al valor → 0 (nunca negativo)", () => {
    expect(financedAmount(20_000_000, 30_000_000)).toBe(0);
  });
  it("cuota inicial cero → todo el valor", () => {
    expect(financedAmount(20_000_000, 0)).toBe(20_000_000);
  });
});

describe("estimateMonthly", () => {
  it("devuelve una cuota finita positiva", () => {
    const c = estimateMonthly(60_000_000);
    expect(finite(c)).toBe(true);
    expect(c).toBeGreaterThan(0);
  });
});

describe("scenarios", () => {
  it("genera 3 escenarios; menor plazo ⇒ mayor cuota", () => {
    const s = scenarios(60_000_000, 12_000_000, 4_000_000);
    expect(s).toHaveLength(3);
    const baja = s.find((x) => x.key === "baja")!;
    const rapido = s.find((x) => x.key === "rapido")!;
    expect(baja.months).toBeGreaterThan(rapido.months);
    expect(rapido.cuota).toBeGreaterThan(baja.cuota);
    // El total incluye la cuota inicial
    expect(baja.total).toBeGreaterThan(0);
  });

  it("ingreso cero → effortRatio 0 (sin división por cero)", () => {
    const s = scenarios(60_000_000, 0, 0);
    for (const x of s) expect(x.effortRatio).toBe(0);
  });

  it("cuota inicial mayor al valor → escenarios en cero", () => {
    const s = scenarios(20_000_000, 30_000_000, 3_000_000);
    for (const x of s) expect(x.cuota).toBe(0);
  });
});

describe("effortLevel", () => {
  it("cómodo ≤ 0.3, moderado ≤ 0.45, alto > 0.45", () => {
    expect(effortLevel(300, 1000).level).toBe("comodo");
    expect(effortLevel(400, 1000).level).toBe("moderado");
    expect(effortLevel(600, 1000).level).toBe("alto");
  });
  it("ingreso cero → sin-dato", () => {
    expect(effortLevel(500, 0).level).toBe("sin-dato");
  });
});

describe("carteraCompare", () => {
  it("con mejor tasa a igual plazo, hay ahorro total", () => {
    const r = carteraCompare({ balance: 20_000_000, currentPayment: 900_000, remainingMonths: 30 });
    expect(finite(r.newPayment)).toBe(true);
    expect(r.totalDiff).toBeGreaterThan(0); // ahorro
  });
  it("plazo nuevo mayor marca longerTerm", () => {
    const r = carteraCompare({ balance: 20_000_000, currentPayment: 900_000, remainingMonths: 24, newMonths: 48 });
    expect(r.longerTerm).toBe(true);
  });
  it("un plazo nuevo muy largo puede costar más en total (totalDiff negativo)", () => {
    const r = carteraCompare({ balance: 20_000_000, currentPayment: 300_000, remainingMonths: 12, newMonths: 84 });
    expect(r.totalDiff).toBeLessThan(0);
  });
  it("deriva la cuota actual desde la tasa mensual indicada", () => {
    const r = carteraCompare({ balance: 30_000_000, currentRate: 0.02, remainingMonths: 36 });
    expect(finite(r.currentPayment)).toBe(true);
    expect(r.currentPayment).toBeGreaterThan(0);
    // Con interés (2% mensual), la cuota supera el simple saldo/plazo
    expect(r.currentPayment).toBeGreaterThan(30_000_000 / 36);
  });
});

describe("monthlyToEA", () => {
  it("convierte tasa mensual a efectiva anual", () => {
    expect(monthlyToEA(0.0135)).toBeCloseTo(Math.pow(1.0135, 12) - 1, 10);
  });
});
