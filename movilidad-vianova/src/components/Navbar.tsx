import { useEffect, useState } from "react";
import { Menu, X, Route } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "#marketplace", label: "Vehículos" },
  { href: "#cockpit", label: "Simulador" },
  { href: "#credito-libre", label: "Crédito a tu medida" },
  { href: "#venta", label: "Vender" },
  { href: "#cartera", label: "Compra de cartera" },
  { href: "#seguros", label: "Seguros" },
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-graphite/85 backdrop-blur-md border-b border-line py-2.5" : "bg-transparent py-4"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#top" aria-label="VíaNova — inicio"><Logo /></a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline text-sm font-medium text-ink/75 transition-colors hover:text-ink">{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#intencion" className="btn btn-cobre !py-2.5 !px-5 hidden text-sm lg:inline-flex">
          <Route size={16} /> Empieza tu ruta
        </a>

        <button className="grid h-10 w-10 place-items-center rounded-lg border border-line-2 text-ink lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menú" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-line bg-night/95 p-4 backdrop-blur-lg lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-sm font-medium text-ink/80">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#intencion" onClick={() => setOpen(false)} className="btn btn-cobre mt-3 w-full"><Route size={16} /> Empieza tu ruta</a>
        </div>
      )}
    </header>
  );
}
