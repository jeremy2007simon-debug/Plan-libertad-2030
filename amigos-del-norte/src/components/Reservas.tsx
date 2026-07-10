"use client";

import { useState, type FormEvent } from "react";
import { RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-none border-0 border-b border-surface-border bg-transparent py-3 text-ink placeholder:text-ink-dim-2 focus:border-gold focus:outline-none transition-colors duration-300";
const labelClass = "text-xs tracking-[0.18em] uppercase text-ink-dim";

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
    <section id="reservas" className="relative bg-bg-elevated py-28 md:py-36">
      <Container>
        <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <div>
            <Reveal>
              <SectionLabel index="04">Reservas</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
                Reserva tu mesa
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-ink-dim leading-relaxed">
                Cuéntanos cuándo quieres venir y te confirmaremos la reserva.
                Si lo prefieres, también puedes llamarnos directamente.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={RESTAURANT.phoneHref}
                  className="inline-flex items-center gap-3 text-ink transition-colors hover:text-gold"
                >
                  <Icon name="phone" className="size-4 text-gold" />
                  {RESTAURANT.phone}
                </a>
                <a
                  href={RESTAURANT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ink transition-colors hover:text-gold"
                >
                  <Icon name="whatsapp" className="size-4 text-gold" />
                  Reservar por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {status === "success" ? (
              <div className="rounded-[2px] border border-gold/25 bg-gold/[0.04] p-10 text-center">
                <p className="font-display text-2xl text-ink">
                  Solicitud recibida
                </p>
                <p className="mt-3 text-ink-dim">
                  Gracias, hemos registrado tu solicitud de reserva. Te
                  confirmaremos la mesa lo antes posible. Si tu reserva es
                  urgente, llámanos directamente al {RESTAURANT.phone}.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold tracking-wide text-gold underline underline-offset-4"
                >
                  Hacer otra reserva
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
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
                  <label htmlFor="comentarios" className={labelClass}>
                    Comentarios
                  </label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    rows={3}
                    placeholder="Alergias, ocasión especial, silla para bebé…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="sm:col-span-2">
                  {status === "error" && (
                    <p className="mb-4 text-sm text-red-400">
                      No hemos podido enviar tu solicitud. Prueba de nuevo o
                      llámanos al {RESTAURANT.phone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-bg shadow-[0_10px_40px_-12px_var(--gold-glow)] transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando…" : "Reservar mesa"}
                    {status !== "loading" && (
                      <Icon
                        name="arrowRight"
                        className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                      />
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
