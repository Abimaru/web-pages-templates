# 🗂️ NÚCLEO CRM — Prototipo de panel (front, sin backend)

Panel de gestión de clientes (CRM) **solo front-end**, para validar la interfaz antes de construir la lógica real. **Vite + React 19 + Tailwind v4 + TypeScript**, con gráficos SVG hechos a mano.

## Ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Funciones interactivas (sin backend)

La demo ya no tiene controles decorativos: los datos viven en un estado en memoria (`src/store/crmStore.tsx`, lógica pura en `src/lib/crmState.ts` con pruebas) y se reinician al recargar.

- **Nuevo** (barra superior): crea un contacto, una tarea o un negocio con validación; abre en el tipo de la vista actual y deja constancia en la actividad reciente.
- **Búsqueda global** en la barra superior: lleva a Contactos y filtra por nombre, empresa o correo.
- **Exportar CSV**: descarga exactamente lo que se ve (filtros incluidos), con BOM para Excel y neutralización de fórmulas (`=`, `+`, `-`, `@`) contra *CSV injection* (`src/lib/csv.ts`).
- **Campana**: muestra las tareas pendientes y lleva a Tareas; el teléfono de cada contacto es un enlace `tel:`.
- El Dashboard, el tablero de negocios y las tareas leen del mismo estado, así que todo se refleja al instante.

## Qué incluye

- **Shell** con sidebar (índigo) y topbar; navegación por vistas sin recargar.
- **Dashboard**: KPIs, gráfico de ingresos (línea/área), donut de origen y actividad reciente.
- **Contactos**: tabla con búsqueda, filtros por estado, avatares y valores.
- **Negocios**: **pipeline kanban con arrastrar y soltar** (mueve tarjetas entre etapas).
- **Tareas**: lista con completar/pendiente y prioridades.
- **Reportes**: barras de ventas, donut de canales y ranking del equipo.
- Aviso de "prototipo/demo" y respeto a `prefers-reduced-motion`.

## Sin backend

Todos los datos son de **demostración** y viven en [`src/data/crm.ts`](src/data/crm.ts). No hay servidor ni base de datos.

## Recomendaciones de backend

👉 Ver **[`BACKEND.md`](BACKEND.md)**: comparación **Spring Boot vs Go vs Python**, elección de base de datos (**relacional/PostgreSQL vs MongoDB**), modelo de datos, API REST sugerida y cómo conectar este front.

## Notas de diseño

- Estilo SaaS moderno: sidebar oscuro + contenido claro, acento índigo.
- Tipografías: `Plus Jakarta Sans` (display) + `Inter` (texto).
- El drag & drop del kanban ya actualiza el estado localmente; en producción se conecta a `PATCH /negocios/{id}`.
