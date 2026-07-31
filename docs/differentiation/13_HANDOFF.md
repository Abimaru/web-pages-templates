# 13 · Handoff

## Cómo mantener/extender

### Arquetipos
Editar `catalogo/archetypes.js` (una entrada por `id` de modelo). El validador
`npm run validate:archetypes` verifica que cada modelo tenga arquetipo y campos válidos.

### Nexo Compass (reglas)
Editar `catalogo/compass.js`: `QUESTIONS`, `ROUTES` y la función `recommend(answers)`. No requiere
backend. Mantener el disclaimer y no registrar respuestas sensibles.

### Quality Passport
No se edita a mano: se genera con `npm run generate:quality-passports` y se valida con
`npm run validate:quality-passports`. En CI se regenera con el commit del deploy.

### Proof Room
Añadir/editar artefactos en `nexo-lab/src/data/proofRoom.ts` (mantenerlos genéricos y anonimizados,
marcados como ejemplo).

### Nexo Delivery System / secciones de NEXO LAB
Secciones en `nexo-lab/src/sections/`. Se añaden en `nexo-lab/src/App.tsx`.

## Validación antes de desplegar
```bash
npm run check:all
npm run validate:archetypes
npm run generate:quality-passports && npm run validate:quality-passports
npm run build:all && npm run smoke
```

## Pendientes del propietario (requieren confirmación)
- **Analítica:** elegir proveedor (GoatCounter/Cloudflare) y entregar el ID para activarla
  (ver [11](11_ANALYTICS_EVENTS.md)).
- **Nexo Network:** permanece oculta hasta tener colaboradores reales confirmados.
- **Datos de contacto adicionales:** Calendly (si aplica).
- No inventar clientes, colaboradores, certificaciones ni resultados.

## Notas
- Windows/Git Bash: usar `npm run build:all` o `MSYS_NO_PATHCONV=1` para evitar el mangling de
  `VITE_BASE` (ver `../development.md`).
- El pre-render corre sobre `_site` en CI; el código fuente de la landing permanece "limpio".
