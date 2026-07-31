import { useEffect, useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import { nexoLabConfig } from "../config";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#casos", label: "Casos" },
  { href: "#proof-room", label: "Evidencia" },
  { href: "#naf", label: "Metodología" },
  { href: "#laboratorio", label: "Laboratorio" },
  { href: "#perfil", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "border-line bg-graphite/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[66px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <a href="#top" aria-label="NEXO LAB — inicio" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-sm font-medium text-ink/75 hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href={nexoLabConfig.parentUrl}
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={15} /> Estudio Abimaru
          </a>
          <a href="#contacto" className="btn btn-primary btn-sm">
            Cuéntame tu reto
          </a>
        </div>

        <button
          className="lg:hidden grid place-items-center w-11 h-11 rounded-xl border border-line-2 text-ink"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="lg:hidden border-t border-line bg-graphite/95 backdrop-blur-md px-5 pb-5 pt-1"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3 text-ink/80 font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nexoLabConfig.parentUrl}
            className="flex items-center gap-2 border-b border-line py-3 text-muted"
          >
            <ArrowLeft size={15} /> Volver a Estudio Abimaru
          </a>
          <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-primary w-full mt-4">
            Cuéntame tu reto
          </a>
        </nav>
      )}
    </header>
  );
}
