import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/site";

/**
 * Plantilla de página legal.
 *
 * ⚠️ Estos textos son un ESQUELETO, no asesoramiento jurídico. Marcan la
 * estructura y los apartados que la web necesita, pero las condiciones reales
 * —cancelaciones, pagos, responsabilidad, tratamiento de datos— tiene que
 * redactarlas o revisarlas un profesional con la normativa tanzana y la del
 * RGPD europeo, porque Maisha Quest vende a viajeros de la UE.
 *
 * Cada apartado sin contenido definitivo lo dice abiertamente en lugar de
 * mostrar un texto legal inventado, que sería peor que no tener página.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  notice,
  pendingLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly {
    readonly heading: string;
    readonly body: readonly string[];
    readonly pending?: boolean;
  }[];
  notice: { before: string; after: string };
  pendingLabel: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lede={intro} />

      <div className="bg-page py-16 sm:py-20">
        <Container width="prose">
          <p className="border-l-2 border-gold bg-sand/12 py-4 pl-5 text-[0.9rem] leading-relaxed text-ink-soft">
            {notice.before}{" "}
            <a
              href={COMPANY.emailHref}
              className="text-forest underline underline-offset-4"
            >
              {COMPANY.email}
            </a>{" "}
            {notice.after}
          </p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-display text-[1.5rem] leading-tight text-forest">
                {section.heading}
              </h2>
              {section.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
              {section.pending && (
                <p className="mt-4 text-[0.88rem] text-ink-faint italic">
                  {pendingLabel}
                </p>
              )}
            </section>
          ))}

          <p className="mt-14 border-t border-rule pt-8 text-[0.85rem] text-ink-faint">
            {COMPANY.name} · {COMPANY.base} · {COMPANY.email} · {COMPANY.phone}
          </p>
        </Container>
      </div>
    </>
  );
}
