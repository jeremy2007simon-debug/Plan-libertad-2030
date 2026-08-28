import type { MetadataRoute } from "next";
import { COLLECTION_STRUCTURE } from "@/data/structure/collections";
import { DESTINATION_STRUCTURE } from "@/data/structure/destinations";
import { EXPERIENCE_STRUCTURE } from "@/data/structure/experiences";
import { JOURNAL_STRUCTURE } from "@/data/structure/journal";
import { SAFARI_STRUCTURE } from "@/data/structure/safaris";
import { LOCALES, LOCALE_META, localeHref } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap con las variantes de idioma.
 *
 * Sale de la misma estructura que las páginas, así que no puede quedarse
 * desincronizado ni listar rutas que ya no existen. Cada ruta aparece una vez
 * por idioma y cada entrada declara sus `alternates.languages`, de modo que el
 * buscador entiende que las seis son la misma página en distintos idiomas y no
 * contenido duplicado sin relación. `x-default` apunta al inglés, que es lo
 * que sirve la raíz cuando no se puede deducir nada del visitante.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: [string, number, Date][] = [
    ["/", 1, new Date()],
    ["/safaris", 0.9, new Date()],
    ["/plan", 0.9, new Date()],
    ["/destinations", 0.8, new Date()],
    ["/experiences", 0.8, new Date()],
    ["/about", 0.7, new Date()],
    ["/contact", 0.7, new Date()],
    ["/about/team", 0.6, new Date()],
    ["/impact", 0.6, new Date()],
    ["/journal", 0.6, new Date()],
    ["/faq", 0.6, new Date()],
    /*
     * Las cuatro páginas legales NO van en el sitemap.
     *
     * Las tres primeras están en borrador y salen con `noindex, nofollow`
     * hasta que su texto esté aprobado; los créditos no se indexan porque son
     * una página de atribución, no contenido. Un sitemap que anuncia páginas
     * marcadas «no indexar» se contradice a sí mismo, y es de las cosas que
     * un auditor SEO señala en el primer minuto.
     *
     * Vuelven aquí en cuanto los legales dejen de ser un borrador.
     */
    ...COLLECTION_STRUCTURE.map(
      (c) => [`/collections/${c.id}`, 0.8, new Date()] as [string, number, Date],
    ),
    ...SAFARI_STRUCTURE.map(
      (s) => [`/safaris/${s.slug}`, 0.8, new Date()] as [string, number, Date],
    ),
    ...DESTINATION_STRUCTURE.map(
      (d) => [`/destinations/${d.slug}`, 0.7, new Date()] as [string, number, Date],
    ),
    ...EXPERIENCE_STRUCTURE.map(
      (e) => [`/experiences/${e.slug}`, 0.6, new Date()] as [string, number, Date],
    ),
    ...JOURNAL_STRUCTURE.map(
      (p) => [`/journal/${p.slug}`, 0.5, new Date(p.date)] as [string, number, Date],
    ),
  ];

  return paths.flatMap(([path, priority, lastModified]) => {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) {
      languages[LOCALE_META[l].htmlLang] = `${SITE_URL}${localeHref(l, path)}`;
    }
    languages["x-default"] = `${SITE_URL}${localeHref("en", path)}`;

    return LOCALES.map((locale) => ({
      url: `${SITE_URL}${localeHref(locale, path)}`,
      lastModified,
      priority,
      alternates: { languages },
    }));
  });
}
