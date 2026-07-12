import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Experiencia } from "@/components/Experiencia";
import { Especialidades } from "@/components/Especialidades";
import { Galeria } from "@/components/Galeria";
import { Reservas } from "@/components/Reservas";
import { Opiniones } from "@/components/Opiniones";
import { Ubicacion } from "@/components/Ubicacion";
import { CTAFinal } from "@/components/CTAFinal";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <Experiencia />
        <Especialidades />
        <Galeria />
        <Reservas />
        <Opiniones />
        <Ubicacion />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
