import { describe, it, expect } from "vitest";
import { services } from "../app/lib/support";

describe("services (NEXORA)", () => {
  it("hay servicios y sus slugs son únicos", () => {
    expect(services.length).toBeGreaterThan(0);
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cada servicio tiene título, descripción, incluye y precio 'desde'", () => {
    for (const s of services) {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.desc.length).toBeGreaterThan(0);
      expect(s.includes.length).toBeGreaterThan(0);
      // "from" puede ser un precio ($...) o "Cotización" (sin precio inventado)
      expect(s.from).toMatch(/^(\$|Cotiza)/);
      expect(s.turnaround.length).toBeGreaterThan(0);
    }
  });
});
