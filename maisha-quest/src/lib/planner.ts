/**
 * Planificador de viaje: definición de pasos, validación y borrador local.
 *
 * Los nueve datos que pide el cliente se agrupan en seis pasos más un
 * resumen. Nueve pantallas de un campo cada una se abandonan a la mitad; seis
 * pasos con campos afines mantienen el mismo detalle y se completan.
 *
 * La validación vive aquí, fuera del componente, para que el endpoint pueda
 * usar exactamente las mismas reglas y no haya dos criterios distintos entre
 * cliente y servidor.
 */

import type { ContactRequest } from "@/types/content";


export type StepId =
  | "trip"
  | "destinations"
  | "dates"
  | "travellers"
  | "budget"
  | "contact"
  | "review";

/**
 * Pasos y opciones — solo identificadores.
 *
 * El `value` es lo que viaja al webhook y a la hoja del cliente: tiene que ser
 * el mismo en los seis idiomas, o los datos dejarían de ser comparables. Las
 * etiquetas visibles viven en `t.planner` de cada idioma.
 */
export const STEPS: StepId[] = [
  "trip",
  "destinations",
  "dates",
  "travellers",
  "budget",
  "contact",
  "review",
];

export const TRIP_TYPES = [
  "wildlife",
  "honeymoon",
  "family",
  "adventure",
  "kilimanjaro",
  "culture",
  "safari-and-zanzibar",
  "not-sure",
] as const;

export const DURATIONS = ["under-7", "7-9", "10-14", "15-plus", "unsure"] as const;

export const ACCOMMODATION_STYLES = [
  "camp",
  "lodge",
  "boutique",
  "mixed",
  "guidance",
] as const;

/**
 * Tramos de presupuesto por persona, sin vuelos internacionales.
 * NOTA: orientan la conversación, NO son tarifas de Maisha Quest. La web no
 * publica ni un precio de viaje mientras no haya tarifas reales confirmadas.
 */
export const BUDGET_RANGES = [
  "under-3000",
  "3000-5000",
  "5000-8000",
  "8000-plus",
  "open",
] as const;

export interface PlannerState {
  tripType: string;
  destinationSlugs: string[];
  travelMonth: string;
  datesFlexible: boolean;
  durationDays: string;
  adults: number;
  children: number;
  accommodationStyle: string;
  budgetPerPerson: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
  preferredLanguage: string;
  consent: boolean;
}

export const EMPTY_PLANNER: PlannerState = {
  tripType: "",
  destinationSlugs: [],
  travelMonth: "",
  datesFlexible: false,
  durationDays: "",
  adults: 2,
  children: 0,
  accommodationStyle: "",
  budgetPerPerson: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  specialRequests: "",
  preferredLanguage: "en",
  consent: false,
};

/**
 * Errores de validación como CLAVES de traducción, no como frases.
 *
 * El servidor aplica las mismas reglas que el navegador (`validateStep` es
 * compartido); si el mensaje viviera aquí, el endpoint respondería siempre en
 * inglés y el visitante vería su formulario en alemán con un error en inglés.
 */
export type ErrorKey =
  | "tripType"
  | "travelMonth"
  | "durationDays"
  | "adultsMin"
  | "adultsMax"
  | "accommodationStyle"
  | "budgetPerPerson"
  | "firstName"
  | "emailMissing"
  | "emailInvalid"
  | "consent";

export type Errors = Partial<Record<keyof PlannerState, ErrorKey>>;

/**
 * Valida un paso. Devuelve mensajes en lenguaje llano — nada de "campo
 * inválido": el mensaje dice qué falta y qué hacer.
 */
export function validateStep(step: StepId, state: PlannerState): Errors {
  const errors: Errors = {};

  if (step === "trip" && !state.tripType) {
    errors.tripType = "tripType";
  }

  if (step === "dates") {
    if (!state.travelMonth && !state.datesFlexible) {
      errors.travelMonth = "travelMonth";
    }
    if (!state.durationDays) {
      errors.durationDays = "durationDays";
    }
  }

  if (step === "travellers") {
    if (state.adults < 1) {
      errors.adults = "adultsMin";
    }
    if (state.adults + state.children > 20) {
      errors.adults = "adultsMax";
    }
    if (!state.accommodationStyle) {
      errors.accommodationStyle = "accommodationStyle";
    }
  }

  if (step === "budget" && !state.budgetPerPerson) {
    errors.budgetPerPerson = "budgetPerPerson";
  }

  if (step === "contact") {
    if (!state.firstName.trim()) errors.firstName = "firstName";
    if (!state.email.trim()) {
      errors.email = "emailMissing";
    } else if (!isValidEmail(state.email)) {
      errors.email = "emailInvalid";
    }
    if (!state.consent) {
      errors.consent = "consent";
    }
  }

  return errors;
}

