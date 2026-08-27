import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { OrganizationSchema } from "@/components/seo/StructuredData";
import { RevealScript } from "@/components/ui/Reveal";
import { COMPANY, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Dos familias y ninguna más — la web actual mezcla varias sin criterio.
 *
 * Cormorant Garamond para titulares (serif editorial, elegante en tamaños
 * medianos) y Manrope para texto e interfaz. Ambas con `display: swap` y sólo
 * los pesos que se usan, para no gastar presupuesto de carga en fuentes.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Maisha Quest · Private safaris in Tanzania",
    template: "%s · Maisha Quest",
  },
  description:
    "Private journeys through Tanzania, designed and guided by local experts based in Arusha. Serengeti, Ngorongoro, Kilimanjaro and Zanzibar, tailor-made around you.",
  applicationName: COMPANY.name,
  keywords: [
    "Tanzania safari",
    "private safari Tanzania",
    "Serengeti safari",
    "Ngorongoro Crater tour",
    "Kilimanjaro trek",
    "Zanzibar and safari",
    "tailor-made safari Arusha",
  ],
  authors: [{ name: COMPANY.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: COMPANY.name,
    title: "Private journeys through Tanzania · Maisha Quest",
    description:
      "Guided by local experts. Designed around your story. Tailor-made safaris across Tanzania, from a team based in Arusha.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private journeys through Tanzania · Maisha Quest",
    description:
      "Guided by local experts. Designed around your story. Tailor-made safaris across Tanzania.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0E7" },
    { media: "(prefers-color-scheme: dark)", color: "#26352B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <RevealScript />
      </head>
      <body>
        {/* Salto al contenido: primer elemento enfocable de la página. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCTABar />
        <OrganizationSchema />
      </body>
    </html>
  );
}
