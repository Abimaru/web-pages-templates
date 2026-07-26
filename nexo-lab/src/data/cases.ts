/* Casos de estudio ANONIMIZADOS (§14, §31, §32).
 * Sin nombres de empresas/clientes/repos, sin métricas confidenciales.
 * Estructura: Contexto → Problema → Evidencia → Análisis → Decisión → Solución → Validación → Transferencia.
 * Los "estados" (Analizado/Modernizado/...) reemplazan métricas de negocio (§15). */

export type CaseCategory =
  | "Modernización"
  | "Cloud"
  | "Legado"
  | "Arquitectura"
  | "QA"
  | "IA"
  | "CI/CD";

export type CaseState =
  | "Analizado"
  | "Documentado"
  | "Validado"
  | "Modernizado"
  | "Automatizado"
  | "Transferido";

export interface CaseStudy {
  id: string;
  title: string;
  category: CaseCategory;
  states: CaseState[];
  context: string;
  challenge: string;
  evidence: string[];
  analysis: string[];
  decisions: string[];
  solution: string[];
  validation: string[];
  transfer: string[];
  technologies: string[];
}

export const confidentialityNote =
  "Los casos presentados han sido anonimizados y simplificados para proteger información confidencial. Se muestran enfoques, decisiones y capacidades, no datos propietarios.";

