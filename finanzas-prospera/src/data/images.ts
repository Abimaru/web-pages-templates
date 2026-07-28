// Imágenes (Unsplash). Sustituibles por fotos propias en src/data/images.ts o public/.
// Imágenes locales (descargadas de Unsplash, ver docs/ASSET_ATTRIBUTIONS.md).
const u = (id: string, ..._rest: number[]) => `${import.meta.env.BASE_URL}img/${id}.jpg`;

export const images = {
  hero: u("1607863680198-23d4b2565df0", 1100),
  cta: u("1600880292203-757bb62b4baf", 1000),
  testimonios: [
    u("1573496359142-b8d87734a5a2", 200),
    u("1556742049-0cfed4f6a45d", 200),
    u("1521791136064-7986c2920216", 200),
  ],
};
