"use client";

import { useCart } from "@/app/CartContext";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Palette, X, Upload, Link2, MessageCircle, RotateCcw, Check } from "lucide-react";
import {
  DEFAULT_BRAND, PRESET_COLORS, MAX_NAME, normalizeHex, cleanName, brandToSearch, buildInterestMessage, isDefaultBrand,
} from "@/app/lib/brand";
import { setBrandDraft, resetBrand, useBrandDraft, syncTitle } from "@/app/lib/brandStore";
import { WA_BASE } from "@/app/DemoBanner";


/** Reduce el logo a un máximo de 320×120 y lo devuelve como data URL (todo local: nada se sube). */
async function shrinkLogo(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("imagen inválida"));
      i.src = url;
    });
    const k = Math.min(1, 320 / img.width, 120 / img.height);
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.width * k));
    c.height = Math.max(1, Math.round(img.height * k));
    c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** "Pruébalo con tu marca": el prospecto ve la farmacia con su nombre, su color y su logo. */
export default function BrandStudio() {
  const brand = useBrandDraft();
  const pathname = usePathname();
  // En pantallas angostas la barra del carrito ocupa la parte inferior: este botón sube por encima.
  const { count, open: cartOpen } = useCart();
  const lift = count > 0 && !cartOpen;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logoError, setLogoError] = useState("");
  const [hexDraft, setHexDraft] = useState(brand.color);
  // Next restablece el título al hidratar y al navegar: se vuelve a aplicar el de la marca.
  useEffect(() => {
    syncTitle();
    const el = document.querySelector("title");
    if (!el) return;
    const mo = new MutationObserver(() => syncTitle());
    mo.observe(el, { childList: true, characterData: true, subtree: true });
    return () => mo.disconnect();
  }, [pathname, brand.name]);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  const setColor = (c: string) => { setHexDraft(c); setBrandDraft({ ...brand, color: c }); };

  const onFile = async (f: File | undefined) => {
    setLogoError("");
    if (!f) return;
    if (!f.type.startsWith("image/") || f.size > 3 * 1024 * 1024) return setLogoError("Sube una imagen (PNG, JPG o SVG) de hasta 3 MB.");
    try { setBrandDraft({ ...brand, logo: await shrinkLogo(f) }); } catch { setLogoError("No pudimos leer esa imagen."); }
  };

  const copyLink = async () => {
    // El enlace siempre apunta a la portada de la demo (la marca viaja en ?marca=&color=).
    const url = window.location.origin + (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/" + brandToSearch(brand);
    try { await navigator.clipboard.writeText(url); } catch { window.prompt("Copia este enlace:", url); }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-lift={lift}
        className="fixed bottom-[calc(var(--demo-banner-h,0px)+1rem)] left-4 z-[60] max-sm:data-[lift=true]:bottom-[calc(var(--demo-banner-h,0px)+5.75rem)] flex items-center gap-2 rounded-full bg-void text-white border border-neon-cyan/60 hover:border-neon-cyan px-5 py-3 text-sm font-medium shadow-xl transition sm:left-6"
      >
        <Palette size={17} className="text-white/80" /> Pruébalo con tu marca
      </button>

      {open && (
        <div className="fixed inset-0 z-[85] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:justify-start sm:p-6" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Pruébalo con tu marca"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-t-3xl bg-abyss text-white border border-neon-purple/40 p-6 shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold text-white text-white">Pruébalo con tu marca</h2>
                <p className="mt-1 text-sm text-white/60">Mira cómo se vería esta página con el nombre, el color y el logo de tu negocio. Todo ocurre en tu navegador.</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-white/10"><X size={18} /></button>
            </div>

            <label className="mt-5 block text-xs font-medium uppercase tracking-wider text-white/60" htmlFor="brand-name">Nombre de tu negocio</label>
            <input
              id="brand-name"
              value={brand.name}
              maxLength={MAX_NAME}
              onChange={(e) => setBrandDraft({ ...brand, name: e.target.value })}
              onBlur={(e) => setBrandDraft({ ...brand, name: cleanName(e.target.value) || DEFAULT_BRAND.name })}
              className="mt-1.5 w-full rounded-xl border bg-void/60 border-white/20 focus:border-neon-cyan px-3 py-2.5 text-sm outline-none"
            />

            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-white/60">Color de marca</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                  aria-pressed={brand.color === c}
                  className={`h-8 w-8 rounded-full border-2 transition ${brand.color === c ? "border-white ring-2 ring-white/20 ring-offset-2 ring-offset-black" : "border-transparent"}`}
                  style={{ background: c }}
                />
              ))}
              <input type="color" value={brand.color} onChange={(e) => setColor(e.target.value)} aria-label="Elegir otro color" className="h-8 w-8 cursor-pointer rounded-full border border-white/20 bg-transparent p-0" />
            </div>
            <input
              value={hexDraft}
              onChange={(e) => { setHexDraft(e.target.value); const h = normalizeHex(e.target.value); if (h) setBrandDraft({ ...brand, color: h }); }}
              aria-label="Código de color"
              placeholder="#22e3ff"
              className="mt-3 w-32 rounded-lg border bg-void/60 border-white/20 focus:border-neon-cyan px-3 py-1.5 font-mono text-xs outline-none"
            />

            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-white/60">Logo (opcional)</p>
            <div className="mt-2 flex items-center gap-3">
              <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm transition hover:border-white"><Upload size={15} /> Subir logo</button>
              {brand.logo && <button onClick={() => setBrandDraft({ ...brand, logo: undefined })} className="text-sm text-white/60 underline underline-offset-4">Quitar</button>}
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { void onFile(e.target.files?.[0]); e.target.value = ""; }} />
            </div>
            {logoError && <p role="alert" className="mt-2 text-xs text-red-400">{logoError}</p>}
            <p className="mt-1.5 text-[11px] text-white/45">Tu logo no se sube a ningún servidor ni viaja en el enlace.</p>

            <div className="mt-6 grid gap-2.5">
              <a
                href={WA_BASE + encodeURIComponent(buildInterestMessage(brand))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-3 text-sm font-semibold text-[#06310f] transition hover:brightness-105"
              >
                <MessageCircle size={17} /> Quiero una página así con mi marca
              </a>
              <button onClick={copyLink} className="flex items-center justify-center gap-2 rounded-full border border-white/30 py-2.5 text-sm transition hover:border-white" aria-live="polite">
                {copied ? <><Check size={15} className="text-green-400" /> Enlace copiado</> : <><Link2 size={15} /> Copiar enlace para compartir</>}
              </button>
              {!isDefaultBrand(brand) && (
                <button onClick={() => { resetBrand(); setHexDraft(DEFAULT_BRAND.color); }} className="flex items-center justify-center gap-2 py-1 text-sm text-white/60 underline underline-offset-4"><RotateCcw size={14} /> Volver a PIXELVAULT</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
