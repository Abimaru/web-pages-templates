import { describe, it, expect } from "vitest";
import { recommendFor, getProblem } from "./recommender";
import { problems } from "../data/problems";
import { packages } from "../data/packages";
import { cases } from "../data/cases";
import { capabilities } from "../data/capabilities";

describe("recommender", () => {
  it("resuelve cada problema en una recomendación válida", () => {
    for (const p of problems) {
      const rec = recommendFor(p.id);
      expect(rec, `problema ${p.id}`).not.toBeNull();
      // Al menos un paquete recomendado y todos existen en el catálogo
      expect(rec!.packages.length).toBeGreaterThan(0);
      for (const pkg of rec!.packages) {
        expect(packages.some((x) => x.id === pkg.id)).toBe(true);
      }
      // Capacidad y caso relacionados existen
      expect(rec!.capability).not.toBeNull();
      expect(capabilities.some((c) => c.id === rec!.capability!.id)).toBe(true);
      expect(rec!.relatedCase).not.toBeNull();
      expect(cases.some((c) => c.id === rec!.relatedCase!.id)).toBe(true);
      // Ruta y CTA presentes
      expect(rec!.route.length).toBeGreaterThan(0);
      expect(rec!.cta.label).toBeTruthy();
      expect(rec!.cta.target).toMatch(/^#/);
    }
  });

  it("devuelve null ante un problema inexistente", () => {
    expect(recommendFor("no-existe")).toBeNull();
    expect(getProblem("no-existe")).toBeNull();
  });

  it("todos los ids de problema son únicos", () => {
    const ids = problems.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("todo packageId referenciado existe (integridad de datos)", () => {
    for (const p of problems) {
      for (const id of p.packageIds) {
        expect(packages.some((pkg) => pkg.id === id), `packageId ${id} en ${p.id}`).toBe(true);
      }
      expect(capabilities.some((c) => c.id === p.capabilityId)).toBe(true);
      expect(cases.some((c) => c.id === p.caseId)).toBe(true);
    }
  });
});
