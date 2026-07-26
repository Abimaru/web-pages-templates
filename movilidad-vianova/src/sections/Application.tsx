import { useEffect, useMemo, useState } from "react";
import { FileText, ArrowLeft, ArrowRight, Check, PartyPopper, RotateCcw, Info } from "lucide-react";
import Reveal from "../components/Reveal";
import { vehicles, getVehicle } from "../data/vehicles";
import { insurancePlans } from "../data/insurance";
import { scenarios } from "../lib/finance";
import { formatCOP } from "../lib/format";
import { useVehicles } from "../store/vehiclesStore";

const stepNames = ["Datos", "Perfil", "Vehículo", "Preferencias", "Resumen"];
const defaultId = vehicles.find((v) => v.featured)!.id;

type Data = {
  nombre: string; documento: string; ciudad: string; correo: string; telefono: string;
  ocupacion: string; ingresos: string; antiguedad: string; vivienda: string; dependientes: string;
  vehiculo: string; downPct: number; plazo: number;
  seguro: string; acompanamiento: boolean; canal: string; comentarios: string;
  consent: boolean;
};

const initial: Data = {
  nombre: "", documento: "", ciudad: "", correo: "", telefono: "",
  ocupacion: "Empleado", ingresos: "", antiguedad: "1-3 años", vivienda: "Arriendo", dependientes: "0",
  vehiculo: defaultId, downPct: 0.2, plazo: 60,
  seguro: "completo", acompanamiento: true, canal: "WhatsApp", comentarios: "",
  consent: false,
};

