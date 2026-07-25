import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Check, ChevronRight, ShieldCheck, Truck, Download } from "lucide-react";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import Reveal from "@/app/Reveal";
import GameCard from "@/app/GameCard";
import BuyBox from "./BuyBox";
import { games, getGame, relatedGames, formatCOP } from "@/app/lib/games";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Juego no encontrado | PIXELVAULT" };
  return {
    title: `${game.title} | PIXELVAULT`,
    description: game.description,
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const related = relatedGames(game.slug);
  const discount = game.oldPrice
    ? Math.round((1 - game.price / game.oldPrice) * 100)
    : 0;

  return (
    <main className="relative min-h-screen bg-void">
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pt-28 pb-24">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-sm text-white/50">
          <Link href="/" className="transition hover:text-neon-cyan">Inicio</Link>
          <ChevronRight size={14} />
          <Link href="/catalogo" className="transition hover:text-neon-cyan">Catálogo</Link>
          <ChevronRight size={14} />
          <span className="text-white/80">{game.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Galería */}
          <div>
            <div
              className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-neon-purple/25"
              style={{ background: game.gradient }}
            >
              <span className="text-[8rem] drop-shadow-[0_8px_28px_rgba(0,0,0,0.5)]">{game.emoji}</span>
              {game.tag && (
                <span className="pixel-label absolute left-4 top-4 rounded bg-void/80 px-3 py-1.5 text-neon-lime">
                  {game.tag}
                </span>
              )}
            </div>
            {/* "Capturas" (paneles decorativos, sin material con copyright) */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex aspect-video items-center justify-center rounded-lg border border-neon-purple/20 text-2xl opacity-80 transition hover:opacity-100"
                  style={{ background: game.gradient, filter: `hue-rotate(${i * 25}deg)` }}
                >
                  {game.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm uppercase tracking-wider text-neon-purple">{game.genre}</p>
            <h1 className="mt-1 font-display text-4xl font-black text-white sm:text-5xl">{game.title}</h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 text-neon-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.round(game.rating) ? "currentColor" : "none"} strokeWidth={1.5} />
                ))}
              </div>
              <span className="text-sm text-white/50">{game.rating.toFixed(1)} / 5</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {game.platforms.map((p) => (
                <span key={p} className="rounded-lg border border-neon-purple/30 bg-panel/50 px-3 py-1.5 text-xs font-medium text-white/80">
                  {p}
                </span>
              ))}
            </div>

            <p className="mt-6 leading-relaxed text-white/70">{game.description}</p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {game.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-white/75">
                  <Check size={16} className="shrink-0 text-neon-lime" /> {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-end gap-3">
              <span className="font-display text-4xl font-extrabold text-neon-cyan">{formatCOP(game.price)}</span>
              {game.oldPrice && (
                <>
                  <span className="mb-1 text-lg text-white/40 line-through">{formatCOP(game.oldPrice)}</span>
                  <span className="mb-1.5 rounded bg-neon-magenta/20 px-2 py-0.5 text-xs font-bold text-neon-magenta">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <div className="mt-6">
              <BuyBox game={game} />
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-xs text-white/55">
              <span className="flex items-center gap-1.5"><Download size={15} className="text-neon-cyan" /> Entrega digital inmediata</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-neon-lime" /> Compra protegida</span>
              <span className="flex items-center gap-1.5"><Truck size={15} className="text-neon-magenta" /> Edición física disponible</span>
            </div>
          </div>
        </div>

        {/* Relacionados */}
        <section className="mt-24">
          <h2 className="mb-8 font-display text-2xl font-bold text-white">
            También te puede <span className="text-gradient">gustar</span>
          </h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((g, i) => (
              <Reveal key={g.slug} delay={i * 60}>
                <GameCard game={g} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
