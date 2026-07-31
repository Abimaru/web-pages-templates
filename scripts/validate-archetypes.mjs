// Valida catalogo/archetypes.js contra catalogo/templates.js:
// - cada modelo tiene un arquetipo; no hay arquetipos huérfanos;
// - cada arquetipo tiene los campos requeridos y una complejidad válida.
// Falla (exit 1) si algo no cuadra → el CI no debe desplegar (§34).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadWindow(files) {
  const win = {};
  for (const f of files) {
    // eslint-disable-next-line no-new-func
    new Function("window", readFileSync(join(ROOT, f), "utf8"))(win);
  }
  return win;
}

const w = loadWindow(["catalogo/templates.js", "catalogo/archetypes.js"]);
const MODELS = w.TEMPLATES || [];
const ARCH = w.ARCHETYPES || {};
const COMPLEXITY = ["essential", "commercial", "application", "enterprise"];
const REQ_ARRAYS = ["users", "processes", "capabilities", "integrations", "dataTypes", "risks", "controls", "implementationPath", "relatedServices"];

const errors = [];
const ids = MODELS.map((m) => m.id);

// Cada modelo tiene arquetipo
for (const id of ids) if (!ARCH[id]) errors.push(`Modelo "${id}" sin arquetipo`);
// No hay arquetipos huérfanos
for (const key of Object.keys(ARCH)) if (ids.indexOf(key) < 0) errors.push(`Arquetipo "${key}" no corresponde a ningún modelo`);

// Campos de cada arquetipo
for (const [key, a] of Object.entries(ARCH)) {
  if (!a.label || typeof a.label !== "string") errors.push(`${key}: falta label`);
  if (!a.problem || typeof a.problem !== "string") errors.push(`${key}: falta problem`);
  if (COMPLEXITY.indexOf(a.complexity) < 0) errors.push(`${key}: complexity inválida "${a.complexity}"`);
  for (const arr of REQ_ARRAYS) {
    if (!Array.isArray(a[arr]) || !a[arr].length) errors.push(`${key}: "${arr}" vacío o ausente`);
  }
}

if (errors.length) {
  console.error("✗ Arquetipos inválidos:");
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(`✓ Arquetipos válidos · ${Object.keys(ARCH).length} arquetipos para ${ids.length} modelos`);
