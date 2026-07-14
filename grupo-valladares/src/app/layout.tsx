import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const siteUrl = "https://grupovalladares.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} · Recambios y suministros para profesionales`,
    template: `%s · ${COMPANY.name}`,
  },
  description:
    "Distribución de recambios, lubricantes y suministros para talleres y particulares. Rapidez, disponibilidad y asesoramiento técnico.",
  keywords: [
    "recambios de automoción",
    "distribución de recambios",
    "suministros para talleres",
    "lubricantes profesionales",
    "recambios para talleres",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: COMPANY.name,
    title: `${COMPANY.name} · El socio que mueve tu taller`,
    description:
      "Soluciones en recambios y suministros para profesionales y particulares.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
