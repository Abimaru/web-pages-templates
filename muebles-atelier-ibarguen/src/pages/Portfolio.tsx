import { useMemo, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { Link, homeHref } from "../lib/router";
import { projects } from "../data/projects";

const cats = ["Todos", "Sala", "Comedor", "Dormitorio", "Oficina"] as const;

export default function Portfolio() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const list = useMemo(() => (cat === "Todos" ? projects : projects.filter((p) => p.category === cat)), [cat]);

  return (
    <main className="bg-ivory text-ink">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pt-36 pb-8 lg:pt-44">
        <Reveal>
          <span className="kicker text-terracotta">Portafolio</span>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-medium leading-[1.03] text-espresso sm:text-6xl">
            Cada proyecto, una historia en madera
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
            Una selección de piezas a la medida que ya viven en hogares y espacios reales.
            Filtra por ambiente y descubre el detalle de cada una.
          </p>
        </Reveal>

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                cat === c ? "border-espresso bg-espresso text-ivory" : "border-espresso/20 text-espresso/70 hover:border-espresso/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <Link to={`/proyecto/${p.slug}`} className="group block">
                <div className="img-zoom relative overflow-hidden rounded-2xl">
                  <img src={p.cover} alt={p.name} className="h-72 w-full object-cover" loading="lazy" />
                  <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-xs font-medium text-espresso">{p.category}</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-espresso">{p.name}</h3>
                    <p className="mt-1 text-sm text-ink/55">{p.wood} · {p.place}</p>
                  </div>
                  <ArrowUpRight size={20} className="mt-1 shrink-0 text-espresso/40 transition group-hover:text-terracotta" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-20 text-center text-ink/50">No hay proyectos en esta categoría todavía.</p>
        )}

        {/* CTA */}
        <Reveal className="mt-20 rounded-[2rem] bg-linen px-8 py-14 text-center">
          <h2 className="font-display text-3xl font-medium text-espresso sm:text-4xl">¿Imaginas algo así para tu espacio?</h2>
          <p className="mx-auto mt-3 max-w-lg text-ink/65">Cuéntanos tu idea y la convertimos en una pieza única, hecha a tu medida.</p>
          <a href={homeHref("#contacto")} className="btn-solid mt-7 inline-flex">Cotizar mi proyecto <ArrowRight size={18} /></a>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
