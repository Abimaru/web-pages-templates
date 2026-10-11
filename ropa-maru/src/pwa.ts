/** Registra el service worker (solo en producción) con el alcance de la app, también bajo subrutas (GitHub Pages). */
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
  const base = import.meta.env.BASE_URL;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch(() => {
      /* sin service worker la app funciona igual (solo pierde el modo sin conexión) */
    });
  });
}
