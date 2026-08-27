import type { Experience } from "@/types/content";
import { PHOTOS } from "./photography";

/**
 * Experiencias — las ocho entradas del selector "How do you want to
 * experience Tanzania?" más las modalidades concretas que se enlazan desde
 * destinos e itinerarios.
 *
 * `category` es lo que agrupa el selector de la home; varias experiencias
 * pueden compartir categoría sin duplicar la tarjeta, porque el selector
 * muestra una entrada por categoría (ver `lib/content.ts`).
 */

export const EXPERIENCES: Experience[] = [
  {
    slug: "game-drives",
    name: "Game drives",
    category: "wildlife",
    shortDescription: "Private vehicle, open roof, and a guide who reads the ground.",
    description:
      "The heart of a Tanzanian safari. You travel in your own vehicle with your own guide, which means you set the pace: stay two hours with a leopard if the light is right, or move on. Early starts and late afternoons are when the plains are busiest.",
    image: PHOTOS["serengeti-lion"],
    destinationSlugs: ["serengeti", "ngorongoro", "tarangire", "lake-manyara", "ruaha", "nyerere"],
  },
  {
    slug: "great-migration",
    name: "The Great Migration",
    category: "wildlife",
    shortDescription: "Following the herds, timed to where they actually are.",
    description:
      "Nearly two million wildebeest and zebra move through the Serengeti ecosystem in a slow annual circle. There is no single 'migration season' — there is a place the herds should be in the month you travel, and we build the route around that rather than around a fixed itinerary.",
    image: PHOTOS["wildebeest-migration"],
    destinationSlugs: ["serengeti"],
  },
  {
    slug: "mobile-camping",
    name: "Mobile camping",
    category: "adventure",
    shortDescription: "A camp that moves with the wildlife, not against it.",
    description:
      "Canvas, a proper bed, a bucket shower under the stars and a camp that packs up and follows the herds. It is the closest you get to the way safaris were originally travelled, with none of the discomfort you might be picturing.",
    image: PHOTOS["serengeti-sunrise"],
    destinationSlugs: ["serengeti", "ngorongoro"],
  },
  {
    slug: "walking-safari",
    name: "Walking safari",
    category: "adventure",
    shortDescription: "The same landscape, at three kilometres an hour.",
    description:
      "On foot with an armed ranger and a walking guide, the safari changes scale: tracks, dung, birdsong, the smell of the bush. You see fewer animals and understand far more. Available in Tarangire, Nyerere and Ruaha, and on the Kilimanjaro foothills.",
    image: PHOTOS["serengeti-plains"],
    destinationSlugs: ["tarangire", "nyerere", "ruaha", "kilimanjaro"],
  },
  {
    slug: "balloon-safari",
    name: "Balloon safari",
    category: "luxury",
    shortDescription: "First light over the Serengeti, from a thousand feet up.",
    description:
      "A dawn launch, an hour of near-silent drifting over the plains, and breakfast on the grass where you land. It is the one add-on almost nobody regrets — and it needs to be booked well ahead.",
    image: PHOTOS["balloon-serengeti"],
    destinationSlugs: ["serengeti"],
  },
  {
    slug: "photographic-safari",
    name: "Photographic safari",
    category: "luxury",
    shortDescription: "Built around light, position and patience.",
    description:
      "Routes and daily timings planned around golden hour, vehicle positioning for the sun, beanbags rather than tripods, and guides used to working with photographers. Slower days, fewer parks, better frames.",
    image: PHOTOS["serengeti-cheetah"],
    destinationSlugs: ["serengeti", "ngorongoro", "ruaha"],
  },
  {
    slug: "beach-and-ocean",
    name: "Beach & ocean",
    category: "honeymoon",
    shortDescription: "The Indian Ocean, after the dust of the plains.",
    description:
      "Zanzibar and the smaller islands off the coast: warm shallow water, dhow sails at sunset, reefs to snorkel or dive. It is the natural second half of a safari, and the one most couples build their honeymoon around.",
    image: PHOTOS["zanzibar-dhow-sunset"],
    destinationSlugs: ["zanzibar"],
  },
  {
    slug: "family-safari",
    name: "Family safari",
    category: "family",
    shortDescription: "Paced for children, without dulling it for adults.",
    description:
      "Shorter drives, family units rather than separate rooms, guides who know how to hold a seven-year-old's attention, and parks close enough together that nobody spends a whole day in a vehicle. Minimum ages vary by camp — we check them before we propose anything.",
    image: PHOTOS["tarangire-elephants"],
    destinationSlugs: ["tarangire", "lake-manyara", "ngorongoro", "zanzibar"],
  },
  {
    slug: "cultural-encounters",
    name: "Cultural encounters",
    category: "culture",
    shortDescription: "Time with communities, arranged on their terms.",
    description:
      "Visits arranged directly with the communities involved, at times that suit them, with a fair share of what you pay staying local. Maasai and Datoga communities near the Ngorongoro highlands, Chagga villages on the Kilimanjaro slopes, and Swahili Stone Town in Zanzibar.",
    image: PHOTOS["maasai-boma"],
    destinationSlugs: ["ngorongoro", "arusha", "zanzibar", "kilimanjaro"],
  },
  {
    slug: "coffee-and-cuisine",
    name: "Coffee & cuisine",
    category: "culture",
    shortDescription: "Tanzania through what it grows and cooks.",
    description:
      "Coffee on the slopes where it is grown, spice farms outside Stone Town, a Swahili kitchen, a market in Arusha. Small, unhurried half-days that tell you more about the country than another game drive would.",
    image: PHOTOS["zanzibar-stone-town"],
    destinationSlugs: ["arusha", "kilimanjaro", "zanzibar"],
  },
  {
    slug: "kilimanjaro-trek",
    name: "Kilimanjaro trek",
    category: "kilimanjaro",
    shortDescription: "Five climates, one mountain, one week.",
    description:
      "Machame, Lemosho, Rongai or Marangu — the right route depends on how much time you have, how you acclimatise and what you want the walk to feel like. We plan the extra acclimatisation day as standard rather than as an upsell.",
    image: PHOTOS["kilimanjaro-climbers"],
    destinationSlugs: ["kilimanjaro"],
  },
  {
    slug: "safari-and-zanzibar",
    name: "Safari & Zanzibar",
    category: "safari-and-zanzibar",
    shortDescription: "Plains first, ocean second. The classic pairing.",
    description:
      "The most requested shape of Tanzanian journey: the northern circuit, then a short flight east to the coast. Enough days on each side that neither half feels rushed, and one team handling the join in the middle.",
    image: PHOTOS["zanzibar-nungwi"],
    destinationSlugs: ["serengeti", "ngorongoro", "zanzibar"],
  },
  {
    slug: "boat-safari",
    name: "Boat safari",
    category: "adventure",
    shortDescription: "Tracking game from the water, on the Rufiji.",
    description:
      "In Nyerere the river is the road. Late afternoon on the Rufiji brings hippo, crocodile, elephant coming down to drink and a bird list that runs to three figures — from a boat, at eye level.",
    image: PHOTOS.nyerere,
    destinationSlugs: ["nyerere"],
  },
  {
    slug: "birdwatching",
    name: "Birdwatching",
    category: "wildlife",
    shortDescription: "Over a thousand species, and guides who know the calls.",
    description:
      "Tanzania's bird list is one of the longest in Africa. Lake Manyara, the Rift Valley lakes and the southern parks in the green season are the strongest ground, and the November–April months bring the migrants in.",
    image: PHOTOS["lake-manyara"],
    destinationSlugs: ["lake-manyara", "nyerere", "tarangire"],
  },
  {
    slug: "conservation",
    name: "Conservation days",
    category: "culture",
    shortDescription: "A day with the people doing the work.",
    description:
      "Time with rangers, researchers and community conservation projects — understanding what protecting these ecosystems actually involves, rather than watching it from a vehicle.",
    image: PHOTOS["ngorongoro-zebras"],
    destinationSlugs: ["ngorongoro", "serengeti", "ruaha"],
  },
];

export const EXPERIENCES_BY_SLUG = new Map(
  EXPERIENCES.map((experience) => [experience.slug, experience]),
);

/**
 * Las ocho categorías del selector de la home, en el orden en que se muestran.
 * La imagen y el enlace salen de la experiencia representativa de cada una.
 */
export const EXPERIENCE_CATEGORIES: {
  id: Experience["category"];
  label: string;
  leadExperienceSlug: string;
}[] = [
  { id: "wildlife", label: "Wildlife", leadExperienceSlug: "game-drives" },
  { id: "adventure", label: "Adventure", leadExperienceSlug: "walking-safari" },
  { id: "luxury", label: "Luxury", leadExperienceSlug: "balloon-safari" },
  { id: "honeymoon", label: "Honeymoon", leadExperienceSlug: "beach-and-ocean" },
  { id: "family", label: "Family", leadExperienceSlug: "family-safari" },
  { id: "culture", label: "Culture", leadExperienceSlug: "cultural-encounters" },
  { id: "kilimanjaro", label: "Kilimanjaro", leadExperienceSlug: "kilimanjaro-trek" },
  {
    id: "safari-and-zanzibar",
    label: "Safari & Zanzibar",
    leadExperienceSlug: "safari-and-zanzibar",
  },
];
