import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import DemoBanner from "./DemoBanner";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#050914" };

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

const SITE = "https://abimaru.github.io/web-pages-templates/nexora/";
const OG = "https://abimaru.github.io/web-pages-templates/nexora/og.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "NEXORA — Computadores, componentes y soporte técnico",
  description:
    "NEXORA: tecnología a la vanguardia. Computadores y laptops, PCs a la medida, componentes y soporte técnico (ensamble, mantenimiento, recuperación de datos, redes). Prototipo demostrativo de Estudio Abimaru — sin backend.",
  keywords:
    "computadores, laptops, PC gamer, armar PC, componentes, soporte técnico, mantenimiento, recuperación de datos, redes, ensamble, NEXORA",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: "NEXORA · Estudio Abimaru",
    title: "NEXORA — Computadores, componentes y soporte técnico",
    description:
      "Tecnología a la vanguardia. Prototipo demostrativo de Estudio Abimaru — datos ilustrativos, sin backend.",
    url: SITE,
    locale: "es_CO",
    images: [{ url: OG, width: 1200, height: 630, alt: "NEXORA — Computación y soporte (demo de Estudio Abimaru)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA — Computadores, componentes y soporte técnico",
    description: "Tecnología a la vanguardia (demo de Estudio Abimaru).",
    images: [OG],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-space">
        {children}
        <DemoBanner
          disclaimer="Productos, precios, soporte y cifras mostrados son ejemplos ilustrativos."
          waMessage="Hola, vi la demo de NEXORA (computación y soporte) de Estudio Abimaru. Quisiera una página así para mi negocio."
        />
      </body>
    </html>
  );
}
