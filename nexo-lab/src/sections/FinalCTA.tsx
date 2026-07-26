import { ArrowRight, ArrowLeft } from "lucide-react";
import { NexoAvatar } from "../components/Nexo";
import { useReveal } from "../hooks/useReveal";
import { nexoLabConfig, activeChannels } from "../config";

export default function FinalCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const upwork = activeChannels().find((c) => c.key === "upwork");

  return (
    <section className="py-16 sm:py-20">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl px-5 sm:px-6 reveal ${visible ? "is-visible" : ""}`}
      >
        <div className="relative overflow-hidden rounded-3xl border border-cyan/30 bg-gradient-to-br from-[#3b82f61a] via-[#8b5cf614] to-[#22d3ee14] p-8 text-center sm:p-12">
          <div className="bg-grid bg-grid-mask absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
          <div className="flex justify-center">
            <NexoAvatar size={72} />
          </div>
          <p className="kicker text-cyan mt-4">Analicemos tu proyecto</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {nexoLabConfig.brand.proposal}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.98rem] text-ink/75">
            Convierto sistemas complejos en soluciones claras, modernas, operables y preparadas para
            evolucionar.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#contacto" className="btn btn-primary">
              Solicitar evaluación <ArrowRight size={16} />
            </a>
            {upwork && (
              <a href={upwork.href} target="_blank" rel="noopener noreferrer" className="btn btn-violet">
                Contactar por Upwork
              </a>
            )}
            <a href={nexoLabConfig.parentUrl} className="btn btn-ghost">
              <ArrowLeft size={15} /> Volver a Estudio Abimaru
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
