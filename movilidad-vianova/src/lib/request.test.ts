import { describe, it, expect } from "vitest";
import { buildSimulationMessage, buildApplicationMessage, whatsappUrl } from "./request";
import { amortization } from "./finance";
import { formatCOP } from "./format";

const base = { name: " Ana ", value: 90_000_000, type: "SUV", condition: "Nuevo", down: 18_000_000, months: 60, rateMonthly: 0.0135, planName: "Completo", effort: "comodo" as const };

describe("mensajes por WhatsApp (VíaNova)", () => {
  it("la simulación incluye vehículo, inicial, plazo, cuota, tasa y seguro, sin ingresos", () => {
    const a = amortization(72_000_000, 60, 0.0135);
    const msg = buildSimulationMessage({ ...base, cuota: a.cuota, total: a.total });
    expect(msg).toContain("SUV nuevo de " + formatCOP(90_000_000));
    expect(msg).toContain("Cuota inicial: " + formatCOP(18_000_000));
    expect(msg).toContain("Plazo: 60 meses");
    expect(msg).toContain("Cuota mensual estimada: " + formatCOP(a.cuota));
    expect(msg).toContain("1.35% M.V.");
    expect(msg).toContain("plan Completo");
    expect(msg).toContain("Esfuerzo cuota/ingreso: cómodo");
    expect(msg).toContain("Nombre: Ana");
    expect(msg.toLowerCase()).not.toContain("ingreso: $");
  });

  it("la solicitud por pasos NO filtra documento, ingresos ni correo", () => {
    const msg = buildApplicationMessage({ name: "Leo", city: "Cali", vehicleName: "Aurora SUV", vehiclePrice: 120_000_000, downPct: 0.2, plazo: 60, cuota: 2_100_000, planName: "Completo", channel: "WhatsApp" });
    expect(msg).toContain("Aurora SUV");
    expect(msg).toContain("Cuota inicial: 20%");
    expect(msg).toContain("Ciudad: Cali");
    expect(msg).toContain("canal seguro");
    for (const secret of ["documento", "cédula", "correo", "@"]) expect(msg.toLowerCase()).not.toContain(secret.replace("é", "é"));
  });

  it("entradas inválidas no producen NaN, Infinity ni negativos", () => {
    const m1 = buildSimulationMessage({ ...base, value: NaN, down: -5, months: NaN, rateMonthly: NaN, cuota: Infinity, total: -1 });
    const m2 = buildApplicationMessage({ name: "", city: "", vehicleName: "X", vehiclePrice: NaN, downPct: NaN, plazo: -2, cuota: NaN, planName: "P", channel: "C" });
    for (const m of [m1, m2]) {
      expect(m).not.toMatch(/NaN|Infinity|\$-/);
    }
    expect(m2).toContain("Nombre: —");
  });

  it("la URL codifica el texto y no fija número", () => {
    expect(whatsappUrl("a b&c")).toBe("https://wa.me/?text=a%20b%26c");
  });
});
