import { Plus } from "lucide-react";
import { wordmarkJoin, wordmarkParts } from "../lib/brand";
import { useBrand } from "../lib/brandStore";

/** Logotipo: imagen si el usuario subió un logo; si no, cruz + nombre (VITAL en tinta, IS con el acento). */
export default function Wordmark() {
  const brand = useBrand();
  if (brand.logo) return <img src={brand.logo} alt={brand.name} className="h-9 max-w-[10rem] object-contain" />;
  const { head, tail } = wordmarkParts(brand.name);
  return (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white"><Plus size={20} strokeWidth={3} /></span>
      <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
        {head}{head && wordmarkJoin(brand.name)}<span className="text-brand">{tail}</span>
      </span>
    </>
  );
}
