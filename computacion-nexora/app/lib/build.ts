export type Option = { label: string; note: string; price: number };
export type Category = { key: string; title: string; options: Option[] };

export const categories: Category[] = [
  {
    key: "perfil",
    title: "Perfil de uso",
    options: [
      { label: "Oficina esencial", note: "Board + gabinete + fuente", price: 900000 },
      { label: "Creador / Diseño", note: "Base para render y edición", price: 1400000 },
      { label: "Gamer", note: "Base optimizada para juegos", price: 1600000 },
      { label: "Workstation Pro", note: "Máximo rendimiento sostenido", price: 2200000 },
    ],
  },
  {
    key: "cpu",
    title: "Procesador",
    options: [
      { label: "Ryzen 5 / Core i5", note: "6-8 núcleos", price: 750000 },
      { label: "Ryzen 7 / Core i7", note: "8-12 núcleos", price: 1150000 },
      { label: "Ryzen 9 / Core i9", note: "16+ núcleos", price: 1900000 },
    ],
  },
  {
    key: "gpu",
    title: "Tarjeta gráfica",
    options: [
      { label: "Gráficos integrados", note: "Oficina y multimedia", price: 0 },
      { label: "RTX 4060 / equivalente", note: "1080p alto", price: 1500000 },
      { label: "RTX 4070 / equivalente", note: "1440p ultra", price: 2600000 },
      { label: "RTX 4080 / equivalente", note: "4K y creación", price: 4200000 },
    ],
  },
  {
    key: "ram",
    title: "Memoria RAM",
    options: [
      { label: "16 GB DDR5", note: "Uso general y gaming", price: 260000 },
      { label: "32 GB DDR5", note: "Multitarea y edición", price: 480000 },
      { label: "64 GB DDR5", note: "Render y virtualización", price: 950000 },
    ],
  },
  {
    key: "storage",
    title: "Almacenamiento",
    options: [
      { label: "SSD 500 GB NVMe", note: "Rápido y esencial", price: 220000 },
      { label: "SSD 1 TB NVMe", note: "El punto dulce", price: 380000 },
      { label: "SSD 2 TB NVMe", note: "Para librerías grandes", price: 720000 },
    ],
  },
  {
    key: "cooling",
    title: "Refrigeración",
    options: [
      { label: "Aire de alto flujo", note: "Silencioso y confiable", price: 120000 },
      { label: "Líquida 240 mm", note: "Frío para overclock", price: 380000 },
      { label: "Líquida 360 mm", note: "Máxima disipación", price: 560000 },
    ],
  },
];

/** Índice de opción elegido por categoría. */
export type Selection = Record<string, number>;

export const formatCOP = (n: number) => "$" + n.toLocaleString("es-CO");

/** Selección inicial: primera opción, salvo la gráfica (RTX 4060). */
export const defaultSelection = (): Selection =>
  Object.fromEntries(categories.map((c) => [c.key, c.key === "gpu" ? 1 : 0]));

const clampIndex = (c: Category, i: number | undefined) =>
  Number.isInteger(i) && i! >= 0 && i! < c.options.length ? (i as number) : 0;

export const optionOf = (c: Category, sel: Selection): Option => c.options[clampIndex(c, sel[c.key])];

export const totalFor = (sel: Selection): number => categories.reduce((n, c) => n + optionOf(c, sel).price, 0);

/** Configuraciones sugeridas: un clic y el cliente ve un punto de partida realista. */
export const presets: { id: string; name: string; note: string; sel: Selection }[] = [
  { id: "oficina", name: "Oficina", note: "Trabajo y estudio sin gastar de más", sel: { perfil: 0, cpu: 0, gpu: 0, ram: 0, storage: 1, cooling: 0 } },
  { id: "gamer", name: "Gamer 1080p", note: "Juega en alto sin vaciar el bolsillo", sel: { perfil: 2, cpu: 0, gpu: 1, ram: 0, storage: 1, cooling: 0 } },
  { id: "creador", name: "Creador", note: "Edición, diseño y render fluidos", sel: { perfil: 1, cpu: 1, gpu: 2, ram: 1, storage: 2, cooling: 1 } },
  { id: "pro", name: "Workstation", note: "Máximo rendimiento sostenido", sel: { perfil: 3, cpu: 2, gpu: 3, ram: 2, storage: 2, cooling: 2 } },
];

export const sameSelection = (a: Selection, b: Selection) => categories.every((c) => clampIndex(c, a[c.key]) === clampIndex(c, b[c.key]));

/** Número de la tienda real. Vacío en la demo: WhatsApp deja elegir el chat. */
export const STORE_WHATSAPP = "";

export function buildQuoteMessage(sel: Selection, name = ""): string {
  return [
    "Hola NEXORA, quiero cotizar este equipo:",
    "",
    ...categories.map((c) => `• ${c.title}: ${optionOf(c, sel).label}`),
    "",
    `Estimado: ${formatCOP(totalFor(sel))} (referencial)`,
    `Nombre: ${name.trim() || "—"}`,
    "¿Me ayudan a validar la compatibilidad y confirmar disponibilidad?",
  ].join("\n");
}

export const whatsappUrl = (message: string) => `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
