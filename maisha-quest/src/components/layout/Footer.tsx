import Link from "next/link";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { type Locale, localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { FOOTER_NAV } from "@/lib/nav";
import { COMPANY, HOME_COORDINATES, socialLinks, whatsappHref } from "@/lib/site";
import { WhatsAppGlyph } from "./MobileCTABar";

/**
 * Pie de página.
 *
 * Verde profundo, tres columnas de navegación y un bloque de contacto con los
 * datos reales: teléfono, email, horario y zona horaria. Las coordenadas de
 * Arusha cierran el hilo de la brújula que abre el hero.
 */
export function Footer({
  locale,
  t,
  nav,
}: {
  locale: Locale;
  t: Dictionary["footer"];
  nav: Dictionary["nav"];
}) {
  const year = new Date().getFullYear();
  const socials = socialLinks();

  return (
    <footer className="dark-section bg-forest text-on-dark">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          {/* Marca y contacto */}
          <div>
            <div className="flex items-center gap-3 text-ivory">
              <CompassMark className="size-9 text-sand" />
              <span className="font-display text-[1.45rem]">Maisha Quest</span>
            </div>
            <p className="measure-narrow mt-5 text-[0.92rem] leading-relaxed text-on-dark-soft">
              {t.blurb}
            </p>

            <address className="mt-8 flex flex-col gap-1 not-italic">
              <a
                href={COMPANY.phoneHref}
                className="text-[0.95rem] text-ivory transition-colors duration-300 hover:text-sand"
              >
                {COMPANY.phone}
              </a>
              <a
                href={COMPANY.emailHref}
                className="text-[0.95rem] text-ivory transition-colors duration-300 hover:text-sand"
              >
                {COMPANY.email}
              </a>
              <a
                href={whatsappHref(nav.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 text-[0.9rem] text-on-dark-soft transition-colors duration-300 hover:text-sand"
              >
                <WhatsAppGlyph className="size-4" />
                {t.whatsapp}
              </a>
            </address>

            <div className="mt-6 flex flex-col gap-1 text-[0.85rem] text-on-dark-faint">
              <p>
                {COMPANY.hours.label}
                <span className="mx-2 opacity-50">·</span>
                {COMPANY.hours.timezone}
              </p>
              <p>{COMPANY.base}</p>
              <p className="tnum mt-2 tracking-[0.1em]">{HOME_COORDINATES.label}</p>
            </div>

            {/* Solo se pintan las redes con URL confirmada por el cliente.
                Hoy no hay ninguna, así que la lista no existe en el DOM. */}
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-5">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow text-on-dark-soft transition-colors duration-300 hover:text-sand"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navegación */}
          <nav aria-label={t.navLabel} className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((group) => (
              <div key={group.titleKey}>
                <h2 className="eyebrow text-sand">
                  {t.groups[group.titleKey as keyof typeof t.groups]}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={
                          // El sitemap es un documento XML único, sin idioma.
                          item.href.endsWith(".xml")
                            ? item.href
                            : localeHref(locale, item.href)
                        }
                        className="text-[0.92rem] text-on-dark-soft transition-colors duration-300 hover:text-ivory"
                      >
                        {nav.items[item.key as keyof typeof nav.items]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-rule-on-dark pt-7 text-[0.8rem] text-on-dark-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Maisha Quest. {t.rights}
          </p>
          <p className="italic">{COMPANY.legacyTagline}</p>
        </div>
      </Container>

      {/* Espacio para la barra de acción móvil, que es fija. */}
      <div aria-hidden="true" className="h-[4.75rem] lg:hidden" />
    </footer>
  );
}
