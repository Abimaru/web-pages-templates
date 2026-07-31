# 11 · Eventos de analítica

**No hay proveedor activado.** La landing tiene un stub `track(event, data)` que hoy no envía nada.
No se activa analítica sin autorización ni con un ID inventado.

## Eventos previstos
`iniciar_compass` · `completar_compass` · `descargar_diagnostico` · `enviar_diagnostico_whatsapp` ·
`ver_arquetipo` · `ver_quality_passport` · `abrir_proof_room` · `descargar_artefacto` ·
`solicitar_blueprint` · `solicitar_assurance` · `abrir_nexo_lab`.

Además, ya se emiten en la landing: `ver_demo`, `quiero_pagina`, `whatsapp`, `seleccion_plan`,
`envio_formulario`, `vista_interactiva`.

## Reglas
- **No** registrar respuestas sensibles del diagnóstico.
- Conservar UTM cuando exista (p. ej. `?utm_source=flyer`).
- Al activar un proveedor: política de privacidad, aviso/consentimiento cuando aplique, y forma de
  desactivar.

## Pendiente del propietario
Elegir proveedor (recomendado **GoatCounter** o **Cloudflare Web Analytics**: gratis, sin cookies) y
entregar el ID/snippet para cablearlo con los eventos anteriores.
