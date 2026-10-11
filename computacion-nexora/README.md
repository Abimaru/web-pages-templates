# 💻 NEXORA — Prototipo computadores + soporte técnico

Landing tecnológica con estética geek/futurista construida en **Next.js 16 + React 19 + Tailwind v4 + TypeScript**.

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Qué incluye

- **Hero** con fondo de rejilla + líneas de datos cayendo y una **terminal animada** que "tipea" un diagnóstico en vivo (componente cliente `Terminal.tsx`).
- **Marquee** de servicios con máscara de desvanecido.
- **Productos** (PC gamer, laptops, monitores, componentes, periféricos, almacenamiento).
- **Arma tu PC** con configuraciones base de un clic (Oficina, Gamer, Creador, Workstation), estimado en vivo y **cotización por WhatsApp** con la build completa (datos y reglas en `app/lib/build.ts`, con pruebas). En la demo no hay número (`STORE_WHATSAPP` vacío): WhatsApp deja elegir el chat; en una tienda real va su número.
- **Barra fija en móvil** en el configurador ("Tu configuración · total · Cotizar"): sigue el total en vivo, aparece mientras el resumen no está en pantalla y al tocarla lleva al resumen y enfoca el nombre. Se apila sobre el banner de demo con `--demo-banner-h`.
- **Soporte técnico** (mantenimiento, recuperación de datos, redes, seguridad, tuning, remoto).
- **Por qué NEXORA** con un núcleo animado de **órbitas** alrededor de una CPU.
- Testimonios + CTA de contacto. `Reveal on scroll` y respeto a `prefers-reduced-motion`.

## Notas de diseño

- Paleta: azul eléctrico / cian / índigo / teal sobre navy casi negro.
- Tipografías: `Space Grotesk` (display), `Inter` (texto), `JetBrains Mono` (labels tipo código).
- Mensaje de marca ligado a la guía de Abimaru: *"tecnología con conciencia"*, la técnica al servicio de las personas.
- Sin logos de marcas reales para evitar temas de marca registrada; las imágenes de producto son iconos/gradientes sustituibles por fotos reales en `public/`.

## Pruébalo con tu marca

El prospecto cambia nombre, color y logo en vivo (todo en su navegador; el logo no se sube ni viaja en el enlace) y copia un enlace `?marca=&color=` para compartir. Lógica pura y probada en `app/lib/brand.ts` (el color se aclara si no se lee sobre el fondo oscuro); estado en `app/lib/brandStore.ts`; panel en `app/BrandStudio.tsx`. El acento vive en un `@theme` **no** `inline` de `globals.css` y los brillos usan `rgba(var(--…-rgb), …)` para seguir al color.
