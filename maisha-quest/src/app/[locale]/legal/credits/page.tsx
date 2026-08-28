import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/lib/seo";
import { allCredits } from "@/data/photography";
import { getPhotoAlt } from "@/i18n/alt";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.credits.title,
    description: t.credits.lede,
    alternates: alternatesFor(locale, "/legal/credits"),
    robots: { index: false, follow: true },
  };
}

/**
 * Créditos fotográficos.
 *
 * Cumple la atribución que exigen las licencias Creative Commons de las fotos
 * provisionales, y sirve además de inventario para el cliente: la lista se
 * genera sola desde el registro, así que cuando se sustituya una imagen por
 * fotografía propia desaparece de aquí automáticamente.
 */
export default async function CreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const alt = await getPhotoAlt(locale);
  // Dos grupos, y la distinción importa: esta página decía que TODAS las
  // imágenes eran provisionales de Commons y que ninguna era de Maisha Quest,
  // y eso dejó de ser cierto en cuanto se integró la fotografía del cliente.
  //
  // De la fotografía del cliente no se publica autor ni licencia porque no
  // constan: un crédito inventado sería peor que ninguno. Se declara lo que
  // sabemos —que la suministró la empresa— y nada más.
  const all = allCredits();
  const commons = all.filter((photo) => photo.provisional && photo.credit);
  const supplied = all.filter((photo) => photo.provenance);

  return (
    <>
      <PageHero
        eyebrow={t.credits.eyebrow}
        title={t.credits.title}
        lede={t.credits.lede}
      />

      <div className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <p className="measure text-[0.96rem] leading-relaxed text-ink-soft">
            {t.credits.body}
          </p>

          {supplied.length > 0 && (
            <section className="mt-14">
              <h2 className="text-h2 text-forest">{t.credits.ownTitle}</h2>
              <p className="measure mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {t.credits.ownBody}
              </p>
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {supplied.map((photo) => (
                  <li key={photo.id}>
                    <div className="relative aspect-3/2 overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={alt[photo.altKey]}
                        fill
                        sizes="(max-width: 640px) 100vw, 30vw"
                        placeholder="blur"
                        blurDataURL={photo.blurDataURL}
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 text-[0.9rem] leading-snug text-forest">
                      {alt[photo.altKey]}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {commons.length > 0 && (
            <section className="mt-16 border-t border-rule pt-14">
              <h2 className="text-h2 text-forest">{t.credits.ccTitle}</h2>
              <p className="measure mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {t.credits.ccBody}
              </p>
              <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {commons.map((photo) => (
                  <li key={photo.id}>
                    <div className="relative aspect-3/2 overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={alt[photo.altKey]}
                        fill
                        sizes="(max-width: 640px) 100vw, 30vw"
                        placeholder="blur"
                        blurDataURL={photo.blurDataURL}
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 text-[0.9rem] leading-snug text-forest">
                      {alt[photo.altKey]}
                    </p>
                    <p className="mt-1.5 text-[0.82rem] text-ink-faint">
                      {photo.credit?.author} · {photo.credit?.license}
                    </p>
                    <a
                      href={photo.credit?.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-[0.8rem] break-words text-ink-soft underline underline-offset-4 hover:text-terracotta-text"
                    >
                      {t.credits.sourceAndLicence}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </div>
    </>
  );
}
