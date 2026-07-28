# Desarrollo

## Requisitos

- Node.js 22 (el CI usa 22). npm.

## Ejecutar una app

```bash
cd <carpeta-del-proyecto>
npm install
npm run dev
```

- Apps **Vite** → http://localhost:5173
- Apps **Next** (PIXELVAULT, NEXORA) → http://localhost:3000 (ejecútalas de a una)

## Calidad (por proyecto)

Cada proyecto expone:

| Script | Qué hace |
|---|---|
| `npm run lint` | Type-check con `tsc --noEmit` |
| `npm run test` | Vitest (`vitest run`) |
| `npm run build` | Producción (`tsc -b && vite build` / `next build`) |

## Orquestador (raíz)

Desde la raíz del repo, con watchdog (avance cada 30 s, timeout y resumen):

```bash
npm run lint:all     # tsc --noEmit en los 9 proyectos
npm run test:all     # Vitest en los 9
npm run build:all    # build con la base de Pages por proyecto (evita el mangling de Git Bash)
npm run check:all    # lint:all + test:all
npm run smoke        # smoke estático: salidas de build + assets + sitemap
```

Implementación: `scripts/run-all.mjs` (orquestador) y `scripts/smoke-static.mjs`.

## Convenciones

- **Imágenes locales:** en `public/img/<id>.jpg`, referenciadas con
  `` `${import.meta.env.BASE_URL}img/${id}.jpg` `` (respeta el base path). Ver
  [ASSET_ATTRIBUTIONS.md](ASSET_ATTRIBUTIONS.md).
- **Tests de datos/lógica:** los `*.test.ts` se excluyen del build (`tsconfig` `exclude`); Vitest
  los ejecuta aparte. Prioriza probar **lógica pura** (finanzas, reglas, integridad de datos), no
  animaciones.
- **Transparencia:** toda demo incluye `DemoBanner` (aviso de prototipo + volver al catálogo +
  CTA). Claims sensibles (salud/finanzas) van marcados como ilustrativos.
- **SEO por demo:** favicon propio, canonical, Open Graph 1200×630, Twitter Card, `theme-color`.

## Gotchas (Windows / Git Bash)

- Pasar `VITE_BASE=/web-pages-templates/...` **inline por Git Bash** corrompe la ruta (MSYS la
  convierte a `/Program Files/Git/...`). Soluciones: usar `npm run build:all` (pasa el env por
  Node, sin shell) o prefijar `MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'`. El **CI (Linux) no
  tiene este problema**.
- `vite preview` local puede quedar sirviendo un `dist` viejo; reinícialo tras reconstruir. La
  verificación fiable es el sitio **desplegado**.

## Despliegue

Push a `main` dispara el workflow. El deploy **solo ocurre si** `check:all`, `build:all` y `smoke`
pasan. Ver [architecture.md](architecture.md#despliegue).
