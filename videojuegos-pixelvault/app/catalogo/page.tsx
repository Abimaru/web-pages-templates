import type { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import CatalogContent from "@/app/catalogo/CatalogContent";

export const metadata: Metadata = {
  title: "Catálogo | PIXELVAULT",
  description: "Explora todo el catálogo de videojuegos de PIXELVAULT: filtra por plataforma, género y precio.",
};

export default function CatalogoPage() {
  return (
    <main className="relative min-h-screen bg-void">
      <Navbar />

      <section className="scanlines relative overflow-hidden bg-radial-glow pt-32 pb-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 text-center">
          <p className="pixel-label text-neon-magenta">// TIENDA</p>
          <h1 className="mt-3 font-display text-4xl font-black text-white sm:text-5xl">
            Catálogo <span className="text-gradient">completo</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Todos los tesoros del Vault en un solo lugar. Filtra, ordena y encuentra tu
            próxima obsesión.
          </p>
        </div>
      </section>

      <CatalogContent />

      <Footer />
    </main>
  );
}
