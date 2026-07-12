"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
import { Icon } from "./ui/Icon";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-none border-0 border-b border-surface-border bg-transparent py-3 text-ink placeholder:text-ink-dim-2 focus:border-gold focus:outline-none transition-colors duration-300";
const labelClass = "text-xs tracking-[0.2em] uppercase text-ink-dim";

export function Reservas() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.nombre,
          phone: data.telefono,
          email: data.email,
          guests: Number(data.personas),
          date: data.fecha,
          time: data.hora,
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
    <section id="reservas" className="relative bg-bg-elevated py-28 md:py-40">
      <Container>
        <div className="grid gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <Reveal>
              <SectionIntro index="04">Reservas</SectionIntro>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.2vw,3.2rem)] font-light text-ink">
                Reserva tu mesa
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-sm leading-relaxed text-ink-dim">
                Una mesa puede reservarse en segundos. Cuéntanos cuándo
                quieres venir.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-10 max-w-sm text-xs leading-relaxed text-ink-dim-2 italic">
                Este formulario está preparado para conectarse a NovaCore
                Reserve, el motor de reservas — confirmación automática,
                recordatorios y aviso por WhatsApp se activarán junto con la
                integración.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {status === "success" ? (
              <GlassCard className="p-10 text-center" glow="gold">
                <p className="font-display text-2xl font-light text-ink">
                  Solicitud recibida
                </p>
                <p className="mt-3 text-ink-dim">
                  Gracias, hemos registrado tu solicitud de reserva. Te
                  confirmaremos la mesa lo antes posible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium tracking-wide text-gold underline underline-offset-4"
                >
                  Hacer otra reserva
                </button>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 md:p-10">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-7 sm:grid-cols-2"
                >
                  <div className="flex flex-col gap-2 sm:col-span-2">
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
                    <label htmlFor="fecha" className={labelClass}>
                      Fecha
                    </label>
                    <input
                      id="fecha"
                      name="fecha"
                      type="date"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="hora" className={labelClass}>
                      Hora
                    </label>
                    <input
                      id="hora"
                      name="hora"
                      type="time"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label htmlFor="personas" className={labelClass}>
                      Número de personas
                    </label>
                    <input
                      id="personas"
                      name="personas"
                      type="number"
                      min={1}
                      max={30}
                      required
                      placeholder="2"
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
                      placeholder="Alergias, ocasión especial…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    {status === "error" && (
                      <p className="mb-4 text-sm text-red-400">
                        No hemos podido enviar tu solicitud. Prueba de nuevo
                        más tarde.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-bg shadow-[0_10px_40px_-12px_var(--gold-glow)] transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      {status === "loading" ? "Enviando…" : "Reservar"}
                      {status !== "loading" && (
                        <Icon
                          name="arrowRight"
                          className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                        />
                      )}
                    </button>
                  </div>
                </form>
              </GlassCard>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
