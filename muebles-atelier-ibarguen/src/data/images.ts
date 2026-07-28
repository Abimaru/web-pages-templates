// Imágenes centralizadas (Unsplash). Sustituye cualquiera por fotos propias
// del taller: basta con reemplazar la URL. Parámetros ?w=&q= controlan tamaño/calidad.
// Imágenes locales (descargadas de Unsplash, ver docs/ASSET_ATTRIBUTIONS.md).
const u = (id: string, ..._rest: number[]) => `${import.meta.env.BASE_URL}img/${id}.jpg`;

export const images = {
  hero: u("1555041469-a586c61ea9bc", 1400),
  heroSecondary: u("1618221195710-dd6b41faaea6", 800),

  categoria: {
    sala: u("1524758631624-e2822e304c36", 900),
    comedor: u("1533090161767-e6ffed986c88", 900),
    dormitorio: u("1538688525198-9b88f6f53126", 900),
    oficina: u("1497366216548-37526070297c", 900),
  },

  taller: u("1503602642458-232111445657", 1200),

  galeria: [
    u("1567016432779-094069958ea5", 800),
    u("1586023492125-27b2c045efd7", 800),
    u("1493663284031-b7e3aefcae8e", 800),
    u("1540574163026-643ea20ade25", 800),
    u("1595428774223-ef52624120d2", 800),
    u("1550226891-ef816aed4a98", 800),
  ],

  historia: u("1449247709967-d4461a6a6103", 1000),
};
