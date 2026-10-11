import { useId, useState } from "react";
import { MessageCircle, Info } from "lucide-react";
import { whatsappUrl } from "../lib/request";

type Props = {
  /** Mensaje de WhatsApp a partir del nombre (usa los valores simulados). */
  build: (name: string) => string;
  /** Si ya se conoce el nombre (p. ej. en la solicitud completa) no se vuelve a pedir. */
  knownName?: string;
  /** Texto del botón de envío. */
  cta?: string;
};

/** Cierre por WhatsApp para simulaciones y solicitudes (sin backend; la demo no fija número). */
export default function LeadPanel({ build, knownName, cta = "Enviar por WhatsApp" }: Props) {
  const [name, setName] = useState(knownName ?? "");
  const [preview, setPreview] = useState(false);
  const id = useId();
  const needsName = !knownName;
  const canSend = name.trim().length > 0;
  const message = build(name);

  return (
    <div className="rounded-2xl border border-line bg-panel/60 p-4 text-sm">
      {needsName && (
        <>
          <label htmlFor={id} className="font-medium text-ink">Tu nombre</label>
          <input id={id} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="¿Cómo te llamas?" className="field mt-1.5 w-full" />
        </>
      )}
      <a
        href={canSend ? whatsappUrl(message) : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!canSend}
        onClick={(e) => !canSend && e.preventDefault()}
        className={`mt-3 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${canSend ? "bg-[#25d366] text-[#06310f] hover:brightness-105" : "cursor-not-allowed bg-white/10 text-muted"}`}
      >
        <MessageCircle size={17} /> {canSend ? cta : "Escribe tu nombre para enviar"}
      </a>
      <button onClick={() => setPreview((v) => !v)} aria-expanded={preview} className="mt-2 w-full text-center text-xs text-muted underline underline-offset-4">
        {preview ? "Ocultar" : "Ver"} el mensaje que recibiría el asesor
      </button>
      {preview && <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap rounded-xl bg-graphite/70 p-3 text-xs leading-relaxed text-muted">{message}</pre>}
      <p className="mt-2 flex items-start justify-center gap-1.5 text-center text-[11px] text-steel">
        <Info size={12} className="mt-px shrink-0" /> Demo: WhatsApp te deja elegir el chat. VíaNova no vende vehículos ni tramita créditos.
      </p>
    </div>
  );
}
