import type { Collection } from "@/types/content";
import { CLIENT_PHOTOS } from "./client-photography";
import { PHOTOS } from "./photography";

/**
 * Las tres colecciones de Maisha Quest, redefinidas.
 *
 * En la web actual Explorer, Escape y Enrich se solapan y se describen casi
 * igual. Aquí cada una responde a una pregunta distinta — cómo quieres viajar,
 * no qué quieres ver — para que un visitante sepa en diez segundos cuál es la
 * suya. El rango de duración se comprueba contra los safaris reales de cada
 * colección en tiempo de compilación (ver `lib/content.ts`).
 */

export const COLLECTIONS: Collection[] = [
  {
    id: "explorer",
    name: "Explorer",
    tagline: "For travellers drawn to wild landscapes, adventure and discovery.",
    description:
      "The active version of Tanzania. Longer days in the field, camps that move with the wildlife, time on foot as well as in the vehicle, and routes that reach the parts of a park most vehicles never get to.",
    travellerProfile: "Active travellers, photographers, returning safari-goers",
    typicalDurationDays: [7, 12],
    traits: ["Mobile camping", "Game drives", "Walking & trekking", "Remote routes"],
    accent: "sand",
    // Un león cruzando una llanura abierta: amplitud y ruta, que es de lo que
    // va Explorer. Deliberadamente distinta de la del hero — repetir foto
    // entre secciones de la misma página es lo que delata una plantilla.
    image: CLIENT_PHOTOS["lion-open-savannah"],
  },
  {
    id: "escape",
    name: "Escape",
    tagline: "For travellers seeking space, comfort and effortless connection.",
    description:
      "Slower, softer, and entirely taken care of. Fewer parks and more nights in each, lodges chosen for where they sit and what you see from them, and an ending on the Indian Ocean.",
    travellerProfile: "Couples, honeymooners, first-time safari travellers",
    typicalDurationDays: [7, 14],
    traits: ["Lodges & boutique camps", "Couples & honeymoons", "Wellbeing", "Zanzibar"],
    accent: "terracotta",
    // Un atardecer abierto, no una tienda de campaña: Escape son lodges y
    // noches largas en el mismo sitio. La única foto de alojamiento del
    // cliente ilustra "Serengeti Under Canvas", que es donde encaja de verdad,
    // y así tampoco se repite con esa tarjeta unas líneas más abajo en la home.
    image: PHOTOS["serengeti-sunset"],
  },
  {
    id: "enrich",
    name: "Enrich",
    tagline: "For travellers who want to experience Tanzania more deeply.",
    description:
      "Tanzania beyond the game drive. Days with communities and conservation teams, food and coffee where they are grown, and private access arranged through people we have worked with for years.",
    travellerProfile: "Curious travellers, families with older children, repeat visitors",
    typicalDurationDays: [8, 14],
    traits: ["Culture", "Cuisine", "Communities", "Conservation"],
    accent: "gold",
    // Detalle, no postal: picabueyes sobre el lomo de una jirafa. Enrich es
    // mirar de cerca, y esta imagen lo dice mejor que un paisaje.
    image: CLIENT_PHOTOS["giraffe-oxpecker-birds"],
  },
];

export const COLLECTIONS_BY_ID = new Map(
  COLLECTIONS.map((collection) => [collection.id, collection]),
);
