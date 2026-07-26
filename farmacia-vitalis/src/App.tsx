import { useState } from "react";
import {
  ArrowRight,
  Search,
  Truck,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Pill,
  Thermometer,
  Droplet,
  Sun,
  HeartPulse,
  Leaf,
  Syringe,
  Stethoscope,
  FileText,
  Package,
  Plus,
  Check,
  Star,
  Phone,
  Mail,
  MapPin,
  Info,
  type LucideIcon,
} from "lucide-react";
import Navbar from "./components/Navbar";
import DemoBanner from "./components/DemoBanner";
import Reveal from "./components/Reveal";
import { images } from "./data/images";

const perks = ["CATÁLOGO POR CATEGORÍAS", "BUSCADOR DE PRODUCTOS", "FLUJO DE RECETA (DEMO)", "CARRITO SIMULADO", "PROTOTIPO INTERACTIVO"];

const categorias = [
  { name: "Medicamentos", tag: "Con y sin fórmula", img: images.categoria.medicamentos },
  { name: "Vitaminas y suplementos", tag: "Energía y defensas", img: images.categoria.vitaminas },
  { name: "Dermocosmética", tag: "Cuida tu piel", img: images.categoria.dermo },
  { name: "Bebé y mamá", tag: "Todo para los peques", img: images.categoria.bebe },
];

type Product = { name: string; cat: string; price: number; rx?: boolean; icon: LucideIcon; color: string; bg: string };
const productos: Product[] = [
  { name: "Acetaminofén 500 mg × 20", cat: "Analgésico", price: 8900, icon: Pill, color: "#0e78d4", bg: "#dcecfa" },
  { name: "Vitamina C 1000 mg × 30", cat: "Suplemento", price: 28900, icon: Leaf, color: "#10a86e", bg: "#d8f2e6" },
  { name: "Amoxicilina 500 mg × 21", cat: "Antibiótico", price: 18900, rx: true, icon: Syringe, color: "#0e78d4", bg: "#dcecfa" },
  { name: "Protector solar SPF 50+", cat: "Dermocosmética", price: 45900, icon: Sun, color: "#f59e0b", bg: "#fdeecf" },
  { name: "Suero oral hidratante", cat: "Hidratación", price: 6500, icon: Droplet, color: "#12b5a5", bg: "#d3f3ef" },
  { name: "Termómetro digital", cat: "Dispositivo", price: 32900, icon: Thermometer, color: "#0e78d4", bg: "#dcecfa" },
  { name: "Multivitamínico × 60", cat: "Suplemento", price: 54900, icon: HeartPulse, color: "#e0567a", bg: "#fbe0e8" },
  { name: "Ibuprofeno 400 mg × 10", cat: "Antiinflamatorio", price: 12500, icon: Pill, color: "#10a86e", bg: "#d8f2e6" },
];

const servicios = [
  { icon: FileText, title: "Receta digital", desc: "Sube tu fórmula médica y te preparamos el pedido validado por un farmacéutico." },
  { icon: Stethoscope, title: "Consulta farmacéutica", desc: "Resuelve dudas sobre dosis, interacciones y cuidados con un profesional, gratis." },
  { icon: HeartPulse, title: "Programa de crónicos", desc: "Recordatorios y entrega recurrente de tu tratamiento para no fallar ni un día." },
  { icon: Truck, title: "Domicilio express", desc: "Recibe en 60 minutos o programa la entrega a la hora que más te convenga." },
];

const pasos = [
  { icon: Search, title: "Busca lo que necesitas", desc: "Explora por categoría, síntoma o nombre. Filtra por precio y presentación." },
  { icon: FileText, title: "Sube tu fórmula (si aplica)", desc: "Para medicamentos de control, adjunta tu receta médica vigente." },
  { icon: Package, title: "Recíbelo en casa", desc: "Un farmacéutico valida tu pedido y te lo llevamos a la puerta." },
];

const testimonios = [
  { name: "Rosa E.", role: "Cuida a su madre", text: "El programa de crónicos me cambió la vida: nunca más se nos acaba el medicamento de mamá.", stars: 5 },
  { name: "Julián T.", role: "Papá primerizo", text: "Pedí a medianoche con el bebé con fiebre y llegó en 40 minutos. Un alivio enorme.", stars: 5 },
  { name: "Marta L.", role: "Cliente frecuente", text: "Me encanta poder preguntarle al farmacéutico antes de comprar. Se nota que saben.", stars: 5 },
];

const format = (n: number) => "$" + n.toLocaleString("es-CO");

