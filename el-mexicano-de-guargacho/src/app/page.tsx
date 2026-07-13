import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Historia } from "@/components/Historia";
import { Especialidades } from "@/components/Especialidades";
import { Experiencia } from "@/components/Experiencia";
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
        <Historia />
        <Especialidades />
        <Experiencia />
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
