# 🎮 PIXELVAULT — Prototipo tienda de videojuegos

Landing gamer con estilo neón/arcade construido en **Next.js 16 + React 19 + Tailwind v4 + TypeScript** (mismo stack que la joyería base).

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Qué incluye

- **Hero** animado con grid neón, orbes flotantes, título con efecto *glitch* al hover y stats.
- **Marquee** de plataformas en scroll infinito.
- **Catálogo** con tarjetas de portada generadas por gradiente (sin arte con copyright) y efecto *tilt 3D* al mover el cursor.
- **Plataformas**, **Zona Retro/Nostalgia**, **Servicios** (reparación, torneos, trade-in, membresía) y **Comunidad** (testimonios).
- **Reveal on scroll** con `IntersectionObserver` y respeto a `prefers-reduced-motion`.

## Notas de diseño

- Paleta: cian / magenta / púrpura / lima sobre base casi negra.
- Tipografías: `Orbitron` (display), `Rajdhani` (texto), `Press Start 2P` (etiquetas pixel).
- Voz de marca inspirada en la guía de estilo de Abimaru (imaginario de *tesoro/cofre*, nostalgia, no rendirse).
- Las "portadas" de juegos son ficticias y se dibujan con CSS para evitar material con derechos de autor. Sustituibles por imágenes reales cuando las tengas (colócalas en `public/`).
