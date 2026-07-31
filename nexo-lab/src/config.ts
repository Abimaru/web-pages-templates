/*
 * CONFIGURACIÓN CENTRALIZADA — NEXO LAB by Abimaru
 * ------------------------------------------------
 * Todo lo editable (marca, contacto, enlaces) vive aquí.
 * Los campos vacíos NO se renderizan en la UI (ver helpers `hasContact`).
 *
 * PENDIENTES del propietario (dejar "" hasta confirmar; ver README):
 *   - upwork, linkedin, github, calendly  → aún no confirmados.
 * Correo y WhatsApp se reutilizan de Estudio Abimaru (mismo propietario, ya públicos).
 */

export interface NexoContact {
  email: string;
  whatsapp: string; // formato internacional sin "+" ni espacios
  whatsappDisplay: string;
  upwork: string;
  linkedin: string;
  github: string;
  calendly: string;
}

export interface NexoConfig {
  brand: {
    name: string;
    signature: string;
    descriptor: string;
    proposal: string;
  };
  parentUrl: string; // retorno a Estudio Abimaru
  contact: NexoContact;
}

export const nexoLabConfig: NexoConfig = {
  brand: {
    name: "NEXO LAB",
    signature: "by Abimaru",
    descriptor: "Architecture · Backend · Cloud · AI Engineering",
    proposal: "Arquitectura, modernización y software que sí llega a producción.",
  },
  // En dev es "../"; en el build de Pages la landing vive un nivel arriba.
  parentUrl: "https://abimaru.github.io/web-pages-templates/",
  contact: {
    email: "Abimaru@gmail.com",
    whatsapp: "573157076691",
    whatsappDisplay: "315 707 6691",
    upwork: "https://www.upwork.com/freelancers/~01c36b2b30835641df",
    linkedin: "https://www.linkedin.com/in/andresibarguenco/",
    github: "https://github.com/Abimaru",
    calendly: "", // PENDIENTE: enlace de agenda
  },
};

/** Mensaje base para WhatsApp / correo. */
export const contactIntro =
  "Hola, vengo de NEXO LAB. Me gustaría revisar un reto técnico (arquitectura / modernización / backend / cloud).";

export function waLink(message: string): string {
  return `https://wa.me/${nexoLabConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string): string {
  return `mailto:${nexoLabConfig.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/** Solo devuelve los canales que tienen valor (no renderizar campos vacíos). */
export function activeChannels(): { key: keyof NexoContact; label: string; href: string }[] {
  const c = nexoLabConfig.contact;
  const out: { key: keyof NexoContact; label: string; href: string }[] = [];
  if (c.upwork) out.push({ key: "upwork", label: "Upwork", href: c.upwork });
  if (c.linkedin) out.push({ key: "linkedin", label: "LinkedIn", href: c.linkedin });
  if (c.github) out.push({ key: "github", label: "GitHub", href: c.github });
  if (c.calendly) out.push({ key: "calendly", label: "Agendar", href: c.calendly });
  return out;
}

/* Nexo Network (§25) — red de profesionales. DESHABILITADA: mientras `enabled` sea false NO se
 * muestra ningún equipo (no inventar colaboradores). Al habilitarla, poblar `members` con datos
 * reales confirmados. `capabilities` documenta las áreas futuras. */
export const nexoNetwork: {
  enabled: boolean;
  members: { name: string; role: string }[];
  capabilities: string[];
} = {
  enabled: false,
  members: [],
  capabilities: [
    "UX/UI",
    "Frontend",
    "Backend",
    "Cloud",
    "Seguridad",
    "Datos",
    "QA",
    "Contenido",
    "Marketing",
    "Privacidad/Legal",
  ],
};
