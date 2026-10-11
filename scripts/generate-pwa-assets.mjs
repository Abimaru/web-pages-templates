// Genera los activos PWA de cada demo desde UNA sola fuente (esta lista):
//   <app>/public/manifest.webmanifest · sw.js · icon-192.png · icon-512.png · icon-maskable-512.png · apple-touch-icon.png
// Los íconos se renderizan desde el SVG de cada demo con Chromium (Playwright). El resultado se COMMITEA:
// el CI no necesita Playwright; solo verifica (smoke) que los archivos existan y sean coherentes.
//
//   PLAYWRIGHT_MODULE=/ruta/a/playwright/index.mjs CHROMIUM_PATH=/ruta/chromium node scripts/generate-pwa-assets.mjs
//   (sin variables usa `playwright` instalado y su Chromium por defecto)

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const APPS = [
  { id: "maru", dir: "ropa-maru", svg: "ropa-maru/public/maru.svg", name: "MARÚ — Moda para toda la familia", short: "MARÚ", desc: "Demo de tienda de moda de Estudio Abimaru.", theme: "#faf8f5", bg: "#faf8f5" },
  { id: "vitalis", dir: "farmacia-vitalis", svg: "farmacia-vitalis/public/vitalis.svg", name: "VITALIS — Farmacia digital", short: "VITALIS", desc: "Demo de farmacia digital de Estudio Abimaru (no vende medicamentos).", theme: "#0e78d4", bg: "#ffffff" },
  { id: "muebles", dir: "muebles-atelier-ibarguen", svg: "muebles-atelier-ibarguen/public/atelier.svg", name: "Atelier Ibargüen — Muebles de autor", short: "Atelier", desc: "Demo de mueblería de autor de Estudio Abimaru.", theme: "#fbf8f3", bg: "#fbf8f3" },
  { id: "prospera", dir: "finanzas-prospera", svg: "finanzas-prospera/public/prospera.svg", name: "PRÓSPERA — Créditos y ahorro", short: "PRÓSPERA", desc: "Demo fintech de Estudio Abimaru (no es una entidad financiera).", theme: "#0a6b4a", bg: "#ffffff" },
  { id: "vianova", dir: "movilidad-vianova", svg: "movilidad-vianova/public/vianova.svg", name: "VíaNova — Movilidad y financiación", short: "VíaNova", desc: "Demo de movilidad y financiación de Estudio Abimaru.", theme: "#0a0d14", bg: "#0a0d14" },
  { id: "nucleo", dir: "crm-nucleo", svg: "crm-nucleo/public/nucleo.svg", name: "NÚCLEO CRM", short: "NÚCLEO", desc: "Demo de panel CRM de Estudio Abimaru.", theme: "#1c1e35", bg: "#f5f6fa" },
  { id: "pixelvault", dir: "videojuegos-pixelvault", svg: "videojuegos-pixelvault/app/icon.svg", name: "PIXELVAULT — Tienda gamer", short: "PIXELVAULT", desc: "Demo de tienda gamer de Estudio Abimaru.", theme: "#06040f", bg: "#06040f" },
  { id: "nexora", dir: "computacion-nexora", svg: "computacion-nexora/app/icon.svg", name: "NEXORA — Computación y soporte", short: "NEXORA", desc: "Demo de computación y soporte técnico de Estudio Abimaru.", theme: "#050914", bg: "#050914" },
];

export const manifestFor = (a) => ({
  name: a.name,
  short_name: a.short,
  description: a.desc,
  lang: "es",
  dir: "ltr",
  // Rutas relativas al manifest: funcionan bajo cualquier subruta (GitHub Pages) o en la raíz.
  start_url: "./",
  scope: "./",
  display: "standalone",
  orientation: "any",
  background_color: a.bg,
  theme_color: a.theme,
  categories: ["shopping"],
  icons: [
    { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
});

/** Service worker mínimo y seguro: navegación network-first con respaldo offline; estáticos stale-while-revalidate. */
export const swFor = (a) => `/* Generado por scripts/generate-pwa-assets.mjs — no editar a mano. */
const CACHE = "${a.id}-v2";
const SHELL = ["./", "manifest.webmanifest", "icon-192.png"]; // relativo al alcance del service worker

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("${a.id}-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // WhatsApp, fuentes, analítica…: siempre a la red

  // Páginas y la configuración del sitio (config.js / analytics.js): red primero (así activar o cambiar la
  // analítica surte efecto en la siguiente visita); sin conexión, la copia guardada o la portada.
  const fresh = req.mode === "navigate" || /[/](config|analytics)[.]js$/.test(url.pathname); // sin barras invertidas: esto vive en una plantilla
  if (fresh) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("./") : Response.error())))
    );
    return;
  }

  // Estáticos (JS/CSS con hash, imágenes, fuentes locales): del caché y se actualiza en segundo plano.
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
`;

async function main() {
  const pw = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
  const browser = await pw.chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  async function render(svgText, size, { maskableBg, scale = 1 } = {}) {
    const uri = "data:image/svg+xml;base64," + Buffer.from(svgText).toString("base64");
    const inner = Math.round(size * scale);
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<style>html,body{margin:0;width:${size}px;height:${size}px;background:${maskableBg ?? "transparent"};display:grid;place-items:center;overflow:hidden}img{width:${inner}px;height:${inner}px}</style><img src="${uri}">`
    );
    await page.waitForFunction(() => document.images[0].complete);
    return page.screenshot({ omitBackground: !maskableBg, type: "png" });
  }

  for (const a of APPS) {
    const out = join(ROOT, a.dir, "public");
    mkdirSync(out, { recursive: true });
    const svg = readFileSync(join(ROOT, a.svg), "utf8");
    const fill = /<rect[^>]*fill="(#[0-9a-fA-F]{3,8})"/.exec(svg)?.[1] ?? a.theme; // color del fondo del logo
    // Para maskable/iOS el fondo lo pone el color a sangre: se quita el recuadro del logo (evita un borde "dentro" del ícono).
    const glyph = svg.replace(/<rect\b[^>]*\/>/g, "");
    writeFileSync(join(out, "icon-192.png"), await render(svg, 192));
    writeFileSync(join(out, "icon-512.png"), await render(svg, 512));
    // Maskable: fondo a sangre + logo dentro de la "zona segura" (≈66%) para que ningún recorte lo corte.
    writeFileSync(join(out, "icon-maskable-512.png"), await render(glyph, 512, { maskableBg: fill, scale: 0.8 }));
    writeFileSync(join(out, "apple-touch-icon.png"), await render(glyph, 180, { maskableBg: fill, scale: 0.9 })); // iOS no admite transparencia
    writeFileSync(join(out, "manifest.webmanifest"), JSON.stringify(manifestFor(a), null, 2) + "\n");
    writeFileSync(join(out, "sw.js"), swFor(a));
    console.log("✓ " + a.id);
  }
  await browser.close();
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
