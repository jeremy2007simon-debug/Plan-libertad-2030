"use client";

import { useState, type FormEvent } from "react";
import { RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";
import { useT } from "./i18n/LanguageProvider";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-none border-0 border-b border-surface-border bg-transparent py-3 text-ink placeholder:text-ink-dim-2 focus:border-terracota focus:outline-none transition-colors duration-300";
const labelClass = "text-xs tracking-[0.18em] uppercase text-ink-dim";

export function Reservas() {
  const t = useT();
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
          email: data.email || undefined,
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
              <SectionLabel index="05">{t.reservas.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
                {t.reservas.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-ink-dim leading-relaxed">
                {t.reservas.paragraph}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={RESTAURANT.phoneHref}
                  className="inline-flex items-center gap-3 text-ink transition-colors hover:text-terracota"
                >
                  <Icon name="phone" className="size-4 text-terracota" />
                  {RESTAURANT.phone}
                </a>
                <a
                  href={RESTAURANT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ink transition-colors hover:text-terracota"
                >
                  <Icon name="whatsapp" className="size-4 text-terracota" />
                  {t.reservas.callWhatsapp}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {status === "success" ? (
              <div className="rounded-[2px] border border-terracota/25 bg-terracota/[0.04] p-10 text-center">
                <p className="font-display text-2xl text-ink">
                  {t.reservas.successTitle}
                </p>
                <p className="mt-3 text-ink-dim">
                  {t.reservas.successBody(RESTAURANT.phone)}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold tracking-wide text-terracota underline underline-offset-4"
                >
                  {t.reservas.newReservation}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="nombre" className={labelClass}>
                    {t.reservas.form.name}
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder={t.reservas.form.namePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    {t.reservas.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t.reservas.form.emailPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="telefono" className={labelClass}>
                    {t.reservas.form.phone}
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    placeholder={t.reservas.form.phonePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="personas" className={labelClass}>
                    {t.reservas.form.guests}
                  </label>
                  <input
                    id="personas"
                    name="personas"
                    type="number"
                    min={1}
                    max={30}
                    required
                    placeholder={t.reservas.form.guestsPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="fecha" className={labelClass}>
                    {t.reservas.form.date}
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
                    {t.reservas.form.time}
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
                    {t.reservas.form.notes}
                  </label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    rows={3}
                    placeholder={t.reservas.form.notesPlaceholder}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="sm:col-span-2">
                  {status === "error" && (
                    <p className="mb-4 text-sm text-red-400">
                      {t.reservas.errorBody(RESTAURANT.phone)}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-cta px-8 py-4 text-sm font-semibold tracking-wide text-cream shadow-[0_10px_40px_-12px_var(--cta-glow)] transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {status === "loading"
                      ? t.reservas.form.submitting
                      : t.reservas.form.submit}
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
