type AnalyticsApi = { init: (cfg: unknown) => void; trackDemo: (demo: string, cfg: unknown) => void };
declare global { interface Window { Analytics?: AnalyticsApi; SITE_CONFIG?: unknown } }

/**
 * Mide esta demo con la analítica del catálogo (misma config, mismo código, un solo lugar para activarla).
 * Carga ../config.js y ../analytics.js del sitio (mismo origen). Si no hay proveedor configurado no envía nada;
 * en desarrollo (los archivos no existen) falla en silencio.
 */
export function loadAnalytics(demo: string) {
  if (!import.meta.env.PROD) return;
  const root = new URL("../", window.location.origin + import.meta.env.BASE_URL).href;
  const add = (src: string) =>
    new Promise<void>((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.async = true; s.onload = () => res(); s.onerror = () => rej(new Error(src));
      document.head.appendChild(s);
    });
  add(root + "config.js")
    .then(() => add(root + "analytics.js"))
    .then(() => {
      const A = window.Analytics, cfg = window.SITE_CONFIG;
      if (!A || !cfg) return;
      A.init(cfg);
      A.trackDemo(demo, cfg);
    })
    .catch(() => { /* sin analítica la demo funciona igual */ });
}
