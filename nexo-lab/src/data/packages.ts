/* Servicios empaquetados (§13). Sin precios inventados: "Cotización personalizada". */

export interface ServicePackage {
  id: string;
  name: string;
  summary: string;
  deliverables: string[];
  accent: "cyan" | "electric" | "violet" | "amber" | "mint";
  icon: string;
}

export const packages: ServicePackage[] = [
  {
    id: "architecture-assessment",
    name: "Architecture Assessment",
    summary: "Evaluación integral de arquitectura, riesgos, deuda, seguridad, calidad y operación.",
    accent: "cyan",
    icon: "ScanSearch",
    deliverables: [
      "Resumen ejecutivo",
      "Mapa AS-IS",
      "Hallazgos priorizados",
      "Matriz de riesgos",
      "Decisiones y trade-offs",
      "Roadmap",
      "Recomendaciones",
    ],
  },
  {
    id: "legacy-discovery",
    name: "Legacy System Discovery",
    summary: "Ingeniería inversa y documentación de sistemas sin conocimiento actualizado.",
    accent: "violet",
    icon: "Radar",
    deliverables: [
      "Flujo funcional",
      "Mapa de dependencias",
      "Contratos",
      "Modelo de persistencia",
      "Integraciones",
      "Riesgos",
      "Conocimiento no resuelto",
      "Propuesta de modernización",
    ],
  },
  {
    id: "backend-sprint",
    name: "Backend Modernization Sprint",
    summary: "Modernización focalizada de una API, Lambda, servicio, workspace o módulo.",
    accent: "electric",
    icon: "Rocket",
    deliverables: [
      "Análisis del módulo",
      "Migración de dependencias",
      "Tipado y refactor",
      "Pruebas",
      "Calidad (análisis estático)",
      "Compatibilidad",
      "Documentación del cambio",
    ],
  },
  {
    id: "cloud-blueprint",
    name: "Serverless & Cloud Blueprint",
    summary: "Diseño de arquitectura cloud por eventos, resiliente, segura y observable.",
    accent: "cyan",
    icon: "Cloud",
    deliverables: [
      "Arquitectura objetivo",
      "Diseño de eventos",
      "Integraciones",
      "Resiliencia",
      "Seguridad",
      "IaC (Terraform)",
      "CI/CD",
      "Observabilidad",
    ],
  },
  {
    id: "cicd-rescue",
    name: "CI/CD Rescue",
    summary: "Diagnóstico y corrección de builds, pipelines y despliegues inestables.",
    accent: "amber",
    icon: "Wrench",
    deliverables: [
      "Diagnóstico de síntomas",
      "Builds",
      "Pipelines",
      "Pruebas",
      "Dependencias",
      "SonarQube",
      "Despliegues y artefactos",
      "Configuración",
    ],
  },
  {
    id: "docs-pack",
    name: "Technical Documentation Pack",
    summary: "Documentación transferible: de lo ejecutivo a lo operativo.",
    accent: "mint",
    icon: "FileText",
    deliverables: [
      "Documentación ejecutiva",
      "Funcional",
      "Arquitectónica",
      "Técnica",
      "Operativa",
      "De riesgos",
      "De modernización",
    ],
  },
  {
    id: "agent-knowledge",
    name: "Agent Knowledge Engineering",
    summary: "Conocimiento técnico convertido en capacidades reutilizables para agentes de IA.",
    accent: "violet",
    icon: "BrainCircuit",
    deliverables: [
      "Skills",
      "Prompts",
      "Referencias",
      "Scripts",
      "Evaluaciones",
      "Validadores",
      "Sincronización",
      "Gobierno",
    ],
  },
  {
    id: "custom-prototype",
    name: "Custom Application Prototype",
    summary: "Prototipo funcional para validar producto, flujo, arquitectura, experiencia e integración.",
    accent: "electric",
    icon: "AppWindow",
    deliverables: [
      "Definición de alcance",
      "Prototipo funcional",
      "Arquitectura base",
      "Integración",
      "Pruebas",
      "Despliegue de demo",
    ],
  },
];
