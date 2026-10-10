import { BookmarkCheck } from "lucide-react";
import { useQuoteSlugs, resolvePieces } from "../lib/quote";
import { homeHref } from "../lib/router";

/** Acceso flotante a "Mi cotización" cuando hay piezas guardadas. */
export default function QuotePill() {
  const n = resolvePieces(useQuoteSlugs()).length;
  if (n === 0) return null;
  return (
    <a
      href={homeHref("#contacto")}
      className="fixed bottom-36 right-4 z-[60] sm:bottom-24 flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-medium text-ivory shadow-xl transition hover:bg-walnut sm:right-6"
    >
      <BookmarkCheck size={17} /> Mi cotización · {n} {n === 1 ? "pieza" : "piezas"}
    </a>
  );
}
