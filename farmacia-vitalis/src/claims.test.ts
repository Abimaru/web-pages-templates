import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * VITALIS es una demo de farmacia (sector regulado): no debe prometer tiempos de entrega, resultados de salud,
 * descuentos concretos ni sustituir al médico. Esta prueba evita que esas frases vuelvan a la plantilla.
 */
const FORBIDDEN: [RegExp, string][] = [
  [/\b\d+ ?min(utos)?\b/i, "promesa de tiempo de entrega"],
  [/24\/7/, "disponibilidad absoluta"],
  [/me cambi[oó] la vida|nunca m[aá]s|no fallar ni un d[ií]a/i, "promesa o testimonio de resultado de salud"],
  [/\d+ ?% de descuento/i, "descuento concreto"],
  [/ahorra en cada/i, "promesa de ahorro"],
  [/farmac[eé]uticos de verdad/i, "afirmación de respaldo no verificable"],
  [/r[aá]pido, seguro/i, "afirmación absoluta"],
  [/garantiz|100 ?%/i, "garantía o absoluto"],
  [/\bcura(r|n|s)?\b/i, "promesa terapéutica"],
];

const root = __dirname;
const files = [
  join(root, "App.tsx"),
  ...readdirSync(join(root, "components")).filter((f) => f.endsWith(".tsx")).map((f) => join(root, "components", f)),
];

describe("textos de VITALIS (farmacia)", () => {
  for (const f of files) {
    it(`sin promesas en ${f.split("/src/")[1]}`, () => {
      const text = readFileSync(f, "utf8");
      for (const [re, why] of FORBIDDEN) expect(re.test(text), `${why}: ${re}`).toBe(false);
    });
  }
});
