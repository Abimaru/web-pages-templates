"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Game } from "@/app/lib/games";

export type CartItem = { game: Game; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (game: Game) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar de localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pv-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    if (hydrated) localStorage.setItem("pv-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const add = (game: Game) => {
    setItems((prev) => {
      const found = prev.find((i) => i.game.slug === game.slug);
      if (found) return prev.map((i) => (i.game.slug === game.slug ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { game, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (slug: string) => setItems((prev) => prev.filter((i) => i.game.slug !== slug));

  const setQty = (slug: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.game.slug !== slug)
        : prev.map((i) => (i.game.slug === slug ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.game.price, 0);

  return (
    <Ctx.Provider value={{ items, count, total, open, setOpen, add, remove, setQty, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return c;
}
