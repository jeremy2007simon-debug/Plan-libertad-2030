import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { RESTAURANT } from "@/lib/constants";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
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

const siteUrl = "https://elmexicanodeguargacho.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${RESTAURANT.name} · Restaurante mexicano en Tenerife`,
    template: `%s · ${RESTAURANT.name}`,
  },
  description:
    "Restaurante mexicano en Guargacho, San Miguel de Abona (Tenerife Sur), desde 1999. Tacos, enchiladas, burritos y entrantes auténticos en un ambiente premium. Reserva tu mesa.",
  keywords: [
    "restaurante mexicano Tenerife",
    "restaurante mexicano Guargacho",
    "tacos Tenerife",
    "enchiladas Tenerife",
    "restaurante San Miguel de Abona",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: RESTAURANT.name,
    title: `${RESTAURANT.name} · Guargacho, Tenerife`,
    description:
      "México no se explica. Se vive. Cocina mexicana auténtica en Guargacho, Tenerife Sur, desde 1999.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
