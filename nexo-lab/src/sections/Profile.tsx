import { BadgeCheck, Boxes, Search, Wrench, Share2 } from "lucide-react";
import Section from "../components/Section";
import { NexoAvatar } from "../components/Nexo";

const DIFFERENTIATORS = [
  { icon: Search, title: "Análisis profundo", desc: "Entiendo el sistema con evidencia antes de proponer." },
  { icon: Boxes, title: "Diseño arquitectónico", desc: "Decisiones con drivers y trade-offs explícitos." },
  { icon: Wrench, title: "Ejecución práctica", desc: "No solo diagnostico: construyo y modernizo." },
  { icon: Share2, title: "Transferencia", desc: "Dejo documentación y conocimiento en el equipo." },
];

const CAPABILITIES = [
  "Arquitectura",
  "Desarrollo",
  "Consultoría",
  "Documentación",
  "Liderazgo técnico",
  "Diagnóstico",
  "Modernización",
  "Transferencia",
];

export default function Profile() {
  return (
    <Section id="perfil" alt eyebrow="Perfil profesional">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Senior Software Engineer &{" "}
            <span className="text-gradient">Hands-on Software Architect</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink/80">
            Ingeniero de Sistemas especializado en procesos de desarrollo de software, con experiencia
            en backend, cloud, arquitectura, modernización, automatización, calidad y análisis de
            sistemas complejos.
          </p>

          {/* Diferenciador: 4 capacidades conectadas (§4) */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="flex items-start gap-3 rounded-xl border border-line bg-white/[0.03] p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan/15 text-cyan">
                  <d.icon size={18} />
                </span>
                <div>
                  <p className="font-display text-[0.95rem] font-semibold">{d.title}</p>
                  <p className="mt-0.5 text-[0.82rem] text-muted">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-[0.7rem] uppercase tracking-widest text-steel">Capacidades</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {CAPABILITIES.map((c) => (
                <span key={c} className="chip chip-electric text-[0.72rem]">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Certificaciones — solo confirmadas (§19) */}
          <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-mint/30 bg-mint/[0.06] px-4 py-3">
            <BadgeCheck size={20} className="shrink-0 text-mint" />
            <p className="text-[0.86rem] text-ink/85">
              <span className="font-semibold">AWS Certified Cloud Practitioner</span>
              <span className="text-muted"> · certificación confirmada.</span>
            </p>
          </div>
        </div>

        {/* Sobre Abimaru (§20) */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <NexoAvatar size={56} />
            <h3 className="font-display text-lg font-bold">Sobre Abimaru</h3>
          </div>
          <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/80">
            Me mueve la curiosidad y el aprendizaje continuo. Disfruto entrar en sistemas complejos con
            paciencia y visión práctica, entender por qué son como son y encontrar la ruta para que
            evolucionen.
          </p>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/80">
            Trabajo con profundidad y compromiso con la calidad, construyendo soluciones y dejando
            conocimiento que el equipo pueda mantener. La colaboración y la transferencia son parte del
            resultado, no un extra.
          </p>
        </div>
      </div>
    </Section>
  );
}
