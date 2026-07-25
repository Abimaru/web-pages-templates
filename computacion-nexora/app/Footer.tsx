import Link from "next/link";
import { Cpu } from "lucide-react";

const cols = [
  { h: "Productos", items: ["PC Gamer", "Laptops", "Componentes", "Periféricos"] },
  { h: "Servicios", items: ["Ensamble", "Mantenimiento", "Datos", "Redes"] },
  { h: "Empresa", items: ["Nosotros", "Garantía", "Contacto", "Blog"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-electric/15 bg-navy">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric to-indigo text-space">
                <Cpu size={22} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-bold text-white">
                NEX<span className="text-electric glow-text">ORA</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Tecnología a la vanguardia con criterio humano. Computadores, componentes
              y soporte técnico que sí resuelve.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-electric">
                {col.h}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <Link href="/#soporte" className="text-sm text-white/55 transition hover:text-white">
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-electric/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} NEXORA — Prototipo por Abimaru. Solo demostración.
          </p>
          <p className="mono text-xs text-white/40">built.with(criterio) // not(algoritmo)</p>
        </div>
      </div>
    </footer>
  );
}
