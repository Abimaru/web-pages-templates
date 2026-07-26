import { useMemo, useState } from "react";
import { Compass, ArrowLeft, RotateCcw, Sparkles, Info } from "lucide-react";
import Reveal from "../components/Reveal";
import VehicleCard from "../components/VehicleCard";
import { vehicles, type Vehicle } from "../data/vehicles";
import { estimateMonthly } from "../lib/finance";
import { formatCOP, formatCOPShort } from "../lib/format";

type Answers = Record<string, string>;

const steps = [
  { key: "personas", q: "¿Cuántas personas viajan contigo normalmente?", options: [
    { label: "Solo yo o 2", value: "1-2" }, { label: "3 a 4", value: "3-4" }, { label: "5 o más", value: "5+" },
  ]},
  { key: "uso", q: "¿Cuál será el uso principal?", options: [
    { label: "Ciudad", value: "Ciudad" }, { label: "Carretera", value: "Carretera" }, { label: "Mixto", value: "Mixto" }, { label: "Trabajo", value: "Trabajo" },
  ]},
  { key: "presupuesto", q: "¿Cuál es tu presupuesto total?", options: [
    { label: "Hasta $80M", value: "80" }, { label: "$80M – $130M", value: "130" }, { label: "$130M – $180M", value: "180" }, { label: "Más de $180M", value: "999" },
  ]},
  { key: "cuota", q: "¿Cuánto podrías pagar al mes?", options: [
    { label: "Hasta $1,5M", value: "1500000" }, { label: "$1,5M – $2,5M", value: "2500000" }, { label: "$2,5M – $3,5M", value: "3500000" }, { label: "Sin límite claro", value: "999000000" },
  ]},
  { key: "condicion", q: "¿Prefieres nuevo o usado?", options: [
    { label: "Nuevo", value: "Nuevo" }, { label: "Usado", value: "Usado" }, { label: "Indiferente", value: "Indiferente" },
  ]},
  { key: "eco", q: "¿Te interesa híbrido o eléctrico?", options: [
    { label: "Sí, me interesa", value: "si" }, { label: "Tal vez", value: "talvez" }, { label: "No", value: "no" },
  ]},
];

function scoreVehicle(v: Vehicle, a: Answers): number {
  let s = 0;
  const cuota = estimateMonthly(v.price);
  // Personas
  if (a.personas === "5+" && v.seats >= 7) s += 3;
  if (a.personas === "3-4" && v.seats >= 5) s += 2;
  if (a.personas === "1-2") s += 1;
  // Uso
  if (a.uso && v.useCase === a.uso) s += 3;
  if (a.uso === "Mixto" && v.useCase === "Mixto") s += 1;
  // Presupuesto
  const budget = Number(a.presupuesto) * 1_000_000;
  if (v.price <= budget) s += 3; else s -= 2;
  // Cuota
  if (cuota <= Number(a.cuota)) s += 3; else s -= 2;
  // Condición
  if (a.condicion !== "Indiferente" && v.condition === a.condicion) s += 2;
  // Eco
  const eco = v.fuel === "Eléctrico" || v.fuel === "Híbrido";
  if (a.eco === "si" && eco) s += 3;
  if (a.eco === "talvez" && eco) s += 1;
  if (a.eco === "no" && eco) s -= 1;
  s += v.featured ? 0.5 : 0;
  return s;
}

export default function MobilityProfile() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const pick = (value: string) => {
    const key = steps[step].key;
    setAnswers((a) => ({ ...a, [key]: value }));
    if (step < steps.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const result = useMemo(() => {
    if (!done) return null;
    const ranked = [...vehicles].map((v) => ({ v, s: scoreVehicle(v, answers) })).sort((a, b) => b.s - a.s);
    const top = ranked.slice(0, 3).map((r) => r.v);
    const catCount: Record<string, number> = {};
    top.forEach((v) => (catCount[v.type] = (catCount[v.type] || 0) + 1));
    const category = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0][0];
    const minC = Math.min(...top.map((v) => estimateMonthly(v.price)));
    const maxC = Math.max(...top.map((v) => estimateMonthly(v.price)));
    return { top, category, minC, maxC };
  }, [done, answers]);

  const reset = () => { setStep(0); setAnswers({}); setDone(false); };

  return (
    <section id="perfil" className="border-y border-line bg-night/40 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10 text-center">
          <span className="kicker text-cobre-2">Perfil de movilidad</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">¿No sabes por dónde empezar?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">Responde 6 preguntas rápidas y te armamos una ruta recomendada con 3 opciones a tu medida.</p>
        </Reveal>

        {!done ? (
          <Reveal className="mx-auto max-w-2xl">
            <div className="card p-7">
              {/* Progreso */}
              <div className="mb-6 flex items-center gap-2">
                {steps.map((_, i) => (
                  <span key={i} className={`h-1.5 flex-1 rounded-full transition ${i <= step ? "bg-cobre" : "bg-white/10"}`} />
                ))}
              </div>
              <p className="text-sm text-muted">Paso {step + 1} de {steps.length}</p>
              <h3 className="mt-1 font-display text-2xl font-bold">{steps[step].q}</h3>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {steps[step].options.map((o) => {
                  const active = answers[steps[step].key] === o.value;
                  return (
                    <button key={o.value} onClick={() => pick(o.value)} className={`rounded-xl border p-4 text-left font-medium transition ${active ? "border-cobre bg-cobre-soft text-cobre-2" : "border-line bg-panel/40 text-ink hover:border-line-2"}`}>
                      {o.label}
                    </button>
                  );
                })}
              </div>

              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="btn btn-ghost btn-sm mt-6"><ArrowLeft size={15} /> Atrás</button>
              )}
            </div>
          </Reveal>
        ) : (
          result && (
            <div>
              <Reveal className="mx-auto mb-8 max-w-2xl">
                <div className="rounded-2xl border border-cobre/30 bg-gradient-to-br from-panel to-night p-6 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-cobre-soft text-cobre"><Compass size={24} /></span>
                  <p className="mt-3 chip mx-auto w-fit bg-cyan-soft text-cyan"><Sparkles size={12} /> Ruta recomendada</p>
                  <h3 className="mt-3 font-display text-2xl font-bold">Te recomendamos empezar por <span className="text-cobre-2">{result.category}</span></h3>
                  <p className="mt-2 text-muted">Con una cuota estimada entre <strong className="text-ink">{formatCOPShort(result.minC)}</strong> y <strong className="text-ink">{formatCOPShort(result.maxC)}</strong> al mes. Estas 3 opciones encajan con tu perfil:</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <a href="#cockpit" className="btn btn-cobre btn-sm">Simular financiación</a>
                    <button onClick={reset} className="btn btn-ghost btn-sm"><RotateCcw size={14} /> Repetir</button>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {result.top.map((v, i) => (
                  <Reveal key={v.id} delay={i * 70}><VehicleCard v={v} /></Reveal>
                ))}
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-xs text-steel"><Info size={13} /> Recomendación ilustrativa basada en tus respuestas. Cuotas de referencia: {formatCOP(result.minC)}–{formatCOP(result.maxC)}/mes.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
