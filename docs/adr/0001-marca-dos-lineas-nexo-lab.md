# 0001 — Dos líneas de marca; NEXO LAB independiente

- Estado: Aceptado
- Fecha: 2026-07-26

## Contexto

Estudio Abimaru vendía páginas/catálogos/tiendas a negocios. Surge la necesidad de ofrecer
servicios profesionales de ingeniería (arquitectura, backend, cloud, modernización, QA, IA) a un
público distinto (empresas, equipos técnicos). Mezclar ambos en la misma landing confundiría el
mensaje y el recorrido de conversión.

## Decisión

Crear **NEXO LAB by Abimaru** como **línea independiente** con su propia página (`/nexo-lab/`),
identidad (cyberpunk ejecutivo) y contenido. Integrarla en la landing de forma **no invasiva**:
franja diferenciada entre Servicios y Planes + enlaces en header/móvil/footer.

**NEXO LAB no incrementa el contador de modelos** (el contador cuenta solo las 8 demos
seleccionables del catálogo).

## Alternativas consideradas

- **Un noveno "modelo" en el catálogo:** rechazado — NEXO LAB no es una plantilla que el cliente
  escoge, y contaminaría el contador y el público.
- **Sitio/dominio aparte:** innecesario hoy (mismo propietario, GitHub Pages gratuito); se integra
  como subruta.

## Consecuencias

- Público y CTA claros por línea; sin canibalizar la cotización de páginas web.
- El contador y `sitemap` tratan NEXO LAB como servicios, no como modelo.
- Contacto reutiliza email/WhatsApp; enlaces profesionales (Upwork/LinkedIn/GitHub) configurables.
