"use client";

import { Cpu } from "lucide-react";
import { wordmarkJoin, wordmarkParts } from "@/app/lib/brand";
import { useBrand } from "@/app/lib/brandStore";

/** Logotipo completo: imagen si el usuario subió un logo; si no, ícono + nombre (cabeza en blanco, cola con el acento). */
export default function BrandMark() {
  const brand = useBrand();
  if (brand.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={brand.logo} alt={brand.name} className="h-10 max-w-[10rem] object-contain" />;
  }
  const { head, tail } = wordmarkParts(brand.name);
  return (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric to-indigo text-space shadow-[0_0_18px_rgba(var(--accent-rgb),0.5)]">
        <Cpu size={22} strokeWidth={2.4} />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-white">
        {head}{head && wordmarkJoin(brand.name)}<span className="text-electric glow-text">{tail}</span>
      </span>
    </>
  );
}

/** Nombre de la marca como texto (pies de página, etc.). */
export function BrandName() {
  return <>{useBrand().name}</>;
}
