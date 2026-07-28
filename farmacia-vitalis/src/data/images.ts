// Imágenes de salud/farmacia (Unsplash). Sustituibles por fotos propias.
// Las "fichas de producto" NO usan fotos de marcas reales: se dibujan con
// íconos/colores para evitar mostrar medicamentos de marca (marca registrada).
// Imágenes locales (descargadas de Unsplash, ver docs/ASSET_ATTRIBUTIONS.md).
const u = (id: string, ..._rest: number[]) => `${import.meta.env.BASE_URL}img/${id}.jpg`;

export const images = {
  hero: u("1631549916768-4119b2e5f926", 1200),
  delivery: u("1584515933487-779824d29309", 1000),

  categoria: {
    medicamentos: u("1587854692152-cbe660dbde88", 700),
    vitaminas: u("1584308666744-24d5c474f2ae", 700),
    dermo: u("1570172619644-dfd03ed5d881", 700),
    bebe: u("1515488042361-ee00e0ddd4e4", 700),
  },
};
