import { describe, it, expect } from "vitest";
import {
  addLine, setQty, countItems, subtotal, deliveryFor, remainingForFreeDelivery, needsPrescription, buildOrderMessage,
  FREE_DELIVERY_FROM, DELIVERY_FEE, MAX_QTY, whatsappUrl,
} from "./cart";
import { products, getProduct, filterProducts } from "../data/products";

describe("carrito VITALIS", () => {
  it("suma cantidades del mismo producto y limita al máximo", () => {
    let c = addLine([], "ibuprofeno");
    c = addLine(c, "ibuprofeno");
    expect(c).toEqual([{ productId: "ibuprofeno", qty: 2 }]);
    expect(addLine([], "ibuprofeno", 99)[0].qty).toBe(MAX_QTY);
    expect(addLine([], "ibuprofeno", NaN)[0].qty).toBe(1);
  });

  it("setQty cambia, limita y elimina con 0 o no finitos", () => {
    const c = addLine([], "ibuprofeno");
    expect(setQty(c, "ibuprofeno", 5)[0].qty).toBe(5);
    expect(setQty(c, "ibuprofeno", 500)[0].qty).toBe(MAX_QTY);
    expect(setQty(c, "ibuprofeno", 0)).toEqual([]);
    expect(setQty(c, "ibuprofeno", NaN)).toEqual([]);
  });

  it("subtotal y conteo", () => {
    const c = [{ productId: "ibuprofeno", qty: 2 }, { productId: "suero-oral", qty: 1 }];
    expect(subtotal(c)).toBe(12500 * 2 + 6500);
    expect(countItems(c)).toBe(3);
    expect(subtotal([])).toBe(0);
  });

  it("domicilio: gratis desde el umbral, cobrado debajo, cero si vacío", () => {
    expect(deliveryFor(0)).toBe(0);
    expect(deliveryFor(FREE_DELIVERY_FROM - 1)).toBe(DELIVERY_FEE);
    expect(deliveryFor(FREE_DELIVERY_FROM)).toBe(0);
    expect(remainingForFreeDelivery(0)).toBe(0);
    expect(remainingForFreeDelivery(10000)).toBe(FREE_DELIVERY_FROM - 10000);
  });

  it("detecta medicamentos con fórmula", () => {
    expect(needsPrescription([{ productId: "ibuprofeno", qty: 1 }])).toBe(false);
    expect(needsPrescription([{ productId: "ibuprofeno", qty: 1 }, { productId: "amoxicilina", qty: 1 }])).toBe(true);
  });

  it("el mensaje marca los productos con fórmula y pide enviarla; recurrente solo si se pide", () => {
    const cart = [{ productId: "amoxicilina", qty: 1 }];
    const msg = buildOrderMessage(cart, { name: " Rosa ", address: "Cra 1 #2-3", recurring: true });
    expect(msg).toContain("Amoxicilina 500 mg × 21 (CON FÓRMULA)");
    expect(msg).toContain("Fórmula médica: la envío por este chat");
    expect(msg).toContain("entrega recurrente");
    expect(msg).toContain("Nombre: Rosa");
    const plain = buildOrderMessage([{ productId: "ibuprofeno", qty: 1 }], { name: "Ana", address: "x" });
    expect(plain).not.toContain("Fórmula médica");
    expect(plain).not.toContain("recurrente");
    expect(whatsappUrl("a b")).toBe("https://wa.me/?text=a%20b");
  });
});

describe("catálogo VITALIS", () => {
  it("ids únicos y precios positivos", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    for (const p of products) {
      expect(p.price).toBeGreaterThan(0);
      expect(getProduct(p.id)).toBe(p);
    }
  });

  it("filtra por categoría, tipo de venta y texto sin acentos ni mayúsculas", () => {
    expect(filterProducts(products, "todo", "")).toHaveLength(products.length);
    expect(filterProducts(products, "rx", "").every((p) => p.rx)).toBe(true);
    expect(filterProducts(products, "libre", "").every((p) => !p.rx)).toBe(true);
    expect(filterProducts(products, "dermo", "").map((p) => p.id)).toEqual(["protector-solar"]);
    expect(filterProducts(products, "todo", "ACETAMINOFEN").map((p) => p.id)).toContain("acetaminofen");
    expect(filterProducts(products, "todo", "fiebre").map((p) => p.id)).toEqual(expect.arrayContaining(["acetaminofen", "termometro"]));
    expect(filterProducts(products, "dermo", "ibuprofeno")).toEqual([]);
    expect(filterProducts(products, "todo", "zzz")).toEqual([]);
  });
});
