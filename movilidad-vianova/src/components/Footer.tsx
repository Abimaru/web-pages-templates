import { Info } from "lucide-react";
import Logo from "./Logo";

const cols = [
  { h: "Vehículos", items: ["Nuevos", "Usados", "SUV", "Eléctricos"] },
  { h: "Financiación", items: ["Simulador", "Solicitud", "Compra de cartera", "Esfuerzo mensual"] },
  { h: "Más", items: ["Vender / retomar", "Seguros", "Perfil de movilidad", "Preguntas frecuentes"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-night/50">
      <div className="mx-auto max-w-7xl px-5 py-14">
        {/* Aviso demo */}
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-line bg-panel/50 p-5 text-sm text-muted">
          <Info size={20} className="mt-0.5 shrink-0 text-cobre" />
          <p>
            <strong className="text-ink">VíaNova es un prototipo de demostración.</strong> Vehículos,
            marcas, precios, cuotas, tasas, valoraciones y seguros son <strong>ilustrativos</strong> y no
            representan ofertas reales, aprobaciones ni entidades. No se almacena información personal.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Plataforma digital de movilidad, financiación y protección vehicular. Tu movilidad, en una sola ruta.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="kicker text-ink/70">{c.h}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.items.map((it) => (
                  <li key={it}><a href="#top" className="text-sm text-muted transition hover:text-ink">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-steel sm:flex-row">
          <p>© {new Date().getFullYear()} VíaNova — Prototipo por Estudio Abimaru. Solo demostración.</p>
          <p>Tu movilidad, en una sola ruta.</p>
        </div>
      </div>
    </footer>
  );
}
