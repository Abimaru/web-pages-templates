import { images } from "./images";

export type CategoryId = "mujer" | "hombre" | "ninos" | "deportivo";

export type Color = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  img: string;
  tag?: string;
  description: string;
  sizes: string[];
  colors: Color[];
  /** Ids de prendas que combinan ("completa el look"). */
  look: string[];
};

const ADULT = ["XS", "S", "M", "L", "XL"];
const KIDS = ["4", "6", "8", "10", "12"];

const C = {
  negro: { name: "Negro", hex: "#17130f" },
  crema: { name: "Crema", hex: "#e9dfd0" },
  rosa: { name: "Rosa", hex: "#c07a86" },
  azul: { name: "Azul noche", hex: "#26364f" },
  arena: { name: "Arena", hex: "#c9b595" },
  verde: { name: "Verde salvia", hex: "#8fa088" },
};

export const categories: { id: CategoryId; name: string; tag: string; img: string }[] = [
  { id: "mujer", name: "Mujer", tag: "Elegancia diaria", img: images.categoria.mujer },
  { id: "hombre", name: "Hombre", tag: "Estilo sin esfuerzo", img: images.categoria.hombre },
  { id: "ninos", name: "Niños", tag: "Cómodos y felices", img: images.categoria.ninos },
  { id: "deportivo", name: "Deportivo", tag: "Muévete con actitud", img: images.categoria.deportivo },
];

export const products: Product[] = [
  {
    id: "blazer-estructurado", name: "Blazer estructurado", category: "mujer", price: 189900, img: images.productos[0], tag: "NUEVO",
    description: "Corte recto con hombros definidos. Sirve para la oficina y para salir de noche.",
    sizes: ADULT, colors: [C.negro, C.crema, C.azul], look: ["vestido-midi-saten", "chaqueta-denim"],
  },
  {
    id: "camisa-lino-premium", name: "Camisa lino premium", category: "hombre", price: 129900, oldPrice: 159900, img: images.productos[1], tag: "-19%",
    description: "Lino europeo liviano, fresco y de caída natural. Se arruga con gracia.",
    sizes: ADULT, colors: [C.crema, C.azul, C.verde], look: ["sueter-tejido", "chaqueta-denim"],
  },
  {
    id: "vestido-midi-saten", name: "Vestido midi satén", category: "mujer", price: 219900, img: images.productos[2],
    description: "Satén con brillo suave y cintura marcada. Pensado para ocasiones especiales.",
    sizes: ADULT, colors: [C.rosa, C.negro, C.verde], look: ["blazer-estructurado", "abrigo-largo-lana"],
  },
  {
    id: "chaqueta-denim", name: "Chaqueta denim", category: "mujer", price: 169900, img: images.productos[3], tag: "TOP",
    description: "Denim rígido de lavado medio. Unisex: combina con todo lo del clóset.",
    sizes: ADULT, colors: [C.azul, C.negro], look: ["camisa-lino-premium", "vestido-midi-saten"],
  },
  {
    id: "conjunto-casual-nina", name: "Conjunto casual niña", category: "ninos", price: 89900, img: images.productos[4],
    description: "Algodón suave y costuras planas para que juegue todo el día sin molestias.",
    sizes: KIDS, colors: [C.rosa, C.arena], look: ["set-deportivo-tech"],
  },
  {
    id: "abrigo-largo-lana", name: "Abrigo largo lana", category: "mujer", price: 289900, oldPrice: 349900, img: images.productos[5], tag: "-17%",
    description: "Mezcla de lana con forro interior. Abriga sin pesar y mantiene la forma.",
    sizes: ADULT, colors: [C.arena, C.negro], look: ["blazer-estructurado", "sueter-tejido"],
  },
  {
    id: "set-deportivo-tech", name: "Set deportivo tech", category: "deportivo", price: 149900, img: images.productos[6], tag: "NUEVO",
    description: "Tela técnica que respira y se estira. Incluye top y leggins.",
    sizes: ADULT, colors: [C.negro, C.verde, C.rosa], look: ["chaqueta-denim"],
  },
  {
    id: "sueter-tejido", name: "Suéter tejido", category: "hombre", price: 119900, img: images.productos[7],
    description: "Punto grueso y cuello redondo. Calidez para las mañanas frías.",
    sizes: ADULT, colors: [C.arena, C.azul, C.verde], look: ["camisa-lino-premium", "chaqueta-denim"],
  },
];

export const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id);

export const discountPct = (p: Product): number =>
  p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
