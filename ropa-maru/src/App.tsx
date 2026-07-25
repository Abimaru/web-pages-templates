import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Heart,
  Plus,
  Quote,
  Star,
  AtSign,
  Send,
  Check,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Reveal from "./components/Reveal";
import { images } from "./data/images";

const perks = ["ENVÍO GRATIS DESDE $150.000", "CAMBIOS EN 30 DÍAS", "PAGO SEGURO", "3 CUOTAS SIN INTERÉS", "NUEVA COLECCIÓN CADA MES"];

const categorias = [
  { id: "mujer", name: "Mujer", tag: "Elegancia diaria", img: images.categoria.mujer },
  { id: "hombre", name: "Hombre", tag: "Estilo sin esfuerzo", img: images.categoria.hombre },
  { id: "ninos", name: "Niños", tag: "Cómodos y felices", img: images.categoria.ninos },
  { id: "deportivo", name: "Deportivo", tag: "Muévete con actitud", img: images.categoria.deportivo },
];

type Product = { name: string; cat: string; price: number; oldPrice?: number; img: string; tag?: string };

const productos: Product[] = [
  { name: "Blazer estructurado", cat: "Mujer", price: 189900, img: images.productos[0], tag: "NUEVO" },
  { name: "Camisa lino premium", cat: "Hombre", price: 129900, oldPrice: 159900, img: images.productos[1], tag: "-19%" },
  { name: "Vestido midi satén", cat: "Mujer", price: 219900, img: images.productos[2] },
  { name: "Chaqueta denim", cat: "Unisex", price: 169900, img: images.productos[3], tag: "TOP" },
  { name: "Conjunto casual niña", cat: "Niños", price: 89900, img: images.productos[4] },
  { name: "Abrigo largo lana", cat: "Mujer", price: 289900, oldPrice: 349900, img: images.productos[5], tag: "-17%" },
  { name: "Set deportivo tech", cat: "Deportivo", price: 149900, img: images.productos[6], tag: "NUEVO" },
  { name: "Suéter tejido", cat: "Hombre", price: 119900, img: images.productos[7] },
];

const testimonios = [
  { name: "Daniela V.", text: "La calidad me sorprendió: telas hermosas y el envío llegó en 2 días. Ya soy clienta fiel.", stars: 5 },
  { name: "Carlos M.", text: "Encontré todo para mi look de oficina en un solo lugar. Asesoría de tallas impecable.", stars: 5 },
  { name: "Familia Ríos", text: "Vestimos a los tres niños para el colegio. Cómodo, bonito y a buen precio.", stars: 5 },
];

const format = (n: number) => "$" + n.toLocaleString("es-CO");

