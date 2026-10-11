import { wordmarkParts } from "../lib/brand";
import { useBrand } from "../lib/brandStore";

type Props = { headClass?: string; tailClass?: string };

/** Logotipo: imagen si el usuario subió un logo; si no, "Atelier" en tinta + "Ibargüen" en cursiva con el acento. */
export default function Wordmark({ headClass = "font-display text-2xl font-semibold tracking-tight text-espresso", tailClass = "font-display text-2xl italic text-terracotta" }: Props) {
  const brand = useBrand();
  if (brand.logo) return <img src={brand.logo} alt={brand.name} className="h-9 max-w-[10rem] object-contain" />;
  const { head, tail } = wordmarkParts(brand.name);
  return (
    <>
      {head && <span className={headClass}>{head}</span>}
      <span className={tailClass}>{tail}</span>
    </>
  );
}
