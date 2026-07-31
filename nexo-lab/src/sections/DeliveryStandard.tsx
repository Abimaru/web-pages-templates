import { Boxes, Server, ShieldCheck, TestTubes, Activity, Share2 } from "lucide-react";
import Section from "../components/Section";

const PILLARS = [
  { icon: Boxes, title: "Encaje de negocio", items: ["Problema", "Usuarios", "Resultado", "Alcance"], accent: "text-cyan" },
  { icon: Server, title: "Arquitectura", items: ["Componentes", "Datos", "Integraciones", "Decisiones", "Evolución"], accent: "text-electric" },
  { icon: ShieldCheck, title: "Seguridad", items: ["Datos", "Validaciones", "Permisos", "Dependencias", "Privacidad", "Riesgos"], accent: "text-violet" },
  { icon: TestTubes, title: "Calidad", items: ["Type-check", "Pruebas", "Accesibilidad", "Responsive", "Rendimiento", "SEO"], accent: "text-mint" },
  { icon: Activity, title: "Operación", items: ["Despliegue", "Configuración", "Monitoreo", "Recuperación", "Costos", "Mantenimiento"], accent: "text-amber" },
  { icon: Share2, title: "Transferencia", items: ["Documentación", "Manual", "Handoff", "Capacitación", "Roadmap"], accent: "text-cyan" },
];

export default function DeliveryStandard() {
  return (
    <Section
      id="delivery-standard"
      eyebrow="Nexo Delivery Standard"
      title="Lo que recibes, además del software"
      intro="Cada solución se diseña para funcionar el día del lanzamiento y seguir funcionando después. Estos son los seis pilares con los que trabajo, en Estudio Abimaru y en NEXO LAB."
    >
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <article key={p.title} className="card card-hover p-6">
            <div className="flex items-center gap-3">
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] ${p.accent}`}>
                <p.icon size={22} />
              </span>
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.items.map((it) => (
                <li key={it} className="chip text-[0.72rem] text-ink/75">{it}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
