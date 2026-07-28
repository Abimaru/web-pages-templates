import { describe, it, expect } from "vitest";
import { games, PLATFORMS, formatCOP } from "../app/lib/games";

describe("games (PIXELVAULT)", () => {
  it("hay juegos y sus slugs son únicos", () => {
    expect(games.length).toBeGreaterThan(0);
    const slugs = games.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("precios positivos, rating 0–5 y plataformas válidas", () => {
    for (const g of games) {
      expect(g.price).toBeGreaterThan(0);
      if (g.oldPrice !== undefined) expect(g.oldPrice).toBeGreaterThan(g.price);
      expect(g.rating).toBeGreaterThanOrEqual(0);
      expect(g.rating).toBeLessThanOrEqual(5);
      expect(g.platforms.length).toBeGreaterThan(0);
      expect(g.platforms.every((p) => (PLATFORMS as readonly string[]).includes(p))).toBe(true);
      expect(g.highlights.length).toBeGreaterThan(0);
    }
  });

  it("formatCOP formatea en pesos con separador de miles", () => {
    expect(formatCOP(189900)).toBe("$189.900");
  });
});
