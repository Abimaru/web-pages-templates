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
- **"Pruébalo con tu marca"**: el prospecto escribe el nombre de su taller, elige un color (o sube su logo) y toda la página se redibuja en vivo: logotipo de dos partes ("Atelier *Ibargüen*" → "Roble Norte *Taller*"), acento, título, pie y mensaje de cotización; persiste al navegar entre páginas. Genera un **enlace para compartir** (`?marca=Nombre&color=%23hex`) y un botón "Quiero una página así" al estudio. Todo local: el logo no se sube ni viaja en el enlace; los colores claros se oscurecen solos para mantener la legibilidad. Estado global en `src/lib/brandStore.ts`, lógica en `src/lib/brand.ts` (con pruebas).
- **"Mi cotización"**: el cliente guarda las piezas del portafolio que le inspiran (se conservan al navegar y al recargar) y el formulario las envía por **WhatsApp** junto con sus datos y su idea (`src/lib/quote.ts`, con pruebas). En la demo no hay número (`STORE_WHATSAPP` vacío): WhatsApp deja elegir el chat; en el taller real va su número.
- **Testimonios** + **formulario de cotización** a la medida. `Reveal on scroll` y `prefers-reduced-motion`.

## Imágenes

Todas las fotos se sirven desde **Unsplash** y están centralizadas en [`src/data/images.ts`](src/data/images.ts).
Para usar fotos propias del taller, reemplaza cada URL por la ruta de tu imagen
(colócalas en `public/` y referencia `/mi-foto.jpg`). El layout no cambia.

## Notas de diseño

- Paleta: marfil / lino / roble / nogal / espresso con acento terracota.
- Tipografías: `Cormorant Garamond` (display serif) + `Jost` (sans), cargadas vía Google Fonts en `index.html`.
- Marca `Atelier Ibargüen` usa tu apellido real para el tono serio/artesanal.
