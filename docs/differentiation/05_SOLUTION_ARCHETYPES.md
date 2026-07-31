# 05 · Arquetipos de solución

Los 8 modelos no son solo estilos visuales: son **arquetipos de solución**. Cada tarjeta muestra la
etiqueta del arquetipo y un botón "Ver solución" que abre un modal accesible (foco atrapado,
Escape, restauración de foco).

- Datos: `catalogo/archetypes.js` (`window.ARCHETYPES`).
- Validador CI: `scripts/validate-archetypes.mjs` (cada modelo tiene arquetipo; sin huérfanos;
  campos y complejidad válidos). El deploy se detiene si falla.

## Estructura de cada arquetipo
`label`, `problem`, `complexity` (essential | commercial | application | enterprise), `users`,
`processes`, `capabilities`, `integrations`, `dataTypes`, `risks`, `controls`, `implementationPath`,
`relatedServices`.

## Arquetipos
| Modelo | Arquetipo |
|---|---|
| PIXELVAULT | E-commerce especializado + comunidad + servicios |
| NEXORA | Catálogo técnico + configurador + soporte |
| Atelier | Portafolio premium + cotización personalizada |
| MARÚ | Tienda visual + catálogo + conversión |
| VITALIS | Catálogo regulado + flujos sensibles + transparencia |
| PRÓSPERA | Simulación financiera + educación + escenarios |
| NÚCLEO | Operación interna + clientes + pipeline + reportes |
| VíaNova | Marketplace + originación + comparación + financiación |

El modal incluye la **Evidencia de calidad** (Quality Passport, [06](06_QUALITY_PASSPORT.md)) y el
CTA "Evaluar una solución así".
