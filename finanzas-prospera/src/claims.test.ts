import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { demoFacts, savingsTerms, CREDIT_TERMS, CREDIT_MAX } from "./lib/finance";

/**
 * PRÓSPERA es una demo de un sector regulado: el texto no debe prometer velocidad, aprobación, preaprobación,
 * ahorro garantizado ni comparaciones con otras entidades. Esta prueba evita que esas frases vuelvan a la plantilla.
 */
const FORBIDDEN: [RegExp, string][] = [
  [/aprobaci[oó]n en \d+/i, "promesa de tiempo de aprobación"],
  [/\ben \d+ min(utos)?\b/i, "promesa de tiempo (en N minutos)"],
  [/\bse aprueban\b/i, "promesa de aprobación"],
  [/mismo d[ií]a/i, "promesa de desembolso el mismo día"],
  [/\bpreaprobad/i, "oferta preaprobada"],
  [/sin letra peque[ñn]a/i, "afirmación absoluta de transparencia"],
  [/sin papeleo|sin filas/i, "afirmación absoluta de simplicidad"],
  [/m[aá]s que el banco/i, "comparación con otras entidades"],
  [/garantiz/i, "garantía"],
  [/(vigilad[oa]s?|supervisad[oa]s?|regulad[oa]s?) por/i, "afirmación de supervisión propia"],
  [/100% digital/i, "afirmación absoluta de proceso"],
];

const root = join(__dirname);
const files = [
  join(root, "App.tsx"),
  ...readdirSync(join(root, "components")).filter((f) => f.endsWith(".tsx")).map((f) => join(root, "components", f)),
];

describe("textos de PRÓSPERA (sector regulado)", () => {
  for (const f of files) {
    it(`sin promesas en ${f.split("/src/")[1]}`, () => {
      const text = readFileSync(f, "utf8");
      for (const [re, why] of FORBIDDEN) expect(re.test(text), `${why}: ${re}`).toBe(false);
    });
  }
});

describe("cifras de la demo", () => {
  it("salen de los simuladores (no son métricas inventadas)", () => {
    const f = demoFacts();
    expect(f.maxCreditMillions).toBe(CREDIT_MAX / 1_000_000);
    expect(f.maxCreditMonths).toBe(Math.max(...CREDIT_TERMS));
    expect(f.savingsTerms).toBe(savingsTerms.length);
    expect(f.maxSavingsEA).toBeCloseTo(13.75, 5);
  });
});
