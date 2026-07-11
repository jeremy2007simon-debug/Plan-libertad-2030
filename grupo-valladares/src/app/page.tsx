import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Servicios } from "@/components/Servicios";
import { Perfiles } from "@/components/Perfiles";
import { Tiendas } from "@/components/Tiendas";
import { Presupuesto } from "@/components/Presupuesto";
import { Marcas } from "@/components/Marcas";
import { PorQueElegirnos } from "@/components/PorQueElegirnos";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { NovaCoreTeaser } from "@/components/NovaCoreTeaser";
import { StructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Perfiles />
        <Tiendas />
        <Presupuesto />
        <Marcas />
        <PorQueElegirnos />
        <CTA />
      </main>
      <Footer />
      <NovaCoreTeaser />
    </>
  );
}
