# Atribución de recursos — Estudio Abimaru

Este documento inventaría los **recursos visuales externos** usados en el ecosistema
(landing + demos + NEXO LAB), su origen y licencia, y cómo localizarlos.

> **Regla:** las demos son prototipos. Las fotos son **ilustrativas** y sustituibles por
> material propio del cliente. Los "productos" de PIXELVAULT, NEXORA y VITALIS se dibujan con
> **CSS/íconos** (no fotos de marcas reales) para evitar propiedad intelectual de terceros.

## Fotografías (Unsplash)

Varias demos usan fotografías de **[Unsplash](https://unsplash.com)** servidas desde su CDN
(`images.unsplash.com`). Se usan bajo la **[Unsplash License](https://unsplash.com/license)**
(uso gratuito, comercial y no comercial, sin atribución obligatoria). Están **centralizadas**
en archivos de datos para poder reemplazarlas por fotos propias en un solo lugar.

| Demo | Archivo(s) de datos | Uso | Nota |
|---|---|---|---|
| MARÚ | `ropa-maru/src/data/images.ts` | Hero, categorías, productos, lookbook | Reemplazables por catálogo real |
| VITALIS | `farmacia-vitalis/src/data/images.ts` | Hero, categorías | Fichas de producto: **íconos CSS**, no fotos de fármacos |
| PRÓSPERA | `finanzas-prospera/src/data/images.ts` | Hero, testimonios | Retratos ilustrativos (casos de uso, no personas reales) |
| Atelier | `muebles-atelier-ibarguen/src/data/images.ts`, `projects.ts` | Hero, portafolio, galerías | Sustituibles por fotos del taller |
| VíaNova | `movilidad-vianova/src/data/vehicles.ts`, `src/sections/Hero.tsx` | Fotos de vehículos y hero | Marcas de vehículo **ficticias** |

PIXELVAULT y NEXORA **no dependen de fotos externas** para su contenido: usan gradientes,
emojis e íconos (`lucide-react`) dibujados por CSS.

### Cómo localizar (opcional, recomendado a futuro)

Para evitar hotlinking y ganar control/rendimiento:

1. Descarga cada imagen permitida y optimízala (p. ej. `npx sharp-cli -i in.jpg -o out.webp resize 1200`).
2. Colócala en el `public/` de la demo (p. ej. `public/img/hero.webp`).
3. Cambia la URL en el archivo de datos correspondiente por la ruta local (`/img/hero.webp`).
4. Verifica visualmente cada pantalla antes de desplegar.

Se hace **por demo y con revisión visual** para no romper composiciones; por eso no se
automatiza en masa.

## Imágenes generadas (propias, locales)

- **Miniaturas del catálogo:** cada tarjeta muestra la imagen **OG de la propia demo**
  (`<demo>/og.jpg`, local, ~44 KB) como vista estática; la vista en vivo (iframe) se carga
  solo al pulsar **"Vista interactiva"**.
- **Imágenes Open Graph (1200×630):** generadas a partir de SVG con `sharp-cli`
  (marca, tagline y acento por identidad). Sin dependencias externas.
- **Logos/isotipos/favicons:** SVG originales por proyecto (sin parecido a marcas conocidas).

## Tipografías

- **Vite (MARÚ, VITALIS, PRÓSPERA, NÚCLEO, Atelier, VíaNova, NEXO LAB):** Google Fonts vía
  `<link>` con `preconnect` + `display=swap` (carga no bloqueante). Localizables/autohospedables
  si se requiere aislar dependencias.
- **Next (PIXELVAULT, NEXORA):** `next/font` (autohospedadas y optimizadas por el framework).

## Íconos

`lucide-react` (licencia ISC) en las apps que lo usan. SVG inline en el resto.

## Licencia del contenido

Textos, precios, testimonios y métricas de las demos son **ficticios/ilustrativos**. El código
del repositorio pertenece a Estudio Abimaru; la definición formal de licencia queda **pendiente
de confirmación del propietario** (ver README).
