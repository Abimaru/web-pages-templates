/* Generado por scripts/generate-pwa-assets.mjs — no editar a mano. */
const CACHE = "prospera-v2";
const SHELL = ["./", "manifest.webmanifest", "icon-192.png"]; // relativo al alcance del service worker

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("prospera-") && k !== CACHE).map((k) => caches.delete(k))))
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
