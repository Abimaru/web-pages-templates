// Valida catalogo/data/quality-passports.json: estados permitidos, estructura y frescura.
// Falla (exit 1) si el pasaporte es inválido → el CI no debe desplegar (§34).

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FILE = join(ROOT, "catalogo", "data", "quality-passports.json");
const ALLOWED = ["passed", "verified", "pending", "not_assessed", "not_applicable", "partial", "failed"];
const REQUIRED_CHECKS = ["build", "typecheck", "tests", "seo", "openGraph", "favicon", "demoDisclosure", "accessibility", "security"];

const errors = [];
if (!existsSync(FILE)) {
  console.error("✗ Falta quality-passports.json (ejecuta generate:quality-passports).");
  process.exit(1);
}
const data = JSON.parse(readFileSync(FILE, "utf8"));

if (!data.generatedAt || isNaN(Date.parse(data.generatedAt))) errors.push("generatedAt inválido o ausente");
if (!data.commit || typeof data.commit !== "string") errors.push("commit ausente");
if (!Array.isArray(data.projects) || !data.projects.length) errors.push("projects vacío");

for (const p of data.projects || []) {
  const tag = p.id || "?";
  if (!p.id || !p.name) errors.push(`${tag}: falta id o name`);
  if (!p.checks) { errors.push(`${tag}: falta checks`); continue; }
  for (const c of REQUIRED_CHECKS) {
    if (!(c in p.checks)) { errors.push(`${tag}: falta check "${c}"`); continue; }
    const v = p.checks[c];
    if (c === "tests") {
      if (!v || ALLOWED.indexOf(v.status) < 0) errors.push(`${tag}: tests.status inválido`);
      if (typeof v.count !== "number" || v.count < 0) errors.push(`${tag}: tests.count inválido`);
    } else if (ALLOWED.indexOf(v) < 0) {
      errors.push(`${tag}: check "${c}" con estado inválido "${v}"`);
    }
  }
}

if (errors.length) {
  console.error("✗ Quality Passport inválido:");
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(`✓ Quality Passport válido · ${data.projects.length} proyectos · commit ${data.commit}`);
