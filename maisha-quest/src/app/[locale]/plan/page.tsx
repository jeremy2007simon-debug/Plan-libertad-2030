import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { JourneyPlanner } from "@/components/planner/JourneyPlanner";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PHOTOS } from "@/data/photography";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getDestinations, getSafariBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/plan",
    title: t.meta.plan.title,
    description: t.meta.plan.description,
  });
}

/**
 * Página del planificador.
 *
 * Acepta `?safari=slug` desde el botón "Customize" de cualquier tarjeta: llega
 * con los destinos de ese viaje ya marcados y una nota de partida, para que
 * personalizar un viaje no signifique empezar de cero.
 */
export default async function PlanPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ safari?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  const [{ safari: safariSlug }, destinations] = await Promise.all([
    searchParams,
    getDestinations(locale),
  ]);

  // El slug llega de la URL, así que se valida contra el catálogo: uno que no
  // existe devuelve `undefined` y la página se pinta como planificador normal.
  // Nunca se interpola en el HTML sin pasar por aquí.
  const safari = safariSlug ? await getSafariBySlug(locale, safariSlug) : undefined;

  return (
    <>
      {/* Con fotografía: es la página de mayor intención de compra y era la
          única sin una sola imagen, lo que la dejaba plana justo donde hay que
          sostener el deseo mientras se rellena un formulario. */}
      <PageHero
        image={safari ? safari.image : PHOTOS["balloon-serengeti"]}
        eyebrow={t.home.planner.eyebrow}
        title={safari ? t.plan.customizeTitle(safari.name) : t.home.planner.title}
        lede={safari ? t.plan.customizeLede : t.plan.lede}
      />

      <div className="bg-page py-14 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ol className="flex flex-col gap-8">
                {t.plan.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="tnum eyebrow shrink-0 pt-1 text-gold-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-display block text-[1.2rem] leading-tight text-forest">
                        {step.title}
                      </span>
                      <span className="mt-2 block text-[0.92rem] leading-relaxed text-ink-soft">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="relative mt-10 hidden aspect-4/5 overflow-hidden lg:block">
                <Photo
                  photo={PHOTOS["lake-manyara-giraffe"]}
                  alt=""
                  sizes="(max-width: 1024px) 0px, 28vw"
                />
              </div>

              <div className="mt-10 border-t border-rule pt-8">
                <CompassMark className="size-7 text-gold" needle={false} />
                <p className="eyebrow mt-4 text-ink-faint">{t.home.planner.ratherTalk}</p>
                <a
                  href={COMPANY.phoneHref}
                  className="font-display mt-2 block text-[1.35rem] text-forest transition-colors duration-300 hover:text-terracotta-text"
                >
                  {COMPANY.phone}
                </a>
                <a
                  href={COMPANY.emailHref}
                  className="mt-1 block text-[0.95rem] text-ink-soft transition-colors duration-300 hover:text-terracotta-text"
                >
                  {COMPANY.email}
                </a>
                <p className="mt-3 text-[0.85rem] text-ink-faint">
                  {t.company.hours}
                  <br />
                  {COMPANY.hours.timezone}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <JourneyPlanner
                locale={locale}
                t={t.planner}
                requiredLabel={t.a11y.required}
                hours={t.company.hours}
                destinations={destinations.map((destination) => ({
                  slug: destination.slug,
                  name: destination.name,
                  region: t.regions[destination.region],
                }))}
                initialSafari={
                  safari
                    ? {
                        slug: safari.slug,
                        name: safari.name,
                        destinationSlugs: safari.routeDestinationSlugs,
                      }
                    : null
                }
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
