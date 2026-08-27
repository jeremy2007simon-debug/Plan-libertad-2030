import type { Destination } from "@/types/content";
import { PHOTOS } from "./photography";
import { formatCoordinates, projectToMap } from "@/lib/map";

/**
 * Destinos de Maisha Quest.
 *
 * Las coordenadas son las reales del parque o la localidad; la posición en el
 * mapa se calcula desde ellas con `projectToMap`, nunca a mano. Las
 * descripciones son geográficas y verificables: mejor época, fauna presente y
 * carácter del sitio. No hay ninguna afirmación sobre alojamientos concretos,
 * tarifas ni acuerdos comerciales — eso lo confirma el equipo de Arusha.
 */

function coords(lat: number, lng: number) {
  return { lat, lng, label: formatCoordinates(lat, lng) };
}

function at(lat: number, lng: number) {
  const p = projectToMap(lat, lng);
  return { x: p.x, y: p.y };
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "arusha",
    name: "Arusha",
    region: "Gateway",
    shortDescription:
      "Where every journey begins — and where we live.",
    description:
      "Arusha sits in the shadow of Mount Meru, at the foot of the northern circuit. It is the gateway to the Serengeti and Ngorongoro, and it is also home: our office, our guides and our vehicles are here. Most journeys start with a night in Arusha, a proper briefing and an unhurried first morning.",
    coordinates: coords(-3.3869, 36.683),
    bestTime: "Year-round",
    wildlife: ["Colobus monkey", "Blue monkey", "Forest birdlife"],
    experienceSlugs: ["cultural-encounters", "coffee-and-cuisine"],
    image: PHOTOS.arusha,
    mapPosition: at(-3.3869, 36.683),
  },
  {
    slug: "tarangire",
    name: "Tarangire",
    region: "Northern Circuit",
    shortDescription: "Baobabs, and the largest elephant herds in the north.",
    description:
      "Tarangire is built around a single river that holds water when the surrounding land does not. In the dry months that river pulls in elephant herds in numbers you rarely see elsewhere in northern Tanzania, under baobabs that are centuries old. It is quieter than the Serengeti and often the first park on a northern route.",
    coordinates: coords(-4.0, 36.0),
    bestTime: "June – October",
    seasons: [
      {
        label: "Dry season",
        months: "June – October",
        note: "Animals concentrate along the Tarangire River. The best elephant viewing of the year.",
      },
      {
        label: "Green season",
        months: "November – May",
        note: "Fewer vehicles, dramatic skies and excellent birdlife. Game is more dispersed.",
      },
    ],
    wildlife: ["Elephant", "Lion", "Giraffe", "Zebra", "Eland", "Fringe-eared oryx"],
    experienceSlugs: ["game-drives", "walking-safari", "family-safari"],
    image: PHOTOS["tarangire-baobab"],
    gallery: [PHOTOS["tarangire-elephants"], PHOTOS["tarangire-baobab"]],
    mapPosition: at(-4.0, 36.0),
  },
  {
    slug: "lake-manyara",
    name: "Lake Manyara",
    region: "Northern Circuit",
    shortDescription: "Groundwater forest, an alkaline lake, and flamingos.",
    description:
      "A narrow park pressed between the Rift Valley escarpment and a shallow soda lake. You drive from dense groundwater forest into open floodplain within minutes, which makes it one of the most varied short game drives in the country — and a natural half-day stop between Arusha and the Ngorongoro highlands.",
    coordinates: coords(-3.5833, 35.8167),
    bestTime: "June – October for game, November – April for birds",
    wildlife: ["Elephant", "Giraffe", "Hippo", "Baboon", "Flamingo", "Pelican"],
    experienceSlugs: ["game-drives", "birdwatching"],
    image: PHOTOS["lake-manyara"],
    gallery: [PHOTOS["lake-manyara-giraffe"]],
    mapPosition: at(-3.5833, 35.8167),
  },
  {
    slug: "ngorongoro",
    name: "Ngorongoro",
    region: "Northern Circuit",
    shortDescription: "A collapsed volcano holding an entire ecosystem.",
    description:
      "The Ngorongoro Crater is the largest intact volcanic caldera in the world, and its floor holds grassland, forest, a soda lake and a resident population of large mammals that does not need to migrate. You descend from a cold, misty rim into it at first light. It is also a conservation area where Maasai communities and wildlife share the land.",
    coordinates: coords(-3.1667, 35.5833),
    bestTime: "Year-round",
    seasons: [
      {
        label: "Dry season",
        months: "June – October",
        note: "Clear crater views and easy tracks. The busiest months on the floor.",
      },
      {
        label: "Green season",
        months: "November – May",
        note: "Green crater floor, calving on the nearby Ndutu plains from January.",
      },
    ],
    wildlife: ["Black rhino", "Lion", "Elephant", "Buffalo", "Hyena", "Flamingo"],
    experienceSlugs: ["game-drives", "cultural-encounters", "conservation"],
    image: PHOTOS["ngorongoro-crater"],
    gallery: [PHOTOS["ngorongoro-zebras"]],
    mapPosition: at(-3.1667, 35.5833),
  },
  {
    slug: "serengeti",
    name: "Serengeti",
    region: "Northern Circuit",
    shortDescription: "Endless plains, and the migration that crosses them.",
    description:
      "Serengeti means 'endless plains' in Maa, and the name is not decoration. It is a vast, layered park — short-grass plains in the south, granite kopjes in the centre, riverine forest in the north — carrying the year-round predator populations Tanzania is known for, and the wildebeest migration that moves through it in a slow annual circle.",
    coordinates: coords(-2.3333, 34.8333),
    bestTime: "Year-round, depending on where the migration is",
    seasons: [
      {
        label: "Calving",
        months: "January – March",
        note: "The herds are on the southern short-grass plains. Concentrated predator activity.",
      },
      {
        label: "Western corridor",
        months: "May – July",
        note: "The migration moves west and north. Grumeti river crossings.",
      },
      {
        label: "Northern crossings",
        months: "July – October",
        note: "Mara River crossings in the north. The most sought-after weeks of the year.",
      },
    ],
    wildlife: ["Lion", "Leopard", "Cheetah", "Wildebeest", "Zebra", "Elephant", "Hyena"],
    experienceSlugs: [
      "game-drives",
      "great-migration",
      "balloon-safari",
      "photographic-safari",
      "mobile-camping",
    ],
    image: PHOTOS["serengeti-plains"],
    gallery: [
      PHOTOS["serengeti-lion"],
      PHOTOS["wildebeest-migration"],
      PHOTOS["serengeti-cheetah"],
      PHOTOS["serengeti-sunrise"],
    ],
    mapPosition: at(-2.3333, 34.8333),
  },
  {
    slug: "kilimanjaro",
    name: "Kilimanjaro",
    region: "Northern Circuit",
    shortDescription: "The highest point in Africa, walked from base to summit.",
    description:
      "Kilimanjaro is climbed, not driven. Over five to nine days you walk from farmland through rainforest, moorland and alpine desert to a glaciated summit at 5,895 metres — five climates in one week. Route choice, pacing and acclimatisation matter more than fitness, and we plan them around you.",
    coordinates: coords(-3.0674, 37.3556),
    bestTime: "January – March and June – October",
    wildlife: ["Colobus monkey", "Blue monkey", "Malachite sunbird"],
    experienceSlugs: ["kilimanjaro-trek", "walking-safari"],
    image: PHOTOS["kilimanjaro-kibo"],
    gallery: [PHOTOS["kilimanjaro-shira"], PHOTOS["kilimanjaro-climbers"]],
    mapPosition: at(-3.0674, 37.3556),
  },
  {
    slug: "nyerere",
    name: "Nyerere",
    region: "Southern Circuit",
    shortDescription: "Boat safaris on the Rufiji, in Africa's largest park.",
    description:
      "Nyerere National Park — carved from the former Selous Game Reserve — is defined by the Rufiji River and its network of lakes and channels. It is one of the few places in Tanzania where you can track game on foot in the morning and from a boat in the afternoon, with a fraction of the vehicles of the northern circuit.",
    coordinates: coords(-8.0, 37.5),
    bestTime: "June – October",
    wildlife: ["Elephant", "Hippo", "Crocodile", "African wild dog", "Buffalo", "Lion"],
    experienceSlugs: ["boat-safari", "walking-safari", "game-drives"],
    image: PHOTOS.nyerere,
    mapPosition: at(-8.0, 37.5),
  },
  {
    slug: "ruaha",
    name: "Ruaha",
    region: "Southern Circuit",
    shortDescription: "Baobab country, big herds, and almost no one else.",
    description:
      "Ruaha sits where southern and eastern African ecosystems overlap, which is why you find greater and lesser kudu in the same park. It is remote, rugged and very lightly visited — the choice for travellers who have done the northern circuit and want the wild version of it.",
    coordinates: coords(-7.5, 34.75),
    bestTime: "June – October",
    wildlife: ["Elephant", "Lion", "Greater kudu", "Sable antelope", "African wild dog"],
    experienceSlugs: ["game-drives", "walking-safari", "photographic-safari"],
    image: PHOTOS.ruaha,
    mapPosition: at(-7.5, 34.75),
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    region: "Coast & Islands",
    shortDescription: "Indian Ocean, dhow sails and Stone Town.",
    description:
      "Zanzibar is where most journeys end: white sand and warm shallow water on the north and east coasts, and Stone Town — a UNESCO World Heritage site of coral-rag alleys, carved doors and Swahili, Omani and Indian history — on the west. Two nights is a pause; five is a holiday of its own.",
    coordinates: coords(-6.1659, 39.2026),
    bestTime: "June – October and December – February",
    wildlife: ["Red colobus monkey", "Dolphins", "Reef fish", "Green turtle"],
    experienceSlugs: ["beach-and-ocean", "cultural-encounters", "coffee-and-cuisine"],
    image: PHOTOS["zanzibar-nungwi"],
    gallery: [PHOTOS["zanzibar-dhow-sunset"], PHOTOS["zanzibar-stone-town"]],
    mapPosition: at(-6.1659, 39.2026),
  },
];

export const DESTINATIONS_BY_SLUG = new Map(
  DESTINATIONS.map((destination) => [destination.slug, destination]),
);
