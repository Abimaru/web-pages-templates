import { describe, it, expect } from "vitest";
import { initialState, create, moveDeal, toggleTask, pendingTasks, filterContacts, parseMoney, isValidEmail } from "./crmState";
import { contactsToCsv, csvCell, toCsv } from "./csv";

const contact = { kind: "contact" as const, name: " Sara Gil ", company: "Luna SAS", email: "sara@luna.co", phone: "+57 300 000 0000", status: "Prospecto" as const };

describe("estado del CRM (NÚCLEO)", () => {
  it("crea un contacto válido al inicio, con id nuevo y actividad, sin mutar el estado previo", () => {
    const s0 = initialState();
    const r = create(s0, contact);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.state.contacts).toHaveLength(s0.contacts.length + 1);
    expect(r.state.contacts[0]).toMatchObject({ name: "Sara Gil", value: 0, lastContact: "Hoy" });
    expect(new Set(r.state.contacts.map((c) => c.id)).size).toBe(r.state.contacts.length);
    expect(r.state.activities[0].action).toContain("Sara Gil");
    expect(s0.contacts).toHaveLength(initialState().contacts.length); // original intacto
  });

  it("rechaza datos inválidos con un mensaje claro", () => {
    const s = initialState();
    expect(create(s, { ...contact, name: "  " })).toMatchObject({ ok: false });
    expect(create(s, { ...contact, company: "" })).toMatchObject({ ok: false });
    expect(create(s, { ...contact, email: "no-es-correo" })).toMatchObject({ ok: false });
    expect(create(s, { kind: "task", title: " ", who: "", due: "", priority: "Alta" })).toMatchObject({ ok: false });
    expect(create(s, { kind: "deal", title: "X", company: "Y", value: "abc", stage: "Prospecto", owner: "" })).toMatchObject({ ok: false });
    expect(create(s, { kind: "deal", title: "X", company: "Y", value: "0", stage: "Prospecto", owner: "" })).toMatchObject({ ok: false });
  });

  it("el correo es opcional pero, si se escribe, se valida", () => {
    expect(create(initialState(), { ...contact, email: "" }).ok).toBe(true);
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("a@b")).toBe(false);
  });

  it("crea tareas (con valores por defecto) y negocios (valor en texto con puntos)", () => {
    const t = create(initialState(), { kind: "task", title: "Llamar", who: "", due: "", priority: "Media" });
    expect(t.ok && t.state.tasks[0]).toMatchObject({ who: "Sin asignar", due: "Hoy", done: false });
    const d = create(initialState(), { kind: "deal", title: "ERP", company: "Acme", value: "$ 12.500.000", stage: "Propuesta", owner: "" });
    expect(d.ok && d.state.deals[0]).toMatchObject({ value: 12_500_000, owner: "Tú", stage: "Propuesta" });
    expect(parseMoney("1.234")).toBe(1234);
    expect(parseMoney("")).toBe(0);
  });

  it("mover un negocio actualiza la etapa y registra actividad; misma etapa o id inexistente no cambia nada", () => {
    const s = initialState();
    const id = s.deals[0].id;
    const moved = moveDeal(s, id, "Ganado");
    expect(moved.deals.find((d) => d.id === id)?.stage).toBe("Ganado");
    expect(moved.activities[0].action).toContain("Ganado");
    expect(moveDeal(moved, id, "Ganado")).toBe(moved);
    expect(moveDeal(s, 9999, "Ganado")).toBe(s);
  });

  it("completar tareas cambia el contador de pendientes", () => {
    const s = initialState();
    const before = pendingTasks(s);
    const pend = s.tasks.find((t) => !t.done)!;
    expect(pendingTasks(toggleTask(s, pend.id))).toBe(before - 1);
    expect(pendingTasks(toggleTask(toggleTask(s, pend.id), pend.id))).toBe(before);
  });

  it("limita el historial de actividad", () => {
    let s = initialState();
    for (let i = 0; i < 20; i++) { const r = create(s, { kind: "task", title: "T" + i, who: "", due: "", priority: "Baja" }); if (r.ok) s = r.state; }
    expect(s.activities.length).toBeLessThanOrEqual(8);
  });

  it("filtra contactos por texto y estado", () => {
    const s = initialState();
    expect(filterContacts(s.contacts, "", "Todos")).toHaveLength(s.contacts.length);
    expect(filterContacts(s.contacts, "andina", "Todos").length).toBeGreaterThan(0);
    expect(filterContacts(s.contacts, "", "Inactivo").every((c) => c.status === "Inactivo")).toBe(true);
    expect(filterContacts(s.contacts, "zzzz", "Todos")).toEqual([]);
  });
});

describe("exportación CSV (NÚCLEO)", () => {
  it("escapa comillas, comas y saltos", () => {
    expect(csvCell('Hola, "mundo"')).toBe('"Hola, ""mundo"""');
    expect(csvCell("a\nb")).toBe('"a\nb"');
    expect(csvCell(42)).toBe("42");
  });
  it("neutraliza fórmulas (CSV injection)", () => {
    for (const evil of ["=HYPERLINK(\"x\")", "+1+1", "-2", "@SUM(A1)"]) expect(csvCell(evil).replace(/"/g, "")).toMatch(/^'/);
    expect(csvCell("normal")).toBe("normal");
  });
  it("exporta encabezados y una fila por contacto con CRLF", () => {
    const s = initialState();
    const csv = contactsToCsv(s.contacts.slice(0, 2));
    const lines = csv.split("\r\n");
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe("Nombre,Empresa,Correo,Teléfono,Estado,Valor (COP),Último contacto");
    expect(toCsv([])).toBe("");
  });
});
