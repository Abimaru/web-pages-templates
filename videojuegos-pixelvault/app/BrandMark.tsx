"use client";

import { Gamepad2 } from "lucide-react";
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
      <span className="relative grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple text-void shadow-[0_0_18px_rgba(var(--neon-rgb),0.6)]">
        <Gamepad2 size={22} strokeWidth={2.5} />
      </span>
      <span className="font-display text-xl font-extrabold tracking-widest text-white uppercase">
        {head}{head && wordmarkJoin(brand.name)}<span className="neon-cyan">{tail}</span>
      </span>
    </>
  );
}

/** Nombre de la marca como texto (pies de página, etc.). */
export function BrandName() {
  return <>{useBrand().name}</>;
}
