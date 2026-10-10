import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, Truck } from "lucide-react";
import { getProduct } from "../data/products";
import {
  type BagLine, lineKey, formatCOP, subtotal, shippingFor, remainingForFreeShipping,
  FREE_SHIPPING_FROM, MAX_QTY, buildOrderMessage, whatsappUrl,
} from "../lib/bag";
import { useDialog } from "./useDialog";

type Props = {
  open: boolean;
  bag: BagLine[];
  onClose: () => void;
  onQty: (key: string, qty: number) => void;
  onShop: () => void;
  storeName?: string;
};

export default function BagDrawer({ open, bag, onClose, onQty, onShop, storeName }: Props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  useDialog(open, onClose);

  const sub = subtotal(bag);
  const ship = shippingFor(sub);
  const missing = remainingForFreeShipping(sub);
  const progress = Math.min(100, (sub / FREE_SHIPPING_FROM) * 100);
  const message = buildOrderMessage(bag, { name, city, notes }, storeName);
  const canOrder = bag.length > 0 && name.trim().length > 0;

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu bolsa"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-porcelain shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-2xl">Tu bolsa</h2>
          <button onClick={onClose} aria-label="Cerrar bolsa" className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream"><X size={19} /></button>
        </header>

        {bag.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-blush text-rose-deep"><ShoppingBag size={26} /></span>
            <p className="font-display text-xl">Tu bolsa está vacía</p>
            <p className="text-sm text-ink/55">Agrega prendas y envía tu pedido por WhatsApp en un minuto.</p>
            <button onClick={() => { onClose(); onShop(); }} className="btn-dark">Ver colección</button>
          </div>
        ) : (
          <>
            <div className="border-b border-ink/10 px-6 py-4 text-sm">
              <p className="flex items-center gap-2 text-ink/70">
                <Truck size={16} className="text-rose-deep" />
                {missing > 0 ? <>Te faltan <b className="text-ink">{formatCOP(missing)}</b> para envío gratis</> : <b className="text-ink">¡Tienes envío gratis!</b>}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso al envío gratis">
                <div className="h-full rounded-full bg-rose transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {bag.map((l) => {
                const p = getProduct(l.productId);
                if (!p) return null;
                const key = lineKey(l);
                return (
                  <li key={key} className="flex gap-4 py-4">
                    <img src={p.img} alt={p.name} className="h-24 w-20 shrink-0 rounded-xl object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <h3 className="font-display text-base leading-tight">{p.name}</h3>
                        <button onClick={() => onQty(key, 0)} aria-label={`Quitar ${p.name}`} className="text-ink/40 transition hover:text-rose-deep"><Trash2 size={16} /></button>
                      </div>
                      <p className="mt-0.5 text-xs text-ink/55">Talla {l.size} · {l.color}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-ink/20">
                          <button onClick={() => onQty(key, l.qty - 1)} aria-label="Menos" className="grid h-8 w-8 place-items-center"><Minus size={13} /></button>
                          <span className="w-5 text-center text-sm">{l.qty}</span>
                          <button onClick={() => onQty(key, l.qty + 1)} disabled={l.qty >= MAX_QTY} aria-label="Más" className="grid h-8 w-8 place-items-center disabled:opacity-30"><Plus size={13} /></button>
                        </div>
                        <span className="text-sm font-medium">{formatCOP(p.price * l.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="space-y-3 border-t border-ink/10 bg-cream/50 px-6 py-5">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd>{formatCOP(sub)}</dd></div>
                <div className="flex justify-between"><dt className="text-ink/60">Envío</dt><dd>{ship === 0 ? "Gratis" : formatCOP(ship)}</dd></div>
                <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-medium"><dt>Total</dt><dd>{formatCOP(sub + ship)}</dd></div>
              </dl>

              <div className="grid grid-cols-2 gap-2">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre *" aria-label="Tu nombre" autoComplete="name" className="rounded-xl border border-ink/15 bg-porcelain px-3 py-2.5 text-sm outline-none focus:border-ink" />
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" aria-label="Ciudad" autoComplete="address-level2" className="rounded-xl border border-ink/15 bg-porcelain px-3 py-2.5 text-sm outline-none focus:border-ink" />
              </div>
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas (dirección, regalo, cambios de talla…)" aria-label="Notas" className="w-full rounded-xl border border-ink/15 bg-porcelain px-3 py-2.5 text-sm outline-none focus:border-ink" />

              <a
                href={canOrder ? whatsappUrl(message) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canOrder}
                onClick={(e) => !canOrder && e.preventDefault()}
                className={`flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition ${canOrder ? "bg-[#25d366] text-[#06310f] hover:brightness-105" : "cursor-not-allowed bg-ink/10 text-ink/40"}`}
              >
                <MessageCircle size={18} /> {canOrder ? "Pedir por WhatsApp" : "Escribe tu nombre para pedir"}
              </a>
              <button onClick={() => setShowPreview((v) => !v)} className="w-full text-center text-xs text-ink/55 underline underline-offset-4" aria-expanded={showPreview}>
                {showPreview ? "Ocultar" : "Ver"} el mensaje que recibirá la tienda
              </button>
              {showPreview && <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-xl bg-porcelain p-3 text-xs leading-relaxed text-ink/70">{message}</pre>}
              <p className="text-center text-[11px] text-ink/45">Demo: al pulsar, WhatsApp te deja elegir el chat. En tu tienda iría tu número.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
