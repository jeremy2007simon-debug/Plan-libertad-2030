"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import {
  ACCOMMODATION_STYLES,
  BUDGET_RANGES,
  DURATIONS,
  EMPTY_PLANNER,
  readPlannerDraft,
  writePlannerDraft,
  clearPlannerDraft,
  STEPS,
  TRIP_TYPES,
  toContactRequest,
  validateStep,
  type Errors,
  type PlannerState,
  type StepId,
} from "@/lib/planner";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import { fill, plural, type PluralForms } from "@/i18n/format";
import type { Dictionary } from "@/i18n/messages/en";
import { COMPANY, whatsappHref } from "@/lib/site";

/**
 * Planificador de safari por pasos.
 *
 * Puntos que lo separan de un formulario de plantilla:
 *
 * - Guarda un borrador en `localStorage` en cada cambio, así que cerrar la
 *   pestaña no pierde veinte respuestas. Se borra al enviar con éxito.
 * - Valida al intentar avanzar, no mientras se escribe: corregir a alguien
 *   cada tecla es hostil. Los errores se anuncian con `role="alert"`.
 * - Mueve el foco al título de cada paso, para que quien navega con teclado o
 *   lector de pantalla sepa que ha cambiado de pantalla.
 * - Antispam sin CAPTCHA: campo trampa oculto + tiempo de cumplimentación. El
 *   servidor descarta lo que caiga en cualquiera de los dos.
 * - NO simula envíos. Si no hay backend configurado, lo dice y ofrece enviar
 *   el mismo resumen por email o WhatsApp, con todo ya escrito.
 */

/**
 * "2 adultos, 1 niño" en el idioma activo.
 *
 * La categoría de plural la elige `Intl.PluralRules`: el ruso necesita tres
 * formas y el chino ninguna, y una comparación con 1 solo acierta en inglés.
 */
function travellerCount(
  locale: Locale,
  t: { adultCount: PluralForms; childCount: PluralForms },
  adults: number,
  children: number,
): string {
  const first = plural(locale, adults, t.adultCount);
  return children > 0 ? first + plural(locale, children, t.childCount) : first;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; reference: string }
  | { kind: "unconfigured"; summary: string }
  | { kind: "error"; message: string };