export function isValidEmail(value: string): boolean {
  // Deliberadamente permisiva: rechazar direcciones válidas es peor que
  // aceptar una que rebote.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Convierte el estado del formulario en la solicitud que viaja al servidor. */
export function toContactRequest(
  state: PlannerState,
  meta: {
    elapsedMs: number;
    honeypot: string;
    /** Idioma en el que estaba navegando: no siempre es el de respuesta. */
    locale: string;
    requestId: string;
  },
): ContactRequest {
  return {
    tripType: state.tripType,
    destinationSlugs: state.destinationSlugs,
    travelMonth: state.datesFlexible ? "flexible" : state.travelMonth,
    durationDays: state.durationDays,
    travellers: { adults: state.adults, children: state.children },
    accommodationStyle: state.accommodationStyle,
    budgetPerPerson: state.budgetPerPerson,
    contact: {
      firstName: state.firstName.trim(),
      lastName: state.lastName.trim(),
      email: state.email.trim(),
      phone: state.phone.trim() || undefined,
      country: state.country.trim() || undefined,
    },
    specialRequests: state.specialRequests.trim() || undefined,
    preferredLanguage: state.preferredLanguage as ContactRequest["preferredLanguage"],
    honeypot: meta.honeypot,
    elapsedMs: meta.elapsedMs,
    locale: meta.locale,
    requestId: meta.requestId,
  };
}

/**
 * Borrador local del planificador.
 *
 * La clave NO lleva el idioma a propósito: es el mismo borrador para las seis
 * lenguas. Cambiar de idioma a mitad del formulario recarga la página en otra
 * ruta, y sin esto el visitante perdería lo que llevaba escrito.
 *
 * `v2` porque el borrador dejó de ser el estado a secas y pasó a ser un sobre
 * con versión, el paso en el que iba y si el idioma de respuesta lo eligió una
 * persona. Los `v1` que hubiera guardados se leen una vez y se migran; lo que
 * no encaje se descarta en silencio y el formulario arranca vacío, que es
 * preferible a restaurar medio borrador con un esquema que ya no existe.
 */
export const PLANNER_STORAGE_KEY = "maisha-quest:journey-draft:v2";

/** Clave anterior, solo para migrar una vez. */
const PLANNER_STORAGE_KEY_V1 = "maisha-quest:journey-draft:v1";

export interface PlannerDraft {
  version: 2;
  /** Paso en el que iba, para no devolverlo al principio al cambiar de idioma. */
  step: number;
  state: PlannerState;
  /**
   * ¿Eligió el idioma de respuesta una persona?
   *
   * Si no, el idioma sigue al de la página: quien navega en alemán espera que
   * le respondan en alemán sin tener que decirlo. Si sí, manda su elección
   * aunque después cambie de idioma la web.
   */
  languageTouched: boolean;
  /** Identificador de la solicitud; evita entregarla dos veces. */
  requestId?: string;
}

/**
 * Lee el borrador guardado. Devuelve `null` si no hay, si está corrupto o si
 * el almacenamiento está bloqueado — nunca lanza.
 */
export function readPlannerDraft(): PlannerDraft | null {
  try {
    const raw = localStorage.getItem(PLANNER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PlannerDraft>;
      if (parsed?.version !== 2 || typeof parsed.state !== "object" || !parsed.state) {
        localStorage.removeItem(PLANNER_STORAGE_KEY);
        return null;
      }
      return {
        version: 2,
        step: clampStep(parsed.step),
        state: { ...EMPTY_PLANNER, ...parsed.state },
        languageTouched: parsed.languageTouched === true,
        requestId: typeof parsed.requestId === "string" ? parsed.requestId : undefined,
      };
    }
    // Migración desde v1: allí solo se guardaba el estado, sin paso.
    const legacy = localStorage.getItem(PLANNER_STORAGE_KEY_V1);
    if (legacy) {
      const parsed = JSON.parse(legacy) as Partial<PlannerState>;
      localStorage.removeItem(PLANNER_STORAGE_KEY_V1);
      if (typeof parsed !== "object" || !parsed) return null;
      return {
        version: 2,
        step: 0,
        state: { ...EMPTY_PLANNER, ...parsed },
        // Un borrador v1 pudo guardar el idioma sin que nadie lo tocara, así
        // que se trata como no elegido y vuelve a seguir al de la página.
        languageTouched: false,
      };
    }
  } catch {
    // Almacenamiento bloqueado o JSON corrupto: se sigue con el formulario vacío.
  }
  return null;
}

export function writePlannerDraft(draft: PlannerDraft): void {
  try {
    localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Sin almacenamiento el formulario funciona igual, solo que sin borrador.
  }
}

export function clearPlannerDraft(): void {
  try {
    localStorage.removeItem(PLANNER_STORAGE_KEY);
    localStorage.removeItem(PLANNER_STORAGE_KEY_V1);
  } catch {
    // Nada que limpiar si no hay almacenamiento.
  }
}

function clampStep(step: unknown): number {
  const n = typeof step === "number" && Number.isInteger(step) ? step : 0;
  return Math.min(Math.max(n, 0), STEPS.length - 1);
}
