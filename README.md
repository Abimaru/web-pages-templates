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
npm run validate:estimator  # calculadora de inversión: límites de planes y monotonía del estimado
npm run validate:analytics  # analítica: sin terceros por defecto, DNT/localhost, cola y propiedades
```

- **Pruebas destacadas:** matemática financiera de VíaNova (`amortization`, `scenarios`,
  `effortLevel`, `carteraCompare`) y de PRÓSPERA (`computeCredit`, `computeSavings`) con
  casos límite (principal/plazo/tasa cero o negativos, valores no finitos, redondeo). El
  resto de demos valida integridad de datos (ids únicos, precios ≥ 0, URLs válidas).
- **CI (GitHub Actions):** `npm ci` con caché de npm → `check:all` → `build:all` → `smoke`
  → ensamblado → despliegue. El deploy **solo ocurre si todo pasa**.

## PWA: las 8 demos se pueden instalar

Cada demo tiene `manifest.webmanifest`, íconos (192, 512, *maskable* y el de iOS) y un service worker, todo bajo su
propia subruta de GitHub Pages (alcance `/web-pages-templates/<demo>/`). Se puede **instalar como app** (Chrome/Edge/Android: ícono de
instalar; iOS: Compartir → Añadir a inicio) y **abre sin conexión** con lo último que se visitó.

- **Estrategia segura:** las páginas van *network-first* (siempre contenido fresco; sin red, la copia guardada o la portada) y los
  estáticos con hash *stale-while-revalidate*. Solo se cachea el mismo origen (WhatsApp, fuentes y analítica van siempre a la red).
- **Una sola fuente:** `npm run generate:pwa` regenera íconos (desde el SVG de cada demo), manifest y `sw.js`
  (requiere Playwright: `PLAYWRIGHT_MODULE` y `CHROMIUM_PATH` si no está instalado). El resultado se commitea; el CI no lo necesita.
- **Verificado en CI:** el smoke exige manifest válido (`start_url`/`scope` relativos), los tres íconos, el enlace en `index.html` y el
  manejador `fetch` del service worker en cada demo.
- Para una **nueva demo**: añádela a `APPS` en `scripts/generate-pwa-assets.mjs`, enlaza el manifest y registra el service worker como las demás.

## Barra fija en móvil

En móvil la landing muestra una barra inferior ("Calcular inversión" + "Cotizar por WhatsApp") que aparece al
salir del hero y se oculta en la calculadora y el contacto; reemplaza al botón flotante de WhatsApp (que se
conserva en escritorio). Es accesible (`aria-hidden` y `tabindex` cuando está oculta) y respeta
`prefers-reduced-motion` y el área segura de iOS.

## Calculadora de inversión

La landing incluye `#calculadora`: meta → tamaño → extras → plan sugerido y rango de inversión, con
envío de la selección por WhatsApp. Lógica pura en `catalogo/estimator.js`; precios en
`catalogo/config.js` (`priceMin`/`priceMax` por plan y bloque `calculator`). Los **pesos** de tamaño y
extras son valores de ejemplo: ajústalos a tu criterio comercial. `npm run validate:estimator`
(también en CI) garantiza que el estimado respete los límites del plan y no baje al agregar extras.

## Analítica (opcional, sin cookies)

Apagada por defecto: **no se carga nada de terceros**. Para activarla, edita `analytics` en
`catalogo/config.js` con Plausible (`{ provider: "plausible", id: "tu-dominio" }`) o Umami
(`{ provider: "umami", id, src }`). No se activa en localhost ni si el visitante envía "No rastrear";
nunca se envían datos personales (ni las respuestas del diagnóstico: solo la ruta recomendada).
Al activarse, el pie de página avisa que se miden visitas de forma anónima. Embudo registrado:
`ver_seccion` (modelos → calculadora → planes → contacto), `scroll_50/90`, `whatsapp`, `ver_demo`,
`calculadora_inicio/cotizar`, `compass_inicio/resultado`, `formulario_inicio`, `envio_formulario`.
Añade parámetros UTM al flyer/QR (`?utm_source=flyer`) para saber de dónde llegan. El enlace "Volver al catálogo" de cada demo ya lleva `utm_source=demo-<ruta>&utm_medium=banner` (el smoke de CI lo comprueba), así que verás qué demo trae visitas al catálogo. GA4 no se incluye a
propósito (usa cookies y exigiría aviso de consentimiento).

## Rendimiento y recursos

- **Catálogo:** cada tarjeta muestra una **miniatura estática** (la imagen OG de la demo) y la
  vista en vivo (iframe) se carga **solo al pulsar "Vista interactiva"** — la carga inicial ya
  no arrastra los 8 sitios.
- **Imágenes/fuentes/licencias:** ver [`docs/ASSET_ATTRIBUTIONS.md`](docs/ASSET_ATTRIBUTIONS.md).
  Las fotos son de Unsplash (centralizadas y sustituibles); los OG/favicons son propios y locales.

## Documentación

En [`docs/`](docs/): [arquitectura](docs/architecture.md), [desarrollo](docs/development.md),
[diseño](docs/design.md), [ADRs](docs/adr/) (decisiones y su porqué),
[reportes de iteración](docs/iterations/) y
[NEXO DIFFERENTIATION](docs/differentiation/) (propuesta de valor, Delivery System, Compass,
arquetipos, Quality Passport, Proof Room, handoff).

## Licencia y seguridad

- **Licencia:** propietaria — © Estudio Abimaru, **todos los derechos reservados**. El código es
  visible (GitHub Pages gratuito lo requiere) pero **no se concede permiso de reutilización**. Ver
  [`LICENSE`](LICENSE). Fotografías (Unsplash) y dependencias open source tienen sus propias
  licencias (ver [`docs/ASSET_ATTRIBUTIONS.md`](docs/ASSET_ATTRIBUTIONS.md)).
- **Seguridad:** reporta problemas de seguridad/privacidad a Abimaru@gmail.com — ver
  [`SECURITY.md`](SECURITY.md). Las demos no tienen backend ni almacenan datos reales.

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
