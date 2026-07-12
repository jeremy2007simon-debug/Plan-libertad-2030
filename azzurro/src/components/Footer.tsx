import Link from "next/link";
import { RESTAURANT } from "@/lib/constants";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

export function Footer() {
  return (
    <footer className="relative border-t border-hair bg-bg pb-10 pt-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-xl tracking-[0.06em] text-ink">
              AZZ<span className="italic text-gold">URRO</span>
            </p>
            <p className="mt-4 max-w-[24ch] text-sm text-ink-dim">
              Una propuesta de experiencia gastronómica elegante y moderna.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-ink-dim-2">
              Contacto
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={RESTAURANT.phoneHref}
                  className="text-ink-dim transition-colors hover:text-gold"
                >
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a
                  href="#reservas"
                  className="text-ink-dim transition-colors hover:text-gold"
                >
                  Reservar mesa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-ink-dim-2">
              Ubicación
            </p>
            <p className="mt-4 text-sm text-ink-dim">
              {RESTAURANT.address.locality}
              <br />
              {RESTAURANT.address.municipality}, Tenerife
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-ink-dim-2">
              Síguenos
            </p>
            <div className="mt-4 flex gap-4">
              {/* Instagram: sin cuenta oficial confirmada — oculto hasta
                  poder verificarla. */}
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
              <a
                href={RESTAURANT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-ink-dim transition-colors hover:text-gold"
              >
                <Icon name="facebook" className="size-5" />
              </a>
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
