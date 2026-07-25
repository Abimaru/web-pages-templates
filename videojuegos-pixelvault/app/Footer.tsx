import Link from "next/link";
import { Gamepad2 } from "lucide-react";

const cols = [
  { h: "Tienda", items: ["Novedades", "Ofertas", "Consolas", "Retro"] },
  { h: "Servicios", items: ["Reparación", "Torneos", "Trade-in", "VaultPass"] },
  { h: "Ayuda", items: ["Envíos", "Garantía", "Contacto", "FAQ"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-neon-purple/25 bg-abyss">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple text-void">
                <Gamepad2 size={22} strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-extrabold tracking-widest text-white">
                PIXEL<span className="neon-cyan">VAULT</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              El cofre de tesoros gamer. Hecho por y para quienes nunca dejaron de jugar.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neon-cyan">
                {col.h}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <Link href="/catalogo" className="text-sm text-white/55 transition hover:text-white">
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neon-purple/20 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} PIXELVAULT — Prototipo por Abimaru. Solo demostración.
          </p>
          <p className="pixel-label text-white/40">GAME OVER? NEVER.</p>
        </div>
      </div>
    </footer>
  );
}
