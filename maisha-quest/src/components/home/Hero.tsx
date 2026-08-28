import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { HOME_COORDINATES } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import type { MediaVideo } from "@/types/content";

/**
 * Hero.
 *
 * Sin JavaScript: la entrada es CSS puro (opacidad y un desplazamiento corto,
 * escalonados) y la fotografía deriva muy lentamente con `transform`, así que
 * no hay reflow ni trabajo en el hilo principal. Con `prefers-reduced-motion`
 * todo queda quieto y colocado.
 *
 * La imagen lleva `priority`: es el LCP de la página y debe empezar a
 * descargarse en el primer viaje al servidor.
 *
 * VÍDEO: el cliente entregó dos vídeos verticales sin comprimir; ninguno sirve
 * como hero horizontal de escritorio (estirar un 1080×1920 a pantalla completa
 * se ve mal y pesa 45 MB). Cuando exista el montaje horizontal comprimido, se
 * pasa por la prop `video` y este componente lo reproduce sobre la fotografía,
 * que se queda como póster. Hasta entonces, foto real.
 */
export function Hero({
  locale,
  t,
  video,
}: {
  locale: Locale;
  t: Dictionary;
  video?: MediaVideo;
}) {
  // Fotografía del cliente: siluetas de fauna cruzando el horizonte al
  // atardecer. Su `objectPosition` mantiene el sol y las siluetas dentro del
  // recorte también en vertical, donde el hero pierde el 70 % del ancho.
  const image = CLIENT_PHOTOS["tanzania-wildlife-sunset-hero"];

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-charcoal">
      {/* Fotografía */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-drift absolute inset-0 origin-center">
          <Photo photo={image} priority sizes="100vw" />
        </div>
        {video?.mp4 && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={image.src}
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          >
            {video.webm && <source src={video.webm} type="video/webm" />}
            <source src={video.mp4} type="video/mp4" />
          </video>
        )}
        {/* Dos velos cruzados: uno vertical que asienta el pie del encuadre y
            otro lateral bajo el texto. Juntos dan contraste AA sobre el cielo
            del amanecer sin bajar la fotografía a un gris plano. */}
        <div className="media-scrim absolute inset-0" />
        <div className="media-scrim-side absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

      <Container width="wide" className="pb-14 pt-32 sm:pb-20">
        <div className="max-w-3xl">
          <div className="animate-compass-in flex items-center gap-4">
            <CompassMark className="size-11 text-sand" />
            <span className="tnum text-[0.68rem] tracking-[0.22em] text-ivory/60 uppercase">
              {HOME_COORDINATES.label}
            </span>
          </div>

          <h1
            className="animate-fade-up text-display mt-8 text-ivory"
            style={{ animationDelay: "180ms" }}
          >
            {t.home.hero.headline}
          </h1>

          <p
            className="animate-fade-up text-lede measure mt-6 text-ivory/90"
            style={{ animationDelay: "320ms" }}
          >
            {t.home.hero.subline}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "440ms" }}
          >
            <ButtonLink href="/plan" locale={locale} variant="primary" size="lg">
              {t.home.hero.designCta}
            </ButtonLink>
            <ButtonLink
              href="/safaris"
              locale={locale}
              variant="secondary"
              tone="dark"
              size="lg"
            >
              {t.home.hero.exploreCta}
            </ButtonLink>
          </div>

          <ul
            className="animate-fade-up mt-11 flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5"
            style={{ animationDelay: "560ms" }}
          >
            {t.home.hero.pillars.map(
              (item, index) => (
                <li key={item} className="flex items-center gap-3 sm:gap-5">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-sand/50">
                      ·
                    </span>
                  )}
                  <span className="eyebrow text-ivory/75">{item}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </Container>

      {/* Indicación de scroll: decorativa, oculta a lectores de pantalla. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 right-6 hidden flex-col items-center gap-3 sm:flex"
      >
        <span className="eyebrow [writing-mode:vertical-rl] text-ivory/45">
          {t.home.hero.scroll}
        </span>
        <span className="animate-scroll-hint h-10 w-px bg-linear-to-b from-ivory/60 to-transparent" />
      </div>
    </section>
  );
}
