import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Search,
  X,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Heart,
  Quote,
  Star,
  AtSign,
  Send,
  Check,
} from "lucide-react";
import Navbar from "./components/Navbar";
import DemoBanner from "./components/DemoBanner";
import Reveal from "./components/Reveal";
import BagDrawer from "./components/BagDrawer";
import ProductModal from "./components/ProductModal";
import BrandStudio from "./components/BrandStudio";
import BagBar from "./components/BagBar";
import Wordmark from "./components/Wordmark";
import { accentTheme, isDefaultBrand, readBrandFromSearch, resolveBrand, type Brand } from "./lib/brand";
import { images } from "./data/images";
import { categories, products, getProduct, discountPct, type CategoryId } from "./data/products";
import { addLine, setQty, countItems, subtotal, formatCOP, type BagLine } from "./lib/bag";

const perks = ["ENVÍO GRATIS DESDE $150.000", "CAMBIOS EN 30 DÍAS", "PAGO EN LÍNEA (EJEMPLO)", "CUOTAS (EJEMPLO)", "NUEVA COLECCIÓN CADA MES"];

type Filter = "todo" | "favoritos" | CategoryId;
type Sort = "relevancia" | "menor" | "mayor";

const testimonios = [
  { name: "Daniela V.", text: "La calidad me sorprendió: telas hermosas y un empaque muy cuidado. Ya soy clienta fiel.", stars: 5 },
  { name: "Carlos M.", text: "Encontré todo para mi look de oficina en un solo lugar. Asesoría de tallas impecable.", stars: 5 },
  { name: "Familia Ríos", text: "Vestimos a los tres niños para el colegio. Cómodo, bonito y a buen precio.", stars: 5 },
];


const BRAND_KEY = "maru-brand";

/** Marca inicial: enlace compartido (?marca=&color=) > última marca guardada > MARÚ. */
function loadBrand(): Brand {
  const fromUrl = readBrandFromSearch(window.location.search);
  if (fromUrl) return resolveBrand(fromUrl);
  try {
    const raw = localStorage.getItem(BRAND_KEY);
    if (raw) return resolveBrand(JSON.parse(raw));
  } catch { /* sin almacenamiento: usa la marca por defecto */ }
  return resolveBrand(null);
}

