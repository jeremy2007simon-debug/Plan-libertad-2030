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
  SafariText,
  TeamText,
} from "@/types/content";

export const enContent = {
  safaris: {
  "serengeti-ngorongoro-journey": {
    name: "Serengeti & Ngorongoro Journey",
    summary: "The northern circuit at an unhurried pace: baobab country, the endless plains, and a dawn descent into the crater. Lodges throughout, private vehicle throughout.",
    overview: "This is the shape of journey most first-time travellers to Tanzania are looking for, done properly: three parks rather than five, two nights minimum in each, and no day that puts you in a vehicle for six hours. You finish in the Ngorongoro highlands and fly out from Arusha.",
    travellerProfile: "Couples and first-time safari travellers",
    bestTime: "June – October, and January – March",
    included: ["Private 4x4 safari vehicle with open roof and a Maisha Quest guide","All park and conservation area fees","Accommodation as listed, on a full-board basis","Drinking water throughout the safari","Airport transfers on arrival and departure","Flying doctor evacuation cover"],
    notIncluded: ["International flights and Tanzanian visa","Travel and medical insurance","Balloon safari and other optional activities","Drinks other than water, and personal expenses","Tips for your guide and camp staff"],
    practicalInfo: [{"label":"Group size","value":"Private departure — your party only"},{"label":"Vehicle","value":"4x4 with open roof, guaranteed window seat"},{"label":"Driving","value":"Longest single transfer is around 4 hours"},{"label":"Fitness","value":"No particular fitness required"}],
    days: [
      {
        title: "Arrival in Arusha",
        route: "Kilimanjaro International Airport → Arusha",
        activities: ["Met at the airport by your Maisha Quest guide","Transfer to Arusha and check in","Trip briefing over dinner, and a look at the days ahead"],
        estimatedDuration: "1 hr transfer",
      },
      {
        title: "Into Tarangire",
        route: "Arusha → Tarangire National Park",
        activities: ["Morning drive south through Maasai grazing land","Afternoon game drive along the Tarangire River","Sunset among the baobabs"],
        estimatedDuration: "2.5 hr drive, 3 hr game drive",
      },
      {
        title: "Tarangire to the Serengeti",
        route: "Tarangire → Serengeti National Park",
        activities: ["Early departure across the Ngorongoro Conservation Area","Picnic lunch at Naabi Hill, at the gate to the plains","Afternoon game drive into the central Serengeti"],
        estimatedDuration: "Full travel day with game viewing en route",
      },
      {
        title: "The endless plains",
        route: null,
        activities: ["Full day in the Serengeti, timed around the light","Kopjes and river lines where the cats rest up","Optional balloon flight at dawn, arranged in advance"],
        estimatedDuration: "Full day",
      },
      {
        title: "Serengeti to the crater rim",
        route: "Serengeti → Ngorongoro Conservation Area",
        activities: ["Final morning game drive on the plains","Drive up to the Ngorongoro highlands","Late afternoon on the crater rim"],
        estimatedDuration: "4 hr drive with stops",
      },
      {
        title: "Into the crater",
        route: "Ngorongoro Crater floor",
        activities: ["First-light descent to the crater floor","Game drive on the floor — the resident population does not migrate","Afternoon back on the rim, or a Maasai community visit"],
        estimatedDuration: "6 hr on the crater floor",
      },
      {
        title: "Back to Arusha",
        route: "Ngorongoro → Arusha → Kilimanjaro International Airport",
        activities: ["Unhurried breakfast on the rim","Drive back to Arusha with a stop for coffee","Transfer to the airport for your flight"],
        estimatedDuration: "4 hr drive",
      },
    ],
  },
  "serengeti-under-canvas": {
    name: "Serengeti Under Canvas",
    summary: "A mobile camp that moves with the herds, long days in the field and nights under canvas where the wildlife actually is.",
    overview: "The camp packs up and follows the migration, which means you wake where the animals are rather than driving two hours to reach them. Comfortable canvas, proper beds, hot water — and nothing between you and the plains.",
    travellerProfile: "Active travellers and returning safari-goers",
    bestTime: "January – March for calving, July – October for the northern crossings",
    included: ["Private 4x4 safari vehicle with open roof and a Maisha Quest guide","All park and conservation area fees","Mobile camp accommodation on a full-board basis","Camp staff, and drinking water throughout","Airport transfers on arrival and departure"],
    notIncluded: ["International flights and Tanzanian visa","Travel and medical insurance","Balloon safari and other optional activities","Drinks other than water, and personal expenses","Tips for your guide and camp staff"],
    practicalInfo: undefined,
    days: [

    ],
  },
  "serengeti-and-zanzibar": {
    name: "Serengeti & Zanzibar",
    summary: "The plains first, the Indian Ocean second. Six days on safari, four on the coast, and one team handling the join in the middle.",
    overview: "The most requested shape of Tanzanian journey, with enough nights on each side that neither half feels rushed. You fly from the Serengeti straight to Zanzibar rather than backtracking through Arusha.",
    travellerProfile: "Couples and honeymooners",
    bestTime: "June – October, and December – February",
    included: ["Private 4x4 safari vehicle with open roof and a Maisha Quest guide","All park and conservation area fees","Internal flight from the Serengeti to Zanzibar","Accommodation as listed — full board on safari, bed and breakfast on the coast","All airport and hotel transfers"],
    notIncluded: ["International flights and Tanzanian visa","Travel and medical insurance","Meals other than those listed, and personal expenses","Water sports and optional excursions in Zanzibar","Tips for your guide and camp staff"],
    practicalInfo: undefined,
    days: [

    ],
  },
  "tanzania-in-depth": {
    name: "Tanzania in Depth",
    summary: "Coffee on the slopes where it grows, days with Maasai and Chagga communities, a conservation team in the field — and the wildlife too.",
    overview: "For travellers who want to understand the country rather than tick off a list. Roughly half the days are spent with people rather than animals, and the safari days are better for it.",
    travellerProfile: "Curious travellers and families with older children",
    bestTime: "June – October",
    included: ["Private 4x4 safari vehicle with open roof and a Maisha Quest guide","All park and conservation area fees","Community visits arranged directly, with fees paid to the communities","Accommodation as listed, on a full-board basis","All transfers"],
    notIncluded: ["International flights and Tanzanian visa","Travel and medical insurance","Drinks other than water, and personal expenses","Tips for your guide and camp staff"],
    practicalInfo: undefined,
    days: [

    ],
  },
  "southern-wild": {
    name: "Southern Wild: Nyerere & Ruaha",
    summary: "Boat safaris on the Rufiji, walking in baobab country, and two parks that see a fraction of the northern circuit's vehicles.",
    overview: undefined,
    travellerProfile: "Returning safari travellers looking for space",
    bestTime: "June – October",
    included: ["Internal flights between Dar es Salaam, Nyerere and Ruaha","All park fees","Tented camp accommodation on a full-board basis","Game drives, walking safaris and boat safaris as scheduled"],
    notIncluded: ["International flights and Tanzanian visa","Travel and medical insurance","Drinks other than water, and personal expenses","Tips for your guide and camp staff"],
    practicalInfo: undefined,
    days: [

    ],
  },
  "kilimanjaro-lemosho": {
    name: "Kilimanjaro: the Lemosho Route",
    summary: "Eight days on the mountain by the route that acclimatises best, with the extra day built in as standard rather than sold as an extra.",
    overview: undefined,
    travellerProfile: "Trekkers — no technical climbing experience needed",
    bestTime: "January – March, and June – October",
    included: ["Mountain crew: guides, cook and porters, paid to KPAP guidelines","All Kilimanjaro National Park fees and rescue fees","Camping equipment, meals and drinking water on the mountain","Two nights in Arusha, before and after the climb","Airport transfers"],
    notIncluded: ["International flights and Tanzanian visa","Travel and medical insurance covering trekking to 6,000 m","Personal trekking equipment and sleeping bag","Tips for the mountain crew"],
    practicalInfo: undefined,
    days: [

    ],
  },
  "highlands-and-communities": {
    name: "Highlands & Communities",
    summary: "The northern parks, threaded through the highland communities that live alongside them — Maasai, Datoga and Chagga.",
    overview: undefined,
    travellerProfile: "Travellers who want context as well as wildlife",
    bestTime: "June – October",
    included: ["Private 4x4 safari vehicle with open roof and a Maisha Quest guide","All park and conservation area fees","Community visits arranged directly, with fees paid to the communities","Accommodation as listed, on a full-board basis"],
    notIncluded: ["International flights and Tanzanian visa","Travel and medical insurance","Drinks other than water, and personal expenses","Tips for your guide and camp staff"],
    practicalInfo: undefined,
    days: [

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

  experiences: {
  "game-drives": {
    name: "Game drives",
    shortDescription: "Private vehicle, open roof, and a guide who reads the ground.",
    description: "The heart of a Tanzanian safari. You travel in your own vehicle with your own guide, which means you set the pace: stay two hours with a leopard if the light is right, or move on. Early starts and late afternoons are when the plains are busiest.",
  },
  "great-migration": {
    name: "The Great Migration",
    shortDescription: "Following the herds, timed to where they actually are.",
    description: "Nearly two million wildebeest and zebra move through the Serengeti ecosystem in a slow annual circle. There is no single 'migration season' — there is a place the herds should be in the month you travel, and we build the route around that rather than around a fixed itinerary.",
  },
  "mobile-camping": {
    name: "Mobile camping",
    shortDescription: "A camp that moves with the wildlife, not against it.",
    description: "Canvas, a proper bed, a bucket shower under the stars and a camp that packs up and follows the herds. It is the closest you get to the way safaris were originally travelled, with none of the discomfort you might be picturing.",
  },
  "walking-safari": {
    name: "Walking safari",
    shortDescription: "The same landscape, at three kilometres an hour.",
    description: "On foot with an armed ranger and a walking guide, the safari changes scale: tracks, dung, birdsong, the smell of the bush. You see fewer animals and understand far more. Available in Tarangire, Nyerere and Ruaha, and on the Kilimanjaro foothills.",
  },
  "balloon-safari": {
    name: "Balloon safari",
    shortDescription: "First light over the Serengeti, from a thousand feet up.",
    description: "A dawn launch, an hour of near-silent drifting over the plains, and breakfast on the grass where you land. It is the one add-on almost nobody regrets — and it needs to be booked well ahead.",
  },
  "photographic-safari": {
    name: "Photographic safari",
    shortDescription: "Built around light, position and patience.",
    description: "Routes and daily timings planned around golden hour, vehicle positioning for the sun, beanbags rather than tripods, and guides used to working with photographers. Slower days, fewer parks, better frames.",
  },
  "beach-and-ocean": {
    name: "Beach & ocean",
    shortDescription: "The Indian Ocean, after the dust of the plains.",
    description: "Zanzibar and the smaller islands off the coast: warm shallow water, dhow sails at sunset, reefs to snorkel or dive. It is the natural second half of a safari, and the one most couples build their honeymoon around.",
  },
  "family-safari": {
    name: "Family safari",
    shortDescription: "Paced for children, without dulling it for adults.",
    description: "Shorter drives, family units rather than separate rooms, guides who know how to hold a seven-year-old's attention, and parks close enough together that nobody spends a whole day in a vehicle. Minimum ages vary by camp — we check them before we propose anything.",
  },
  "cultural-encounters": {
    name: "Cultural encounters",
    shortDescription: "Time with communities, arranged on their terms.",
    description: "Visits arranged directly with the communities involved, at times that suit them, with a fair share of what you pay staying local. Maasai and Datoga communities near the Ngorongoro highlands, Chagga villages on the Kilimanjaro slopes, and Swahili Stone Town in Zanzibar.",
  },
  "coffee-and-cuisine": {
    name: "Coffee & cuisine",
    shortDescription: "Tanzania through what it grows and cooks.",
    description: "Coffee on the slopes where it is grown, spice farms outside Stone Town, a Swahili kitchen, a market in Arusha. Small, unhurried half-days that tell you more about the country than another game drive would.",
  },
  "kilimanjaro-trek": {
    name: "Kilimanjaro trek",
    shortDescription: "Five climates, one mountain, one week.",
    description: "Machame, Lemosho, Rongai or Marangu — the right route depends on how much time you have, how you acclimatise and what you want the walk to feel like. We plan the extra acclimatisation day as standard rather than as an upsell.",
  },
  "safari-and-zanzibar": {
    name: "Safari & Zanzibar",
    shortDescription: "Plains first, ocean second. The classic pairing.",
    description: "The most requested shape of Tanzanian journey: the northern circuit, then a short flight east to the coast. Enough days on each side that neither half feels rushed, and one team handling the join in the middle.",
  },
  "boat-safari": {
    name: "Boat safari",
    shortDescription: "Tracking game from the water, on the Rufiji.",
    description: "In Nyerere the river is the road. Late afternoon on the Rufiji brings hippo, crocodile, elephant coming down to drink and a bird list that runs to three figures — from a boat, at eye level.",
  },
  "birdwatching": {
    name: "Birdwatching",
    shortDescription: "Over a thousand species, and guides who know the calls.",
    description: "Tanzania's bird list is one of the longest in Africa. Lake Manyara, the Rift Valley lakes and the southern parks in the green season are the strongest ground, and the November–April months bring the migrants in.",
  },
  "conservation": {
    name: "Conservation days",
    shortDescription: "A day with the people doing the work.",
    description: "Time with rangers, researchers and community conservation projects — understanding what protecting these ecosystems actually involves, rather than watching it from a vehicle.",
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
    description: "Tanzania beyond the game drive. Days with communities and conservation teams, food and coffee where they are grown, and private access arranged through people we have worked with for years.",
    travellerProfile: "Curious travellers, families with older children, repeat visitors",
    traits: ["Culture","Cuisine","Communities","Conservation"],
  },
  } satisfies Record<CollectionId, CollectionText>,

  journal: {
  "when-to-see-the-great-migration": {
    title: "Where the migration actually is, month by month",
    excerpt: "There is no migration season — there is a place the herds should be in the month you travel. A straight answer for each one, and what it means for where you sleep.",
    category: "Planning",
  },
  "choosing-a-kilimanjaro-route": {
    title: "Choosing a Kilimanjaro route",
    excerpt: "Lemosho, Machame, Rongai or Marangu. The differences that matter are acclimatisation profile and how many days you can give the mountain — not difficulty ratings.",
    category: "Kilimanjaro",
  },
  "green-season-tanzania": {
    title: "In defence of the green season",
    excerpt: "November to May gets written off as the wet months. What you actually get: empty parks, extraordinary skies, newborn animals and the best birding of the year.",
    category: "Planning",
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
    bio: "Talisa founded Maisha Quest after a career in international tourism and hospitality. She speaks four languages, which is why travellers from Moscow, Shanghai and Madrid are all looked after in their own — and why the first conversation about your journey rarely needs a translator.",
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

  impact: {
  "education": {
    title: "Education support",
    description: "Working with schools near the communities we travel through — the practical things a classroom runs short of, and the costs that keep children out of one.",
    location: null,
  },
  "conservation": {
    title: "Wildlife conservation",
    description: "Supporting the conservation teams working in the ecosystems our journeys depend on, and giving travellers a way to spend a day with them rather than only reading about it.",
    location: null,
  },
  "community": {
    title: "Community partnership",
    description: "Community visits arranged directly with the people hosting them, at times that suit them, with fees paid to the community rather than to an intermediary.",
    location: null,
  },
  "local-employment": {
    title: "Local employment",
    description: "Guides, drivers, cooks and office staff hired and trained in Tanzania. On Kilimanjaro, porter pay and load limits follow KPAP guidelines.",
    location: "Arusha, Tanzania",
  },
  } satisfies Record<string, ImpactText>,
};

/** Forma que deben cumplir los otros cinco idiomas. */
export type ContentDictionary = typeof enContent;
