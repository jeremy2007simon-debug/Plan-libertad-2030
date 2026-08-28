import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { OrganizationSchema } from "@/components/seo/StructuredData";
import { MotionScript } from "@/components/ui/motion";
import { getDictionary } from "@/i18n/dictionaries";
import { LOCALES, LOCALE_META, isLocale, localeHref } from "@/i18n/config";
import { alternatesFor } from "@/lib/seo";
import { COMPANY, SITE_URL } from "@/lib/site";
import "../globals.css";

/**
 * Dos familias y ninguna más — la web actual mezcla varias sin criterio.
 *
 * Cormorant Garamond para titulares (serif editorial) y Manrope para texto e
 * interfaz. Las dos incluyen cirílico, así que el ruso se compone con la misma
 * tipografía que el resto: no hay que cambiar de familia ni de personalidad.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Chino simplificado.
 *
 * Cormorant Garamond no contiene ni un solo hanzi: forzarla dejaría toda la
 * versión china compuesta con la fuente de respaldo del sistema, distinta en
 * cada dispositivo. Noto Serif SC es la contraparte real —serif de asta
 * modulada, editorial, con el mismo aire— y Noto Sans SC hace de Manrope.
 *
 * `preload: false` a propósito: solo se descargan cuando la página es china.
 * Google las sirve troceadas por rango unicode, así que ni siquiera entonces
 * baja la fuente entera.
 */
const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.home.title,
      template: `%s · ${COMPANY.name}`,
    },
    description: t.meta.home.description,
    applicationName: COMPANY.name,
    keywords: t.meta.keywords,
    authors: [{ name: COMPANY.name }],
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].intl.replace("-", "_"),
      url: `${SITE_URL}${localeHref(locale, "/")}`,
      siteName: COMPANY.name,
      title: t.meta.home.ogTitle,
      description: t.meta.home.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.home.ogTitle,
      description: t.meta.home.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0E7" },
    { media: "(prefers-color-scheme: dark)", color: "#26352B" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getDictionary(locale);
  const meta = LOCALE_META[locale];
  // La pila tipográfica se decide por sistema de escritura, no por idioma:
  // ruso y español comparten familia; el chino no puede.
  const fonts =
    meta.script === "han"
      ? `${notoSerifSC.variable} ${notoSansSC.variable}`
      : `${cormorant.variable} ${manrope.variable}`;

  return (
    <html lang={meta.htmlLang} className={fonts} data-script={meta.script}>
      <head>
        <MotionScript />
      </head>
      <body>
        {/* Salto al contenido: primer elemento enfocable de la página. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[2px] focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:text-parchment"
        >
          {t.a11y.skipToContent}
        </a>
        <Header locale={locale} t={t.nav} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t.footer} nav={t.nav} />
        <MobileCTABar locale={locale} t={t.nav} />
        <OrganizationSchema locale={locale} />
      </body>
    </html>
  );
}
