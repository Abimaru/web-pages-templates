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
  rojo: { name: "Rojo", hex: "#b3262e" },
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
    id: "vestido-fluido-rojo", name: "Vestido fluido rojo", category: "mujer", price: 219900, img: images.producto.vestido, tag: "NUEVO",
    description: "Falda amplia que se mueve con cada paso y cintura marcada. Pensado para ocasiones especiales.",
    sizes: ADULT, colors: [C.rojo, C.negro, C.rosa], look: ["pantalon-palazzo-rayas", "blusa-ligera"],
  },
  {
    id: "camiseta-pima-premium", name: "Camiseta pima premium", category: "hombre", price: 79900, oldPrice: 98900, img: images.producto.camisa, tag: "-19%",
    description: "Algodón pima suave y fresco, con caída limpia. Disponible en una paleta de colores para combinar todo el mes.",
    sizes: ADULT, colors: [C.crema, C.azul, C.verde], look: ["camiseta-esencial", "poncho-tejido"],
  },
  {
    id: "pantalon-palazzo-rayas", name: "Pantalón palazzo de rayas", category: "mujer", price: 169900, img: images.producto.pantalon, tag: "TOP",
    description: "Tiro alto y pierna ancha en rayas verticales que estilizan. Se lleva con top o camisa anudada.",
    sizes: ADULT, colors: [C.negro, C.crema], look: ["blusa-ligera", "vestido-fluido-rojo"],
  },
  {
    id: "poncho-tejido", name: "Poncho tejido artesanal", category: "mujer", price: 119900, oldPrice: 144900, img: images.producto.poncho, tag: "-17%",
    description: "Punto calado con flecos. Una capa liviana para las noches frescas.",
    sizes: ["Única"], colors: [C.crema, C.arena], look: ["blusa-ligera", "camiseta-pima-premium"],
  },
  {
    id: "conjunto-casual-nina", name: "Conjunto casual niña", category: "ninos", price: 89900, img: images.producto.nina,
    description: "Algodón suave y costuras planas para que juegue todo el día sin molestias.",
    sizes: KIDS, colors: [C.rosa, C.arena], look: ["set-deportivo-tech"],
  },
  {
    id: "set-deportivo-tech", name: "Set deportivo tech", category: "deportivo", price: 149900, img: images.producto.deportivo, tag: "NUEVO",
    description: "Tela técnica que respira y se estira. Incluye top y leggins.",
    sizes: ADULT, colors: [C.negro, C.verde, C.rosa], look: ["camiseta-esencial"],
  },
  {
    id: "camiseta-esencial", name: "Camiseta esencial", category: "hombre", price: 59900, img: images.producto.camiseta,
    description: "Algodón peinado de gramaje medio y cuello firme. La base de cualquier look, en colores lisos.",
    sizes: ADULT, colors: [C.verde, C.crema, C.negro], look: ["camiseta-pima-premium", "set-deportivo-tech"],
  },
  {
    id: "blusa-ligera", name: "Blusa ligera de verano", category: "mujer", price: 99900, img: images.producto.blusa,
    description: "Tela fresca y vaporosa en tonos neutros. Combina con falda, jean o pantalón de vestir.",
    sizes: ADULT, colors: [C.crema, C.rosa, C.arena], look: ["pantalon-palazzo-rayas", "poncho-tejido"],
  },
];

export const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id);

export const discountPct = (p: Product): number =>
  p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
