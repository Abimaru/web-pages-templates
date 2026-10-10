import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleInQuote, useQuoteSlugs } from "../lib/quote";

type Props = { slug: string; name: string; variant?: "icon" | "full" };

/** Guarda/quita una pieza de "Mi cotización". */
export default function SaveToQuote({ slug, name, variant = "full" }: Props) {
  const saved = useQuoteSlugs().includes(slug);
  const label = saved ? `Quitar ${name} de mi cotización` : `Guardar ${name} en mi cotización`;

  if (variant === "icon") {
    return (
      <button
        onClick={() => toggleInQuote(slug)}
        aria-label={label}
        aria-pressed={saved}
        title={saved ? "Quitar de mi cotización" : "Guardar en mi cotización"}
        className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full shadow transition ${
          saved ? "bg-terracotta text-ivory" : "bg-ivory/90 text-espresso hover:bg-ivory"
        }`}
      >
        {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>
    );
  }

  return (
    <button
      onClick={() => toggleInQuote(slug)}
      aria-pressed={saved}
      className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition ${
        saved ? "border-terracotta bg-terracotta/10 text-terracotta" : "border-espresso/25 text-espresso hover:border-espresso"
      }`}
    >
      {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
      {saved ? "Guardada en mi cotización" : "Guardar en mi cotización"}
    </button>
  );
}
