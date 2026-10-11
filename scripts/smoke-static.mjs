// Smoke estático (§14, sin navegador): tras build, verifica que cada demo tiene
// su salida (index.html + OG + favicon) y que el sitemap y el catálogo enlazan todo.
// No reemplaza pruebas E2E; detecta regresiones de ensamblado y rutas de forma barata.

import { existsSync, readFileSync, readdirSync } from "node:fs";
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

// PWA: cada demo debe poder instalarse (manifest + íconos + service worker) bajo su subruta.
console.log("\nPWA (manifest, íconos y service worker)");
for (const d of DEMOS) {
  if (d.path === "nexo-lab") continue; // línea de servicios, sin PWA
  const base = join(ROOT, d.dir, d.out);
  const need = ["manifest.webmanifest", "sw.js", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
  const missing = need.filter((f) => !existsSync(join(base, f)));
  if (missing.length) { bad(`${d.path}: faltan ${missing.join(", ")}`); continue; }
  let m;
  try { m = JSON.parse(readFileSync(join(base, "manifest.webmanifest"), "utf8")); } catch { bad(`${d.path}: manifest.webmanifest no es JSON válido`); continue; }
  const problems = [];
  if (!m.name || !m.short_name) problems.push("name/short_name");
  if (m.start_url !== "./" || m.scope !== "./") problems.push('start_url/scope deben ser "./" (relativos a la subruta)');
  if (m.display !== "standalone") problems.push("display");
  if (!m.theme_color || !m.background_color) problems.push("colores");
  const sizes = (m.icons || []).map((i) => `${i.sizes}:${i.purpose}`);
  for (const want of ["192x192:any", "512x512:any", "512x512:maskable"]) if (!sizes.includes(want)) problems.push(`ícono ${want}`);
  for (const i of m.icons || []) if (!existsSync(join(base, i.src))) problems.push(`falta ${i.src}`);
  const html = readFileSync(join(base, "index.html"), "utf8");
  if (!/rel="manifest"/.test(html)) problems.push("index.html no enlaza el manifest");
  const sw = readFileSync(join(base, "sw.js"), "utf8");
  if (!sw.includes('addEventListener("fetch"')) problems.push("sw.js sin manejador fetch");
  try { new Function(sw); } catch (e) { problems.push("sw.js con error de sintaxis: " + e.message); } // p. ej. un escape perdido que vuelva comentario una regex
  // Todas las demos deben cargar la analítica del catálogo (config.js + analytics.js del sitio).
  const dir = join(base, d.out === "out" ? "_next" : "assets");
  const js = [];
  const walk = (p) => { try { for (const f of readdirSync(p, { withFileTypes: true })) f.isDirectory() ? walk(join(p, f.name)) : f.name.endsWith(".js") && js.push(join(p, f.name)); } catch { /* sin carpeta */ } };
  walk(dir);
  if (!js.some((f) => readFileSync(f, "utf8").includes("analytics.js"))) problems.push("no carga la analítica del catálogo (analytics.js)");
  problems.length ? bad(`${d.path}: ${problems.join("; ")}`) : ok(`${d.path}: manifest, íconos y service worker`);
}

// Atribución: el enlace "Volver al catálogo" de cada demo lleva UTM para que la analítica
// del catálogo sepa qué demo generó la visita (utm_source=demo-<ruta>).
console.log("\nUTM de los banners de demo");
for (const d of DEMOS) {
  if (d.path === "nexo-lab") continue; // línea de servicios, sin banner de demo
  const candidates = ["app/DemoBanner.tsx", "src/components/DemoBanner.tsx", "src/App.tsx"].map((f) => join(ROOT, d.dir, f));
  const file = candidates.find((f) => existsSync(f) && readFileSync(f, "utf8").includes("utm_source=demo-"));
  file && readFileSync(file, "utf8").includes(`utm_source=demo-${d.path}&`)
    ? ok(`${d.path}: utm_source=demo-${d.path}`)
    : bad(`${d.path}: el enlace al catálogo no lleva utm_source=demo-${d.path}`);
}

console.log(`\n${errors.length ? "✗ " + errors.length + " problema(s)" : "✓ smoke OK"}`);
process.exit(errors.length ? 1 : 0);
