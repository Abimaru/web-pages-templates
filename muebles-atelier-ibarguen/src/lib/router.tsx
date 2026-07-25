import { useEffect, useState, type ReactNode, type MouseEvent } from "react";

// Base de la app (Vite): "/" en local, "/web-pages-templates/muebles/" en GitHub Pages.
const RAW = import.meta.env.BASE_URL || "/";
export const BASE = RAW.endsWith("/") ? RAW : RAW + "/";

// Restaura la ruta guardada por el 404.html raíz (carga directa / refresh de
// una sub-ruta en GitHub Pages). Se ejecuta antes del primer render.
(function restoreFromRedirect() {
  try {
    const r = sessionStorage.getItem("spa-redirect");
    if (r) {
      sessionStorage.removeItem("spa-redirect");
      window.history.replaceState({}, "", BASE + r.replace(/^\/+/, ""));
    }
  } catch {
    /* sessionStorage no disponible */
  }
})();

/** Ruta actual sin la base ni barras: "", "portafolio", "proyecto/mesa-raiz". */
export function currentPath(): string {
  let p = window.location.pathname;
  if (p.startsWith(BASE)) p = p.slice(BASE.length);
  return p.replace(/^\/+/, "").replace(/\/+$/, "");
}

/** Re-renderiza cuando cambia la ruta (popstate o navegación interna). */
export function useRoute(): string {
  const [path, setPath] = useState(currentPath());
  useEffect(() => {
    const on = () => setPath(currentPath());
    window.addEventListener("popstate", on);
    window.addEventListener("app:navigate", on);
    return () => {
      window.removeEventListener("popstate", on);
      window.removeEventListener("app:navigate", on);
    };
  }, []);
  return path;
}

export function navigate(to: string) {
  const clean = to.replace(/^\/+/, "");
  window.history.pushState({}, "", BASE + clean);
  window.dispatchEvent(new Event("app:navigate"));
  window.scrollTo({ top: 0 });
}

/** Enlace interno tipo SPA (para rutas: /portafolio, /proyecto/xxx). */
export function Link({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent) => void;
} & Record<string, unknown>) {
  const href = BASE + to.replace(/^\/+/, "");
  const handle = (e: MouseEvent) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={href} onClick={handle} className={className} {...rest}>
      {children}
    </a>
  );
}

/** URL absoluta a una sección del home (anchors #). Navega + hace scroll. */
export function homeHref(hash = ""): string {
  return BASE + hash;
}