export default function App() {
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const add = (name: string) => {
    setCart((c) => c + 1);
    setToast(`${name} añadido al carrito`);
    window.clearTimeout((add as unknown as { t?: number }).t);
    (add as unknown as { t?: number }).t = window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <main id="top" className="bg-white text-ink">
      <Navbar cart={cart} />
      <DemoBanner
        disclaimer="No es una farmacia real: no vende medicamentos, no procesa fórmulas y no ofrece asesoría médica o farmacéutica."
        waMessage="Hola, vi la demo de VITALIS (farmacia digital) de Estudio Abimaru. Quisiera una página así para mi negocio."
      />

      {/* Toast */}
      <div className={`fixed left-1/2 top-24 z-[70] -translate-x-1/2 transition-all duration-300 ${toast ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}>
        {toast && (
          <div className="flex items-center gap-2 rounded-full bg-green px-5 py-2.5 text-sm text-white shadow-xl">
            <Check size={16} /> {toast}
          </div>
        )}
      </div>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-cloud pt-32 lg:pt-40">
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-soft-green blur-3xl opacity-60" />
        <div className="absolute -left-16 bottom-0 h-80 w-80 rounded-full bg-soft-blue blur-3xl opacity-70" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-2">
          <Reveal>
            <span className="kicker inline-flex items-center gap-2 rounded-full bg-soft-green px-3.5 py-1.5 text-green">
              <BadgeCheck size={14} /> Demo de farmacia digital
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Tu salud, <span className="text-medic">a un clic</span> de casa
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate">
              Medicamentos, vitaminas y cuidado personal con entrega a domicilio y el
              respaldo de farmacéuticos de verdad. Rápido, seguro y humano.
            </p>

            {/* Buscador hero */}
            <div className="mt-7 flex max-w-lg items-center gap-2 rounded-2xl border border-mist bg-white p-2 shadow-sm">
              <Search size={19} className="ml-2 text-slate/60" />
              <input placeholder="¿Qué necesitas hoy?" className="flex-1 bg-transparent px-1 py-2 text-sm outline-none" />
              <button className="btn-primary !py-2.5 !px-5">Buscar</button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate">
              <span className="flex items-center gap-2"><Truck size={17} className="text-teal" /> Domicilio 60 min</span>
              <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-teal" /> 100% originales</span>
              <span className="flex items-center gap-2"><Clock size={17} className="text-teal" /> Atención 24/7</span>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="img-zoom overflow-hidden rounded-[2rem] rounded-tl-[5rem] shadow-xl">
              <img src={images.hero} alt="Farmacéutica atendiendo" className="h-[460px] w-full object-cover" />
            </div>
            <div className="animate-float absolute -left-5 top-10 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-lg">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft-green text-green"><HeartPulse size={22} /></span>
              <div>
                <p className="text-sm font-bold">Catálogo</p>
                <p className="text-xs text-slate">demostrativo</p>
              </div>
            </div>
            <div className="absolute -bottom-4 right-4 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-lg" style={{ animation: "float 6s ease-in-out infinite", animationDelay: ".6s" }}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft-blue text-medic"><Stethoscope size={22} /></span>
              <div>
                <p className="text-sm font-bold">Sin backend</p>
                <p className="text-xs text-slate">solo demostración</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== PERKS ===================== */}
      <div className="overflow-hidden border-y border-mist bg-white py-3.5">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...perks, ...perks, ...perks].map((p, i) => (
            <span key={i} className="flex items-center gap-10 text-xs font-bold uppercase tracking-[0.18em] text-slate/70">
              {p} <Plus size={12} className="text-green" />
            </span>
          ))}
        </div>
      </div>

      {/* ===================== CATEGORÍAS ===================== */}
      <section id="categorias" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-medic">Compra por categoría</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Todo para el bienestar de tu familia</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <a href="#ofertas" className="img-zoom group relative block aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs text-white/80">{c.tag}</p>
                  <h3 className="mt-0.5 font-display text-xl font-bold">{c.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">Ver productos <ArrowRight size={14} /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== PRODUCTOS ===================== */}
      <section id="ofertas" className="border-y border-mist bg-cloud py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="kicker text-medic">Más vendidos</span>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Los favoritos de nuestros clientes</h2>
            </div>
            <a href="#" className="link-underline flex items-center gap-2 text-sm font-semibold text-medic">Ver todo <ArrowRight size={16} /></a>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {productos.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 70}>
                <div className="card group flex h-full flex-col p-5">
                  <div className="relative flex aspect-square items-center justify-center rounded-xl" style={{ background: p.bg }}>
                    <p.icon size={52} style={{ color: p.color }} strokeWidth={1.6} />
                    {p.rx ? (
                      <span className="absolute left-2 top-2 rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-medic-dark shadow-sm">Rx · Fórmula</span>
                    ) : (
                      <span className="absolute left-2 top-2 rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-green shadow-sm">Venta libre</span>
                    )}
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate/60">{p.cat}</p>
                  <h3 className="mt-0.5 flex-1 font-display text-sm font-semibold leading-snug">{p.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-ink">{format(p.price)}</span>
                    <button onClick={() => add(p.name)} className="grid h-9 w-9 place-items-center rounded-lg bg-medic text-white transition hover:bg-medic-dark" aria-label="Añadir">
                      <Plus size={17} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICIOS ===================== */}
      <section id="servicios" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-medic">Más que una tienda</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Servicios que cuidan de ti</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="card group h-full p-7">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-soft-blue text-medic transition group-hover:bg-medic group-hover:text-white">
                  <s.icon size={26} strokeWidth={1.7} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CÓMO FUNCIONA ===================== */}
      <section className="border-y border-mist bg-cloud py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="kicker text-medic">Fácil y rápido</span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Tu pedido en 3 pasos</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {pasos.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="relative text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white shadow-md" style={i === 2 ? { animation: "pulse-soft 2.6s ease-in-out infinite" } : undefined}>
                    <p.icon size={30} className="text-medic" />
                  </div>
                  <span className="mt-4 inline-block font-display text-xs font-bold text-green">PASO {i + 1}</span>
                  <h3 className="mt-1 font-display text-xl font-bold">{p.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-slate">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-medic">Casos de uso ilustrativos</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Cómo acompañaría a tus clientes</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate">Ejemplos ilustrativos de experiencia — no son reseñas ni personas reales.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonios.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="card flex h-full flex-col p-8">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.stars }).map((_, s) => <Star key={s} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink/85">“{t.text}”</blockquote>
                <figcaption className="mt-5 border-t border-mist pt-4">
                  <p className="font-display font-bold">{t.name}</p>
                  <p className="text-sm text-slate">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CTA DESCARGA ===================== */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <Reveal className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-medic to-medic-dark px-8 py-14 text-white sm:px-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="kicker text-white/80">Salud a la mano</span>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">Descarga la app VITALIS y ahorra en cada pedido</h2>
              <p className="mt-4 max-w-lg text-white/80">Recordatorios de medicamentos, historial de compras y 15% de descuento en tu primer domicilio.</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
                <input type="email" required placeholder="Tu correo" className="w-full rounded-xl bg-white/15 px-4 py-3 text-sm text-white placeholder-white/60 outline-none ring-1 ring-white/20 focus:ring-white/50" />
                <button className="rounded-xl bg-white px-6 py-3 font-display text-sm font-semibold text-medic-dark transition hover:bg-cloud">Quiero mi descuento</button>
              </form>
            </div>
            <div className="flex justify-center gap-4">
              {[Truck, ShieldCheck, HeartPulse].map((Icon, i) => (
                <div key={i} className="animate-float grid h-20 w-20 place-items-center rounded-2xl bg-white/15" style={{ animationDelay: `${i * 0.4}s` }}>
                  <Icon size={30} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================== DISCLAIMER ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-start gap-3 rounded-2xl border border-mist bg-cloud p-5 text-sm text-slate">
          <Info size={20} className="mt-0.5 shrink-0 text-medic" />
          <p>
            <strong className="text-ink">Aviso:</strong> VITALIS es un <strong>prototipo de demostración</strong>.
            No comercializa medicamentos reales ni sustituye la asesoría de un profesional de la
            salud. Los medicamentos de venta con fórmula requieren prescripción médica vigente.
            Ante cualquier síntoma, consulta a tu médico o farmacéutico.
          </p>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-mist bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-green text-white"><Plus size={20} strokeWidth={3} /></span>
                <span className="font-display text-2xl font-extrabold">VITAL<span className="text-green">IS</span></span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
                Tu farmacia digital de confianza. Cuidamos tu salud con productos originales,
                entrega rápida y farmacéuticos siempre disponibles.
              </p>
              <div className="mt-5 space-y-1.5 text-sm text-slate">
                <p className="flex items-center gap-2"><Phone size={15} className="text-medic" /> 01 8000 VITALIS</p>
                <p className="flex items-center gap-2"><Mail size={15} className="text-medic" /> hola@vitalis.co</p>
                <p className="flex items-center gap-2"><MapPin size={15} className="text-medic" /> Cali, Colombia</p>
              </div>
            </div>
            {[
              { h: "Comprar", items: ["Medicamentos", "Vitaminas", "Dermocosmética", "Bebé y mamá", "Ofertas"] },
              { h: "Servicios", items: ["Receta digital", "Consulta farmacéutica", "Programa de crónicos", "Domicilio"] },
              { h: "VITALIS", items: ["Nosotros", "Farmacovigilancia", "Términos", "Privacidad"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="kicker text-ink/70">{col.h}</h4>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => <li key={it}><a href="#" className="text-sm text-slate transition hover:text-medic">{it}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-mist pt-6 text-xs text-slate/70 sm:flex-row">
            <p>© {new Date().getFullYear()} VITALIS — Prototipo por Abimaru. Solo demostración.</p>
            <p>Hecho con cuidado en Cali, Colombia.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
