import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * VíaNova simula financiación (sector regulado): no debe prometer ahorro, aprobación ni tasas como hechos.
 * Esta prueba evita que esas frases vuelvan a la plantilla.
 */
const FORBIDDEN: [RegExp, string][] = [
  [/>\s*Ahorras\b|"Ahorras"/, "promesa de ahorro (usar 'Diferencia a tu favor')"],
  [/aprobaci[oó]n en \d+|se aprueban|preaprobad/i, "promesa de aprobación"],
  [/garantiz/i, "garantía"],
  [/mejor tasa|la tasa m[aá]s baja/i, "afirmación de mejor tasa"],
  [/sin (papeleo|letra peque[ñn]a|filas)/i, "afirmación absoluta de simplicidad"],
];

const root = __dirname;
const dirs = ["sections", "components"];
const files = [
  join(root, "App.tsx"),
  ...dirs.flatMap((d) => readdirSync(join(root, d)).filter((f) => f.endsWith(".tsx")).map((f) => join(root, d, f))),
  join(root, "data", "faqs.ts"),
];

describe("textos de VíaNova (financiación)", () => {
  for (const f of files) {
    it(`sin promesas en ${f.split("/src/")[1]}`, () => {
      const text = readFileSync(f, "utf8");
      for (const [re, why] of FORBIDDEN) expect(re.test(text), `${why}: ${re}`).toBe(false);
    });
  }
});
