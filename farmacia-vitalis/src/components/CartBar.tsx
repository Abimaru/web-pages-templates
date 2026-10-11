import { ShoppingCart, ArrowRight, FileText } from "lucide-react";
import { formatCOP } from "../lib/cart";

type Props = { count: number; total: number; hasRx: boolean; onOpen: () => void };

/** Barra fija solo móvil: resumen del carrito justo encima del banner de demo. */
export default function CartBar({ count, total, hasRx, onOpen }: Props) {
  return (
    <div className="fixed inset-x-0 z-[65] px-3 pb-2 md:hidden" style={{ bottom: "var(--demo-banner-h, 0px)" }}>
      <button
        onClick={onOpen}
        aria-label={`Ver carrito: ${count} ${count === 1 ? "producto" : "productos"}, ${formatCOP(total)}${hasRx ? ", incluye medicamentos con fórmula" : ""}`}
        className="flex w-full items-center justify-between rounded-2xl bg-medic px-5 py-3.5 text-white shadow-[0_10px_30px_rgba(14,120,212,.35)] transition active:scale-[.99]"
      >
        <span className="flex items-center gap-2.5 text-sm">
          <span className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-green px-1 text-[10px] font-bold text-white">{count}</span>
          </span>
          <span>
            Ver carrito · <b className="font-semibold">{formatCOP(total)}</b>
            {hasRx && <span className="mt-0.5 flex items-center gap-1 text-[11px] text-white/85"><FileText size={11} /> Incluye fórmula</span>}
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium">Pedir <ArrowRight size={16} /></span>
      </button>
    </div>
  );
}
