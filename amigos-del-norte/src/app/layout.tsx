import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { RESTAURANT } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const siteUrl = "https://amigosdelnorte.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${RESTAURANT.name} · Restaurante en Las Chafiras, Tenerife`,
    template: `%s · ${RESTAURANT.name}`,
  },
  description:
    "Restaurante familiar en Las Chafiras, San Miguel de Abona (Tenerife Sur). Carnes a la brasa, comida canaria y pescados frescos. Reserva tu mesa.",
  keywords: [
    "restaurante Las Chafiras",
    "restaurante Tenerife Sur",
    "carnes a la brasa Tenerife",
    "comida canaria Tenerife",
    "restaurante San Miguel de Abona",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: RESTAURANT.name,
    title: `${RESTAURANT.name} · Las Chafiras, Tenerife`,
    description:
      "Tradición, calidad y sabor en cada plato. Restaurante familiar en Las Chafiras, Tenerife Sur.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
