# 0002 — Calidad por proyecto, orquestador raíz y CI que bloquea el deploy

- Estado: Aceptado
- Fecha: 2026-07-28

## Contexto

Solo NEXO LAB tenía `lint`/`test`. Las 6 demos Vite no tenían ninguno; las Next tenían un
`lint: eslint` **roto de fábrica** (config circular de ESLint 9). El workflow construía cada app
con `npm install`, sin validación previa, y desplegaba aunque algo fallara. No había forma de
correr calidad de todo el repo con un comando.

## Decisión

1. **`lint` = `tsc --noEmit`** en todos los proyectos (uniforme y funcional; reemplaza el eslint
   roto de las apps Next).
2. **`test` = Vitest** en todos: pruebas de **lógica pura** (finanzas de VíaNova y PRÓSPERA, con
   casos límite) e **integridad de datos** (ids únicos, precios ≥ 0, rutas de imagen válidas).
3. **Orquestador raíz** (`scripts/run-all.mjs`) con watchdog/timeout: `lint:all`, `test:all`,
   `build:all` (aplica la base por proyecto vía env de Node), `check:all`; y `smoke` estático
   (`scripts/smoke-static.mjs`).
4. **CI** pasa a `npm ci` + caché, corre `check:all` → `build:all` → `smoke`, y **el deploy solo
   ocurre si todo pasa**.

## Alternativas consideradas

- **Arreglar el eslint de las Next:** posible pero frágil (config circular); `tsc --noEmit` da un
  gate consistente con el resto sin mantener dos herramientas.
- **Playwright E2E:** aporta pero es pesado (navegadores en CI); se optó por **smoke estático**
  (barato, valida ensamblado/rutas/assets) y se deja E2E como mejora futura.
- **Monorepo con workspaces:** riesgo alto de romper apps que hoy funcionan; se prefirió un
  orquestador que invoca `npm run` por carpeta.

## Consecuencias

- Una regresión (build/lint/test/smoke) **frena el deploy** antes de publicar.
- Endurecer la matemática financiera (evitar `NaN`/`Infinity`) quedó cubierto por pruebas.
- Pasar `VITE_BASE` por env de Node (no por shell) evita el mangling de Git Bash en Windows.
