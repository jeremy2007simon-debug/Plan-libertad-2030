import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { ParallaxMedia } from "@/components/ui/motion";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { COMPANY } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { getPhotoAlt } from "@/i18n/alt";
import { HeroFilmButton } from "./HeroFilmButton";

/**
 * Portada.
 *
 * Segunda pasada de diseño de la portada, a partir de una referencia visual
 * que el cliente facilitó (composición de un operador de safari de gama
 * alta): fotografía a sangre, cabecera de tres zonas superpuesta, marca
 * centrada con una línea de bienvenida encima, un botón circular de
 * reproducción entre dos filetes horizontales, y ubicación + descripción en
 * la fila inferior. Ni el nombre, ni el logotipo, ni las imágenes de esa
 * referencia se han copiado — solo la distribución y las proporciones; el
 * contenido, la paleta y los seis idiomas son los propios de Maisha Quest.
 *
 * El titular anterior ("Private journeys through Tanzania") deja de ser el
 * `<h1>` visual, pero no desaparece del todo: su antigua segunda línea
 * (`subline`) se reutiliza tal cual como la descripción breve de la esquina
 * inferior derecha, porque ya era una frase real sobre el negocio, no un
 * relleno. El `<h1>` en sí pasa a ser "Welcome to" + "Maisha Quest": las dos
 * líneas viven DENTRO del mismo `<h1>` —nunca un `<p>` suelto delante— para
 * que el nombre accesible siga siendo una frase completa y no una marca
 * pelada sin contexto.
 *
 * El vídeo de 35 s ya no vive aquí de ninguna forma: `HeroFilmButton` monta
 * su propio overlay y no toca el documento hasta que alguien pulsa el botón.
 * Sin JavaScript, o antes del primer clic, la portada es exactamente esta
 * fotografía y este texto — nunca una introducción a medio cargar.
 *
 * Sin JavaScript: la entrada es CSS puro (opacidad y un desplazamiento corto)
 * y la fotografía hace un zoom lentísimo con `transform`. Con
 * `prefers-reduced-motion` todo queda quieto y colocado — ver `:root[data-js]`
 * en `globals.css`, que es lo único que activa estas clases `animate-*`.
 *
 * La imagen lleva `preload`: es el LCP de la página.
 */
export async function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const alt = await getPhotoAlt(locale);
  // Misma fotografía autorizada que llevaba la portada anterior: siluetas de
  // fauna cruzando el horizonte al atardecer.
  const image = CLIENT_PHOTOS["tanzania-wildlife-sunset-hero"];

  return (
    <section className="dark-section relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-charcoal">
      {/* Fotografía */}
      <div className="absolute inset-0 -z-10">
        <ParallaxMedia strength={26} className="absolute -inset-y-12 inset-x-0">
          <div className="animate-hero-zoom absolute inset-0 origin-center">
            <Photo photo={image} alt={alt[image.altKey]} preload sizes="100vw" />
          </div>
        </ParallaxMedia>
        {/* Oscurecimiento sutil y uniforme, no solo en un borde: la
            composición centrada necesita contraste en medio de la fotografía,
            no únicamente al pie. Conserva el color, no lo apaga. */}
        <div className="hero-scrim absolute inset-0" />
        <div className="media-scrim-top absolute inset-x-0 top-0 h-[8rem]" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Bloque central: bienvenida, marca y botón de reproducción */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 pt-[calc(var(--header-h)+1.5rem)] pb-14 text-center sm:px-8">
        <h1 className="text-parchment">
          <span
            className="animate-fade-up eyebrow block"
            style={{ animationDelay: "160ms" }}
          >
            {t.home.hero.welcome}
          </span>{" "}
          <span className="mt-4 block overflow-hidden pb-[0.1em] sm:mt-5">
            <span
              className="animate-line-up font-display block text-[clamp(2.75rem,9vw,7rem)] leading-[0.98] tracking-[0.01em] uppercase"
              style={{ animationDelay: "300ms" }}
            >
              Maisha Quest
            </span>
          </span>
        </h1>

        <div
          className="animate-fade-up mt-10 flex w-full max-w-md items-center gap-4 sm:mt-14 sm:max-w-lg sm:gap-6"
          style={{ animationDelay: "560ms" }}
        >
          <span aria-hidden="true" className="h-px flex-1 bg-parchment/35" />
          <HeroFilmButton t={t.home.hero.video} />
          <span aria-hidden="true" className="h-px flex-1 bg-parchment/35" />
        </div>
      </div>

      {/* Fila inferior: ubicación real a la izquierda, descripción a la
          derecha — en móvil se apilan en el mismo orden. */}
      <div className="relative pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Container width="wide">
          <div
            className="animate-fade-up flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
            style={{ animationDelay: "720ms" }}
          >
            <p className="eyebrow text-parchment">{COMPANY.base}</p>
            <p className="measure-narrow text-[0.85rem] leading-relaxed text-parchment sm:text-right">
              {t.home.hero.subline}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
