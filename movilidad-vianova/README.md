# 🚗 VíaNova — Prototipo de plataforma de movilidad y financiación

Demo original de un **ecosistema digital de movilidad, financiación y protección vehicular**, construida en **Vite + React 19 + Tailwind v4 + TypeScript**. Inspirada *funcionalmente* en el dominio automotor/financiero, pero con identidad, estructura y contenido **100% propios** (sin marcas de terceros).

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Qué incluye

- **Selector de intención** ("¿Qué quieres hacer hoy?") con rutas personalizadas.
- **Marketplace** con filtros (tipo, condición, combustible, precio, orden) + **detalle en modal**.
- **Comparador** de hasta 3 vehículos con etiquetas inteligentes.
- **Cockpit financiero**: 3 escenarios (cuota baja / equilibrado / rápido) + **medidor de esfuerzo mensual**.
- **Perfil de movilidad** (wizard) → ruta recomendada con 3 vehículos.
- **Solicitud multipaso** (5 pasos) con pantalla de "solicitud recibida" (demo).
- **Venta / retoma**, **compra de cartera** (antes/después) y **seguros integrados** (3 planes).
- Proceso, beneficios, casos de uso, FAQ y CTA final.

## Notas

- **Sin backend**: nada se envía ni almacena. Todos los valores (precios, cuotas, tasas, valoraciones, seguros) son **ilustrativos**; no son ofertas ni aprobaciones.
- Vehículos con **marcas ficticias** y fotos royalty-free (Unsplash), centralizados en `src/data/`.
- Matemática financiera pura y testeable en `src/lib/finance.ts`.
- Identidad: grafito + azul noche + **naranja cobre** + azul eléctrico + cian; motivo de **ruta**.
- Tipografías: `Space Grotesk` (display) + `Inter` (texto). Responsive y `prefers-reduced-motion`.
