import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXORA — Computadores, componentes y soporte técnico",
  description:
    "NEXORA: tecnología a la vanguardia. Computadores y laptops, PCs a la medida, componentes gamer y de trabajo, más soporte técnico especializado: ensamble, mantenimiento, recuperación de datos y redes.",
  keywords:
    "computadores, laptops, PC gamer, armar PC, componentes, soporte técnico, mantenimiento, recuperación de datos, redes, ensamble, NEXORA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-space">{children}</body>
    </html>
  );
}
