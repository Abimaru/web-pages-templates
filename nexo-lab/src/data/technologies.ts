/* Tecnologías que respaldan la propuesta (§18). No dominan el hero.
 * Sin afirmaciones de dominio experto absoluto. */

export interface TechGroup {
  id: string;
  label: string;
  icon: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  {
    id: "backend",
    label: "Backend",
    icon: "Server",
    items: ["TypeScript", "Node.js", "Java", "Spring Boot", "APIs", "Arquitectura hexagonal"],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: "Cloud",
    items: ["AWS", "Lambda", "Step Functions", "API Gateway", "DynamoDB", "SQS", "SSM", "Eventos"],
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: "GitBranch",
    items: ["Jenkins", "GitHub Actions", "Docker", "Terraform", "SonarQube", "CI/CD"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "LayoutDashboard",
    items: ["React", "Angular", "Next.js", "Vite", "Microfrontends", "Design systems"],
  },
  {
    id: "quality",
    label: "Quality",
    icon: "ShieldCheck",
    items: [
      "Testing",
      "QA automation",
      "Cobertura",
      "Análisis estático",
      "Accesibilidad",
      "Observabilidad",
    ],
  },
  {
    id: "ai",
    label: "AI Engineering",
    icon: "BrainCircuit",
    items: ["Claude Code", "Codex", "Agent Skills", "Prompts", "Evaluaciones", "Bases de conocimiento"],
  },
];
