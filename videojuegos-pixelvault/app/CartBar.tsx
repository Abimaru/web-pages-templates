"use client";

import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/app/CartContext";
import { formatCOP } from "@/app/lib/games";

/** Barra fija solo móvil: resumen del carrito justo encima del banner de demo. */
export default function CartBar() {
  const { count, total, open, setOpen } = useCart();
  if (count === 0 || open) return null;
  return (
    <div className="fixed inset-x-0 z-[55] px-3 pb-2 md:hidden" style={{ bottom: "var(--demo-banner-h, 0px)" }}>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Ver carrito: ${count} ${count === 1 ? "artículo" : "artículos"}, ${formatCOP(total)}`}
        className="flex w-full items-center justify-between rounded-xl border border-neon-cyan/50 bg-abyss/95 px-5 py-3.5 text-white shadow-[0_0_24px_rgba(var(--neon-rgb),0.3)] backdrop-blur transition active:scale-[.99]"
      >
        <span className="flex items-center gap-2.5 text-sm">
          <span className="relative">
            <ShoppingCart size={20} className="text-neon-cyan" />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-neon-magenta px-1 text-[10px] font-bold text-white">{count}</span>
          </span>
          Ver carrito · <b className="font-display font-bold text-neon-cyan">{formatCOP(total)}</b>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-neon-cyan">Pedir <ArrowRight size={16} /></span>
      </button>
    </div>
  );
}
