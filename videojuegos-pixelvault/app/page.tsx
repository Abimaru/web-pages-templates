import {
  Gamepad2,
  Zap,
  Trophy,
  Wrench,
  Repeat,
  Crown,
  Joystick,
  Cpu,
  Sparkles,
  ArrowRight,
  Quote,
  Flame,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/Navbar";
import Reveal from "@/app/Reveal";
import GameCard from "@/app/GameCard";
import { games } from "@/app/lib/games";

const featured = games.slice(0, 8);

const platforms = [
  { name: "PlayStation", desc: "PS5 · PS4 · exclusivos", icon: Joystick, color: "#22e3ff" },
  { name: "Xbox", desc: "Series X|S · Game Pass", icon: Gamepad2, color: "#b6ff3c" },
  { name: "Nintendo", desc: "Switch · familia & fiestas", icon: Sparkles, color: "#ff2e97" },
  { name: "PC Gaming", desc: "Steam · Epic · componentes", icon: Cpu, color: "#8b5cf6" },
];

const services = [
  { icon: Wrench, title: "Reparación técnica", desc: "Consolas, controles y PC: diagnóstico, limpieza, HDMI, drift de sticks y más.", color: "#22e3ff" },
  { icon: Trophy, title: "Torneos & eventos", desc: "Competencias presenciales y online con premios. FIFA, Smash, Tekken y shooters.", color: "#ff2e97" },
  { icon: Repeat, title: "Trade-in de usados", desc: "Trae tus juegos y consolas: los evaluamos y te damos crédito para tu próximo tesoro.", color: "#b6ff3c" },
  { icon: Crown, title: "Membresía VaultPass", desc: "Descuentos, preventas, envío gratis y acceso anticipado a lanzamientos.", color: "#ffb020" },
];

const retro = [
  { emoji: "👾", label: "Arcade" },
  { emoji: "🕹️", label: "Atari / NES" },
  { emoji: "💽", label: "SNES / Genesis" },
  { emoji: "🎮", label: "PS1 / N64" },
  { emoji: "📼", label: "Game Boy" },
  { emoji: "🏆", label: "Coleccionables" },
];

const testimonials = [
  { name: "Camilo R.", role: "Gamer competitivo", text: "Me repararon el drift del control en 30 minutos y de paso me llevé un combo. Estos manes saben.", emoji: "🎯" },
  { name: "Valentina G.", role: "Mamá gamer", text: "Compré la consola de mi hijo aquí y me asesoraron con control parental incluido. 10/10.", emoji: "💜" },
  { name: "Andrés M.", role: "Nostálgico de los 90", text: "Encontré mi SNES con los cartuchos de la infancia. Sentí que volví a tener 10 años.", emoji: "🕹️" },
];

const marqueeItems = ["PS5", "XBOX SERIES X", "NINTENDO SWITCH", "PC MASTER RACE", "RETRO", "COLECCIONABLES", "TORNEOS", "ENVÍO NACIONAL"];

export default function Home() {
  return (
    <main id="top" className="relative bg-void">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="scanlines relative flex min-h-screen items-center overflow-hidden bg-radial-glow pt-28">
        <div className="bg-grid absolute inset-0 opacity-70" />
        {/* Orbes flotantes */}
        <div className="animate-float-slow absolute -left-20 top-40 h-72 w-72 rounded-full bg-neon-purple/25 blur-3xl" />
        <div className="animate-float absolute -right-10 top-24 h-72 w-72 rounded-full bg-neon-magenta/20 blur-3xl" />
        <div className="animate-float-slow absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-neon-cyan/15 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="pixel-label inline-flex items-center gap-2 rounded-full border border-neon-lime/40 bg-neon-lime/10 px-4 py-2 text-neon-lime">
              <Flame size={13} /> PRESS START PARA JUGAR
            </span>

            <h1
              className="glitch mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
              data-text="ENTRA AL VAULT"
            >
              ENTRA AL <span className="text-gradient">VAULT</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              El cofre donde viven los tesoros gamer. Videojuegos nuevos y{" "}
              <span className="neon-magenta">retro</span>, consolas, accesorios y
              soporte técnico. Del niño que empieza al nostálgico que nunca soltó el
              control: <span className="text-white">aquí empieza tu próxima partida.</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#catalogo" className="btn-neon">
                <Zap size={18} /> Explorar catálogo
              </a>
              <a href="#servicios" className="btn-ghost">
                <Wrench size={16} /> Servicio técnico
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { n: "12K+", l: "Gamers felices" },
                { n: "800+", l: "Títulos en stock" },
                { n: "24/7", l: "Soporte online" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="font-display text-3xl font-extrabold text-neon-cyan">{s.n}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/50">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Console mockup animado */}
          <div className="relative mx-auto hidden lg:block">
            <div className="animate-pulse-glow relative aspect-square w-full max-w-md rounded-3xl border border-neon-purple/40 bg-gradient-to-br from-panel to-void p-8" style={{ animation: "pulse-glow 4s ease-in-out infinite" }}>
              <div className="flex h-full flex-col items-center justify-center gap-6">
                <div className="animate-float grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 text-8xl">
                  🎮
                </div>
                <div className="pixel-label rounded-lg border border-neon-cyan/40 px-4 py-2 text-neon-cyan">
                  LEVEL UP YOUR GAME
                </div>
                <div className="flex gap-3 text-3xl">
                  <span className="animate-float" style={{ animationDelay: "0.2s" }}>👾</span>
                  <span className="animate-float" style={{ animationDelay: "0.5s" }}>🕹️</span>
                  <span className="animate-float" style={{ animationDelay: "0.8s" }}>🏆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <div className="relative overflow-hidden border-y border-neon-purple/25 bg-abyss py-4">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              {item} <Sparkles size={14} className="text-neon-magenta" />
            </span>
          ))}
        </div>
      </div>

      {/* ===================== CATÁLOGO ===================== */}
      <section id="catalogo" className="relative mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-12 text-center">
          <p className="pixel-label text-neon-magenta">// DESTACADOS</p>
          <h2 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">
            Lo más <span className="text-gradient">jugado</span> de la semana
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Selección curada por nuestro escuadrón. Pasa el cursor sobre cada portada y
            siéntela cobrar vida.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((g, i) => (
            <Reveal key={g.slug} delay={i * 60}>
              <GameCard game={g} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/catalogo" className="btn-ghost">
            Ver catálogo completo <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      {/* ===================== PLATAFORMAS ===================== */}
      <section id="plataformas" className="relative border-y border-neon-purple/20 bg-abyss/60 py-24">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal className="mb-12 text-center">
            <p className="pixel-label text-neon-cyan">// ELIGE TU ARMA</p>
            <h2 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">
              Todas las plataformas
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="card-neon group h-full p-7 text-center">
                  <div
                    className="mx-auto grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.color}1a`, border: `1px solid ${p.color}55` }}
                  >
                    <p.icon size={30} style={{ color: p.color }} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">{p.name}</h3>
                  <p className="mt-1 text-sm text-white/55">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== RETRO / NOSTALGIA ===================== */}
      <section id="retro" className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="pixel-label text-neon-lime">// ZONA NOSTALGIA</p>
            <h2 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">
              El pasado también <span className="neon-magenta">tiene partida</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              Rescatamos consolas y cartuchos que marcaron generaciones. Ese pixel que
              creías perdido, ese jefe final que nunca venciste, esa tarde eterna con tus
              amigos: todo vuelve. Porque un clásico no envejece,{" "}
              <span className="text-white">solo espera a que vuelvas a encenderlo.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {retro.map((r) => (
                <span
                  key={r.label}
                  className="flex items-center gap-2 rounded-xl border border-neon-purple/30 bg-panel/50 px-4 py-2.5 text-sm text-white/80 transition hover:border-neon-lime/60 hover:text-neon-lime"
                >
                  <span className="text-xl">{r.emoji}</span> {r.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="scanlines relative overflow-hidden rounded-3xl border border-neon-purple/40 bg-gradient-to-br from-panel to-void p-10">
              <div className="grid grid-cols-3 gap-6 text-center">
                {retro.map((r, i) => (
                  <div
                    key={r.label}
                    className="animate-float text-5xl sm:text-6xl"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  >
                    {r.emoji}
                  </div>
                ))}
              </div>
              <p className="pixel-label mt-8 text-center text-neon-cyan animate-flicker">
                INSERT COIN
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SERVICIOS ===================== */}
      <section id="servicios" className="relative border-y border-neon-purple/20 bg-abyss/60 py-24">
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal className="mb-12 text-center">
            <p className="pixel-label text-neon-magenta">// MÁS QUE UNA TIENDA</p>
            <h2 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">
              Servicios para tu <span className="text-gradient">setup</span>
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card-neon group h-full p-7">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{ background: `${s.color}1a`, border: `1px solid ${s.color}55` }}
                  >
                    <s.icon size={26} style={{ color: s.color }} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-neon-lime" /> Garantía en cada reparación</span>
            <span className="flex items-center gap-2"><Truck size={18} className="text-neon-cyan" /> Envíos a todo el país</span>
            <span className="flex items-center gap-2"><Zap size={18} className="text-neon-magenta" /> Diagnóstico express</span>
          </Reveal>
        </div>
      </section>

      {/* ===================== COMUNIDAD ===================== */}
      <section id="comunidad" className="relative mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-12 text-center">
          <p className="pixel-label text-neon-cyan">// PLAYER REVIEWS</p>
          <h2 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">
            La comunidad <span className="text-gradient">habla</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div className="card-neon h-full p-7">
                <Quote size={30} className="text-neon-purple/60" />
                <p className="mt-4 leading-relaxed text-white/80">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 text-xl">
                    {t.emoji}
                  </span>
                  <div>
                    <p className="font-display font-bold text-white">{t.name}</p>
                    <p className="text-xs uppercase tracking-wider text-neon-purple">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative overflow-hidden px-5 py-24">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="animate-float-slow absolute left-1/4 top-0 h-72 w-72 rounded-full bg-neon-magenta/20 blur-3xl" />
        <Reveal className="relative mx-auto max-w-3xl rounded-3xl border border-neon-purple/40 bg-gradient-to-br from-panel/90 to-void/90 p-10 text-center backdrop-blur-sm sm:p-14">
          <span className="pixel-label text-neon-lime">NEW GAME +</span>
          <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
            Únete al <span className="text-gradient">VaultPass</span> y sube de nivel
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Recibe preventas, descuentos exclusivos y contenido de la comunidad. Sin spam,
            solo loot.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              className="w-full rounded-xl border border-neon-purple/40 bg-void/70 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-neon-cyan"
            />
            <button type="submit" className="btn-neon justify-center whitespace-nowrap">
              Unirme <ArrowRight size={16} />
            </button>
          </form>
        </Reveal>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-neon-purple/25 bg-abyss">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple text-void">
                  <Gamepad2 size={22} strokeWidth={2.5} />
                </span>
                <span className="font-display text-xl font-extrabold tracking-widest text-white">
                  PIXEL<span className="neon-cyan">VAULT</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
                El cofre de tesoros gamer. Hecho por y para quienes nunca dejaron de jugar.
              </p>
            </div>
            {[
              { h: "Tienda", items: ["Novedades", "Ofertas", "Consolas", "Retro"] },
              { h: "Servicios", items: ["Reparación", "Torneos", "Trade-in", "VaultPass"] },
              { h: "Ayuda", items: ["Envíos", "Garantía", "Contacto", "FAQ"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neon-cyan">
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
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neon-purple/20 pt-6 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} PIXELVAULT — Prototipo por Abimaru. Solo demostración.
            </p>
            <p className="pixel-label text-white/40">GAME OVER? NEVER.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
