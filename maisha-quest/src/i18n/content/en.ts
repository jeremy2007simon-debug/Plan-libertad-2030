/**
 * CONTENIDO EN INGLÉS.
 *
 * Solo texto visible. La estructura —slugs, duraciones, coordenadas, rutas,
 * fotografías— vive una única vez en `src/data/structure/`, compartida por los
 * seis idiomas.
 *
 * Este archivo es el ORIGEN: su tipo (`ContentDictionary`) define lo que deben
 * cumplir los otros cinco. Si aquí se añade un safari, una FAQ o un día de
 * itinerario y no se traduce, `tsc` falla. No hay fallback silencioso al
 * inglés: una página a medio traducir no llega a compilar.
 *
 * NO se traduce en ningún idioma: "Maisha Quest", los nombres del equipo, los
 * nombres de las colecciones (Explorer/Escape/Enrich), correos, teléfonos y
 * los topónimos cuya forma oficial es la inglesa (Serengeti, Ngorongoro,
 * Tarangire, Zanzibar) — que sí se transliteran al ruso y al chino.
 */

import type {
  CollectionId,
  CollectionText,
  DestinationText,
  ExperienceText,
  FaqText,
  ImpactText,
  JournalText,
  LearnTopicText,
  RegionText,
  SafariText,
  TeamText,
} from "@/types/content";

/**
 * Included/excluded lines shared by nearly all 18 real packages.
 *
 * This is not a shortcut: maishaquest.com genuinely repeats this same block,
 * near word-for-word, on all 18 package pages. Two things it does NOT
 * confirm, on any package, so they are not added here: whether the internal
 * flight to Zanzibar is included on the six Escape packages, and whether an
 * optional hot-air balloon safari is included or extra. Both are flagged in
 * `practicalInfo` on the packages where they matter, as open questions for
 * the client rather than an assumption either way.
 */
const STANDARD_INCLUDED = [
  "Airport transfers on arrival and departure",
  "4x4 Land Cruiser with pop-up roof",
  "English-speaking guide, with 24/7 support",
  "All park and government entrance fees",
  "Accommodation as booked",
  "Three meals a day while on safari",
  "Bottled water and soft drinks",
];
const STANDARD_NOT_INCLUDED = [
  "International flights and Tanzanian visa",
  "Travel and medical insurance",
  "Tips for your guide",
  "Hotel meals before or after the safari",
];

