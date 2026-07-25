"use client";

import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { useCart } from "@/app/CartContext";
import { formatCOP, type Game } from "@/app/lib/games";

export type { Game };

export default function GameCard({ game }: { game: Game }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const { add } = useCart();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -12;
    const ry = (px - 0.5) * 14;
    setStyle({
      transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`,
    });
  };

  const reset = () => setStyle({ transform: "perspective(800px) rotateX(0) rotateY(0)" });

  const onAdd = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(game);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ ...style, transition: "transform 0.15s ease" }}
      className="card-neon group overflow-hidden p-3 will-change-transform"
    >
      <Link href={`/juego/${game.slug}`} className="block">
        {/* Portada generada con gradiente (sin usar arte con copyright) */}
        <div
          className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-lg"
          style={{ background: game.gradient }}
        >
          <span className="text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110">
            {game.emoji}
          </span>
          {game.tag && (
            <span className="pixel-label absolute left-2 top-2 rounded bg-void/80 px-2 py-1 text-neon-lime">
              {game.tag}
            </span>
          )}
          <button
            onClick={onAdd}
            aria-label="Añadir al carrito"
            className="absolute bottom-2 right-2 grid h-9 w-9 translate-y-2 place-items-center rounded-lg bg-neon-cyan text-void opacity-0 shadow-[0_0_16px_rgba(34,227,255,0.6)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="px-1 pt-3">
          <p className="text-xs uppercase tracking-wider text-neon-purple">{game.genre}</p>
          <h3 className="mt-0.5 truncate font-display text-base font-bold text-white">
            {game.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-neon-amber">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.round(game.rating) ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
            <span className="ml-1 text-xs text-white/50">{game.rating.toFixed(1)}</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-lg font-extrabold text-neon-cyan">{formatCOP(game.price)}</span>
            {game.oldPrice && (
              <span className="text-sm text-white/40 line-through">{formatCOP(game.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
