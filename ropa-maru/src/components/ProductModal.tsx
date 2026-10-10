import { useState } from "react";
import { X, Heart, Minus, Plus, ShoppingBag, Truck, RefreshCcw } from "lucide-react";
import { getProduct, discountPct, type Product } from "../data/products";
import { formatCOP, MAX_QTY, FREE_SHIPPING_FROM } from "../lib/bag";
import { useDialog } from "./useDialog";

type Props = {
  product: Product;
  fav: boolean;
  onFav: () => void;
  onClose: () => void;
  onAdd: (size: string, color: string, qty: number) => void;
  onOpenOther: (id: string) => void;
};

export default function ProductModal({ product: p, fav, onFav, onClose, onAdd, onOpenOther }: Props) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(p.colors[0].name);
  const [qty, setQty] = useState(1);
  const [missing, setMissing] = useState(false);
  useDialog(true, onClose);

  const pct = discountPct(p);
  const look = p.look.map(getProduct).filter((x): x is Product => !!x);

  const add = () => {
    if (!size) return setMissing(true);
    onAdd(size, color, qty);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/55 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-porcelain sm:rounded-3xl md:grid-cols-2"
      >
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-porcelain/90 shadow transition hover:bg-cream">
          <X size={18} />
        </button>
        <div className="relative aspect-[4/5] bg-cream md:aspect-auto md:min-h-[540px]">
          <img src={p.img} alt={p.name} className="absolute inset-0 h-full w-full object-cover" />
          {p.tag && <span className="absolute left-4 top-4 rounded-full bg-porcelain/95 px-3 py-1 text-[11px] font-semibold tracking-wide">{p.tag}</span>}
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="kicker text-ink/45">{p.category === "ninos" ? "Niños" : p.category}</p>
          <h2 className="mt-2 font-display text-3xl font-medium">{p.name}</h2>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-xl font-medium">{formatCOP(p.price)}</span>
            {p.oldPrice && <span className="text-ink/40 line-through">{formatCOP(p.oldPrice)}</span>}
            {pct > 0 && <span className="rounded-full bg-blush px-2 py-0.5 text-xs font-semibold text-rose-deep">-{pct}%</span>}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink/65">{p.description}</p>

          <fieldset className="mt-6">
            <legend className="text-xs font-medium uppercase tracking-wider text-ink/60">Color · <span className="normal-case tracking-normal text-ink">{color}</span></legend>
            <div className="mt-2 flex gap-2.5">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  title={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-ink ring-2 ring-ink/15 ring-offset-2 ring-offset-porcelain" : "border-ink/15"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-xs font-medium uppercase tracking-wider text-ink/60">
              Talla {missing && !size && <span className="ml-2 normal-case tracking-normal text-rose-deep">Elige una talla</span>}
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setMissing(false); }}
                  aria-pressed={size === s}
                  className={`h-10 min-w-12 rounded-full border px-3 text-sm transition ${size === s ? "border-ink bg-ink text-porcelain" : missing ? "border-rose-deep/60 hover:border-ink" : "border-ink/20 hover:border-ink"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-ink/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menos" className="grid h-11 w-11 place-items-center"><Minus size={15} /></button>
              <span className="w-6 text-center text-sm" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} aria-label="Más" className="grid h-11 w-11 place-items-center"><Plus size={15} /></button>
            </div>
            <button onClick={add} className="btn-dark flex-1 justify-center !px-4">
              <ShoppingBag size={17} /> Añadir a la bolsa
            </button>
            <button onClick={onFav} aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"} aria-pressed={fav} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 transition hover:border-rose">
              <Heart size={18} className={fav ? "fill-rose text-rose" : ""} />
            </button>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-ink/60">
            <li className="flex items-center gap-2"><Truck size={16} className="text-rose-deep" /> Envío gratis desde {formatCOP(FREE_SHIPPING_FROM)}</li>
            <li className="flex items-center gap-2"><RefreshCcw size={16} className="text-rose-deep" /> Cambios en 30 días</li>
          </ul>

          {look.length > 0 && (
            <div className="mt-7 border-t border-ink/10 pt-5">
              <h3 className="kicker text-ink/70">Completa el look</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {look.map((l) => (
                  <button key={l.id} onClick={() => onOpenOther(l.id)} className="group flex items-center gap-3 rounded-xl border border-ink/10 p-2 text-left transition hover:border-ink/40">
                    <img src={l.img} alt="" className="h-16 w-14 rounded-lg object-cover" loading="lazy" />
                    <span className="text-xs leading-snug"><b className="block font-medium">{l.name}</b><span className="text-ink/55">{formatCOP(l.price)}</span></span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
