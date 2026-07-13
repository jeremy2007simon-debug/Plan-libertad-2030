import Link from "next/link";
import { RESTAURANT } from "@/lib/constants";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

export function Footer() {
  return (
    <footer className="relative border-t border-hair bg-bg pt-20 pb-10">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-xl text-ink">
              El <span className="text-gold italic">Mexicano</span>
            </p>
            <p className="mt-4 max-w-[22ch] text-sm text-ink-dim">
              Cocina mexicana auténtica desde 1999, en el corazón de
              Guargacho.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-ink-dim-2">
              Contacto
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a href={RESTAURANT.phoneHref} className="text-ink-dim transition-colors hover:text-gold">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-dim transition-colors hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-ink-dim-2">
              Ubicación
            </p>
            <p className="mt-4 text-sm text-ink-dim">
              {RESTAURANT.address.line1}
              <br />
              {RESTAURANT.address.line2}
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-ink-dim-2">
              Síguenos
            </p>
            <div className="mt-4 flex gap-4">
              {/* Instagram oculto: no hay cuenta oficial confirmada todavía.
                  Mostrar en cuanto RESTAURANT.social.instagram tenga URL. */}
              {RESTAURANT.social.instagram && (
                <a
                  href={RESTAURANT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-ink-dim transition-colors hover:text-gold"
                >
                  <Icon name="instagram" className="size-5" />
                </a>
              )}
              {RESTAURANT.social.facebook && (
                <a
                  href={RESTAURANT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-ink-dim transition-colors hover:text-gold"
                >
                  <Icon name="facebook" className="size-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-hair pt-8 text-xs text-ink-dim-2 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {RESTAURANT.name}. Todos los
            derechos reservados.
          </p>
          <Link href="/privacidad" className="transition-colors hover:text-gold">
            Política de privacidad
          </Link>
        </div>
      </Container>
    </footer>
  );
}
