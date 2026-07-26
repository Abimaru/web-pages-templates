/* Preguntas frecuentes (§24). Respuestas prudentes, claras y verificables. */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "¿Qué tipo de proyectos atiendes?",
    a: "Arquitectura de software, modernización, backend, cloud, ingeniería inversa, diagnóstico técnico, CI/CD, QA/automatización, documentación técnica e ingeniería de conocimiento para agentes de IA. También construyo aplicaciones personalizadas.",
  },
  {
    q: "¿Trabajas solamente con AWS?",
    a: "No. AWS es una de las tecnologías con las que trabajo (Lambda, Step Functions, API Gateway, DynamoDB, SQS), pero el enfoque es agnóstico: primero el problema y los atributos de calidad, luego la tecnología adecuada.",
  },
  {
    q: "¿Puedes evaluar un sistema sin modificarlo?",
    a: "Sí. Un Architecture Assessment o un Legacy System Discovery son análisis de solo lectura: entrego mapa AS-IS, hallazgos, riesgos y roadmap sin tocar el código de producción.",
  },
  {
    q: "¿Puedes trabajar con sistemas heredados?",
    a: "Sí. Es una de las especialidades: reconstruir flujos, mapear dependencias, identificar reglas de negocio y proponer una modernización progresiva por fases, sin detener la operación.",
  },
  {
    q: "¿Entregas documentación?",
    a: "Sí. La documentación transferible es parte central del trabajo: desde resumen ejecutivo hasta documentación arquitectónica, técnica y operativa. El objetivo es que el conocimiento quede en el equipo.",
  },
  {
    q: "¿También implementas?",
    a: "Sí. No solo diagnostico: diseño y ejecuto. Modernizo servicios, construyo APIs, configuro pipelines, automatizo pruebas y desarrollo aplicaciones.",
  },
  {
    q: "¿Puedes corregir pipelines?",
    a: "Sí. El paquete CI/CD Rescue está enfocado en diagnosticar y estabilizar builds, pruebas, dependencias, análisis de calidad, despliegues y artefactos.",
  },
  {
    q: "¿Trabajas con QA y automatización?",
    a: "Sí. Diseño arquitectura de testing y frameworks de automatización (incluyendo pruebas de ERP), datos y ambientes de prueba, reportes y su integración con CI/CD, pensados para ser mantenibles.",
  },
  {
    q: "¿Qué es Agent Knowledge Engineering?",
    a: "Es convertir conocimiento técnico repetitivo en capacidades reutilizables para agentes de IA y personas: Skills, prompts, referencias, evaluaciones y validadores, con progressive disclosure y gobierno del conocimiento.",
  },
  {
    q: "¿Cómo proteges la información del proyecto?",
    a: "Los casos que muestro están anonimizados y simplificados. No publico nombres de clientes, repositorios, ramas, IDs, URLs internas, secretos ni métricas confidenciales. Trabajo con criterios estrictos de confidencialidad.",
  },
  {
    q: "¿Trabajas por alcance o por horas?",
    a: "Depende del reto. Puede ser una evaluación de alcance cerrado, un sprint de modernización, acompañamiento continuo o consultoría. La modalidad se acuerda al inicio con una cotización personalizada.",
  },
  {
    q: "¿Cómo se inicia una evaluación?",
    a: "Con una conversación breve para entender el contexto y el problema real. A partir de ahí definimos alcance, entregables y una ruta técnica viable. Puedes escribirme por el formulario, WhatsApp o correo.",
  },
];
