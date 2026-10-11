import { ShoppingBag, ArrowRight } from "lucide-react";
import { formatCOP } from "../lib/bag";

type Props = { count: number; total: number; onOpen: () => void };

/** Barra fija solo móvil: resumen de la bolsa justo encima del banner de demo. */
export default function BagBar({ count, total, onOpen }: Props) {
  return (
    <div
      className="fixed inset-x-0 z-[65] px-3 pb-2 md:hidden"
      style={{ bottom: "var(--demo-banner-h, 0px)" }}
    >
      <button
        onClick={onOpen}
        aria-label={`Ver bolsa: ${count} ${count === 1 ? "prenda" : "prendas"}, ${formatCOP(total)}`}
        className="flex w-full items-center justify-between rounded-2xl bg-ink px-5 py-3.5 text-porcelain shadow-[0_10px_30px_rgba(23,19,15,.35)] transition active:scale-[.99]"
      >
        <span className="flex items-center gap-2.5 text-sm">
          <span className="relative">
            <ShoppingBag size={20} />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[10px] font-semibold text-white">{count}</span>
          </span>
          Ver bolsa · <b className="font-semibold">{formatCOP(total)}</b>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium">Pedir <ArrowRight size={16} /></span>
      </button>
    </div>
  );
}
