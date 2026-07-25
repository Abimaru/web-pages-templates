/*
 * CATÁLOGO DE PLANTILLAS — configuración
 * ---------------------------------------
 * Para AÑADIR una plantilla nueva: copia un bloque { ... } y edítalo.
 * Campos:
 *   id        identificador único (sin espacios)
 *   name      nombre de la plantilla / marca
 *   tagline   frase corta
 *   desc      descripción (1-2 líneas)
 *   emoji     ícono grande del mockup
 *   tags      etiquetas (rubro, stack, estilo)
 *   accent    color principal (hex)  -> usado en el degradado del preview
 *   accent2   color secundario (hex)
 *   theme     "dark" | "light"  -> look del mockup
 *   demoUrl   URL en vivo (déjala "" hasta publicar; entonces el catálogo la usa)
 *   localUrl  URL local cuando corres el proyecto (npm run dev)
 *   codeUrl   enlace al código en GitHub
 */
window.TEMPLATES = [
  {
    id: "pixelvault",
    name: "PIXELVAULT",
    tagline: "El cofre de tesoros gamer",
    desc: "Tienda de videojuegos, consolas y servicios gamer. Estilo neón/arcade con animaciones de glitch y tilt 3D.",
    emoji: "🎮",
    tags: ["Videojuegos", "Next.js", "Gamer / Neón"],
    accent: "#22e3ff",
    accent2: "#ff2e97",
    theme: "dark",
    demoUrl: "https://abimaru.github.io/web-pages-templates/pixelvault/",
    localUrl: "http://localhost:3000",
    codeUrl: "https://github.com/Abimaru/web-pages-templates/tree/main/videojuegos-pixelvault",
  },
  {
    id: "nexora",
    name: "NEXORA",
    tagline: "Tecnología a la vanguardia",
    desc: "Venta de computadores, componentes y soporte técnico. Estética geek/futurista con terminal animada y núcleo en órbita.",
    emoji: "💻",
    tags: ["Computación", "Next.js", "Tech / Futurista"],
    accent: "#38bdf8",
    accent2: "#6366f1",
    theme: "dark",
    demoUrl: "https://abimaru.github.io/web-pages-templates/nexora/",
    localUrl: "http://localhost:3000",
    codeUrl: "https://github.com/Abimaru/web-pages-templates/tree/main/computacion-nexora",
  },
  {
    id: "atelier",
    name: "Atelier Ibargüen",
    tagline: "Muebles que cuentan tu historia",
    desc: "Mueblería de autor y fabricación a la medida. Tono editorial y cálido, con fotografía real y proceso artesanal.",
    emoji: "🛋️",
    tags: ["Muebles", "Vite + React", "Editorial / Cálido"],
    accent: "#bf6a4b",
    accent2: "#6b4e3d",
    theme: "light",
    demoUrl: "https://abimaru.github.io/web-pages-templates/muebles/",
    localUrl: "http://localhost:5173",
    codeUrl: "https://github.com/Abimaru/web-pages-templates/tree/main/muebles-atelier-ibarguen",
  },
  {
    id: "maru",
    name: "MARÚ",
    tagline: "Viste tu mejor versión",
    desc: "Tienda de moda para mujer, hombre y niños: casual, formal, deportivo y accesorios. Estilo glamour con animaciones sutiles.",
    emoji: "👗",
    tags: ["Moda", "Vite + React", "Glamour / Editorial"],
    accent: "#c07a86",
    accent2: "#b8935f",
    theme: "light",
    demoUrl: "https://abimaru.github.io/web-pages-templates/maru/",
    localUrl: "http://localhost:5173",
    codeUrl: "https://github.com/Abimaru/web-pages-templates/tree/main/ropa-maru",
  },
  {
    id: "vitalis",
    name: "VITALIS",
    tagline: "Tu salud, a un clic de casa",
    desc: "Farmacia digital: medicamentos, vitaminas, dermocosmética y cuidado personal con domicilio. Estilo serio, limpio y confiable.",
    emoji: "💊",
    tags: ["Farmacia", "Vite + React", "Serio / Médico"],
    accent: "#0e78d4",
    accent2: "#10a86e",
    theme: "light",
    demoUrl: "https://abimaru.github.io/web-pages-templates/vitalis/",
    localUrl: "http://localhost:5173",
    codeUrl: "https://github.com/Abimaru/web-pages-templates/tree/main/farmacia-vitalis",
  },
  {
    id: "prospera",
    name: "PRÓSPERA",
    tagline: "Haz crecer tu dinero",
    desc: "Fintech de créditos y ahorro: simulador de crédito, Cuenta Progreso con gráficos de rendimiento, score y datos de mercado (TRM, euro, yuan).",
    emoji: "🏦",
    tags: ["Finanzas", "Vite + React", "Fintech / Consultoría"],
    accent: "#0a6b4a",
    accent2: "#c99a3f",
    theme: "light",
    demoUrl: "https://abimaru.github.io/web-pages-templates/prospera/",
    localUrl: "http://localhost:5173",
    codeUrl: "https://github.com/Abimaru/web-pages-templates/tree/main/finanzas-prospera",
  },
];
