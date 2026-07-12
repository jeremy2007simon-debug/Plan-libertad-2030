import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { RESTAURANT } from "@/lib/constants";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://azzurro.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${RESTAURANT.name} · Restaurante italiano`,
    template: `%s · ${RESTAURANT.name}`,
  },
  description:
    "Propuesta de experiencia digital para Azzurro, restaurante italiano. Ambiente, tiempo y sobremesa, pensados para reservar una mesa.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: RESTAURANT.name,
    title: `${RESTAURANT.name} · Restaurante italiano`,
    description: "Una propuesta de experiencia gastronómica elegante y moderna.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${bodoni.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
