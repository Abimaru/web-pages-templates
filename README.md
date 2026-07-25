# web-pages-templates — Prototipos web por Abimaru

Colección de prototipos de páginas web, cada uno autocontenido en su propia carpeta
y ejecutable de forma independiente. Nacen como variaciones a partir de la joyería base.

| Prototipo | Carpeta | Rubro | Stack | Puerto dev |
|---|---|---|---|---|
| 🎮 **PIXELVAULT** | [`videojuegos-pixelvault/`](videojuegos-pixelvault/) | Videojuegos y servicios gamer | Next.js 16 + React 19 + Tailwind v4 + TS | 3000 |
| 💻 **NEXORA** | [`computacion-nexora/`](computacion-nexora/) | Computadores + soporte técnico | Next.js 16 + React 19 + Tailwind v4 + TS | 3000 |
| 🛋️ **Atelier Ibargüen** | [`muebles-atelier-ibarguen/`](muebles-atelier-ibarguen/) | Muebles de autor y fabricación | Vite + React 19 + Tailwind v4 + TS | 5173 |

## Cómo ejecutar cada uno

Entra a la carpeta del prototipo y corre:

```bash
npm install
npm run dev
```

> Los dos sitios Next usan el puerto **3000**; ejecútalos de a uno (o cambia el puerto con
> `npm run dev -- -p 3001`). El sitio de muebles (Vite) usa el **5173**, así que puede
> correr en paralelo con cualquiera de los otros.

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
