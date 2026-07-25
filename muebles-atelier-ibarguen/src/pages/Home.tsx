import {
  ArrowRight,
  ArrowUpRight,
  TreePine,
  Hammer,
  Ruler,
  Truck,
  PencilRuler,
  Sparkles,
  Leaf,
  ShieldCheck,
  Quote,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { Link } from "../lib/router";
import { images } from "../data/images";
import { projects } from "../data/projects";

const materials = ["MADERA CERTIFICADA", "HECHO A MANO", "DISEÑO A LA MEDIDA", "ACABADOS NATURALES", "INSTALACIÓN INCLUIDA"];

const colecciones = [
  { name: "Sala", desc: "Sofás, mesas de centro y bibliotecas", img: images.categoria.sala },
  { name: "Comedor", desc: "Mesas, sillas y aparadores", img: images.categoria.comedor },
  { name: "Dormitorio", desc: "Camas, cómodas y vestidores", img: images.categoria.dormitorio },
  { name: "Oficina", desc: "Escritorios y muebles corporativos", img: images.categoria.oficina },
];

const proceso = [
  { icon: PencilRuler, step: "01", title: "Diseño & asesoría", desc: "Escuchamos tu espacio y tu forma de habitarlo. Bocetos, planos y render antes de cortar la primera tabla." },
  { icon: TreePine, step: "02", title: "Selección de madera", desc: "Elegimos maderas nobles, secas y de origen responsable. Cada veta se escoge por su carácter." },
  { icon: Hammer, step: "03", title: "Ebanistería artesanal", desc: "Manos expertas ensamblan con técnicas tradicionales y precisión milimétrica. Sin atajos." },
  { icon: Sparkles, step: "04", title: "Acabado & entrega", desc: "Aceites y lacas naturales que realzan la madera. Instalamos la pieza en su lugar exacto." },
];

const valores = [
  { icon: Leaf, title: "Madera responsable", desc: "Origen certificado y acabados de bajo impacto." },
  { icon: Ruler, title: "Cien por ciento a la medida", desc: "Cada pieza nace del espacio real donde vivirá." },
  { icon: ShieldCheck, title: "Garantía de por vida", desc: "Respaldamos la estructura de cada mueble que firmamos." },
  { icon: Truck, title: "Entrega e instalación", desc: "Llevamos y montamos con cuidado de relojero." },
];

const testimonios = [
  { name: "María F. Restrepo", role: "Casa en Ciudad Jardín", text: "La mesa de comedor superó lo que imaginé. Se siente eterna, como una herencia que apenas comienza." },
  { name: "Estudio Kavan", role: "Arquitectura & interiorismo", text: "Trabajar con el atelier es un lujo: interpretan el plano y le suman alma. Nuestros clientes lo notan." },
  { name: "Andrés & Laura", role: "Apartamento en el sur", text: "Nos diseñaron la biblioteca de pared a pared. Precisión total y un trato humano que ya no se ve." },
];

const featured = projects.slice(0, 6);

export default function Home() {
  return (
    <main id="top" className="bg-ivory text-ink">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <span className="kicker text-terracotta">Muebles de autor · desde Cali</span>
            <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight text-espresso sm:text-6xl lg:text-7xl">
              Muebles que <em className="italic text-terracotta">cuentan</em> tu historia
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/70">
              Diseñamos y fabricamos piezas únicas en madera noble, pensadas para el
              espacio real donde vivirán. No fabricamos muebles en serie:{" "}
              <span className="text-espresso">custodiamos la madera hasta volverla parte de tu hogar.</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#colecciones" className="btn-solid">
                Ver colecciones <ArrowRight size={18} />
              </a>
              <Link to="/portafolio" className="btn-line">
                Ver portafolio
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-8">
              {[
                { n: "35+", l: "años de oficio" },
                { n: "1.200+", l: "piezas firmadas" },
                { n: "100%", l: "a la medida" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl font-semibold text-espresso">{s.n}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="img-zoom relative overflow-hidden rounded-[2rem] rounded-tr-[6rem]">
              <img src={images.hero} alt="Ambiente de sala con muebles de autor en madera" className="h-[520px] w-full object-cover" loading="eager" />
            </div>
            <div className="img-zoom absolute -bottom-8 -left-8 hidden h-44 w-44 overflow-hidden rounded-3xl border-4 border-ivory shadow-2xl sm:block">
              <img src={images.heroSecondary} alt="Detalle de silla en madera" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -right-4 top-8 hidden rounded-2xl bg-ivory/95 px-5 py-4 shadow-xl backdrop-blur md:block">
              <p className="font-display text-2xl font-semibold text-espresso">Roble · Nogal</p>
              <p className="text-xs uppercase tracking-widest text-ink/50">Maderas nobles</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== MARQUEE MATERIALES ===================== */}
      <div className="overflow-hidden border-y border-espresso/10 bg-linen py-4">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...materials, ...materials, ...materials].map((m, i) => (
            <span key={i} className="flex items-center gap-12 text-xs font-medium uppercase tracking-[0.28em] text-espresso/55">
              {m} <span className="text-terracotta">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===================== VALORES ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="group">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-linen text-walnut transition-colors duration-300 group-hover:bg-espresso group-hover:text-ivory">
                  <v.icon size={24} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-espresso">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== COLECCIONES ===================== */}
      <section id="colecciones" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="kicker text-terracotta">Colecciones</span>
            <h2 className="mt-3 font-display text-4xl font-medium text-espresso sm:text-5xl">Cada ambiente, su pieza justa</h2>
          </div>
          <a href="#contacto" className="link-underline flex items-center gap-2 text-sm font-medium text-espresso">
            Solicitar catálogo <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {colecciones.map((c, i) => (
            <Reveal key={c.name} delay={i * 90}>
              <Link to="/portafolio" className="img-zoom group relative block overflow-hidden rounded-2xl">
                <img src={c.img} alt={`Colección ${c.name}`} className="h-80 w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-ivory">{c.name}</h3>
                  <p className="mt-1 text-sm text-ivory/80">{c.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-ivory/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explorar <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== PROCESO ===================== */}
      <section id="proceso" className="border-y border-espresso/10 bg-linen py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <Reveal className="img-zoom overflow-hidden rounded-[2rem]">
            <img src={images.taller} alt="Taller de ebanistería" className="h-[560px] w-full object-cover" loading="lazy" />
          </Reveal>

          <div>
            <Reveal>
              <span className="kicker text-terracotta">Fabricación</span>
              <h2 className="mt-3 font-display text-4xl font-medium text-espresso sm:text-5xl">
                Del árbol a tu casa,<br />sin perder el alma
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-ink/70">
                Creemos que un mueble bien hecho es un acto de custodia: proteger la
                madera, respetar el oficio y entregar una pieza para toda la vida.
              </p>
            </Reveal>

            <div className="mt-10 space-y-8">
              {proceso.map((p, i) => (
                <Reveal key={p.step} delay={i * 80} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-walnut/30 text-walnut">
                      <p.icon size={20} strokeWidth={1.6} />
                    </div>
                    {i < proceso.length - 1 && <span className="mt-2 h-full w-px bg-walnut/20" />}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg text-terracotta">{p.step}</span>
                      <h3 className="font-display text-2xl font-medium text-espresso">{p.title}</h3>
                    </div>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink/60">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PORTAFOLIO (destacados) ===================== */}
      <section id="galeria" className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="kicker text-terracotta">Portafolio</span>
            <h2 className="mt-3 font-display text-4xl font-medium text-espresso sm:text-5xl">Piezas que ya encontraron su hogar</h2>
          </div>
          <Link to="/portafolio" className="link-underline flex items-center gap-2 text-sm font-medium text-espresso">
            Ver todo el portafolio <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90} className={i % 5 === 0 ? "row-span-2" : ""}>
              <Link to={`/proyecto/${p.slug}`} className="img-zoom group relative block h-full overflow-hidden rounded-2xl">
                <img src={p.cover} alt={p.name} className={`w-full object-cover ${i % 5 === 0 ? "h-full min-h-[400px]" : "h-64"}`} loading="lazy" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-xs uppercase tracking-widest text-ivory/70">{p.category}</p>
                  <p className="font-display text-lg font-semibold text-ivory">{p.name}</p>
                  <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-ivory/90">Ver proyecto <ArrowUpRight size={15} /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== EL TALLER / HISTORIA ===================== */}
      <section id="taller" className="relative overflow-hidden bg-espresso py-24 text-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr]">
          <Reveal className="img-zoom overflow-hidden rounded-[2rem] rounded-bl-[6rem]">
            <img src={images.historia} alt="Ebanista trabajando la madera" className="h-[520px] w-full object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={120}>
            <span className="kicker text-oak">El taller</span>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-ivory sm:text-5xl">
              Un oficio que se hereda,<br />una madera que se respeta
            </h2>
            <div className="mt-6 space-y-4 text-ivory/75 leading-relaxed">
              <p>
                Atelier Ibargüen nació de una convicción sencilla: lo hecho a mano dura, y
                lo que dura se vuelve historia. En un mundo de muebles desechables,
                elegimos el camino difícil —el del cincel, la lija y la paciencia.
              </p>
              <p>
                Cada pieza lleva la firma de quien la construyó y la promesa de acompañarte
                por décadas. Porque no vendemos muebles:{" "}
                <span className="text-ivory">entregamos el escenario donde vivirás tus mejores momentos.</span>
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span className="font-display text-3xl italic text-oak">Andrés Ibargüen</span>
              <span className="text-sm text-ivory/50">— Maestro ebanista & fundador</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="mb-14 text-center">
          <span className="kicker text-terracotta">Testimonios</span>
          <h2 className="mt-3 font-display text-4xl font-medium text-espresso sm:text-5xl">Quienes ya viven con nuestras piezas</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonios.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-espresso/10 bg-linen/50 p-8">
                <Quote size={30} className="text-oak" />
                <blockquote className="mt-4 flex-1 font-display text-xl italic leading-relaxed text-espresso">“{t.text}”</blockquote>
                <figcaption className="mt-6 border-t border-espresso/10 pt-4">
                  <p className="font-medium text-espresso">{t.name}</p>
                  <p className="text-sm text-ink/55">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CTA CONTACTO ===================== */}
      <section id="contacto" className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal className="overflow-hidden rounded-[2.5rem] bg-walnut px-8 py-16 text-ivory sm:px-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="kicker text-oak">Cotiza tu proyecto</span>
              <h2 className="mt-3 font-display text-4xl font-medium leading-tight sm:text-5xl">
                Cuéntanos qué imaginas.<br />Lo hacemos realidad en madera.
              </h2>
              <p className="mt-5 max-w-md text-ivory/75">
                Diseño sin costo para tu proyecto a la medida. Respondemos en menos de 24 horas.
              </p>
              <ul className="mt-8 space-y-3 text-ivory/80">
                <li className="flex items-center gap-3"><Phone size={18} className="text-oak" /> +57 300 000 0000</li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-oak" /> hola@atelieribarguen.co</li>
                <li className="flex items-center gap-3"><MapPin size={18} className="text-oak" /> Cali, Colombia</li>
              </ul>
            </div>

            <form className="grid gap-4 rounded-3xl bg-ivory p-7 text-ink" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Nombre" className="rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-walnut" />
                <input required placeholder="Teléfono" className="rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-walnut" />
              </div>
              <input type="email" required placeholder="Correo" className="rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-walnut" />
              <select className="rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm text-ink/70 outline-none transition focus:border-walnut">
                <option>Tipo de proyecto…</option>
                <option>Sala</option><option>Comedor</option><option>Dormitorio</option>
                <option>Oficina / Corporativo</option><option>Cocina / Carpintería fija</option>
              </select>
              <textarea rows={3} placeholder="Cuéntanos tu idea, medidas o inspiración…" className="rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-walnut" />
              <button type="submit" className="btn-solid justify-center">Enviar solicitud <ArrowRight size={18} /></button>
            </form>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
