# 🏦 PRÓSPERA — Prototipo fintech (créditos y ahorro)

Landing de servicios financieros con estilo serio, de consultoría y amigable. Construida en **Vite + React 19 + Tailwind v4 + TypeScript**, con **calculadoras y gráficos SVG hechos a mano** (sin librerías de charts).

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Qué incluye

- **Hero** amigable con tarjeta flotante de crecimiento.
- **Ticker de mercado** tipo bolsa (TRM, Euro, Yuan, COLCAP, Bitcoin, Brent, UVR) y sección **"Datos de interés"** con tarjetas + sparklines y **tips financieros rotativos**.
- **Simulador de crédito** interactivo (monto + plazo → cuota, total, intereses, tasa).
- **Cuenta Progreso**: simulador de ahorro con **gráfico SVG de crecimiento** y tasas por plazo (60/90/120/180/360/720 días).
- **Medidor de score crediticio** animado (gauge) con categorías.
- **Contadores animados**, cómo funciona en 4 pasos, testimonios con foto y CTA.
- **Aviso legal** visible; `Reveal on scroll` y `prefers-reduced-motion`.
- **Cierre por WhatsApp en los simuladores**: "Solicitar este crédito" y "Abrir mi Cuenta Progreso" ya no terminan en un `alert`; piden solo el nombre y arman la solicitud con los valores simulados (monto, plazo, cuota, tasa, valor final) y una vista previa del mensaje. Lógica en `src/lib/request.ts` (con pruebas). En la demo no hay número (`STORE_WHATSAPP` vacío): WhatsApp deja elegir el chat; en una entidad real va su número y su proceso de solicitud. Controles con etiquetas accesibles.

## Sobre los datos

Las **tasas, cálculos y valores de mercado son ilustrativos** (referencia estilo mercado colombiano), centralizados en `src/lib/finance.ts` y `src/data/market.ts`. En producción se conectarían a una API real (banco central / proveedor de mercado).

## Aviso

Prototipo de **demostración**. No constituye una oferta, cotización ni asesoría financiera. Los valores reales dependen de la evaluación de cada entidad vigilada.

## Notas de diseño

- Paleta: verde bosque + oro (prosperidad) sobre blanco/papel.
- Tipografías: `Manrope` (display) + `Inter` (texto).
