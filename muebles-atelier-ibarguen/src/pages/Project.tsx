import { ArrowRight, ArrowUpRight, ChevronRight, MapPin, Calendar, TreePine } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { Link, homeHref, navigate } from "../lib/router";
import { getProject, relatedProjects } from "../data/projects";

export default function Project({ slug }: { slug: string }) {
  const p = getProject(slug);

  if (!p) {
    return (
      <main className="bg-ivory text-ink">
        <Navbar />
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <span className="text-6xl">🪵</span>
          <h1 className="mt-4 font-display text-3xl font-medium text-espresso">Proyecto no encontrado</h1>
          <p className="mt-3 text-ink/60">La pieza que buscas no está disponible.</p>
          <button onClick={() => navigate("/portafolio")} className="btn-solid mt-6">Ver portafolio</button>
        </section>
        <Footer />
      </main>
    );
  }

  const related = relatedProjects(p.slug);

  return (
    <main className="bg-ivory text-ink">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-36">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-ink/50">
          <Link to="/" className="transition hover:text-espresso">Inicio</Link>
          <ChevronRight size={14} />
          <Link to="/portafolio" className="transition hover:text-espresso">Portafolio</Link>
          <ChevronRight size={14} />
          <span className="text-espresso/80">{p.name}</span>
        </nav>

        {/* Encabezado */}
        <Reveal className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <span className="kicker text-terracotta">{p.category}</span>
            <h1 className="mt-3 font-display text-5xl font-medium leading-[1.02] text-espresso sm:text-6xl">{p.name}</h1>
            <p className="mt-5 max-w-xl font-display text-xl italic text-ink/70">{p.summary}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <span className="flex items-center gap-2 text-ink/70"><TreePine size={16} className="text-walnut" /> {p.wood}</span>
            <span className="flex items-center gap-2 text-ink/70"><MapPin size={16} className="text-walnut" /> {p.place}</span>
            <span className="flex items-center gap-2 text-ink/70"><Calendar size={16} className="text-walnut" /> {p.year}</span>
          </div>
        </Reveal>

        {/* Imagen principal */}
        <Reveal delay={100} className="mt-10 img-zoom overflow-hidden rounded-[2rem]">
          <img src={p.cover} alt={p.name} className="h-[300px] w-full object-cover sm:h-[520px]" loading="eager" />
        </Reveal>

        {/* Cuerpo: descripción + ficha */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-espresso">El proyecto</h2>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink/75">
              {p.description.map((par, i) => <p key={i}>{par}</p>)}
            </div>
            <div className="mt-8">
              <h3 className="kicker text-terracotta">Materiales</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {p.materials.map((m) => (
                  <li key={m} className="rounded-full border border-espresso/15 bg-linen px-4 py-2 text-sm text-espresso/80">{m}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-espresso/10 bg-linen/60 p-7">
              <h3 className="font-display text-xl font-medium text-espresso">Ficha técnica</h3>
              <dl className="mt-5 divide-y divide-espresso/10">
                {p.details.map((d) => (
                  <div key={d.label} className="flex items-center justify-between py-3">
                    <dt className="text-sm text-ink/55">{d.label}</dt>
                    <dd className="font-medium text-espresso">{d.value}</dd>
                  </div>
                ))}
              </dl>
              <a href={homeHref("#contacto")} className="btn-solid mt-6 w-full justify-center">Quiero una pieza así <ArrowRight size={16} /></a>
            </div>
          </Reveal>
        </div>

        {/* Galería */}
        <Reveal className="mt-16">
          <h2 className="font-display text-3xl font-medium text-espresso">Galería</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {p.gallery.map((src, i) => (
              <div key={i} className="img-zoom overflow-hidden rounded-2xl">
                <img src={src} alt={`${p.name} — detalle ${i + 1}`} className="h-64 w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Relacionados */}
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-medium text-espresso">Otros proyectos</h2>
            <Link to="/portafolio" className="link-underline flex items-center gap-2 text-sm font-medium text-espresso">Ver todo <ArrowUpRight size={16} /></Link>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to={`/proyecto/${r.slug}`} className="group block">
                <div className="img-zoom overflow-hidden rounded-2xl">
                  <img src={r.cover} alt={r.name} className="h-56 w-full object-cover" loading="lazy" />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-espresso group-hover:text-terracotta">{r.name}</h3>
                <p className="text-sm text-ink/55">{r.category} · {r.wood}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
