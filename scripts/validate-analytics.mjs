// Valida catalogo/analytics.js con un entorno simulado (sin red ni navegador):
// - sin proveedor, en localhost/file o con "No rastrear" NO inyecta scripts;
// - plausible/umami inyectan su script con el atributo correcto;
// - los eventos antes de cargar el script se encolan y se entregan después;
// - las propiedades se limpian (sin objetos/null) y `once` no repite;
// - config.js tiene analytics con proveedor vacío o válido.
// Falla (exit 1) si algo no cuadra → el CI no debe desplegar.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const load = (f, win) => new Function("window", readFileSync(join(ROOT, f), "utf8"))(win); // eslint-disable-line no-new-func

const g = {};
load("catalogo/analytics.js", g);
const { createAnalytics } = g.Analytics;

const errors = [];
const check = (c, m) => { if (!c) errors.push(m); };

function env(over = {}) {
  const scripts = [];
  const doc = {
    head: { appendChild: (s) => scripts.push(s) },
    createElement: () => ({ attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } }),
  };
  return { scripts, win: { dataLayer: [] }, doc, nav: {}, loc: { hostname: "abimaru.github.io", protocol: "https:" }, ...over };
}

// Sin proveedor / config vacía
{ const e = env(); const a = createAnalytics(e); a.init({ analytics: { provider: "", id: "" } });
  check(e.scripts.length === 0 && !a.state.active, "sin proveedor no debe inyectar scripts");
  a.track("x", { a: 1 }); check(e.win.dataLayer.length === 1, "dataLayer debe recibir el evento aun sin proveedor"); }

// Proveedor desconocido, localhost, file y DNT
for (const [label, over, cfg] of [
  ["proveedor desconocido", {}, { analytics: { provider: "ga", id: "G-1" } }],
  ["localhost", { loc: { hostname: "localhost", protocol: "http:" } }, { analytics: { provider: "plausible", id: "x.com" } }],
  ["file://", { loc: { hostname: "", protocol: "file:" } }, { analytics: { provider: "plausible", id: "x.com" } }],
  ["No rastrear", { nav: { doNotTrack: "1" } }, { analytics: { provider: "plausible", id: "x.com" } }],
  ["umami sin src", {}, { analytics: { provider: "umami", id: "abc" } }],
]) { const e = env(over); createAnalytics(e).init(cfg); check(e.scripts.length === 0, `${label}: no debe inyectar script`); }

// Plausible: script + cola + props limpias
{ const e = env(); const a = createAnalytics(e);
  a.init({ analytics: { provider: "plausible", id: "estudio.com" } });
  check(e.scripts.length === 1 && e.scripts[0].attrs["data-domain"] === "estudio.com", "plausible: script con data-domain");
  check(e.scripts[0].src.includes("plausible.io"), "plausible: src por defecto");
  a.track("cotizar", { plan: "catalogo", nested: { a: 1 }, nada: null, largo: "x".repeat(500) });
  const q = e.win.plausible.q;
  check(q && q.length === 1 && q[0][0] === "cotizar", "plausible: evento en cola antes de cargar");
  const props = q[0][1].props;
  check(props.plan === "catalogo" && !("nested" in props) && !("nada" in props) && props.largo.length === 120, "props limpias y recortadas");
  a.once("k", "visto"); a.once("k", "visto");
  check(q.filter((x) => x[0] === "visto").length === 1, "once no debe repetir"); }

// Umami: espera a onload y luego entrega
{ const e = env(); const a = createAnalytics(e);
  a.init({ analytics: { provider: "umami", id: "web-1", src: "https://cloud.umami.is/script.js" } });
  check(e.scripts[0].attrs["data-website-id"] === "web-1", "umami: data-website-id");
  const got = []; e.win.umami = { track: (ev, p) => got.push([ev, p]) };
  a.track("ver", { m: "MARÚ" });
  check(got.length === 0, "umami: no debe disparar antes de onload");
  e.scripts[0].onload();
  check(got.length === 1 && got[0][0] === "ver" && got[0][1].m === "MARÚ", "umami: entrega la cola tras onload");
  a.track("otro"); check(got.length === 2, "umami: entrega directa tras cargar"); }

// Clasificación de enlaces de las demos
{ const { classifyLink } = g.Analytics; const studio = "573157076691";
  const ev = (h) => classifyLink(h, "maru", studio)?.event ?? null;
  check(ev("https://wa.me/573157076691?text=Hola") === "cta_estudio", "WhatsApp al estudio → cta_estudio");
  check(ev("https://wa.me/?text=pedido") === "pedido_demo", "WhatsApp de la demo → pedido_demo");
  check(ev("https://wa.me/573009999999?text=x") === "pedido_demo", "WhatsApp a otro número → pedido_demo");
  check(ev("https://abimaru.github.io/web-pages-templates/?utm_source=demo-maru&utm_medium=banner&utm_campaign=volver-catalogo") === "volver_catalogo", "volver al catálogo");
  check(ev("https://example.com/") === null && ev("#top") === null && ev(undefined) === null, "otros enlaces → null");
  check(classifyLink("https://wa.me/?text=x", "vitalis", studio).props.demo === "vitalis", "la demo viaja en las props");
  check(classifyLink("https://wa.me/573157076691", "x", "").event === "pedido_demo", "sin número del estudio configurado nada se marca como estudio"); }

// config.js
{ const w = {}; load("catalogo/config.js", w); const a = w.SITE_CONFIG.analytics;
  check(a && typeof a.provider === "string" && typeof a.id === "string", "config.js: analytics {provider,id} requerido");
  check(a.provider === "" || ["plausible", "umami"].includes(a.provider), "config.js: proveedor no soportado"); }

if (errors.length) { console.error("✗ Analítica inválida:\n" + errors.map((x) => "  - " + x).join("\n")); process.exit(1); }
console.log("✓ Analítica válida · sin terceros por defecto, DNT/localhost respetados, cola y props limpias");
