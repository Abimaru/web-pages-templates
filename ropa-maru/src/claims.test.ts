import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/** MARÚ: sin estadísticas inventadas, garantías absolutas ni promesas de tiempo. Evita que vuelvan a la plantilla. */
const FORBIDDEN: [RegExp, string][] = [
  [/\b\d+ ?min(utos)?(?![-\w])/i, "promesa de tiempo"],
  [/24\/7/, "disponibilidad absoluta"],
  [/100 ?%/, "garantía o absoluto"],
  [/"\d[\d.,]*[KkM]?\+"/, "estadística inventada (N+)"],
  [/mismo d[ií]a|de por vida|\bpor vida\b|años de oficio|años a la vanguardia/i, "promesa o antigüedad no verificable"],
  [/de por vida|garantiz|garant[ií]a real/i, "garantía absoluta"],
  [/sin inter[eé]s/i, "promesa de financiación"],
  [/lleg[oó] en \d/i, "promesa de entrega"],
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.tsx$/.test(p) ? [p] : [];
  });
}
const files = walk(join(__dirname));

describe("textos de MARÚ", () => {
  for (const f of files) {
    it(`sin promesas en ${f.split(/[\\/](?:src|app)[\\/]/)[1]}`, () => {
      const text = readFileSync(f, "utf8");
      for (const [re, why] of FORBIDDEN) expect(re.test(text), `${why}: ${re}`).toBe(false);
    });
  }
});
