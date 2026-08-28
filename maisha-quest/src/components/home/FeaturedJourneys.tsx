import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafariCard } from "@/components/safari/SafariCard";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { getFeaturedSafaris } from "@/lib/content";

/**
 * "Journeys worth remembering" — los viajes destacados de la home.
 *
 * En escritorio, rejilla de tres. En móvil, carrusel: tres tarjetas altas
 * apiladas sumaban 2.400 px de scroll para enseñar lo mismo, y leídas en
 * columna se parecían entre sí más de lo que en realidad se diferencian. Es la
 * misma tarjeta y los mismos datos; solo cambia la disposición.
 */
export async function FeaturedJourneys({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const safaris = await getFeaturedSafaris(locale, 3);
  if (safaris.length === 0) return null;

  return (
    <section className="bg-page py-24 sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow={t.home.featured.eyebrow}
          title={t.home.featured.title}
          lede={t.home.featured.lede}
        >
          <ButtonLink href="/safaris" locale={locale} variant="secondary">
            {t.nav.items.allSafaris}
          </ButtonLink>
        </SectionHeading>

        {/* Tableta y escritorio */}
        <Reveal className="mt-14 hidden md:block">
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {safaris.map((safari, index) => (
              <li key={safari.slug} className="flex">
                <SafariCard
                  safari={safari}
                  locale={locale}
                  t={t}
                  priority={index === 0}
                />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Móvil */}
        <div className="mt-10 md:hidden">
          <Carousel
            label={t.home.featured.title}
            itemClassName="w-[86vw] max-w-[22rem]"
          >
            {safaris.map((safari, index) => (
              <SafariCard
                key={safari.slug}
                safari={safari}
                locale={locale}
                t={t}
                priority={index === 0}
              />
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
