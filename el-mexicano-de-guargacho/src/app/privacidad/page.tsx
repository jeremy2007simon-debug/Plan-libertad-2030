import type { Metadata } from "next";
import Link from "next/link";
import { RESTAURANT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-28 md:px-10">
      <Link href="/" className="text-sm text-terracota">
        ← Volver al inicio
      </Link>

      <h1 className="mt-8 font-display text-3xl font-light text-ink">
        Política de privacidad
      </h1>

      <p className="mt-6 text-sm text-ink-dim-2 italic">
        Texto de plantilla genérico. Debe ser revisado y adaptado por un
        profesional legal antes de publicarse, especialmente en lo relativo
        al tratamiento de los datos del formulario de reservas.
      </p>

      <div className="mt-10 flex flex-col gap-8 text-ink-dim leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-ink">
            Responsable del tratamiento
          </h2>
          <p className="mt-3">
            {RESTAURANT.name}, con dirección en {RESTAURANT.address.full}.
            Puedes contactar con nosotros en el teléfono {RESTAURANT.phone}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">
            Datos que recogemos
          </h2>
          <p className="mt-3">
            A través del formulario de reservas de esta web recogemos tu
            nombre, teléfono, número de comensales, fecha, hora y, si lo
            indicas, comentarios adicionales. Estos datos se utilizan
            exclusivamente para gestionar tu reserva.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">
            Conservación de los datos
          </h2>
          <p className="mt-3">
            Conservamos los datos de la reserva el tiempo necesario para
            gestionarla y durante el plazo legal exigible para atender
            posibles responsabilidades.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Tus derechos</h2>
          <p className="mt-3">
            Puedes ejercer tus derechos de acceso, rectificación, supresión
            y oposición contactando con nosotros en el teléfono indicado
            arriba.
          </p>
        </section>
      </div>
    </main>
  );
}
