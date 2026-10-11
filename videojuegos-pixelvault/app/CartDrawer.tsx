"use client";

import { useBrand } from "@/app/lib/brandStore";
import { useEffect, useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/app/CartContext";
import { formatCOP } from "@/app/lib/games";
import { buildOrderMessage, platformOf, whatsappUrl, type DeliveryMode } from "@/app/lib/order";

export default function CartDrawer() {
  const { items, total, open, setOpen, setQty, setPlatform, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [delivery, setDelivery] = useState<DeliveryMode>("digital");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const brand = useBrand();
  const message = buildOrderMessage(items, { name, delivery, city, notes }, brand.name);
  const canOrder = items.length > 0 && name.trim().length > 0 && (delivery === "digital" || city.trim().length > 0);
  const hint = !name.trim() ? "Escribe tu nombre para pedir" : "Escribe tu ciudad para el domicilio";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-void/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-[61] flex h-full w-[min(420px,100vw)] flex-col border-l border-neon-purple/30 bg-abyss transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Tu carrito"
      >
        <div className="flex items-center justify-between border-b border-neon-purple/25 p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <ShoppingCart size={20} className="text-neon-cyan" /> Tu carrito
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-neon-purple/30 text-white/70 transition hover:text-neon-cyan"
            aria-label="Cerrar carrito"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <span className="text-5xl">🕹️</span>
            <p className="text-white/60">Tu carrito está vacío.</p>
            <p className="pixel-label text-neon-purple">GAME OVER? INSERT COIN</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {items.map(({ game, qty, platform }) => (
                <div key={game.slug} className="flex gap-3 rounded-xl border border-neon-purple/20 bg-panel/50 p-3">
                  <div
                    className="grid h-16 w-14 shrink-0 place-items-center rounded-lg text-2xl"
                    style={{ background: game.gradient }}
                  >
                    {game.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold text-white">{game.title}</p>
                    <p className="text-xs text-neon-purple">{game.genre}</p>
                    {game.platforms.length > 1 ? (
                      <select
                        value={platformOf({ game, qty, platform })}
                        onChange={(e) => setPlatform(game.slug, e.target.value)}
                        aria-label={`Plataforma de ${game.title}`}
                        className="mt-1 rounded border border-neon-purple/30 bg-void px-2 py-0.5 text-xs text-white/80 outline-none focus:border-neon-cyan"
                      >
                        {game.platforms.map((pl) => <option key={pl}>{pl}</option>)}
                      </select>
                    ) : (
                      <p className="mt-1 text-xs text-white/50">{game.platforms[0]}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(game.slug, qty - 1)} className="grid h-6 w-6 place-items-center rounded border border-neon-purple/30 text-white/70 hover:text-neon-cyan" aria-label="Menos">
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm text-white">{qty}</span>
                        <button onClick={() => setQty(game.slug, qty + 1)} className="grid h-6 w-6 place-items-center rounded border border-neon-purple/30 text-white/70 hover:text-neon-cyan" aria-label="Más">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-neon-cyan">{formatCOP(game.price * qty)}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(game.slug)} className="self-start text-white/40 transition hover:text-neon-magenta" aria-label="Quitar">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="max-h-[65vh] overflow-y-auto border-t border-neon-purple/25 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-white/60">Total</span>
                <span className="font-display text-2xl font-extrabold text-neon-cyan">{formatCOP(total)}</span>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Tipo de entrega">
                {([["digital", "⚡ Código digital"], ["domicilio", "📦 Domicilio"]] as const).map(([v, label]) => (
                  <button
                    key={v}
                    role="radio"
                    aria-checked={delivery === v}
                    onClick={() => setDelivery(v)}
                    className={`rounded-lg border px-3 py-2 text-xs transition ${delivery === v ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan" : "border-neon-purple/30 text-white/60 hover:text-white"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mb-3 grid gap-2">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre *" aria-label="Tu nombre" autoComplete="name" className="rounded-lg border border-neon-purple/30 bg-void px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-neon-cyan" />
                {delivery === "domicilio" && (
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad y dirección *" aria-label="Ciudad y dirección" autoComplete="street-address" className="rounded-lg border border-neon-purple/30 bg-void px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-neon-cyan" />
                )}
                <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas (opcional)" aria-label="Notas" className="rounded-lg border border-neon-purple/30 bg-void px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-neon-cyan" />
              </div>
              <a
                href={canOrder ? whatsappUrl(message) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canOrder}
                onClick={(e) => !canOrder && e.preventDefault()}
                className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition ${canOrder ? "bg-[#25d366] text-[#06310f] hover:brightness-105" : "cursor-not-allowed bg-white/10 text-white/40"}`}
              >
                <MessageCircle size={18} /> {canOrder ? "Pedir por WhatsApp" : hint}
              </a>
              <button onClick={() => setPreview((v) => !v)} aria-expanded={preview} className="mt-2 w-full text-center text-xs text-white/50 underline underline-offset-4">
                {preview ? "Ocultar" : "Ver"} el mensaje que recibirá la tienda
              </button>
              {preview && <pre className="mt-2 max-h-36 overflow-auto whitespace-pre-wrap rounded-lg bg-void p-3 text-xs leading-relaxed text-white/70">{message}</pre>}
              <p className="mt-2 text-center text-[11px] text-white/35">Demo: WhatsApp te deja elegir el chat. En tu tienda iría tu número.</p>
              <button onClick={clear} className="mt-2 w-full text-center text-xs text-white/40 transition hover:text-neon-magenta">
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
