import { describe, it, expect } from "vitest";
import { games, formatCOP } from "../app/lib/games";
import { buildOrderMessage, orderTotal, platformOf, whatsappUrl } from "../app/lib/order";

const g = games[0];

describe("pedido por WhatsApp (PIXELVAULT)", () => {
  it("usa la plataforma elegida si es válida y si no la primera del juego", () => {
    expect(platformOf({ game: g, qty: 1, platform: g.platforms[1] })).toBe(g.platforms[1]);
    expect(platformOf({ game: g, qty: 1, platform: "Atari" })).toBe(g.platforms[0]);
    expect(platformOf({ game: g, qty: 1 })).toBe(g.platforms[0]);
  });

  it("suma el total y vacío da 0", () => {
    expect(orderTotal([])).toBe(0);
    expect(orderTotal([{ game: g, qty: 2 }])).toBe(g.price * 2);
  });

  it("el mensaje incluye juego, plataforma, total y entrega", () => {
    const msg = buildOrderMessage([{ game: g, qty: 2, platform: g.platforms[0] }], { name: " Leo ", delivery: "digital", city: "Cali" });
    expect(msg).toContain(`2 × ${g.title} (${g.platforms[0]})`);
    expect(msg).toContain(`Total: ${formatCOP(g.price * 2)}`);
    expect(msg).toContain("Entrega: Código digital");
    expect(msg).toContain("Nombre: Leo");
    expect(msg).not.toContain("Ciudad:"); // la ciudad solo aplica a domicilio
  });

  it("a domicilio incluye ciudad y notas; la URL codifica el texto", () => {
    const msg = buildOrderMessage([{ game: g, qty: 1 }], { name: "Ana", delivery: "domicilio", city: "Bogotá", notes: "Torre 2" });
    expect(msg).toContain("Ciudad: Bogotá");
    expect(msg).toContain("Notas: Torre 2");
    expect(whatsappUrl("a b&c")).toBe("https://wa.me/?text=a%20b%26c");
  });
});

describe("marca personalizada en el pedido", () => {
  it("usa el nombre de la marca (PIXELVAULT por defecto)", () => {
    const lines = [{ game: g, qty: 1 }];
    const c = { name: "Ana", delivery: "digital" as const };
    expect(buildOrderMessage(lines, c)).toContain("Hola PIXELVAULT");
    expect(buildOrderMessage(lines, c, "Luna Games")).toContain("Hola Luna Games");
  });
});
