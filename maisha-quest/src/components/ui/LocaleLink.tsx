import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localeHref } from "@/i18n/config";

/**
 * `<Link>` con prefijo de idioma.
 *
 * Es la única forma admitida de enlazar dentro del sitio. Escribir
 * `<Link href="/safaris">` a pelo saca al visitante de su idioma sin avisar,
 * así que ese patrón no debe aparecer en ningún componente: el `href` que se
 * le pasa aquí es siempre la ruta neutra y el prefijo lo pone este componente.
 *
 * Rutas que no empiezan por `/` (externas, `tel:`, `mailto:`, anclas) pasan
 * intactas, para poder usarlo sin comprobar el tipo de enlace en cada sitio.
 */
export function LocaleLink({
  locale,
  href,
  ...rest
}: { locale: Locale; href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return <Link href={localeHref(locale, href)} {...rest} />;
}
