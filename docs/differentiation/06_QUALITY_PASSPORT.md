# 06 · Nexo Quality Passport

Evidencia técnica **real** del repositorio, **generada en CI**. No es una certificación externa ni
garantiza una implementación futura.

- Generador: `scripts/generate-quality-passports.mjs` → `catalogo/data/quality-passports.json`.
- Validador: `scripts/validate-quality-passports.mjs` (el deploy se detiene con estados inválidos).
- Se muestra en el modal del arquetipo como "Evidencia de calidad".

## Fuente de cada check
| Check | Cómo se obtiene |
|---|---|
| build / typecheck | El generador corre tras `check:all`/`build:all` en CI |
| tests (status + count) | Conteo real de `it()/test()` en los archivos `*.test.ts(x)` |
| seo | `rel="canonical"` en el index.html (Vite) / `alternates` (Next) |
| openGraph | `og:image` / `openGraph` / `public/og.jpg` |
| favicon | favicon propio (no `vite.svg`) / `app/icon.svg` |
| demoDisclosure | presencia de `DemoBanner` (n/a en NEXO LAB) |
| accessibility | **pending** — no auditada formalmente |
| security | **not_assessed** — no evaluada |

## Estados
`Validado` (passed/verified) · `Parcial` · `Pendiente` · `No evaluado` · `No aplica`.

**Regla:** no mostrar seguridad/accesibilidad/producción como aprobadas sin evidencia. El JSON se
**genera en CI**, no se edita a mano para falsear estados.
