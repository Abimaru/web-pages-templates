# NEXO LAB by Abimaru

**Architecture · Backend · Cloud · AI Engineering**
_Arquitectura, modernización y software que sí llega a producción._

Página de **servicios profesionales** de Estudio Abimaru, dirigida a empresas y equipos de
tecnología (arquitectura, backend, cloud, modernización, ingeniería inversa, diagnóstico técnico,
CI/CD, QA e ingeniería de conocimiento para agentes de IA). **No es un modelo del catálogo**: es una
línea de negocio distinta, con página propia, y **no incrementa el contador de modelos** de la
landing.

## Ruta

Publicada en `/web-pages-templates/nexo-lab/` (GitHub Pages). En dev corre en la raíz (`/`).

## Stack

Vite + React 19 + TypeScript + Tailwind CSS v4 (mismo stack que las demos Vite del repo). Sin
backend: los formularios solo arman un mensaje y abren WhatsApp o correo; nada se almacena.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
```

## Validar y construir

```bash
npm run lint     # tsc --noEmit
npm run test     # vitest (lógica del recomendador)
npm run build    # tsc -b && vite build  → dist/
npm run preview  # sirve dist/
```

## Despliegue

Integrado en `.github/workflows/deploy.yml`:

- Paso **Build NEXO LAB** con `VITE_BASE=/web-pages-templates/nexo-lab/`.
- Ensamblado: `cp -r nexo-lab/dist/. _site/nexo-lab/`.

Es una SPA de una sola página con anclas (sin router), por lo que no requiere `404.html`.

## Estructura

```text
nexo-lab/
├── index.html              # SEO/OG/canonical/JSON-LD propios
├── public/
│   ├── nexo-lab.svg        # isotipo / favicon
│   └── og-nexo-lab.jpg     # Open Graph 1200×630 (generado)
├── src/
│   ├── config.ts           # marca + contacto centralizados
│   ├── data/               # capabilities, packages, cases, technologies, faqs, problems, naf
│   ├── lib/                # recommender (+ test)
│   ├── hooks/              # useReveal (respeta reduced motion)
│   ├── components/         # Logo, Nexo, Navbar, Footer, Section, Icon
│   └── sections/           # Hero, ProblemSelector, Capabilities, Packages, CaseStudies,
│                           # NAF, Lab, Technologies, Profile, WayOfWorking, FAQ, Contact, FinalCTA
```

## Identidad y assets

- **Logo NEXO LAB**: SVG original (nodo · enlace · núcleo · letra N), variantes isotipo / horizontal
  / monocromático en `src/components/Logo.tsx` y `public/nexo-lab.svg`. No se parece a marcas
  conocidas.
- **Nexo** (copiloto): **placeholder SVG original** en `src/components/Nexo.tsx`. Guía por reglas
  frontend con mensajes predefinidos — **no** usa IA en tiempo real, no analiza el sistema del
  visitante, no hace diagnósticos automáticos ni guarda conversaciones.
  `TODO(propietario)`: reemplazable por el asset aprobado de Nexo cuando exista.
- **OG**: `public/og-nexo-lab.jpg` se genera desde un SVG con `npx sharp-cli` (1200×630).

## Privacidad y confidencialidad

Los **casos de estudio son anonimizados e ilustrativos**: no incluyen nombres de clientes,
repositorios, ramas, IDs, URLs internas, secretos ni métricas confidenciales. Se muestran enfoques,
decisiones y capacidades, no datos propietarios. Las métricas de negocio se reemplazan por estados
(Analizado, Documentado, Validado, Modernizado, Automatizado, Transferido).

## Placeholders / pendientes de confirmación

Centralizados en `src/config.ts`. **Los campos vacíos no se renderizan.**

- `email`, `whatsapp`: reutilizados de Estudio Abimaru (mismo propietario, ya públicos).
- `upwork`, `linkedin`, `github`, `calendly`: **vacíos** → completar cuando estén confirmados.
- Certificaciones: solo se muestra **AWS Certified Cloud Practitioner** (confirmada). No agregar
  certificaciones en preparación como si estuvieran aprobadas.
- No hay precios: se usa "Cotización personalizada".
