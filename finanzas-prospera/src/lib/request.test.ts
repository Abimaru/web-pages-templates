import { describe, it, expect } from "vitest";
import { buildCreditMessage, buildSavingsMessage, whatsappUrl } from "./request";
import { computeCredit, computeSavings, formatCOP } from "./finance";

describe("solicitudes por WhatsApp (PRÓSPERA)", () => {
  it("el mensaje de crédito trae monto, plazo, cuota y total consistentes con el simulador", () => {
    const { cuota, total } = computeCredit(5_000_000, 24);
    const msg = buildCreditMessage(5_000_000, 24, " Ana ");
    expect(msg).toContain("Monto: " + formatCOP(5_000_000));
    expect(msg).toContain("Plazo: 24 meses");
    expect(msg).toContain("Cuota mensual estimada: " + formatCOP(cuota));
    expect(msg).toContain("Total a pagar: " + formatCOP(total));
    expect(msg).toContain("1,9% M.V.");
    expect(msg).toContain("Nombre: Ana");
    expect(msg).toContain("orientativos");
  });

  it("el mensaje de ahorro trae plazo, tasa y valor final consistentes", () => {
    const { final } = computeSavings(3_000_000, 360, 0.125);
    const msg = buildSavingsMessage(3_000_000, 360, 0.125, "Leo");
    expect(msg).toContain("Plazo: 360 días");
    expect(msg).toContain("12,50% E.A.");
    expect(msg).toContain("Valor estimado al final: " + formatCOP(final));
    expect(msg).toContain("Nombre: Leo");
  });

  it("sin nombre usa guion y con valores inválidos no produce NaN", () => {
    expect(buildCreditMessage(0, 0, "  ")).toContain("Nombre: —");
    for (const m of [buildCreditMessage(NaN, -3, "x"), buildSavingsMessage(-5, NaN, NaN, "x")]) {
      expect(m).not.toContain("NaN");
      expect(m).not.toContain("Infinity");
    }
  });

  it("la URL codifica el texto y la demo no fija número", () => {
    expect(whatsappUrl("a b&c")).toBe("https://wa.me/?text=a%20b%26c");
  });
});
