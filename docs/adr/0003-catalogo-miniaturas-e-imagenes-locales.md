# 0003 — Miniaturas bajo demanda e imágenes locales

- Estado: Aceptado
- Fecha: 2026-07-28

## Contexto

**Catálogo:** cada tarjeta cargaba un `<iframe>` con la demo **en vivo** (lazy por scroll). Con 8
modelos, acercarse al viewport disparaba la carga de los 8 sitios completos (JS/CSS/fuentes/
imágenes de cada uno) → costo alto de red/CPU en la carga inicial.

**Imágenes de demos:** varias apps hacían **hotlinking** a `images.unsplash.com` (dependencia de un
CDN externo cuyas URLs pueden cambiar).

## Decisión

1. **Catálogo:** mostrar una **miniatura estática** (la imagen OG de cada demo, local, ~44 KB) y
   cargar el iframe **solo al pulsar "Vista interactiva"** (evento `vista_interactiva`). Cero
   iframes en la carga inicial.
2. **Imágenes:** **descargar** las 52 fotos de Unsplash a `public/img/<id>.jpg` de cada app y
   referenciarlas con `import.meta.env.BASE_URL`. Sin hotlinking. Documentado en
   [ASSET_ATTRIBUTIONS.md](../ASSET_ATTRIBUTIONS.md).

## Alternativas consideradas

- **Capturas reales de cada demo como miniatura:** más fieles, pero requieren un pipeline de
  screenshots; la imagen OG ya existe, es on-brand y liviana.
- **Mantener Unsplash (licencia lo permite):** aceptable, pero localizar da control, evita
  dependencia de URLs externas y mejora el rendimiento.

## Consecuencias

- Carga inicial del catálogo mucho más liviana; la vista en vivo queda bajo intención del usuario.
- El repo crece ~8 MB por las imágenes locales (se recomprimió la más pesada de 1.6 MB a 136 KB).
- Los tests de integridad se ajustaron para aceptar rutas locales (`/img/...`).
