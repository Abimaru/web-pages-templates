# Arquitectura del ecosistema

## Arquitectura de marca

```text
Estudio Abimaru
├── Soluciones web para negocios      → landing comercial + catálogo de 8 modelos (demos)
└── NEXO LAB by Abimaru               → línea de servicios profesionales de ingeniería
```

- **Estudio Abimaru** (`catalogo/`): landing comercial. Su contador de modelos cuenta **solo**
  las 8 demos seleccionables. **NEXO LAB no incrementa el contador** (es otra línea).
- **NEXO LAB** (`nexo-lab/`): página independiente de arquitectura, backend, cloud, modernización,
  diagnóstico, CI/CD, QA e ingeniería de conocimiento. Enlazada desde la landing (header, footer,
  franja diferenciada), sin competir con el CTA de páginas web.

## Proyectos y rutas (GitHub Pages, base `/web-pages-templates/`)

| Proyecto | Carpeta | Stack | Ruta pública |
|---|---|---|---|
| Estudio Abimaru (landing) | `catalogo/` | HTML/CSS/JS estático | `/` |
| PIXELVAULT | `videojuegos-pixelvault/` | Next.js 16 (export) | `/pixelvault/` |
| NEXORA | `computacion-nexora/` | Next.js 16 (export) | `/nexora/` |
| Atelier Ibargüen | `muebles-atelier-ibarguen/` | Vite + React 19 + TS | `/muebles/` |
| MARÚ | `ropa-maru/` | Vite + React 19 + TS | `/maru/` |
| VITALIS | `farmacia-vitalis/` | Vite + React 19 + TS | `/vitalis/` |
| PRÓSPERA | `finanzas-prospera/` | Vite + React 19 + TS | `/prospera/` |
| NÚCLEO CRM | `crm-nucleo/` | Vite + React 19 + TS | `/nucleo/` |
| VíaNova | `movilidad-vianova/` | Vite + React 19 + TS | `/vianova/` |
| NEXO LAB | `nexo-lab/` | Vite + React 19 + TS | `/nexo-lab/` |

> El nombre de carpeta y la ruta pública **difieren** en algunos casos (Atelier → `/muebles/`).
> La ruta pública es la que usan `demoUrl` (catálogo), `sitemap.xml` y el workflow.

## Base path

- **Vite:** `VITE_BASE=/web-pages-templates/<ruta>/`; en runtime se usa `import.meta.env.BASE_URL`
  para assets de `public/` (imágenes locales, etc.).
- **Next:** `NEXT_PUBLIC_BASE_PATH=/web-pages-templates/<ruta>` (sin barra final); export estático.

## Despliegue

Un solo workflow (`.github/workflows/deploy.yml`) construye todo y publica en GitHub Pages:

```text
npm ci (por app)
→ check:all (lint + test de los 9 proyectos)
→ build:all (con base por proyecto)
→ smoke (salidas + assets + sitemap)
→ ensamblar en _site/  (catalogo/. en raíz + cada app en su ruta)
→ deploy   (solo si todo lo anterior pasa)
```

El ensamblado copia `catalogo/.` a la raíz de `_site/` y cada `dist/`(Vite) u `out/`(Next) a su
subcarpeta. `docs/` **no** se copia (no se publica).

## Datos y estado

- **Sin backend.** Todos los datos son mock, centralizados en `src/data/` (Vite) o `app/lib/`
  (Next). Formularios y simuladores solo arman mensajes (WhatsApp/correo) o calculan en el
  navegador; nada se envía ni se almacena.
- **Lógica financiera pura y testeable:** `movilidad-vianova/src/lib/finance.ts`,
  `finanzas-prospera/src/lib/finance.ts` (amortización, escenarios, esfuerzo, ahorro).

## Capa de diferenciación (NEXO DIFFERENTIATION)

Sobre la base anterior se añadió una capa que posiciona el ecosistema como consultoría/orquestación:

- **Landing:** Nexo Compass (diagnóstico por reglas, `compass.js`), arquetipos de solución
  (`archetypes.js` + modal), y **pre-render** del contenido comercial (`scripts/prerender-landing.mjs`,
  sobre `_site`) para que sea indexable sin JS.
- **Evidencia:** Nexo **Quality Passport** generado en CI (`quality-passports.json`) y validado; se
  muestra en el modal del arquetipo.
- **NEXO LAB:** Nexo Delivery System (alineado con NAF), AI-assisted/human-led, seguridad por diseño,
  coequipo y **Proof Room** (artefactos descargables). Nexo Network permanece oculta.

Detalle en [`differentiation/`](differentiation/).

## Compatibilidad GitHub Pages

- Rutas relativas al base path; `.nojekyll`; `catalogo/404.html` para el ruteo SPA de Atelier
  (recarga directa de sub-rutas). NEXO LAB y las demás son SPA de una sola página con anclas.
