import { describe, it, expect } from "vitest";
import { suggestPlanId, insurancePlans } from "./insurance";

describe("suggestPlanId", () => {
  it("usado económico → esencial; usado de valor → completo", () => {
    expect(suggestPlanId(60_000_000, "Usado")).toBe("esencial");
    expect(suggestPlanId(130_000_000, "Usado")).toBe("completo");
  });
  it("nuevo de alto valor → premium; nuevo estándar → completo", () => {
    expect(suggestPlanId(180_000_000, "Nuevo")).toBe("premium");
    expect(suggestPlanId(90_000_000, "Nuevo")).toBe("completo");
  });
  it("siempre devuelve un id de plan existente", () => {
    const ids = insurancePlans.map((p) => p.id);
    for (const v of [40_000_000, 120_000_000, 150_000_000, 300_000_000]) {
      for (const c of ["Nuevo", "Usado"] as const) {
        expect(ids).toContain(suggestPlanId(v, c));
      }
    }
  });
});
