"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gamepad2, Menu, X, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/CartContext";

const links = [
  { href: "/catalogo", label: "Tienda" },
  { href: "/#plataformas", label: "Plataformas" },
  { href: "/#retro", label: "Retro" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#comunidad", label: "Comunidad" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

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
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple text-void shadow-[0_0_18px_rgba(34,227,255,0.6)]">
            <Gamepad2 size={22} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-widest text-white">
            PIXEL<span className="neon-cyan">VAULT</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-display text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-neon-cyan"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/catalogo"
            aria-label="Buscar"
            className="grid h-10 w-10 place-items-center rounded-lg border border-neon-purple/30 text-white/70 transition hover:border-neon-cyan hover:text-neon-cyan"
          >
            <Search size={18} />
          </Link>
          <button onClick={() => setCartOpen(true)} className="btn-neon relative !px-4 !py-2 text-xs">
            <ShoppingCart size={16} /> Carrito
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-neon-magenta px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-lg border border-neon-purple/40 text-white" aria-label="Carrito">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-neon-magenta px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-neon-purple/40 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-neon-purple/30 bg-abyss/95 p-5 backdrop-blur-lg lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-display text-sm uppercase tracking-wider text-white/80 transition hover:bg-neon-purple/15 hover:text-neon-cyan"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
