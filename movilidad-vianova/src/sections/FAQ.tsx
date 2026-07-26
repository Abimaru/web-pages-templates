import Reveal from "../components/Reveal";
import { faqs } from "../data/faqs";

export default function FAQ() {
  return (
    <section id="faq" className="border-y border-line bg-night/40 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="mb-10 text-center">
          <span className="kicker text-cobre-2">Preguntas frecuentes</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Todo claro antes de arrancar</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group overflow-hidden rounded-xl border border-line bg-panel/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-display font-semibold">
                {f.q}
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/5 text-cobre-2 transition group-open:rotate-45">+</span>
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
