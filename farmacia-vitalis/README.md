# 💊 VITALIS — Prototipo farmacia digital

Landing de farmacia (medicamentos, vitaminas, dermocosmética, cuidado personal) con estilo serio, limpio y confiable. Construida en **Vite + React 19 + Tailwind v4 + TypeScript**.

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Qué incluye

- **Hero** con buscador, imagen de salud y tarjetas flotantes de confianza.
- **Marquee** de garantías (domicilio, originales, farmacéuticos, 24/7).
- **Categorías** (Medicamentos, Vitaminas, Dermocosmética, Bebé y mamá) con imágenes.
- **Productos** con fichas basadas en **íconos** (Rx / Venta libre), **buscador** (sin acentos; también por palabras como "fiebre" o "dolor"), **filtros** por categoría y tipo de venta, y carrito funcional.
- **Carrito con pedido por WhatsApp**: domicilio gratis desde un umbral, **flujo de fórmula** (si hay productos Rx exige confirmar el envío de la receta y la marca en el mensaje), **entrega recurrente cada 30 días** (programa de crónicos) y vista previa del mensaje. Lógica en `src/lib/cart.ts` (con pruebas). En la demo no hay número (`STORE_WHATSAPP` vacío): WhatsApp deja elegir el chat; en una farmacia real va su número y su proceso de validación.
- **Servicios** (receta digital, consulta farmacéutica, crónicos, domicilio) con enlace a WhatsApp, **cómo funciona** en 3 pasos, testimonios y CTA de app.
- **Aviso legal** visible y `Reveal on scroll` con `prefers-reduced-motion`.

## Sobre las imágenes y productos

- Las fotos de categoría son de **Unsplash** (centralizadas en `src/data/images.ts`).
- Las **fichas de producto usan íconos, no fotos de marcas reales**, para evitar mostrar medicamentos de marca (marca registrada). Sustituibles por tus propias fotos.

## Aviso

Prototipo de **demostración**. No comercializa medicamentos reales ni sustituye la asesoría de un profesional de la salud. Los medicamentos con fórmula requieren prescripción médica.

## Notas de diseño

- Paleta: blanco/nube con **azul médico** y **verde salud**.
- Tipografías: `Sora` (display) + `Inter` (texto).
