"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-none border-0 border-b border-surface-border bg-transparent py-3 text-ink placeholder:text-ink-dim-2 focus:border-blue-dim focus:outline-none transition-colors duration-300";
const labelClass = "text-xs font-medium tracking-[0.14em] text-ink-dim uppercase";

export function Presupuesto() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.nombre,
          company: data.empresa,
          phone: data.telefono,
          email: data.email,
          vehicle: data.vehiculo,
          plate: data.matricula,
          part: data.pieza,
          notes: data.comentarios,
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="presupuesto" className="relative bg-bg-elevated py-28 md:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel index="05">Solicitud de presupuesto</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold tracking-tight text-ink text-balance">
                Cuéntanos qué necesitas.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-dim">
                Rellena el formulario con el máximo detalle posible y nuestro
                equipo técnico te responderá con el presupuesto ajustado a tu
                vehículo.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-3 text-ink transition-colors hover:text-blue-dim"
                >
                  {COMPANY.phone}
                </a>
                <a
                  href={COMPANY.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ink transition-colors hover:text-blue-dim"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {status === "success" ? (
              <div className="flex flex-col items-start rounded-2xl border border-blue-dim/25 bg-blue/[0.05] p-10">
                <CheckCircle2 className="size-8 text-blue-dim" strokeWidth={1.5} />
                <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                  Solicitud recibida
                </p>
                <p className="mt-3 text-ink-dim">
                  Gracias, hemos registrado tu solicitud. Te responderemos con
                  el presupuesto lo antes posible. Si es urgente, llámanos al{" "}
                  {COMPANY.phone}.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium text-blue-dim underline underline-offset-4"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className={labelClass}>
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="empresa" className={labelClass}>
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Opcional"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="telefono" className={labelClass}>
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    placeholder="600 000 000"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="vehiculo" className={labelClass}>
                    Vehículo
                  </label>
                  <input
                    id="vehiculo"
                    name="vehiculo"
                    type="text"
                    placeholder="Marca, modelo, año"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="matricula" className={labelClass}>
                    Matrícula
                  </label>
                  <input
                    id="matricula"
                    name="matricula"
                    type="text"
                    placeholder="0000 ABC"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="pieza" className={labelClass}>
                    Pieza solicitada
                  </label>
                  <input
                    id="pieza"
                    name="pieza"
                    type="text"
                    required
                    placeholder="Ej. Kit de frenos delanteros"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="comentarios" className={labelClass}>
                    Comentarios
                  </label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    rows={3}
                    placeholder="Cualquier detalle adicional que nos ayude a ajustar el presupuesto"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="sm:col-span-2">
                  {status === "error" && (
                    <p className="mb-4 text-sm text-red">
                      No hemos podido enviar tu solicitud. Prueba de nuevo o
                      llámanos al {COMPANY.phone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-blue px-8 py-4 text-sm font-medium tracking-tight text-white shadow-[0_10px_40px_-12px_var(--blue-glow)] transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando…" : "Solicitar presupuesto"}
                    {status !== "loading" && (
                      <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
