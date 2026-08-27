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
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string[]; pending?: boolean }[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={intro} />

      <div className="bg-page py-16 sm:py-20">
        <Container width="prose">
          <p className="border-l-2 border-gold bg-sand/12 py-4 pl-5 text-[0.9rem] leading-relaxed text-ink-soft">
            This page is being finalised with Maisha Quest&rsquo;s legal adviser.
            Until it is, the terms that apply to your booking are the ones set
            out in writing in your booking confirmation. Ask us at{" "}
            <a
              href={COMPANY.emailHref}
              className="text-forest underline underline-offset-4"
            >
              {COMPANY.email}
            </a>{" "}
            for the current version.
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
                  Full wording for this section is pending legal review.
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
