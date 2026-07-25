import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, homeHref } from "../lib/router";

// Enlaces a secciones del home (anchors) + una ruta interna (Portafolio).
const links = [
  { href: homeHref("#colecciones"), label: "Colecciones" },
  { href: homeHref("#proceso"), label: "Fabricación" },
  { to: "/portafolio", label: "Portafolio" },
  { href: homeHref("#taller"), label: "El taller" },
  { href: homeHref("#contacto"), label: "Contacto" },
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

  const renderLink = (l: (typeof links)[number], cls: string, onClick?: () => void) =>
    "to" in l ? (
      <Link to={l.to!} className={cls} onClick={onClick}>{l.label}</Link>
    ) : (
      <a href={l.href!} className={cls} onClick={onClick}>{l.label}</a>
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(58,46,37,0.08)] py-3" : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-baseline gap-2 leading-none">
          <span className="font-display text-2xl font-semibold tracking-tight text-espresso">Atelier</span>
          <span className="font-display text-2xl italic text-terracotta">Ibargüen</span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              {renderLink(l, "link-underline text-sm font-medium text-espresso/80 transition-colors hover:text-espresso")}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href={homeHref("#contacto")} className="btn-solid !py-2.5 !px-6 text-sm">
            Cotizar proyecto
          </a>
        </div>

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
              <li key={l.label}>
                {renderLink(l, "block border-b border-espresso/5 py-3 text-sm font-medium text-espresso/80", () => setOpen(false))}
              </li>
            ))}
          </ul>
          <a href={homeHref("#contacto")} onClick={() => setOpen(false)} className="btn-solid mt-4 w-full justify-center">
            Cotizar proyecto
          </a>
        </div>
      )}
    </header>
  );
}
