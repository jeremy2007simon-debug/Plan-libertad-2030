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

export const PLANNER_STORAGE_KEY = "maisha-quest:journey-draft:v1";

export type StepId =
  | "trip"
  | "destinations"
  | "dates"
  | "travellers"
  | "budget"
  | "contact"
  | "review";

export const STEPS: { id: StepId; label: string; title: string; help?: string }[] = [
  {
    id: "trip",
    label: "Journey",
    title: "What kind of journey are you imagining?",
    help: "Pick the closest one. Nothing here is binding — it just tells us where to start.",
  },
  {
    id: "destinations",
    label: "Places",
    title: "Where would you like to go?",
    help: "Choose as many as you like, or leave it to us.",
  },
  {
    id: "dates",
    label: "Dates",
    title: "When, and for how long?",
    help: "Approximate is fine. If your dates are flexible, say so — it usually works in your favour.",
  },
  {
    id: "travellers",
    label: "Travellers",
    title: "Who is travelling, and how would you like to stay?",
  },
  {
    id: "budget",
    label: "Budget",
    title: "What budget are you working to?",
    help: "Per person, excluding international flights. An honest range lets us propose something real rather than something optimistic.",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Where should we send your proposal?",
  },
  { id: "review", label: "Review", title: "Does this look right?" },
];

export const TRIP_TYPES = [
  { value: "wildlife", label: "Classic safari", note: "Game drives and the great parks" },
  { value: "honeymoon", label: "Honeymoon", note: "Privacy, comfort and the coast" },
  { value: "family", label: "Family journey", note: "Paced for children" },
  { value: "adventure", label: "Adventure", note: "Walking, camping, remote routes" },
  { value: "kilimanjaro", label: "Kilimanjaro", note: "Trekking the mountain" },
  { value: "culture", label: "Culture & community", note: "People, food and place" },
  { value: "safari-and-zanzibar", label: "Safari & Zanzibar", note: "Plains, then ocean" },
  { value: "not-sure", label: "Not sure yet", note: "Help us work it out" },
];

export const DURATIONS = [
  { value: "under-7", label: "Under a week" },
  { value: "7-9", label: "7 – 9 days" },
  { value: "10-14", label: "10 – 14 days" },
  { value: "15-plus", label: "More than two weeks" },
  { value: "unsure", label: "Not decided" },
];

export const ACCOMMODATION_STYLES = [
  { value: "camp", label: "Tented camps", note: "Canvas, close to the wildlife" },
  { value: "lodge", label: "Lodges", note: "Comfort and a proper bed" },
  { value: "boutique", label: "Boutique & design", note: "Small, characterful properties" },
  { value: "mixed", label: "A mix", note: "Different styles along the route" },
  { value: "guidance", label: "Advise me", note: "We will suggest what fits" },
];

/**
 * Tramos de presupuesto por persona, sin incluir vuelos internacionales.
 * NOTA: son tramos para orientar la conversación, no tarifas de Maisha Quest.
 * La web no publica ni un solo precio de viaje mientras no haya tarifas reales.
 */
export const BUDGET_RANGES = [
  { value: "under-3000", label: "Under $3,000" },
  { value: "3000-5000", label: "$3,000 – $5,000" },
  { value: "5000-8000", label: "$5,000 – $8,000" },
  { value: "8000-plus", label: "More than $8,000" },
  { value: "open", label: "Open — advise me" },
];

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

export type Errors = Partial<Record<keyof PlannerState, string>>;

/**
 * Valida un paso. Devuelve mensajes en lenguaje llano — nada de "campo
 * inválido": el mensaje dice qué falta y qué hacer.
 */
export function validateStep(step: StepId, state: PlannerState): Errors {
  const errors: Errors = {};

  if (step === "trip" && !state.tripType) {
    errors.tripType = "Choose the kind of journey you have in mind, or ‘Not sure yet’.";
  }

  if (step === "dates") {
    if (!state.travelMonth && !state.datesFlexible) {
      errors.travelMonth =
        "Give us a rough month, or tick ‘my dates are flexible’.";
    }
    if (!state.durationDays) {
      errors.durationDays = "Roughly how long do you want to travel for?";
    }
  }

  if (step === "travellers") {
    if (state.adults < 1) {
      errors.adults = "There needs to be at least one adult travelling.";
    }
    if (state.adults + state.children > 20) {
      errors.adults =
        "For groups over twenty, email us directly — we will plan it differently.";
    }
    if (!state.accommodationStyle) {
      errors.accommodationStyle = "Pick a style of stay, or ask us to advise.";
    }
  }

  if (step === "budget" && !state.budgetPerPerson) {
    errors.budgetPerPerson = "Choose a range, or ‘Open — advise me’.";
  }

  if (step === "contact") {
    if (!state.firstName.trim()) errors.firstName = "We need a name to reply to.";
    if (!state.email.trim()) {
      errors.email = "We need an email address to send your proposal to.";
    } else if (!isValidEmail(state.email)) {
      errors.email = "That email address does not look right — please check it.";
    }
    if (!state.consent) {
      errors.consent =
        "Please confirm we can use these details to reply to your enquiry.";
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
  meta: { elapsedMs: number; honeypot: string },
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
  };
}

/** Etiqueta legible de un valor de opción, para el resumen y el email. */
export function labelFor(
  options: { value: string; label: string }[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
