# web-pages-templates — Estudio Abimaru

Este repositorio aloja **dos líneas** independientes, publicadas en el mismo GitHub Pages:

```text
Estudio Abimaru
├── Soluciones web para negocios     → landing comercial + catálogo de modelos (demos)
│   └── /  ·  /pixelvault  /nexora  /muebles  /maru  /vitalis  /prospera  /nucleo  /vianova
└── NEXO LAB by Abimaru              → línea de servicios profesionales (NO es un modelo)
    └── /nexo-lab/  —  arquitectura, backend, cloud y modernización
```

- **Estudio Abimaru** (`catalogo/`): landing comercial de páginas, catálogos y tiendas para negocios.
  Su contador de modelos representa **solo** las demos seleccionables del catálogo (8), y **NEXO LAB
  no lo incrementa**.
- **NEXO LAB** (`nexo-lab/`): página de servicios profesionales de arquitectura de software,
  backend, cloud, modernización, ingeniería inversa, CI/CD, QA e ingeniería de conocimiento para
  agentes. Enlazada desde la landing (header, footer y una franja diferenciada), con página propia.
  Ver [`nexo-lab/README.md`](nexo-lab/README.md).

## Prototipos (catálogo de modelos)

Cada modelo es autocontenido en su propia carpeta y ejecutable de forma independiente.

| Prototipo | Carpeta | Rubro | Stack | Puerto dev |
|---|---|---|---|---|
| 🎮 **PIXELVAULT** | [`videojuegos-pixelvault/`](videojuegos-pixelvault/) | Videojuegos y servicios gamer | Next.js 16 + React 19 + Tailwind v4 + TS | 3000 |
| 💻 **NEXORA** | [`computacion-nexora/`](computacion-nexora/) | Computadores + soporte técnico | Next.js 16 + React 19 + Tailwind v4 + TS | 3000 |
| 🛋️ **Atelier Ibargüen** | [`muebles-atelier-ibarguen/`](muebles-atelier-ibarguen/) | Muebles de autor y fabricación | Vite + React 19 + Tailwind v4 + TS | 5173 |
| 👗 **MARÚ** | [`ropa-maru/`](ropa-maru/) | Moda: mujer, hombre, niños, deportivo | Vite + React 19 + Tailwind v4 + TS | 5173 |
| 💊 **VITALIS** | [`farmacia-vitalis/`](farmacia-vitalis/) | Farmacia: medicamentos y salud | Vite + React 19 + Tailwind v4 + TS | 5173 |
| 🏦 **PRÓSPERA** | [`finanzas-prospera/`](finanzas-prospera/) | Fintech: créditos y ahorro | Vite + React 19 + Tailwind v4 + TS | 5173 |
| 🗂️ **NÚCLEO CRM** | [`crm-nucleo/`](crm-nucleo/) | Panel CRM (front, sin backend) | Vite + React 19 + Tailwind v4 + TS | 5173 |
| 🚗 **VíaNova** | [`movilidad-vianova/`](movilidad-vianova/) | Movilidad, financiación y seguros | Vite + React 19 + Tailwind v4 + TS | 5173 |

## Cómo ejecutar cada uno

Entra a la carpeta del prototipo y corre:

```bash
npm install
npm run dev
```

> Los dos sitios Next usan el puerto **3000**; ejecútalos de a uno (o cambia el puerto con
> `npm run dev -- -p 3001`). El sitio de muebles (Vite) usa el **5173**, así que puede
> correr en paralelo con cualquiera de los otros.

## Calidad y validación

Cada proyecto expone `lint` (type-check con `tsc --noEmit`), `test` (Vitest) y `build`.
Desde la **raíz** hay un orquestador con watchdog (avance cada 30 s, timeout y resumen):

```bash
npm run lint:all     # tsc --noEmit en los 9 proyectos
npm run test:all     # Vitest en los 9 proyectos
npm run build:all    # build con la base de GitHub Pages por proyecto
npm run check:all    # lint:all + test:all
npm run smoke        # smoke estático: salidas de build + assets + sitemap
```

- **Pruebas destacadas:** matemática financiera de VíaNova (`amortization`, `scenarios`,
  `effortLevel`, `carteraCompare`) y de PRÓSPERA (`computeCredit`, `computeSavings`) con
  casos límite (principal/plazo/tasa cero o negativos, valores no finitos, redondeo). El
  resto de demos valida integridad de datos (ids únicos, precios ≥ 0, URLs válidas).
- **CI (GitHub Actions):** `npm ci` con caché de npm → `check:all` → `build:all` → `smoke`
  → ensamblado → despliegue. El deploy **solo ocurre si todo pasa**.

## Identidad de cada prototipo

- **PIXELVAULT** — *"El cofre de tesoros gamer"*. Estética neón/arcade, animaciones de
  glitch y tilt 3D. Pensado para niños, adolescentes y adultos nostálgicos.
- **NEXORA** — *"Tecnología a la vanguardia"*. Estética geek/futurista con terminal
  animada, líneas de datos y un núcleo con órbitas. Mensaje: la técnica con conciencia.
- **Atelier Ibargüen** — Mueblería de autor, tono editorial, serio y cálido. Fotografía
  real, proceso de fabricación y formulario de cotización a la medida.

## Notas comunes

- El tono y los textos de marca se inspiran en la **guía de estilo de Abimaru** (imaginario
  de tesoro/custodia, no rendirse, la riqueza está en la gente).
- Las imágenes de producto en PIXELVAULT y NEXORA se dibujan con CSS/íconos para evitar
  material con derechos de autor; en Atelier son fotos de Unsplash centralizadas en
  `src/data/images.ts`, sustituibles por fotos propias.
- Todos los sitios respetan `prefers-reduced-motion` y son responsivos.
- **Son prototipos de demostración**: formularios y carritos no envían datos reales.
