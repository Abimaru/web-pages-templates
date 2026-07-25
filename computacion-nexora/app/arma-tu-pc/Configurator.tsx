"use client";

import { useMemo, useState } from "react";
import { Check, Cpu, Gauge, HardDrive, MemoryStick, Monitor, Snowflake, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Option = { label: string; note: string; price: number };
type Category = { key: string; title: string; icon: LucideIcon; options: Option[] };

const categories: Category[] = [
  {
    key: "perfil",
    title: "Perfil de uso",
    icon: Monitor,
    options: [
      { label: "Oficina esencial", note: "Board + gabinete + fuente", price: 900000 },
      { label: "Creador / Diseño", note: "Base para render y edición", price: 1400000 },
      { label: "Gamer", note: "Base optimizada para juegos", price: 1600000 },
      { label: "Workstation Pro", note: "Máximo rendimiento sostenido", price: 2200000 },
    ],
  },
  {
    key: "cpu",
    title: "Procesador",
    icon: Cpu,
    options: [
      { label: "Ryzen 5 / Core i5", note: "6-8 núcleos", price: 750000 },
      { label: "Ryzen 7 / Core i7", note: "8-12 núcleos", price: 1150000 },
      { label: "Ryzen 9 / Core i9", note: "16+ núcleos", price: 1900000 },
    ],
  },
  {
    key: "gpu",
    title: "Tarjeta gráfica",
    icon: Gauge,
    options: [
      { label: "Gráficos integrados", note: "Oficina y multimedia", price: 0 },
      { label: "RTX 4060 / equivalente", note: "1080p alto", price: 1500000 },
      { label: "RTX 4070 / equivalente", note: "1440p ultra", price: 2600000 },
      { label: "RTX 4080 / equivalente", note: "4K y creación", price: 4200000 },
    ],
  },
  {
    key: "ram",
    title: "Memoria RAM",
    icon: MemoryStick,
    options: [
      { label: "16 GB DDR5", note: "Uso general y gaming", price: 260000 },
      { label: "32 GB DDR5", note: "Multitarea y edición", price: 480000 },
      { label: "64 GB DDR5", note: "Render y virtualización", price: 950000 },
    ],
  },
  {
    key: "storage",
    title: "Almacenamiento",
    icon: HardDrive,
    options: [
      { label: "SSD 500 GB NVMe", note: "Rápido y esencial", price: 220000 },
      { label: "SSD 1 TB NVMe", note: "El punto dulce", price: 380000 },
      { label: "SSD 2 TB NVMe", note: "Para librerías grandes", price: 720000 },
    ],
  },
  {
    key: "cooling",
    title: "Refrigeración",
    icon: Snowflake,
    options: [
      { label: "Aire de alto flujo", note: "Silencioso y confiable", price: 120000 },
      { label: "Líquida 240 mm", note: "Frío para overclock", price: 380000 },
      { label: "Líquida 360 mm", note: "Máxima disipación", price: 560000 },
    ],
  },
];

const format = (n: number) => "$" + n.toLocaleString("es-CO");

export default function Configurator() {
  const [selected, setSelected] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((c) => [c.key, c.key === "gpu" ? 1 : 0]))
  );

  const total = useMemo(
    () => categories.reduce((sum, c) => sum + c.options[selected[c.key]].price, 0),
    [selected]
  );

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Categorías */}
        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.key}>
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-white">
                <cat.icon size={18} className="text-electric" /> {cat.title}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {cat.options.map((opt, i) => {
                  const active = selected[cat.key] === i;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelected((s) => ({ ...s, [cat.key]: i }))}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                        active
                          ? "border-electric bg-electric/10 shadow-[0_0_0_1px_rgba(56,189,248,0.3)]"
                          : "border-electric/15 bg-panel/40 hover:border-electric/40"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-white">{opt.label}</p>
                        <p className="mt-0.5 text-xs text-white/50">{opt.note}</p>
                      </div>
                      <div className="ml-3 text-right">
                        <span className="mono text-sm text-electric">
                          {opt.price === 0 ? "Incluido" : "+" + format(opt.price)}
                        </span>
                        {active && <Check size={16} className="ml-auto mt-1 text-teal" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-tech p-6">
            <h3 className="font-display text-lg font-semibold text-white">Tu configuración</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.key} className="flex items-start justify-between gap-3">
                  <span className="text-white/55">{c.title}</span>
                  <span className="text-right text-white/85">{c.options[selected[c.key]].label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-widest text-white/40">Estimado total</p>
              <p className="mono mt-1 text-3xl font-bold text-electric glow-text">{format(total)}</p>
              <p className="mt-1 text-xs text-white/40">Precio referencial · sujeto a disponibilidad</p>
            </div>
            <a
              href="/#contacto"
              className="btn-primary mt-5 w-full justify-center"
            >
              Solicitar esta cotización <ArrowRight size={16} />
            </a>
            <p className="mt-3 text-center text-xs text-white/40">
              Un ingeniero valida y ajusta tu build sin costo.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
