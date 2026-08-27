import type { Safari } from "@/types/content";
import { PHOTOS } from "./photography";
import { CLIENT_PHOTOS } from "./client-photography";

/**
 * ⚠️ ITINERARIOS DE DEMOSTRACIÓN — pendientes de validar por el equipo de Arusha.
 *
 * Todos llevan `draft: true` y `price.fromPerPerson: null`. Son rutas
 * plausibles construidas sobre geografía real de Tanzania (distancias,
 * parques y temporadas correctas), pero NINGUNA está confirmada como producto
 * a la venta y no hay una sola tarifa inventada: donde no hay precio real, la
 * ficha dice "Price on request" en lugar de una cifra.
 *
 * Los nombres de alojamiento se dejan en `null` a propósito. Poner nombres de
 * campamentos y lodges concretos implicaría acuerdos comerciales que no
 * podemos afirmar; la interfaz muestra el estilo de alojamiento, que sí es
 * una decisión de diseño del viaje.
 *
 * Para pasar a producción: sustituir estos objetos por los itinerarios reales,
 * rellenar `price` y quitar `draft`. La interfaz deja de mostrar el aviso de
 * borrador automáticamente.
 */

const PRICE_ON_REQUEST = { fromPerPerson: null, currency: "USD" } as const;

export const SAFARIS: Safari[] = [
  {
    slug: "serengeti-ngorongoro-journey",
    name: "Serengeti & Ngorongoro Journey",
    collection: "escape",
    durationDays: 7,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro"],
    summary:
      "The northern circuit at an unhurried pace: baobab country, the endless plains, and a dawn descent into the crater. Lodges throughout, private vehicle throughout.",
    overview:
      "This is the shape of journey most first-time travellers to Tanzania are looking for, done properly: three parks rather than five, two nights minimum in each, and no day that puts you in a vehicle for six hours. You finish in the Ngorongoro highlands and fly out from Arusha.",
    accommodationStyle: "Lodge",
    travellerProfile: "Couples and first-time safari travellers",
    price: PRICE_ON_REQUEST,
    bestTime: "June – October, and January – March",
    image: PHOTOS["ngorongoro-crater"],
    gallery: [
      CLIENT_PHOTOS["giraffes-open-savannah"],
      CLIENT_PHOTOS["lion-pair-calling"],
      PHOTOS["serengeti-sunrise"],
      CLIENT_PHOTOS["elephant-family-walking"],
    ],
    featured: true,
    draft: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        route: "Kilimanjaro International Airport → Arusha",
        activities: [
          "Met at the airport by your Maisha Quest guide",
          "Transfer to Arusha and check in",
          "Trip briefing over dinner, and a look at the days ahead",
        ],
        accommodationSlug: null,
        meals: ["Dinner"],
        estimatedDuration: "1 hr transfer",
        images: [PHOTOS.arusha],
      },
      {
        day: 2,
        title: "Into Tarangire",
        route: "Arusha → Tarangire National Park",
        activities: [
          "Morning drive south through Maasai grazing land",
          "Afternoon game drive along the Tarangire River",
          "Sunset among the baobabs",
        ],
        accommodationSlug: null,
        meals: ["Breakfast", "Lunch", "Dinner"],
        estimatedDuration: "2.5 hr drive, 3 hr game drive",
        images: [PHOTOS["tarangire-baobab"]],
      },
      {
        day: 3,
        title: "Tarangire to the Serengeti",
        route: "Tarangire → Serengeti National Park",
        activities: [
          "Early departure across the Ngorongoro Conservation Area",
          "Picnic lunch at Naabi Hill, at the gate to the plains",
          "Afternoon game drive into the central Serengeti",
        ],
        accommodationSlug: null,
        meals: ["Breakfast", "Lunch", "Dinner"],
        estimatedDuration: "Full travel day with game viewing en route",
        images: [PHOTOS["serengeti-plains"]],
      },
      {
        day: 4,
        title: "The endless plains",
        route: null,
        activities: [
          "Full day in the Serengeti, timed around the light",
          "Kopjes and river lines where the cats rest up",
          "Optional balloon flight at dawn, arranged in advance",
        ],
        accommodationSlug: null,
        meals: ["Breakfast", "Lunch", "Dinner"],
        estimatedDuration: "Full day",
        images: [PHOTOS["serengeti-cheetah"], PHOTOS["balloon-serengeti"]],
      },
      {
        day: 5,
        title: "Serengeti to the crater rim",
        route: "Serengeti → Ngorongoro Conservation Area",
        activities: [
          "Final morning game drive on the plains",
          "Drive up to the Ngorongoro highlands",
          "Late afternoon on the crater rim",
        ],
        accommodationSlug: null,
        meals: ["Breakfast", "Lunch", "Dinner"],
        estimatedDuration: "4 hr drive with stops",
        images: [PHOTOS["serengeti-sunset"]],
      },
      {
        day: 6,
        title: "Into the crater",
        route: "Ngorongoro Crater floor",
        activities: [
          "First-light descent to the crater floor",
          "Game drive on the floor — the resident population does not migrate",
          "Afternoon back on the rim, or a Maasai community visit",
        ],
        accommodationSlug: null,
        meals: ["Breakfast", "Lunch", "Dinner"],
        estimatedDuration: "6 hr on the crater floor",
        images: [PHOTOS["ngorongoro-zebras"]],
      },
      {
        day: 7,
        title: "Back to Arusha",
        route: "Ngorongoro → Arusha → Kilimanjaro International Airport",
        activities: [
          "Unhurried breakfast on the rim",
          "Drive back to Arusha with a stop for coffee",
          "Transfer to the airport for your flight",
        ],
        accommodationSlug: null,
        meals: ["Breakfast", "Lunch"],
        estimatedDuration: "4 hr drive",
      },
    ],
    included: [
      "Private 4x4 safari vehicle with open roof and a Maisha Quest guide",
      "All park and conservation area fees",
      "Accommodation as listed, on a full-board basis",
      "Drinking water throughout the safari",
      "Airport transfers on arrival and departure",
      "Flying doctor evacuation cover",
    ],
    notIncluded: [
      "International flights and Tanzanian visa",
      "Travel and medical insurance",
      "Balloon safari and other optional activities",
      "Drinks other than water, and personal expenses",
      "Tips for your guide and camp staff",
    ],
    practicalInfo: [
      { label: "Group size", value: "Private departure — your party only" },
      { label: "Vehicle", value: "4x4 with open roof, guaranteed window seat" },
      { label: "Driving", value: "Longest single transfer is around 4 hours" },
      { label: "Fitness", value: "No particular fitness required" },
    ],
    relatedSafariSlugs: ["serengeti-under-canvas", "serengeti-and-zanzibar"],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
  },
  {
    slug: "serengeti-under-canvas",
    name: "Serengeti Under Canvas",
    collection: "explorer",
    durationDays: 9,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro"],
    summary:
      "A mobile camp that moves with the herds, long days in the field and nights under canvas where the wildlife actually is.",
    overview:
      "The camp packs up and follows the migration, which means you wake where the animals are rather than driving two hours to reach them. Comfortable canvas, proper beds, hot water — and nothing between you and the plains.",
    accommodationStyle: "Mobile camp",
    travellerProfile: "Active travellers and returning safari-goers",
    price: PRICE_ON_REQUEST,
    bestTime: "January – March for calving, July – October for the northern crossings",
    image: CLIENT_PHOTOS["safari-tent-accommodation"],
    gallery: [
      PHOTOS["serengeti-sunrise"],
      CLIENT_PHOTOS["male-lions-together"],
      PHOTOS["wildebeest-migration"],
    ],
    featured: true,
    draft: true,
    itinerary: [],
    included: [
      "Private 4x4 safari vehicle with open roof and a Maisha Quest guide",
      "All park and conservation area fees",
      "Mobile camp accommodation on a full-board basis",
      "Camp staff, and drinking water throughout",
      "Airport transfers on arrival and departure",
    ],
    notIncluded: [
      "International flights and Tanzanian visa",
      "Travel and medical insurance",
      "Balloon safari and other optional activities",
      "Drinks other than water, and personal expenses",
      "Tips for your guide and camp staff",
    ],
    relatedSafariSlugs: ["serengeti-ngorongoro-journey", "southern-wild"],
  },
  {
    slug: "serengeti-and-zanzibar",
    name: "Serengeti & Zanzibar",
    collection: "escape",
    durationDays: 11,
    routeDestinationSlugs: ["arusha", "serengeti", "ngorongoro", "zanzibar"],
    summary:
      "The plains first, the Indian Ocean second. Six days on safari, four on the coast, and one team handling the join in the middle.",
    overview:
      "The most requested shape of Tanzanian journey, with enough nights on each side that neither half feels rushed. You fly from the Serengeti straight to Zanzibar rather than backtracking through Arusha.",
    accommodationStyle: "Lodge",
    travellerProfile: "Couples and honeymooners",
    price: PRICE_ON_REQUEST,
    bestTime: "June – October, and December – February",
    image: PHOTOS["zanzibar-nungwi"],
    gallery: [
      CLIENT_PHOTOS["antelope-herd-grasslands"],
      PHOTOS["zanzibar-dhow-sunset"],
      PHOTOS["zanzibar-stone-town"],
    ],
    featured: true,
    draft: true,
    itinerary: [],
    included: [
      "Private 4x4 safari vehicle with open roof and a Maisha Quest guide",
      "All park and conservation area fees",
      "Internal flight from the Serengeti to Zanzibar",
      "Accommodation as listed — full board on safari, bed and breakfast on the coast",
      "All airport and hotel transfers",
    ],
    notIncluded: [
      "International flights and Tanzanian visa",
      "Travel and medical insurance",
      "Meals other than those listed, and personal expenses",
      "Water sports and optional excursions in Zanzibar",
      "Tips for your guide and camp staff",
    ],
    relatedSafariSlugs: ["serengeti-ngorongoro-journey", "tanzania-in-depth"],
  },
  {
    slug: "tanzania-in-depth",
    name: "Tanzania in Depth",
    collection: "enrich",
    durationDays: 10,
    routeDestinationSlugs: ["arusha", "kilimanjaro", "ngorongoro", "serengeti", "zanzibar"],
    summary:
      "Coffee on the slopes where it grows, days with Maasai and Chagga communities, a conservation team in the field — and the wildlife too.",
    overview:
      "For travellers who want to understand the country rather than tick off a list. Roughly half the days are spent with people rather than animals, and the safari days are better for it.",
    accommodationStyle: "Boutique lodge",
    travellerProfile: "Curious travellers and families with older children",
    price: PRICE_ON_REQUEST,
    bestTime: "June – October",
    image: PHOTOS["zanzibar-stone-town"],
    gallery: [
      PHOTOS["maasai-boma"],
      PHOTOS["kilimanjaro-shira"],
      CLIENT_PHOTOS["zebra-herd-monochrome"],
    ],
    featured: true,
    draft: true,
    itinerary: [],
    included: [
      "Private 4x4 safari vehicle with open roof and a Maisha Quest guide",
      "All park and conservation area fees",
      "Community visits arranged directly, with fees paid to the communities",
      "Accommodation as listed, on a full-board basis",
      "All transfers",
    ],
    notIncluded: [
      "International flights and Tanzanian visa",
      "Travel and medical insurance",
      "Drinks other than water, and personal expenses",
      "Tips for your guide and camp staff",
    ],
    relatedSafariSlugs: ["serengeti-ngorongoro-journey", "highlands-and-communities"],
  },
  {
    slug: "southern-wild",
    name: "Southern Wild: Nyerere & Ruaha",
    collection: "explorer",
    durationDays: 9,
    routeDestinationSlugs: ["nyerere", "ruaha"],
    summary:
      "Boat safaris on the Rufiji, walking in baobab country, and two parks that see a fraction of the northern circuit's vehicles.",
    accommodationStyle: "Tented camp",
    travellerProfile: "Returning safari travellers looking for space",
    price: PRICE_ON_REQUEST,
    bestTime: "June – October",
    image: PHOTOS.nyerere,
    gallery: [PHOTOS.ruaha],
    draft: true,
    itinerary: [],
    included: [
      "Internal flights between Dar es Salaam, Nyerere and Ruaha",
      "All park fees",
      "Tented camp accommodation on a full-board basis",
      "Game drives, walking safaris and boat safaris as scheduled",
    ],
    notIncluded: [
      "International flights and Tanzanian visa",
      "Travel and medical insurance",
      "Drinks other than water, and personal expenses",
      "Tips for your guide and camp staff",
    ],
    relatedSafariSlugs: ["serengeti-under-canvas"],
  },
  {
    slug: "kilimanjaro-lemosho",
    name: "Kilimanjaro: the Lemosho Route",
    collection: "explorer",
    durationDays: 9,
    routeDestinationSlugs: ["arusha", "kilimanjaro"],
    summary:
      "Eight days on the mountain by the route that acclimatises best, with the extra day built in as standard rather than sold as an extra.",
    accommodationStyle: "Mobile camp",
    travellerProfile: "Trekkers — no technical climbing experience needed",
    price: PRICE_ON_REQUEST,
    bestTime: "January – March, and June – October",
    image: PHOTOS["kilimanjaro-kibo"],
    gallery: [PHOTOS["kilimanjaro-climbers"], PHOTOS["kilimanjaro-shira"]],
    draft: true,
    itinerary: [],
    included: [
      "Mountain crew: guides, cook and porters, paid to KPAP guidelines",
      "All Kilimanjaro National Park fees and rescue fees",
      "Camping equipment, meals and drinking water on the mountain",
      "Two nights in Arusha, before and after the climb",
      "Airport transfers",
    ],
    notIncluded: [
      "International flights and Tanzanian visa",
      "Travel and medical insurance covering trekking to 6,000 m",
      "Personal trekking equipment and sleeping bag",
      "Tips for the mountain crew",
    ],
    relatedSafariSlugs: ["serengeti-under-canvas", "highlands-and-communities"],
  },
  {
    slug: "highlands-and-communities",
    name: "Highlands & Communities",
    collection: "enrich",
    durationDays: 8,
    routeDestinationSlugs: ["arusha", "lake-manyara", "ngorongoro", "serengeti"],
    summary:
      "The northern parks, threaded through the highland communities that live alongside them — Maasai, Datoga and Chagga.",
    accommodationStyle: "Lodge",
    travellerProfile: "Travellers who want context as well as wildlife",
    price: PRICE_ON_REQUEST,
    bestTime: "June – October",
    image: PHOTOS["lake-manyara"],
    gallery: [PHOTOS["lake-manyara-giraffe"], CLIENT_PHOTOS["flamingo-taking-flight"]],
    draft: true,
    itinerary: [],
    included: [
      "Private 4x4 safari vehicle with open roof and a Maisha Quest guide",
      "All park and conservation area fees",
      "Community visits arranged directly, with fees paid to the communities",
      "Accommodation as listed, on a full-board basis",
    ],
    notIncluded: [
      "International flights and Tanzanian visa",
      "Travel and medical insurance",
      "Drinks other than water, and personal expenses",
      "Tips for your guide and camp staff",
    ],
    relatedSafariSlugs: ["tanzania-in-depth", "serengeti-ngorongoro-journey"],
  },
];
