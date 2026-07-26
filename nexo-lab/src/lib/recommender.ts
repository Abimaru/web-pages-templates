/* Recomendador de ruta (§11) — lógica PURA y testeable.
 * Resuelve un problema seleccionado en paquetes, capacidad y caso reales.
 * No es un diagnóstico real: son reglas frontend deterministas. */

import { problems, type ProblemOption } from "../data/problems";
import { packages, type ServicePackage } from "../data/packages";
import { capabilities, type Capability } from "../data/capabilities";
import { cases, type CaseStudy } from "../data/cases";

export interface Recommendation {
  problem: ProblemOption;
  packages: ServicePackage[];
  capability: Capability | null;
  relatedCase: CaseStudy | null;
  route: string[];
  cta: { label: string; target: string };
}

export function getProblem(problemId: string): ProblemOption | null {
  return problems.find((p) => p.id === problemId) ?? null;
}

export function recommendFor(problemId: string): Recommendation | null {
  const problem = getProblem(problemId);
  if (!problem) return null;

  const recommendedPackages = problem.packageIds
    .map((id) => packages.find((p) => p.id === id))
    .filter((p): p is ServicePackage => Boolean(p));

  const capability = capabilities.find((c) => c.id === problem.capabilityId) ?? null;
  const relatedCase = cases.find((c) => c.id === problem.caseId) ?? null;

  return {
    problem,
    packages: recommendedPackages,
    capability,
    relatedCase,
    route: problem.route,
    cta: problem.cta,
  };
}
