import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#colecciones", label: "Colecciones" },
  { href: "#proceso", label: "Fabricación" },
  { href: "#galeria", label: "Portafolio" },
  { href: "#taller", label: "El taller" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(58,46,37,0.08)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-baseline gap-2 leading-none">
          <span className="font-display text-2xl font-semibold tracking-tight text-espresso">
            Atelier
          </span>
          <span className="font-display text-2xl italic text-terracotta">Ibargüen</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-sm font-medium text-espresso/80 transition-colors hover:text-espresso"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contacto" className="btn-solid hidden !py-2.5 !px-6 text-sm lg:inline-flex">
          Cotizar proyecto
        </a>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-espresso/20 text-espresso lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mx-5 mt-3 rounded-2xl border border-espresso/10 bg-ivory p-5 shadow-xl lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-espresso/5 py-3 text-sm font-medium text-espresso/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" onClick={() => setOpen(false)} className="btn-solid mt-4 w-full justify-center">
            Cotizar proyecto
          </a>
        </div>
      )}
    </header>
  );
}
