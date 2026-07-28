# Iteración — Consolidación del ecosistema (jul 2026)

Objetivo: elevar el repositorio a portafolio profesional mantenible, sin destruir las identidades
ni romper el despliegue. Se trabajó por bloques verificables, cada uno desplegado y validado en vivo.

## Bloque 0 — Auditoría

Matriz de estado de los 9 proyectos (build, lint, tests, SEO, OG, favicon, aviso demo, riesgos).
Hallazgos clave: sin lint/test salvo NEXO LAB; favicons `vite.svg`; sin OG/canonical en la mayoría;
claims sensibles en VITALIS/PRÓSPERA; catálogo con 8 iframes en vivo.

## Bloque 1 — Transparencia

- `DemoBanner` estándar en las 8 demos (catálogo + CTA comercial), NÚCLEO enriquecido.
- Claims sensibles corregidos: VITALIS ("no es una farmacia real"), PRÓSPERA ("no es entidad
  financiera"; sin "Vigilado y seguro"/"aprobación en 10 min"; cifras marcadas), VíaNova (aviso
  desde el hero). Testimonios → casos de uso ilustrativos.

## Bloque 2 — SEO / OG

- Favicon propio por demo (reemplaza `vite.svg`; Next usa `app/icon.svg`).
- 8 imágenes OG 1200×630 on-brand; `canonical` + `og:*` + `twitter:*` + `theme-color` en las 8.
- VíaNova: OG a JPG real + `twitter:image`; sello del hero unificado; "Proceso 100% digital" →
  "Experiencia digital simulada".

## Bloque 3 — Calidad / CI

- `lint` (`tsc --noEmit`) + `test` (Vitest) en los 9. Ver [ADR 0002](../adr/0002-calidad-y-ci.md).
- Pruebas financieras: VíaNova (20) y PRÓSPERA (15) con casos límite; endurecimiento de
  `computeCredit`/`computeSavings`.
- Orquestador raíz (`run-all.mjs`, watchdog) + smoke estático. CI con `npm ci`, validación y
  **deploy bloqueado si falla**.

## Bloque 4 — Rendimiento

- Catálogo: miniaturas estáticas + iframe bajo intención. Ver
  [ADR 0003](../adr/0003-catalogo-miniaturas-e-imagenes-locales.md).
- Imágenes Unsplash → locales (`public/img/`, 52 archivos) sin hotlinking; `ASSET_ATTRIBUTIONS.md`.

## Incremento adicional

- **NEXO LAB:** enlaces profesionales confirmados (Upwork, LinkedIn, GitHub).
- **VíaNova — "Crédito a tu medida":** el cliente indica el valor del vehículo, tipo, condición,
  cuota inicial y plazo, y obtiene su crédito + seguro sugerido (`suggestPlanId`, puro y testeado).
- **Documentación:** se crea `docs/` (arquitectura, desarrollo, diseño, ADRs, iteraciones).

## Estado final

9 proyectos con lint+test verdes; landing + 8 demos + NEXO LAB en 200; CI validando cada push.

## Pendientes (con el propietario)

- Analítica: elegir proveedor (GoatCounter/Cloudflare) y pasar el ID; hoy solo hay eventos `track()`.
- `SECURITY.md` + licencia del repo.
- 404 con marca; regresión visual / E2E Playwright; barrido fino de copy en PIXELVAULT/NEXORA.
- **NEXO DIFFERENTIATION INCREMENT** (prompt aparte): pendiente de decidir fases.
