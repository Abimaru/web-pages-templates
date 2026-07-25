import {
  Cpu,
  Laptop,
  Monitor,
  MemoryStick,
  Keyboard,
  HardDrive,
  Wrench,
  ShieldCheck,
  Database,
  Network,
  Settings2,
  Gauge,
  Zap,
  ArrowRight,
  CheckCircle2,
  Quote,
  Cog,
  MousePointerClick,
  Rocket,
  Headset,
} from "lucide-react";
import Navbar from "@/app/Navbar";
import Reveal from "@/app/Reveal";
import Terminal from "@/app/Terminal";

const products = [
  { icon: Cpu, name: "PC Gamer NEXORA", spec: "RTX · Ryzen · refrigeración líquida", price: "desde $3.900.000", tag: "TOP", color: "#38bdf8" },
  { icon: Laptop, name: "Laptops", spec: "Ultrabooks, workstations y gaming", price: "desde $2.100.000", color: "#22d3ee" },
  { icon: Monitor, name: "Monitores", spec: "144Hz · 4K · IPS · ultrawide", price: "desde $650.000", color: "#6366f1" },
  { icon: MemoryStick, name: "Componentes", spec: "GPU, RAM, tarjetas madre, fuentes", price: "precios mayoristas", tag: "STOCK", color: "#2dd4bf" },
  { icon: Keyboard, name: "Periféricos", spec: "Mecánicos, mouse, audio, streaming", price: "desde $90.000", color: "#38bdf8" },
  { icon: HardDrive, name: "Almacenamiento", spec: "SSD NVMe, discos y respaldo NAS", price: "desde $180.000", color: "#22d3ee" },
];

const steps = [
  { icon: MousePointerClick, title: "Elige tu propósito", desc: "Gaming, diseño, edición, oficina o servidor. Nos dices para qué y con cuánto." },
  { icon: Cog, title: "Configuramos a la medida", desc: "Seleccionamos cada componente balanceando rendimiento, futuro y presupuesto." },
  { icon: Settings2, title: "Ensamblamos y probamos", desc: "Cableado limpio, stress test, optimización térmica y benchmarks reales." },
  { icon: Rocket, title: "Listo para volar", desc: "Entrega con sistema optimizado, garantía y soporte de por vida del equipo." },
];

const support = [
  { icon: Wrench, title: "Mantenimiento & ensamble", desc: "Limpieza profunda, cambio de pasta térmica, upgrades y armado profesional." },
  { icon: Database, title: "Recuperación de datos", desc: "Rescatamos información de discos dañados, SSD y memorias con protocolos seguros." },
  { icon: Network, title: "Redes & servidores", desc: "Cableado estructurado, WiFi empresarial, NAS y configuración de servidores." },
  { icon: ShieldCheck, title: "Seguridad & backup", desc: "Antivirus, cifrado, respaldo automatizado y auditoría de vulnerabilidades." },
  { icon: Gauge, title: "Optimización & tuning", desc: "Overclock seguro, undervolt, limpieza de software y máximo rendimiento." },
  { icon: Headset, title: "Soporte remoto 24/7", desc: "Asistencia inmediata sin salir de casa. Resolvemos conectados a tu equipo." },
];

const why = [
  { n: "10+", l: "años a la vanguardia" },
  { n: "5.000+", l: "equipos ensamblados" },
  { n: "98%", l: "diagnósticos el mismo día" },
  { n: "∞", l: "soporte por vida del equipo" },
];

const testimonials = [
  { name: "Laura P.", role: "Diseñadora 3D", text: "Me armaron una workstation que renderiza en la mitad del tiempo. Asesoría de otro nivel.", emoji: "🎨" },
  { name: "Startup Órbita", role: "Empresa de software", text: "Montaron toda nuestra red y servidores. Cero caídas en un año. Profesionales de verdad.", emoji: "🚀" },
  { name: "Julián D.", role: "Streamer", text: "Recuperaron 4 años de contenido de un SSD muerto. Les debo la vida (digital).", emoji: "💾" },
];

