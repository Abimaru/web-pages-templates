import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// El base solo se aplica en el build de GitHub Pages (variable VITE_BASE que
// define el workflow). En local queda "/", así que `npm run dev` funciona
// normal en http://localhost:5173.
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
