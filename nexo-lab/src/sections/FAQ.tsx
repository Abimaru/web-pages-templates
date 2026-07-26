import Section from "../components/Section";
import { faqs } from "../data/faqs";

export default function FAQ() {
  return (
    <Section
      id="faq"
      alt
      eyebrow="Preguntas frecuentes"
      title="Lo que suelen preguntarme"
      intro="Respuestas claras y verificables. Si falta algo, escríbeme y lo resolvemos."
    >
      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        {faqs.map((f) => (
          <details key={f.q} className="group overflow-hidden rounded-xl border border-line bg-white/[0.03]">
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 font-display text-[0.95rem] font-semibold marker:content-none">
              {f.q}
              <span className="text-cyan text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-4 text-[0.88rem] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
