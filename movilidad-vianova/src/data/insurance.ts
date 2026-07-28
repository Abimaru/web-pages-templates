// Planes de protección DEMOSTRATIVOS. No representan pólizas reales ni aseguradoras.
export type InsurancePlan = {
  id: string;
  name: string;
  tagline: string;
  monthlyFrom: number; // costo ilustrativo mensual
  featured: boolean;
  coverage: string[];
  recommendedFor: string;
};

/** Sugiere un plan (id) según valor y condición del vehículo. Regla ilustrativa y pura. */
export function suggestPlanId(value: number, condition: "Nuevo" | "Usado"): string {
  if (condition === "Usado") return value >= 120_000_000 ? "completo" : "esencial";
  if (value >= 150_000_000) return "premium";
  return "completo";
}

export const insurancePlans: InsurancePlan[] = [
  {
    id: "esencial",
    name: "Esencial",
    tagline: "Lo básico para rodar tranquilo.",
    monthlyFrom: 89_000,
    featured: false,
    coverage: [
      "Responsabilidad civil",
      "Asistencia en vía 24/7",
      "Grúa y auxilio",
      "Protección básica",
    ],
    recommendedFor: "Vehículos usados y presupuestos ajustados",
  },
  {
    id: "completo",
    name: "Completo",
    tagline: "Cobertura amplia para el día a día.",
    monthlyFrom: 149_000,
    featured: true,
    coverage: [
      "Todo lo de Esencial",
      "Pérdida parcial y total",
      "Daños a terceros ampliado",
      "Protección financiera del crédito",
      "Conductor elegido",
    ],
    recommendedFor: "La mayoría de conductores",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Máxima tranquilidad, sin letra pequeña.",
    monthlyFrom: 229_000,
    featured: false,
    coverage: [
      "Todo lo de Completo",
      "Vehículo de reemplazo",
      "Asistencias premium",
      "Cobertura de accesorios",
      "Atención prioritaria",
    ],
    recommendedFor: "Vehículos nuevos y de alto valor",
  },
];
