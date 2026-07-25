import { useEffect, useState } from "react";
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react";

const links = [
  { href: "#mujer", label: "Mujer" },
  { href: "#hombre", label: "Hombre" },
  { href: "#ninos", label: "Niños" },
  { href: "#deportivo", label: "Deportivo" },
  { href: "#accesorios", label: "Accesorios" },
];

export default function Navbar({ bag = 0 }: { bag?: number }) {
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
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline text-sm font-medium uppercase tracking-wider text-ink/75 transition hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button aria-label="Buscar" className="hidden text-ink/70 transition hover:text-ink sm:block"><Search size={20} /></button>
          <button aria-label="Favoritos" className="hidden text-ink/70 transition hover:text-rose sm:block"><Heart size={20} /></button>
          <button aria-label="Bolsa" className="relative text-ink/80 transition hover:text-ink">
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
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-ink/5 py-3 text-sm font-medium uppercase tracking-wider text-ink/80">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
