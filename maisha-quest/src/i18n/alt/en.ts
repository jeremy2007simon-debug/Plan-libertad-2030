/**
 * Texto alternativo de la fotografía, por idioma.
 *
 * Vivía dentro de `src/data/photography.ts` como una sola cadena en inglés, y
 * eso significaba que un lector de pantalla en español, alemán, francés, ruso
 * o chino oía la descripción de cada foto en inglés. Son treinta y una
 * fotografías repartidas por toda la web: era el bloque de inglés residual más
 * grande que quedaba.
 *
 * Los datos de fotografía guardan ahora una CLAVE (`altKey`), no una frase, y
 * la frase se resuelve aquí con el idioma de la página. Este archivo es la
 * referencia: los otros cinco se tipan contra él, así que olvidar una clave o
 * añadir una de más rompe la compilación.
 *
 * Criterio de redacción: describir lo que se ve, no lo que evoca, y nombrar el
 * lugar solo cuando la ficha de la imagen lo acredita. Ningún alt afirma una
 * especie que no esté clara ni un parque que no conste.
 */

export const en = {
  // --- Fotografía provisional de Wikimedia Commons ---
  arusha: "The town of Arusha at the foot of Mount Meru, northern Tanzania",
  "balloon-serengeti": "A hot air balloon drifting above the Serengeti at first light",
  "kilimanjaro-climbers": "Trekkers ascending the Barranco Wall on Mount Kilimanjaro",
  "kilimanjaro-kibo": "The snow-capped Kibo summit of Mount Kilimanjaro above the clouds",
  "kilimanjaro-shira": "The open moorland of the Shira Plateau on Mount Kilimanjaro",
  "lake-manyara": "Woodland and the shore of Lake Manyara National Park",
  "lake-manyara-giraffe": "Close portrait of a giraffe in Lake Manyara National Park",
  "maasai-boma": "A Maasai boma — a homestead of thatched houses inside a thorn enclosure",
  "ngorongoro-crater": "The floor of the Ngorongoro Crater seen from the rim",
  "ngorongoro-zebras": "Zebras and buffalo grazing on the grasslands of the Ngorongoro Crater",
  nyerere: "River and riverine forest in Nyerere National Park, southern Tanzania",
  ruaha: "Dry season landscape in Ruaha National Park, southern Tanzania",
  "serengeti-cheetah": "Close portrait of a cheetah in Serengeti National Park",
  "serengeti-plains": "Acacia trees scattered across the Serengeti plains under a wide sky",
  "serengeti-sunrise": "Sunrise over the open grasslands of the Serengeti, Tanzania",
  "serengeti-sunset": "The sun setting low over the Serengeti savannah",
  "serengeti-sunset-wide": "Sunbeams breaking through cloud above the Serengeti at dusk",
  "tarangire-baobab": "A baobab tree standing against clear sky in Tarangire National Park",
  "wildebeest-migration":
    "Wildebeest moving in column across the northern Serengeti during the migration",
  "zanzibar-dhow-sunset": "A traditional dhow sailing off Zanzibar at sunset",
  "zanzibar-nungwi": "White sand and turquoise shallows at Nungwi, northern Zanzibar",
  "zanzibar-stone-town": "Forodhani seafront in Stone Town, Zanzibar",

  // --- Fotografía entregada por el cliente ---
  "tanzania-wildlife-sunset-hero": "Wildlife crossing the horizon at sunset in Tanzania",
  "antelope-herd-grasslands": "Herd of antelope gathering in green grasslands",
  "elephant-herd-protecting-calf": "Elephant herd surrounding a young calf",
  "african-elephant-portrait": "Portrait of an African elephant in the wilderness",
  "elephant-family-walking": "Family of elephants walking together across the savannah",
  "savannah-acacia-sunset": "Acacia tree silhouetted against a vivid Tanzanian sunset",
  "lion-pair-calling": "Lion and lioness calling across the grasslands",
  "giraffe-oxpecker-birds": "Oxpecker birds perched on the patterned coat of a giraffe",
  "flamingo-taking-flight": "Flamingo running across the water as it begins to take flight",
  "flamingos-tanzania-lake":
    "Flock of flamingos standing in the shallow waters of a Tanzanian lake",
  "male-lions-together": "Two male lions standing together in the grasslands",
  "giraffes-open-savannah": "Giraffes walking across an open Tanzanian savannah",
  "leopard-in-tree": "Leopard standing among the branches of a tree",
  "zebra-herd-monochrome": "Closely gathered herd of zebras in monochrome",
  "lion-open-savannah": "Lion walking alone across an open grassland",
  "giraffe-patterns-monochrome": "Monochrome detail of giraffes standing closely together",
  "safari-tent-accommodation":
    "Warmly furnished safari tent accommodation overlooking the landscape",
  "flamingo-low-flight": "Flamingo flying low over the surface of a lake",
  "flamingo-flock-in-motion": "Flamingos gathering and moving through shallow water",

  // --- Imágenes que todavía no existen, con su alt ya escrito ---
  "impact-community": "Maisha Quest community work in Tanzania",
  "journey-film-poster": "A Maisha Quest journey through Tanzania",
};

/** Todas las claves de alt. Nace del inglés, que es la referencia. */
export type PhotoAltKey = keyof typeof en;

/** Forma que deben cumplir los otros cinco idiomas. */
export type PhotoAlt = typeof en;
