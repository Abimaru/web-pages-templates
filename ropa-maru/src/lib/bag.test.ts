import { describe, it, expect } from "vitest";
import {
  addLine, setQty, subtotal, shippingFor, remainingForFreeShipping, countItems, buildOrderMessage,
  lineKey, FREE_SHIPPING_FROM, SHIPPING_COST, MAX_QTY, type BagLine,
} from "./bag";
import { products, getProduct, discountPct } from "../data/products";

const line = (productId: string, size = "M", color = "Negro", qty = 1): BagLine => ({ productId, size, color, qty });

describe("bolsa MARÚ", () => {
  it("suma cantidades de la misma combinación y separa tallas/colores distintos", () => {
    let bag = addLine([], line("vestido-fluido-rojo"));
    bag = addLine(bag, line("vestido-fluido-rojo"));
    expect(bag).toHaveLength(1);
    expect(bag[0].qty).toBe(2);
    bag = addLine(bag, line("vestido-fluido-rojo", "L"));
    expect(bag).toHaveLength(2);
  });

  it("limita la cantidad y normaliza valores inválidos", () => {
    let bag = addLine([], line("vestido-fluido-rojo", "M", "Negro", 99));
    expect(bag[0].qty).toBe(MAX_QTY);
    bag = addLine(bag, line("vestido-fluido-rojo", "M", "Negro", 5));
    expect(bag[0].qty).toBe(MAX_QTY);
    expect(addLine([], line("vestido-fluido-rojo", "M", "Negro", NaN))[0].qty).toBe(1);
    expect(addLine([], line("vestido-fluido-rojo", "M", "Negro", -3))[0].qty).toBe(1);
  });

  it("setQty cambia, limita y elimina con 0 o valores no finitos", () => {
    const bag = addLine([], line("poncho-tejido"));
    const key = lineKey(bag[0]);
    expect(setQty(bag, key, 4)[0].qty).toBe(4);
    expect(setQty(bag, key, 50)[0].qty).toBe(MAX_QTY);
    expect(setQty(bag, key, 0)).toHaveLength(0);
    expect(setQty(bag, key, NaN)).toHaveLength(0);
  });

  it("subtotal, conteo y bolsa vacía", () => {
    expect(subtotal([])).toBe(0);
    expect(countItems([])).toBe(0);
    const bag = [line("vestido-fluido-rojo", "M", "Negro", 2), line("poncho-tejido")];
    expect(subtotal(bag)).toBe(219900 * 2 + 119900);
    expect(countItems(bag)).toBe(3);
  });

  it("envío: gratis desde el umbral, cobrado debajo, cero si vacía", () => {
    expect(shippingFor(0)).toBe(0);
    expect(shippingFor(FREE_SHIPPING_FROM - 1)).toBe(SHIPPING_COST);
    expect(shippingFor(FREE_SHIPPING_FROM)).toBe(0);
    expect(remainingForFreeShipping(0)).toBe(0);
    expect(remainingForFreeShipping(100000)).toBe(FREE_SHIPPING_FROM - 100000);
    expect(remainingForFreeShipping(FREE_SHIPPING_FROM + 1)).toBe(0);
  });

  it("el mensaje de WhatsApp incluye prendas, totales y datos del cliente", () => {
    const bag = [line("poncho-tejido", "Única", "Arena", 2)];
    const msg = buildOrderMessage(bag, { name: " Ana ", city: "Cali" });
    expect(msg).toContain("2 × Poncho tejido artesanal (talla Única, Arena)");
    expect(msg).toContain("Subtotal: $239.800");
    expect(msg).toContain("Envío: Gratis");
    expect(msg).toContain("Nombre: Ana");
    expect(msg).toContain("Ciudad: Cali");
    expect(msg).not.toContain("Notas:");
  });
});

describe("catálogo MARÚ", () => {
  it("ids únicos, precios válidos y datos completos", () => {
    const ids = new Set(products.map((p) => p.id));
    expect(ids.size).toBe(products.length);
    for (const p of products) {
      expect(p.price).toBeGreaterThan(0);
      if (p.oldPrice) expect(p.oldPrice).toBeGreaterThan(p.price);
      expect(p.sizes.length).toBeGreaterThan(0);
      expect(p.colors.length).toBeGreaterThan(0);
    }
  });
  it("'completa el look' apunta a prendas existentes y distintas de sí misma", () => {
    for (const p of products) {
      for (const id of p.look) {
        expect(getProduct(id)).toBeDefined();
        expect(id).not.toBe(p.id);
      }
    }
  });
  it("calcula el descuento mostrado", () => {
    expect(discountPct(getProduct("camiseta-pima-premium")!)).toBe(19);
    expect(discountPct(getProduct("vestido-fluido-rojo")!)).toBe(0);
    expect(discountPct(getProduct("poncho-tejido")!)).toBe(17);
  });
});
