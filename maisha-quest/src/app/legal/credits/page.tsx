import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { allCredits } from "@/data/photography";

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Attribution for the provisional documentary photography of Tanzania used on this website.",
  alternates: { canonical: "/legal/credits" },
  robots: { index: false, follow: true },
};

/**
 * Créditos fotográficos.
 *
 * Cumple la atribución que exigen las licencias Creative Commons de las fotos
 * provisionales, y sirve además de inventario para el cliente: la lista se
 * genera sola desde el registro, así que cuando se sustituya una imagen por
 * fotografía propia desaparece de aquí automáticamente.
 */
export default function CreditsPage() {
  const credits = allCredits().filter((photo) => photo.provisional);

  return (
    <>
      <PageHero
        eyebrow="Credits"
        title="Photography credits"
        lede="The images on this site are provisional documentary photographs of Tanzania, used under Creative Commons licences while Maisha Quest's own photography is prepared."
      />

      <div className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <p className="measure text-[0.96rem] leading-relaxed text-ink-soft">
            Every image below was selected because its source record confirms
            both the country and the subject — so no species or landscape that
            does not belong to Tanzania appears anywhere on this site. None of
            these photographs were taken by Maisha Quest, and none of them show
            Maisha Quest guests, guides, vehicles or camps.
          </p>

          {credits.length === 0 ? (
            <p className="mt-10 text-[0.96rem] text-ink-soft">
              All photography on this site is now Maisha Quest&rsquo;s own.
            </p>
          ) : (
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {credits.map((photo) => (
                <li key={photo.id}>
                  <div className="relative aspect-3/2 overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 30vw"
                      placeholder="blur"
                      blurDataURL={photo.blurDataURL}
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-[0.9rem] leading-snug text-forest">
                    {photo.alt}
                  </p>
                  <p className="mt-1.5 text-[0.82rem] text-ink-faint">
                    {photo.credit.author} · {photo.credit.license}
                  </p>
                  <a
                    href={photo.credit.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[0.8rem] break-words text-ink-soft underline underline-offset-4 hover:text-terracotta"
                  >
                    Source and licence
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
    </>
  );
}
