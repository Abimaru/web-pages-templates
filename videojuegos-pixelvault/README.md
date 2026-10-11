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
- **Carrito con pedido por WhatsApp**: plataforma por juego, entrega digital o a domicilio y vista previa del mensaje (`app/lib/order.ts`, con pruebas). En la demo no hay número (`STORE_WHATSAPP` vacío): WhatsApp deja elegir el chat; en una tienda real va su número.
- **Barra de carrito fija en móvil** ("Ver carrito · total · Pedir") apilada sobre el banner de demo (variable `--demo-banner-h`).
- **Plataformas**, **Zona Retro/Nostalgia**, **Servicios** (reparación, torneos, trade-in, membresía) y **Comunidad** (testimonios).
- **Reveal on scroll** con `IntersectionObserver` y respeto a `prefers-reduced-motion`.

## Notas de diseño

- Paleta: cian / magenta / púrpura / lima sobre base casi negra.
- Tipografías: `Orbitron` (display), `Rajdhani` (texto), `Press Start 2P` (etiquetas pixel).
- Voz de marca inspirada en la guía de estilo de Abimaru (imaginario de *tesoro/cofre*, nostalgia, no rendirse).
- Las "portadas" de juegos son ficticias y se dibujan con CSS para evitar material con derechos de autor. Sustituibles por imágenes reales cuando las tengas (colócalas en `public/`).

## Pruébalo con tu marca

El prospecto cambia nombre, color y logo en vivo (todo en su navegador; el logo no se sube ni viaja en el enlace) y copia un enlace `?marca=&color=` para compartir. Lógica pura y probada en `app/lib/brand.ts` (el color se aclara si no se lee sobre el fondo oscuro); estado en `app/lib/brandStore.ts`; panel en `app/BrandStudio.tsx`. El acento vive en un `@theme` **no** `inline` de `globals.css` y los brillos usan `rgba(var(--…-rgb), …)` para seguir al color.
