# 👗 MARÚ — Prototipo tienda de moda

Landing de moda (mujer, hombre, niños, deportivo y accesorios) con estilo glamour y animaciones sutiles. Construida en **Vite + React 19 + Tailwind v4 + TypeScript**.

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Qué incluye

- **Hero** editorial a pantalla completa con foto de moda y titular con brillo dorado.
- **Marquee** de beneficios (envío, cambios, cuotas).
- **Categorías** (Mujer, Hombre, Niños, Deportivo) con imágenes y overlay.
- **Selección de productos** con tarjetas, favorito y **"Añadir a la bolsa"** funcional (contador en la barra + toast de confirmación).
- **Lookbook**, tira de beneficios, testimonios con estrellas y **newsletter**.
- `Reveal on scroll` y respeto a `prefers-reduced-motion`.

## Imágenes

Fotos de **Unsplash** centralizadas en [`src/data/images.ts`](src/data/images.ts).
Para usar fotos propias, reemplaza cada URL o coloca imágenes en `public/` y referencia `/mi-foto.jpg`.

## Notas de diseño

- Paleta: porcelana / crema / tinta con acentos **rosé** y **dorado**.
- Tipografías: `Playfair Display` (display serif glam) + `Jost` (sans).
- Marca **MARÚ** derivada de *Abi-**MARU***. Prototipo: la bolsa y el newsletter no procesan datos reales.
