/*
 * Analítica de la landing — sin cookies, opcional y respetuosa.
 *
 * Proveedores soportados (config.js → SITE_CONFIG.analytics):
 *   { provider: "plausible", id: "tudominio.com" [, src: "https://plausible.io/js/script.js"] }
 *   { provider: "umami",     id: "<website-id>",  src: "https://cloud.umami.is/script.js" }
 * Sin proveedor no se carga NADA de terceros. No se activa en localhost/file ni si el navegador
 * envía "No rastrear". Los eventos también se empujan a window.dataLayer (por si usas GTM).
 * Nunca se envían datos personales: solo nombre del evento y propiedades simples.
 * (Google Analytics 4 usa cookies y requiere aviso de consentimiento: no se incluye a propósito.)
 *
 * Funciona en el navegador (window.Analytics) y en Node (createAnalytics) para validarlo en CI.
 */
(function (root) {
  "use strict";

  var PROVIDERS = {
    plausible: { src: "https://plausible.io/js/script.js", attr: function (id) { return { "data-domain": id }; } },
    umami: { src: "", attr: function (id) { return { "data-website-id": id }; } },
  };

  /** Propiedades planas y seguras: solo string/number/boolean, texto recortado. */
  function clean(data) {
    var out = {};
    Object.keys(data || {}).forEach(function (k) {
      var v = data[k];
      if (v == null) return;
      if (typeof v === "string") out[k] = v.slice(0, 120);
      else if (typeof v === "number" || typeof v === "boolean") out[k] = v;
    });
    return out;
  }

  function isLocal(host, protocol) {
    return protocol === "file:" || !host || host === "localhost" || host === "127.0.0.1" || host === "[::1]" || /\.local$/.test(host);
  }

  /** env = { win, doc, nav, loc }: inyectable para pruebas. */
  function createAnalytics(env) {
    var win = env.win, doc = env.doc, nav = env.nav || {}, loc = env.loc || {};
    var state = { active: false, provider: "", queue: [], ready: false, seen: {} };

    function dispatch(event, props) {
      if (state.provider === "plausible" && typeof win.plausible === "function") win.plausible(event, { props: props });
      else if (state.provider === "umami" && win.umami && typeof win.umami.track === "function") win.umami.track(event, props);
    }

    function init(cfg) {
      var a = cfg && cfg.analytics;
      if (!a || !a.provider || !a.id || !PROVIDERS[a.provider]) return state;
      if (nav.doNotTrack === "1" || win.doNotTrack === "1") return state;
      if (isLocal(loc.hostname, loc.protocol)) return state;
      var def = PROVIDERS[a.provider];
      var src = a.src || def.src;
      if (!src) return state; // umami requiere src explícito
      state.provider = a.provider;
      state.active = true;
      if (a.provider === "plausible") {
        // cola mínima: los eventos previos a la carga del script no se pierden
        win.plausible = win.plausible || function () { (win.plausible.q = win.plausible.q || []).push(arguments); };
      }
      var s = doc.createElement("script");
      s.defer = true;
      s.src = src;
      var attrs = def.attr(a.id);
      Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
      s.onload = function () {
        state.ready = true;
        state.queue.splice(0).forEach(function (e) { dispatch(e[0], e[1]); });
      };
      doc.head.appendChild(s);
      return state;
    }

    function track(event, data) {
      var props = clean(data);
      try { if (win.dataLayer) win.dataLayer.push(Object.assign({ event: event }, props)); } catch (e) { /* noop */ }
      if (!state.active) return;
      // plausible tiene cola propia; umami necesita esperar a su script
      if (state.provider === "plausible" || state.ready) dispatch(event, props);
      else state.queue.push([event, props]);
    }

    /** Evento que se registra una sola vez por carga de página (p. ej. ver_seccion:planes). */
    function once(key, event, data) {
      if (state.seen[key]) return;
      state.seen[key] = true;
      track(event, data);
    }

    return { init: init, track: track, once: once, state: state, clean: clean, isLocal: isLocal };
  }

  /**
   * Clasifica un enlace de una demo en un evento de conversión (o null si no interesa):
   *  - cta_estudio:     WhatsApp al estudio ("Quiero una solución así", "Quiero una tienda así…")
   *  - pedido_demo:     WhatsApp de un pedido/cotización de la demo (el cliente final)
   *  - volver_catalogo: enlace "Volver al catálogo" (lleva UTM)
   */
  function classifyLink(href, demo, studioWhatsapp) {
    if (typeof href !== "string") return null;
    var props = { demo: demo || "" };
    if (href.indexOf("https://wa.me/") === 0) {
      var studio = studioWhatsapp ? "https://wa.me/" + studioWhatsapp : "";
      return { event: studio && href.indexOf(studio) === 0 ? "cta_estudio" : "pedido_demo", props: props };
    }
    if (href.indexOf("utm_campaign=volver-catalogo") !== -1) return { event: "volver_catalogo", props: props };
    return null;
  }

  var api = { createAnalytics: createAnalytics, classifyLink: classifyLink };
  if (typeof document !== "undefined" && typeof navigator !== "undefined") {
    var inst = createAnalytics({ win: root, doc: document, nav: navigator, loc: root.location });
    api.track = inst.track;
    api.once = inst.once;
    api.init = inst.init;
    api.state = inst.state;
    /** Mide las conversiones de una demo con UN solo listener de clics (sin tocar sus componentes). */
    api.trackDemo = function (demo, cfg) {
      if (!inst.state.active) return;
      var studio = cfg && cfg.contact && cfg.contact.whatsapp;
      document.addEventListener("click", function (e) {
        var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
        var hit = a && classifyLink(a.href, demo, studio);
        if (hit) inst.track(hit.event, hit.props);
      }, true);
    };
  }
  root.Analytics = api;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this));
