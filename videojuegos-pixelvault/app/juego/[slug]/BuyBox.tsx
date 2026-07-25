"use client";

import { ShoppingCart, Zap, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/CartContext";
import type { Game } from "@/app/lib/games";

export default function BuyBox({ game }: { game: Game }) {
  const { add, setOpen } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(game);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button onClick={onAdd} className="btn-neon flex-1 justify-center">
        {added ? (
          <><Check size={18} /> ¡Agregado!</>
        ) : (
          <><ShoppingCart size={18} /> Añadir al carrito</>
        )}
      </button>
      <button
        onClick={() => { add(game); setOpen(true); }}
        className="btn-ghost flex-1 justify-center"
      >
        <Zap size={16} /> Comprar ya
      </button>
    </div>
  );
}