export const cases: CaseStudy[] = [
  {
    id: "serverless-ts",
    title: "Migración progresiva de servicios JavaScript a TypeScript",
    category: "Modernización",
    states: ["Analizado", "Modernizado", "Validado", "Transferido"],
    context:
      "Conjunto de servicios serverless en JavaScript, sin tipado, con lógica de negocio dispersa y baja cobertura de pruebas.",
    challenge:
      "Mantenibilidad frágil: cambios pequeños producían regresiones difíciles de anticipar y el equipo evitaba tocar módulos críticos.",
    evidence: [
      "Ausencia de contratos explícitos entre funciones",
      "Errores detectados solo en tiempo de ejecución",
      "Dependencias desactualizadas y mezcladas",
    ],
    analysis: [
      "Mapa de módulos y acoplamientos",
      "Puntos de mayor riesgo de regresión",
      "Estrategia incremental viable sin congelar el desarrollo",
    ],
    decisions: [
      "Migración por módulos, no big-bang",
      "Tipado gradual con límites claros",
      "Compatibilidad hacia atrás durante la transición",
    ],
    solution: [
      "Introducción de TypeScript módulo a módulo",
      "Tipos para contratos e integraciones",
      "Pruebas alrededor de la lógica de negocio",
      "Integración con la calidad del pipeline",
    ],
    validation: [
      "Suite de pruebas en verde por incremento",
      "Análisis estático sin regresiones nuevas",
      "Build reproducible en CI/CD",
    ],
    transfer: [
      "Guía de convenciones de tipado",
      "Checklist de migración por módulo",
      "Handoff al equipo para continuar de forma autónoma",
    ],
    technologies: ["TypeScript", "Node.js", "AWS Lambda", "CI/CD", "Testing"],
  },
  {
    id: "cloud-orchestration",
    title: "Evaluación de una plataforma basada en funciones y orquestación",
    category: "Cloud",
    states: ["Analizado", "Documentado", "Validado"],
    context:
      "Plataforma con múltiples funciones coordinadas por una máquina de estados y colas de mensajes.",
    challenge:
      "Comportamientos intermitentes bajo carga: reintentos, timeouts y estados difíciles de observar.",
    evidence: [
      "Trazas incompletas entre pasos",
      "Reintentos sin idempotencia clara",
      "Timeouts no alineados entre capas",
    ],
    analysis: [
      "Reconstrucción del flujo de orquestación",
      "Mapa de dependencias y puntos de fallo",
      "Revisión de resiliencia y observabilidad",
    ],
    decisions: [
      "Definir idempotencia por paso",
      "Alinear timeouts y políticas de reintento",
      "Instrumentar puntos ciegos",
    ],
    solution: [
      "Diseño de resiliencia por evento",
      "Estrategia de observabilidad de extremo a extremo",
      "Roadmap de correcciones priorizadas",
    ],
    validation: [
      "Escenarios de fallo reproducibles",
      "Checks de resiliencia documentados",
    ],
    transfer: [
      "Documento de decisiones",
      "Roadmap por fases",
      "Guía de observabilidad",
    ],
    technologies: ["AWS", "Step Functions", "SQS", "Lambda", "Observabilidad"],
  },
  {
    id: "legacy-monolith",
    title: "Ingeniería inversa y modernización de un monolito empresarial",
    category: "Legado",
    states: ["Analizado", "Documentado", "Modernizado", "Transferido"],
    context:
      "Monolito empresarial sin documentación actualizada; el conocimiento vivía en pocas personas.",
    challenge:
      "Necesidad de evolucionar sin detener la operación, con reglas de negocio implícitas en el código.",
    evidence: [
      "Módulos fuertemente acoplados",
      "Reglas de negocio no documentadas",
      "Deuda técnica acumulada",
    ],
    analysis: [
      "AS-IS del sistema completo",
      "Mapa de dependencias",
      "Identificación de reglas y riesgos",
    ],
    decisions: [
      "Modularización antes de separar servicios",
      "Estrategia por fases (strangler)",
      "Priorización por riesgo y valor",
    ],
    solution: [
      "Definición de TO-BE",
      "Extracción progresiva de módulos",
      "Documentación viva del conocimiento recuperado",
    ],
    validation: [
      "Comportamiento preservado por fase",
      "Pruebas de caracterización",
    ],
    transfer: [
      "Documentación funcional y técnica",
      "Roadmap de modernización",
      "Sesiones de handoff",
    ],
    technologies: ["Java", "Spring Boot", "Arquitectura", "Docker"],
  },
  {
    id: "erp-modular",
    title: "Diseño de una plataforma empresarial modular",
    category: "Arquitectura",
    states: ["Analizado", "Documentado", "Validado"],
    context:
      "Necesidad de una plataforma con módulos claros, límites definidos y capacidad de crecer por partes.",
    challenge:
      "Evitar un nuevo monolito acoplado y permitir despliegues independientes cuando se justifiquen.",
    evidence: [
      "Requisitos transversales de seguridad",
      "Necesidad de persistencia por dominio",
      "Integraciones entre módulos",
    ],
    analysis: [
      "Definición de límites de módulo",
      "Drivers y atributos de calidad",
      "Trade-offs de acoplamiento vs. autonomía",
    ],
    decisions: [
      "Módulos con contratos explícitos",
      "Persistencia por dominio",
      "Seguridad transversal",
    ],
    solution: [
      "Arquitectura modular",
      "Diseño de APIs",
      "Contenerización (Docker)",
      "Calidad integrada al pipeline",
    ],
    validation: [
      "Revisión de atributos de calidad",
      "Pipeline con análisis estático",
    ],
    transfer: [
      "Documento de arquitectura",
      "Guía de módulos y contratos",
    ],
    technologies: ["Arquitectura", "APIs", "Docker", "CI/CD", "SonarQube"],
  },
  {
    id: "qa-framework",
    title: "Evolución de un framework empresarial de pruebas",
    category: "QA",
    states: ["Analizado", "Automatizado", "Validado", "Transferido"],
    context:
      "Framework de automatización de pruebas con mantenimiento costoso y ejecución frágil.",
    challenge:
      "Reducir la fragilidad y mejorar la capacidad de evolución sin frenar los ciclos de entrega.",
    evidence: [
      "Pruebas acopladas a detalles de UI",
      "Datos de prueba poco reutilizables",
      "Reportes difíciles de interpretar",
    ],
    analysis: [
      "Arquitectura del framework",
      "Flujos y puntos de fragilidad",
      "Estrategia de datos y ambientes",
    ],
    decisions: [
      "Capas de abstracción estables",
      "Datos de prueba parametrizados",
      "Reportería accionable",
    ],
    solution: [
      "Rediseño de la arquitectura de testing",
      "Automatización mantenible",
      "Integración con CI/CD",
      "Observabilidad de ejecuciones",
    ],
    validation: [
      "Ejecución estable en pipeline",
      "Cobertura de flujos críticos",
    ],
    transfer: [
      "Guía de mantenimiento",
      "Roadmap de evolución",
      "Handoff al equipo de QA",
    ],
    technologies: ["QA automation", "Testing", "CI/CD", "Reportería"],
  },
  {
    id: "agent-knowledge",
    title: "Diseño de conocimiento reutilizable para agentes de desarrollo",
    category: "IA",
    states: ["Documentado", "Automatizado", "Validado", "Transferido"],
    context:
      "Conocimiento técnico repetitivo disperso, difícil de aplicar de forma consistente por personas y agentes.",
    challenge:
      "Convertir ese conocimiento en capacidades reutilizables, verificables y gobernadas.",
    evidence: [
      "Instrucciones duplicadas y desactualizadas",
      "Falta de criterios de evaluación",
      "Sin mecanismo de sincronización",
    ],
    analysis: [
      "Inventario de conocimiento",
      "Definición de niveles (esencial vs. referencia)",
      "Criterios de evaluación",
    ],
    decisions: [
      "Progressive disclosure",
      "Validadores automáticos",
      "Gobierno del conocimiento",
    ],
    solution: [
      "Diseño de Skills y prompts",
      "Referencias, scripts y assets",
      "Evaluaciones y validadores",
      "Sincronización",
    ],
    validation: [
      "Evaluaciones ejecutables",
      "Checks de consistencia",
    ],
    transfer: [
      "Documentación de la plataforma de conocimiento",
      "Guía de gobierno",
    ],
    technologies: ["Claude Code", "Agent Skills", "Prompts", "Evaluaciones"],
  },
  {
    id: "pipeline-recovery",
    title: "Diagnóstico y estabilización de pipelines de software",
    category: "CI/CD",
    states: ["Analizado", "Validado", "Modernizado"],
    context:
      "Entrega bloqueada por pipelines inestables: builds intermitentes y despliegues poco confiables.",
    challenge:
      "Recuperar la confiabilidad de la entrega y volver a un estado desplegable.",
    evidence: [
      "Fallos no deterministas en build",
      "Dependencias en conflicto",
      "Configuración de entorno divergente",
    ],
    analysis: [
      "Aislar síntomas por etapa",
      "Revisar dependencias y entorno",
      "Reproducir el fallo",
    ],
    decisions: [
      "Fijar y alinear dependencias",
      "Normalizar entorno de build",
      "Separar etapas de calidad y despliegue",
    ],
    solution: [
      "Corrección de build y pruebas",
      "Gestión de artefactos",
      "Configuración reproducible",
    ],
    validation: [
      "Pipeline verde y reproducible",
      "Despliegue verificado",
    ],
    transfer: [
      "Documento de causa y corrección",
      "Guía de operación del pipeline",
    ],
    technologies: ["GitHub Actions", "Jenkins", "Docker", "CI/CD"],
  },
];
