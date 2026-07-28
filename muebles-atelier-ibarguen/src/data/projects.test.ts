import { describe, it, expect } from "vitest";
import { projects } from "./projects";

const CATEGORIES = ["Comedor", "Sala", "Dormitorio", "Oficina"];

describe("projects (Atelier)", () => {
  it("hay proyectos y sus slugs son únicos", () => {
    expect(projects.length).toBeGreaterThan(0);
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("cada proyecto tiene categoría válida, portada y galería no vacía", () => {
    for (const p of projects) {
      expect(CATEGORIES).toContain(p.category);
      expect(p.cover).toMatch(/^https?:\/\/\S+$/);
      expect(p.gallery.length).toBeGreaterThan(0);
      expect(p.gallery.every((g) => /^https?:\/\/\S+$/.test(g))).toBe(true);
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
    }
  });
});
