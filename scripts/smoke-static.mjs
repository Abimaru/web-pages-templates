// Smoke estático (§14, sin navegador): tras build, verifica que cada demo tiene
// su salida (index.html + OG + favicon) y que el sitemap y el catálogo enlazan todo.
// No reemplaza pruebas E2E; detecta regresiones de ensamblado y rutas de forma barata.

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// dir de salida por proyecto + assets que deben existir
const DEMOS = [
  { dir: "videojuegos-pixelvault", out: "out", path: "pixelvault", assets: ["og.jpg", "icon.svg"] },
  { dir: "computacion-nexora", out: "out", path: "nexora", assets: ["og.jpg", "icon.svg"] },
  { dir: "muebles-atelier-ibarguen", out: "dist", path: "muebles", assets: ["og.jpg", "atelier.svg"] },
  { dir: "ropa-maru", out: "dist", path: "maru", assets: ["og.jpg", "maru.svg"] },
  { dir: "farmacia-vitalis", out: "dist", path: "vitalis", assets: ["og.jpg", "vitalis.svg"] },
  { dir: "finanzas-prospera", out: "dist", path: "prospera", assets: ["og.jpg", "prospera.svg"] },
  { dir: "crm-nucleo", out: "dist", path: "nucleo", assets: ["og.jpg", "nucleo.svg"] },
  { dir: "movilidad-vianova", out: "dist", path: "vianova", assets: ["og.jpg", "vianova.svg"] },
  { dir: "nexo-lab", out: "dist", path: "nexo-lab", assets: ["og-nexo-lab.jpg", "nexo-lab.svg"] },
];

const errors = [];
const ok = (m) => console.log(`  ✓ ${m}`);
const bad = (m) => {
  console.log(`  ✗ ${m}`);
  errors.push(m);
};

console.log("Smoke estático — salidas de build");
for (const d of DEMOS) {
  const base = join(ROOT, d.dir, d.out);
  if (!existsSync(base)) {
    bad(`${d.dir}: falta ${d.out}/ (¿ejecutaste build?)`);
    continue;
  }
  existsSync(join(base, "index.html")) ? ok(`${d.path}: index.html`) : bad(`${d.path}: falta index.html`);
  for (const a of d.assets) {
    existsSync(join(base, a)) ? ok(`${d.path}: ${a}`) : bad(`${d.path}: falta ${a}`);
  }
}

console.log("\nCatálogo y sitemap");
const catIndex = join(ROOT, "catalogo", "index.html");
const sitemap = join(ROOT, "catalogo", "sitemap.xml");
if (existsSync(catIndex)) ok("catalogo/index.html"); else bad("falta catalogo/index.html");

if (existsSync(sitemap)) {
  const xml = readFileSync(sitemap, "utf8");
  for (const d of DEMOS) {
    if (d.path === "nexo-lab") continue; // servicios, no modelo
    xml.includes(`/${d.path}/`) ? ok(`sitemap incluye /${d.path}/`) : bad(`sitemap NO incluye /${d.path}/`);
  }
} else bad("falta catalogo/sitemap.xml");

console.log(`\n${errors.length ? "✗ " + errors.length + " problema(s)" : "✓ smoke OK"}`);
process.exit(errors.length ? 1 : 0);
