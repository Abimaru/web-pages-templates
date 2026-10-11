import { describe, it, expect } from "vitest";
import { categories, presets, totalFor, defaultSelection, buildQuoteMessage, sameSelection, whatsappUrl } from "../app/lib/build";

describe("configurador NEXORA", () => {
  it("categorías con opciones y precios válidos", () => {
    const keys = new Set(categories.map((c) => c.key));
    expect(keys.size).toBe(categories.length);
    for (const c of categories) {
      expect(c.options.length).toBeGreaterThan(0);
      for (const o of c.options) expect(o.price).toBeGreaterThanOrEqual(0);
    }
  });

  it("los presets apuntan a índices existentes y tienen todas las categorías", () => {
    for (const p of presets) {
      for (const c of categories) {
        const i = p.sel[c.key];
        expect(Number.isInteger(i)).toBe(true);
        expect(i).toBeGreaterThanOrEqual(0);
        expect(i).toBeLessThan(c.options.length);
      }
    }
  });

  it("el total suma la opción elegida y tolera índices inválidos (usa la primera)", () => {
    const first = categories.reduce((n, c) => n + c.options[0].price, 0);
    expect(totalFor(Object.fromEntries(categories.map((c) => [c.key, 0])))).toBe(first);
    expect(totalFor({})).toBe(first);
    expect(totalFor(Object.fromEntries(categories.map((c) => [c.key, 99])))).toBe(first);
    expect(totalFor(defaultSelection())).toBeGreaterThan(first);
  });

  it("los presets suben de precio de Oficina a Workstation", () => {
    const t = presets.map((p) => totalFor(p.sel));
    expect([...t].sort((a, b) => a - b)).toEqual(t);
  });

  it("detecta si la selección coincide con un preset", () => {
    expect(sameSelection(presets[0].sel, presets[0].sel)).toBe(true);
    expect(sameSelection(presets[0].sel, presets[1].sel)).toBe(false);
  });

  it("el mensaje lista cada componente, el estimado y el nombre", () => {
    const msg = buildQuoteMessage(presets[1].sel, " Sara ");
    for (const c of categories) expect(msg).toContain(c.title);
    expect(msg).toContain("Gamer");
    expect(msg).toContain("Nombre: Sara");
    expect(msg).toContain("referencial");
    expect(whatsappUrl("a b")).toBe("https://wa.me/?text=a%20b");
  });
});

describe("marca personalizada en la cotización", () => {
  it("usa el nombre de la marca (NEXORA por defecto)", () => {
    expect(buildQuoteMessage(presets[0].sel)).toContain("Hola NEXORA");
    expect(buildQuoteMessage(presets[0].sel, "Ana", "Byte Sur")).toContain("Hola Byte Sur");
  });
});
