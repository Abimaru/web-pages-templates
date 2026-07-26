/* NAF — Nexo Architecture Framework (§16).
 * Metodología PRÁCTICA de trabajo de NEXO LAB. No es un estándar internacional
 * ni una certificación formal. */

export interface NafStage {
  n: number;
  key: string;
  title: string;
  purpose: string;
  items: string[];
  icon: string;
}

export const nafDisclaimer =
  "NAF es la metodología práctica de trabajo de NEXO LAB. No es un estándar internacional ni una certificación formal.";

export const nafStages: NafStage[] = [
  {
    n: 1,
    key: "descubrir",
    title: "Descubrir",
    purpose: "Entender el contexto real antes de proponer nada.",
    items: ["Contexto", "Negocio", "Objetivos", "Restricciones", "Actores"],
    icon: "Compass",
  },
  {
    n: 2,
    key: "mapear",
    title: "Mapear",
    purpose: "Hacer visible cómo funciona hoy el sistema.",
    items: ["Arquitectura", "Flujos", "Dependencias", "Datos", "Integraciones"],
    icon: "Network",
  },
  {
    n: 3,
    key: "diagnosticar",
    title: "Diagnosticar",
    purpose: "Identificar qué duele y por qué, con evidencia.",
    items: ["Riesgos", "Deuda", "Seguridad", "Calidad", "Operación", "Mantenibilidad"],
    icon: "Stethoscope",
  },
  {
    n: 4,
    key: "disenar",
    title: "Diseñar",
    purpose: "Decidir la ruta objetivo con trade-offs explícitos.",
    items: ["Drivers", "Opciones", "Trade-offs", "TO-BE", "Decisiones"],
    icon: "PenTool",
  },
  {
    n: 5,
    key: "ejecutar",
    title: "Ejecutar",
    purpose: "Llevar el diseño a incrementos reales.",
    items: ["Roadmap", "Incrementos", "Desarrollo", "Migración", "Automatización"],
    icon: "Hammer",
  },
  {
    n: 6,
    key: "validar",
    title: "Validar",
    purpose: "Confirmar que funciona y puede operarse.",
    items: ["Pruebas", "Calidad", "Seguridad", "Rendimiento", "Operación", "Evidencia"],
    icon: "ShieldCheck",
  },
  {
    n: 7,
    key: "transferir",
    title: "Transferir",
    purpose: "Dejar el conocimiento en el equipo.",
    items: ["Documentación", "Handoff", "Conocimiento", "Siguientes pasos", "Mantenimiento"],
    icon: "Share2",
  },
];
