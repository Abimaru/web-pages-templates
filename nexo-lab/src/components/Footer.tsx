import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import { nexoLabConfig, waLink, contactIntro, activeChannels } from "../config";
import { confidentialityNote } from "../data/cases";

const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#casos", label: "Casos" },
  { href: "#naf", label: "Metodología" },
  { href: "#laboratorio", label: "Laboratorio" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  const c = nexoLabConfig.contact;
  const channels = activeChannels();

  return (
    <footer className="border-t border-line pt-14 pb-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Arquitectura, backend, cloud, modernización, diagnóstico técnico e ingeniería de
              conocimiento para equipos y empresas.
            </p>
            <a
              href={nexoLabConfig.parentUrl}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-cyan hover:underline"
            >
              <ArrowLeft size={15} /> Volver a Estudio Abimaru
            </a>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-8">
            <div>
              <p className="kicker text-steel mb-3">Explorar</p>
              <ul className="space-y-2.5">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-muted hover:text-ink transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker text-steel mb-3">Contacto</p>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={waLink(contactIntro)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    WhatsApp {c.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    {c.email}
                  </a>
                </li>
                {channels.map((ch) => (
                  <li key={ch.key}>
                    <a
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-ink transition-colors"
                    >
                      {ch.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-5 text-xs leading-relaxed text-steel">
          {confidentialityNote}
        </p>
        <p className="mt-3 text-xs text-steel">
          © {new Date().getFullYear()} NEXO LAB · una línea de Estudio Abimaru. Los casos son
          anonimizados e ilustrativos; no representan datos propietarios ni ofertas contractuales.
        </p>
      </div>
    </footer>
  );
}