export default function Application() {
  const { simulateId } = useVehicles();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(initial);
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => { if (simulateId) setD((x) => ({ ...x, vehiculo: simulateId })); }, [simulateId]);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));
  const vehicle = getVehicle(d.vehiculo)!;
  const scen = useMemo(() => scenarios(vehicle.price, vehicle.price * d.downPct, Number(d.ingresos) || 0), [vehicle, d.downPct, d.ingresos]);
  const plan = insurancePlans.find((p) => p.id === d.seguro) ?? insurancePlans[1];

  const canNext = () => {
    if (step === 0) return d.nombre.trim() && d.correo.trim();
    if (step === 4) return d.consent;
    return true;
  };
  const next = () => { if (!canNext()) return; step < 4 ? setStep(step + 1) : submit(); };
  const submit = () => setSent("VN-" + Math.floor(100000 + Math.random() * 900000));
  const reset = () => { setD(initial); setStep(0); setSent(null); };

  if (sent) {
    return (
      <section id="solicitud" className="mx-auto max-w-3xl px-5 py-20">
        <Reveal>
          <div className="card p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-mint/15 text-mint"><PartyPopper size={30} /></span>
            <p className="mt-4 chip mx-auto w-fit bg-mint/15 text-mint">Solicitud recibida (DEMO)</p>
            <h3 className="mt-3 font-display text-2xl font-bold">¡Gracias, {d.nombre || "conductor"}!</h3>
            <p className="mt-2 text-muted">Tu solicitud demostrativa quedó registrada con el número <strong className="text-ink">{sent}</strong>.</p>

            <div className="mt-6 rounded-2xl border border-line bg-panel/50 p-5 text-left text-sm">
              <div className="flex justify-between border-b border-line py-2"><span className="text-muted">Vehículo</span><span className="font-medium">{vehicle.name}</span></div>
              <div className="flex justify-between border-b border-line py-2"><span className="text-muted">Cuota estimada</span><span className="font-display font-bold text-cobre-2">{formatCOP(scen[1].cuota)}/mes · {scen[1].months} meses</span></div>
              <div className="flex justify-between border-b border-line py-2"><span className="text-muted">Protección</span><span className="font-medium">Plan {plan.name}</span></div>
              <div className="flex justify-between py-2"><span className="text-muted">Contacto</span><span className="font-medium">{d.canal}</span></div>
            </div>

            <div className="mt-5 text-left">
              <p className="font-display font-semibold">Próximos pasos (ilustrativos)</p>
              <ol className="mt-2 space-y-1.5 text-sm text-muted">
                <li>1. Un asesor revisaría tu información.</li>
                <li>2. Validación de identidad y capacidad.</li>
                <li>3. Respuesta con condiciones finales.</li>
              </ol>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-steel"><Info size={13} /> Demo: no se envió ni almacenó ninguna información. No representa una aprobación.</p>
            <button onClick={reset} className="btn btn-cobre mt-6"><RotateCcw size={15} /> Volver al inicio de la solicitud</button>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="solicitud" className="mx-auto max-w-3xl px-5 py-20">
      <Reveal className="mb-8 text-center">
        <span className="kicker text-cobre-2">Solicitud de financiación</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Solicítalo en 5 pasos</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">Flujo demostrativo. No se envían ni guardan datos reales.</p>
      </Reveal>

      <Reveal>
        <div className="card p-6 sm:p-8">
          {/* Stepper */}
          <div className="mb-6 flex items-center gap-1.5">
            {stepNames.map((n, i) => (
              <div key={n} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex w-full items-center">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${i < step ? "bg-mint text-graphite" : i === step ? "bg-cobre text-graphite" : "bg-white/8 text-muted"}`}>{i < step ? <Check size={15} /> : i + 1}</span>
                  {i < stepNames.length - 1 && <span className={`h-0.5 flex-1 ${i < step ? "bg-mint" : "bg-white/10"}`} />}
                </div>
                <span className={`hidden text-[11px] sm:block ${i === step ? "text-ink" : "text-steel"}`}>{n}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          {step === 0 && (
            <div className="grid gap-4">
              <h3 className="font-display text-lg font-bold">Datos básicos</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre completo *"><input className="field" value={d.nombre} onChange={(e) => set("nombre", e.target.value)} autoComplete="name" /></Field>
                <Field label="Documento"><input className="field" value={d.documento} onChange={(e) => set("documento", e.target.value)} inputMode="numeric" /></Field>
                <Field label="Ciudad"><input className="field" value={d.ciudad} onChange={(e) => set("ciudad", e.target.value)} /></Field>
                <Field label="Teléfono"><input className="field" value={d.telefono} onChange={(e) => set("telefono", e.target.value)} inputMode="tel" /></Field>
              </div>
              <Field label="Correo *"><input type="email" className="field" value={d.correo} onChange={(e) => set("correo", e.target.value)} autoComplete="email" /></Field>
              {!canNext() && <p className="text-xs text-cobre-2">Completa nombre y correo para continuar.</p>}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4">
              <h3 className="font-display text-lg font-bold">Tu perfil</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ocupación"><select className="field" value={d.ocupacion} onChange={(e) => set("ocupacion", e.target.value)}><option>Empleado</option><option>Independiente</option><option>Pensionado</option><option>Empresario</option></select></Field>
                <Field label="Ingresos mensuales"><input className="field" value={d.ingresos} onChange={(e) => set("ingresos", e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="Ej: 4500000" /></Field>
                <Field label="Antigüedad laboral"><select className="field" value={d.antiguedad} onChange={(e) => set("antiguedad", e.target.value)}><option>Menos de 1 año</option><option>1-3 años</option><option>Más de 3 años</option></select></Field>
                <Field label="Tipo de vivienda"><select className="field" value={d.vivienda} onChange={(e) => set("vivienda", e.target.value)}><option>Arriendo</option><option>Propia</option><option>Familiar</option></select></Field>
                <Field label="Personas a cargo"><select className="field" value={d.dependientes} onChange={(e) => set("dependientes", e.target.value)}><option>0</option><option>1</option><option>2</option><option>3+</option></select></Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <h3 className="font-display text-lg font-bold">Vehículo y financiación</h3>
              <Field label="Vehículo"><select className="field" value={d.vehiculo} onChange={(e) => set("vehiculo", e.target.value)}>{vehicles.map((v) => <option key={v.id} value={v.id}>{v.name} — {formatCOP(v.price)}</option>)}</select></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-panel/50 p-3 text-sm"><span className="text-muted">Valor</span><p className="font-display font-bold">{formatCOP(vehicle.price)}</p></div>
                <div className="rounded-xl border border-line bg-panel/50 p-3 text-sm"><span className="text-muted">Condición</span><p className="font-display font-bold">{vehicle.condition}</p></div>
              </div>
              <Field label={`Cuota inicial: ${formatCOP(vehicle.price * d.downPct)} (${(d.downPct * 100).toFixed(0)}%)`}><input type="range" min={0} max={0.6} step={0.05} value={d.downPct} onChange={(e) => set("downPct", +e.target.value)} className="range" /></Field>
              <Field label="Plazo"><select className="field" value={d.plazo} onChange={(e) => set("plazo", +e.target.value)}>{[36, 48, 60, 72, 84].map((m) => <option key={m} value={m}>{m} meses</option>)}</select></Field>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <h3 className="font-display text-lg font-bold">Preferencias</h3>
              <Field label="Plan de protección"><select className="field" value={d.seguro} onChange={(e) => set("seguro", e.target.value)}>{insurancePlans.map((p) => <option key={p.id} value={p.id}>Plan {p.name} — desde {formatCOP(p.monthlyFrom)}/mes</option>)}</select></Field>
              <Field label="Canal de contacto"><select className="field" value={d.canal} onChange={(e) => set("canal", e.target.value)}><option>WhatsApp</option><option>Llamada</option><option>Correo</option></select></Field>
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={d.acompanamiento} onChange={(e) => set("acompanamiento", e.target.checked)} className="h-4 w-4 accent-[#e8873a]" /> Quiero acompañamiento de un asesor</label>
              <Field label="Comentarios (opcional)"><textarea rows={3} className="field" value={d.comentarios} onChange={(e) => set("comentarios", e.target.value)} placeholder="¿Algo que debamos saber?" /></Field>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-4">
              <h3 className="font-display text-lg font-bold">Resumen</h3>
              <div className="rounded-2xl border border-line bg-panel/50 p-5 text-sm">
                <Row k="Solicitante" v={d.nombre || "—"} />
                <Row k="Vehículo" v={vehicle.name} />
                <Row k="Cuota inicial" v={`${formatCOP(vehicle.price * d.downPct)} (${(d.downPct * 100).toFixed(0)}%)`} />
                <Row k="Plazo" v={`${d.plazo} meses`} />
                <Row k="Cuota estimada" v={`${formatCOP(scen[1].cuota)}/mes`} strong />
                <Row k="Protección" v={`Plan ${plan.name}`} />
                <Row k="Contacto" v={d.canal} />
              </div>
              <label className="flex items-start gap-3 text-sm"><input type="checkbox" checked={d.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#e8873a]" /> Entiendo que esta es una <strong className="text-ink">solicitud demostrativa</strong>, no se envían datos reales y no representa una aprobación.</label>
              {!d.consent && <p className="text-xs text-cobre-2">Marca la casilla para enviar.</p>}
            </div>
          )}

          {/* Navegación */}
          <div className="mt-7 flex items-center justify-between">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className={`btn btn-ghost btn-sm ${step === 0 ? "opacity-40" : ""}`}><ArrowLeft size={15} /> Atrás</button>
            <button onClick={next} disabled={!canNext()} className={`btn btn-cobre btn-sm ${!canNext() ? "opacity-50" : ""}`}>
              {step < 4 ? <>Siguiente <ArrowRight size={15} /></> : <><FileText size={15} /> Enviar solicitud</>}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm text-muted">{label}</span>{children}</label>;
}
function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return <div className="flex justify-between border-b border-line py-2 last:border-0"><span className="text-muted">{k}</span><span className={strong ? "font-display font-bold text-cobre-2" : "font-medium"}>{v}</span></div>;
}
