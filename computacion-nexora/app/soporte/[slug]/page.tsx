import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import { services, getService } from "@/app/lib/support";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Servicio no encontrado | NEXORA" };
  return { title: `${service.title} | NEXORA`, description: service.desc };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="relative min-h-screen bg-space">
      <Navbar />

      <section className="relative overflow-hidden bg-glow pt-28 pb-8">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-4xl px-5">
          <nav className="mb-8 flex items-center gap-1.5 text-sm text-white/50">
            <Link href="/" className="transition hover:text-electric">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/#soporte" className="transition hover:text-electric">Soporte</Link>
            <ChevronRight size={14} />
            <span className="text-white/80">{service.title}</span>
          </nav>

          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-electric/40 bg-electric/10">
            <Icon size={30} className="text-electric" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">{service.longDesc}</p>

          <div className="mt-6 flex flex-wrap gap-4">
            <span className="mono flex items-center gap-2 rounded-lg border border-electric/25 bg-panel/50 px-4 py-2 text-sm text-white/80">
              <Tag size={15} className="text-teal" /> Desde {service.from}
            </span>
            <span className="mono flex items-center gap-2 rounded-lg border border-electric/25 bg-panel/50 px-4 py-2 text-sm text-white/80">
              <Clock size={15} className="text-teal" /> {service.turnaround}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="font-display text-2xl font-semibold text-white">¿Qué incluye?</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {service.includes.map((it) => (
            <li key={it} className="flex items-center gap-3 rounded-xl border border-electric/15 bg-panel/40 p-4 text-white/80">
              <Check size={18} className="shrink-0 text-teal" /> {it}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-electric/25 bg-gradient-to-br from-panel/80 to-space/80 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-white">¿Lo necesitas?</h3>
            <p className="mt-1 text-white/60">Diagnóstico sin costo. Te respondemos hoy mismo.</p>
          </div>
          <Link href="/#contacto" className="btn-primary whitespace-nowrap">
            Agendar ahora <ArrowRight size={16} />
          </Link>
        </div>

        {/* Otros servicios */}
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold text-white">Otros servicios</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map((s) => {
              const OIcon = s.icon;
              return (
                <Link key={s.slug} href={`/soporte/${s.slug}`} className="card-tech group p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-indigo/40 bg-indigo/10">
                    <OIcon size={22} className="text-electric" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-white/55 line-clamp-2">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-electric opacity-0 transition group-hover:opacity-100">
                    Ver más <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
