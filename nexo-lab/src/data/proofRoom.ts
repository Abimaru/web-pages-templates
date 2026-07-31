/* Proof Room (§22) — artefactos de EJEMPLO, genéricos y anonimizados.
 * No contienen información laboral, clientes, repos ni datos reales. Cada uno se marca como
 * "Ejemplo demostrativo". Sirven para mostrar QUÉ recibe el cliente, no trabajo confidencial. */

export interface Artifact {
  id: string;
  name: string;
  icon: string; // nombre lucide (usado con Icon)
  purpose: string; // para qué sirve
  enables: string; // qué decisión habilita
  delivers: string; // qué recibe el cliente
  markdown: string; // contenido descargable (.md)
}

const NOTE = "> Ejemplo demostrativo genérico y anonimizado. No representa un proyecto ni datos reales.\n\n";

export const artifacts: Artifact[] = [
  {
    id: "architecture-assessment",
    name: "Architecture Assessment — Resumen",
    icon: "ScanSearch",
    purpose: "Da una foto del estado de una arquitectura: riesgos, deuda y oportunidades.",
    enables: "Decidir dónde invertir primero y con qué prioridad.",
    delivers: "Resumen ejecutivo, hallazgos priorizados y recomendaciones.",
    markdown:
      NOTE +
      "# Architecture Assessment — Resumen ejecutivo\n\n" +
      "## Contexto\nPlataforma con varios servicios y una base de datos central. Crecimiento sostenido.\n\n" +
      "## Hallazgos (priorizados)\n1. Acoplamiento alto entre módulos → cambios costosos.\n2. Cobertura de pruebas baja en la lógica crítica.\n3. Sin observabilidad de extremo a extremo.\n\n" +
      "## Riesgos\n- Regresiones difíciles de anticipar (Alto).\n- Puntos ciegos en producción (Medio).\n\n" +
      "## Recomendaciones\n- Modularizar antes de separar servicios.\n- Pruebas de caracterización en la lógica clave.\n- Instrumentar trazas y métricas.\n\n" +
      "## Roadmap sugerido\nFase 1: estabilizar · Fase 2: modularizar · Fase 3: escalar.\n",
  },
  {
    id: "as-is-to-be",
    name: "AS-IS / TO-BE",
    icon: "GitMerge",
    purpose: "Compara la arquitectura actual con la objetivo y la ruta entre ambas.",
    enables: "Acordar hacia dónde ir sin detener la operación.",
    delivers: "Diagrama/descripción AS-IS, TO-BE y etapas de migración.",
    markdown:
      NOTE +
      "# AS-IS / TO-BE\n\n## AS-IS (hoy)\n- Monolito único, un despliegue, un punto de fallo.\n- Integraciones puntuales sin contratos claros.\n\n" +
      "## TO-BE (objetivo)\n- Módulos con límites y contratos explícitos.\n- Integración por eventos y observabilidad.\n\n" +
      "## Migración (por fases)\n1. Modularizar dentro del monolito.\n2. Extraer el primer módulo de alto valor/riesgo.\n3. Repetir con criterio de valor.\n\n" +
      "> Ninguna opción es mejor siempre: depende de drivers, equipo y contexto.\n",
  },
  {
    id: "adr",
    name: "ADR de ejemplo",
    icon: "FileText",
    purpose: "Registra una decisión arquitectónica: contexto, decisión y consecuencias.",
    enables: "Que el equipo entienda el porqué, no solo el qué.",
    delivers: "Un ADR breve e inmutable por decisión relevante.",
    markdown:
      NOTE +
      "# 000X — Elegir cola de mensajes para desacoplar procesos\n\n" +
      "- Estado: Aceptado\n- Fecha: AAAA-MM-DD\n\n" +
      "## Contexto\nDos procesos se llaman de forma síncrona y se bloquean bajo carga.\n\n" +
      "## Decisión\nIntroducir una cola para desacoplar y dar reintentos idempotentes.\n\n" +
      "## Alternativas\n- Llamada síncrona con reintentos (rechazada: acoplamiento).\n- Batch nocturno (rechazada: latencia).\n\n" +
      "## Consecuencias\n+ Resiliencia y desacople. − Nueva pieza a operar y monitorear.\n",
  },
  {
    id: "risk-matrix",
    name: "Matriz de riesgos",
    icon: "ShieldCheck",
    purpose: "Ordena los riesgos por impacto y probabilidad, con evidencia y mitigación.",
    enables: "Priorizar qué mitigar primero.",
    delivers: "Tabla de riesgos con estado y plan de mitigación.",
    markdown:
      NOTE +
      "# Matriz de riesgos\n\n| Riesgo | Impacto | Probabilidad | Evidencia | Mitigación |\n|---|---|---|---|---|\n" +
      "| Dependencia desactualizada | Medio | Media | Conflictos en el build | Fijar y validar en CI |\n" +
      "| Cobertura baja en módulo crítico | Alto | Media | Sin pruebas en reglas clave | Pruebas de caracterización |\n" +
      "| Timeout no alineado | Medio | Baja | Límites distintos por capa | Alinear y reintentos idempotentes |\n",
  },
  {
    id: "pipeline",
    name: "Pipeline de entrega",
    icon: "Workflow",
    purpose: "Describe el flujo desde el commit hasta producción, con puertas de calidad.",
    enables: "Entregar de forma repetible y segura.",
    delivers: "Definición de etapas y criterios para avanzar/detener.",
    markdown:
      NOTE +
      "# Pipeline de entrega\n\nCommit → Build → Test → Quality → Security → Artifact → Deploy → Observe\n\n" +
      "## Puertas\n- No avanza si falla build, test o análisis de calidad.\n- Despliegue solo con artefacto verificado.\n- Post-deploy: métricas y trazas.\n",
  },
  {
    id: "security-checklist",
    name: "Checklist de seguridad",
    icon: "Lock",
    purpose: "Lista de verificación de seguridad para revisar antes de publicar.",
    enables: "Reducir la superficie de riesgo con criterio.",
    delivers: "Checklist accionable por proyecto.",
    markdown:
      NOTE +
      "# Checklist de seguridad (extracto)\n\n- [ ] Datos clasificados (público / sensible).\n- [ ] Validación de entradas y salidas.\n" +
      "- [ ] Control de acceso y permisos mínimos.\n- [ ] Dependencias auditadas.\n- [ ] Sin secretos en el repositorio.\n" +
      "- [ ] HTTPS y cabeceras de seguridad.\n- [ ] Trazabilidad y registro de eventos.\n- [ ] Plan de recuperación y respaldo.\n",
  },
  {
    id: "test-report",
    name: "Reporte de pruebas",
    icon: "TestTubes",
    purpose: "Resume el estado de las pruebas y qué se cubrió.",
    enables: "Confiar en que lo crítico está verificado.",
    delivers: "Resumen de suites, casos y resultado.",
    markdown:
      NOTE +
      "# Reporte de pruebas\n\n## Resumen\n- Suites: N · Casos: M · Resultado: en verde.\n\n" +
      "## Cobertura (foco)\n- Lógica financiera: casos límite (cero, negativos, no finitos, redondeo).\n" +
      "- Integridad de datos: ids únicos, campos requeridos.\n\n> Los números son ejemplos; en un proyecto real provienen del runner.\n",
  },
  {
    id: "handoff",
    name: "Handoff",
    icon: "Share2",
    purpose: "Traspasa el conocimiento para que el equipo opere y evolucione.",
    enables: "Autonomía del equipo tras la entrega.",
    delivers: "Guía de operación, decisiones y siguientes pasos.",
    markdown:
      NOTE +
      "# Handoff\n\n## Cómo correr y desplegar\nComandos, variables y entornos.\n\n## Decisiones clave\nEnlace a los ADR.\n\n" +
      "## Operación\nMonitoreo, alertas y recuperación.\n\n## Siguientes pasos\nBacklog priorizado y riesgos abiertos.\n",
  },
  {
    id: "modernization-roadmap",
    name: "Roadmap de modernización",
    icon: "Route",
    purpose: "Ordena la modernización por fases realistas.",
    enables: "Avanzar sin detener el negocio.",
    delivers: "Roadmap por fases con objetivos y criterios.",
    markdown:
      NOTE +
      "# Roadmap de modernización\n\n## Fase 1 — Estabilizar\nBuild reproducible, pruebas base, observabilidad mínima.\n\n" +
      "## Fase 2 — Modularizar\nLímites claros, contratos, extracción del primer módulo.\n\n" +
      "## Fase 3 — Escalar\nServicios donde se justifique, resiliencia y costos bajo control.\n",
  },
  {
    id: "skill-pack",
    name: "Skill / knowledge pack",
    icon: "BrainCircuit",
    purpose: "Convierte conocimiento repetitivo en capacidad reutilizable para agentes y personas.",
    enables: "Consistencia y velocidad con gobierno.",
    delivers: "Skill con instrucciones, referencias, validadores y evaluación.",
    markdown:
      NOTE +
      "# Skill / knowledge pack (estructura)\n\n- Instrucciones esenciales (siempre cargadas).\n- Referencias (bajo demanda).\n" +
      "- Scripts y assets.\n- Evaluaciones y validadores.\n- Gobierno y sincronización.\n\n> Progressive disclosure: solo lo esencial está siempre presente.\n",
  },
];
