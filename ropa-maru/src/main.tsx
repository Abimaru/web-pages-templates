import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerServiceWorker } from "./pwa.ts";
import { loadAnalytics } from "./analytics.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

registerServiceWorker();
loadAnalytics("maru");
