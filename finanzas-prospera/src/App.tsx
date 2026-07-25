import {
  ArrowRight,
  Banknote,
  Zap,
  Wallet,
  TrendingUp,
  ShieldCheck,
  Clock,
  BadgeCheck,
  FileSignature,
  Send,
  Star,
  Quote,
  CheckCircle2,
  Info,
  Phone,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Reveal from "./components/Reveal";
import Counter from "./components/Counter";
import MarketTicker from "./components/MarketTicker";
import MarketData from "./components/MarketData";
import CreditSimulator from "./components/CreditSimulator";
import SavingsSimulator from "./components/SavingsSimulator";
import ScoreChecker from "./components/ScoreChecker";
import { images } from "./data/images";

const perks = ["APROBACIÓN EN 10 MIN", "100% DIGITAL", "SIN CUOTA DE MANEJO", "VIGILADO Y SEGURO", "SIN LETRA PEQUEÑA"];

type Product = { icon: LucideIcon; name: string; desc: string; highlight: string; gold?: boolean };
const productos: Product[] = [
  { icon: Banknote, name: "Crédito de libre inversión", desc: "Cumple tus metas con cuota fija y plazos cómodos.", highlight: "Hasta $50 millones" },
  { icon: Zap, name: "Crédito exprés", desc: "Para imprevistos: solicítalo y recíbelo el mismo día.", highlight: "Aprobación en 10 min" },
  { icon: Wallet, name: "Cuenta de ahorro", desc: "Tu dinero disponible siempre, sin costos ocultos.", highlight: "$0 cuota de manejo" },
  { icon: TrendingUp, name: "Cuenta Progreso", desc: "Deja tu dinero a plazo y gana rendimientos crecientes.", highlight: "Hasta 13,75% E.A.", gold: true },
];

const pasos = [
  { icon: Send, title: "Solicita en línea", desc: "Llena el formulario en 2 minutos, desde tu celular." },
  { icon: ShieldCheck, title: "Validamos tu score", desc: "Consultamos tu historial al instante y sin costo." },
  { icon: FileSignature, title: "Firma digital", desc: "Acepta tu oferta con firma electrónica segura." },
  { icon: Banknote, title: "Recibe el desembolso", desc: "El dinero llega a tu cuenta el mismo día." },
];

const stats = [
  { render: () => <><Counter to={120} suffix="K+" /></>, label: "clientes confían en nosotros" },
  { render: () => <><span>$</span><Counter to={850} suffix=" mil M" /></>, label: "desembolsados" },
  { render: () => <><Counter to={10} suffix=" min" /></>, label: "aprobación promedio" },
  { render: () => <><Counter to={4.9} decimals={1} suffix="/5" /></>, label: "calificación de clientes" },
];

const testimonios = [
  { name: "Andrea C.", role: "Emprendedora", img: images.testimonios[0], text: "Necesitaba capital para mi negocio y en 8 minutos tenía el desembolso. Salvaron mi temporada alta." },
  { name: "Jorge M.", role: "Consolidó sus deudas", img: images.testimonios[1], text: "Junté todas mis deudas en un solo crédito con cuota más baja. Por fin respiro y duermo tranquilo." },
  { name: "Paola R.", role: "Cuenta Progreso", img: images.testimonios[2], text: "Mi Cuenta Progreso rindió más que el banco de siempre, y sin letra pequeña ni sorpresas." },
];

export default function App() {
  return (
    <main id="top" className="bg-white text-ink">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-paper pt-32 lg:pt-40">
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-soft-green blur-3xl opacity-70" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 lg:grid-cols-2">
          <Reveal>
            <span className="kicker inline-flex items-center gap-2 rounded-full bg-soft-green px-3.5 py-1.5 text-forest">
              <BadgeCheck size={14} /> Finanzas claras y humanas
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl">
              Resuelve tu presente,<br /><span className="text-forest">haz crecer</span> tu futuro
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate">
              Créditos que se aprueban en minutos y una Cuenta Progreso que pone tu dinero
              a trabajar. Sin filas, sin letra pequeña, con gente que te explica todo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#simuladores" className="btn-primary">Simular ahora <ArrowRight size={18} /></a>
              <a href="#productos" className="btn-ghost">Ver productos</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate">
              <span className="flex items-center gap-2"><Clock size={17} className="text-green" /> Aprobación en 10 min</span>
              <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-green" /> Datos protegidos</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-green" /> 100% digital</span>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="overflow-hidden rounded-[2rem] rounded-br-[5rem] shadow-xl">
              <img src={images.hero} alt="Persona feliz gestionando sus finanzas" className="h-[440px] w-full object-cover" />
            </div>
            <div className="animate-float absolute -left-5 bottom-10 w-52 rounded-2xl bg-white p-4 shadow-xl">
              <p className="text-xs text-slate">Tu dinero creció</p>
              <p className="font-display text-2xl font-extrabold text-forest">+$1.375.000</p>
              <div className="mt-2 flex items-end gap-1">
                {[30, 45, 40, 60, 72, 90].map((h, i) => (
                  <span key={i} className="w-2.5 rounded-t bg-green-bright" style={{ height: h / 3 + "px", opacity: 0.4 + i * 0.1 }} />
                ))}
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
              {p} <TrendingUp size={13} className="text-green" />
            </span>
          ))}
        </div>
      </div>

      {/* ===================== TICKER DE MERCADO ===================== */}
      <MarketTicker />

      {/* ===================== PRODUCTOS ===================== */}
      <section id="productos" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-forest">Nuestros productos</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Todo lo que tu dinero necesita</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productos.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className={`card group flex h-full flex-col p-7 ${p.gold ? "ring-1 ring-gold/40" : ""}`}>
                <div className={`grid h-14 w-14 place-items-center rounded-2xl transition group-hover:scale-105 ${p.gold ? "bg-gold/15 text-gold" : "bg-soft-green text-forest"}`}>
                  <p.icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{p.desc}</p>
                <p className={`mt-4 font-display text-sm font-bold ${p.gold ? "text-gold" : "text-forest"}`}>{p.highlight}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== DATOS DE INTERÉS ===================== */}
      <MarketData />

      {/* ===================== SIMULADORES ===================== */}
      <section id="simuladores" className="border-y border-mist bg-paper py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 text-center">
            <span className="kicker text-forest">Simuladores</span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Juega con los números, sin compromiso</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate">Mueve los controles y mira, en vivo, tu cuota o cuánto crecería tu dinero. Transparencia total.</p>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal><CreditSimulator /></Reveal>
            <Reveal delay={120}><SavingsSimulator /></Reveal>
          </div>
        </div>
      </section>

      {/* ===================== SCORE ===================== */}
      <section id="score" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="kicker text-forest">Conócete mejor</span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Descubre tu <span className="text-forest">score</span> y a qué puedes acceder
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate">
              Tu score crediticio abre puertas. Consúltalo gratis y sin afectar tu
              historial, entiende qué lo mejora y accede a ofertas preaprobadas hechas a tu
              medida.
            </p>
            <ul className="mt-6 space-y-3">
              {["Consulta gratis e ilimitada", "Consejos para subir tu puntaje", "Ofertas preaprobadas según tu perfil"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-slate"><CheckCircle2 size={18} className="text-green" /> {t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}><ScoreChecker /></Reveal>
        </div>
      </section>

      {/* ===================== CÓMO FUNCIONA ===================== */}
      <section id="como" className="border-y border-mist bg-paper py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 text-center">
            <span className="kicker text-forest">Rápido y sin filas</span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Tu crédito en 4 pasos</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-4">
            {pasos.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="relative rounded-2xl bg-white p-7 text-center shadow-sm">
                  <span className="absolute right-4 top-3 font-display text-4xl font-extrabold text-mist">{i + 1}</span>
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-soft-green text-forest">
                    <p.icon size={24} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-slate">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 rounded-3xl bg-forest px-8 py-12 text-white sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="text-center">
              <p className="font-display text-4xl font-extrabold text-gold-light sm:text-5xl">{s.render()}</p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <span className="kicker text-forest">Historias que inspiran</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Personas reales, metas cumplidas</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonios.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="card flex h-full flex-col p-8">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <Quote size={26} className="mt-4 text-forest/30" />
                <blockquote className="mt-2 flex-1 leading-relaxed text-ink/85">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-mist pt-4">
                  <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-display font-bold">{t.name}</p>
                    <p className="text-sm text-slate">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-forest to-navy px-8 py-14 text-white sm:px-16">
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="kicker text-gold-light">Empieza hoy</span>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">Tu próxima meta está a un clic</h2>
              <p className="mt-4 max-w-lg text-white/80">Abre tu cuenta o solicita tu crédito en minutos. Sin filas, sin papeleo, con acompañamiento humano.</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a href="#productos" className="btn-gold">Abrir cuenta</a>
                <a href="#simuladores" className="rounded-lg border border-white/30 px-6 py-3 font-display text-sm font-semibold transition hover:bg-white/10">Simular crédito</a>
              </div>
            </div>
            <div className="hidden justify-center gap-4 lg:flex">
              {[TrendingUp, ShieldCheck, Wallet].map((Icon, i) => (
                <div key={i} className="animate-float grid h-20 w-20 place-items-center rounded-2xl bg-white/12" style={{ animationDelay: `${i * 0.4}s` }}>
                  <Icon size={30} className="text-gold-light" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================== DISCLAIMER ===================== */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-start gap-3 rounded-2xl border border-mist bg-paper p-5 text-sm text-slate">
          <Info size={20} className="mt-0.5 shrink-0 text-forest" />
          <p>
            <strong className="text-ink">Aviso:</strong> PRÓSPERA es un <strong>prototipo de demostración</strong>.
            Las tasas, cálculos y aprobaciones son <strong>ilustrativos</strong> y no constituyen
            una oferta, cotización ni asesoría financiera. Los simuladores usan supuestos de referencia;
            los valores reales dependen de la evaluación de cada entidad vigilada.
          </p>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-mist bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest text-white"><TrendingUp size={22} strokeWidth={2.6} /></span>
                <span className="font-display text-2xl font-extrabold">PRÓSPERA</span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
                Finanzas claras y humanas. Créditos, ahorro y acompañamiento para que
                logres tus metas con tranquilidad.
              </p>
              <div className="mt-5 space-y-1.5 text-sm text-slate">
                <p className="flex items-center gap-2"><Phone size={15} className="text-forest" /> 01 8000 PROSPERA</p>
                <p className="flex items-center gap-2"><Mail size={15} className="text-forest" /> hola@prospera.co</p>
                <p className="flex items-center gap-2"><MapPin size={15} className="text-forest" /> Cali, Colombia</p>
              </div>
            </div>
            {[
              { h: "Productos", items: ["Crédito libre inversión", "Crédito exprés", "Cuenta de ahorro", "Cuenta Progreso"] },
              { h: "Recursos", items: ["Simuladores", "Consulta tu score", "Educación financiera", "Preguntas frecuentes"] },
              { h: "PRÓSPERA", items: ["Nosotros", "Tasas y tarifas", "Términos", "Habeas data"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="kicker text-ink/70">{col.h}</h4>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => <li key={it}><a href="#" className="text-sm text-slate transition hover:text-forest">{it}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-mist pt-6 text-xs text-slate/70 sm:flex-row">
            <p>© {new Date().getFullYear()} PRÓSPERA — Prototipo por Abimaru. Solo demostración.</p>
            <p>Hecho con propósito en Cali, Colombia.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
