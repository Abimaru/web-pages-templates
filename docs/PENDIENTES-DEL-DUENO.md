# Pendientes del dueño (lo que Claude no puede hacer solo)

Marca cada punto cuando lo entregues. Claude los retoma cuando los traigas.

## 1. Encender la analítica (5 min) — bloquea medir conversiones
- [ ] Crear el sitio en https://cloud.umami.is (gratis) con el dominio `abimaru.github.io`.
- [ ] Copiar el **Website ID** y pegarlo en `catalogo/config.js` → `analytics.id` (o enviárselo a Claude).
- Hasta entonces la analítica está apagada y no se mide nada.

## 2. Datos comerciales reales (el catálogo hoy usa valores de ejemplo)
- [ ] Rangos de precio reales por plantilla (`priceMin` / `priceMax` en `catalogo/config.js`).
- [ ] Pesos de la calculadora del estimador (qué suma o resta al precio cada opción).
- [ ] Tiempo de entrega real por plantilla (`leadTime`).
- [ ] Correo y dominio de marca del estudio (hoy no hay).
- [ ] Número de WhatsApp real del estudio para el CTA «Cotizar».

## 3. Prueba social real (no se puede inventar)
- [ ] Testimonios reales de clientes (nombre, cargo/negocio, permiso por escrito).
- [ ] Logos o casos de uso reales, si los hay.
- [ ] Decidir si se agrega una encuesta corta de satisfacción (tú no estabas seguro).

## 4. Por demo, cuando se venda a un cliente real
- [ ] Número real de WhatsApp en `STORE_WHATSAPP` (ropa-maru, farmacia-vitalis, muebles-atelier-ibarguen, etc.).
- [ ] Fotos propias de producto (hoy son ilustraciones/generadas).
- [ ] PRÓSPERA y VITALIS: revisión legal / cumplimiento antes de usarlas con una entidad real.

## 5. Pruebas en dispositivo real
- [ ] Abrir el catálogo en tu celular, «Añadir a pantalla de inicio» y probar la PWA (instalación y modo sin conexión).
- [ ] Revisar las 8 demos en el celular y avisar qué se ve mal.
