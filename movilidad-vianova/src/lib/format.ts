export const formatCOP = (n: number) => "$" + Math.round(n).toLocaleString("es-CO");
export const formatCOPShort = (n: number) =>
  n >= 1_000_000
    ? "$" + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M"
    : "$" + Math.round(n / 1000) + "k";
export const formatPct = (n: number, d = 1) => (n * 100).toFixed(d) + "%";
export const formatKm = (n: number) => n.toLocaleString("es-CO") + " km";