export function JourneyPlanner({
  locale,
  t,
  requiredLabel,
  hours,
  destinations,
  /** Safari preseleccionado al llegar desde "Customize" en una tarjeta. */
  initialSafari,
}: {
  locale: Locale;
  /**
   * Solo la sección del planificador, no el diccionario entero: este es un
   * componente de cliente y el resto del diccionario contiene funciones de
   * traducción, que no pueden cruzar la frontera servidor→cliente de React.
   */
  t: Dictionary["planner"];
  /** `a11y.required`, ya traducido. */
  requiredLabel: string;
  /** `t.company.hours`, ya traducido. Ver `Footer` sobre por qué llega así. */
  hours: string;
  destinations: { slug: string; name: string; region: string }[];
  initialSafari?: { slug: string; name: string; destinationSlugs: string[] } | null;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<PlannerState>({
    ...EMPTY_PLANNER,
    // Quien navega en alemán espera que le respondan en alemán sin decirlo.
    preferredLanguage: locale,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [restored, setRestored] = useState(false);
  /** ¿Eligió el idioma de respuesta una persona? Ver `PlannerDraft`. */
  const [languageTouched, setLanguageTouched] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  // Se rellena en el montaje: llamar a Date.now() durante el render sería
  // impuro y rompería el renderizado concurrente.
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  /**
   * Identificador de esta solicitud, estable mientras dure el borrador.
   *
   * Si la conexión se corta después de que el servidor haya entregado la
   * solicitud pero antes de responder, el visitante ve un error y vuelve a
   * darle a enviar. Con el mismo identificador, el servidor devuelve la
   * referencia que ya emitió en lugar de mandar la solicitud dos veces.
   */
  const requestId = useRef<string>("");
  const isFirstRender = useRef(true);

  const stepId = STEPS[stepIndex];
  const step = t.steps[stepId];
  const isReview = stepId === "review";

  /* ---- Borrador local ---------------------------------------------------- */

  useEffect(() => {
    startedAt.current = Date.now();
    const draft = readPlannerDraft();
    requestId.current =
      draft?.requestId ||
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    if (draft) {
      // Leer el borrador es sincronizar con un sistema externo en el montaje.
      // No puede hacerse en el inicializador de useState porque el servidor no
      // tiene localStorage y el HTML no coincidiría al hidratar, así que aquí
      // la regla se salta a conciencia y solo en este bloque.
      /* eslint-disable react-hooks/set-state-in-effect */
      setState({
        ...draft.state,
        // El idioma de respuesta sigue al de la página salvo que lo haya
        // cambiado una persona. Al cambiar de idioma a mitad del formulario,
        // quien no lo tocó espera que le respondan en el idioma nuevo; quien
        // sí lo eligió espera que se respete su elección.
        preferredLanguage: draft.languageTouched ? draft.state.preferredLanguage : locale,
      });
      setLanguageTouched(draft.languageTouched);
      // El paso también se restaura: sin esto, cambiar de idioma en el paso 2
      // devolvía al visitante al paso 1 con las respuestas puestas.
      setStepIndex(draft.step);
      setRestored(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
    if (initialSafari) {
      setState((current) => ({
        ...current,
        destinationSlugs: current.destinationSlugs.length
          ? current.destinationSlugs
          : initialSafari.destinationSlugs,
        specialRequests:
          current.specialRequests ||
          fill(t.fields.prefilledNote, { name: initialSafari.name }),
      }));
    }
    // `locale` entra en las dependencias porque un cambio de idioma remonta el
    // componente: es exactamente cuando hay que releer el borrador.
  }, [initialSafari, locale, t.fields.prefilledNote]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    writePlannerDraft({
      version: 2,
      step: stepIndex,
      state,
      languageTouched,
      requestId: requestId.current,
    });
  }, [state, stepIndex, languageTouched]);

  /* ---- Navegación entre pasos -------------------------------------------- */

  const update = useCallback(<K extends keyof PlannerState>(key: K, value: PlannerState[K]) => {
    setState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }, []);

  const goTo = useCallback((index: number) => {
    setStepIndex(index);
    // Espera al repintado antes de mover el foco al nuevo título.
    requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  const next = () => {
    const found = validateStep(stepId, state);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    goTo(Math.min(stepIndex + 1, STEPS.length - 1));
  };

  const back = () => goTo(Math.max(stepIndex - 1, 0));

  /* ---- Envío ------------------------------------------------------------- */

  const summaryText = useMemo(
    () => buildSummary(state, destinations, locale, t),
    [state, destinations, locale, t],
  );

  const submit = async () => {
    // Revalida todos los pasos: nadie llega al resumen sin pasar por ellos,
    // pero un borrador restaurado podría estar incompleto.
    for (const candidate of STEPS) {
      const found = validateStep(candidate, state);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        goTo(STEPS.indexOf(candidate));
        return;
      }
    }

    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/journey-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          toContactRequest(state, {
            elapsedMs: Date.now() - startedAt.current,
            honeypot: honeypot.current?.value ?? "",
            locale,
            requestId: requestId.current,
          }),
        ),
      });

      const body = (await response.json()) as {
        status?: string;
        reference?: string;
        code?: keyof typeof t.status.delivery;
        message?: string;
      };

      if (response.status === 501 || body.status === "not-configured") {
        // El backend todavía no existe. Se dice, no se finge.
        setStatus({ kind: "unconfigured", summary: summaryText });
        return;
      }

      if (!response.ok) {
        /*
         * El mensaje se traduce AQUÍ, a partir del código que manda el
         * servidor. Antes se pintaba el `message` de la respuesta, que va en
         * inglés, y quien rellenaba el formulario en ruso y se topaba con el
         * limitador veía «Too many enquiries from this connection» en mitad de
         * su página en ruso.
         *
         * Ningún caso se descarta en silencio: un 429 se ve igual que un 502.
         */
        const known = body.code && body.code in t.status.delivery;
        setStatus({
          kind: "error",
          message: known
            ? t.status.delivery[body.code as keyof typeof t.status.delivery]
            : t.status.sendFailed,
        });
        return;
      }

      setStatus({ kind: "sent", reference: body.reference ?? "" });
      try {
        clearPlannerDraft();
      } catch {
        // Nada que hacer: el envío ya se completó.
      }
    } catch {
      setStatus({
        kind: "error",
        message: t.status.offline,
      });
    }
  };

  /* ---- Estados finales --------------------------------------------------- */

  if (status.kind === "sent") {
    return (
      <Panel>
        <CompassMark className="size-12 text-gold" />
        <h2 className="text-h2 mt-7 text-forest">{t.status.sentTitle}</h2>
        <p className="measure mt-5 text-[1rem] leading-relaxed text-ink-soft">
          {fill(t.status.sentBody, { name: state.firstName })}
          {status.reference && (
            <>
              {" "}
              {t.status.reference}{" "}
              <span className="tnum">{status.reference}</span>.
            </>
          )}
        </p>
        <ContactFallback
          label={t.status.inTheMeantime}
          hours={hours}
          className="mt-9"
        />
      </Panel>
    );
  }

  if (status.kind === "unconfigured") {
    return (
      <Panel>
        <CompassMark className="size-12 text-terracotta-text" />
        <h2 className="text-h2 mt-7 text-forest">
          {t.status.unconfiguredTitle}
        </h2>
        <p className="measure mt-5 text-[1rem] leading-relaxed text-ink-soft">
          {t.status.unconfiguredBody}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`${COMPANY.emailHref}?subject=${encodeURIComponent(
              `${t.summary.heading} — ${state.firstName} ${state.lastName}`.trim(),
            )}&body=${encodeURIComponent(status.summary)}`}
            className="inline-flex min-h-11 items-center rounded-[2px] bg-terracotta-deep px-6 py-3 text-[0.72rem] font-semibold tracking-[0.06em] text-white uppercase"
          >
            {t.status.sendByEmail}
          </a>
          <a
            href={whatsappHref(status.summary)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-[2px] border border-forest/35 px-6 py-3 text-[0.72rem] font-semibold tracking-[0.06em] text-forest uppercase"
          >
            {t.status.sendOnWhatsApp}
          </a>
        </div>

        <details className="mt-8 border-t border-rule pt-6">
          <summary className="eyebrow cursor-pointer text-ink-faint">
            {t.status.yourAnswers}
          </summary>
          <pre className="mt-4 overflow-x-auto text-[0.85rem] leading-relaxed whitespace-pre-wrap text-ink-soft">
            {status.summary}
          </pre>
        </details>
      </Panel>
    );
  }

  /* ---- Formulario -------------------------------------------------------- */

  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="border border-rule bg-cream">
      {/* Indicador de progreso: una ruta, no una barra de carga.

          El filete es el camino y el punto de brújula avanza por él. Se anima
          `transform: translateX` sobre el punto —no el `width` de la barra—
          para no recalcular el layout de la fila en cada paso; la barra de
          relleno sí crece, pero está sola dentro de su contenedor y no arrastra
          a nada. */}
      <div className="border-b border-rule px-6 py-5 sm:px-10">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow text-terracotta-text">
            {fill(t.stepOf, { n: stepIndex + 1, total: STEPS.length })}
          </p>
          <p className="eyebrow text-ink-faint">{step.label}</p>
        </div>
        <div
          className="relative mt-4 h-px w-full bg-rule"
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label={t.progress}
        >
          <div
            className="h-px bg-terracotta transition-[width] duration-[var(--dur-base)] ease-[var(--ease-out)]"
            style={{ width: `${progress}%` }}
          />
          {/* El punto se coloca con `left` en porcentaje y se centra sobre sí
              mismo. La primera versión usaba un tramo del 100 % del ancho
              desplazado por transform, y ese tramo sobresalía del contenedor:
              18 px de desbordamiento horizontal en toda la web. */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-terracotta transition-[left] duration-[var(--dur-base)] ease-[var(--ease-out)]"
            style={{ left: `${progress}%` }}
          >
            <CompassMark className="size-3.5" needle={false} />
          </span>
        </div>

        {/* Pasos ya completados: se puede volver a cualquiera. */}
        <ol className="no-scrollbar mt-4 flex gap-4 overflow-x-auto">
          {STEPS.map((candidate, index) => (
            <li key={candidate} className="shrink-0">
              <button
                type="button"
                disabled={index > stepIndex}
                onClick={() => goTo(index)}
                className={`tap-44 text-[0.75rem] tracking-[0.06em] uppercase transition-colors duration-[var(--dur-hover)] disabled:cursor-default ${
                  index === stepIndex
                    ? "font-semibold text-forest"
                    : index < stepIndex
                      ? "text-ink-faint underline decoration-rule underline-offset-4 hover:text-terracotta-text"
                      : "text-ink-faint"
                }`}
              >
                {t.steps[candidate].label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* `data-planner-step` lo lee la prueba de extremo a extremo para saber en
          qué paso está el formulario sin depender de un texto traducido. Ver
          `scripts/test-planner-locale.mjs`. */}
      <div
        data-planner-step={stepIndex}
        className="px-6 py-10 sm:px-10 sm:py-12"
      >
        {restored && stepIndex === 0 && (
          <p className="mb-7 border-l-2 border-gold pl-4 text-[0.88rem] text-ink-soft">
            {t.draftRestored}
          </p>
        )}

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-h2 text-forest outline-none"
        >
          {step.title}
        </h2>
        {step.help && (
          <p className="measure mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
            {step.help}
          </p>
        )}

        <div className="mt-9">
          {stepId === "trip" && (
            <ChoiceGrid
              name="tripType"
              options={TRIP_TYPES}
              labels={t.tripTypes}
              value={state.tripType}
              onChange={(value) => update("tripType", value)}
              error={errors.tripType && t.errors[errors.tripType]}
              legend={t.legends.tripType}
            />
          )}

          {stepId === "destinations" && (
            <fieldset>
              <legend className="sr-only">{t.review.destinations}</legend>
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((destination) => {
                  const checked = state.destinationSlugs.includes(destination.slug);
                  return (
                    <li key={destination.slug}>
                      <label
                        className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 border px-4 py-3 transition-colors duration-300 ${
                          checked
                            ? "border-terracotta bg-terracotta/8"
                            : "border-rule hover:border-forest/40"
                        }`}
                      >
                        <span>
                          <span className="block text-[0.95rem] text-forest">
                            {destination.name}
                          </span>
                          <span className="block text-[0.78rem] text-ink-faint">
                            {destination.region}
                          </span>
                        </span>
                        <input
                          type="checkbox"
                          className="size-4 accent-[#B56545]"
                          checked={checked}
                          onChange={(event) =>
                            update(
                              "destinationSlugs",
                              event.target.checked
                                ? [...state.destinationSlugs, destination.slug]
                                : state.destinationSlugs.filter(
                                    (slug) => slug !== destination.slug,
                                  ),
                            )
                          }
                        />
                      </label>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-[0.85rem] text-ink-faint">
                Not sure? Leave them all unticked and we will propose a route.
              </p>
            </fieldset>
          )}

          {stepId === "dates" && (
            <div className="flex flex-col gap-8">
              <Field
                label={t.fields.month}
                htmlFor="travelMonth"
                error={errors.travelMonth}
              >
                <input
                  id="travelMonth"
                  type="month"
                  value={state.travelMonth}
                  disabled={state.datesFlexible}
                  min={new Date().toISOString().slice(0, 7)}
                  onChange={(event) => update("travelMonth", event.target.value)}
                  className="min-h-12 w-full max-w-xs border border-rule bg-white px-4 text-[0.95rem] text-forest disabled:opacity-45"
                />
                <label className="mt-3 flex min-h-11 w-fit cursor-pointer items-center gap-2.5 text-[0.9rem] text-ink-soft">
                  <input
                    type="checkbox"
                    className="size-4 accent-[#B56545]"
                    checked={state.datesFlexible}
                    onChange={(event) => {
                      update("datesFlexible", event.target.checked);
                      if (event.target.checked) update("travelMonth", "");
                    }}
                  />
                  My dates are flexible
                </label>
              </Field>

              <ChoiceGrid
                name="durationDays"
                options={DURATIONS}
                labels={t.durations}
                value={state.durationDays}
                onChange={(value) => update("durationDays", value)}
                error={errors.durationDays && t.errors[errors.durationDays]}
                legend={t.legends.duration}
                columns={3}
              />
            </div>
          )}

          {stepId === "travellers" && (
            <div className="flex flex-col gap-8">
              <fieldset>
                <legend className="eyebrow text-ink-faint">{t.legends.travellers}</legend>
                <div className="mt-4 flex flex-wrap gap-8">
                  <Counter
                    label={t.fields.adults}
                    value={state.adults}
                    min={1}
                    onChange={(value) => update("adults", value)}
                    removeLabel={t.fields.removeAdult}
                    addLabel={t.fields.addAdult}
                  />
                  <Counter
                    label={t.fields.children}
                    hint={t.fields.childrenHint}
                    value={state.children}
                    min={0}
                    onChange={(value) => update("children", value)}
                    removeLabel={t.fields.removeChild}
                    addLabel={t.fields.addChild}
                  />
                </div>
                {errors.adults && <ErrorText>{t.errors[errors.adults]}</ErrorText>}
              </fieldset>

              <ChoiceGrid
                name="accommodationStyle"
                options={ACCOMMODATION_STYLES}
                labels={t.accommodationStyles}
                value={state.accommodationStyle}
                onChange={(value) => update("accommodationStyle", value)}
                error={
                  errors.accommodationStyle && t.errors[errors.accommodationStyle]
                }
                legend={t.legends.accommodation}
              />
            </div>
          )}

          {stepId === "budget" && (
            <ChoiceGrid
              name="budgetPerPerson"
              options={BUDGET_RANGES}
              labels={t.budgets}
              value={state.budgetPerPerson}
              onChange={(value) => update("budgetPerPerson", value)}
              error={errors.budgetPerPerson && t.errors[errors.budgetPerPerson]}
              legend={t.legends.budget}
              columns={3}
            />
          )}

          {stepId === "contact" && (
            <div className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label={t.fields.firstName}
                  htmlFor="firstName"
                  error={errors.firstName && t.errors[errors.firstName]}
                  required
                  requiredLabel={requiredLabel}
                >
                  <TextInput
                    id="firstName"
                    required
                    autoComplete="given-name"
                    value={state.firstName}
                    onChange={(value) => update("firstName", value)}
                    invalid={Boolean(errors.firstName)}
                  />
                </Field>
                <Field label={t.fields.lastName} htmlFor="lastName">
                  <TextInput
                    id="lastName"
                    autoComplete="family-name"
                    value={state.lastName}
                    onChange={(value) => update("lastName", value)}
                  />
                </Field>
                <Field
                  label={t.fields.email}
                  htmlFor="email"
                  error={errors.email && t.errors[errors.email]}
                  required
                  requiredLabel={requiredLabel}
                >
                  <TextInput
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={state.email}
                    onChange={(value) => update("email", value)}
                    invalid={Boolean(errors.email)}
                  />
                </Field>
                <Field label={t.fields.phone} htmlFor="phone">
                  <TextInput
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={state.phone}
                    onChange={(value) => update("phone", value)}
                  />
                </Field>
                <Field label={t.fields.country} htmlFor="country">
                  <TextInput
                    id="country"
                    autoComplete="country-name"
                    value={state.country}
                    onChange={(value) => update("country", value)}
                  />
                </Field>
                <Field label={t.fields.replyIn} htmlFor="preferredLanguage">
                  <select
                    id="preferredLanguage"
                    value={state.preferredLanguage}
                    onChange={(event) => {
                      setLanguageTouched(true);
                      update("preferredLanguage", event.target.value);
                    }}
                    className="min-h-12 w-full border border-rule bg-white px-4 text-[0.95rem] text-forest"
                  >
                    {LOCALES.map((code) => (
                      <option key={code} value={code}>
                        {LOCALE_META[code].nativeName}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={t.fields.notes} htmlFor="specialRequests">
                <textarea
                  id="specialRequests"
                  rows={4}
                  value={state.specialRequests}
                  onChange={(event) => update("specialRequests", event.target.value)}
                  placeholder={t.fields.notesPlaceholder}
                  className="w-full border border-rule bg-white px-4 py-3 text-[0.95rem] leading-relaxed text-forest placeholder:text-ink-faint"
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-ink-soft">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-[#B56545]"
                  checked={state.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                />
                <span>
                  {t.fields.consentLabel}
                  {errors.consent && <ErrorText>{errors.consent}</ErrorText>}
                </span>
              </label>

              {/* Trampa antispam: invisible y fuera del orden de tabulación,
                  pero un bot que rellena todo la marcará. */}
              <input
                ref={honeypot}
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute size-0 opacity-0"
              />
            </div>
          )}

          {isReview && (
            <Review
              state={state}
              destinations={destinations}
              onEdit={goTo}
              locale={locale}
              t={t}
            />
          )}
        </div>

        {status.kind === "error" && (
          <p
            role="alert"
            className="mt-8 border-l-2 border-terracotta bg-terracotta/6 py-3 pl-4 text-[0.9rem] text-ink"
          >
            {status.message} {t.status.orEmailUs}{" "}
            <a href={COMPANY.emailHref} className="underline underline-offset-4">
              {COMPANY.email}
            </a>
            .
          </p>
        )}

        {/* Navegación */}
        <div className="mt-11 flex flex-wrap items-center gap-4 border-t border-rule pt-7">
          {stepIndex > 0 && (
            <Button variant="secondary" onClick={back} type="button">
              {t.back}
            </Button>
          )}
          {isReview ? (
            <Button
              variant="primary"
              size="lg"
              onClick={submit}
              type="button"
              disabled={status.kind === "sending"}
            >
              {status.kind === "sending" ? t.sending : t.send}
            </Button>
          ) : (
            <Button variant="primary" onClick={next} type="button">
              {t.continue}
            </Button>
          )}
          <p className="ml-auto text-[0.8rem] text-ink-faint">
            {t.savedLocally}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Piezas del formulario
 * ----------------------------------------------------------------------- */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream px-6 py-14 sm:px-12 sm:py-16">{children}</div>
  );
}

function ErrorText({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <span
      id={id}
      role="alert"
      className="mt-2 block text-[0.83rem] text-terracotta-deep"
    >
      {children}
    </span>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  requiredLabel,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  /** "(obligatorio)" en el idioma activo, solo para lectores de pantalla. */
  requiredLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow block text-ink-faint">
        {label}
        {/* El asterisco es decorativo: si formara parte de la etiqueta, un
            lector de pantalla anunciaría "Email asterisco". La obligatoriedad
            se comunica con texto real, oculto visualmente, y con `required`
            en el propio campo. */}
        {required && (
          <>
            <span aria-hidden="true" className="ml-1 text-terracotta-text">
              *
            </span>
            <span className="sr-only"> {requiredLabel}</span>
          </>
        )}
      </label>
      {/* El error se asocia al campo con `aria-describedby`, no solo se
          anuncia: quien vuelve al campo con el tabulador después de que el
          anuncio haya pasado necesita volver a oír qué falla. El `role="alert"`
          cubre el momento del error; `aria-describedby`, todo lo demás. */}
      <div className="mt-2.5" aria-describedby={error ? `${htmlFor}-error` : undefined}>
        {children}
      </div>
      {error && <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText>}
    </div>
  );
}

function TextInput({
  id,
  value,
  onChange,
  type = "text",
  autoComplete,
  invalid,
  required,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  invalid?: boolean;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      autoComplete={autoComplete}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
      onChange={(event) => onChange(event.target.value)}
      className={`min-h-12 w-full border bg-white px-4 text-[0.95rem] text-forest ${
        invalid ? "border-terracotta" : "border-rule"
      }`}
    />
  );
}

function ChoiceGrid({
  name,
  options,
  labels,
  value,
  onChange,
  error,
  legend,
  columns = 2,
}: {
  name: string;
  /** Valores estables; no cambian de idioma. */
  options: readonly string[];
  /** Etiqueta y nota de cada valor, en el idioma activo. */
  labels: Record<string, { label: string; note?: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  legend: string;
  columns?: 2 | 3;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="eyebrow text-ink-faint">{legend}</legend>
      <ul
        className={`mt-4 grid gap-2.5 ${
          columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {options.map((option) => {
          const checked = value === option;
          const text = labels[option] ?? { label: option };
          return (
            <li key={option}>
              <label
                className={`flex min-h-14 cursor-pointer flex-col justify-center border px-4 py-3 transition-colors duration-300 ${
                  checked
                    ? "border-terracotta bg-terracotta/8"
                    : "border-rule hover:border-forest/40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={name}
                    value={option}
                    checked={checked}
                    onChange={() => onChange(option)}
                    className="size-4 accent-[#B56545]"
                  />
                  <span className="text-[0.95rem] text-forest">{text.label}</span>
                </span>
                {text.note && (
                  <span className="mt-1 pl-7 text-[0.78rem] text-ink-faint">
                    {text.note}
                  </span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </fieldset>
  );
}

function Counter({
  label,
  hint,
  value,
  min,
  onChange,
  removeLabel,
  addLabel,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
  /**
   * Nombres accesibles de los dos botones, YA COMPLETOS.
   *
   * Primero fueron `One fewer ${label}` en el código, y un lector de pantalla
   * en español anunciaba «One fewer adultos». Al pasarlos al diccionario se
   * quedaron como plantilla con un hueco —«Un {label} menos»— y el resultado
   * seguía sin ser gramatical: «Un adultos menos».
   *
   * Ahora llegan hechos. No se componen aquí porque no se pueden componer: el
   * verbo alemán rige acusativo y cambia el artículo («einen Erwachsenen»,
   * «ein Kind»), el ruso declina el sustantivo, y el chino usa un clasificador
   * distinto para personas adultas y para menores. Cuatro frases, cuatro
   * traducciones.
   */
  removeLabel: string;
  addLabel: string;
}) {
  return (
    <div>
      <p className="text-[0.95rem] text-forest">
        {label}
        {hint && <span className="ml-2 text-[0.78rem] text-ink-faint">{hint}</span>}
      </p>
      <div className="mt-2.5 flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={removeLabel}
          className="flex size-11 items-center justify-center border border-rule text-forest transition-colors duration-300 hover:border-forest"
        >
          −
        </button>
        <output className="tnum w-12 text-center text-[1.1rem] text-forest">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label={addLabel}
          className="flex size-11 items-center justify-center border border-rule text-forest transition-colors duration-300 hover:border-forest"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Review({
  state,
  destinations,
  onEdit,
  locale,
  t,
}: {
  state: PlannerState;
  destinations: { slug: string; name: string }[];
  onEdit: (index: number) => void;
  locale: Locale;
  t: Dictionary["planner"];
}) {
  const label = (
    group: Record<string, { label: string }>,
    value: string,
  ) => group[value]?.label ?? value;

  const rows: { label: string; value: string; step: StepId }[] = [
    { label: t.review.journey, value: label(t.tripTypes, state.tripType), step: "trip" },
    {
      label: t.review.destinations,
      value:
        state.destinationSlugs.length > 0
          ? state.destinationSlugs
              .map((slug) => destinations.find((d) => d.slug === slug)?.name ?? slug)
              .join(", ")
          : t.review.openToSuggestions,
      step: "destinations",
    },
    {
      label: t.review.when,
      value: state.datesFlexible
        ? t.review.flexible
        : formatMonth(state.travelMonth, locale) || t.review.notGiven,
      step: "dates",
    },
    {
      label: t.review.length,
      value: label(t.durations, state.durationDays),
      step: "dates",
    },
    {
      label: t.review.travellers,
      value: travellerCount(locale, t.review, state.adults, state.children),
      step: "travellers",
    },
    {
      label: t.review.stays,
      value: label(t.accommodationStyles, state.accommodationStyle),
      step: "travellers",
    },
    {
      label: t.review.budget,
      value: label(t.budgets, state.budgetPerPerson),
      step: "budget",
    },
    {
      label: t.review.contact,
      value: `${state.firstName} ${state.lastName}`.trim() + ` · ${state.email}`,
      step: "contact",
    },
  ];

  if (state.specialRequests.trim()) {
    rows.push({
      label: t.review.notes,
      value: state.specialRequests.trim(),
      step: "contact",
    });
  }

  return (
    <dl className="flex flex-col divide-y divide-rule border-y border-rule">
      {rows.map((row) => (
        <div
          key={row.label + row.value}
          className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4"
        >
          <dt className="eyebrow w-28 shrink-0 text-ink-faint">{row.label}</dt>
          <dd className="flex-1 text-[0.95rem] text-forest">{row.value}</dd>
          <button
            type="button"
            onClick={() => onEdit(STEPS.indexOf(row.step))}
            className="text-[0.75rem] tracking-[0.06em] text-ink-faint uppercase underline underline-offset-4 transition-colors duration-300 hover:text-terracotta-text"
          >
            {t.review.edit}
          </button>
        </div>
      ))}
    </dl>
  );
}

function ContactFallback({
  label,
  hours,
  className = "",
}: {
  label: string;
  /** Horario ya traducido. Ver `Footer` sobre por qué llega como prop. */
  hours: string;
  className?: string;
}) {
  return (
    <div className={`border-t border-rule pt-7 ${className}`}>
      <p className="eyebrow text-ink-faint">{label}</p>
      <div className="mt-3 flex flex-col gap-1.5 text-[0.95rem]">
        <a
          href={COMPANY.phoneHref}
          className="tap-44 inline-block text-forest hover:text-terracotta-text"
        >
          {COMPANY.phone}
        </a>
        <a
          href={COMPANY.emailHref}
          className="tap-44 inline-block text-forest hover:text-terracotta-text"
        >
          {COMPANY.email}
        </a>
        <p className="mt-1 text-[0.85rem] text-ink-faint">
          {hours} · {COMPANY.hours.timezone}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Utilidades
 * ----------------------------------------------------------------------- */

function formatMonth(value: string, locale: Locale): string {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString(LOCALE_META[locale].intl, {
    month: "long",
    year: "numeric",
  });
}

/**
 * Resumen en texto plano, reutilizado en email y WhatsApp.
 *
 * Va en el idioma que el visitante está usando: quien rellena el formulario en
 * ruso no debería recibir de vuelta un correo en inglés que no reconoce como
 * suyo. El idioma preferido de respuesta viaja aparte, en su propio campo.
 */
function buildSummary(
  state: PlannerState,
  destinations: { slug: string; name: string }[],
  locale: Locale,
  t: Dictionary["planner"],
): string {
  const label = (g: Record<string, { label: string }>, v: string) =>
    g[v]?.label ?? v;
  const places =
    state.destinationSlugs.length > 0
      ? state.destinationSlugs
          .map((slug) => destinations.find((d) => d.slug === slug)?.name ?? slug)
          .join(", ")
      : t.review.openToSuggestions;

  const s = t.summary;
  return [
    s.heading,
    "",
    `${s.name}: ${state.firstName} ${state.lastName}`.trim(),
    `${s.email}: ${state.email}`,
    state.phone && `${s.phone}: ${state.phone}`,
    state.country && `${s.country}: ${state.country}`,
    `${s.replyIn}: ${
      LOCALE_META[state.preferredLanguage as Locale]?.nativeName ??
      state.preferredLanguage
    }`,
    "",
    `${s.journeyType}: ${label(t.tripTypes, state.tripType)}`,
    `${t.review.destinations}: ${places}`,
    `${t.review.when}: ${
      state.datesFlexible
        ? t.review.flexible
        : formatMonth(state.travelMonth, locale) || t.review.notGiven
    }`,
    `${t.review.length}: ${label(t.durations, state.durationDays)}`,
    `${t.review.travellers}: ${travellerCount(locale, t.review, state.adults, state.children)}`,
    `${t.review.stays}: ${label(t.accommodationStyles, state.accommodationStyle)}`,
    `${s.budgetPerPerson}: ${label(t.budgets, state.budgetPerPerson)}`,
    state.specialRequests.trim() && `\n${t.review.notes}: ${state.specialRequests.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}
