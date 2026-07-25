"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, Menu, X, Headset } from "lucide-react";

const links = [
  { href: "/#productos", label: "Productos" },
  { href: "/arma-tu-pc", label: "Arma tu PC" },
  { href: "/#soporte", label: "Soporte técnico" },
  { href: "/#porque", label: "Por qué NEXORA" },
  { href: "/#contacto", label: "Contacto" },
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
          ? "bg-navy/85 backdrop-blur-md border-b border-electric/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric to-indigo text-space shadow-[0_0_18px_rgba(56,189,248,0.5)]">
            <Cpu size={22} strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            NEX<span className="text-electric glow-text">ORA</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-display text-sm font-medium text-white/70 transition-colors hover:text-electric"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link href="/#contacto" className="btn-primary !px-4 !py-2 text-sm">
            <Headset size={16} /> Agenda diagnóstico
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-electric/30 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mt-3 rounded-2xl border border-electric/25 bg-navy/95 p-5 backdrop-blur-lg lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-display text-sm text-white/80 transition hover:bg-electric/10 hover:text-electric"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#contacto" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full justify-center">
            <Headset size={16} /> Agenda diagnóstico
          </Link>
        </div>
      )}
    </header>
  );
}
