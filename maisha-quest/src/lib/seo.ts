import type { Metadata } from "next";
import { LOCALES, LOCALE_META, type Locale, localeHref } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

/**
 * `canonical` + `hreflang` + `x-default` para una ruta.
 *
 * `path` es la ruta SIN prefijo de idioma (`/safaris/serengeti-under-canvas`).
 * Los slugs no se traducen a propósito: son identificadores estables que atan
 * el safari, sus destinos y sus experiencias entre sí. Traducirlos rompería
 * esas relaciones y obligaría a mantener seis mapas de redirecciones, a cambio
 * de un beneficio SEO discutible. Lo que sí cambia —y es lo que leen buscador
 * y visitante— es todo el contenido de la página.
 *
 * `x-default` apunta al inglés: es el idioma que sirve la raíz cuando no
 * podemos deducir nada del visitante.
 */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[LOCALE_META[l].htmlLang] = `${SITE_URL}${localeHref(l, path)}`;
  }
  languages["x-default"] = `${SITE_URL}${localeHref("en", path)}`;

  return {
    canonical: `${SITE_URL}${localeHref(locale, path)}`,
    languages,
  };
}

/**
 * Metadatos completos de una página interior: título y descripción ya
 * traducidos, más canonical, hreflang y Open Graph en el idioma correcto.
 * Un solo sitio para que ninguna página mezcle idiomas en su `<head>`.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].intl.replace("-", "_"),
      url: `${SITE_URL}${localeHref(locale, path)}`,
      title,
      description,
      ...(image
        ? { images: [{ url: image.src, alt: image.alt }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image.src] } : {}),
    },
  };
}
