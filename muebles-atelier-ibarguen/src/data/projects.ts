// Proyectos / casos de estudio (demostración). Imágenes de Unsplash;
// sustituibles por fotos reales del taller. Centralizado para reutilizar.
// Imágenes locales (descargadas de Unsplash, ver docs/ASSET_ATTRIBUTIONS.md).
const u = (id: string, ..._rest: number[]) => `${import.meta.env.BASE_URL}img/${id}.jpg`;

export type Project = {
  slug: string;
  name: string;
  category: "Comedor" | "Sala" | "Dormitorio" | "Oficina";
  year: string;
  place: string;
  wood: string;
  summary: string;
  cover: string;
  gallery: string[];
  description: string[];
  materials: string[];
  details: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "mesa-raiz",
    name: "Mesa de comedor «Raíz»",
    category: "Comedor",
    year: "2025",
    place: "Casa en Ciudad Jardín, Cali",
    wood: "Roble macizo",
    summary: "Una mesa para diez que empieza a ser herencia desde el primer almuerzo.",
    cover: u("1533090161767-e6ffed986c88", 1400),
    gallery: [u("1567016432779-094069958ea5"), u("1503602642458-232111445657"), u("1540574163026-643ea20ade25")],
    description: [
      "La familia pedía una sola cosa imposible: una mesa que aguantara generaciones sin sentirse pesada. Partimos de un tablón de roble seco de más de dos metros y respetamos cada nudo, porque en la madera —como en la gente— las marcas son historia, no defecto.",
      "El resultado es una pieza de líneas honestas: patas trapezoidales que sostienen sin estorbar las piernas, y un acabado en aceite natural que se puede reparar con las manos, en casa, cuando la vida deje su huella.",
    ],
    materials: ["Roble macizo secado al horno", "Aceite vegetal natural", "Ensambles a espiga vista"],
    details: [
      { label: "Dimensiones", value: "220 × 100 × 76 cm" },
      { label: "Capacidad", value: "10 comensales" },
      { label: "Tiempo", value: "6 semanas" },
      { label: "Acabado", value: "Aceite natural mate" },
    ],
  },
  {
    slug: "biblioteca-horizonte",
    name: "Biblioteca «Horizonte»",
    category: "Sala",
    year: "2025",
    place: "Apartamento en el sur, Cali",
    wood: "Nogal",
    summary: "De pared a pared, para que los libros por fin tengan casa propia.",
    cover: u("1524758631624-e2822e304c36", 1400),
    gallery: [u("1586023492125-27b2c045efd7"), u("1493663284031-b7e3aefcae8e"), u("1550226891-ef816aed4a98")],
    description: [
      "El reto era un muro de cuatro metros con una ventana descentrada que nadie sabía cómo resolver. En vez de esconderla, la convertimos en el centro: los estantes la enmarcan como un cuadro y dejan pasar la luz de la tarde sobre los lomos de los libros.",
      "Cada módulo se ancló a la estructura para soportar el peso de una vida leyendo, con juntas ocultas para que la madera parezca flotar sobre la pared.",
    ],
    materials: ["Nogal americano", "Herrajes ocultos de acero", "Laca al agua satinada"],
    details: [
      { label: "Dimensiones", value: "400 × 260 × 35 cm" },
      { label: "Módulos", value: "12 configurables" },
      { label: "Tiempo", value: "8 semanas" },
      { label: "Acabado", value: "Laca satinada" },
    ],
  },
  {
    slug: "cama-nube",
    name: "Cama flotante «Nube»",
    category: "Dormitorio",
    year: "2024",
    place: "Casa campestre, Jamundí",
    wood: "Roble & lino",
    summary: "Una cama que parece levitar y una cabecera que abraza.",
    cover: u("1538688525198-9b88f6f53126", 1400),
    gallery: [u("1616486338812-3dadae4b4ace"), u("1595428774223-ef52624120d2"), u("1616627561839-074385245ff6")],
    description: [
      "Querían ligereza en una habitación pequeña. Diseñamos una base en voladizo con iluminación cálida escondida bajo el perímetro: de noche, la cama parece flotar sobre el piso.",
      "La cabecera tapizada en lino natural suaviza la madera y convierte el respaldo en el mejor lugar para leer antes de dormir.",
    ],
    materials: ["Estructura de roble", "Cabecera en lino natural", "Iluminación LED cálida integrada"],
    details: [
      { label: "Dimensiones", value: "King · 200 × 200 cm" },
      { label: "Extra", value: "Luz perimetral" },
      { label: "Tiempo", value: "5 semanas" },
      { label: "Acabado", value: "Aceite + textil" },
    ],
  },
  {
    slug: "escritorio-metodo",
    name: "Escritorio «Método»",
    category: "Oficina",
    year: "2025",
    place: "Estudio Kavan, Cali",
    wood: "Nogal",
    summary: "Orden a la vista y cables fuera de vista, para pensar mejor.",
    cover: u("1497366216548-37526070297c", 1400),
    gallery: [u("1519710164239-da123dc03ef4"), u("1503602642458-232111445657"), u("1540574163026-643ea20ade25")],
    description: [
      "Un estudio de arquitectura pedía una superficie amplia sin el caos de cables. Integramos una canaleta oculta y un cajón organizador que corre a todo lo ancho, de modo que la mesa siempre se ve limpia.",
      "El nogal en tono profundo aporta la seriedad de una pieza de dirección sin renunciar a la calidez del oficio.",
    ],
    materials: ["Nogal macizo", "Gestión de cables integrada", "Correderas de cierre suave"],
    details: [
      { label: "Dimensiones", value: "180 × 80 × 74 cm" },
      { label: "Cajones", value: "2 + bandeja" },
      { label: "Tiempo", value: "4 semanas" },
      { label: "Acabado", value: "Aceite oscuro" },
    ],
  },
  {
    slug: "sofa-abrazo",
    name: "Sofá modular «Abrazo»",
    category: "Sala",
    year: "2024",
    place: "Loft en Granada, Cali",
    wood: "Madera & lino",
    summary: "Módulos que se recomponen según la reunión —o la siesta.",
    cover: u("1519710164239-da123dc03ef4", 1400),
    gallery: [u("1555041469-a586c61ea9bc"), u("1567016432779-094069958ea5"), u("1586023492125-27b2c045efd7")],
    description: [
      "Un espacio que a veces es sala de cine y a veces sala de amigos. Diseñamos módulos independientes con base de madera vista que se combinan en L, en isla o en fila, sin herrajes complicados.",
      "La tapicería en lino desenfundable pensada para la vida real: se lava, se cambia, dura.",
    ],
    materials: ["Base de madera maciza", "Lino desenfundable", "Espuma de alta densidad"],
    details: [
      { label: "Módulos", value: "4 recomponibles" },
      { label: "Config.", value: "L · isla · fila" },
      { label: "Tiempo", value: "6 semanas" },
      { label: "Acabado", value: "Madera + textil" },
    ],
  },
  {
    slug: "vestier-orden",
    name: "Vestier «Orden»",
    category: "Dormitorio",
    year: "2025",
    place: "Casa en Pance, Cali",
    wood: "Roble",
    summary: "Cada cosa en su lugar, iluminada como en tienda.",
    cover: u("1616486338812-3dadae4b4ace", 1400),
    gallery: [u("1538688525198-9b88f6f53126"), u("1595428774223-ef52624120d2"), u("1550226891-ef816aed4a98")],
    description: [
      "Un vestier en U que aprovecha cada centímetro: barras a doble altura, cajones con divisiones a la medida de cada prenda y una isla central con tapa de roble para joyas y accesorios.",
      "La iluminación cálida por sensor convierte el ritual de vestirse en un pequeño lujo diario.",
    ],
    materials: ["Roble y tableros enchapados", "Iluminación por sensor", "Organizadores a la medida"],
    details: [
      { label: "Superficie", value: "Vestier en U · 9 m²" },
      { label: "Isla", value: "Con tapa de roble" },
      { label: "Tiempo", value: "7 semanas" },
      { label: "Acabado", value: "Aceite natural" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const relatedProjects = (slug: string, n = 3) =>
  projects.filter((p) => p.slug !== slug).slice(0, n);
