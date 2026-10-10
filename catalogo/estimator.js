/*
 * Estimador de inversión (calculadora de la landing). Lógica pura, sin DOM.
 * Funciona en el navegador (window.Estimator) y en Node (module.exports) para validarlo en CI.
 *
 * estimate(cfg, { goal, size, extras }) → { planId, planName, min, max, score, openEnded, features } | null
 *  - El plan sale de la meta elegida; el rango base, de priceMin/priceMax del plan.
 *  - score = peso del tamaño + pesos de los extras (0 a 1) decide el punto dentro del rango.
 *  - Sin priceMax (plan abierto) solo se devuelve "desde" (max = null).
 */
(function (root) {
  "use strict";

  var clamp = function (n, a, b) { return Math.min(b, Math.max(a, n)); };

  function estimate(cfg, sel) {
    var calc = cfg && cfg.calculator;
    if (!calc || !sel) return null;
    var goal = (calc.goals || []).find(function (g) { return g.id === sel.goal; });
    var size = (calc.sizes || []).find(function (s) { return s.id === sel.size; });
    if (!goal || !size) return null;
    var plan = ((cfg.pricing && cfg.pricing.plans) || []).find(function (p) { return p.id === goal.plan; });
    if (!plan || !(plan.priceMin > 0)) return null;

    var extras = (sel.extras || [])
      .map(function (id) { return (calc.extras || []).find(function (e) { return e.id === id; }); })
      .filter(Boolean);
    var score = clamp(size.weight + extras.reduce(function (n, e) { return n + e.weight; }, 0), 0, 1);

    var step = calc.roundTo > 0 ? calc.roundTo : 1;
    var round = function (n) { return Math.round(n / step) * step; };
    var min = plan.priceMin;
    var max = plan.priceMax;
    var base = { planId: plan.id, planName: plan.name, score: score, features: plan.features || [] };

    if (!(max > min)) {
      return Object.assign(base, { min: min, max: null, openEnded: true });
    }
    var spread = clamp(calc.spread == null ? 0.25 : calc.spread, 0, 0.5);
    var low = round(min + (max - min) * Math.max(0, score - spread));
    var high = round(min + (max - min) * Math.min(1, score + spread));
    low = clamp(low, min, max);
    high = clamp(Math.max(high, low), min, max);
    return Object.assign(base, { min: low, max: high, openEnded: false });
  }

  var fmt = function (n) { return "$" + Math.round(n).toLocaleString("es-CO"); };

  /** Texto del estimado: "Entre $X y $Y" o "Desde $X". */
  function rangeText(r) {
    if (!r) return "";
    return r.openEnded || r.max == null || r.max === r.min
      ? (r.openEnded ? "Desde " : "Cerca de ") + fmt(r.min)
      : "Entre " + fmt(r.min) + " y " + fmt(r.max);
  }

  /** Mensaje de WhatsApp con la selección y el estimado. */
  function buildMessage(cfg, sel, r) {
    var calc = cfg.calculator;
    var goal = calc.goals.find(function (g) { return g.id === sel.goal; });
    var size = calc.sizes.find(function (s) { return s.id === sel.size; });
    var extras = (sel.extras || [])
      .map(function (id) { return calc.extras.find(function (e) { return e.id === id; }); })
      .filter(Boolean)
      .map(function (e) { return "• " + e.label; });
    return [
      "Hola, hice la calculadora de Estudio Abimaru y quiero una cotización exacta.",
      "",
      "Objetivo: " + goal.label,
      "Tamaño: " + size.label + " (" + size.hint + ")",
      extras.length ? "Extras:\n" + extras.join("\n") : "Extras: ninguno",
      "",
      "Plan sugerido: " + r.planName,
      "Estimado orientativo: " + rangeText(r) + " COP",
    ].join("\n");
  }

  var api = { estimate: estimate, rangeText: rangeText, buildMessage: buildMessage };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Estimator = api;
})(typeof window !== "undefined" ? window : this);
