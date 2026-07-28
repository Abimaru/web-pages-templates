import { describe, it, expect } from "vitest";
import { money, moneyShort, initials, avatarColor, contacts, deals, stages } from "./crm";

describe("helpers (NÚCLEO)", () => {
  it("money formatea en COP", () => {
    expect(money(1000000)).toBe("$1.000.000");
    expect(money(0)).toBe("$0");
  });
  it("moneyShort abrevia millones y miles", () => {
    expect(moneyShort(42_000_000)).toBe("$42.0M");
    expect(moneyShort(9_800)).toBe("$10k");
  });
  it("initials toma hasta 2 iniciales en mayúscula", () => {
    expect(initials("Valentina Ríos")).toBe("VR");
    expect(initials("Mateo")).toBe("M");
  });
  it("avatarColor devuelve un hex de la paleta", () => {
    expect(avatarColor("Ana")).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe("datos (NÚCLEO)", () => {
  it("contactos con ids únicos y valores no negativos", () => {
    const ids = contacts.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(contacts.every((c) => c.value >= 0)).toBe(true);
    expect(contacts.every((c) => c.email.includes("@"))).toBe(true);
  });
  it("cada deal tiene un stage válido e id único", () => {
    const ids = deals.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(deals.every((d) => (stages as readonly string[]).includes(d.stage))).toBe(true);
    expect(deals.every((d) => d.value > 0)).toBe(true);
  });
});
