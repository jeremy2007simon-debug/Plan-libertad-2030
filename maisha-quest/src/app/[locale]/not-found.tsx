import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * 404 con la brújula: perderse forma parte del viaje, pero hay salida.
 *
 * `not-found.tsx` no recibe `params`, así que no puede saber el idioma de la
 * ruta que ha fallado. Se compone en inglés, que es el mismo criterio que usa
 * la raíz cuando no hay nada que deducir, y los enlaces apuntan al inglés para
 * no fabricar una ruta que tampoco existiría.
 */
export default async function NotFound() {
  const locale = DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  return (
    <section className="flex min-h-[70svh] items-center bg-page pt-[var(--header-h)]">
      <Container width="prose" className="py-20 text-center">
        <CompassMark className="mx-auto size-14 text-gold" />
        <h1 className="text-h1 mt-8 text-forest">{t.notFound.title}</h1>
        <p className="text-lede mx-auto mt-5 max-w-lg text-ink-soft">
          {t.notFound.body}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/safaris" locale={locale} variant="primary">
            {t.nav.items.allSafaris}
          </ButtonLink>
          <ButtonLink href="/destinations" locale={locale} variant="secondary">
            {t.nav.items.destinations}
          </ButtonLink>
          <ButtonLink href="/contact" locale={locale} variant="secondary">
            {t.notFound.contact}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
