/**
 * GLOSARIO — terminología acordada por idioma.
 *
 * No lo consume ningún componente: existe para que las traducciones sean
 * coherentes entre sí y para que quien las revise tenga una referencia única.
 * Si un término aparece traducido de dos formas distintas en la web, es aquí
 * donde se decide cuál gana.
 *
 * Criterio general:
 *
 * - "Safari" es la misma palabra en las seis lenguas (viene del swahili) y no
 *   se traduce, aunque cambie el género y el plural.
 * - "Game drive" no tiene equivalente exacto en casi ningún idioma; se usa la
 *   fórmula descriptiva de cada mercado en lugar de un calco literal.
 * - "Lodge" está asentado en el sector turístico en todas las lenguas latinas
 *   y en ruso; en chino se traduce, porque el préstamo no se entiende.
 * - Los nombres de parques mantienen su forma oficial (Serengeti, Ngorongoro,
 *   Tarangire, Zanzibar) y solo se transliteran al ruso y al chino.
 * - "Explorer", "Escape" y "Enrich" son nombres de colección: marca, no se
 *   traducen en ningún idioma.
 */

export const GLOSSARY = {
  en: {
    safari: "safari",
    journey: "journey",
    gameDrive: "game drive",
    lodge: "lodge",
    tentedCamp: "tented camp",
    tailorMade: "tailor-made",
    privateSafari: "private safari",
    northernCircuit: "Northern Circuit",
    greatMigration: "the Great Migration",
    planYourJourney: "Plan Your Journey",
    priceOnRequest: "Price on request",
    sampleItinerary: "Sample itinerary",
    included: "What is included",
    notIncluded: "Not included",
  },
  es: {
    safari: "safari",
    /** "Viaje" y no "trayecto": es el producto, no el desplazamiento. */
    journey: "viaje",
    /** Fórmula del sector en español; "conducción de caza" sería un calco. */
    gameDrive: "safari en vehículo",
    lodge: "lodge",
    tentedCamp: "campamento de tiendas",
    tailorMade: "a medida",
    privateSafari: "safari privado",
    northernCircuit: "circuito norte",
    greatMigration: "la Gran Migración",
    planYourJourney: "Diseña tu viaje",
    priceOnRequest: "Precio bajo consulta",
    sampleItinerary: "Itinerario orientativo",
    included: "Qué incluye",
    notIncluded: "No incluye",
  },
  de: {
    safari: "Safari",
    journey: "Reise",
    /** Término establecido en el mercado alemán. */
    gameDrive: "Pirschfahrt",
    lodge: "Lodge",
    tentedCamp: "Zeltcamp",
    tailorMade: "maßgeschneidert",
    privateSafari: "private Safari",
    northernCircuit: "nördlicher Circuit",
    greatMigration: "die Große Tierwanderung",
    planYourJourney: "Reise planen",
    priceOnRequest: "Preis auf Anfrage",
    sampleItinerary: "Beispielroute",
    included: "Inbegriffen",
    notIncluded: "Nicht inbegriffen",
  },
  fr: {
    safari: "safari",
    journey: "voyage",
    /** Formule usuelle du secteur francophone. */
    gameDrive: "safari en véhicule",
    lodge: "lodge",
    tentedCamp: "camp de toile",
    tailorMade: "sur mesure",
    privateSafari: "safari privé",
    northernCircuit: "circuit nord",
    greatMigration: "la Grande Migration",
    planYourJourney: "Composez votre voyage",
    priceOnRequest: "Prix sur demande",
    sampleItinerary: "Itinéraire indicatif",
    included: "Ce qui est inclus",
    notIncluded: "Non inclus",
  },
  ru: {
    safari: "сафари",
    journey: "путешествие",
    /** Термин, принятый на русскоязычном рынке. */
    gameDrive: "сафари на джипе",
    lodge: "лодж",
    tentedCamp: "палаточный лагерь",
    tailorMade: "по индивидуальному плану",
    privateSafari: "индивидуальное сафари",
    northernCircuit: "северный маршрут",
    greatMigration: "Великая миграция",
    planYourJourney: "Спланировать путешествие",
    priceOnRequest: "Цена по запросу",
    sampleItinerary: "Примерный маршрут",
    included: "Что включено",
    notIncluded: "Не включено",
  },
  "zh-CN": {
    safari: "野生动物之旅",
    journey: "行程",
    /** El préstamo "game drive" no se entiende: se describe la actividad. */
    gameDrive: "乘车观兽",
    /** "Lodge" sin traducir no se entiende en chino. */
    lodge: "生态旅舍",
    tentedCamp: "帐篷营地",
    tailorMade: "量身定制",
    privateSafari: "私人定制之旅",
    northernCircuit: "北部环线",
    greatMigration: "动物大迁徙",
    planYourJourney: "定制我的行程",
    priceOnRequest: "价格需询问",
    sampleItinerary: "参考行程",
    included: "费用包含",
    notIncluded: "费用不含",
  },
} as const;
