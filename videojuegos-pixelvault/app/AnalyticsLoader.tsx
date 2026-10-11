"use client";

import { useEffect } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

type AnalyticsApi = { init: (cfg: unknown) => void; trackDemo: (demo: string, cfg: unknown) => void };
type W = Window & { Analytics?: AnalyticsApi; SITE_CONFIG?: unknown };

/**
 * Mide esta demo con la analítica del catálogo (misma config, mismo código, un solo lugar para activarla).
 * Carga ../config.js y ../analytics.js del sitio (mismo origen). Sin proveedor configurado no envía nada;
 * en desarrollo (los archivos no existen) falla en silencio.
 */
export default function AnalyticsLoader({ demo }: { demo: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const root = new URL("../", window.location.origin + BASE + "/").href;
    const add = (src: string) =>
      new Promise<void>((res, rej) => {
        const s = document.createElement("script");
        s.src = src; s.async = true; s.onload = () => res(); s.onerror = () => rej(new Error(src));
        document.head.appendChild(s);
      });
    add(root + "config.js")
      .then(() => add(root + "analytics.js"))
      .then(() => {
        const w = window as W;
        if (!w.Analytics || !w.SITE_CONFIG) return;
        w.Analytics.init(w.SITE_CONFIG);
        w.Analytics.trackDemo(demo, w.SITE_CONFIG);
      })
      .catch(() => { /* sin analítica la demo funciona igual */ });
  }, [demo]);
  return null;
}
