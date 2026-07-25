"use client";

import { useEffect, useState } from "react";
import { Gamepad2, Menu, X, Search, ShoppingCart } from "lucide-react";

const links = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#plataformas", label: "Plataformas" },
  { href: "#retro", label: "Retro" },
  { href: "#servicios", label: "Servicios" },
  { href: "#comunidad", label: "Comunidad" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-abyss/85 backdrop-blur-md border-b border-neon-purple/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple text-void shadow-[0_0_18px_rgba(34,227,255,0.6)]">
            <Gamepad2 size={22} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-widest text-white">
            PIXEL<span className="neon-cyan">VAULT</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-neon-cyan"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Buscar"
            className="grid h-10 w-10 place-items-center rounded-lg border border-neon-purple/30 text-white/70 transition hover:border-neon-cyan hover:text-neon-cyan"
          >
            <Search size={18} />
          </button>
          <button className="btn-neon !px-4 !py-2 text-xs">
            <ShoppingCart size={16} /> Carrito
          </button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-neon-purple/40 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-neon-purple/30 bg-abyss/95 p-5 backdrop-blur-lg lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-display text-sm uppercase tracking-wider text-white/80 transition hover:bg-neon-purple/15 hover:text-neon-cyan"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="btn-neon mt-3 w-full justify-center">
            <ShoppingCart size={16} /> Ver carrito
          </button>
        </div>
      )}
    </header>
  );
}
