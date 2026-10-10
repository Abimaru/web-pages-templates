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
- **Colección con filtros**: chips por categoría (también desde el menú y las tarjetas de categoría), buscador, orden por precio y **favoritos** reales.
- **Ficha de producto** (modal): color, talla obligatoria, cantidad, descuento y **"Completa el look"**.
- **Bolsa lateral** con cantidades, barra de **envío gratis** y **checkout por WhatsApp**: arma el pedido (prendas, totales, nombre, ciudad, notas) y muestra el mensaje que recibiría la tienda. En la demo no hay número (`STORE_WHATSAPP` vacío en `src/lib/bag.ts`): WhatsApp deja elegir el chat; para una tienda real, pon su número ahí.
- Datos del catálogo en `src/data/products.ts`; reglas de envío en `src/lib/bag.ts` (con pruebas).
- **Barra de bolsa fija en móvil** ("Ver bolsa · total · Pedir") apilada justo encima del banner de demo: el banner publica su altura en `--demo-banner-h` y los elementos fijos se posicionan con esa variable.
- **"Pruébalo con tu marca"**: el prospecto escribe el nombre de su negocio, elige un color (o sube su logo) y la tienda se redibuja en vivo (logotipo, acento, título, mensaje de pedido). Genera un **enlace para compartir** (`?marca=Nombre&color=%23hex`) y un botón "Quiero una tienda así" al estudio. Todo local: el logo no se sube ni viaja en el enlace; los colores claros se oscurecen solos para mantener la legibilidad. Lógica en `src/lib/brand.ts` (con pruebas).
- **Lookbook**, tira de beneficios, testimonios con estrellas y **newsletter**.
- `Reveal on scroll` y respeto a `prefers-reduced-motion`.

## Imágenes

Fotos de **Unsplash** centralizadas en [`src/data/images.ts`](src/data/images.ts).
Para usar fotos propias, reemplaza cada URL o coloca imágenes en `public/` y referencia `/mi-foto.jpg`.

## Notas de diseño

- Paleta: porcelana / crema / tinta con acentos **rosé** y **dorado**.
- Tipografías: `Playfair Display` (display serif glam) + `Jost` (sans).
- Marca **MARÚ** derivada de *Abi-**MARU***. Prototipo: la bolsa y el newsletter no procesan datos reales.
