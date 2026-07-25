"use client";

import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/CartContext";
import { formatCOP } from "@/app/lib/games";

export default function CartDrawer() {
  const { items, total, open, setOpen, setQty, remove, clear } = useCart();

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
              {items.map(({ game, qty }) => (
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

            <div className="border-t border-neon-purple/25 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-white/60">Total</span>
                <span className="font-display text-2xl font-extrabold text-neon-cyan">{formatCOP(total)}</span>
              </div>
              <button
                onClick={() => alert("Este es un prototipo de demostración: el checkout no procesa pagos reales.")}
                className="btn-neon w-full justify-center"
              >
                Finalizar compra
              </button>
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
