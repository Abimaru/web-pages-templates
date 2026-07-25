# NÚCLEO CRM — Recomendaciones de backend

> Este documento acompaña al **front-end de demostración** (Vite + React, sin backend).
> Aquí van las recomendaciones para construir la capa de servidor y base de datos.

---

## 1. TL;DR (recomendación)

- **Lenguaje / framework:** **Spring Boot (Java)** si el objetivo es un CRM empresarial robusto y de largo plazo. **Python + FastAPI** si priorizas velocidad de desarrollo e integración con IA/analítica. **Go** solo si el driver principal es alta concurrencia / microservicios de bajísima latencia.
- **Base de datos:** **Relacional (PostgreSQL)**. Un CRM es datos altamente relacionados (contactos ↔ empresas ↔ negocios ↔ actividades ↔ usuarios); las transacciones y la integridad referencial importan. **MariaDB** es una alternativa relacional válida. **MongoDB** solo como complemento (eventos, logs, documentos), no como base principal.

**Stack sugerido para arrancar:** `Spring Boot 3 + PostgreSQL 16 + JWT`, o `FastAPI + PostgreSQL + SQLAlchemy` si el equipo es Python.

---

## 2. Comparación de lenguajes

| Criterio | Spring Boot (Java) | Python + FastAPI | Go |
|---|---|---|---|
| Madurez para CRM/ERP | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Velocidad de desarrollo | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Rendimiento / concurrencia | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Ecosistema (ORM, seguridad, batch) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Curva de aprendizaje | Media-alta | Baja | Media |
| Tipado estático | Sí | Sí (con type hints) | Sí |
| Ideal para… | Negocio complejo, equipos grandes, integraciones | MVP rápido, IA/analítica, equipos pequeños | Servicios de alta carga, real-time |

**Por qué Spring Boot para un CRM:** Spring Data JPA, Spring Security, validación, transacciones, migraciones (Flyway/Liquibase) y un ecosistema enorme. Es el estándar de facto para software de negocio serio.

**Por qué FastAPI:** productividad altísima, documentación OpenAPI automática, async nativo y el mejor puente hacia analítica/IA (scoring de leads, predicción de cierre). Excelente para llegar rápido a producción.

**Cuándo Go:** si vas a manejar webhooks masivos, sincronización en tiempo real o un gateway de eventos. Para el CRUD del CRM, Java o Python rinden de sobra.

---

## 3. Base de datos: relacional vs. MongoDB

**Recomendado: PostgreSQL (relacional).**

- Los datos del CRM son **relaciones** por naturaleza: un negocio pertenece a un contacto y a una empresa; una actividad pertenece a un usuario y a un negocio.
- Necesitas **integridad referencial**, **transacciones** (mover un negocio + registrar actividad + notificar debe ser atómico) y **reportes con JOINs/agregaciones**.
- PostgreSQL además ofrece columnas `JSONB` para campos flexibles (propiedades personalizadas por cliente) — lo mejor de ambos mundos.

**MariaDB:** relacional, sólida y ligera. Buena opción si el equipo ya la conoce; para features avanzadas (JSONB, window functions, full-text) PostgreSQL va un paso adelante.

**MongoDB:** úsalo como **complemento**, no como base principal:
- Bitácora de eventos / actividad de alto volumen.
- Almacenamiento de documentos adjuntos o payloads de integraciones.
- Cachés de agregaciones para dashboards.

---

## 4. Modelo de datos sugerido (relacional)

```
usuarios(id, nombre, email, rol, password_hash, creado_en)
empresas(id, nombre, sector, ciudad, sitio_web, creado_en)
contactos(id, empresa_id → empresas, nombre, email, telefono,
          estado[cliente|prospecto|inactivo], propietario_id → usuarios,
          ultimo_contacto, creado_en)
negocios(id, titulo, empresa_id → empresas, contacto_id → contactos,
         valor, etapa[prospecto|contactado|propuesta|negociacion|ganado|perdido],
         propietario_id → usuarios, fecha_cierre, creado_en)
tareas(id, titulo, negocio_id → negocios (nullable), contacto_id → contactos (nullable),
       responsable_id → usuarios, vence_en, prioridad[alta|media|baja], completada)
actividades(id, usuario_id → usuarios, negocio_id → negocios (nullable),
            tipo, descripcion, creado_en)
```

Índices clave: `contactos(estado)`, `negocios(etapa)`, `negocios(propietario_id)`, `tareas(responsable_id, completada)`.

---

## 5. API REST sugerida

```
POST   /auth/login                 → JWT
GET    /contactos?estado=&q=        → listado + filtros + paginación
POST   /contactos
GET    /contactos/{id}
PATCH  /contactos/{id}
GET    /negocios?etapa=             → tablero kanban
PATCH  /negocios/{id}               → mover de etapa (drag & drop del front)
GET    /tareas?completada=false
PATCH  /tareas/{id}                 → marcar completada
GET    /reportes/resumen            → KPIs del dashboard
GET    /reportes/ingresos?meses=8   → serie para el gráfico
```

Autenticación con **JWT** (access + refresh) y control de acceso por rol (admin / vendedor).

---

## 6. Cómo conectar este front

El front ya está estructurado para migrar fácil:

- Los datos viven en [`src/data/crm.ts`](src/data/crm.ts). Reemplaza los arreglos por llamadas `fetch`/`axios` a la API.
- Sugerido: **TanStack Query (React Query)** para caché, estados de carga y refetch.
- Variables de entorno: `VITE_API_URL` para la base de la API.
- El drag & drop del pipeline ya emite el cambio de etapa localmente; conéctalo a `PATCH /negocios/{id}`.

### Ejemplo (fetch)
```ts
const API = import.meta.env.VITE_API_URL;
export const getContactos = (q = "") =>
  fetch(`${API}/contactos?q=${encodeURIComponent(q)}`).then((r) => r.json());
```

---

## 7. Infraestructura sugerida (cuando crezca)

- **Contenedores:** Docker + Docker Compose (api + postgres + redis).
- **Caché / colas:** Redis (sesiones, rate limiting, jobs).
- **Migraciones:** Flyway/Liquibase (Java) o Alembic (Python).
- **Despliegue:** Railway / Render / Fly.io para empezar; Kubernetes cuando escale.
- **Observabilidad:** logs estructurados + métricas (Prometheus/Grafana).

---

*Prototipo por Abimaru — documento de referencia, no vinculante.*
