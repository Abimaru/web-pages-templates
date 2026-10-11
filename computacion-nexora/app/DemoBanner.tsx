"use client";
import { useEffect, useRef, useState } from "react";

/* Aviso de prototipo estándar del ecosistema Estudio Abimaru (versión Next, sin deps).
 * Fijo inferior, visible, descartable y accesible. */

// UTM: la analítica del catálogo atribuye las visitas que llegan desde esta demo.
const CATALOG_URL = "https://abimaru.github.io/web-pages-templates/?utm_source=demo-nexora&utm_medium=banner&utm_campaign=volver-catalogo";
const WA_BASE = "https://wa.me/573157076691?text=";

export default function DemoBanner({
  disclaimer,
  waMessage,
}: {
  disclaimer: string;
  waMessage: string;
}) {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Publica la altura del banner (--demo-banner-h) para que otros elementos fijos se apilen encima.
  useEffect(() => {
    const root = document.documentElement.style;
    const el = ref.current;
    if (!open || !el) { root.setProperty("--demo-banner-h", "0px"); return; }
    const set = () => root.setProperty("--demo-banner-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => { ro.disconnect(); root.setProperty("--demo-banner-h", "0px"); };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Aviso de prototipo"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-amber-400/40 bg-zinc-950/92 text-zinc-100 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
        <p className="flex items-start gap-2 text-[0.82rem] leading-snug">
          <span aria-hidden className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber-400 text-[0.66rem] font-bold text-zinc-950">
            i
          </span>
          <span>
            <strong className="font-semibold">Prototipo interactivo</strong> · datos ilustrativos ·
            sin backend. {disclaimer}
          </span>
        </p>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={CATALOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/25 px-3 py-1.5 text-[0.8rem] font-medium transition hover:bg-white/10"
          >
            Volver al catálogo
          </a>
          <a
            href={WA_BASE + encodeURIComponent(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-amber-400 px-3 py-1.5 text-[0.8rem] font-semibold text-zinc-950 transition hover:brightness-105"
          >
            Quiero una solución así
          </a>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar aviso"
            className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            <span aria-hidden className="text-lg leading-none">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}
