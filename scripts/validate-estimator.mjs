// Valida la calculadora de la landing (catalogo/estimator.js + config.js):
// - metas apuntan a planes existentes con priceMin válido y priceMax > priceMin (o null);
// - el estimado respeta los límites del plan y no baja al agregar tamaño/extras;
// - ids desconocidos devuelven null; el mensaje incluye la selección.
// Falla (exit 1) si algo no cuadra → el CI no debe desplegar.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const win = {};
for (const f of ["catalogo/config.js", "catalogo/estimator.js"]) {
  // eslint-disable-next-line no-new-func
  new Function("window", readFileSync(join(ROOT, f), "utf8"))(win);
}
const CFG = win.SITE_CONFIG;
const E = win.Estimator;

const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };

const calc = CFG.calculator;
check(!!calc, "config.js: falta calculator");
const plans = CFG.pricing.plans;

for (const g of calc.goals) {
  const p = plans.find((x) => x.id === g.plan);
  check(!!p, `meta "${g.id}": plan "${g.plan}" no existe`);
  if (!p) continue;
  check(p.priceMin > 0, `plan "${p.id}": priceMin inválido`);
  check(p.priceMax === null || p.priceMax > p.priceMin, `plan "${p.id}": priceMax debe ser null o mayor que priceMin`);
}
for (const w of [...calc.sizes, ...calc.extras]) {
  check(Number.isFinite(w.weight) && w.weight >= 0 && w.weight <= 1, `peso inválido en "${w.id}"`);
}
check(new Set(calc.goals.map((g) => g.id)).size === calc.goals.length, "ids de metas duplicados");

const allExtras = calc.extras.map((e) => e.id);
for (const g of calc.goals) {
  const plan = plans.find((p) => p.id === g.plan);
  if (!plan) continue;
  let prev = null;
  for (const s of calc.sizes) {
    for (const ex of [[], allExtras]) {
      const r = E.estimate(CFG, { goal: g.id, size: s.id, extras: ex });
      check(!!r, `estimate null para ${g.id}/${s.id}`);
      if (!r) continue;
      check(r.min >= plan.priceMin, `${g.id}/${s.id}: min por debajo del plan`);
      if (plan.priceMax !== null) check(r.max <= plan.priceMax && r.max >= r.min, `${g.id}/${s.id}: rango fuera de límites`);
      else check(r.openEnded && r.max === null, `${g.id}/${s.id}: plan abierto debe devolver max null`);
    }
    const none = E.estimate(CFG, { goal: g.id, size: s.id, extras: [] });
    const all = E.estimate(CFG, { goal: g.id, size: s.id, extras: allExtras });
    check(all.min >= none.min && (all.max ?? Infinity) >= (none.max ?? Infinity), `${g.id}/${s.id}: agregar extras no puede bajar el estimado`);
    if (prev) check(none.min >= prev.min, `${g.id}: un tamaño mayor no puede bajar el mínimo`);
    prev = none;
  }
}

check(E.estimate(CFG, { goal: "nope", size: calc.sizes[0].id }) === null, "meta desconocida debe dar null");
check(E.estimate(CFG, { goal: calc.goals[0].id, size: "nope" }) === null, "tamaño desconocido debe dar null");
const ok = E.estimate(CFG, { goal: calc.goals[1].id, size: calc.sizes[1].id, extras: ["marca", "no-existe"] });
check(!!ok, "extras desconocidos deben ignorarse");
if (ok) {
  const msg = E.buildMessage(CFG, { goal: calc.goals[1].id, size: calc.sizes[1].id, extras: ["marca"] }, ok);
  check(msg.includes(calc.goals[1].label) && msg.includes("Estimado orientativo"), "mensaje incompleto");
}

if (errors.length) {
  console.error("✗ Estimador inválido:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`✓ Estimador válido · ${calc.goals.length} metas × ${calc.sizes.length} tamaños × extras`);