export const enContent = {
  safaris: {
    /* ======================== EXPLORER — camping ======================= */
    "manyara-ngorongoro-safari": {
      name: "Lake Manyara & Ngorongoro Crater Safari",
      summary: "A compact two-day introduction to Tanzania's classic wildlife circuit: tree-climbing lions at Lake Manyara, then a full day on the floor of the Ngorongoro Crater.",
      overview: "Built for travellers with limited time who still want a proper wildlife safari rather than a taster. Camping accommodation throughout, exactly as listed on maishaquest.com's Explorer packages.",
      travellerProfile: "Travellers with limited time wanting a classic wildlife experience",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Camping — luxury, mid-range or budget tiers available" }],
      days: [
        {
          title: "Lake Manyara National Park",
          route: "Arusha → Lake Manyara National Park",
          activities: ["Early departure from Arusha", "Game drive at Lake Manyara: tree-climbing lions, elephants and flamingos", "Picnic lunch inside the park", "Evening transfer to a campsite near Karatu"],
          estimatedDuration: null,
        },
        {
          title: "Ngorongoro Crater",
          route: "Karatu → Ngorongoro Crater → Arusha",
          activities: ["Early descent to the crater floor", "Full-day game viewing, with good odds of rhino and big cats", "Picnic lunch at the hippo pool", "Afternoon drive back to Arusha"],
          estimatedDuration: null,
        },
      ],
    },
    "tarangire-manyara-ngorongoro-safari": {
      name: "Tarangire, Lake Manyara & Ngorongoro Crater Safari",
      summary: "Three of Tanzania's best-known parks in three days: elephants and baobabs at Tarangire, the Rift Valley escarpment at Lake Manyara, and a half-day inside the Ngorongoro Crater.",
      overview: "An introductory safari for first-time visitors wanting a taste of three iconic parks without a long itinerary. Camping accommodation throughout, exactly as listed on maishaquest.com's Explorer packages.",
      travellerProfile: "First-time safari-goers wanting a taste of three iconic parks",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Camping — luxury, mid-range or budget tiers available" }],
      days: [
        {
          title: "Tarangire National Park",
          route: "Arusha → Tarangire National Park",
          activities: ["Game drive: elephant herds and ancient baobab trees", "Picnic lunch in the park", "Overnight camping"],
          estimatedDuration: null,
        },
        {
          title: "Lake Manyara National Park",
          route: "Tarangire → Lake Manyara National Park",
          activities: ["Morning game drive along the Rift Valley escarpment: giraffes, elephants and birdlife", "Evening transfer to a campsite near Karatu"],
          estimatedDuration: null,
        },
        {
          title: "Ngorongoro Crater",
          route: "Karatu → Ngorongoro Crater → Arusha",
          activities: ["Early descent for a half-day game drive on the crater floor", "Picnic lunch inside the crater", "Return to Arusha"],
          estimatedDuration: null,
        },
      ],
    },
    "serengeti-ngorongoro-manyara-safari": {
      name: "Serengeti, Ngorongoro & Lake Manyara Safari",
      summary: "Four days across Lake Manyara, the Ngorongoro Crater and the Serengeti, tracking the Great Migration and the predators that follow it.",
      overview: "A four-day camping circuit through three major destinations, exactly as listed on maishaquest.com's Explorer packages.",
      travellerProfile: "Travellers wanting a fuller taste of the northern circuit in four days",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Camping — luxury, mid-range or budget tiers available" }],
      days: [
        {
          title: "Lake Manyara National Park",
          route: "Arusha → Lake Manyara National Park",
          activities: ["Morning drive to Lake Manyara: tree-climbing lions, elephants and flamingos", "Afternoon transfer to a campsite in the Ngorongoro highlands"],
          estimatedDuration: null,
        },
        {
          title: "Ngorongoro Crater",
          route: "Ngorongoro highlands → Ngorongoro Crater → Serengeti",
          activities: ["Early crater game drive", "Afternoon transfer to the Serengeti, via Olduvai Gorge (optional)", "Sunset game drive"],
          estimatedDuration: null,
        },
        {
          title: "Serengeti National Park",
          route: null,
          activities: ["Full day of game drives tracking predators and the migrating herds", "Picnic lunch", "Overnight camping"],
          estimatedDuration: "Full day",
        },
        {
          title: "Back to Arusha",
          route: "Serengeti → Ngorongoro → Karatu → Arusha",
          activities: ["Morning game drive on departure from the Serengeti", "Return to Arusha via Ngorongoro and Karatu"],
          estimatedDuration: null,
        },
      ],
    },
    "northern-circuit-camping-safari": {
      name: "5-Day Northern Circuit Camping Safari",
      summary: "A balanced, unhurried camping safari across Tarangire, Lake Manyara, the Serengeti and the Ngorongoro Crater.",
      overview: "For adventurers wanting a balanced itinerary without rushing between parks. Camping accommodation throughout, exactly as listed on maishaquest.com's Explorer packages.",
      travellerProfile: "Adventurers wanting a balanced itinerary without rushing",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Camping — luxury, mid-range or budget tiers available" }],
      days: [
        { title: "Tarangire National Park", route: "Arusha → Tarangire National Park", activities: ["Game drive on arrival", "Overnight camping"], estimatedDuration: null },
        { title: "Tarangire to the Serengeti", route: "Tarangire → Serengeti National Park", activities: ["Wildlife viewing en route", "Overnight at a central Serengeti campsite"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Morning and afternoon game drives", "Overnight camping"], estimatedDuration: null },
        { title: "Serengeti to Ngorongoro", route: "Serengeti → Ngorongoro Crater rim", activities: ["Morning game drive", "Afternoon transfer to a campsite on the crater rim"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: "Ngorongoro Crater → Arusha", activities: ["Early descent for a half-day safari on the crater floor", "Drive back to Arusha"], estimatedDuration: null },
      ],
    },
    "six-day-camping-safari": {
      name: "6-Day Tanzania Camping Safari",
      // ⚠️ On maishaquest.com's own Explorer page, this package's "EXPLORE
      // SAFARI" button links to the same page as the 5-day package above —
      // there is no distinct confirmed itinerary for a sixth day. Days 1–5
      // repeat the confirmed 5-day itinerary; day 6 is left open rather than
      // invented. See the note at the top of `safaris.ts`.
      summary: "A sixth day added to the Northern Circuit camping safari, with the day 6 plan confirmed directly with you before booking.",
      overview: "Days 1–5 follow our confirmed 5-Day Northern Circuit Camping Safari. We'll confirm the exact plan for day 6 with you directly.",
      travellerProfile: "Adventurers wanting a balanced itinerary without rushing",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Camping — luxury, mid-range or budget tiers available" },
        { label: "Pending", value: "We'll confirm the exact plan for day 6 with you directly before booking." },
      ],
      days: [
        { title: "Tarangire National Park", route: "Arusha → Tarangire National Park", activities: ["Game drive on arrival", "Overnight camping"], estimatedDuration: null },
        { title: "Tarangire to the Serengeti", route: "Tarangire → Serengeti National Park", activities: ["Wildlife viewing en route", "Overnight at a central Serengeti campsite"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Morning and afternoon game drives", "Overnight camping"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Further game drives in a different part of the park", "Overnight camping"], estimatedDuration: null },
        { title: "Serengeti to Ngorongoro", route: "Serengeti → Ngorongoro Crater rim", activities: ["Morning game drive", "Afternoon transfer to a campsite on the crater rim"], estimatedDuration: null },
        { title: "Ngorongoro Crater — day pending confirmation", route: "Ngorongoro Crater → Arusha", activities: ["Not yet confirmed with Maisha Quest — see practical information"], estimatedDuration: null },
      ],
    },
    "extended-camping-safari": {
      name: "7-Day Extended Tanzania Camping Safari",
      summary: "An immersive camping itinerary across Tarangire, Lake Manyara, the Serengeti and the Ngorongoro Crater, with room to properly follow the Great Migration.",
      overview: "The longest of the Explorer camping itineraries, exactly as listed on maishaquest.com. Concludes with an optional cultural activity on the return to Arusha.",
      travellerProfile: "Travellers wanting the full northern circuit without hurrying",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Camping — luxury, mid-range or budget tiers available" }],
      days: [
        { title: "Tarangire National Park", route: "Arusha → Tarangire National Park", activities: ["Afternoon game drive on arrival"], estimatedDuration: null },
        { title: "Lake Manyara National Park", route: null, activities: ["Morning exploration of Lake Manyara", "Overnight near Karatu"], estimatedDuration: null },
        { title: "To the Serengeti", route: "Karatu → Ngorongoro (optional Olduvai Gorge stop) → Serengeti", activities: ["Afternoon game drive on arrival in the Serengeti"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Full day tracking the migration and predators"], estimatedDuration: "Full day" },
        { title: "Serengeti to the crater rim", route: "Serengeti → Ngorongoro Crater rim", activities: ["Morning game drive", "Afternoon arrival on the crater rim"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: "Ngorongoro Crater → Karatu", activities: ["Full crater safari", "Overnight near Karatu"], estimatedDuration: null },
        { title: "Back to Arusha", route: "Karatu → Arusha", activities: ["Scenic return drive", "Optional cultural activity along the way"], estimatedDuration: null },
      ],
    },

    /* ==================== ESCAPE — lodge + Zanzibar ===================== */
    "safari-zanzibar-escape": {
      name: "Safari & Zanzibar Escape",
      summary: "Game drives in Tarangire and the Ngorongoro Crater, then a flight to Zanzibar for Stone Town and the beach.",
      overview: "A seven-day escape combining the northern safari circuit with a coastal stay on Zanzibar, exactly as listed on maishaquest.com's Escape packages.",
      travellerProfile: "Travellers wanting to combine wildlife and beach in one trip",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Lodge on safari, beach hotel on Zanzibar — luxury, mid-range or budget tiers available" },
        { label: "Pending", value: "We'll confirm whether the internal flight to Zanzibar is included when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your hotel"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Full-day game drive: elephant herds and baobab trees"], estimatedDuration: "Full day" },
        { title: "Ngorongoro Crater", route: null, activities: ["Full-day crater exploration"], estimatedDuration: "Full day" },
        { title: "On to Zanzibar", route: "Arusha → Zanzibar", activities: ["Return to Arusha", "Flight to Zanzibar", "Check in at Stone Town"], estimatedDuration: null },
        { title: "Stone Town & spice farms", route: null, activities: ["Stone Town walking tour", "Spice plantation visit"], estimatedDuration: null },
        { title: "Beach day", route: null, activities: ["Leisure day on the beach", "Optional snorkelling, diving or kite surfing"], estimatedDuration: null },
        { title: "Departure", route: "Zanzibar → airport", activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
    "serengeti-zanzibar": {
      name: "Serengeti & Zanzibar",
      summary: "Big Five game drives in the Serengeti and Ngorongoro, followed by Stone Town and the white-sand beaches of Zanzibar.",
      overview: "An eight-day escape merging wildlife exploration with island leisure, exactly as listed on maishaquest.com's Escape packages.",
      travellerProfile: "Travellers wanting to combine wildlife and beach in one trip",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Luxury camp on safari, Stone Town or resort on Zanzibar" },
        { label: "Pending", value: "We'll confirm whether the internal flight to Zanzibar is included when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your hotel"], estimatedDuration: null },
        { title: "To the Serengeti", route: "Arusha → Serengeti", activities: ["Afternoon game drive on arrival"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Full day of game drives", "Bush picnic lunch"], estimatedDuration: "Full day" },
        { title: "Serengeti to Ngorongoro", route: "Serengeti → Ngorongoro Conservation Area", activities: ["Morning safari", "Transfer to a crater-rim lodge"], estimatedDuration: null },
        { title: "Ngorongoro Crater to Zanzibar", route: "Ngorongoro → Zanzibar", activities: ["Crater safari", "Afternoon flight to Zanzibar", "Stone Town check-in"], estimatedDuration: null },
        { title: "Stone Town & Prison Island", route: null, activities: ["Stone Town walking tour", "Prison Island boat trip with snorkelling"], estimatedDuration: null },
        { title: "Beach day", route: null, activities: ["Leisure day on the beach", "Optional water sports"], estimatedDuration: null },
        { title: "Departure", route: "Zanzibar → airport", activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
    "big-three-zanzibar": {
      name: "Big 3 + Zanzibar",
      summary: "Tarangire, the Serengeti and the Ngorongoro Crater, then Stone Town and the beach on Zanzibar.",
      overview: "A nine-day escape pairing three of Tanzania's best-known parks with time on Zanzibar, exactly as listed on maishaquest.com's Escape packages.",
      travellerProfile: "Travellers wanting to combine wildlife and beach in one trip",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Lodge on safari, Stone Town or beach resort on Zanzibar" },
        { label: "Pending", value: "We'll confirm whether the internal flight to Zanzibar is included when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Airport pickup", "Evening briefing"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Full-day safari", "Picnic lunch"], estimatedDuration: "Full day" },
        { title: "To the Serengeti", route: "Arusha → Ngorongoro highlands → Serengeti", activities: ["Drive to the central Serengeti"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Morning and afternoon game drives"], estimatedDuration: null },
        { title: "Serengeti to Ngorongoro", route: "Serengeti → Ngorongoro Crater rim", activities: ["Early game drive", "Transfer to the crater rim"], estimatedDuration: null },
        { title: "Ngorongoro Crater to Zanzibar", route: "Ngorongoro → Zanzibar", activities: ["Full crater safari", "Evening flight to Stone Town"], estimatedDuration: null },
        { title: "Stone Town & spice farms", route: null, activities: ["Stone Town walking tour", "Spice plantation visit"], estimatedDuration: null },
        { title: "Beach day", route: null, activities: ["Swimming, snorkelling or diving, as preferred"], estimatedDuration: null },
        { title: "Departure", route: "Zanzibar → airport", activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
    "safari-culture-zanzibar": {
      name: "Safari, Culture & Zanzibar",
      summary: "Wildlife safaris across Tarangire, the Serengeti and Ngorongoro, a day with the Hadzabe and Datoga communities at Lake Eyasi, then Zanzibar.",
      overview: "A ten-day journey combining safari, cultural encounters and a beach finish, exactly as listed on maishaquest.com's Escape packages.",
      travellerProfile: "Travellers wanting wildlife, culture and beach in one trip",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Lodge on safari, Stone Town or beach resort on Zanzibar" },
        { label: "Pending", value: "We'll share more detail on the Lake Eyasi stage with you directly when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Airport pickup"], estimatedDuration: null },
        { title: "Arusha city tour", route: null, activities: ["Markets, the Tanzanite Museum and the Cultural Heritage Centre"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Full-day safari", "Picnic lunch"], estimatedDuration: "Full day" },
        { title: "To the Serengeti", route: "Arusha → Ngorongoro highlands → Serengeti", activities: ["Afternoon game drive on arrival"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Morning and afternoon game drives"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: null, activities: ["Descent into the crater for game viewing"], estimatedDuration: null },
        { title: "Lake Eyasi to Zanzibar", route: "Ngorongoro → Lake Eyasi → Zanzibar", activities: ["Cultural visits with Hadzabe hunter-gatherers and Datoga blacksmiths", "Afternoon flight to Zanzibar"], estimatedDuration: null },
        { title: "Stone Town & spice farms", route: null, activities: ["Guided Stone Town tour", "Spice farm visit"], estimatedDuration: null },
        { title: "Beach day", route: null, activities: ["Optional snorkelling, kite surfing or a dhow cruise"], estimatedDuration: null },
        { title: "Departure", route: "Zanzibar → airport", activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
    "luxury-safari-zanzibar": {
      name: "Luxury Safari & Zanzibar",
      summary: "A full northern-circuit safari — Tarangire, Lake Manyara, the Serengeti and Ngorongoro, with an optional hot-air balloon flight — followed by four nights on Zanzibar.",
      overview: "A twelve-day escape aimed at couples, families and small groups wanting both safari and island time, exactly as listed on maishaquest.com's Escape packages.",
      travellerProfile: "Couples, families and small groups wanting safari thrills and island calm",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Hot-air balloon safari (optional, on day 5)"],
      practicalInfo: [
        { label: "Accommodation", value: "Lodge on safari, Stone Town or beach resort on Zanzibar" },
        { label: "Pending", value: "We'll confirm whether the internal flight to Zanzibar is included when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your hotel"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Full-day safari: baobabs, elephants and the Big Five"], estimatedDuration: "Full day" },
        { title: "Lake Manyara National Park", route: null, activities: ["Tree-climbing lions and flamingos"], estimatedDuration: null },
        { title: "To the Serengeti", route: "Arusha → Ngorongoro highlands → Serengeti", activities: ["Drive to the central Serengeti"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Optional sunrise hot-air balloon safari with a bush breakfast", "Game drives"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Full-day safari, tracking the migration when in season"], estimatedDuration: "Full day" },
        { title: "Ngorongoro Crater", route: null, activities: ["Descent into the crater for game viewing"], estimatedDuration: null },
        { title: "On to Zanzibar", route: "Arusha → Zanzibar", activities: ["Return to Arusha", "Flight to Zanzibar", "Evening dhow sunset cruise"], estimatedDuration: null },
        { title: "Spice farms & Prison Island", route: null, activities: ["Spice plantation tour", "Prison Island snorkelling trip"], estimatedDuration: null },
        { title: "Beach day", route: null, activities: ["Leisure day", "Optional water sports"], estimatedDuration: null },
        { title: "Free day", route: null, activities: ["Free day", "Sunset beach dinner"], estimatedDuration: null },
        { title: "Departure", route: "Zanzibar → airport", activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
    "grand-safari-zanzibar": {
      name: "Grand Safari & Zanzibar",
      summary: "The full northern circuit, a day with Hadzabe and Datoga communities at Lake Eyasi, then a week on Zanzibar including Jozani Forest and Kizimkazi.",
      overview: "The longest Escape itinerary on maishaquest.com: fourteen days combining an in-depth safari with an extended stay on Zanzibar.",
      travellerProfile: "Travellers wanting an unhurried, complete Tanzania journey",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Lodge on safari, Stone Town or beach resort on Zanzibar" },
        { label: "Pending", value: "We'll share more detail on the Lake Eyasi stage with you directly when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your hotel"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Full-day safari: elephant herds and baobab trees"], estimatedDuration: "Full day" },
        { title: "Lake Manyara National Park", route: null, activities: ["Tree-climbing lions and flamingos"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Migration tracking, when in season"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["River-crossing viewing, when in season"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Further game drives across the park"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: null, activities: ["Descent into the crater for a full-day safari"], estimatedDuration: "Full day" },
        { title: "Ngorongoro Crater", route: null, activities: ["Further crater game viewing"], estimatedDuration: null },
        { title: "Lake Eyasi to Zanzibar", route: "Ngorongoro → Lake Eyasi → Zanzibar", activities: ["Hadzabe and Datoga community visits", "Afternoon flight to Zanzibar"], estimatedDuration: null },
        { title: "Stone Town & spice farms", route: null, activities: ["Stone Town walking tour", "Spice farm visit", "Sunset dhow cruise"], estimatedDuration: null },
        { title: "Beach day", route: null, activities: ["Leisure day", "Optional diving, snorkelling or kite surfing"], estimatedDuration: null },
        { title: "Jozani Forest & Kizimkazi", route: null, activities: ["Red colobus monkeys at Jozani Forest", "Dolphin encounter at Kizimkazi"], estimatedDuration: null },
        { title: "Free day", route: null, activities: ["Leisure day", "Farewell oceanside dinner"], estimatedDuration: null },
        { title: "Departure", route: "Zanzibar → airport", activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },

    /* =============== ENRICH — lodge, wildlife + culture ================= */
    "tarangire-serengeti-ngorongoro-enrich": {
      name: "Tarangire, Serengeti & Ngorongoro",
      summary: "Ancient baobabs and elephant herds at Tarangire, the open plains of the Serengeti, and the Ngorongoro Crater — often called the Eighth Wonder of the World.",
      overview: "A five-day lodge-based safari across three of Tanzania's premier parks, exactly as listed on maishaquest.com's Enrich packages.",
      travellerProfile: "Travellers wanting a lodge-based introduction to the northern circuit",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Lodge — luxury, mid-range or budget tiers available" }],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your lodge"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Game drives", "Picnic lunch in the park"], estimatedDuration: null },
        { title: "To the Serengeti", route: "Arusha → highlands → Serengeti", activities: ["Evening safari on arrival"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Sunrise game drive", "Optional Maasai village visit", "Transfer towards Ngorongoro"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: "Ngorongoro Crater → Arusha", activities: ["Crater descent", "Half-day safari", "Return to Arusha"], estimatedDuration: null },
      ],
    },
    "manyara-serengeti-ngorongoro-enrich": {
      name: "Lake Manyara, Serengeti & Ngorongoro",
      summary: "Diverse landscapes and abundant wildlife, including the Big Five: tree-climbing lions, the Great Migration and the dense wildlife of the Ngorongoro Crater.",
      overview: "A seven-day lodge-based safari across Lake Manyara, the Serengeti and Ngorongoro, exactly as listed on maishaquest.com's Enrich packages.",
      travellerProfile: "Travellers wanting a fuller lodge-based safari across the northern circuit",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Lodge — luxury, mid-range or budget tiers available" }],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your hotel"], estimatedDuration: null },
        { title: "Lake Manyara National Park", route: null, activities: ["Game drive", "Picnic lunch"], estimatedDuration: null },
        { title: "To the Serengeti", route: "Lake Manyara → Ngorongoro crater rim → central Serengeti", activities: ["Travel with game viewing en route"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Full-day safari tracking the migration and predators"], estimatedDuration: "Full day" },
        { title: "Serengeti National Park", route: null, activities: ["Morning safari in the northern or southern Serengeti, depending on season"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: null, activities: ["Crater descent", "Half-day safari"], estimatedDuration: null },
        { title: "Back to Arusha", route: "Ngorongoro → Arusha", activities: ["Airport transfer"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-serengeti-ngorongoro-enrich": {
      name: "Tarangire, Lake Manyara, Serengeti & Ngorongoro",
      summary: "Elephants among the baobabs at Tarangire, tree-climbing lions and flamingos at Lake Manyara, the Serengeti's plains, and the Ngorongoro Crater.",
      overview: "An eight-day lodge-based safari across four parks, exactly as listed on maishaquest.com's Enrich packages.",
      travellerProfile: "Travellers wanting the full northern circuit from comfortable lodges",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Accommodation", value: "Lodge — luxury, mid-range or budget tiers available" }],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your hotel"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Game drives: elephants and baobab forest"], estimatedDuration: null },
        { title: "Lake Manyara National Park", route: null, activities: ["Tree-climbing lions and flamingos"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Arrival game drive"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Full-day exploration, routing depends on migration season"], estimatedDuration: "Full day" },
        { title: "Serengeti National Park", route: null, activities: ["Further game drives"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: null, activities: ["Half-day safari on the crater rim"], estimatedDuration: null },
        { title: "Back to Arusha", route: "Ngorongoro → Arusha", activities: ["Airport transfer"], estimatedDuration: null },
      ],
    },
    "cultural-safari-combo": {
      name: "Cultural + Safari Combo",
      summary: "Tribal exploration and authentic community life alongside wildlife safaris: Arusha, Tarangire, the Serengeti, Ngorongoro, Lake Eyasi and a Maasai village.",
      overview: "A ten-day journey balancing national parks with traditional community visits, exactly as listed on maishaquest.com's Enrich packages.",
      travellerProfile: "Travellers wanting cultural immersion alongside wildlife",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Lodge — luxury, mid-range or budget tiers available" },
        { label: "Pending", value: "We'll share more detail on the Lake Eyasi stage with you directly when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Airport transfer"], estimatedDuration: null },
        { title: "Arusha city tour", route: null, activities: ["Markets and the Cultural Heritage Centre"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Full-day safari"], estimatedDuration: "Full day" },
        { title: "To the Serengeti", route: "Arusha → Ngorongoro → Serengeti", activities: ["Game drives en route"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Game drives", "Optional sunset dinner"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Migration tracking expedition"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: null, activities: ["Wildlife viewing on the crater floor"], estimatedDuration: null },
        { title: "Lake Eyasi", route: null, activities: ["Visit with Hadzabe hunter-gatherers and Datoga blacksmiths"], estimatedDuration: null },
        { title: "Maasai village", route: null, activities: ["Cultural immersion visit"], estimatedDuration: null },
        { title: "Departure", route: null, activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
    "extended-safari-cultural-immersion": {
      name: "Extended Safari & Cultural Immersion",
      summary: "Wildlife exploration across four parks combined with community engagement: Hadzabe hunters, Datoga blacksmiths and Maasai villages.",
      overview: "An eleven-day journey balancing safari activities with community visits, exactly as listed on maishaquest.com's Enrich packages.",
      travellerProfile: "Travellers wanting extended cultural engagement alongside wildlife",
      bestTime: "Not specified by Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Accommodation", value: "Lodge — luxury, mid-range or budget tiers available" },
        { label: "Pending", value: "We'll share more detail on the Lake Eyasi stage with you directly when we put together your personalised proposal." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Airport transfer"], estimatedDuration: null },
        { title: "Arusha city tour", route: null, activities: ["Markets and the Tanzanite Museum"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Game drives"], estimatedDuration: null },
        { title: "Lake Manyara National Park", route: null, activities: ["Wildlife viewing"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Game drives, migration viewing when in season"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Further game drives"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Further game drives"], estimatedDuration: null },
        { title: "To Ngorongoro", route: "Serengeti → Ngorongoro", activities: ["Transfer"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: null, activities: ["Full-day safari"], estimatedDuration: "Full day" },
        { title: "Lake Eyasi & Maasai villages", route: null, activities: ["Join Hadzabe hunters for a traditional hunt and fire-making", "Datoga blacksmith and Maasai village visits"], estimatedDuration: null },
        { title: "Departure", route: null, activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
    "wildlife-leisure-culture": {
      name: "Wildlife + Leisure + Culture",
      // ⚠️ maishaquest.com's own summary for this package promises a Zanzibar
      // beach stage ("the perfect blend of adventure, relaxation, and
      // cultural immersion"), but the day-by-day itinerary on the same page
      // never leaves the mainland and ends at Kilimanjaro Airport. The
      // itinerary — the verifiable part — is published as-is; see the note
      // at the top of `safaris.ts`.
      summary: "Wildlife viewing across the northern parks, a coffee farm and Tanzanite visit, and cultural encounters with Hadzabe, Datoga and Maasai communities.",
      overview: "A twelve-day Enrich itinerary. We'll confirm the exact itinerary for this journey with you directly before booking.",
      travellerProfile: "Travellers wanting wildlife, leisure and culture combined",
      bestTime: "Year-round",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Hot-air balloon safari (optional, on day 7)"],
      practicalInfo: [
        { label: "Accommodation", value: "Lodge — luxury, mid-range or budget tiers available" },
        { label: "Pending", value: "We'll confirm the exact itinerary for this journey with you directly before booking." },
      ],
      days: [
        { title: "Arrival in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer to your hotel"], estimatedDuration: null },
        { title: "Arusha city tour", route: null, activities: ["Tanzanite experience", "Coffee plantation visit and tasting"], estimatedDuration: null },
        { title: "Tarangire National Park", route: null, activities: ["Full-day safari: elephants and baobabs"], estimatedDuration: "Full day" },
        { title: "Lake Manyara National Park", route: null, activities: ["Tree-climbing lions, hippos and flamingos"], estimatedDuration: null },
        { title: "To the Serengeti", route: "Ngorongoro highlands → central Serengeti", activities: ["Scenic drive"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Full-day game drive"], estimatedDuration: "Full day" },
        { title: "Serengeti National Park", route: null, activities: ["Optional hot-air balloon safari with a champagne breakfast", "Afternoon game drives"], estimatedDuration: null },
        { title: "Serengeti National Park", route: null, activities: ["Northern or southern Serengeti, depending on migration season"], estimatedDuration: null },
        { title: "Ngorongoro Crater", route: null, activities: ["Crater descent", "Afternoon safari"], estimatedDuration: null },
        { title: "Lake Eyasi", route: null, activities: ["Cultural experiences with Hadzabe hunters and Datoga blacksmiths"], estimatedDuration: null },
        { title: "Maasai village", route: "→ Arusha", activities: ["Traditional Maasai village visit", "Return to Arusha"], estimatedDuration: null },
        { title: "Departure", route: "Arusha → Kilimanjaro International Airport", activities: ["Transfer for your onward flight"], estimatedDuration: null },
      ],
    },
  } satisfies Record<string, SafariText>,

  destinations: {
  "serengeti": {
    name: "Serengeti",
    shortDescription: "Endless plains, and the migration that crosses them.",
    description: "Serengeti means 'endless plains' in Maa, and the name is not decoration. It is a vast, layered park — short-grass plains in the south, granite kopjes in the centre, riverine forest in the north — carrying the year-round predator populations Tanzania is known for, and the wildebeest migration that moves through it in a slow annual circle.",
    bestTime: "Year-round, depending on where the migration is",
    seasons: [{"label":"Calving","months":"January – March","note":"The herds are on the southern short-grass plains. Concentrated predator activity."},{"label":"Western corridor","months":"May – July","note":"The migration moves west and north. Grumeti river crossings."},{"label":"Northern crossings","months":"July – October","note":"Mara River crossings in the north. The most sought-after weeks of the year."}],
    wildlife: ["Lion","Leopard","Cheetah","Wildebeest","Zebra","Elephant","Hyena"],
  },
  "tarangire": {
    name: "Tarangire",
    shortDescription: "Baobabs, and the largest elephant herds in the north.",
    description: "Tarangire is built around a single river that holds water when the surrounding land does not. In the dry months that river pulls in elephant herds in numbers you rarely see elsewhere in northern Tanzania, under baobabs that are centuries old. It is quieter than the Serengeti and often the first park on a northern route.",
    bestTime: "June – October",
    seasons: [{"label":"Dry season","months":"June – October","note":"Animals concentrate along the Tarangire River. The best elephant viewing of the year."},{"label":"Green season","months":"November – May","note":"Fewer vehicles, dramatic skies and excellent birdlife. Game is more dispersed."}],
    wildlife: ["Elephant","Lion","Giraffe","Zebra","Eland","Fringe-eared oryx"],
  },
  "lake-manyara": {
    name: "Lake Manyara",
    shortDescription: "Groundwater forest, an alkaline lake, and flamingos.",
    description: "A narrow park pressed between the Rift Valley escarpment and a shallow soda lake. You drive from dense groundwater forest into open floodplain within minutes, which makes it one of the most varied short game drives in the country — and a natural half-day stop between Arusha and the Ngorongoro highlands.",
    bestTime: "June – October for game, November – April for birds",
    seasons: [],
    wildlife: ["Elephant","Giraffe","Hippo","Baboon","Flamingo","Pelican"],
  },
  "ngorongoro": {
    name: "Ngorongoro",
    shortDescription: "A collapsed volcano holding an entire ecosystem.",
    description: "The Ngorongoro Crater is the largest intact volcanic caldera in the world, and its floor holds grassland, forest, a soda lake and a resident population of large mammals that does not need to migrate. You descend from a cold, misty rim into it at first light. It is also a conservation area where Maasai communities and wildlife share the land.",
    bestTime: "Year-round",
    seasons: [{"label":"Dry season","months":"June – October","note":"Clear crater views and easy tracks. The busiest months on the floor."},{"label":"Green season","months":"November – May","note":"Green crater floor, calving on the nearby Ndutu plains from January."}],
    wildlife: ["Black rhino","Lion","Elephant","Buffalo","Hyena","Flamingo"],
  },
  "kilimanjaro": {
    name: "Kilimanjaro",
    shortDescription: "The highest point in Africa, walked from base to summit.",
    description: "Kilimanjaro is climbed, not driven. Over five to nine days you walk from farmland through rainforest, moorland and alpine desert to a glaciated summit at 5,895 metres — five climates in one week. Route choice, pacing and acclimatisation matter more than fitness, and we plan them around you.",
    bestTime: "January – March and June – October",
    seasons: [],
    wildlife: ["Colobus monkey","Blue monkey","Malachite sunbird"],
  },
  "nyerere": {
    name: "Nyerere",
    shortDescription: "Boat safaris on the Rufiji, in Africa's largest park.",
    description: "Nyerere National Park — carved from the former Selous Game Reserve — is defined by the Rufiji River and its network of lakes and channels. It is one of the few places in Tanzania where you can track game on foot in the morning and from a boat in the afternoon, with a fraction of the vehicles of the northern circuit.",
    bestTime: "June – October",
    seasons: [],
    wildlife: ["Elephant","Hippo","Crocodile","African wild dog","Buffalo","Lion"],
  },
  "ruaha": {
    name: "Ruaha",
    shortDescription: "Baobab country, big herds, and almost no one else.",
    description: "Ruaha sits where southern and eastern African ecosystems overlap, which is why you find greater and lesser kudu in the same park. It is remote, rugged and very lightly visited — the choice for travellers who have done the northern circuit and want the wild version of it.",
    bestTime: "June – October",
    seasons: [],
    wildlife: ["Elephant","Lion","Greater kudu","Sable antelope","African wild dog"],
  },
  "zanzibar": {
    name: "Zanzibar",
    shortDescription: "Indian Ocean, dhow sails and Stone Town.",
    description: "Zanzibar is where most journeys end: white sand and warm shallow water on the north and east coasts, and Stone Town — a UNESCO World Heritage site of coral-rag alleys, carved doors and Swahili, Omani and Indian history — on the west. Two nights is a pause; five is a holiday of its own.",
    bestTime: "June – October and December – February",
    seasons: [],
    wildlife: ["Red colobus monkey","Dolphins","Reef fish","Green turtle"],
  },
  "arusha": {
    name: "Arusha",
    shortDescription: "Where every journey begins — and where we live.",
    description: "Arusha sits in the shadow of Mount Meru, at the foot of the northern circuit. It is the gateway to the Serengeti and Ngorongoro, and it is also home: our office, our guides and our vehicles are here. Most journeys start with a night in Arusha, a proper briefing and an unhurried first morning.",
    bestTime: "Year-round",
    seasons: [],
    wildlife: ["Colobus monkey","Blue monkey","Forest birdlife"],
  },
  } satisfies Record<string, DestinationText>,

  /**
   * The 5 real categories from maishaquest.com's Experiences section, each
   * corresponding to its own page there (/thrill-seaker-adventures,
   * /water-activities, /tours, /shopping-and-leisure, /nightlife). The
   * `description` for each lists the real activities/venues published on
   * that page, faithfully — nothing invented, nothing summarised away.
   * None of these activities or venues have a published price.
   */
  experiences: {
    "thrill-seeker-adventure": {
      name: "Thrill Seeker Adventure",
      shortDescription: "Safari means journey in Swahili — explore adventurous frontiers in every corner of Tanzania with the best operators.",
      description: "Skydiving over Kendwa Beach, Zanzibar. Zip lining through the banana plantations and forests of Mto wa Mbu, two hours from Arusha. Tandem paragliding over the Rift Valley at Monduli, ninety minutes from Arusha (seasonal). Mountain biking through coffee plantations and villages near Usa River and Rau Forest, close to Moshi and Arusha, with Kilimanjaro views. Horseback riding along the beaches of Nungwi, Zanzibar. Mountain trekking on Kilimanjaro, Mount Meru or the Usambara Mountains. Hiking to the Materuni and Napuru waterfalls near Moshi and Arusha, with cultural visits to Chagga and Meru communities. Swimming with dolphins at Kizimkazi, Zanzibar. And, seasonally from November to March, swimming with whale sharks off Mafia Island. As listed on maishaquest.com's Thrill Seeker Adventure page.",
    },
    "water-activities": {
      name: "Water Activities",
      shortDescription: "Water is the source of all life — leave the mainland behind for a range of water sports along the coast and beyond.",
      description: "Snorkelling at Mnemba Atoll, Zanzibar. Scuba diving with PADI-certified centres in Zanzibar and Mafia Island. Kite surfing at Paje Beach, Zanzibar, one of the world's best kite surfing beaches (seasonal, daily lessons). Canoeing on Lake Duluti, a crater lake twenty minutes from Arusha. Jet skiing at Kendwa and Nungwi, Zanzibar. Fishing on Lake Victoria and the Zanzibar coast, from traditional outings with local fishermen to big-game fishing. Boat trips on Lake Victoria and the Indian Ocean, from sunset cruises to traditional dhow trips. Day trips to Bongoyo Island and Mbudya Island, both near Dar es Salaam, for snorkelling and beach picnics. Private yacht charters out of Dar es Salaam and Zanzibar. And guided visits to Zanzibar's freshwater caves. As listed on maishaquest.com's Water Activities page.",
    },
    "tours-and-safaris": {
      name: "Tours & Safaris",
      shortDescription: "Discover hidden gems on a journey through places with their own stories to tell.",
      description: "Museum tours in Dar es Salaam and Arusha, including the National Museum, the Arusha Declaration Museum and the Natural History Museum. City tours of Arusha, Dar es Salaam, Zanzibar and Mwanza. Village tours at Mto wa Mbu and in Maasai villages. Art gallery visits at Nafasi Art Space in Dar es Salaam and the Cultural Heritage Centre in Arusha. A hike to Materuni Falls near Moshi with a traditional coffee-making experience hosted by the Chagga community. Napuru Falls, twenty minutes from Arusha, for hiking, quad biking and picnics. Lake Duluti, also twenty minutes from Arusha, for canoeing, fishing and birdwatching. The Meserani Snake Park and Maasai Museum, thirty minutes from Arusha. The Arusha Giraffe Centre. Coffee and banana farm tours in Moshi and Arusha. And gemstone and Tanzanite tours in Arusha and the Mererani mines. As listed on maishaquest.com's Tours page.",
    },
    "shopping-and-leisure": {
      name: "Shopping and Leisure",
      shortDescription: "The best way to spend free time: rejuvenate with the offers, energy and excitement on hand.",
      description: "The Maasai Market in Arusha, best visited on Saturdays. The Cultural Heritage Centre in Arusha, with art, artefacts, jewellery and a café. AIM Mall in Arusha, with boutiques, a cinema and dining. The Slipway Shopping Centre in Dar es Salaam, for seaside shopping and dining. The shops of Stone Town, Zanzibar, for traditional Swahili crafts, spices and clothing. Mlimani City Mall, the largest mall in Tanzania, in Dar es Salaam. Rock City Mall in Mwanza. And spa days at Lemon Spa in Arusha, Ocean Spa in Dar es Salaam and Zanzibar, or Honey Spa in Moshi. As listed on maishaquest.com's Shopping and Leisure page.",
    },
    nightlife: {
      name: "Nightlife",
      shortDescription: "The music doesn't stop — the coolest spots in town, wherever your journey takes you.",
      description: "In Arusha: Via Via for outdoor live music and cultural nights, Rafiki Juice Bar for cocktails and DJs, Kesho Café for jazz and poetry, Pillars for live bands, and clubs including Aces, Club D, The Hub and El Toro for Bongo Flava and international hits. In Dar es Salaam: Samaki Samaki for dinner and dancing, Elements for rooftop cocktails, Tips Lounge for hip-hop and Bongo Flava, Wavuvi Camp for beach parties, Coco Beach Strip, Cocktails & Dreams, The Reef, and clubs including Uncles, Kitamba Cheupe, Havoc and Warehouse. In Zanzibar: Sky Bar overlooking Stone Town, Jambo Beach, the Full Moon Party at Kendwa Rocks, and lounges including 6 Degrees South, Garage Club and Tatu. In Mwanza: Cask n Grill and Tilapia Lounge. As listed on maishaquest.com's Nightlife page.",
    },
  } satisfies Record<string, ExperienceText>,

  collections: {
  "explorer": {
    tagline: "For travellers drawn to wild landscapes, adventure and discovery.",
    description: "The active version of Tanzania. Longer days in the field, camps that move with the wildlife, time on foot as well as in the vehicle, and routes that reach the parts of a park most vehicles never get to.",
    travellerProfile: "Active travellers, photographers, returning safari-goers",
    traits: ["Mobile camping","Game drives","Walking & trekking","Remote routes"],
  },
  "escape": {
    tagline: "For travellers seeking space, comfort and effortless connection.",
    description: "Slower, softer, and entirely taken care of. Fewer parks and more nights in each, lodges chosen for where they sit and what you see from them, and an ending on the Indian Ocean.",
    travellerProfile: "Couples, honeymooners, first-time safari travellers",
    traits: ["Lodges & boutique camps","Couples & honeymoons","Wellbeing","Zanzibar"],
  },
  "enrich": {
    tagline: "For travellers who want to experience Tanzania more deeply.",
    description: "Tanzania beyond the game drive. Days with communities and conservation teams, food and coffee where they are grown, and private access arranged directly with the people who host it.",
    travellerProfile: "Curious travellers, families with older children, repeat visitors",
    traits: ["Culture","Cuisine","Communities","Conservation"],
  },
  } satisfies Record<CollectionId, CollectionText>,

  /**
   * The 3 real articles from maishaquest.com/blog, by Talisa Tufts,
   * published 29 April 2025. Reproduced faithfully, including the fact
   * that two of the three explicitly discuss the site's own move to Wix —
   * that is genuinely what these articles say, not an editorial choice.
   */
  journal: {
    "elevate-your-safari-experience": {
      title: "Elevate Your Safari Experience: Maisha Quest's Tailored Adventures",
      excerpt: "A look at Maisha Quest's Explorer, Escape and Enrich packages, and at the move to a new Wix-built website with tailored safari forms and a full company profile.",
      category: "Company news",
      body: [
        "Are you dreaming of an unforgettable safari experience that goes beyond the ordinary? Look no further than Maisha Quest, a premier safari company based in Arusha, Tanzania, that specializes in creating tailored adventures that cater to your every desire.",
        "Maisha Quest is on a mission to redefine the safari experience by offering unique, authentic, and sustainable journeys that not only showcase the stunning landscapes of Tanzania but also delve deep into its rich history and diverse cultures. With a focus on sustainable destination development, Maisha Quest ensures that every journey contributes to the preservation of wildlife, the enrichment of local communities, and the promotion of Tanzania as a vibrant and dynamic destination. Whether you're an adventurous explorer, a relaxation seeker, or a cultural enthusiast, Maisha Quest has the perfect package for you. Their Explorer Packages are designed for thrill-seekers who crave adrenaline-pumping experiences in the heart of the wilderness. If you're looking to unwind and bask in the beauty of nature, the Escape Packages offer a serene retreat amidst breathtaking scenery. And for those who want to immerse themselves in the vibrant culture and urban life of Tanzania, the Enrich Packages provide a deep dive into the local customs and traditions. In addition to their carefully curated safari experiences, Maisha Quest is also dedicated to providing top-notch customer service and ensuring that every aspect of your journey is seamlessly taken care of. The company is in the process of transitioning to Wix, a move that will enhance website monitoring, improve SEO capabilities, boost performance, facilitate easier management, and provide access to advanced design tools. The new website will feature an elegant and classy design reminiscent of top-tier wilderness destinations, as well as a user-friendly section where you can fill out tailored safari forms and explore the company's profile. So, if you're ready to elevate your safari experience to new heights and embark on a journey of a lifetime, trust Maisha Quest to craft a bespoke adventure that exceeds all your expectations. Book your tailored safari today and get ready to immerse yourself in the magic of Tanzania like never before.",
      ],
    },
    "unleash-your-wanderlust": {
      title: "Unleash Your Wanderlust: Maisha Quest Safari Adventures Await",
      excerpt: "Why Maisha Quest frames its Explorer, Escape and Enrich packages around sustainable tourism — and what's changing with the company's move to a new website.",
      category: "Company news",
      body: [
        "Are you ready to embark on a once-in-a-lifetime safari adventure that will not only ignite your wanderlust but also contribute to the preservation of wildlife and the enrichment of local communities? Look no further than Maisha Quest Safari Adventures based in the breathtaking landscapes of Arusha, Tanzania.",
        "Maisha Quest is not your typical safari company. They are on a mission to challenge stereotypes and showcase the rich history, diverse cultures, and stunning landscapes of Africa. With a commitment to sustainable tourism, Maisha Quest offers a range of carefully crafted safari experiences that cater to various types of travelers. For the adventure seekers, the Explorer Packages are perfect for those looking to immerse themselves in the untamed wilderness and get up close and personal with the majestic wildlife of Tanzania. If relaxation and scenic beauty are more your style, the Escape Packages offer a tranquil retreat into the heart of nature. And for those eager to delve deep into the cultural tapestry of Tanzania, the Enrich Packages provide a truly immersive and eye-opening experience.",
        "In addition to offering unforgettable safari experiences, Maisha Quest is dedicated to the sustainable development of Tanzania as a destination. By choosing Maisha Quest for your next adventure, you are not only embarking on an incredible journey but also contributing to the conservation of wildlife and the empowerment of local communities. Exciting news is on the horizon for Maisha Quest as they are gearing up to launch a new and improved website on Wix. This move will enable better monitoring, SEO optimization, enhanced performance, easier management, and access to top-notch design tools. The sleek and classy website design will mirror the elegance of leading travel sites, providing a seamless user experience for visitors. One of the key features of the new website will be a section where travelers can fill out tailored safari forms to customize their experience. Additionally, a comprehensive company profile will be available for visitors to learn more about Maisha Quest's values, mission, and commitment to sustainable tourism. So, if you are ready to unleash your wanderlust and embark on a safari adventure like no other, Maisha Quest Safari Adventures awaits. Get ready to explore the untamed beauty of Tanzania, immerse yourself in its vibrant cultures, and make a positive impact on the world.",
      ],
    },
    "discover-tanzanias-hidden-gems": {
      title: "Discover Tanzania's Hidden Gems: Maisha Quest Safari Experiences",
      excerpt: "Maisha Quest's Explorer, Escape and Enrich packages, and a first look at the company's move to a redesigned, Wix-built website.",
      category: "Company news",
      body: [
        "Are you an adventurous traveler on the lookout for a safari experience like no other? Look no further than Maisha Quest, a premier safari company based in Arusha, Tanzania, offering a range of unique and sustainable safari experiences.",
        "Maisha Quest is on a mission to challenge stereotypes and showcase the rich history, diverse cultures, and breathtaking landscapes of Africa. With a commitment to sustainable destination development, this company envisions a world where every journey contributes to wildlife preservation, uplifts local communities, and highlights Tanzania as an exciting and vibrant destination. Whether you're an adventure seeker, a relaxation enthusiast, or a cultural explorer, Maisha Quest has the perfect safari package for you. From Explorer Packages for the thrill-seekers to Escape Packages for those craving serenity and natural beauty, and Enrich Packages for travelers longing for immersive cultural experiences, there's something for everyone. In a bid to enhance user experience and streamline operations, the owner of Maisha Quest is planning to transition the website to Wix. This move will not only improve monitoring, SEO performance, and management but will also provide better design tools, giving visitors a more elegant and classy browsing experience similar to the renowned Wilderness Destinations website. One standout feature of the upcoming website will be the inclusion of tailored safari forms, allowing visitors to customize their safari experience and make their trip truly unforgettable. Additionally, the website will showcase the company profile, giving insight into Maisha Quest's ethos, values, and commitment to sustainable tourism. So, if you're ready to embark on a safari journey like never before, keep an eye out for Maisha Quest's revamped website, where adventure, relaxation, and cultural immersion await. It's time to discover Tanzania's hidden gems and create memories that will last a lifetime.",
      ],
    },
  } satisfies Record<string, JournalText>,

  faq: {
  "best-time-to-visit": {
    question: "When is the best time to visit Tanzania?",
    answer: "There is no single best month — there is a best month for what you want to see. June to October is the dry season, with the easiest game viewing and the northern Serengeti river crossings from July. January to March brings the calving on the southern plains and the clearest months for Kilimanjaro. November to May is the green season: fewer vehicles, dramatic skies, superb birdlife and more dispersed game. Tell us your dates and we will tell you honestly what they are good for.",
  },
  "how-far-in-advance": {
    question: "How far in advance should we book?",
    answer: "The camps and lodges worth staying in are small, and the best-placed ones fill first — particularly for the northern Serengeti crossings and for travel over Christmas and New Year. If your dates are fixed, start the conversation early. If they are flexible, we have more room to work with.",
  },
  "what-does-private-mean": {
    question: "What does a 'private' safari actually mean?",
    answer: "Your own vehicle, your own guide, and an itinerary that belongs to your party alone. You decide when to leave in the morning, how long to stay with an animal and when to stop for lunch. You are not sharing a vehicle with strangers or following a fixed group departure.",
  },
  "single-travellers": {
    question: "Do you take solo travellers and small groups?",
    answer: "Yes. Every journey we build is private, whether that is one traveller or a family of ten. Single supplements apply at most camps and lodges, and we will show you what they are before you commit to anything.",
  },
  "children": {
    question: "Can we travel with children?",
    answer: "Yes, and family journeys are one of the things we plan most. Some camps set minimum ages and some activities — walking safaris in particular — have age limits. We check those against your family before proposing anything, rather than after.",
  },
  "visa-and-entry": {
    question: "Do we need a visa?",
    answer: "Most visitors need a visa to enter Tanzania, and for many nationalities it can be applied for online in advance through the Tanzanian immigration service. Requirements depend on your passport and change from time to time, so check the official immigration website for your country close to travel. We will point you to it when you book.",
  },
  "vaccinations": {
    question: "What about vaccinations and malaria?",
    answer: "Tanzania is a malaria area, and a yellow fever certificate is required if you are arriving from a country where yellow fever is a risk. What you need depends on your health, your route and where you are flying from — speak to a travel clinic or your doctor well before departure. We are not able to give medical advice.",
  },
  "languages": {
    question: "Which languages do you work in?",
    answer: "We plan and host in English and Swahili, and Talisa also speaks Russian and Mandarin Chinese. For other languages we will tell you plainly what we can arrange rather than promising a guide we cannot provide.",
  },
  "what-to-pack": {
    question: "What should we pack?",
    answer: "Neutral colours, layers for cold early mornings and warm middays, a proper hat, binoculars and more camera storage than you think you need. Internal flights between parks have strict luggage limits, usually in soft bags. You will get a packing list built for your specific route.",
  },
  "how-to-start": {
    question: "How does planning a journey with you work?",
    answer: "You tell us roughly when, roughly how long and what matters to you. We come back with a proposed route and an honest view of what it costs and what it involves. You change it as many times as you need. Nothing is confirmed until you are happy with it.",
  },
  } satisfies Record<string, FaqText>,

  team: {
  "talisa-tufts": {
    role: "Founder",
    bio: "Talisa founded Maisha Quest after a career in international tourism and hospitality. She speaks English, Swahili, Russian and Mandarin, which is why travellers from Moscow or Shanghai are looked after in their own language from the first conversation about your journey.",
    specialty: "Journey design and multilingual guest relations",
    favouritePlace: null,
  },
  "frank-lyatuu": {
    role: "Co-founder — Operations",
    bio: "Frank is from Arusha, and the routes Maisha Quest travels are the ones he knows from driving them. He handles operations, hospitality and the practical side of putting a safari together — the vehicles, the timings, the people at every gate.",
    specialty: "Safari operations and local knowledge",
    favouritePlace: null,
  },
  "tina-ngabo": {
    role: "Co-founder — Guest Experience",
    bio: "Tina brings international hospitality experience to the part of the journey travellers feel most: how they are looked after. She is the person making sure the details you mentioned once in an email are waiting for you in Tanzania.",
    specialty: "Guest experience and service standards",
    favouritePlace: null,
  },
  } satisfies Record<string, TeamText>,

  /**
   * The 2 real social programmes named on maishaquest.com — replacing the 4
   * generic pillars (education/conservation/community/employment) that
   * didn't correspond to anything the client names on its own site. See the
   * note at the top of `src/data/structure/impact.ts`.
   */
  impact: {
    "maisha-quest-cares": {
      title: "Maisha Quest Cares — Teenage Troubled Youth Program",
      description: "A programme for teenagers who have lost their way — after losing parents, through broken homes, or difficult circumstances — many of whom end up living on the street, vulnerable to crime and substance abuse. It provides a safe home with food and shelter; skills training with partners across trades including mechanics, carpentry, tailoring, craft arts, hospitality and agriculture; sponsored education and mentorship covering training costs and school fees; and ongoing support to help each young person build self-worth, a sense of purpose and hope for the future.",
      location: null,
    },
    empowerment: {
      title: "Empowerment — fair employment for young Tanzanians",
      description: "Maisha Quest's own team — guides, drivers, cooks and office staff — is hired and trained in Tanzania. The company describes fair employment, skill development and a supportive environment for its people as being as much a measure of its work as the journeys it builds for travellers, and says it is investing in young Tanzanians who will go on to lead in tourism beyond Maisha Quest itself.",
      location: "Arusha, Tanzania",
    },
  } satisfies Record<string, ImpactText>,

  /**
   * The 6 real topics from maishaquest.com's Learn page. Each description
   * is a faithful, condensed summary of the source page — every fact named
   * is verifiable there, though the real page carries more detail than is
   * reproduced here.
   */
  learnTopics: {
    geography: {
      name: "Geography & Nature",
      description: "Tanzania holds an unusual range of ecosystems in one country: the snow-capped summit of Mount Kilimanjaro, the open plains of the Serengeti, the deep waters of Lake Tanganyika and the coral reefs off Zanzibar. The Ngorongoro Crater, the largest unbroken volcanic caldera in the world, is sometimes called Africa's Garden of Eden for the density of wildlife its floor supports, including all of the Big Five. In the north, Lake Natron's highly alkaline water is inhospitable to most life but a breeding ground for millions of flamingos.",
    },
    culture: {
      name: "Culture",
      description: "Swahili and English are Tanzania's official languages, but the country is home to more than 120 ethnic groups, each with its own language and traditions. Tanzanian art is known internationally for the Tinga Tinga painting style — bright, stylised depictions of animals and daily life — and for Makonde wood carving. The Maasai are recognised by their brightly coloured shuka cloth, worn draped over the shoulders.",
    },
    history: {
      name: "History",
      description: "Olduvai Gorge, sometimes called the Cradle of Mankind, is one of the world's most important paleoanthropological sites. In 1871, the explorer Henry Morton Stanley met the missionary Dr David Livingstone in Ujiji, on the shore of Lake Tanganyika. Between 1905 and 1907, the Maji Maji Rebellion united several ethnic groups against German colonial rule — one of the most significant uprisings of that period in East Africa.",
    },
    "wildlife-and-conservation": {
      name: "Wildlife & Conservation",
      description: "Thousands of elephants move each year between the Serengeti and Tarangire National Park, part of one of the largest elephant migrations in Africa. Tanzania has also made real progress on conservation of the black rhino and the African wild dog. At Gombe Stream National Park, on the shore of Lake Tanganyika, Dr Jane Goodall began her research on wild chimpanzees in the 1960s — research that continues there today.",
    },
    economy: {
      name: "Economy & Development",
      description: "Agriculture is the backbone of Tanzania's economy and employs most of the population; the country is among the world's largest producers of cloves and sisal. Tanzania is also the only place on Earth where Tanzanite is found — mined in the Mererani Hills, near Mount Kilimanjaro, and prized for its deep blue-violet colour.",
    },
    festivals: {
      name: "Cultural Events & Festivals",
      description: "The Wanyambo Festival, held annually in Bukoba near Lake Victoria, celebrates the culture of the Haya people with traditional dance, music and food. The Karibu Music Festival in Bagamoyo is one of the largest music events in East Africa, mixing traditional and contemporary African music.",
    },
  } satisfies Record<string, LearnTopicText>,

  /**
   * The 5 official regions of maishaquest.com. `description` condenses the
   * real People/Culture/Place/History sections of each region's own page —
   * faithful, not exhaustive. Two regions (Lake Zone & Western, Coastal)
   * have no destination page on this site yet, noted honestly rather than
   * invented.
   */
  regions: {
    northern: {
      name: "Northern Region",
      description: "Home to more than 120 ethnic groups, including the Maasai, the Chagga of the Kilimanjaro slopes and the Hadzabe, one of Africa's last hunter-gatherer peoples. This is Tanzania's best-known safari ground: Mount Kilimanjaro, Africa's highest peak, rises here in five distinct climate zones; the Serengeti hosts the annual Great Migration; and Olduvai Gorge, the Cradle of Mankind, has yielded human-ancestor fossils dating back 3.6 million years. Northern Tanzania was under German colonial rule until the First World War, then a British mandate until independence in 1961 under Julius Nyerere.",
    },
    "central-southern": {
      name: "Central & Southern Region",
      description: "The Gogo people are the dominant group around the capital, Dodoma, traditionally pastoralists and farmers; further south live the Yao, the Makonde — famous for their wood carving — the Ngoni and the Hehe. Dodoma became Tanzania's capital in 1973, part of a plan to develop the country's interior. To the south, the Selous Game Reserve (now largely Nyerere National Park) is one of the largest game reserves in the world and a UNESCO World Heritage Site, home to large elephant and African wild dog populations along the Rufiji River; Ruaha National Park, Tanzania's largest, is known for its lion prides. The offshore city-state of Kilwa Kisiwani, also a UNESCO World Heritage Site, traded gold, ivory and slaves across the Indian Ocean from the 9th to the 15th century.",
    },
    "lake-zone-western": {
      name: "Lake Zone & Western Region",
      description: "Around Lake Victoria, Africa's largest lake, live the Sukuma — Tanzania's largest ethnic group — alongside the Haya, known for banana and coffee farming, and fishing communities that depend on Nile perch and tilapia. Along Lake Tanganyika, one of the world's oldest and deepest lakes, communities still fish at night from dugout canoes using lanterns. Mwanza, the 'Rock City' on Lake Victoria's shore, is the region's economic hub; Gombe Stream and Mahale Mountains National Parks, both on Lake Tanganyika, are among Africa's best places for chimpanzee trekking. Maisha Quest does not yet publish a destination page for this region.",
    },
    coastal: {
      name: "Coastal Region",
      description: "The Swahili people have lived along Tanzania's mainland coast for centuries, a culture blending African, Arab and Persian influences, expressed in Taarab music and in dishes like pilau and mandazi. Dar es Salaam, the country's largest city, is its economic centre; Bagamoyo, once the capital of German East Africa, and Kilwa Kisiwani, a UNESCO World Heritage Swahili city-state, are rich in history. Saadani National Park, on the coast north of Dar es Salaam, is Tanzania's only wildlife reserve directly on the ocean. Maisha Quest does not yet publish a destination page for this region.",
    },
    "zanzibar-island": {
      name: "Zanzibar Island",
      description: "Known as the Spice Island, Zanzibar comprises two main islands, Unguja and Pemba, some 25 to 50 kilometres off the Tanzanian mainland. Its population is predominantly Swahili-speaking and Muslim, with African, Arab, Persian and Indian roots reflected in its Taarab music and in Stone Town's Arabesque architecture and carved wooden doors — Stone Town is a UNESCO World Heritage Site. Arab traders settled here from the 8th century; the islands became a centre of the spice trade under the Sultanate of Oman in the 19th century and a British protectorate soon after, gaining independence in 1963 and uniting with Tanganyika in 1964 to form Tanzania. Jozani Forest is home to the endemic Zanzibar red colobus monkey.",
    },
  } satisfies Record<string, RegionText>,
};

/** Forma que deben cumplir los otros cinco idiomas. */
export type ContentDictionary = typeof enContent;
