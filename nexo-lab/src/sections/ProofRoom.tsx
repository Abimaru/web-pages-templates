import { Download, Check } from "lucide-react";
import Section from "../components/Section";
import Icon from "../components/Icon";
import { artifacts, type Artifact } from "../data/proofRoom";

function downloadMd(a: Artifact) {
  const blob = new Blob([a.markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const el = document.createElement("a");
  el.href = url;
  el.download = `${a.id}.ejemplo.md`;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ProofRoom() {
  return (
    <Section
      id="proof-room"
      eyebrow="Nexo Proof Room"
      title="Evidencia del trabajo, no promesas"
      intro="Ejemplos de los artefactos que entrego — genéricos y anonimizados. Muestran qué recibes y qué decisión habilita cada uno. Descárgalos en Markdown."
    >
      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-violet/30 bg-violet-soft px-4 py-3">
        <span className="chip chip-violet shrink-0">Ejemplo demostrativo</span>
        <p className="text-[0.83rem] text-ink/80 leading-relaxed">
          Todo el contenido es genérico y anonimizado: no incluye clientes, repositorios, nombres,
          IDs, URLs internas ni datos reales.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {artifacts.map((a) => (
          <article key={a.id} className="card card-hover flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-cyan">
                <Icon name={a.icon} size={22} />
              </span>
              <h3 className="font-display text-[1.02rem] font-bold leading-tight">{a.name}</h3>
            </div>

            <p className="mt-3 text-[0.86rem] text-ink/80 leading-relaxed">{a.purpose}</p>

            <dl className="mt-4 space-y-2 text-[0.82rem]">
              <div>
                <dt className="text-[0.68rem] uppercase tracking-widest text-steel">Habilita decidir</dt>
                <dd className="text-ink/80">{a.enables}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] uppercase tracking-widest text-steel">Recibes</dt>
                <dd className="text-ink/80">{a.delivers}</dd>
              </div>
            </dl>

            <button onClick={() => downloadMd(a)} className="btn btn-ghost btn-sm mt-5 self-start">
              <Download size={15} /> Descargar ejemplo (.md)
            </button>
          </article>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 text-[0.82rem] text-muted">
        <Check size={15} className="text-mint" /> Generado en tu navegador. Nada se envía ni se
        almacena.
      </p>
    </Section>
  );
}
