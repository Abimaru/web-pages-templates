import type { Metadata } from "next";
import Navbar from "@/app/Navbar";
import Footer from "@/app/Footer";
import Configurator from "./Configurator";

export const metadata: Metadata = {
  title: "Arma tu PC | NEXORA",
  description:
    "Configura tu PC a la medida paso a paso y obtén un estimado de precio al instante. Un ingeniero valida tu build sin costo.",
};

export default function ArmaTuPcPage() {
  return (
    <main className="relative min-h-screen bg-space">
      <Navbar />

      <section className="relative overflow-hidden bg-glow pt-32 pb-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 text-center">
          <p className="mono text-sm text-teal">// build.exe</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            Arma tu <span className="text-gradient">PC ideal</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Elige cada componente y mira el estimado actualizarse en vivo. Cuando estés
            listo, lo revisamos contigo y lo ensamblamos.
          </p>
        </div>
      </section>

      <div className="pt-10">
        <Configurator />
      </div>

      <Footer />
    </main>
  );
}
