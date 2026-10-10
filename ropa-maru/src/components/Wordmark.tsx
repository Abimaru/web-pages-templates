import { wordmarkParts, type Brand } from "../lib/brand";

/** Logotipo de la marca: imagen si el usuario subió un logo; si no, el nombre con la última letra en acento. */
export default function Wordmark({ brand, className = "" }: { brand: Brand; className?: string }) {
  if (brand.logo) {
    return <img src={brand.logo} alt={brand.name} className={`h-9 max-w-[9rem] object-contain lg:h-11 ${className}`} />;
  }
  const { head, tail } = wordmarkParts(brand.name);
  return (
    <span className={className}>
      {head}
      <span className="text-rose">{tail}</span>
    </span>
  );
}
