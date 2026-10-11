import { useBrand } from "../lib/brandStore";
import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingCart, MessageCircle, Truck, FileText, CalendarClock } from "lucide-react";
import { getProduct } from "../data/products";
import {
  type Line, formatCOP, subtotal, deliveryFor, remainingForFreeDelivery, needsPrescription,
  FREE_DELIVERY_FROM, MAX_QTY, buildOrderMessage, whatsappUrl,
} from "../lib/cart";
import { useDialog } from "./useDialog";

type Props = {
  open: boolean;
  cart: Line[];
  onClose: () => void;
  onQty: (id: string, qty: number) => void;
  onShop: () => void;
};

const input = "w-full rounded-xl border border-mist bg-white px-3 py-2.5 text-sm outline-none transition focus:border-medic";

export default function CartDrawer({ open, cart, onClose, onQty, onShop }: Props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [rxOk, setRxOk] = useState(false);
  const [preview, setPreview] = useState(false);
  useDialog(open, onClose);

  const sub = subtotal(cart);
  const fee = deliveryFor(sub);
  const missing = remainingForFreeDelivery(sub);
  const progress = Math.min(100, (sub / FREE_DELIVERY_FROM) * 100);
  const rx = needsPrescription(cart);
  const brand = useBrand();
  const message = buildOrderMessage(cart, { name, address, notes, recurring }, brand.name);
  const canOrder = cart.length > 0 && name.trim() !== "" && address.trim() !== "" && (!rx || rxOk);
  const hint = !name.trim() ? "Escribe tu nombre para pedir" : !address.trim() ? "Escribe tu dirección para pedir" : "Confirma el envío de tu fórmula";

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-mist px-6 py-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold"><ShoppingCart size={20} className="text-medic" /> Tu carrito</h2>
          <button onClick={onClose} aria-label="Cerrar carrito" className="grid h-10 w-10 place-items-center rounded-full hover:bg-cloud"><X size={19} /></button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-soft-blue text-medic"><ShoppingCart size={26} /></span>
            <p className="font-display text-xl font-bold">Tu carrito está vacío</p>
            <p className="text-sm text-slate">Agrega productos y envía tu pedido por WhatsApp.</p>
            <button onClick={() => { onClose(); onShop(); }} className="btn-primary">Ver productos</button>
          </div>
        ) : (
          <>
            <div className="border-b border-mist px-6 py-4 text-sm">
              <p className="flex items-center gap-2 text-slate">
                <Truck size={16} className="text-teal" />
                {missing > 0 ? <>Te faltan <b className="text-ink">{formatCOP(missing)}</b> para domicilio gratis</> : <b className="text-ink">¡Domicilio gratis!</b>}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cloud" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso al domicilio gratis">
                <div className="h-full rounded-full bg-green transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-mist overflow-y-auto px-6">
              {cart.map((l) => {
                const p = getProduct(l.productId);
                if (!p) return null;
                return (
                  <li key={p.id} className="flex gap-4 py-4">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl" style={{ background: p.bg }}>
                      <p.icon size={28} style={{ color: p.color }} strokeWidth={1.6} />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <h3 className="font-display text-sm font-semibold leading-snug">{p.name}</h3>
                        <button onClick={() => onQty(p.id, 0)} aria-label={`Quitar ${p.name}`} className="text-slate/50 transition hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                      {p.rx && <span className="mt-0.5 w-fit rounded bg-soft-blue px-1.5 py-0.5 text-[10px] font-bold text-medic-dark">Rx · requiere fórmula</span>}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border border-mist">
                          <button onClick={() => onQty(p.id, l.qty - 1)} aria-label="Menos" className="grid h-8 w-8 place-items-center"><Minus size={13} /></button>
                          <span className="w-5 text-center text-sm">{l.qty}</span>
                          <button onClick={() => onQty(p.id, l.qty + 1)} disabled={l.qty >= MAX_QTY} aria-label="Más" className="grid h-8 w-8 place-items-center disabled:opacity-30"><Plus size={13} /></button>
                        </div>
                        <span className="font-display text-sm font-bold">{formatCOP(p.price * l.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="max-h-[62vh] space-y-3 overflow-y-auto border-t border-mist bg-cloud px-6 py-5">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between"><dt className="text-slate">Subtotal</dt><dd>{formatCOP(sub)}</dd></div>
                <div className="flex justify-between"><dt className="text-slate">Domicilio</dt><dd>{fee === 0 ? "Gratis" : formatCOP(fee)}</dd></div>
                <div className="flex justify-between border-t border-mist pt-2 font-display text-base font-bold"><dt>Total</dt><dd>{formatCOP(sub + fee)}</dd></div>
              </dl>

              {rx && (
                <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-medic/30 bg-soft-blue p-3 text-xs leading-relaxed text-medic-dark">
                  <input type="checkbox" checked={rxOk} onChange={(e) => setRxOk(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--color-medic)]" />
                  <span><FileText size={13} className="mr-1 inline" /> Tu pedido incluye medicamentos con fórmula. <b>Enviaré la foto de mi fórmula vigente por el chat</b> para que un farmacéutico la valide antes de despachar.</span>
                </label>
              )}

              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre *" aria-label="Tu nombre" autoComplete="name" className={input} />
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección de entrega *" aria-label="Dirección de entrega" autoComplete="street-address" className={input} />
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas (barrio, indicaciones…)" aria-label="Notas" className={input} />

              <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate">
                <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--color-medic)]" />
                <span><CalendarClock size={13} className="mr-1 inline text-teal" /> Programar entrega recurrente cada 30 días (programa de crónicos)</span>
              </label>

              <a
                href={canOrder ? whatsappUrl(message) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canOrder}
                onClick={(e) => !canOrder && e.preventDefault()}
                className={`flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition ${canOrder ? "bg-[#25d366] text-[#06310f] hover:brightness-105" : "cursor-not-allowed bg-ink/10 text-ink/40"}`}
              >
                <MessageCircle size={18} /> {canOrder ? "Pedir por WhatsApp" : hint}
              </a>
              <button onClick={() => setPreview((v) => !v)} aria-expanded={preview} className="w-full text-center text-xs text-slate underline underline-offset-4">
                {preview ? "Ocultar" : "Ver"} el mensaje que recibirá la farmacia
              </button>
              {preview && <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-xl bg-white p-3 text-xs leading-relaxed text-slate">{message}</pre>}
              <p className="text-center text-[11px] text-slate/70">Demo: WhatsApp te deja elegir el chat. No se procesan fórmulas ni se venden medicamentos.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
