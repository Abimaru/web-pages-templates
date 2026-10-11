import { useId, useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../lib/request";

type Props = {
  /** Texto del botón principal. */
  label: ReactNode;
  /** Clase del botón principal (btn-gold / btn-primary). */
  className: string;
  /** Mensaje de WhatsApp a partir del nombre (usa los valores del simulador). */
  build: (name: string) => string;
};

/** CTA de simulador: pide solo el nombre y arma la solicitud por WhatsApp (sin backend). */
export default function LeadCta({ label, className, build }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(false);
  const id = useId();
  const canSend = name.trim().length > 0;
  const message = build(name);

  return (
    <div className="mt-5">
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={id} className={`${className} w-full justify-center`}>
        {label}
      </button>
      {open && (
        <div id={id} className="mt-3 rounded-2xl border border-mist bg-paper p-4">
          <label htmlFor={`${id}-n`} className="text-sm font-medium text-slate">Tu nombre</label>
          <input
            id={`${id}-n`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            autoFocus
            placeholder="¿Cómo te llamas?"
            className="mt-1.5 w-full rounded-xl border border-mist bg-white px-3 py-2.5 text-sm outline-none transition focus:border-forest"
          />
          <a
            href={canSend ? whatsappUrl(message) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!canSend}
            onClick={(e) => !canSend && e.preventDefault()}
            className={`mt-3 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${canSend ? "bg-[#25d366] text-[#06310f] hover:brightness-105" : "cursor-not-allowed bg-ink/10 text-ink/40"}`}
          >
            <MessageCircle size={17} /> {canSend ? "Enviar por WhatsApp" : "Escribe tu nombre para enviar"}
          </a>
          <button onClick={() => setPreview((v) => !v)} aria-expanded={preview} className="mt-2 w-full text-center text-xs text-slate underline underline-offset-4">
            {preview ? "Ocultar" : "Ver"} el mensaje que recibirá la entidad
          </button>
          {preview && <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-xl bg-white p-3 text-xs leading-relaxed text-slate">{message}</pre>}
          <p className="mt-2 text-center text-[11px] text-slate/70">Demo: WhatsApp te deja elegir el chat. No es una solicitud real ni una oferta.</p>
        </div>
      )}
    </div>
  );
}
