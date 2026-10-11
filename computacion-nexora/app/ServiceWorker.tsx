"use client";

import { useEffect } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Registra el service worker (solo en producción) con el alcance de la app, también bajo subrutas (GitHub Pages). */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(`${BASE}/sw.js`, { scope: `${BASE}/` }).catch(() => {
      /* sin service worker la app funciona igual (solo pierde el modo sin conexión) */
    });
  }, []);
  return null;
}
