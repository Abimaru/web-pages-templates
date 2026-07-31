// Pre-render de la landing (§31): inyecta los MODELOS y los PLANES como HTML real en el
// index.html del sitio ensamblado, para que un crawler o un navegador sin JavaScript vean
// el contenido comercial. El JS del cliente luego reemplaza/realza esos bloques
// (progressive enhancement). Opera sobre un directorio (por defecto "_site") para no
// modificar el código fuente.
//
//   node scripts/prerender-landing.mjs [dir=_site]

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, process.argv[2] || "_site");
const indexPath = join(SITE, "index.html");

if (!existsSync(indexPath)) {
  console.error("✗ No existe " + indexPath + " (¿ejecutaste el ensamblado?)");
  process.exit(1);
}

function loadWindow(files) {
  const win = {};
  for (const f of files) {
    const p = join(SITE, f);
    if (!existsSync(p)) { console.error("✗ Falta " + p); process.exit(1); }
    // eslint-disable-next-line no-new-func
    new Function("window", readFileSync(p, "utf8"))(win);
  }
  return win;
}

const w = loadWindow(["config.js", "templates.js", "archetypes.js"]);
const CFG = w.SITE_CONFIG;
const MODELS = w.TEMPLATES || [];
const ARCH = w.ARCHETYPES || {};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const wa = (msg) => "https://wa.me/" + CFG.contact.whatsapp + "?text=" + encodeURIComponent(msg);

// --- Tarjetas de modelos (versión semántica, sin iframe/miniatura) ---
const modelsHtml = MODELS.map((m) => {
  const a = ARCH[m.id];
  const feats = m.features.map((f) => "<li>" + esc(f) + "</li>").join("");
  const price = esc(m.startingPrice) + (/cotizaci/i.test(m.startingPrice) ? "" : ' <span>· personalizable</span>');
  const msg = "Hola, estoy interesado en el modelo " + m.name + " (" + m.type + ") para mi negocio. Quisiera conocer el precio y las opciones de personalización.";
  return (
    '<article class="card"><div class="cbody">' +
    '<div class="tags"><span class="tag">' + esc(m.sector) + '</span><span class="tag type">' + esc(m.type) + "</span></div>" +
    "<div><h3>" + esc(m.name) + '</h3><div class="tl">' + esc(m.tagline) + "</div></div>" +
    (a ? '<div class="arch-line"><span aria-hidden="true">🧩</span><span>' + esc(a.label) + "</span></div>" : "") +
    '<p class="desc">' + esc(m.description) + "</p>" +
    '<ul class="feats">' + feats + "</ul>" +
    '<p class="price">' + price + "</p>" +
    '<div class="cactions"><a class="btn btn-ghost btn-sm" href="' + m.demoUrl + '" target="_blank" rel="noopener noreferrer">Ver demo ↗</a>' +
    '<a class="btn btn-primary btn-sm" href="' + wa(msg) + '" target="_blank" rel="noopener noreferrer">Quiero una así</a></div>' +
    "</div></article>"
  );
}).join("");

// --- Planes ---
const plansHtml = (CFG.pricing.plans || []).map((p) => {
  const feats = p.features.map((f) => "<li>" + esc(f) + "</li>").join("");
  return (
    '<div class="plan ' + (p.featured ? "featured" : "") + '">' +
    (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +
    "<h3>" + esc(p.name) + "</h3>" +
    '<div class="from"><b>' + esc(p.priceLabel) + "</b>" + (p.rangeLabel ? "<small>" + esc(p.rangeLabel) + "</small>" : "") + "</div>" +
    '<p class="ptag">' + esc(p.tagline) + "</p>" +
    "<ul>" + feats + "</ul>" +
    (p.note ? '<p class="note">' + esc(p.note) + "</p>" : "") +
    '<a class="btn ' + (p.featured ? "btn-primary" : "btn-ghost") + '" style="justify-content:center" target="_blank" rel="noopener noreferrer" href="' +
    wa("Hola, estoy interesado en el plan " + p.name + " de Estudio Abimaru. Quisiera una cotización.") + '">Quiero este plan</a>' +
    "</div>"
  );
}).join("");

let html = readFileSync(indexPath, "utf8");

function injectInto(html, openTagRegex, content, label) {
  const m = html.match(openTagRegex);
  if (!m) { console.error("✗ No se encontró el contenedor de " + label); process.exit(1); }
  return html.replace(openTagRegex, m[1] + content + "</div>");
}

// Los contenedores están vacíos en el fuente: <div ... id="grid" ...></div>
html = injectInto(html, /(<div class="grid" id="grid"[^>]*>)<\/div>/, modelsHtml, "modelos");
html = injectInto(html, /(<div class="plans" id="plans"[^>]*>)<\/div>/, plansHtml, "planes");

writeFileSync(indexPath, html);
console.log("✓ Pre-render aplicado · " + MODELS.length + " modelos y " + (CFG.pricing.plans || []).length + " planes inyectados en " + indexPath);
