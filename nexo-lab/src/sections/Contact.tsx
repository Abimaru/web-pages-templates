import { useState } from "react";
import { MessageCircle, Mail, Check, ArrowLeft } from "lucide-react";
import Section from "../components/Section";
import { NexoCallout } from "../components/Nexo";
import { nexoLabConfig, waLink, mailtoLink, activeChannels } from "../config";

const CHALLENGE_TYPES = [
  "Arquitectura",
  "Modernización",
  "Backend",
  "Cloud",
  "Repositorio",
  "CI/CD",
  "QA",
  "Documentación",
  "Agentes de IA",
  "Aplicación personalizada",
  "Otro",
];

const URGENCY = ["Explorando", "Este trimestre", "Pronto", "Urgente"];
const CHANNELS = ["WhatsApp", "Correo", "Videollamada"];

interface FormState {
  nombre: string;
  empresa: string;
  correo: string;
  reto: string;
  contexto: string;
  estado: string;
  objetivo: string;
  urgencia: string;
  descripcion: string;
  canal: string;
}

const EMPTY: FormState = {
  nombre: "",
  empresa: "",
  correo: "",
  reto: CHALLENGE_TYPES[0],
  contexto: "",
  estado: "",
  objetivo: "",
  urgencia: URGENCY[0],
  descripcion: "",
  canal: CHANNELS[0],
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const c = nexoLabConfig.contact;
  const channels = activeChannels();

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function buildMessage(): string | null {
    if (!form.nombre.trim()) {
      alert("Por favor indica tu nombre.");
      return null;
    }
    return (
      `Hola, soy ${form.nombre}${form.empresa ? ` (${form.empresa})` : ""}.\n` +
      `Tipo de reto: ${form.reto}.\n` +
      (form.contexto ? `Tecnología/contexto: ${form.contexto}.\n` : "") +
      (form.estado ? `Estado actual: ${form.estado}.\n` : "") +
      (form.objetivo ? `Objetivo: ${form.objetivo}.\n` : "") +
      `Urgencia: ${form.urgencia}.\n` +
      `Canal preferido: ${form.canal}.\n` +
      (form.correo ? `Correo: ${form.correo}.\n` : "") +
      (form.descripcion ? `\nDescripción: ${form.descripcion}` : "")
    );
  }

  function sendWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    const msg = buildMessage();
    if (!msg) return;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  function sendEmail() {
    const msg = buildMessage();
    if (!msg) return;
    const subject = `NEXO LAB — ${form.reto}${form.empresa ? ` · ${form.empresa}` : ""}`;
    window.location.href = mailtoLink(subject, msg);
    setSent(true);
  }

  return (
    <Section
      id="contacto"
      eyebrow="Contacto"
      title="¿Tienes un sistema difícil de entender, modernizar o hacer crecer?"
      intro="Revisemos el contexto, identifiquemos el problema real y construyamos una ruta técnica viable."
    >
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Panel de canales */}
        <div>
          <NexoCallout message="Cuéntame el contexto y el problema real. Con eso definimos alcance, entregables y una ruta viable." />

          <div className="mt-6 flex flex-col gap-2.5">
            <a href={waLink("Hola, vengo de NEXO LAB y quiero comentar un reto técnico.")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <MessageCircle size={17} /> WhatsApp {c.whatsappDisplay}
            </a>
            <a href={`mailto:${c.email}`} className="btn btn-ghost">
              <Mail size={17} /> {c.email}
            </a>
            {channels.map((ch) => (
              <a key={ch.key} href={ch.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {ch.label}
              </a>
            ))}
            <a href={nexoLabConfig.parentUrl} className="inline-flex items-center gap-1.5 mt-1 text-sm text-muted hover:text-ink">
              <ArrowLeft size={15} /> Volver a Estudio Abimaru
            </a>
          </div>

          <p className="mt-5 text-[0.76rem] leading-relaxed text-steel">
            No se almacena información en ningún servidor: el formulario solo arma un mensaje y abre tu
            WhatsApp o tu correo.
          </p>
        </div>

        {/* Formulario */}
        {sent ? (
          <div className="glass flex flex-col items-center justify-center rounded-2xl p-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-mint/15 text-mint">
              <Check size={28} />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">Mensaje listo</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Se abrió tu WhatsApp o correo con el mensaje preparado. Si no se abrió, usa los botones de
              la izquierda. (Confirmación de demostración — no se envió nada automáticamente.)
            </p>
            <button onClick={() => setSent(false)} className="btn btn-ghost btn-sm mt-5">
              Editar de nuevo
            </button>
          </div>
        ) : (
          <form onSubmit={sendWhatsApp} className="glass grid gap-4 rounded-2xl p-6" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-nombre">Nombre</label>
                <input id="c-nombre" className="field" autoComplete="name" required value={form.nombre} onChange={set("nombre")} />
              </div>
              <div>
                <label htmlFor="c-empresa">Empresa (opcional)</label>
                <input id="c-empresa" className="field" value={form.empresa} onChange={set("empresa")} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-correo">Correo</label>
                <input id="c-correo" type="email" className="field" autoComplete="email" value={form.correo} onChange={set("correo")} />
              </div>
              <div>
                <label htmlFor="c-reto">Tipo de reto</label>
                <select id="c-reto" className="field" value={form.reto} onChange={set("reto")}>
                  {CHALLENGE_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="c-contexto">Tecnología o contexto</label>
              <input id="c-contexto" className="field" placeholder="Ej: Node.js + AWS Lambda, monolito Java, pipeline en Jenkins…" value={form.contexto} onChange={set("contexto")} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-estado">Estado actual</label>
                <input id="c-estado" className="field" placeholder="Ej: en producción, sin documentación…" value={form.estado} onChange={set("estado")} />
              </div>
              <div>
                <label htmlFor="c-objetivo">Objetivo</label>
                <input id="c-objetivo" className="field" placeholder="Ej: modernizar, entender, estabilizar…" value={form.objetivo} onChange={set("objetivo")} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-urgencia">Urgencia</label>
                <select id="c-urgencia" className="field" value={form.urgencia} onChange={set("urgencia")}>
                  {URGENCY.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="c-canal">Canal preferido</label>
                <select id="c-canal" className="field" value={form.canal} onChange={set("canal")}>
                  {CHANNELS.map((ch) => (
                    <option key={ch}>{ch}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="c-desc">Descripción</label>
              <textarea id="c-desc" className="field min-h-[90px] resize-y" placeholder="Cuéntame el reto con tus palabras." value={form.descripcion} onChange={set("descripcion")} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button type="submit" className="btn btn-primary">
                <MessageCircle size={16} /> Enviar por WhatsApp
              </button>
              <button type="button" onClick={sendEmail} className="btn btn-ghost">
                <Mail size={16} /> Enviar por correo
              </button>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
