"use client";

import { useBrand } from "@/app/lib/brandStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Cpu, Gauge, HardDrive, MemoryStick, Monitor, Snowflake, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  categories, presets, defaultSelection, totalFor, optionOf, sameSelection, formatCOP, buildQuoteMessage, whatsappUrl,
  type Selection,
} from "@/app/lib/build";

const icons: Record<string, LucideIcon> = {
  perfil: Monitor, cpu: Cpu, gpu: Gauge, ram: MemoryStick, storage: HardDrive, cooling: Snowflake,
};

export default function Configurator() {
  const [selected, setSelected] = useState<Selection>(defaultSelection);
  const [name, setName] = useState("");

  const total = useMemo(() => totalFor(selected), [selected]);
  const brand = useBrand();
  const message = useMemo(() => buildQuoteMessage(selected, name, brand.name), [selected, name, brand.name]);
  const canSend = name.trim().length > 0;

  // Barra fija (solo móvil): visible mientras el resumen no está en pantalla.
  const summaryRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [summaryVisible, setSummaryVisible] = useState(false);
  useEffect(() => {
    const el = summaryRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setSummaryVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const goToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Categorías */}
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-white">
              <Sparkles size={18} className="text-electric" /> ¿No sabes por dónde empezar? Parte de una base
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {presets.map((p) => {
                const active = sameSelection(selected, p.sel);
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelected({ ...p.sel })}
                    aria-pressed={active}
                    className={`rounded-xl border p-4 text-left transition ${active ? "border-teal bg-teal/10" : "border-electric/15 bg-panel/40 hover:border-electric/40"}`}
                  >
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="mt-0.5 text-xs text-white/50">{p.note}</p>
                    <p className="mono mt-2 text-sm text-electric">{formatCOP(totalFor(p.sel))}</p>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-white/40">Después ajusta cada componente a tu gusto.</p>
          </div>

          {categories.map((cat) => (
            <div key={cat.key}>
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-white">
                {(() => { const Icon = icons[cat.key]; return <Icon size={18} className="text-electric" />; })()} {cat.title}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {cat.options.map((opt, i) => {
                  const active = selected[cat.key] === i;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelected((s) => ({ ...s, [cat.key]: i }))}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                        active
                          ? "border-electric bg-electric/10 shadow-[0_0_0_1px_rgba(var(--accent-rgb),0.3)]"
                          : "border-electric/15 bg-panel/40 hover:border-electric/40"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-white">{opt.label}</p>
                        <p className="mt-0.5 text-xs text-white/50">{opt.note}</p>
                      </div>
                      <div className="ml-3 text-right">
                        <span className="mono text-sm text-electric">
                          {opt.price === 0 ? "Incluido" : "+" + formatCOP(opt.price)}
                        </span>
                        {active && <Check size={16} className="ml-auto mt-1 text-teal" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <aside id="resumen" ref={summaryRef} className="scroll-mt-20 lg:sticky lg:top-24 lg:self-start">
          <div className="card-tech p-6">
            <h3 className="font-display text-lg font-semibold text-white">Tu configuración</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.key} className="flex items-start justify-between gap-3">
                  <span className="text-white/55">{c.title}</span>
                  <span className="text-right text-white/85">{optionOf(c, selected).label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-widest text-white/40">Estimado total</p>
              <p className="mono mt-1 text-3xl font-bold text-electric glow-text">{formatCOP(total)}</p>
              <p className="mt-1 text-xs text-white/40">Precio referencial · sujeto a disponibilidad</p>
            </div>
            <label className="mt-5 block text-xs text-white/50" htmlFor="quote-name">Tu nombre</label>
            <input
              id="quote-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Para saber a quién responder"
              className="mt-1 w-full rounded-lg border border-electric/20 bg-space px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-electric"
            />
            <a
              href={canSend ? whatsappUrl(message) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canSend}
              onClick={(e) => !canSend && e.preventDefault()}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition ${canSend ? "bg-[#25d366] text-[#06310f] hover:brightness-105" : "cursor-not-allowed bg-white/10 text-white/40"}`}
            >
              <MessageCircle size={17} /> {canSend ? "Cotizar por WhatsApp" : "Escribe tu nombre para cotizar"}
            </a>
            <details className="mt-3 text-xs text-white/50">
              <summary className="cursor-pointer select-none underline underline-offset-4">Ver el mensaje que recibirá la tienda</summary>
              <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-space p-3 leading-relaxed text-white/70">{message}</pre>
            </details>
            <p className="mt-3 text-center text-xs text-white/40">
              Un ingeniero valida y ajusta tu build sin costo.
            </p>
            <p className="mt-1 text-center text-[11px] text-white/30">Demo: WhatsApp te deja elegir el chat. En tu tienda iría tu número.</p>
          </div>
        </aside>
      </div>

      {!summaryVisible && (
        <div className="fixed inset-x-0 z-[55] px-3 pb-2 lg:hidden" style={{ bottom: "var(--demo-banner-h, 0px)" }}>
          <button
            onClick={goToSummary}
            aria-label={`Tu configuración: ${formatCOP(total)}. Ir al resumen para cotizar`}
            className="flex w-full items-center justify-between rounded-xl border border-electric/50 bg-panel/95 px-5 py-3.5 text-white shadow-[0_0_24px_rgba(var(--accent-rgb),0.25)] backdrop-blur transition active:scale-[.99]"
          >
            <span className="text-left">
              <span className="block text-[11px] uppercase tracking-widest text-white/50">Tu configuración</span>
              <span className="mono text-lg font-bold text-electric">{formatCOP(total)}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-electric">Cotizar <ArrowRight size={16} /></span>
          </button>
        </div>
      )}
    </div>
  );
}
