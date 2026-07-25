// Imágenes de moda (Unsplash). Sustituibles por fotos propias: reemplaza la URL
// o coloca tus imágenes en public/ y referencia "/mi-foto.jpg".
const u = (id: string, w = 1000, q = 75) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  hero: u("1483985988355-763728e1935b", 1400),
  heroSecondary: u("1509631179647-0177331693ae", 700),

  categoria: {
    mujer: u("1490481651871-ab68de25d43d", 800),
    hombre: u("1507003211169-0a1dd7228f2d", 800),
    ninos: u("1503944583220-79d8926ad5e2", 800),
    deportivo: u("1517836357463-d25dfeac3438", 800),
  },

  lookbook: u("1441984904996-e0b6ba687e04", 1200),

  productos: [
    u("1523381210434-271e8be1f52b", 700),
    u("1434389677669-e08b4cac3105", 700),
    u("1595777457583-95e059d581b8", 700),
    u("1489987707025-afc232f7ea0f", 700),
    u("1503944583220-79d8926ad5e2", 700),
    u("1490481651871-ab68de25d43d", 700),
    u("1541534741688-6078c6bfb5c5", 700),
    u("1507003211169-0a1dd7228f2d", 700),
  ],
};
