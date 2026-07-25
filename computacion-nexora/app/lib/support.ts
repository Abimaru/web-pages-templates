import {
  Wrench,
  Database,
  Network,
  ShieldCheck,
  Gauge,
  Headset,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  longDesc: string;
  includes: string[];
  from: string;
  turnaround: string;
};

export const services: Service[] = [
  {
    slug: "mantenimiento-ensamble",
    icon: Wrench,
    title: "Mantenimiento & ensamble",
    desc: "Limpieza profunda, cambio de pasta térmica, upgrades y armado profesional.",
    longDesc:
      "Devolvemos tu equipo a su mejor forma. Limpieza interna profesional, reemplazo de pasta térmica de alto rendimiento, revisión de temperaturas y ensamble o upgrade con cableado impecable. Ideal para equipos que se calientan, hacen ruido o van lentos.",
    includes: [
      "Diagnóstico térmico completo",
      "Limpieza y pasta térmica premium",
      "Gestión de cables profesional",
      "Prueba de estabilidad post-servicio",
    ],
    from: "$90.000",
    turnaround: "24–48 h",
  },
  {
    slug: "recuperacion-de-datos",
    icon: Database,
    title: "Recuperación de datos",
    desc: "Rescatamos información de discos dañados, SSD y memorias con protocolos seguros.",
    longDesc:
      "Un disco muerto no siempre es una despedida. Recuperamos fotos, documentos y proyectos de discos duros, SSD, USB y tarjetas con daño lógico o físico, bajo estrictos protocolos de confidencialidad. Diagnóstico primero: solo cobramos si hay qué recuperar.",
    includes: [
      "Diagnóstico sin compromiso",
      "Recuperación lógica y física",
      "Confidencialidad garantizada",
      "Entrega en medio nuevo cifrado",
    ],
    from: "$150.000",
    turnaround: "2–5 días",
  },
  {
    slug: "redes-servidores",
    icon: Network,
    title: "Redes & servidores",
    desc: "Cableado estructurado, WiFi empresarial, NAS y configuración de servidores.",
    longDesc:
      "Montamos la columna vertebral tecnológica de tu negocio: cableado estructurado, WiFi empresarial sin zonas muertas, NAS para respaldo centralizado y servidores configurados para no fallar. Escalable, documentado y con soporte continuo.",
    includes: [
      "Diseño y cableado estructurado",
      "WiFi empresarial mesh",
      "NAS y servidores",
      "Documentación y monitoreo",
    ],
    from: "Cotización",
    turnaround: "Según proyecto",
  },
  {
    slug: "seguridad-backup",
    icon: ShieldCheck,
    title: "Seguridad & backup",
    desc: "Antivirus, cifrado, respaldo automatizado y auditoría de vulnerabilidades.",
    longDesc:
      "Protegemos lo que más importa: tu información. Implementamos antivirus corporativo, cifrado de discos, respaldo automatizado (local + nube) y auditorías de vulnerabilidades para que un ataque o un descuido no te cueste el negocio.",
    includes: [
      "Antivirus y firewall gestionados",
      "Cifrado de discos",
      "Backup automático 3-2-1",
      "Auditoría de vulnerabilidades",
    ],
    from: "$120.000",
    turnaround: "1–3 días",
  },
  {
    slug: "optimizacion-tuning",
    icon: Gauge,
    title: "Optimización & tuning",
    desc: "Overclock seguro, undervolt, limpieza de software y máximo rendimiento.",
    longDesc:
      "Exprimimos cada FPS y cada segundo de tu equipo. Overclock y undervolt seguros, curvas de ventilación, limpieza de software y arranque, y optimización del sistema para que tu máquina rinda como el primer día — o mejor.",
    includes: [
      "Overclock / undervolt seguro",
      "Curvas térmicas a medida",
      "Limpieza de software y arranque",
      "Benchmarks antes/después",
    ],
    from: "$80.000",
    turnaround: "24 h",
  },
  {
    slug: "soporte-remoto",
    icon: Headset,
    title: "Soporte remoto 24/7",
    desc: "Asistencia inmediata sin salir de casa. Resolvemos conectados a tu equipo.",
    longDesc:
      "¿Un problema que no da espera? Nos conectamos de forma segura a tu equipo y lo resolvemos en el momento, sin que salgas de casa. Ideal para configuraciones, virus, instalaciones y esas urgencias que aparecen a la peor hora.",
    includes: [
      "Conexión remota segura",
      "Atención el mismo día",
      "Configuración e instalaciones",
      "Explicación clara del problema",
    ],
    from: "$50.000",
    turnaround: "Inmediato",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