export default function App() {
  const [draft, setDraft] = useState<Brand>(loadBrand);
  const brand = useMemo(() => resolveBrand(draft), [draft]);
  useEffect(() => {
    const t = accentTheme(brand.color);
    const root = document.documentElement.style;
    root.setProperty("--color-rose", t.rose);
    root.setProperty("--color-rose-deep", t.roseDeep);
    root.setProperty("--color-blush", t.blush);
    document.title = `${brand.name} — Moda para toda la familia`;
    try {
      if (isDefaultBrand(brand)) localStorage.removeItem(BRAND_KEY);
      else localStorage.setItem(BRAND_KEY, JSON.stringify({ name: brand.name, color: brand.color }));
    } catch { /* noop */ }
  }, [brand]);

  const [bag, setBag] = useState<BagLine[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [favs, setFavs] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>("todo");
  const [sort, setSort] = useState<Sort>("relevancia");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const searchRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  };
  const toggleFav = (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const goCollection = () => document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
  const pickCategory = (c: Filter) => { setFilter(c); setQuery(""); goCollection(); };
  const closeBag = useCallback(() => setBagOpen(false), []);
  const closeProduct = useCallback(() => setOpenId(null), []);
  const setBagQty = useCallback((key: string, qty: number) => setBag((b) => setQty(b, key, qty)), []);

  const openProduct = openId ? getProduct(openId) : undefined;
  const bagBarVisible = bag.length > 0 && !bagOpen && !openProduct;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (filter === "todo" || (filter === "favoritos" ? favs.includes(p.id) : p.category === filter)) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    );
    if (sort === "menor") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "mayor") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [filter, query, sort, favs]);

  const chips: { id: Filter; label: string }[] = [
    { id: "todo", label: "Todo" },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.name })),
    { id: "favoritos", label: `Favoritos${favs.length ? ` (${favs.length})` : ""}` },
  ];

  return (
    <main id="top" className="bg-porcelain text-ink">
      <Navbar
        brand={brand}
        bag={countItems(bag)}
        favs={favs.length}
        onBag={() => setBagOpen(true)}
        onFavs={() => pickCategory("favoritos")}
        onSearch={() => { goCollection(); window.setTimeout(() => searchRef.current?.focus(), 450); }}
        onCategory={(c) => pickCategory(c)}
      />
      <DemoBanner
        disclaimer="Productos, precios, envíos, cuotas y testimonios son ejemplos ilustrativos."
        waMessage="Hola, vi la demo de MARÚ (tienda de moda) de Estudio Abimaru. Quisiera una tienda online así para mi negocio."
      />

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
              <a href="#coleccion" className="btn-line !border-porcelain/60 !text-porcelain hover:!bg-porcelain hover:!text-ink">
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
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-rose">Compra por categoría</span>
          <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Para cada quien, su estilo</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <button onClick={() => pickCategory(c.id)} className="img-zoom group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl text-left">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-porcelain">
                  <p className="text-xs uppercase tracking-widest text-porcelain/80">{c.tag}</p>
                  <h3 className="mt-1 font-display text-3xl font-medium">{c.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Comprar <ArrowRight size={14} />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== PRODUCTOS ===================== */}
      <section id="coleccion" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16">
        <Reveal className="mb-8">
          <span className="kicker text-rose">Lo más deseado</span>
          <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Selección de la semana</h2>
        </Reveal>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:px-0" role="group" aria-label="Filtrar por categoría">
            {chips.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${filter === c.id ? "border-ink bg-ink text-porcelain" : "border-ink/20 hover:border-ink"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <label className="relative flex-1 lg:w-64">
              <span className="sr-only">Buscar prendas</span>
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar" className="w-full rounded-full border border-ink/20 bg-transparent py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-ink" />
              {query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/45 hover:text-ink"><X size={15} /></button>}
            </label>
            <label>
              <span className="sr-only">Ordenar por</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-full border border-ink/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-ink">
                <option value="relevancia">Destacados</option>
                <option value="menor">Precio: menor a mayor</option>
                <option value="mayor">Precio: mayor a menor</option>
              </select>
            </label>
          </div>
        </div>

        <p className="mb-5 text-sm text-ink/50" aria-live="polite">{visible.length} {visible.length === 1 ? "prenda" : "prendas"}</p>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/20 py-16 text-center">
            <p className="font-display text-2xl">{filter === "favoritos" && !query ? "Aún no tienes favoritos" : "No encontramos prendas con ese filtro"}</p>
            <p className="mt-2 text-sm text-ink/55">{filter === "favoritos" && !query ? "Toca el corazón en cualquier prenda para guardarla." : "Prueba con otra categoría o borra la búsqueda."}</p>
            <button onClick={() => { setFilter("todo"); setQuery(""); }} className="btn-line mt-6">Ver todo</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {visible.map((p) => {
              const isFav = favs.includes(p.id);
              const pct = discountPct(p);
              return (
                <article key={p.id} className="group">
                  <div className="img-zoom relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream">
                    <button onClick={() => setOpenId(p.id)} aria-label={`Ver ${p.name}`} className="absolute inset-0 h-full w-full">
                      <img src={p.img} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                    </button>
                    {p.tag && (
                      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-porcelain/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-ink">
                        {p.tag}
                      </span>
                    )}
                    <button
                      onClick={() => { toggleFav(p.id); notify(isFav ? "Quitado de favoritos" : `${p.name} guardado en favoritos`); }}
                      aria-label={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
                      aria-pressed={isFav}
                      className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-porcelain/90 transition hover:text-rose ${isFav ? "text-rose" : "text-ink/70 md:opacity-0 md:group-hover:opacity-100"}`}
                    >
                      <Heart size={16} className={isFav ? "fill-rose" : ""} />
                    </button>
                    <button
                      onClick={() => setOpenId(p.id)}
                      className="absolute inset-x-3 bottom-3 hidden translate-y-3 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-medium text-porcelain opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex"
                    >
                      Elegir talla
                    </button>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-wider text-ink/45">{p.category === "ninos" ? "Niños" : p.category}</p>
                    <h3 className="mt-0.5 font-display text-lg"><button onClick={() => setOpenId(p.id)} className="text-left hover:underline">{p.name}</button></h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-medium">{formatCOP(p.price)}</span>
                      {p.oldPrice && <span className="text-sm text-ink/40 line-through">{formatCOP(p.oldPrice)}</span>}
                      {pct > 0 && <span className="text-xs font-semibold text-rose-deep">-{pct}%</span>}
                    </div>
                    <div className="mt-1.5 flex gap-1" aria-hidden="true">
                      {p.colors.map((c) => <span key={c.name} className="h-3 w-3 rounded-full border border-ink/15" style={{ background: c.hex }} />)}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
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
            { icon: ShieldCheck, t: "Medios de pago (ejemplo)", d: "Tarjeta, PSE y contraentrega" },
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
            <span className="kicker text-rose">Casos de uso ilustrativos</span>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Pensado para tus clientes</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink/55">Ejemplos ilustrativos de experiencia — no son reseñas ni personas reales.</p>
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
          <span className="kicker text-gold">Únete al club {brand.name}</span>
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
              <a href="#top" className="inline-block font-display text-3xl font-semibold tracking-[0.2em]"><Wordmark brand={brand} /></a>
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
              { h: brand.name, items: ["Nosotros", "Sostenibilidad", "Tiendas", "Trabaja con nosotros"] },
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
            <p>© {new Date().getFullYear()} {brand.name} — Prototipo por Abimaru. Solo demostración.</p>
            <p>Diseñado con estilo en Cali, Colombia.</p>
          </div>
        </div>
      </footer>

      {bagBarVisible && <BagBar count={countItems(bag)} total={subtotal(bag)} onOpen={() => setBagOpen(true)} />}
      <BrandStudio lift={bagBarVisible} brand={draft} onChange={setDraft} onReset={() => setDraft(resolveBrand(null))} />
      <BagDrawer storeName={brand.name} open={bagOpen} bag={bag} onClose={closeBag} onQty={setBagQty} onShop={goCollection} />
      {openProduct && (
        <ProductModal
          key={openProduct.id}
          product={openProduct}
          fav={favs.includes(openProduct.id)}
          onFav={() => toggleFav(openProduct.id)}
          onClose={closeProduct}
          onOpenOther={setOpenId}
          onAdd={(size, color, qty) => {
            setBag((b) => addLine(b, { productId: openProduct.id, size, color, qty }));
            setOpenId(null);
            setBagOpen(true);
          }}
        />
      )}
    </main>
  );
}
