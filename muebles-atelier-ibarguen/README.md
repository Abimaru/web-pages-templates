# 🛋️ Atelier Ibargüen — Prototipo mueblería de autor

Landing editorial y profesional para venta y **fabricación de muebles a la medida**, construido en **Vite + React 19 + Tailwind v4 + TypeScript**.

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Qué incluye

- **Hero** editorial con imagen principal + detalle flotante y badge de maderas.
- **Marquee** de materiales/valores.
- **Colecciones** (Sala, Comedor, Dormitorio, Oficina) con imágenes y overlay.
- **Proceso de fabricación** en 4 pasos con línea de tiempo e imagen del taller.
- **Portafolio** tipo galería masonry con zoom al hover.
- **El taller / historia** (sección oscura) con copy inspirado en la voz de Abimaru (oficio, custodia, "no vendemos muebles").
- **Testimonios** + **formulario de cotización** a la medida. `Reveal on scroll` y `prefers-reduced-motion`.

## Imágenes

Todas las fotos se sirven desde **Unsplash** y están centralizadas en [`src/data/images.ts`](src/data/images.ts).
Para usar fotos propias del taller, reemplaza cada URL por la ruta de tu imagen
(colócalas en `public/` y referencia `/mi-foto.jpg`). El layout no cambia.

## Notas de diseño

- Paleta: marfil / lino / roble / nogal / espresso con acento terracota.
- Tipografías: `Cormorant Garamond` (display serif) + `Jost` (sans), cargadas vía Google Fonts en `index.html`.
- Marca `Atelier Ibargüen` usa tu apellido real para el tono serio/artesanal.
