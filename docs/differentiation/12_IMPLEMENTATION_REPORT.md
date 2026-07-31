# 12 · Reporte de implementación

El incremento NEXO DIFFERENTIATION se ejecutó por fases pequeñas y verificables, cada una desplegada
y validada en vivo. Se preservaron los avances previos (8 modelos, NEXO LAB fuera del contador,
DemoBanner, SEO/OG, tests, CI, miniaturas, imágenes locales).

| Fase | Entregado |
|---|---|
| **A · Posicionamiento** | Hero ampliado ("…soluciones digitales que hacen crecer"); sección "Tu página puede ser solo el comienzo"; planes desdoblados (definidas vs consultivas); CTA de diagnóstico |
| **B · Arquetipos** | 8 modelos como arquetipos; modal accesible con problema/usuarios/datos/riesgos/ruta; `archetypes.js` |
| **C · Nexo Compass** | Diagnóstico por reglas; ruta + riesgos + siguiente paso; descarga `diagnostico-nexo.md`; `compass.js` |
| **D · Quality Passport** | `quality-passports.json` generado en CI con evidencia real; validadores; "Evidencia de calidad" en el modal |
| **E · NEXO LAB diferencial** | AI-assisted/human-led, Delivery Standard, Orquestación, Seguridad por diseño, Coequipo, **Proof Room** (10 artefactos), servicios distintivos, Nexo Network (oculta) |
| **F · Pre-render** | `prerender-landing.mjs` inyecta modelos y planes como HTML real en `_site` (indexable sin JS) |
| **G · Cierre** | **Nexo Delivery System** (alineado con NAF) en NEXO LAB; esta carpeta `docs/differentiation/` |

## Archivos clave creados
- Landing: `catalogo/archetypes.js`, `catalogo/compass.js`, `catalogo/data/quality-passports.json`.
- Scripts: `generate-quality-passports.mjs`, `validate-quality-passports.mjs`,
  `validate-archetypes.mjs`, `prerender-landing.mjs`.
- NEXO LAB: `sections/{AiHumanLed,DeliveryStandard,Orchestration,Security,Coequipo,ProofRoom,DeliverySystem}.tsx`,
  `data/proofRoom.ts`.

## CI/CD
`npm ci` → `check:all` → `build:all` → `smoke` → `validate:archetypes` →
`generate/validate:quality-passports` → ensamblar → **pre-render** → deploy. **El deploy solo ocurre
si todo pasa.**

## Validación
lint + tests en verde en los 9 proyectos; landing y demos en 200; Compass, arquetipos, Quality
Passport y Proof Room verificados en vivo.
