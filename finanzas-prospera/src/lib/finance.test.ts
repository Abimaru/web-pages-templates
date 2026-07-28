import { describe, it, expect } from "vitest";
import {
  computeCredit,
  computeSavings,
  savingsSeries,
  savingsTerms,
  formatCOP,
  CREDIT_MONTHLY_RATE,
} from "./finance";

const finite = (n: number) => Number.isFinite(n);

describe("computeCredit", () => {
  it("cuota fija estándar positiva y coherente (plazos 12/36/60/84)", () => {
    for (const m of [12, 36, 60, 84]) {
      const c = computeCredit(10_000_000, m);
      expect(finite(c.cuota)).toBe(true);
      expect(c.cuota).toBeGreaterThan(0);
      expect(c.total).toBeGreaterThan(10_000_000);
      expect(c.interest).toBeGreaterThan(0);
      expect(c.total).toBeCloseTo(c.cuota * m, 2);
    }
  });

  it("monto cero → todo cero", () => {
    expect(computeCredit(0, 24)).toEqual({ cuota: 0, total: 0, interest: 0 });
  });

  it("plazo cero → todo cero (sin división por cero)", () => {
    const c = computeCredit(5_000_000, 0);
    expect(c).toEqual({ cuota: 0, total: 0, interest: 0 });
  });

  it("tasa cero → cuota lineal sin interés", () => {
    const c = computeCredit(1_200_000, 12, 0);
    expect(c.cuota).toBeCloseTo(100_000, 6);
    expect(c.total).toBe(1_200_000);
    expect(c.interest).toBe(0);
  });

  it("tasa negativa → tratada como cero", () => {
    const c = computeCredit(1_200_000, 12, -0.02);
    expect(c.interest).toBe(0);
  });

  it("monto no finito → todo cero", () => {
    expect(computeCredit(Infinity, 24)).toEqual({ cuota: 0, total: 0, interest: 0 });
    expect(computeCredit(NaN, 24)).toEqual({ cuota: 0, total: 0, interest: 0 });
  });

  it("mayor plazo ⇒ menor cuota pero mayor interés total", () => {
    const corto = computeCredit(10_000_000, 12);
    const largo = computeCredit(10_000_000, 60);
    expect(largo.cuota).toBeLessThan(corto.cuota);
    expect(largo.interest).toBeGreaterThan(corto.interest);
  });
});

describe("computeSavings", () => {
  it("crece con el tiempo y la tasa", () => {
    const s = computeSavings(1_000_000, 360, 0.125);
    expect(s.final).toBeGreaterThan(1_000_000);
    expect(s.interest).toBeCloseTo(s.final - 1_000_000, 6);
  });
  it("monto cero → cero", () => {
    expect(computeSavings(0, 360, 0.125)).toEqual({ final: 0, interest: 0 });
  });
  it("días cero → sin crecimiento", () => {
    const s = computeSavings(1_000_000, 0, 0.125);
    expect(s.final).toBe(1_000_000);
    expect(s.interest).toBe(0);
  });
  it("valores no finitos → seguro (no NaN)", () => {
    const s = computeSavings(NaN, 360, 0.125);
    expect(finite(s.final)).toBe(true);
    expect(s.final).toBe(0);
  });
});

describe("savingsSeries", () => {
  it("devuelve points+1 puntos, monótonos crecientes con ea>0", () => {
    const arr = savingsSeries(1_000_000, 360, 0.125, 12);
    expect(arr).toHaveLength(13);
    for (let i = 1; i < arr.length; i++) {
      expect(arr[i].value).toBeGreaterThanOrEqual(arr[i - 1].value);
    }
  });
});

describe("datos y formato", () => {
  it("savingsTerms: días y ea crecientes, ea válida", () => {
    for (let i = 1; i < savingsTerms.length; i++) {
      expect(savingsTerms[i].days).toBeGreaterThan(savingsTerms[i - 1].days);
      expect(savingsTerms[i].ea).toBeGreaterThan(savingsTerms[i - 1].ea);
      expect(savingsTerms[i].ea).toBeGreaterThan(0);
      expect(savingsTerms[i].ea).toBeLessThan(1);
    }
  });
  it("formatCOP redondea y usa separador de miles", () => {
    expect(formatCOP(1234567.89)).toBe("$1.234.568");
    expect(formatCOP(0)).toBe("$0");
  });
  it("CREDIT_MONTHLY_RATE es una tasa mensual razonable", () => {
    expect(CREDIT_MONTHLY_RATE).toBeGreaterThan(0);
    expect(CREDIT_MONTHLY_RATE).toBeLessThan(0.1);
  });
});
