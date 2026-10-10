import { useEffect, useState } from "react";
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react";

import type { CategoryId } from "../data/products";

const cats: { id: CategoryId; label: string }[] = [
  { id: "mujer", label: "Mujer" },
  { id: "hombre", label: "Hombre" },
  { id: "ninos", label: "Niños" },
  { id: "deportivo", label: "Deportivo" },
];

type NavbarProps = {
  bag?: number;
  favs?: number;
  onBag: () => void;
  onFavs: () => void;
  onSearch: () => void;
  onCategory: (c: CategoryId) => void;
};

export default function Navbar({ bag = 0, favs = 0, onBag, onFavs, onSearch, onCategory }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-porcelain/92 backdrop-blur-md shadow-[0_1px_0_rgba(23,19,15,.08)] py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <a href="#top" className="font-display text-3xl font-semibold tracking-[0.2em] text-ink lg:text-4xl">
          MAR<span className="text-rose">Ú</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {cats.map((c) => (
            <li key={c.id}>
              <button onClick={() => onCategory(c.id)} className="link-underline text-sm font-medium uppercase tracking-wider text-ink/75 transition hover:text-ink">
                {c.label}
              </button>
            </li>
          ))}
          <li>
            <a href="#accesorios" className="link-underline text-sm font-medium uppercase tracking-wider text-ink/75 transition hover:text-ink">Lookbook</a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button aria-label="Buscar" onClick={onSearch} className="text-ink/70 transition hover:text-ink"><Search size={20} /></button>
          <button aria-label={`Favoritos (${favs})`} onClick={onFavs} className="relative hidden text-ink/70 transition hover:text-rose sm:block">
            <Heart size={20} className={favs > 0 ? "fill-rose text-rose" : ""} />
            {favs > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] font-semibold text-porcelain">{favs}</span>}
          </button>
          <button aria-label={`Bolsa (${bag})`} onClick={onBag} className="relative text-ink/80 transition hover:text-ink">
            <ShoppingBag size={21} />
            {bag > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-rose px-1 text-[10px] font-semibold text-white">
                {bag}
              </span>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-ink/10 bg-porcelain p-5 shadow-xl lg:hidden">
          <ul className="flex flex-col">
            {cats.map((c) => (
              <li key={c.id}>
                <button onClick={() => { setOpen(false); onCategory(c.id); }} className="block w-full border-b border-ink/5 py-3 text-left text-sm font-medium uppercase tracking-wider text-ink/80">
                  {c.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => { setOpen(false); onFavs(); }} className="block w-full py-3 text-left text-sm font-medium uppercase tracking-wider text-ink/80">
                Favoritos {favs > 0 && `(${favs})`}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
