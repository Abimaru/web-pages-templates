import { Pill, Leaf, Syringe, Sun, Droplet, Thermometer, HeartPulse, type LucideIcon } from "lucide-react";

export type CategoryId = "medicamentos" | "vitaminas" | "dermo" | "bebe";

export type Product = {
  id: string;
  name: string;
  /** Subtítulo corto (tipo de producto). */
  cat: string;
  category: CategoryId;
  price: number;
  /** Requiere fórmula médica vigente. */
  rx?: boolean;
  /** Palabras para el buscador (sin acentos no importa: se normaliza). */
  keywords: string[];
  icon: LucideIcon;
  color: string;
  bg: string;
};

export const categories: { id: CategoryId; name: string; tag: string }[] = [
  { id: "medicamentos", name: "Medicamentos", tag: "Con y sin fórmula" },
  { id: "vitaminas", name: "Vitaminas y suplementos", tag: "Energía y defensas" },
  { id: "dermo", name: "Dermocosmética", tag: "Cuida tu piel" },
  { id: "bebe", name: "Bebé y mamá", tag: "Todo para los peques" },
];

export const products: Product[] = [
  { id: "acetaminofen", name: "Acetaminofén 500 mg × 20", cat: "Analgésico", category: "medicamentos", price: 8900, keywords: ["dolor", "fiebre", "paracetamol"], icon: Pill, color: "#0e78d4", bg: "#dcecfa" },
  { id: "vitamina-c", name: "Vitamina C 1000 mg × 30", cat: "Suplemento", category: "vitaminas", price: 28900, keywords: ["defensas", "gripa"], icon: Leaf, color: "#10a86e", bg: "#d8f2e6" },
  { id: "amoxicilina", name: "Amoxicilina 500 mg × 21", cat: "Antibiótico", category: "medicamentos", price: 18900, rx: true, keywords: ["infeccion"], icon: Syringe, color: "#0e78d4", bg: "#dcecfa" },
  { id: "protector-solar", name: "Protector solar SPF 50+", cat: "Dermocosmética", category: "dermo", price: 45900, keywords: ["sol", "piel", "bloqueador"], icon: Sun, color: "#f59e0b", bg: "#fdeecf" },
  { id: "suero-oral", name: "Suero oral hidratante", cat: "Hidratación", category: "bebe", price: 6500, keywords: ["deshidratacion", "diarrea", "bebe"], icon: Droplet, color: "#12b5a5", bg: "#d3f3ef" },
  { id: "termometro", name: "Termómetro digital", cat: "Dispositivo", category: "bebe", price: 32900, keywords: ["fiebre", "temperatura", "bebe"], icon: Thermometer, color: "#0e78d4", bg: "#dcecfa" },
  { id: "multivitaminico", name: "Multivitamínico × 60", cat: "Suplemento", category: "vitaminas", price: 54900, keywords: ["energia", "vitaminas"], icon: HeartPulse, color: "#e0567a", bg: "#fbe0e8" },
  { id: "ibuprofeno", name: "Ibuprofeno 400 mg × 10", cat: "Antiinflamatorio", category: "medicamentos", price: 12500, keywords: ["dolor", "inflamacion"], icon: Pill, color: "#10a86e", bg: "#d8f2e6" },
];

export const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id);

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export type Filter = "todo" | "libre" | "rx" | CategoryId;

/** Filtra por categoría/tipo de venta y por texto (nombre, tipo y palabras clave; sin acentos). */
export function filterProducts(list: Product[], filter: Filter, query: string): Product[] {
  const q = normalize(query);
  return list.filter((p) => {
    const byFilter =
      filter === "todo" ? true : filter === "libre" ? !p.rx : filter === "rx" ? !!p.rx : p.category === filter;
    if (!byFilter) return false;
    if (!q) return true;
    return [p.name, p.cat, ...p.keywords].some((t) => normalize(t).includes(q));
  });
}
