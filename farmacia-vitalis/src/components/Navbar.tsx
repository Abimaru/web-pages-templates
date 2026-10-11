import { useEffect, useState } from "react";
import { Menu, X, Search, ShoppingCart, User, Plus, Truck } from "lucide-react";

import type { CategoryId } from "../data/products";

const cats: { id: CategoryId; label: string }[] = [
  { id: "medicamentos", label: "Medicamentos" },
  { id: "vitaminas", label: "Vitaminas" },
  { id: "dermo", label: "Cuidado personal" },
  { id: "bebe", label: "Bebé y mamá" },
];

type NavbarProps = {
  cart?: number;
  query: string;
  onQuery: (q: string) => void;
  onCart: () => void;
  onCategory: (c: CategoryId) => void;
};

export default function Navbar({ cart = 0, query, onQuery, onCart, onCategory }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-medic-dark text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <span className="flex items-center gap-2"><Truck size={13} /> Domicilio a tu puerta (ejemplo)</span>
          <span>Prototipo de farmacia digital · Estudio Abimaru</span>
        </div>
      </div>

      <div className={`transition-all duration-300 ${scrolled ? "bg-white/95 shadow-sm backdrop-blur-md" : "bg-white"}`}>
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menú">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-green text-white">
              <Plus size={20} strokeWidth={3} />
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
              VITAL<span className="text-green">IS</span>
            </span>
          </a>

          {/* Buscador */}
          <div className="relative mx-2 hidden flex-1 md:block">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/60" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              aria-label="Buscar productos"
              placeholder="Busca medicamentos, marcas o síntomas…"
              className="w-full rounded-xl border border-mist bg-cloud py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-medic focus:bg-white"
            />
          </div>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <button className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate transition hover:text-medic sm:flex" aria-label="Cuenta">
              <User size={19} /> <span className="hidden lg:inline">Ingresar</span>
            </button>
            <button onClick={onCart} className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-ink transition hover:text-medic" aria-label={`Carrito (${cart})`}>
              <ShoppingCart size={20} />
              <span className="hidden lg:inline">Carrito</span>
              {cart > 0 && (
                <span className="absolute right-1 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-green px-1 text-[10px] font-bold text-white">
                  {cart}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Categorías */}
        <div className="hidden border-t border-mist lg:block">
          <ul className="mx-auto flex max-w-7xl items-center gap-7 px-6 py-2.5">
            {cats.map((c) => (
              <li key={c.id}>
                <button onClick={() => onCategory(c.id)} className="link-underline text-sm font-medium text-slate transition hover:text-medic">{c.label}</button>
              </li>
            ))}
            <li><a href="#servicios" className="link-underline text-sm font-medium text-slate transition hover:text-medic">Servicios</a></li>
          </ul>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-mist bg-white p-4 shadow-xl lg:hidden">
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/60" />
            <input value={query} onChange={(e) => onQuery(e.target.value)} aria-label="Buscar productos" placeholder="Buscar…" className="w-full rounded-lg border border-mist bg-cloud py-2.5 pl-9 pr-3 text-sm outline-none" />
          </div>
          <ul className="flex flex-col">
            {cats.map((c) => (
              <li key={c.id}>
                <button onClick={() => { setOpen(false); onCategory(c.id); }} className="block w-full border-b border-mist py-2.5 text-left text-sm font-medium text-slate">{c.label}</button>
              </li>
            ))}
            <li><a href="#servicios" onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-slate">Servicios</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
