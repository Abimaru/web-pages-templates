/*
 * NEXO COMPASS — diagnóstico interactivo por REGLAS (sin backend, sin IA en tiempo real).
 * Todo se calcula y genera en el navegador. Las respuestas NO se envían ni se guardan
 * ni se usan en analítica. Resultado orientativo: no sustituye una evaluación profesional.
 */
(function () {
  "use strict";
  var mount = document.getElementById("compassApp");
  if (!mount) return;

  var CFG = window.SITE_CONFIG || { contact: { whatsapp: "573157076691" } };
  var MODELS = window.TEMPLATES || [];
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var wa = function (msg) {
    return "https://wa.me/" + CFG.contact.whatsapp + "?text=" + encodeURIComponent(msg);
  };
  var modelName = function (id) {
    var m = MODELS.find(function (x) { return x.id === id; });
    return m ? m.name : id;
  };

  var QUESTIONS = [
    { id: "objetivo", label: "¿Cuál es tu objetivo principal?", multi: false,
      options: ["Mostrar mi negocio", "Vender productos", "Recibir solicitudes", "Gestionar clientes", "Automatizar tareas", "Integrar herramientas", "Construir una aplicación", "Modernizar un sistema", "Revisar arquitectura o calidad"] },
    { id: "estado", label: "¿Cuál es tu estado actual?", multi: false,
      options: ["No tengo solución", "Uso hojas de cálculo", "Uso WhatsApp manualmente", "Tengo una página básica", "Tengo herramientas desconectadas", "Tengo un sistema propio", "Tengo un sistema heredado"] },
    { id: "usuarios", label: "¿Quiénes usarían la solución?", multi: true,
      options: ["Clientes", "Empleados", "Proveedores", "Administradores", "Equipo técnico", "Varios grupos"] },
    { id: "datos", label: "¿Qué datos se tratarían?", multi: true,
      options: ["Públicos", "Contacto", "Comerciales", "Financieros", "Salud", "Datos personales", "Información interna"] },
    { id: "integraciones", label: "¿Con qué herramientas se conectaría?", multi: true,
      options: ["WhatsApp", "Correo", "Pagos", "CRM", "Inventario", "Analítica", "ERP", "APIs", "Cloud", "Ninguna"] },
    { id: "prioridad", label: "¿Cuál es tu prioridad?", multi: false,
      options: ["Validar una idea", "Vender", "Reducir trabajo manual", "Mejorar experiencia", "Reducir errores", "Aumentar control", "Modernizar", "Reducir riesgos"] },
    { id: "urgencia", label: "¿Qué tan pronto lo necesitas?", multi: false,
      options: ["Exploración", "Próximo trimestre", "Próximas semanas", "Urgente"] },
  ];

  var ROUTES = {
    presencia: { name: "Presencia digital", desc: "Una página clara para mostrar tu negocio y recibir contactos.", service: "Página Esencial", nexo: false },
    catalogo: { name: "Catálogo comercial", desc: "Muestra productos o servicios y recibe solicitudes organizadas.", service: "Catálogo Comercial", nexo: false },
    tienda: { name: "Tienda online", desc: "Vende en línea con carrito, pagos y gestión de pedidos.", service: "Tienda Virtual", nexo: false },
    app: { name: "Aplicación administrativa", desc: "Ordena tu operación interna: clientes, pipeline, tareas y reportes.", service: "Custom Application Prototype", nexo: true },
    automatizacion: { name: "Automatización", desc: "Reduce el trabajo manual conectando y automatizando procesos.", service: "Custom Application Prototype", nexo: true },
    integracion: { name: "Integración / orquestación", desc: "Conecta tus herramientas para que operen como un solo sistema.", service: "Technology Orchestration Advisory", nexo: true },
    prototype: { name: "Custom Application Prototype", desc: "Un prototipo funcional para validar producto, flujo y arquitectura.", service: "Custom Application Prototype", nexo: true },
    blueprint: { name: "Digital Solution Blueprint", desc: "Diseño de la solución cuando aún no está claro qué construir.", service: "Digital Solution Blueprint", nexo: true },
    assessment: { name: "Architecture Assessment", desc: "Evaluación de arquitectura, riesgos, deuda y roadmap.", service: "Architecture Assessment", nexo: true },
    legacy: { name: "Legacy System Discovery", desc: "Ingeniería inversa y documentación de un sistema heredado.", service: "Legacy System Discovery", nexo: true },
    assurance: { name: "Assurance & Launch Review", desc: "Revisión de seguridad, calidad y accesibilidad antes de publicar.", service: "Assurance & Launch Review", nexo: true },
  };

  function recommend(a) {
    var obj = a.objetivo, estado = a.estado, datos = a.datos || [], prio = a.prioridad;
    var key = "presencia";
    var archetypes = [];
    switch (obj) {
      case "Vender productos": key = "tienda"; archetypes = ["maru", "pixelvault"]; break;
      case "Recibir solicitudes": key = "catalogo"; archetypes = ["vitalis", "atelier", "nexora"]; break;
      case "Gestionar clientes": key = "app"; archetypes = ["nucleo"]; break;
      case "Automatizar tareas": key = "automatizacion"; archetypes = ["nucleo"]; break;
      case "Integrar herramientas": key = "integracion"; archetypes = ["nucleo", "vianova"]; break;
      case "Construir una aplicación": key = "prototype"; archetypes = ["nucleo", "vianova"]; break;
      case "Modernizar un sistema": key = estado === "Tengo un sistema heredado" ? "legacy" : "assessment"; break;
      case "Revisar arquitectura o calidad": key = "assessment"; break;
      default: key = "presencia"; archetypes = ["nexora", "atelier"]; break;
    }
    // Ajustes por estado / prioridad
    if (estado === "Tengo un sistema heredado" && key !== "legacy" && key !== "assessment") key = "legacy";
    if (estado === "No tengo solución" && key === "presencia" && prio === "Validar una idea") key = "blueprint";
    if (prio === "Reducir riesgos" && !ROUTES[key].nexo) key = "assurance";

    var route = ROUTES[key];

    // Riesgos iniciales según datos
    var risks = [];
    if (datos.indexOf("Financieros") >= 0) risks.push("Datos financieros: clasificación, cifrado y controles de acceso; cumplimiento según normativa.");
    if (datos.indexOf("Salud") >= 0) risks.push("Datos de salud: altamente sensibles; no recolectar sin base legal y sin asesoría profesional.");
    if (datos.indexOf("Datos personales") >= 0) risks.push("Datos personales: privacidad, consentimiento y minimización de datos.");
    if (datos.indexOf("Comerciales") >= 0 || datos.indexOf("Información interna") >= 0) risks.push("Información comercial/interna: control de accesos, respaldo y trazabilidad.");
    if (!risks.length) risks.push("Datos de bajo riesgo. Aun así: HTTPS, buenas prácticas de privacidad y respaldo.");

    // Preguntas abiertas
    var openQ = [
      "¿Quién administrará el contenido o los datos después del lanzamiento?",
      "¿Qué volumen de usuarios, productos o transacciones esperas?",
      "¿Hay sistemas o herramientas con los que deba integrarse de forma obligatoria?",
    ];

    var nextStep = route.nexo
      ? "Agendar un diagnóstico técnico para acordar alcance y entregables (" + route.service + ")."
      : "Solicitar una cotización con el alcance acordado (" + route.service + ").";

    return { key: key, route: route, archetypes: archetypes, risks: risks, openQ: openQ, nextStep: nextStep };
  }

  // ---------- Estado del wizard ----------
  var step = 0;
  var answers = {};

  function set(id, value, multi) {
    if (!multi) { answers[id] = value; return; }
    var arr = answers[id] || [];
    var i = arr.indexOf(value);
    if (i >= 0) arr.splice(i, 1); else arr.push(value);
    answers[id] = arr;
  }
  function isSel(id, value, multi) {
    if (!multi) return answers[id] === value;
    return (answers[id] || []).indexOf(value) >= 0;
  }
  function answered(q) {
    return q.multi ? (answers[q.id] || []).length > 0 : Boolean(answers[q.id]);
  }

  function render() {
    if (step >= QUESTIONS.length) { renderResult(); return; }
    var q = QUESTIONS[step];
    var dots = QUESTIONS.map(function (_, i) { return '<i class="' + (i <= step ? "done" : "") + '"></i>'; }).join("");
    var opts = q.options.map(function (o) {
      return '<button type="button" class="compass-opt' + (isSel(q.id, o, q.multi) ? " sel" : "") + '" data-opt="' + esc(o) + '">' + esc(o) + "</button>";
    }).join("");
    mount.innerHTML =
      '<div class="compass-card">' +
      '<div class="compass-steps" aria-hidden="true">' + dots + "</div>" +
      '<p class="eyebrow" style="color:var(--muted)">Paso ' + (step + 1) + " de " + QUESTIONS.length + "</p>" +
      '<p class="compass-q" id="compassQ">' + esc(q.label) + (q.multi ? ' <span style="font-size:13px;color:var(--muted);font-weight:400">(elige una o varias)</span>' : "") + "</p>" +
      '<div class="compass-opts" role="group" aria-labelledby="compassQ">' + opts + "</div>" +
      '<div class="compass-nav">' +
      (step > 0 ? '<button type="button" class="btn btn-ghost btn-sm" id="cBack">← Atrás</button>' : "<span></span>") +
      '<button type="button" class="btn btn-primary btn-sm" id="cNext"' + (answered(q) ? "" : " disabled style=\"opacity:.5;cursor:not-allowed\"") + ">" +
      (step === QUESTIONS.length - 1 ? "Ver mi ruta →" : "Siguiente →") +
      "</button>" +
      "</div>" +
      "</div>";

    mount.querySelectorAll(".compass-opt").forEach(function (b) {
      b.addEventListener("click", function () {
        set(q.id, b.dataset.opt, q.multi);
        render();
      });
    });
    var back = document.getElementById("cBack");
    if (back) back.addEventListener("click", function () { step--; render(); });
    var next = document.getElementById("cNext");
    if (next) next.addEventListener("click", function () { if (answered(q)) { step++; render(); } });
  }

  function buildMarkdown(rec) {
    var d = new Date();
    var line = function (k, v) { return "- **" + k + ":** " + (Array.isArray(v) ? v.join(", ") : v || "—") + "\n"; };
    var md =
      "# Diagnóstico Nexo Compass\n\n" +
      "> Resultado orientativo generado mediante reglas en el navegador. No sustituye una evaluación profesional del contexto. Estudio Abimaru — prototipo.\n\n" +
      "Fecha: " + d.toLocaleString("es-CO") + "\n\n" +
      "## Tus respuestas\n" +
      line("Objetivo", answers.objetivo) +
      line("Estado actual", answers.estado) +
      line("Usuarios", answers.usuarios) +
      line("Datos", answers.datos) +
      line("Integraciones", answers.integraciones) +
      line("Prioridad", answers.prioridad) +
      line("Urgencia", answers.urgencia) +
      "\n## Ruta recomendada\n" +
      "**" + rec.route.name + "** — " + rec.route.desc + "\n\n" +
      "Servicio relacionado: " + rec.route.service + (rec.route.nexo ? " (NEXO LAB)" : "") + "\n\n" +
      "## Arquetipos relacionados\n" +
      (rec.archetypes.length ? rec.archetypes.map(function (id) { return "- " + modelName(id); }).join("\n") : "- (según el alcance)") + "\n\n" +
      "## Riesgos iniciales\n" + rec.risks.map(function (r) { return "- " + r; }).join("\n") + "\n\n" +
      "## Preguntas abiertas\n" + rec.openQ.map(function (q) { return "- " + q; }).join("\n") + "\n\n" +
      "## Siguiente paso\n- " + rec.nextStep + "\n";
    return md;
  }

  function download(text, filename) {
    var blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function renderResult() {
    var rec = recommend(answers);
    var archChips = rec.archetypes.map(function (id) {
      return '<button type="button" class="tag arch" data-arch="' + id + '" style="cursor:pointer">' + esc(modelName(id)) + "</button>";
    }).join("");
    var waMsg =
      "Hola, hice el diagnóstico Nexo Compass. Objetivo: " + (answers.objetivo || "") +
      ". Ruta recomendada: " + rec.route.name + ". Me gustaría avanzar.";
    mount.innerHTML =
      '<div class="compass-card">' +
      '<span class="arch-label">Ruta recomendada</span>' +
      '<h3 style="font-family:\'Space Grotesk\';font-size:24px;font-weight:700;margin-top:12px">' + esc(rec.route.name) + "</h3>" +
      '<p style="color:#c7ccdb;line-height:1.6;margin-top:8px">' + esc(rec.route.desc) + "</p>" +
      '<p style="margin-top:10px"><span class="tag type">Servicio: ' + esc(rec.route.service) + "</span>" +
      (rec.route.nexo ? ' <span class="tag arch">Línea NEXO LAB</span>' : "") + "</p>" +
      '<div class="arch-grid">' +
      (archChips ? '<div class="arch-block"><h4>Arquetipos relacionados</h4><div class="arch-chips">' + archChips + "</div></div>" : "") +
      '<div class="arch-block"><h4>Riesgos iniciales</h4><ul>' + rec.risks.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="arch-block"><h4>Preguntas abiertas</h4><ul>' + rec.openQ.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="arch-block"><h4>Siguiente paso</h4><ul><li>' + esc(rec.nextStep) + "</li></ul></div>" +
      "</div>" +
      '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:22px">' +
      '<button type="button" class="btn btn-primary btn-sm" id="cDownload">⬇ Descargar resumen</button>' +
      '<a class="btn btn-wa btn-sm" target="_blank" rel="noopener noreferrer" href="' + wa(waMsg) + '">Enviar por WhatsApp</a>' +
      '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" href="' + wa("Hola, quiero solicitar un Digital Solution Blueprint a partir de mi diagnóstico Nexo Compass.") + '">Solicitar Blueprint</a>' +
      '<button type="button" class="btn btn-ghost btn-sm" id="cRestart">Empezar de nuevo</button>' +
      "</div>" +
      '<p style="color:var(--muted);font-size:12px;margin-top:14px">Resultado orientativo generado mediante reglas en tu navegador. No sustituye una evaluación profesional del contexto. Tus respuestas no se envían ni se guardan.</p>' +
      "</div>";

    document.getElementById("cDownload").addEventListener("click", function () {
      download(buildMarkdown(rec), "diagnostico-nexo.md");
    });
    document.getElementById("cRestart").addEventListener("click", function () {
      step = 0; answers = {}; render();
    });
    mount.querySelectorAll(".arch[data-arch]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (typeof window.openArchetype === "function") window.openArchetype(b.dataset.arch);
      });
    });
  }

  render();
})();
