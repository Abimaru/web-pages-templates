import { useEffect } from "react";
import { useRoute } from "./lib/router";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";

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

  if (path.startsWith("proyecto/")) {
    return <Project slug={path.slice("proyecto/".length)} />;
  }
  if (path === "portafolio") {
    return <Portfolio />;
  }
  return <Home />;
}
