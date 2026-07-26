/* Selector de problema (§11). Reglas frontend — NO es un diagnóstico real.
 * Cada problema mapea a: paquetes, capacidad, caso relacionado, ruta de trabajo y CTA. */

export interface ProblemOption {
  id: string;
  label: string;
  icon: string;
  /** ids de paquetes recomendados (ver data/packages.ts) */
  packageIds: string[];
  /** id de capacidad principal (ver data/capabilities.ts) */
  capabilityId: string;
  /** id de caso de estudio relacionado (ver data/cases.ts) */
  caseId: string;
  /** ruta de trabajo sugerida (etapas NAF resumidas) */
  route: string[];
  cta: { label: string; target: string };
}

export const problems: ProblemOption[] = [
  {
    id: "entender-legado",
    label: "Entender un sistema heredado",
    icon: "Search",
    packageIds: ["legacy-discovery", "docs-pack"],
    capabilityId: "ingenieria-inversa",
    caseId: "legacy-monolith",
    route: ["Descubrir", "Mapear", "Diagnosticar", "Transferir"],
    cta: { label: "Quiero entender mi sistema", target: "#contacto" },
  },
  {
    id: "disenar-arquitectura",
    label: "Diseñar una arquitectura",
    icon: "Boxes",
    packageIds: ["architecture-assessment", "cloud-blueprint"],
    capabilityId: "arquitectura",
    caseId: "erp-modular",
    route: ["Descubrir", "Diagnosticar", "Diseñar", "Validar"],
    cta: { label: "Diseñemos la arquitectura", target: "#contacto" },
  },
  {
    id: "modernizar-backend",
    label: "Modernizar un backend",
    icon: "Server",
    packageIds: ["backend-sprint", "architecture-assessment"],
    capabilityId: "backend-cloud",
    caseId: "serverless-ts",
    route: ["Diagnosticar", "Diseñar", "Ejecutar", "Validar"],
    cta: { label: "Modernicemos el backend", target: "#contacto" },
  },
  {
    id: "migrar-cloud",
    label: "Migrar a cloud",
    icon: "Cloud",
    packageIds: ["cloud-blueprint", "architecture-assessment"],
    capabilityId: "backend-cloud",
    caseId: "cloud-orchestration",
    route: ["Descubrir", "Diseñar", "Ejecutar", "Validar"],
    cta: { label: "Planeemos la migración", target: "#contacto" },
  },
  {
    id: "cicd-calidad",
    label: "Corregir CI/CD y calidad",
    icon: "GitBranch",
    packageIds: ["cicd-rescue"],
    capabilityId: "devops",
    caseId: "pipeline-recovery",
    route: ["Diagnosticar", "Ejecutar", "Validar"],
    cta: { label: "Rescatemos el pipeline", target: "#contacto" },
  },
  {
    id: "evaluar-repo",
    label: "Evaluar un repositorio",
    icon: "ScanSearch",
    packageIds: ["architecture-assessment", "legacy-discovery"],
    capabilityId: "ingenieria-inversa",
    caseId: "legacy-monolith",
    route: ["Mapear", "Diagnosticar", "Diseñar"],
    cta: { label: "Evaluemos el repositorio", target: "#contacto" },
  },
  {
    id: "construir-app",
    label: "Construir una aplicación",
    icon: "AppWindow",
    packageIds: ["custom-prototype"],
    capabilityId: "apps",
    caseId: "erp-modular",
    route: ["Descubrir", "Diseñar", "Ejecutar", "Validar"],
    cta: { label: "Construyamos la aplicación", target: "#contacto" },
  },
  {
    id: "automatizar-ia",
    label: "Automatizar conocimiento con IA",
    icon: "BrainCircuit",
    packageIds: ["agent-knowledge"],
    capabilityId: "ia",
    caseId: "agent-knowledge",
    route: ["Descubrir", "Diseñar", "Ejecutar", "Transferir"],
    cta: { label: "Automaticemos el conocimiento", target: "#contacto" },
  },
  {
    id: "mejorar-qa",
    label: "Mejorar pruebas y QA",
    icon: "TestTubes",
    packageIds: ["cicd-rescue", "architecture-assessment"],
    capabilityId: "qa",
    caseId: "qa-framework",
    route: ["Diagnosticar", "Diseñar", "Ejecutar", "Validar"],
    cta: { label: "Mejoremos el QA", target: "#contacto" },
  },
  {
    id: "documentar-plataforma",
    label: "Documentar una plataforma compleja",
    icon: "FileText",
    packageIds: ["docs-pack", "legacy-discovery"],
    capabilityId: "ingenieria-inversa",
    caseId: "cloud-orchestration",
    route: ["Descubrir", "Mapear", "Documentar", "Transferir"],
    cta: { label: "Documentemos la plataforma", target: "#contacto" },
  },
];
