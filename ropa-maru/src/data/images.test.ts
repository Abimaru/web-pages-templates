import { describe, it, expect } from "vitest";
import { images } from "./images";

function urls(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(urls);
  if (value && typeof value === "object") return Object.values(value).flatMap(urls);
  return [];
}

describe("images (MARÚ)", () => {
  const all = urls(images);
  it("todas las imágenes son URLs https válidas", () => {
    expect(all.length).toBeGreaterThan(0);
    for (const u of all) {
      // Imágenes locales (post-localización): /img/<id>.jpg
      expect(u).toMatch(/\/img\/[\w-]+\.jpg$/);
    }
  });
  it("no hay URLs vacías ni duplicadas obvias en categorías", () => {
    expect(Object.values(images.categoria).every((s) => s.length > 0)).toBe(true);
  });
});
