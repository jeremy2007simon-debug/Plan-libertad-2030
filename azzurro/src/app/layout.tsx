import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { RESTAURANT } from "@/lib/constants";
import { siteUrl } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${RESTAURANT.name} · Las Chafiras, Tenerife`,
    template: `%s · ${RESTAURANT.name}`,
  },
  description:
    "Restaurante italiano en Las Chafiras, San Miguel de Abona (Tenerife Sur). Descubre la carta y reserva tu mesa.",
  keywords: [
    "restaurante italiano Tenerife",
    "restaurante Las Chafiras",
    "restaurante San Miguel de Abona",
    "Azzurro Tenerife",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: RESTAURANT.name,
    title: `${RESTAURANT.name} · Las Chafiras, Tenerife`,
    description:
      "Restaurante italiano en Las Chafiras, San Miguel de Abona (Tenerife Sur). Descubre la carta y reserva tu mesa.",
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
