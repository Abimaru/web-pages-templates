import { describe, it, expect } from "vitest";
import {
  normalizeHex, mix, contrast, ensureReadable, accentTheme, cleanName, resolveBrand, readBrandFromSearch,
  brandToSearch, isDefaultBrand, buildInterestMessage, wordmarkParts, DEFAULT_BRAND, MAX_NAME, PRESET_COLORS,
} from "./brand";

describe("marca (Pruébalo con tu marca)", () => {
  it("normaliza hex corto/largo, con o sin #, y rechaza basura", () => {
    expect(normalizeHex("#ABC")).toBe("#aabbcc");
    expect(normalizeHex("c07a86")).toBe("#c07a86");
    expect(normalizeHex(" #FFFFFF ")).toBe("#ffffff");
    for (const bad of ["", "#12", "#12345", "rojo", "#gggggg", "#1234567"]) expect(normalizeHex(bad)).toBeNull();
  });

  it("mezcla y contraste", () => {
    expect(mix("#000000", "#ffffff", 0.5)).toBe("#808080");
    expect(mix("#123456", "#ffffff", 0)).toBe("#123456");
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 0);
    expect(contrast("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
  });

  it("ensureReadable oscurece colores claros hasta contraste ≥ 3 y no toca los oscuros", () => {
    expect(contrast(ensureReadable("#ffee99"), "#ffffff")).toBeGreaterThanOrEqual(3);
    expect(ensureReadable("#1f4e79")).toBe("#1f4e79");
    expect(contrast(ensureReadable("#ffffff"), "#ffffff")).toBeGreaterThanOrEqual(3);
  });

  it("todos los colores sugeridos son legibles sin ajuste", () => {
    for (const c of PRESET_COLORS) expect(contrast(c, "#ffffff")).toBeGreaterThanOrEqual(3);
  });

  it("accentTheme deriva tonos coherentes (deep más oscuro, blush más claro)", () => {
    const t = accentTheme("#2f6f5e");
    expect(t.roseDeep).not.toBe(t.rose);
    expect(contrast(t.roseDeep, "#ffffff")).toBeGreaterThan(contrast(t.rose, "#ffffff"));
    expect(contrast(t.blush, "#000000")).toBeGreaterThan(contrast(t.rose, "#000000"));
    expect(accentTheme("basura").rose).toBe(ensureReadable(DEFAULT_BRAND.color));
  });

  it("cleanName colapsa espacios y limita la longitud", () => {
    expect(cleanName("  Mi   Tienda  ")).toBe("Mi Tienda");
    expect(cleanName("x".repeat(100))).toHaveLength(MAX_NAME);
    expect(cleanName("   ")).toBe("");
  });

  it("resolveBrand cae al valor por defecto con vacíos o inválidos", () => {
    expect(resolveBrand(null)).toEqual({ ...DEFAULT_BRAND, logo: undefined });
    expect(resolveBrand({ name: "  ", color: "zzz" })).toMatchObject(DEFAULT_BRAND);
    expect(resolveBrand({ name: "Luna", color: "#ABC" })).toMatchObject({ name: "Luna", color: "#aabbcc" });
  });

  it("lee y escribe el enlace para compartir (solo lo que cambia; ida y vuelta)", () => {
    expect(readBrandFromSearch("")).toBeNull();
    expect(readBrandFromSearch("?x=1")).toBeNull();
    expect(readBrandFromSearch("?marca=Luna%20Moda&color=%232f6f5e")).toEqual({ name: "Luna Moda", color: "#2f6f5e" });
    expect(readBrandFromSearch("?color=nope&marca=Sol")).toEqual({ name: "Sol" });
    const b = resolveBrand({ name: "Luna & Sol", color: "#2f6f5e" });
    expect(readBrandFromSearch(brandToSearch(b))).toEqual({ name: "Luna & Sol", color: "#2f6f5e" });
    expect(brandToSearch(resolveBrand(null))).toBe("");
    expect(brandToSearch({ ...DEFAULT_BRAND, name: "Luna" })).toBe("?marca=Luna");
  });

  it("detecta la marca por defecto; el logo la vuelve distinta pero no viaja en el enlace", () => {
    expect(isDefaultBrand(resolveBrand(null))).toBe(true);
    const withLogo = resolveBrand({ logo: "data:image/png;base64,AAAA" });
    expect(isDefaultBrand(withLogo)).toBe(false);
    expect(brandToSearch(withLogo)).toBe("");
  });

  it("el mensaje al estudio incluye nombre y color", () => {
    const msg = buildInterestMessage(resolveBrand({ name: "Luna", color: "#2f6f5e" }));
    expect(msg).toContain("Mi negocio: Luna");
    expect(msg).toContain("#2f6f5e");
    expect(msg).not.toContain("logo");
  });

  it("wordmark separa la última letra", () => {
    expect(wordmarkParts("MARÚ")).toEqual({ head: "MAR", tail: "Ú" });
    expect(wordmarkParts("luna")).toEqual({ head: "LUN", tail: "A" });
    expect(wordmarkParts("")).toEqual({ head: "", tail: "" });
  });
});
