# Diseño e identidad

Cada proyecto conserva **su propia identidad**; no se homogeneizan. Lo común es el **estándar de
transparencia** (DemoBanner) y las **convenciones de SEO/OG**.

## Identidades

| Proyecto | Tono | Paleta base | Tipografías |
|---|---|---|---|
| Estudio Abimaru | Comercial, cálido | Negro + naranja + azul | Space Grotesk / Inter |
| PIXELVAULT | Gamer, neón/arcade | Void + magenta/cian | Orbitron / Rajdhani |
| NEXORA | Geek/futurista | Space + cian/azul | Space Grotesk / Inter / JetBrains |
| Atelier Ibargüen | Editorial, artesanal | Marfil + roble/nogal | Cormorant Garamond / Jost |
| MARÚ | Moda, elegante | Porcelana + rosa/oro | Playfair Display / Jost |
| VITALIS | Salud, confianza | Blanco + azul médico/verde | Sora / Inter |
| PRÓSPERA | Fintech, claridad | Papel + verde bosque/oro | Manrope / Inter |
| NÚCLEO CRM | App empresarial | Lienzo + índigo/esmeralda | Plus Jakarta Sans / Inter |
| VíaNova | Movilidad premium | Grafito + cobre/cian | Space Grotesk / Inter |
| NEXO LAB | Cyberpunk ejecutivo | Grafito + cian/violeta/ámbar | Space Grotesk / Inter / JetBrains |

## Componentes/patrones comunes

- **DemoBanner** (todas las demos): fijo inferior, "Prototipo interactivo · datos ilustrativos ·
  sin backend" + aclaración sectorial + "Volver al catálogo" + CTA comercial. Descartable,
  accesible (`role="region"`). Componente autocontenido por app (consistencia, no dependencia
  compartida pesada).
- **Nexo** (NEXO LAB): copiloto SVG **placeholder** que guía por reglas frontend; nunca finge IA
  en tiempo real.
- **Miniaturas + "Vista interactiva"** (catálogo): imagen estática por defecto; iframe bajo demanda.

## SEO / social (por demo)

Favicon propio (SVG), `canonical`, Open Graph 1200×630 (generada a partir de SVG con `sharp-cli`,
marca + tagline + acento por identidad), Twitter Card `summary_large_image`, `theme-color`,
`og:image:alt`, `og:locale`.

## Accesibilidad y motion

Responsive; respeta `prefers-reduced-motion`; foco visible; navegación por teclado; modales con
Escape/foco; equivalentes textuales para diagramas (NEXO LAB).
