import { useEffect, useState } from "react";
import { Menu, X, Search, ShoppingCart, User, Plus, Truck } from "lucide-react";

const links = [
  { href: "#categorias", label: "Medicamentos" },
  { href: "#categorias", label: "Vitaminas" },
  { href: "#categorias", label: "Cuidado personal" },
  { href: "#servicios", label: "Servicios" },
  { href: "#ofertas", label: "Ofertas" },
];

export default function Navbar({ cart = 0 }: { cart?: number }) {
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
          <span className="flex items-center gap-2"><Truck size={13} /> Domicilio en 60 minutos (ejemplo)</span>
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
              placeholder="Busca medicamentos, marcas o síntomas…"
              className="w-full rounded-xl border border-mist bg-cloud py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-medic focus:bg-white"
            />
          </div>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <button className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate transition hover:text-medic sm:flex" aria-label="Cuenta">
              <User size={19} /> <span className="hidden lg:inline">Ingresar</span>
            </button>
            <button className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-ink transition hover:text-medic" aria-label="Carrito">
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
            {links.map((l, i) => (
              <li key={i}>
                <a href={l.href} className="link-underline text-sm font-medium text-slate transition hover:text-medic">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-mist bg-white p-4 shadow-xl lg:hidden">
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/60" />
            <input placeholder="Buscar…" className="w-full rounded-lg border border-mist bg-cloud py-2.5 pl-9 pr-3 text-sm outline-none" />
          </div>
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={i}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-mist py-2.5 text-sm font-medium text-slate">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
