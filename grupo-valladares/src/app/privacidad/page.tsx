import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="bg-bg py-32 text-ink">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm text-ink-dim hover:text-ink">
          ← Volver
        </Link>
        <h1 className="mt-8 font-display text-4xl font-medium tracking-tight">
          Política de privacidad
        </h1>
        <p className="mt-6 text-ink-dim leading-relaxed">
          Este documento es un marcador de posición. {COMPANY.name} sustituirá
          este texto por su política de privacidad definitiva, conforme al
          Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD, antes de la
          publicación de esta web.
        </p>
      </Container>
    </main>
  );
}