const marquee = ["ENSAMBLE A LA MEDIDA", "SOPORTE 24/7", "RECUPERACIÓN DE DATOS", "REDES EMPRESARIALES", "GARANTÍA REAL", "OPTIMIZACIÓN", "UPGRADES", "BACKUP AUTOMÁTICO"];

export default function Home() {
  return (
    <main id="top" className="relative bg-space">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-glow pt-28">
        <div className="bg-grid absolute inset-0 opacity-70" />
        {/* líneas de datos cayendo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[12, 28, 47, 63, 78, 91].map((left, i) => (
            <span
              key={left}
              className="animate-data absolute top-0 h-24 w-px bg-gradient-to-b from-transparent via-electric to-transparent"
              style={{ left: `${left}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${3 + i * 0.4}s` }}
            />
          ))}
        </div>
        <div className="animate-float-slow absolute -left-16 top-40 h-72 w-72 rounded-full bg-azure/20 blur-3xl" />
        <div className="animate-float absolute -right-10 top-24 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <span className="mono inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-2 text-xs text-teal">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal" /> systems.online // vanguardia
            </span>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Tecnología a la{" "}
              <span className="text-gradient">vanguardia</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Computadores y componentes que rinden hoy y aguantan el mañana, más un
              equipo de soporte técnico que resuelve de verdad. En NEXORA no vendemos
              cajas: <span className="text-white">construimos el futuro de tu trabajo, tu juego y tus ideas.</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#productos" className="btn-primary">
                <Zap size={18} /> Ver productos
              </a>
              <a href="#armar" className="btn-outline">
                <Cog size={16} /> Arma tu PC
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
              <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-teal" /> Garantía real</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-teal" /> Diagnóstico el mismo día</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-teal" /> Soporte de por vida</span>
            </div>
          </div>

          <Reveal delay={150}>
            <Terminal />
          </Reveal>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <div className="mask-fade-x relative overflow-hidden border-y border-electric/15 bg-navy py-4">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="mono flex items-center gap-10 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {item} <span className="text-electric">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===================== PRODUCTOS ===================== */}
      <section id="productos" className="relative mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-12 text-center">
          <p className="mono text-sm text-electric">// catálogo</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            Todo para tu <span className="text-gradient">setup ideal</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Equipos, componentes y periféricos seleccionados por ingenieros, no por
            algoritmos de inventario.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div className="card-tech group h-full p-7">
                <div className="flex items-start justify-between">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}44` }}
                  >
                    <p.icon size={26} style={{ color: p.color }} />
                  </div>
                  {p.tag && (
                    <span className="mono rounded-md border border-teal/40 bg-teal/10 px-2 py-1 text-[10px] text-teal">
                      {p.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{p.name}</h3>
                <p className="mt-1.5 text-sm text-white/55">{p.spec}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="mono text-sm text-electric">{p.price}</span>
                  <ArrowRight size={18} className="text-white/40 transition group-hover:translate-x-1 group-hover:text-electric" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== ARMA TU PC ===================== */}
      <section id="armar" className="relative border-y border-electric/15 bg-navy/50 py-24">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal className="mb-12 text-center">
            <p className="mono text-sm text-teal">// build.exe</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Arma tu PC en <span className="text-gradient">4 pasos</span>
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="card-tech relative h-full p-7">
                  <span className="mono absolute right-5 top-4 text-5xl font-bold text-white/5">
                    0{i + 1}
                  </span>
                  <div className="grid h-13 w-13 place-items-center rounded-2xl border border-electric/40 bg-electric/10 p-3">
                    <s.icon size={24} className="text-electric" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <a href="#contacto" className="btn-primary">
              <Cog size={18} /> Cotizar mi build
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===================== SOPORTE ===================== */}
      <section id="soporte" className="relative mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-12 text-center">
          <p className="mono text-sm text-electric">// support.services</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            Soporte técnico que <span className="text-gradient">sí resuelve</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Ingeniería aplicada a cada problema. Diagnóstico honesto, solución real y
            explicación en cristiano.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {support.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="card-tech group h-full p-7">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-indigo/40 bg-indigo/10 transition-transform duration-300 group-hover:-rotate-6">
                  <s.icon size={26} className="text-electric" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== POR QUÉ NEXORA ===================== */}
      <section id="porque" className="relative overflow-hidden border-y border-electric/15 bg-navy/50 py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="mono text-sm text-teal">// why.nexora</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              La técnica con <span className="text-gradient">conciencia</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              Somos ingenieros antes que vendedores. No te empujamos el equipo más caro:
              te damos el correcto. Creemos que la tecnología solo tiene sentido cuando
              está al servicio de las personas —
              <span className="text-white"> por eso cada máquina que armamos lleva criterio, no solo piezas.</span>
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {why.map((w) => (
                <div key={w.l}>
                  <p className="font-display text-4xl font-bold text-electric glow-text">{w.n}</p>
                  <p className="mt-1 text-sm text-white/55">{w.l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Núcleo con órbitas */}
          <Reveal delay={120}>
            <div className="relative mx-auto flex h-[360px] w-[360px] items-center justify-center">
              <div className="absolute h-72 w-72 rounded-full border border-electric/15" />
              <div className="absolute h-96 w-96 rounded-full border border-indigo/10" />
              <div
                className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-electric to-indigo text-space"
                style={{ animation: "pulse-node 3s ease-out infinite" }}
              >
                <Cpu size={40} strokeWidth={2} />
              </div>
              {[Laptop, MemoryStick, Network, ShieldCheck].map((Icon, i) => (
                <span
                  key={i}
                  className="absolute grid h-12 w-12 place-items-center rounded-xl border border-electric/30 bg-panel text-electric"
                  style={{ animation: `${i % 2 === 0 ? "orbit" : "orbit-rev"} ${16 + i * 3}s linear infinite` }}
                >
                  <Icon size={20} />
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== TESTIMONIOS ===================== */}
      <section className="relative mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-12 text-center">
          <p className="mono text-sm text-electric">// reviews</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            Clientes que <span className="text-gradient">volaron alto</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div className="card-tech h-full p-7">
                <Quote size={30} className="text-electric/50" />
                <p className="mt-4 leading-relaxed text-white/80">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-electric/20 to-indigo/20 text-xl">
                    {t.emoji}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-white">{t.name}</p>
                    <p className="mono text-xs text-electric">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CTA CONTACTO ===================== */}
      <section id="contacto" className="relative overflow-hidden px-5 py-24">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="animate-float-slow absolute left-1/3 top-0 h-72 w-72 rounded-full bg-azure/20 blur-3xl" />
        <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-electric/30 bg-gradient-to-br from-panel/90 to-space/90 p-10 text-center backdrop-blur-sm sm:p-14">
          <p className="mono text-sm text-teal">$ contactar --nexora</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            ¿Listo para dar el salto <span className="text-gradient">al futuro</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Agenda un diagnóstico gratuito o cuéntanos qué equipo sueñas. Te respondemos
            hoy mismo.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              className="w-full rounded-xl border border-electric/30 bg-space/70 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-electric"
            />
            <button type="submit" className="btn-primary justify-center whitespace-nowrap">
              Agendar <ArrowRight size={16} />
            </button>
          </form>
        </Reveal>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-electric/15 bg-navy">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric to-indigo text-space">
                  <Cpu size={22} strokeWidth={2.4} />
                </span>
                <span className="font-display text-xl font-bold text-white">
                  NEX<span className="text-electric glow-text">ORA</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
                Tecnología a la vanguardia con criterio humano. Computadores, componentes
                y soporte técnico que sí resuelve.
              </p>
            </div>
            {[
              { h: "Productos", items: ["PC Gamer", "Laptops", "Componentes", "Periféricos"] },
              { h: "Servicios", items: ["Ensamble", "Mantenimiento", "Datos", "Redes"] },
              { h: "Empresa", items: ["Nosotros", "Garantía", "Contacto", "Blog"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-electric">
                  {col.h}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="text-sm text-white/55 transition hover:text-white">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-electric/10 pt-6 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} NEXORA — Prototipo por Abimaru. Solo demostración.
            </p>
            <p className="mono text-xs text-white/40">built.with(criterio) // not(algoritmo)</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
