import BrandStudio from "@/app/BrandStudio";
import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Press_Start_2P } from "next/font/google";
import { CartProvider } from "@/app/CartContext";
import CartDrawer from "@/app/CartDrawer";
import CartBar from "@/app/CartBar";
import DemoBanner from "@/app/DemoBanner";
import "./globals.css";
import ServiceWorker from "@/app/ServiceWorker";
import AnalyticsLoader from "@/app/AnalyticsLoader";

export const viewport: Viewport = { themeColor: "#06040f" };

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const SITE = "https://abimaru.github.io/web-pages-templates/pixelvault/";
const OG = "https://abimaru.github.io/web-pages-templates/pixelvault/og.jpg";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  manifest: `${BASE_PATH}/manifest.webmanifest`,
  icons: { apple: `${BASE_PATH}/apple-touch-icon.png` },
  metadataBase: new URL(SITE),
  title: "PIXELVAULT — Videojuegos, consolas y cultura gamer",
  description:
    "PIXELVAULT: el cofre de tesoros gamer. Videojuegos nuevos y retro, consolas, accesorios, reparación, torneos y coleccionables. Prototipo demostrativo de Estudio Abimaru — datos ilustrativos, sin backend.",
  keywords:
    "videojuegos, tienda gamer, consolas, retro, PC gaming, reparación de consolas, torneos, coleccionables, PIXELVAULT",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: "PIXELVAULT · Estudio Abimaru",
    title: "PIXELVAULT — Videojuegos, consolas y cultura gamer",
    description:
      "El cofre de tesoros gamer. Prototipo demostrativo de Estudio Abimaru — datos ilustrativos, sin backend.",
    url: SITE,
    locale: "es_CO",
    images: [{ url: OG, width: 1200, height: 630, alt: "PIXELVAULT — Tienda gamer (demo de Estudio Abimaru)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PIXELVAULT — Videojuegos, consolas y cultura gamer",
    description: "El cofre de tesoros gamer (demo de Estudio Abimaru).",
    images: [OG],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${orbitron.variable} ${rajdhani.variable} ${pressStart.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void">
        <ServiceWorker />
        <AnalyticsLoader demo="pixelvault" />
        <CartProvider>
          {children}
          <CartBar />
          <CartDrawer />
          <BrandStudio />
        </CartProvider>
        <DemoBanner
          disclaimer="Catálogo, carrito, precios y marcas mencionadas son ejemplos ilustrativos."
          waMessage="Hola, vi la demo de PIXELVAULT (tienda gamer) de Estudio Abimaru. Quisiera una tienda así para mi negocio."
        />
      </body>
    </html>
  );
}
