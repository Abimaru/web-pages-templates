import { describe, it, expect } from "vitest";
import { images } from "./images";

function urls(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(urls);
  if (value && typeof value === "object") return Object.values(value).flatMap(urls);
  return [];
}

describe("images (VITALIS)", () => {
  const all = urls(images);
  it("todas las imágenes son URLs https válidas", () => {
    expect(all.length).toBeGreaterThan(0);
    for (const u of all) expect(u).toMatch(/^https:\/\/\S+$/);
  });
  it("existen las 4 categorías", () => {
    expect(Object.keys(images.categoria)).toEqual(
      expect.arrayContaining(["medicamentos", "vitaminas", "dermo", "bebe"])
    );
  });
});
