// ⚠️ Valores ILUSTRATIVOS (prototipo). No son cotizaciones reales ni en tiempo real.
// En producción se conectarían a una API (ej. banco central / proveedor de mercado).

export type Market = {
  name: string;
  symbol: string;
  value: string;   // ya formateado
  change: number;  // % variación
  spark: number[]; // mini serie para sparkline
};

export const markets: Market[] = [
  { name: "Dólar (TRM)", symbol: "USD/COP", value: "$4.120,50", change: 0.35, spark: [40, 42, 41, 44, 43, 46, 45, 48] },
  { name: "Euro", symbol: "EUR/COP", value: "$4.480,20", change: -0.18, spark: [50, 49, 51, 48, 47, 48, 46, 45] },
  { name: "Yuan", symbol: "CNY/COP", value: "$565,80", change: 0.22, spark: [30, 31, 30, 32, 33, 32, 34, 35] },
  { name: "COLCAP", symbol: "Índice", value: "1.485,60", change: 0.64, spark: [38, 40, 39, 42, 44, 43, 46, 49] },
  { name: "Bitcoin", symbol: "BTC/USD", value: "US$71.240", change: 1.82, spark: [42, 45, 43, 47, 46, 50, 52, 55] },
  { name: "Petróleo Brent", symbol: "USD/bbl", value: "US$82,40", change: -0.51, spark: [55, 54, 53, 52, 53, 51, 50, 49] },
  { name: "UVR", symbol: "COP", value: "$385,24", change: 0.03, spark: [44, 44, 45, 45, 46, 46, 47, 47] },
];

export const tips: string[] = [
  "Aparta al menos el 10% de tus ingresos apenas te paguen: págate a ti primero.",
  "Antes de un crédito, verifica que la cuota no supere el 30% de tus ingresos.",
  "Compara la tasa E.A. y no solo la cuota: es la forma real de comparar créditos.",
  "Ten un fondo de emergencia de 3 a 6 meses de gastos. Es tu red de seguridad.",
  "Diversifica: no concentres todos tus ahorros en un solo producto o plazo.",
  "Aprovecha el interés compuesto: entre más pronto ahorres, más crece tu dinero.",
];
