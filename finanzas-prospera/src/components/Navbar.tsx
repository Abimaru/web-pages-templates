import { useEffect, useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";

const links = [
  { href: "#productos", label: "Productos" },
  { href: "#simuladores", label: "Simuladores" },
  { href: "#score", label: "Tu score" },
  { href: "#como", label: "Cómo funciona" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-sm backdrop-blur-md py-3" : "bg-transparent py-5"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-white">
            <TrendingUp size={22} strokeWidth={2.6} />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight text-ink">PRÓSPERA</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline text-sm font-semibold text-slate transition hover:text-forest">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#simuladores" className="text-sm font-semibold text-forest transition hover:text-forest/70">Ingresar</a>
          <a href="#productos" className="btn-primary !py-2.5 !px-5 text-sm">Abrir cuenta</a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-mist bg-white p-5 shadow-xl lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-mist py-3 text-sm font-semibold text-slate">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#productos" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full justify-center">Abrir cuenta</a>
        </div>
      )}
    </header>
  );
}
