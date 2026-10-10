import { describe, it, expect } from "vitest";
import { toggleSlug, resolvePieces, buildQuoteMessage, whatsappUrl } from "./quote";
import { projects } from "../data/projects";

describe("cotización ATELIER", () => {
  it("toggleSlug agrega, quita y no duplica", () => {
    expect(toggleSlug([], "a")).toEqual(["a"]);
    expect(toggleSlug(["a", "b"], "a")).toEqual(["b"]);
    expect(toggleSlug(toggleSlug([], "a"), "a")).toEqual([]);
  });

  it("resolvePieces ignora slugs inexistentes", () => {
    const real = projects[0].slug;
    expect(resolvePieces([real, "no-existe"]).map((p) => p.slug)).toEqual([real]);
    expect(resolvePieces([])).toEqual([]);
  });

  it("el mensaje lista las piezas y los datos del cliente", () => {
    const p = projects[0];
    const msg = buildQuoteMessage({ name: " Ana ", phone: "300 111", type: "Comedor", notes: "Mesa para 8", pieces: [p] });
    expect(msg).toContain("Piezas que me inspiran:");
    expect(msg).toContain(`• ${p.name}`);
    expect(msg).toContain("Tipo de proyecto: Comedor");
    expect(msg).toContain("Nombre: Ana");
    expect(msg).toContain("Mi idea: Mesa para 8");
    expect(msg).not.toContain("Correo:");
  });

  it("sin piezas ni tipo omite esas secciones; el placeholder del select no cuenta como tipo", () => {
    const msg = buildQuoteMessage({ name: "Leo", phone: "1", type: "Tipo de proyecto…", pieces: [] });
    expect(msg).not.toContain("Piezas");
    expect(msg).not.toContain("Tipo de proyecto");
  });

  it("la URL codifica el texto", () => {
    expect(whatsappUrl("a b&c")).toBe("https://wa.me/?text=a%20b%26c");
  });
});
