import { Share2, AtSign, Mail } from "lucide-react";
import { Link, homeHref } from "../lib/router";

export default function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-espresso">Atelier</span>
              <span className="font-display text-2xl italic text-terracotta">Ibargüen</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/55">
              Diseño y fabricación de muebles de autor en madera noble. Hecho con oficio
              en Cali, Colombia.
            </p>
            <div className="mt-5 flex gap-3">
              {[Share2, AtSign, Mail].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-espresso/15 text-espresso/70 transition hover:border-espresso hover:text-espresso" aria-label="Red social">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="kicker text-espresso/70">Explorar</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink/60">
              <li><a href={homeHref("#colecciones")} className="transition hover:text-espresso">Colecciones</a></li>
              <li><Link to="/portafolio" className="transition hover:text-espresso">Portafolio</Link></li>
              <li><a href={homeHref("#proceso")} className="transition hover:text-espresso">Fabricación</a></li>
              <li><a href={homeHref("#taller")} className="transition hover:text-espresso">El taller</a></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker text-espresso/70">Contacto</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink/60">
              <li><a href={homeHref("#contacto")} className="transition hover:text-espresso">Cotizar proyecto</a></li>
              <li><a href="#" className="transition hover:text-espresso">Showroom</a></li>
              <li><a href="#" className="transition hover:text-espresso">Preguntas frecuentes</a></li>
              <li><a href="#" className="transition hover:text-espresso">Garantía</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-espresso/10 pt-6 text-xs text-ink/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Atelier Ibargüen — Prototipo por Abimaru. Solo demostración.</p>
          <p>Hecho a mano, como los muebles.</p>
        </div>
      </div>
    </footer>
  );
}
