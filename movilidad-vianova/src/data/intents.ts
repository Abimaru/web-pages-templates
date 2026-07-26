import { Car, Repeat, Tag, Calculator, TrendingUp, ShieldCheck, type LucideIcon } from "lucide-react";

// Rutas principales del usuario
export type RouteId = "vehiculo" | "tengo-vehiculo" | "tengo-credito";
export const routes: { id: RouteId; label: string; desc: string }[] = [
  { id: "vehiculo", label: "Quiero un vehículo", desc: "Busca, compara, simula y solicita." },
  { id: "tengo-vehiculo", label: "Ya tengo un vehículo", desc: "Véndelo, retómalo o protégelo." },
  { id: "tengo-credito", label: "Ya tengo un crédito", desc: "Evalúa compra de cartera y compara escenarios." },
];

// Intenciones (¿Qué quieres hacer hoy?)
export type Intent = {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  route: RouteId;
  target: string; // id de la sección a la que lleva
  cta: string;
  guidance: string; // mensaje de orientación al seleccionar
};

export const intents: Intent[] = [
  {
    id: "comprar",
    label: "Comprar un vehículo",
    sub: "Nuevo o usado",
    icon: Car,
    route: "vehiculo",
    target: "marketplace",
    cta: "Explorar vehículos",
    guidance: "Te llevamos al catálogo. Filtra por presupuesto y cuota, y compara hasta 3 opciones.",
  },
  {
    id: "cambiar",
    label: "Cambiar mi vehículo",
    sub: "Retoma como parte de pago",
    icon: Repeat,
    route: "tengo-vehiculo",
    target: "venta",
    cta: "Valorar mi vehículo",
    guidance: "Valoramos tu vehículo actual y lo usas como parte de pago del nuevo.",
  },
  {
    id: "vender",
    label: "Vender mi vehículo",
    sub: "Recibe un rango estimado",
    icon: Tag,
    route: "tengo-vehiculo",
    target: "venta",
    cta: "Solicitar evaluación",
    guidance: "Cuéntanos los datos de tu vehículo y te damos un rango de referencia.",
  },
  {
    id: "simular",
    label: "Simular financiación",
    sub: "Cuota y escenarios",
    icon: Calculator,
    route: "vehiculo",
    target: "cockpit",
    cta: "Abrir simulador",
    guidance: "Compara 3 escenarios: cuota más baja, equilibrado o págalo más rápido.",
  },
  {
    id: "mejorar",
    label: "Mejorar mi crédito",
    sub: "Compra de cartera",
    icon: TrendingUp,
    route: "tengo-credito",
    target: "cartera",
    cta: "Comparar mi crédito",
    guidance: "Simula un antes/después de tu crédito actual con condiciones ilustrativas.",
  },
  {
    id: "proteger",
    label: "Proteger mi vehículo",
    sub: "Planes de cobertura",
    icon: ShieldCheck,
    route: "tengo-vehiculo",
    target: "seguros",
    cta: "Cotizar protección",
    guidance: "Compara planes de protección y elige la cobertura que necesitas.",
  },
];
