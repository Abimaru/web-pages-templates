"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import GameCard from "@/app/GameCard";
import Reveal from "@/app/Reveal";
import { games, PLATFORMS } from "@/app/lib/games";

const genres = ["Todos", ...Array.from(new Set(games.map((g) => g.genre))).sort()];
type Sort = "relevancia" | "precio-asc" | "precio-desc" | "rating";

export default function CatalogContent() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<string>("Todas");
  const [genre, setGenre] = useState("Todos");
  const [sort, setSort] = useState<Sort>("relevancia");

  const result = useMemo(() => {
    let list = games.filter((g) => {
      const matchQuery = g.title.toLowerCase().includes(query.trim().toLowerCase());
      const matchPlatform = platform === "Todas" || g.platforms.includes(platform);
      const matchGenre = genre === "Todos" || g.genre === genre;
      return matchQuery && matchPlatform && matchGenre;
    });
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, platform, genre, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24">
      {/* Barra de filtros */}
      <div className="sticky top-[68px] z-30 -mx-5 mb-8 border-y border-neon-purple/20 bg-abyss/90 px-5 py-4 backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar juego…"
              className="w-full rounded-lg border border-neon-purple/30 bg-void/70 py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-neon-cyan"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Plataformas */}
            {["Todas", ...PLATFORMS].map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  platform === p
                    ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan"
                    : "border-neon-purple/25 text-white/60 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            {/* Género */}
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="rounded-lg border border-neon-purple/25 bg-void/70 px-3 py-1.5 text-xs text-white/80 outline-none focus:border-neon-cyan"
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g === "Todos" ? "Todos los géneros" : g}</option>
              ))}
            </select>

            {/* Orden */}
            <div className="flex items-center gap-1.5 rounded-lg border border-neon-purple/25 bg-void/70 px-2.5 py-1.5">
              <SlidersHorizontal size={13} className="text-white/40" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent text-xs text-white/80 outline-none"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor</option>
                <option value="precio-desc">Precio: mayor</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm text-white/50">
        {result.length} {result.length === 1 ? "juego" : "juegos"} encontrados
      </p>

      {result.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">👾</span>
          <p className="text-white/60">Ningún juego coincide con tu búsqueda.</p>
          <button
            onClick={() => { setQuery(""); setPlatform("Todas"); setGenre("Todos"); }}
            className="btn-ghost mt-2"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {result.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 8) * 40}>
              <GameCard game={g} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
