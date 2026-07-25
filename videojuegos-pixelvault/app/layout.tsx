import type { Metadata } from "next";
import { Orbitron, Rajdhani, Press_Start_2P } from "next/font/google";
import { CartProvider } from "@/app/CartContext";
import CartDrawer from "@/app/CartDrawer";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "PIXELVAULT — Videojuegos, consolas y cultura gamer",
  description:
    "PIXELVAULT es el cofre de tesoros gamer: videojuegos nuevos y retro, consolas, accesorios, reparación técnica, torneos y coleccionables. De niños a nostálgicos, aquí empieza tu próxima partida.",
  keywords:
    "videojuegos, tienda gamer, consolas, retro, PlayStation, Xbox, Nintendo, PC gaming, reparación de consolas, torneos, coleccionables, PIXELVAULT",
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
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
