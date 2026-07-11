import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { COMPANY, STORES, SCHEDULE } from "@/lib/constants";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="relative border-t border-hair bg-bg pt-20 pb-10">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-ink">
              GRUPO <span className="text-blue-dim">VALLADARES</span>
            </p>
            <p className="mt-4 max-w-[26ch] text-sm text-ink-dim">
              Soluciones en recambios y suministros para profesionales y
              particulares.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-dim-2 uppercase">
              Contacto
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a href={COMPANY.phoneHref} className="text-ink-dim transition-colors hover:text-blue-dim">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={COMPANY.emailHref} className="text-ink-dim transition-colors hover:text-blue-dim">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-dim transition-colors hover:text-blue-dim"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-dim-2 uppercase">
              Ubicaciones
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-dim">
              {STORES.map((store) => (
                <li key={store.slug}>{store.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-dim-2 uppercase">
              Horario
            </p>
            <dl className="mt-4 flex flex-col gap-1.5 text-sm text-ink-dim">
              {SCHEDULE.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4">
                  <dt>{row.label}</dt>
                  <dd className="text-ink-dim-2">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex gap-4">
              <a
                href={COMPANY.social.instagram ?? "#"}
                aria-label="Instagram"
                className="text-ink-dim transition-colors hover:text-blue-dim"
              >
                <Instagram className="size-5" strokeWidth={1.5} />
              </a>
              <a
                href={COMPANY.social.linkedin ?? "#"}
                aria-label="LinkedIn"
                className="text-ink-dim transition-colors hover:text-blue-dim"
              >
                <Linkedin className="size-5" strokeWidth={1.5} />
              </a>
              <a
                href={COMPANY.social.facebook ?? "#"}
                aria-label="Facebook"
                className="text-ink-dim transition-colors hover:text-blue-dim"
              >
                <Facebook className="size-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-hair pt-8 text-xs text-ink-dim-2 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. Todos los derechos
            reservados.
          </p>
          <Link href="/privacidad" className="transition-colors hover:text-blue-dim">
            Política de privacidad
          </Link>
        </div>
      </Container>
    </footer>
  );
}
