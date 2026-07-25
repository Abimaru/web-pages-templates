export type Game = {
  slug: string;
  title: string;
  genre: string;
  platforms: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  tag?: string;
  gradient: string;
  emoji: string;
  description: string;
  highlights: string[];
};

export const PLATFORMS = ["PS5", "Xbox", "Switch", "PC"] as const;

export const formatCOP = (n: number) => "$" + n.toLocaleString("es-CO");

export const games: Game[] = [
  {
    slug: "neon-drift-x",
    title: "Neon Drift X",
    genre: "Carreras",
    platforms: ["PS5", "Xbox", "PC"],
    price: 189900,
    oldPrice: 229900,
    rating: 4.8,
    tag: "-18%",
    gradient: "linear-gradient(150deg,#ff2e97,#8b5cf6 55%,#22e3ff)",
    emoji: "🏎️",
    description:
      "Derrapa a 300 km/h por ciudades de neón en el arcade de carreras más adrenalínico del año. Personaliza tu bólido, domina el nitro y conquista ligas online.",
    highlights: ["120 pistas en ciudades neón", "Multijugador de 24 corredores", "Editor de autos y calcas", "Modo foto cinematográfico"],
  },
  {
    slug: "guardianes-del-vacio",
    title: "Guardianes del Vacío",
    genre: "RPG / Aventura",
    platforms: ["PS5", "PC"],
    price: 249900,
    rating: 5,
    tag: "NUEVO",
    gradient: "linear-gradient(150deg,#22e3ff,#0b0820 60%,#8b5cf6)",
    emoji: "🗡️",
    description:
      "Un RPG épico de mundo abierto donde tus decisiones reescriben el destino de una galaxia al borde del colapso. Forja alianzas, domina la magia estelar y enfrenta al Vacío.",
    highlights: ["Mundo abierto de 80 horas", "Historia ramificada", "Combate táctico en tiempo real", "Doblaje al español"],
  },
  {
    slug: "pixel-kingdom",
    title: "Pixel Kingdom",
    genre: "Plataformas",
    platforms: ["Switch", "PC"],
    price: 79900,
    rating: 4.5,
    tag: "INDIE",
    gradient: "linear-gradient(150deg,#b6ff3c,#22e3ff 60%,#120d2e)",
    emoji: "🍄",
    description:
      "Un homenaje pixel-perfect a los plataformeros clásicos, con niveles diseñados a mano, jefes gigantes y un cooperativo local para toda la familia.",
    highlights: ["Cooperativo local 2 jugadores", "60 niveles hechos a mano", "Bandas sonora chiptune", "Perfecto para niños"],
  },
  {
    slug: "orbita-cero",
    title: "Órbita Cero",
    genre: "Shooter",
    platforms: ["PS5", "Xbox", "PC"],
    price: 219900,
    rating: 4.7,
    gradient: "linear-gradient(150deg,#120d2e,#8b5cf6 50%,#ff2e97)",
    emoji: "🚀",
    description:
      "Shooter espacial en gravedad cero: flota, apunta y dispara en 360°. Campaña cinematográfica y un competitivo por equipos que premia la estrategia.",
    highlights: ["Combate en gravedad cero", "Modo ranked 5v5", "Campaña de 12 misiones", "Cross-play total"],
  },
  {
    slug: "reino-de-sombras",
    title: "Reino de Sombras",
    genre: "Souls-like",
    platforms: ["PS5", "PC"],
    price: 259900,
    rating: 4.9,
    tag: "TOP",
    gradient: "linear-gradient(150deg,#8b5cf6,#06040f 55%,#ff2e97)",
    emoji: "🐉",
    description:
      "Un desafío brutal y hermoso. Explora un reino maldito, aprende los patrones de cada jefe y levántate una y otra vez. Morir es parte del camino.",
    highlights: ["30 jefes memorables", "Dificultad legendaria", "Lore profundo y oculto", "Modo new game+"],
  },
  {
    slug: "turbo-futbol-26",
    title: "Turbo Fútbol 26",
    genre: "Deportes",
    platforms: ["PS5", "Xbox", "Switch"],
    price: 199900,
    oldPrice: 239900,
    rating: 4.3,
    tag: "-16%",
    gradient: "linear-gradient(150deg,#b6ff3c,#0b0820 60%,#22e3ff)",
    emoji: "⚽",
    description:
      "El fútbol arcade que tus tardes con amigos pedían: rápido, espectacular y con chilenas imposibles. Modo carrera, torneos y online.",
    highlights: ["Modo carrera de manager", "Multijugador local 4 jugadores", "Torneos online", "Equipos actualizados"],
  },
  {
    slug: "cyber-katana",
    title: "Cyber Katana",
    genre: "Acción",
    platforms: ["PS5", "Xbox", "PC"],
    price: 229900,
    rating: 4.6,
    gradient: "linear-gradient(150deg,#ff2e97,#120d2e 60%,#22e3ff)",
    emoji: "⚔️",
    description:
      "Corta, esquiva y encadena combos imposibles como un ronin cibernético en una metrópolis distópica. Acción frenética con estilo anime.",
    highlights: ["Combate de combos fluido", "Estética cyberpunk-anime", "Jefes de pantalla completa", "Banda sonora synthwave"],
  },
  {
    slug: "granja-estelar",
    title: "Granja Estelar",
    genre: "Simulación",
    platforms: ["Switch", "PC"],
    price: 99900,
    rating: 4.4,
    tag: "COZY",
    gradient: "linear-gradient(150deg,#ffb020,#8b5cf6 60%,#120d2e)",
    emoji: "🌾",
    description:
      "Cultiva, cría criaturas alienígenas y construye tu granja en un planeta lejano. El juego relajante perfecto para desconectar del mundo.",
    highlights: ["Sin presión ni relojes", "Cientos de cultivos y criaturas", "Decoración libre", "Juego cruzado con amigos"],
  },
  {
    slug: "laberinto-arcano",
    title: "Laberinto Arcano",
    genre: "Roguelike",
    platforms: ["PC", "Switch"],
    price: 89900,
    rating: 4.7,
    tag: "INDIE",
    gradient: "linear-gradient(150deg,#6366f1,#06040f 60%,#22e3ff)",
    emoji: "🔮",
    description:
      "Cada partida es un laberinto nuevo. Combina reliquias, descubre sinergias rotas y llega lo más profundo que puedas antes de caer.",
    highlights: ["Mazmorras infinitas", "200+ reliquias combinables", "Partidas de 30 minutos", "Rejugabilidad brutal"],
  },
  {
    slug: "titanes-de-arena",
    title: "Titanes de Arena",
    genre: "Estrategia",
    platforms: ["PC", "Xbox"],
    price: 179900,
    rating: 4.5,
    gradient: "linear-gradient(150deg,#ffb020,#120d2e 55%,#ff2e97)",
    emoji: "🏜️",
    description:
      "Construye tu imperio en un desierto post-apocalíptico, gestiona recursos y comanda ejércitos de titanes de metal en batallas colosales.",
    highlights: ["Estrategia en tiempo real", "Batallas de 100 unidades", "Campaña + escaramuza", "Editor de mapas"],
  },
  {
    slug: "eco-del-bosque",
    title: "Eco del Bosque",
    genre: "Aventura",
    platforms: ["PS5", "Switch", "PC"],
    price: 129900,
    rating: 4.8,
    tag: "NUEVO",
    gradient: "linear-gradient(150deg,#b6ff3c,#0b0820 55%,#8b5cf6)",
    emoji: "🌲",
    description:
      "Una aventura contemplativa sobre una niña y un espíritu del bosque. Resuelve acertijos, restaura la naturaleza y descubre una historia sin palabras.",
    highlights: ["Narrativa sin diálogos", "Arte pintado a mano", "Acertijos ambientales", "Experiencia de 6 horas"],
  },
  {
    slug: "arena-de-campeones",
    title: "Arena de Campeones",
    genre: "Lucha",
    platforms: ["PS5", "Xbox", "Switch"],
    price: 209900,
    oldPrice: 249900,
    rating: 4.6,
    tag: "-16%",
    gradient: "linear-gradient(150deg,#ff2e97,#8b5cf6 60%,#0b0820)",
    emoji: "🥊",
    description:
      "El juego de lucha definitivo para tus torneos: 40 peleadores, combos accesibles y un modo historia con cinemáticas de película.",
    highlights: ["40 personajes jugables", "Modo torneo local", "Ranked online", "Entrenamiento con IA"],
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export const relatedGames = (slug: string, n = 4) =>
  games.filter((g) => g.slug !== slug).slice(0, n);
