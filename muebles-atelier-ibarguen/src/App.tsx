import { useEffect } from "react";
import { useRoute } from "./lib/router";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";
import DemoBanner from "./components/DemoBanner";
import QuotePill from "./components/QuotePill";
import BrandStudio from "./components/BrandStudio";
import "./lib/brandStore"; // aplica la marca inicial (enlace compartido o última guardada) antes del primer render

export default function App() {
  const path = useRoute();

  // Al llegar al home con un ancla (#seccion) desde otra página, hacemos scroll
  // una vez que el contenido ya se renderizó.
  useEffect(() => {
    if (path === "" && window.location.hash) {
      const id = window.location.hash;
      const t = window.setTimeout(() => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView();
      }, 60);
      return () => window.clearTimeout(t);
    }
  }, [path]);

  let page;
  if (path.startsWith("proyecto/")) {
    page = <Project slug={path.slice("proyecto/".length)} />;
  } else if (path === "portafolio") {
    page = <Portfolio />;
  } else {
    page = <Home />;
  }

  return (
    <>
      {page}
      <QuotePill />
      <BrandStudio />
      <DemoBanner
        disclaimer="Portafolio, proyectos, testimonios y precios son conceptuales e ilustrativos."
        waMessage="Hola, vi la demo de Atelier Ibargüen (muebles) de Estudio Abimaru. Quisiera una página así para mi negocio."
      />
    </>
  );
}