export default function App() {
  const [bag, setBag] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const addToBag = (name: string) => {
    setBag((b) => b + 1);
    setToast(`${name} añadido a la bolsa`);
    window.clearTimeout((addToBag as unknown as { t?: number }).t);
    (addToBag as unknown as { t?: number }).t = window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <main id="top" className="bg-porcelain text-ink">
      <Navbar bag={bag} />

      {/* Toast */}
      <div
        className={`fixed left-1/2 top-20 z-[70] -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        {toast && (
          <div className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-porcelain shadow-xl">
            <Check size={16} className="text-rose" /> {toast}
          </div>
        )}
      </div>

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen overflow-hidden">
        <img src={images.hero} alt="Modelo con las últimas tendencias" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/25 to-transparent" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">
          <Reveal className="max-w-xl pt-20 text-porcelain">
            <span className="kicker text-blush">Nueva temporada · 2026</span>
            <h1 className="mt-5 font-display text-6xl font-medium leading-[0.98] sm:text-7xl lg:text-8xl">
              Viste tu <em className="italic shine">mejor</em> versión
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-porcelain/85">
              Moda para mujer, hombre y niños. Del deporte a la oficina, del diario a la
              ocasión especial. Tendencias que te hacen brillar, para toda la familia.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#coleccion" className="btn-dark !bg-porcelain !text-ink hover:!bg-cream">
                Ver colección <ArrowRight size={18} />
              </a>
              <a href="#mujer" className="btn-line !border-porcelain/60 !text-porcelain hover:!bg-porcelain hover:!text-ink">
                Explorar categorías
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== PERKS MARQUEE ===================== */}
      <div className="overflow-hidden border-y border-ink/10 bg-ink py-3.5 text-porcelain">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...perks, ...perks, ...perks].map((p, i) => (
            <span key={i} className="flex items-center gap-10 text-xs font-medium uppercase tracking-[0.24em] text-porcelain/80">
              {p} <Sparkles size={13} className="text-gold" />
            </span>
          ))}
        </div>
      </div>

      {/* ===================== CATEGORÍAS ===================== */}
      <section id="mujer" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-rose">Compra por categoría</span>
          <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Para cada quien, su estilo</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <a id={c.id} href="#coleccion" className="img-zoom group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-porcelain">
                  <p className="text-xs uppercase tracking-widest text-porcelain/80">{c.tag}</p>
                  <h3 className="mt-1 font-display text-3xl font-medium">{c.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Comprar <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== PRODUCTOS ===================== */}
      <section id="coleccion" className="mx-auto max-w-7xl px-6 py-16">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="kicker text-rose">Lo más deseado</span>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Selección de la semana</h2>
          </div>
          <a href="#" className="link-underline flex items-center gap-2 text-sm font-medium">Ver todo <ArrowUpRight size={16} /></a>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {productos.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 70}>
              <article className="group">
                <div className="img-zoom relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                  {p.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-porcelain/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-ink">
                      {p.tag}
                    </span>
                  )}
                  <button aria-label="Favorito" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-porcelain/90 text-ink/70 opacity-0 transition hover:text-rose group-hover:opacity-100">
                    <Heart size={16} />
                  </button>
                  <button
                    onClick={() => addToBag(p.name)}
                    className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-medium text-porcelain opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Plus size={15} /> Añadir a la bolsa
                  </button>
                </div>
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-ink/45">{p.cat}</p>
                  <h3 className="mt-0.5 font-display text-lg">{p.name}</h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-medium">{format(p.price)}</span>
                    {p.oldPrice && <span className="text-sm text-ink/40 line-through">{format(p.oldPrice)}</span>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== LOOKBOOK ===================== */}
      <section id="accesorios" className="relative my-16 overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-stretch gap-0 px-6 lg:grid-cols-2">
          <Reveal className="img-zoom overflow-hidden rounded-l-3xl max-lg:rounded-t-3xl max-lg:rounded-b-none">
            <img src={images.lookbook} alt="Lookbook de temporada" className="h-full min-h-[420px] w-full object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center rounded-r-3xl bg-charcoal p-10 text-porcelain max-lg:rounded-b-3xl max-lg:rounded-t-none sm:p-14">
            <span className="kicker text-gold">Lookbook 2026</span>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Menos tendencias pasajeras,<br />más <em className="italic shine">estilo propio</em>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-porcelain/75">
              Curamos prendas versátiles que se combinan entre sí y duran temporadas. Moda
              consciente, hecha para vivir —no para una sola foto.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#coleccion" className="btn-dark !bg-porcelain !text-ink hover:!bg-cream">
                Descubrir el lookbook <ArrowRight size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== PERKS ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Truck, t: "Envío a todo el país", d: "Gratis desde $150.000" },
            { icon: RefreshCcw, t: "Cambios fáciles", d: "30 días para decidir" },
            { icon: ShieldCheck, t: "Pago 100% seguro", d: "Tarjeta, PSE y contraentrega" },
            { icon: Sparkles, t: "Nuevos ingresos", d: "Colección cada mes" },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 70}>
              <div className="group text-center sm:text-left">
                <div className="mx-auto grid h-13 w-13 place-items-center rounded-full bg-blush text-rose-deep transition group-hover:bg-ink group-hover:text-porcelain sm:mx-0">
                  <v.icon size={22} strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 font-display text-xl">{v.t}</h3>
                <p className="mt-1 text-sm text-ink/55">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section className="border-y border-ink/10 bg-cream/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 text-center">
            <span className="kicker text-rose">Clientes felices</span>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Amado por miles</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="flex h-full flex-col rounded-2xl bg-porcelain p-8 shadow-[0_10px_40px_rgba(23,19,15,.05)]">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <Quote size={26} className="mt-4 text-rose/40" />
                  <blockquote className="mt-2 flex-1 font-display text-lg italic leading-relaxed">“{t.text}”</blockquote>
                  <figcaption className="mt-5 border-t border-ink/10 pt-4 text-sm font-medium">{t.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NEWSLETTER ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="overflow-hidden rounded-[2.5rem] bg-ink px-8 py-14 text-center text-porcelain sm:px-16">
          <span className="kicker text-gold">Únete al club MARÚ</span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
            10% en tu primera compra + acceso anticipado a rebajas
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="email" required placeholder="Tu correo electrónico" className="w-full rounded-full border border-porcelain/25 bg-transparent px-5 py-3 text-sm text-porcelain placeholder-porcelain/50 outline-none transition focus:border-gold" />
            <button className="btn-dark !bg-porcelain !text-ink justify-center whitespace-nowrap hover:!bg-cream">
              Suscribirme <Send size={16} />
            </button>
          </form>
          <p className="mt-4 text-xs text-porcelain/50">Sin spam. Cancela cuando quieras.</p>
        </Reveal>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-ink/10 bg-porcelain">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="font-display text-3xl font-semibold tracking-[0.2em]">MAR<span className="text-rose">Ú</span></a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/55">
                Moda para toda la familia. Prendas que combinan estilo, calidad y precio
                justo. Hecho con cariño para ti.
              </p>
              <div className="mt-5 flex gap-3">
                {[AtSign, Heart, Send].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/70 transition hover:border-ink hover:text-ink" aria-label="Red social">
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { h: "Comprar", items: ["Mujer", "Hombre", "Niños", "Deportivo", "Accesorios"] },
              { h: "Ayuda", items: ["Guía de tallas", "Envíos", "Cambios y devoluciones", "Contacto"] },
              { h: "MARÚ", items: ["Nosotros", "Sostenibilidad", "Tiendas", "Trabaja con nosotros"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="kicker text-ink/70">{col.h}</h4>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it}><a href="#" className="text-sm text-ink/60 transition hover:text-ink">{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row">
            <p>© {new Date().getFullYear()} MARÚ — Prototipo por Abimaru. Solo demostración.</p>
            <p>Diseñado con estilo en Cali, Colombia.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
