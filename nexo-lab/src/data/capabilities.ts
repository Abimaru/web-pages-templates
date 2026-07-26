/* Capacidades principales agrupadas por PROBLEMA resuelto (§12).
 * No es una lista plana de herramientas: cada grupo abre con el problema. */

export interface Capability {
  id: string;
  icon: string; // nombre de icono lucide-react
  title: string;
  message: string; // mensaje comercial (§12.x)
  services: string[];
  accent: "cyan" | "electric" | "violet" | "amber" | "mint";
}

export const capabilities: Capability[] = [
  {
    id: "arquitectura",
    icon: "Boxes",
    title: "Arquitectura y modernización",
    message:
      "Diseño rutas de evolución realistas para sistemas que necesitan crecer sin detener el negocio.",
    accent: "cyan",
    services: [
      "Evaluación AS-IS",
      "Diseño TO-BE",
      "Drivers arquitectónicos",
      "Atributos de calidad",
      "Decisiones y trade-offs",
      "Roadmap de modernización",
      "Modularización",
      "Monolito a servicios",
      "Serverless y contenedores",
      "Integración por eventos",
      "Arquitectura híbrida",
    ],
  },
  {
    id: "backend-cloud",
    icon: "Server",
    title: "Backend y cloud engineering",
    message:
      "Construyo y modernizo servicios backend preparados para operación, evolución y mantenimiento.",
    accent: "electric",
    services: [
      "TypeScript · Node.js",
      "Java · Spring Boot",
      "APIs y servicios",
      "AWS Lambda · Step Functions",
      "API Gateway · DynamoDB · SQS",
      "Arquitectura por eventos",
      "Integraciones",
      "Resiliencia",
      "Observabilidad",
      "Seguridad",
    ],
  },
  {
    id: "ingenieria-inversa",
    icon: "Search",
    title: "Ingeniería inversa y diagnóstico",
    message:
      "Entiendo sistemas que nadie documentó y convierto su complejidad en conocimiento utilizable.",
    accent: "violet",
    services: [
      "Evaluación profunda de repositorios",
      "Reconstrucción de flujos",
      "Mapa de dependencias",
      "Identificación de reglas de negocio",
      "Contratos e integraciones",
      "Riesgos y deuda técnica",
      "Análisis de seguridad",
      "Documentación técnica",
      "Roadmap",
    ],
  },
  {
    id: "devops",
    icon: "GitBranch",
    title: "DevOps, calidad y confiabilidad",
    message:
      "No considero terminada una solución hasta que construye, prueba, despliega y puede operarse correctamente.",
    accent: "amber",
    services: [
      "CI/CD (Jenkins · GitHub Actions)",
      "Diagnóstico de pipelines",
      "Builds y dependencias",
      "Terraform · IaC",
      "SonarQube · cobertura",
      "Pruebas y observabilidad",
      "Seguridad",
      "Modernización de workspaces",
    ],
  },
  {
    id: "qa",
    icon: "TestTubes",
    title: "QA y automatización empresarial",
    message:
      "Diseño automatización que reduce fragilidad y mejora la capacidad de evolución del sistema.",
    accent: "mint",
    services: [
      "Arquitectura de testing",
      "Frameworks de automatización",
      "Pruebas de ERP",
      "Datos de prueba y ambientes",
      "Reportes y ejecución",
      "Cobertura",
      "CI/CD para QA",
      "Mantenimiento y transferibilidad",
    ],
  },
  {
    id: "ia",
    icon: "BrainCircuit",
    title: "IA y conocimiento reutilizable",
    message:
      "Transformo conocimiento técnico repetitivo en capacidades reutilizables para personas y agentes.",
    accent: "cyan",
    services: [
      "Agent Skills",
      "Prompts especializados",
      "Plataformas de conocimiento",
      "Progressive disclosure",
      "Evaluaciones y validadores",
      "Documentación reutilizable",
      "Flujos asistidos",
      "Claude Code · Codex",
      "Gobierno del conocimiento",
    ],
  },
  {
    id: "apps",
    icon: "AppWindow",
    title: "Aplicaciones personalizadas",
    message:
      "Convierto una necesidad operativa en una solución funcional, validable y preparada para crecer.",
    accent: "electric",
    services: [
      "Prototipos y MVP",
      "Backend y frontend",
      "Integraciones",
      "Aplicaciones empresariales",
      "Flujos y formularios",
      "Dashboards",
      "Pruebas",
      "Despliegue",
    ],
  },
];
