/**
 * CONTENIDO EN FRANCÉS.
 *
 * Traducción completa desde `en.ts`, la fuente. Solo texto visible: la
 * estructura —slugs, duraciones, coordenadas, rutas, fotografías— no se
 * duplica, vive en `src/data/structure/`.
 *
 * Si en el inglés se añade un safari, un día de itinerario o una FAQ y aquí
 * no se traduce, `tsc` falla: no existe fallback silencioso al inglés.
 *
 * NO se traduce: "Maisha Quest", los nombres del equipo, los nombres de las
 * colecciones (Explorer/Escape/Enrich), correos, teléfonos y las siglas de
 * organizaciones.
 *
 * ⚠️ INTERNO: traducción completa a nivel técnico, PENDIENTE de revisión
 * final por un hablante nativo antes de publicar en producción. No se
 * presenta como traducción jurada ni certificada.
 */

import type { ContentDictionary } from "./en";

/**
 * Lignes d'inclusions/exclusions partagées par presque les 18 forfaits réels.
 *
 * Ce n'est pas un raccourci : maishaquest.com répète ce même bloc, presque
 * mot pour mot, sur les 18 pages de forfait. Deux points que la source ne
 * confirme, pour aucun forfait, et qui ne sont donc pas ajoutés ici : si le
 * vol intérieur vers Zanzibar est inclus dans les six forfaits Escape, et si
 * un safari en montgolfière optionnel est inclus ou facturé en supplément.
 * Les deux sont signalés dans `practicalInfo` sur les forfaits où cela
 * compte, comme des questions ouvertes pour le client plutôt que comme une
 * hypothèse dans un sens ou dans l'autre.
 */
const STANDARD_INCLUDED = [
  "Transferts aéroport à l'arrivée et au départ",
  "Véhicule 4x4 Land Cruiser à toit ouvrant",
  "Guide anglophone, avec assistance 24 h/24",
  "Tous les droits d'entrée des parcs et taxes gouvernementales",
  "Hébergement tel que réservé",
  "Trois repas par jour pendant le safari",
  "Eau en bouteille et boissons gazeuses",
];
const STANDARD_NOT_INCLUDED = [
  "Vols internationaux et visa tanzanien",
  "Assurance voyage et assistance médicale",
  "Pourboires pour votre guide",
  "Repas à l'hôtel avant ou après le safari",
];

export const frContent: ContentDictionary = {
  safaris: {
    /* ======================== EXPLORER — camping ======================= */
    "manyara-ngorongoro-safari": {
      name: "Safari au lac Manyara et au cratère du Ngorongoro",
      summary: "Une introduction compacte de deux jours au circuit faunistique classique de la Tanzanie : lions grimpeurs au lac Manyara, puis une journée entière au fond du cratère du Ngorongoro.",
      overview: "Conçu pour les voyageurs disposant de peu de temps mais voulant tout de même un vrai safari plutôt qu'un aperçu. Hébergement en camping tout au long du parcours, exactement comme indiqué dans les forfaits Explorer de maishaquest.com.",
      travellerProfile: "Voyageurs disposant de peu de temps et recherchant une expérience faunistique classique",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Camping — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Parc national du lac Manyara", route: "Arusha → parc national du lac Manyara", activities: ["Départ matinal d'Arusha", "Safari au lac Manyara : lions grimpeurs, éléphants et flamants roses", "Déjeuner pique-nique dans le parc", "Transfert en fin de journée vers un campement près de Karatu"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: "Karatu → cratère du Ngorongoro → Arusha", activities: ["Descente matinale au fond du cratère", "Observation de la faune toute la journée, avec de bonnes chances d'apercevoir rhinocéros et grands félins", "Déjeuner pique-nique près du bassin des hippopotames", "Retour à Arusha en fin d'après-midi"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-ngorongoro-safari": {
      name: "Safari au Tarangire, au lac Manyara et au cratère du Ngorongoro",
      summary: "Trois des parcs les plus connus de Tanzanie en trois jours : éléphants et baobabs au Tarangire, l'escarpement du Rift au lac Manyara, et une demi-journée dans le cratère du Ngorongoro.",
      overview: "Un safari d'introduction pour les primo-visiteurs souhaitant découvrir trois parcs emblématiques sans un long programme. Hébergement en camping tout au long du parcours, exactement comme indiqué dans les forfaits Explorer de maishaquest.com.",
      travellerProfile: "Primo-visiteurs de safari souhaitant découvrir trois parcs emblématiques",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Camping — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Parc national du Tarangire", route: "Arusha → parc national du Tarangire", activities: ["Safari : troupeaux d'éléphants et baobabs ancestraux", "Déjeuner pique-nique dans le parc", "Nuit en campement"], estimatedDuration: null },
        { title: "Parc national du lac Manyara", route: "Tarangire → parc national du lac Manyara", activities: ["Safari matinal le long de l'escarpement du Rift : girafes, éléphants et avifaune", "Transfert en fin de journée vers un campement près de Karatu"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: "Karatu → cratère du Ngorongoro → Arusha", activities: ["Descente matinale pour un safari d'une demi-journée au fond du cratère", "Déjeuner pique-nique dans le cratère", "Retour à Arusha"], estimatedDuration: null },
      ],
    },
    "serengeti-ngorongoro-manyara-safari": {
      name: "Safari au Serengeti, au Ngorongoro et au lac Manyara",
      summary: "Quatre jours entre le lac Manyara, le cratère du Ngorongoro et le Serengeti, sur les traces de la Grande Migration et des prédateurs qui la suivent.",
      overview: "Un circuit de camping de quatre jours à travers trois destinations majeures, exactement comme indiqué dans les forfaits Explorer de maishaquest.com.",
      travellerProfile: "Voyageurs recherchant un aperçu plus complet du circuit nord en quatre jours",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Camping — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Parc national du lac Manyara", route: "Arusha → parc national du lac Manyara", activities: ["Trajet matinal vers le lac Manyara : lions grimpeurs, éléphants et flamants roses", "Transfert l'après-midi vers un campement dans les hauts plateaux du Ngorongoro"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: "Hauts plateaux du Ngorongoro → cratère du Ngorongoro → Serengeti", activities: ["Safari matinal précoce dans le cratère", "Transfert l'après-midi vers le Serengeti, via la gorge d'Olduvai (en option)", "Safari au coucher du soleil"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Journée entière de safaris sur les traces des prédateurs et des troupeaux migrateurs", "Déjeuner pique-nique", "Nuit en campement"], estimatedDuration: "Journée entière" },
        { title: "Retour à Arusha", route: "Serengeti → Ngorongoro → Karatu → Arusha", activities: ["Safari matinal au départ du Serengeti", "Retour à Arusha via le Ngorongoro et Karatu"], estimatedDuration: null },
      ],
    },
    "northern-circuit-camping-safari": {
      name: "Safari en camping de 5 jours sur le circuit nord",
      summary: "Un safari en camping équilibré et sans hâte à travers le Tarangire, le lac Manyara, le Serengeti et le cratère du Ngorongoro.",
      overview: "Pour les aventuriers recherchant un programme équilibré sans se presser entre les parcs. Hébergement en camping tout au long du parcours, exactement comme indiqué dans les forfaits Explorer de maishaquest.com.",
      travellerProfile: "Aventuriers recherchant un programme équilibré et sans hâte",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Camping — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Parc national du Tarangire", route: "Arusha → parc national du Tarangire", activities: ["Safari à l'arrivée", "Nuit en campement"], estimatedDuration: null },
        { title: "Du Tarangire au Serengeti", route: "Tarangire → parc national du Serengeti", activities: ["Observation de la faune en chemin", "Nuit dans un campement du Serengeti central"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris le matin et l'après-midi", "Nuit en campement"], estimatedDuration: null },
        { title: "Du Serengeti au Ngorongoro", route: "Serengeti → rebord du cratère du Ngorongoro", activities: ["Safari matinal", "Transfert l'après-midi vers un campement sur le rebord du cratère"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: "Cratère du Ngorongoro → Arusha", activities: ["Descente matinale pour un safari d'une demi-journée au fond du cratère", "Retour à Arusha"], estimatedDuration: null },
      ],
    },
    "six-day-camping-safari": {
      name: "Safari en camping de 6 jours en Tanzanie",
      // ⚠️ Sur la page Explorer de maishaquest.com elle-même, le bouton
      // « EXPLORE SAFARI » de ce forfait renvoie vers la même page que le
      // forfait de 5 jours ci-dessus — il n'existe pas de programme confirmé
      // et distinct pour un sixième jour. Les jours 1 à 5 reprennent le
      // programme confirmé de 5 jours ; le jour 6 reste ouvert plutôt
      // qu'inventé. Voir la remarque en tête de `safaris.ts`.
      summary: "Un sixième jour ajouté au safari en camping du circuit nord, avec le programme du jour 6 confirmé directement avec vous avant la réservation.",
      overview: "Les jours 1 à 5 suivent notre safari en camping de 5 jours sur le circuit nord, déjà confirmé. Nous confirmerons directement avec vous le programme exact du jour 6.",
      travellerProfile: "Aventuriers recherchant un programme équilibré et sans hâte",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Camping — disponible en catégorie luxe, intermédiaire ou économique" },
        { label: "En attente", value: "Nous confirmerons directement avec vous le programme exact du jour 6 avant la réservation." },
      ],
      days: [
        { title: "Parc national du Tarangire", route: "Arusha → parc national du Tarangire", activities: ["Safari à l'arrivée", "Nuit en campement"], estimatedDuration: null },
        { title: "Du Tarangire au Serengeti", route: "Tarangire → parc national du Serengeti", activities: ["Observation de la faune en chemin", "Nuit dans un campement du Serengeti central"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris le matin et l'après-midi", "Nuit en campement"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris supplémentaires dans une autre partie du parc", "Nuit en campement"], estimatedDuration: null },
        { title: "Du Serengeti au Ngorongoro", route: "Serengeti → rebord du cratère du Ngorongoro", activities: ["Safari matinal", "Transfert l'après-midi vers un campement sur le rebord du cratère"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro — journée à confirmer", route: "Cratère du Ngorongoro → Arusha", activities: ["Non encore confirmé avec Maisha Quest — voir les informations pratiques"], estimatedDuration: null },
      ],
    },
    "extended-camping-safari": {
      name: "Safari en camping prolongé de 7 jours en Tanzanie",
      summary: "Un programme de camping immersif à travers le Tarangire, le lac Manyara, le Serengeti et le cratère du Ngorongoro, avec assez de temps pour vraiment suivre la Grande Migration.",
      overview: "Le plus long des programmes de camping Explorer, exactement comme indiqué sur maishaquest.com. Se termine par une activité culturelle optionnelle au retour vers Arusha.",
      travellerProfile: "Voyageurs souhaitant parcourir tout le circuit nord sans se presser",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Camping — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Parc national du Tarangire", route: "Arusha → parc national du Tarangire", activities: ["Safari en fin de journée à l'arrivée"], estimatedDuration: null },
        { title: "Parc national du lac Manyara", route: null, activities: ["Exploration matinale du lac Manyara", "Nuit près de Karatu"], estimatedDuration: null },
        { title: "Vers le Serengeti", route: "Karatu → Ngorongoro (arrêt optionnel à la gorge d'Olduvai) → Serengeti", activities: ["Safari en fin de journée à l'arrivée dans le Serengeti"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Journée entière sur les traces de la migration et des prédateurs"], estimatedDuration: "Journée entière" },
        { title: "Du Serengeti au rebord du cratère", route: "Serengeti → rebord du cratère du Ngorongoro", activities: ["Safari matinal", "Arrivée l'après-midi sur le rebord du cratère"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: "Cratère du Ngorongoro → Karatu", activities: ["Safari complet dans le cratère", "Nuit près de Karatu"], estimatedDuration: null },
        { title: "Retour à Arusha", route: "Karatu → Arusha", activities: ["Retour panoramique par la route", "Activité culturelle optionnelle en chemin"], estimatedDuration: null },
      ],
    },

    /* ==================== ESCAPE — lodge + Zanzibar ===================== */
    "safari-zanzibar-escape": {
      name: "Escapade safari et Zanzibar",
      summary: "Safaris au Tarangire et au cratère du Ngorongoro, puis un vol vers Zanzibar pour découvrir Stone Town et la plage.",
      overview: "Une escapade de sept jours combinant le circuit safari du nord avec un séjour côtier à Zanzibar, exactement comme indiqué dans les forfaits Escape de maishaquest.com.",
      travellerProfile: "Voyageurs souhaitant combiner faune et plage en un seul voyage",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Lodge pendant le safari, hôtel de plage à Zanzibar — disponible en catégorie luxe, intermédiaire ou économique" },
        { label: "En attente", value: "Nous vous confirmerons si le vol intérieur vers Zanzibar est inclus dans le prix lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre hôtel"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safari d'une journée entière : troupeaux d'éléphants et baobabs"], estimatedDuration: "Journée entière" },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Exploration du cratère toute la journée"], estimatedDuration: "Journée entière" },
        { title: "Direction Zanzibar", route: "Arusha → Zanzibar", activities: ["Retour à Arusha", "Vol vers Zanzibar", "Installation à Stone Town"], estimatedDuration: null },
        { title: "Stone Town et les plantations d'épices", route: null, activities: ["Visite à pied de Stone Town", "Visite d'une plantation d'épices"], estimatedDuration: null },
        { title: "Journée à la plage", route: null, activities: ["Journée de détente à la plage", "Plongée avec tuba, plongée sous-marine ou kitesurf en option"], estimatedDuration: null },
        { title: "Départ", route: "Zanzibar → aéroport", activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
    "serengeti-zanzibar": {
      name: "Serengeti et Zanzibar",
      summary: "Safaris à la recherche des Big Five au Serengeti et au Ngorongoro, suivis de Stone Town et des plages de sable blanc de Zanzibar.",
      overview: "Une escapade de huit jours combinant exploration de la faune et détente insulaire, exactement comme indiqué dans les forfaits Escape de maishaquest.com.",
      travellerProfile: "Voyageurs souhaitant combiner faune et plage en un seul voyage",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Camp de luxe pendant le safari, Stone Town ou complexe hôtelier à Zanzibar" },
        { label: "En attente", value: "Nous vous confirmerons si le vol intérieur vers Zanzibar est inclus dans le prix lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre hôtel"], estimatedDuration: null },
        { title: "Vers le Serengeti", route: "Arusha → Serengeti", activities: ["Safari en fin de journée à l'arrivée"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Journée entière de safaris", "Déjeuner pique-nique en brousse"], estimatedDuration: "Journée entière" },
        { title: "Du Serengeti au Ngorongoro", route: "Serengeti → aire de conservation du Ngorongoro", activities: ["Safari matinal", "Transfert vers un lodge sur le rebord du cratère"], estimatedDuration: null },
        { title: "Du cratère du Ngorongoro à Zanzibar", route: "Ngorongoro → Zanzibar", activities: ["Safari dans le cratère", "Vol l'après-midi vers Zanzibar", "Installation à Stone Town"], estimatedDuration: null },
        { title: "Stone Town et Prison Island", route: null, activities: ["Visite à pied de Stone Town", "Excursion en bateau à Prison Island avec plongée avec tuba"], estimatedDuration: null },
        { title: "Journée à la plage", route: null, activities: ["Journée de détente à la plage", "Sports nautiques en option"], estimatedDuration: null },
        { title: "Départ", route: "Zanzibar → aéroport", activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
    "big-three-zanzibar": {
      name: "Big 3 + Zanzibar",
      summary: "Tarangire, le Serengeti et le cratère du Ngorongoro, puis Stone Town et la plage à Zanzibar.",
      overview: "Une escapade de neuf jours combinant trois des parcs les plus connus de Tanzanie avec un séjour à Zanzibar, exactement comme indiqué dans les forfaits Escape de maishaquest.com.",
      travellerProfile: "Voyageurs souhaitant combiner faune et plage en un seul voyage",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Lodge pendant le safari, Stone Town ou complexe balnéaire à Zanzibar" },
        { label: "En attente", value: "Nous vous confirmerons si le vol intérieur vers Zanzibar est inclus dans le prix lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Accueil à l'aéroport", "Briefing en soirée"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safari d'une journée entière", "Déjeuner pique-nique"], estimatedDuration: "Journée entière" },
        { title: "Vers le Serengeti", route: "Arusha → hauts plateaux du Ngorongoro → Serengeti", activities: ["Trajet vers le Serengeti central"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris le matin et l'après-midi"], estimatedDuration: null },
        { title: "Du Serengeti au Ngorongoro", route: "Serengeti → rebord du cratère du Ngorongoro", activities: ["Safari matinal", "Transfert vers le rebord du cratère"], estimatedDuration: null },
        { title: "Du cratère du Ngorongoro à Zanzibar", route: "Ngorongoro → Zanzibar", activities: ["Safari complet dans le cratère", "Vol en soirée vers Stone Town"], estimatedDuration: null },
        { title: "Stone Town et les plantations d'épices", route: null, activities: ["Visite à pied de Stone Town", "Visite d'une plantation d'épices"], estimatedDuration: null },
        { title: "Journée à la plage", route: null, activities: ["Baignade, plongée avec tuba ou plongée sous-marine, selon vos envies"], estimatedDuration: null },
        { title: "Départ", route: "Zanzibar → aéroport", activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
    "safari-culture-zanzibar": {
      name: "Safari, culture et Zanzibar",
      summary: "Safaris à travers le Tarangire, le Serengeti et le Ngorongoro, une journée avec les communautés hadzabe et datoga au lac Eyasi, puis Zanzibar.",
      overview: "Un voyage de dix jours combinant safari, rencontres culturelles et une conclusion à la plage, exactement comme indiqué dans les forfaits Escape de maishaquest.com.",
      travellerProfile: "Voyageurs recherchant faune, culture et plage en un seul voyage",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Lodge pendant le safari, Stone Town ou complexe balnéaire à Zanzibar" },
        { label: "En attente", value: "Nous vous donnerons plus de détails sur l'étape du lac Eyasi directement lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Accueil à l'aéroport"], estimatedDuration: null },
        { title: "Visite de la ville d'Arusha", route: null, activities: ["Marchés, musée de la Tanzanite et Cultural Heritage Centre"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safari d'une journée entière", "Déjeuner pique-nique"], estimatedDuration: "Journée entière" },
        { title: "Vers le Serengeti", route: "Arusha → hauts plateaux du Ngorongoro → Serengeti", activities: ["Safari en fin de journée à l'arrivée"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris le matin et l'après-midi"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Descente dans le cratère pour observer la faune"], estimatedDuration: null },
        { title: "Du lac Eyasi à Zanzibar", route: "Ngorongoro → lac Eyasi → Zanzibar", activities: ["Visites culturelles auprès des chasseurs-cueilleurs hadzabe et des forgerons datoga", "Vol l'après-midi vers Zanzibar"], estimatedDuration: null },
        { title: "Stone Town et les plantations d'épices", route: null, activities: ["Visite guidée de Stone Town", "Visite d'une ferme aux épices"], estimatedDuration: null },
        { title: "Journée à la plage", route: null, activities: ["Plongée avec tuba, kitesurf ou sortie en boutre, en option"], estimatedDuration: null },
        { title: "Départ", route: "Zanzibar → aéroport", activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
    "luxury-safari-zanzibar": {
      name: "Safari de luxe et Zanzibar",
      summary: "Un safari complet sur le circuit nord — Tarangire, lac Manyara, Serengeti et Ngorongoro, avec un vol en montgolfière en option — suivi de quatre nuits à Zanzibar.",
      overview: "Une escapade de douze jours pensée pour les couples, les familles et les petits groupes souhaitant à la fois safari et détente insulaire, exactement comme indiqué dans les forfaits Escape de maishaquest.com.",
      travellerProfile: "Couples, familles et petits groupes en quête de sensations de safari et de calme insulaire",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Safari en montgolfière (en option, le jour 5)"],
      practicalInfo: [
        { label: "Hébergement", value: "Lodge pendant le safari, Stone Town ou complexe balnéaire à Zanzibar" },
        { label: "En attente", value: "Nous vous confirmerons si le vol intérieur vers Zanzibar est inclus dans le prix lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre hôtel"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safari d'une journée entière : baobabs, éléphants et Big Five"], estimatedDuration: "Journée entière" },
        { title: "Parc national du lac Manyara", route: null, activities: ["Lions grimpeurs et flamants roses"], estimatedDuration: null },
        { title: "Vers le Serengeti", route: "Arusha → hauts plateaux du Ngorongoro → Serengeti", activities: ["Trajet vers le Serengeti central"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari en montgolfière optionnel au lever du soleil avec petit-déjeuner en brousse", "Safaris en véhicule"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari d'une journée entière, sur les traces de la migration selon la saison"], estimatedDuration: "Journée entière" },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Descente dans le cratère pour observer la faune"], estimatedDuration: null },
        { title: "Direction Zanzibar", route: "Arusha → Zanzibar", activities: ["Retour à Arusha", "Vol vers Zanzibar", "Croisière en boutre au coucher du soleil"], estimatedDuration: null },
        { title: "Plantations d'épices et Prison Island", route: null, activities: ["Visite d'une plantation d'épices", "Excursion de plongée avec tuba à Prison Island"], estimatedDuration: null },
        { title: "Journée à la plage", route: null, activities: ["Journée de détente", "Sports nautiques en option"], estimatedDuration: null },
        { title: "Journée libre", route: null, activities: ["Journée libre", "Dîner au coucher du soleil sur la plage"], estimatedDuration: null },
        { title: "Départ", route: "Zanzibar → aéroport", activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
    "grand-safari-zanzibar": {
      name: "Grand safari et Zanzibar",
      summary: "Le circuit nord complet, une journée avec les communautés hadzabe et datoga au lac Eyasi, puis une semaine à Zanzibar incluant la forêt de Jozani et Kizimkazi.",
      overview: "Le plus long programme Escape de maishaquest.com : quatorze jours combinant un safari approfondi et un séjour prolongé à Zanzibar.",
      travellerProfile: "Voyageurs recherchant un voyage complet et sans hâte en Tanzanie",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Lodge pendant le safari, Stone Town ou complexe balnéaire à Zanzibar" },
        { label: "En attente", value: "Nous vous donnerons plus de détails sur l'étape du lac Eyasi directement lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre hôtel"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safari d'une journée entière : troupeaux d'éléphants et baobabs"], estimatedDuration: "Journée entière" },
        { title: "Parc national du lac Manyara", route: null, activities: ["Lions grimpeurs et flamants roses"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Suivi de la migration, selon la saison"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Observation des traversées de rivière, selon la saison"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris supplémentaires à travers le parc"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Descente dans le cratère pour un safari d'une journée entière"], estimatedDuration: "Journée entière" },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Observation supplémentaire de la faune dans le cratère"], estimatedDuration: null },
        { title: "Du lac Eyasi à Zanzibar", route: "Ngorongoro → lac Eyasi → Zanzibar", activities: ["Visites des communautés hadzabe et datoga", "Vol l'après-midi vers Zanzibar"], estimatedDuration: null },
        { title: "Stone Town et les plantations d'épices", route: null, activities: ["Visite à pied de Stone Town", "Visite d'une plantation d'épices", "Croisière en boutre au coucher du soleil"], estimatedDuration: null },
        { title: "Journée à la plage", route: null, activities: ["Journée de détente", "Plongée sous-marine, plongée avec tuba ou kitesurf en option"], estimatedDuration: null },
        { title: "Forêt de Jozani et Kizimkazi", route: null, activities: ["Colobes rouges dans la forêt de Jozani", "Rencontre avec les dauphins à Kizimkazi"], estimatedDuration: null },
        { title: "Journée libre", route: null, activities: ["Journée de détente", "Dîner d'adieu face à la mer"], estimatedDuration: null },
        { title: "Départ", route: "Zanzibar → aéroport", activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },

    /* =============== ENRICH — lodge, faune + culture ================= */
    "tarangire-serengeti-ngorongoro-enrich": {
      name: "Tarangire, Serengeti et Ngorongoro",
      summary: "D'antiques baobabs et des troupeaux d'éléphants au Tarangire, les plaines ouvertes du Serengeti, et le cratère du Ngorongoro — souvent appelé la huitième merveille du monde.",
      overview: "Un safari de cinq jours en lodge à travers trois des parcs les plus emblématiques de Tanzanie, exactement comme indiqué dans les forfaits Enrich de maishaquest.com.",
      travellerProfile: "Voyageurs recherchant une introduction en lodge au circuit nord",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Lodge — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre lodge"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safaris", "Déjeuner pique-nique dans le parc"], estimatedDuration: null },
        { title: "Vers le Serengeti", route: "Arusha → hauts plateaux → Serengeti", activities: ["Safari en soirée à l'arrivée"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari au lever du soleil", "Visite optionnelle d'un village maasaï", "Transfert vers le Ngorongoro"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: "Cratère du Ngorongoro → Arusha", activities: ["Descente dans le cratère", "Safari d'une demi-journée", "Retour à Arusha"], estimatedDuration: null },
      ],
    },
    "manyara-serengeti-ngorongoro-enrich": {
      name: "Lac Manyara, Serengeti et Ngorongoro",
      summary: "Des paysages variés et une faune abondante, y compris les Big Five : lions grimpeurs, la Grande Migration et la faune dense du cratère du Ngorongoro.",
      overview: "Un safari de sept jours en lodge à travers le lac Manyara, le Serengeti et le Ngorongoro, exactement comme indiqué dans les forfaits Enrich de maishaquest.com.",
      travellerProfile: "Voyageurs recherchant un safari en lodge plus complet sur le circuit nord",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Lodge — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre hôtel"], estimatedDuration: null },
        { title: "Parc national du lac Manyara", route: null, activities: ["Safari", "Déjeuner pique-nique"], estimatedDuration: null },
        { title: "Vers le Serengeti", route: "Lac Manyara → rebord du cratère du Ngorongoro → Serengeti central", activities: ["Trajet avec observation de la faune en chemin"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari d'une journée entière sur les traces de la migration et des prédateurs"], estimatedDuration: "Journée entière" },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari matinal dans le nord ou le sud du Serengeti, selon la saison"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Descente dans le cratère", "Safari d'une demi-journée"], estimatedDuration: null },
        { title: "Retour à Arusha", route: "Ngorongoro → Arusha", activities: ["Transfert à l'aéroport"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-serengeti-ngorongoro-enrich": {
      name: "Tarangire, lac Manyara, Serengeti et Ngorongoro",
      summary: "Des éléphants parmi les baobabs au Tarangire, des lions grimpeurs et des flamants roses au lac Manyara, les plaines du Serengeti et le cratère du Ngorongoro.",
      overview: "Un safari de huit jours en lodge à travers quatre parcs, exactement comme indiqué dans les forfaits Enrich de maishaquest.com.",
      travellerProfile: "Voyageurs souhaitant parcourir tout le circuit nord depuis des lodges confortables",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Hébergement", value: "Lodge — disponible en catégorie luxe, intermédiaire ou économique" }],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre hôtel"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safaris : éléphants et forêt de baobabs"], estimatedDuration: null },
        { title: "Parc national du lac Manyara", route: null, activities: ["Lions grimpeurs et flamants roses"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari à l'arrivée"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Exploration d'une journée entière, l'itinéraire dépendant de la saison de migration"], estimatedDuration: "Journée entière" },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris supplémentaires"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Safari d'une demi-journée sur le rebord du cratère"], estimatedDuration: null },
        { title: "Retour à Arusha", route: "Ngorongoro → Arusha", activities: ["Transfert à l'aéroport"], estimatedDuration: null },
      ],
    },
    "cultural-safari-combo": {
      name: "Combiné culture + safari",
      summary: "Exploration tribale et vie communautaire authentique aux côtés de safaris fauniques : Arusha, Tarangire, le Serengeti, le Ngorongoro, le lac Eyasi et un village maasaï.",
      overview: "Un voyage de dix jours équilibrant parcs nationaux et visites communautaires traditionnelles, exactement comme indiqué dans les forfaits Enrich de maishaquest.com.",
      travellerProfile: "Voyageurs recherchant l'immersion culturelle aux côtés de la faune",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Lodge — disponible en catégorie luxe, intermédiaire ou économique" },
        { label: "En attente", value: "Nous vous donnerons plus de détails sur l'étape du lac Eyasi directement lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert depuis l'aéroport"], estimatedDuration: null },
        { title: "Visite de la ville d'Arusha", route: null, activities: ["Marchés et Cultural Heritage Centre"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safari d'une journée entière"], estimatedDuration: "Journée entière" },
        { title: "Vers le Serengeti", route: "Arusha → Ngorongoro → Serengeti", activities: ["Safaris en chemin"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris", "Dîner optionnel au coucher du soleil"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Expédition sur les traces de la migration"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Observation de la faune au fond du cratère"], estimatedDuration: null },
        { title: "Lac Eyasi", route: null, activities: ["Visite auprès des chasseurs-cueilleurs hadzabe et des forgerons datoga"], estimatedDuration: null },
        { title: "Village maasaï", route: null, activities: ["Visite d'immersion culturelle"], estimatedDuration: null },
        { title: "Départ", route: null, activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
    "extended-safari-cultural-immersion": {
      name: "Safari prolongé et immersion culturelle",
      summary: "Exploration de la faune dans quatre parcs combinée à des rencontres communautaires : chasseurs hadzabe, forgerons datoga et villages maasaï.",
      overview: "Un voyage de onze jours équilibrant activités de safari et visites communautaires, exactement comme indiqué dans les forfaits Enrich de maishaquest.com.",
      travellerProfile: "Voyageurs recherchant un engagement culturel prolongé aux côtés de la faune",
      bestTime: "Non précisé par Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Hébergement", value: "Lodge — disponible en catégorie luxe, intermédiaire ou économique" },
        { label: "En attente", value: "Nous vous donnerons plus de détails sur l'étape du lac Eyasi directement lors de l'élaboration de votre proposition personnalisée." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert depuis l'aéroport"], estimatedDuration: null },
        { title: "Visite de la ville d'Arusha", route: null, activities: ["Marchés et musée de la Tanzanite"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safaris"], estimatedDuration: null },
        { title: "Parc national du lac Manyara", route: null, activities: ["Observation de la faune"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris, observation de la migration selon la saison"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris supplémentaires"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safaris supplémentaires"], estimatedDuration: null },
        { title: "Vers le Ngorongoro", route: "Serengeti → Ngorongoro", activities: ["Transfert"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Safari d'une journée entière"], estimatedDuration: "Journée entière" },
        { title: "Lac Eyasi et villages maasaï", route: null, activities: ["Participation à une chasse traditionnelle et à l'allumage du feu avec les chasseurs hadzabe", "Visites de forgerons datoga et d'un village maasaï"], estimatedDuration: null },
        { title: "Départ", route: null, activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
    "wildlife-leisure-culture": {
      name: "Faune + détente + culture",
      // ⚠️ Le résumé de ce forfait sur maishaquest.com lui-même promet une
      // étape balnéaire à Zanzibar (« le mélange parfait d'aventure, de
      // détente et d'immersion culturelle »), mais le programme jour par
      // jour sur la même page ne quitte jamais le continent et se termine à
      // l'aéroport du Kilimandjaro. Le programme — la partie vérifiable —
      // est publié tel quel ; voir la remarque en tête de `safaris.ts`.
      summary: "Observation de la faune dans les parcs du nord, la visite d'une plantation de café et de tanzanite, et des rencontres culturelles avec les communautés hadzabe, datoga et maasaï.",
      overview: "Un programme Enrich de douze jours. Nous confirmerons directement avec vous l'itinéraire exact de ce voyage avant la réservation.",
      travellerProfile: "Voyageurs recherchant faune, détente et culture combinées",
      bestTime: "Toute l'année",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Safari en montgolfière (en option, le jour 7)"],
      practicalInfo: [
        { label: "Hébergement", value: "Lodge — disponible en catégorie luxe, intermédiaire ou économique" },
        { label: "En attente", value: "Nous confirmerons directement avec vous l'itinéraire exact de ce voyage avant la réservation." },
      ],
      days: [
        { title: "Arrivée à Arusha", route: "Aéroport international du Kilimandjaro → Arusha", activities: ["Transfert vers votre hôtel"], estimatedDuration: null },
        { title: "Visite de la ville d'Arusha", route: null, activities: ["Expérience de la tanzanite", "Visite et dégustation dans une plantation de café"], estimatedDuration: null },
        { title: "Parc national du Tarangire", route: null, activities: ["Safari d'une journée entière : éléphants et baobabs"], estimatedDuration: "Journée entière" },
        { title: "Parc national du lac Manyara", route: null, activities: ["Lions grimpeurs, hippopotames et flamants roses"], estimatedDuration: null },
        { title: "Vers le Serengeti", route: "Hauts plateaux du Ngorongoro → Serengeti central", activities: ["Trajet panoramique"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari d'une journée entière"], estimatedDuration: "Journée entière" },
        { title: "Parc national du Serengeti", route: null, activities: ["Safari en montgolfière optionnel avec petit-déjeuner au champagne", "Safaris l'après-midi"], estimatedDuration: null },
        { title: "Parc national du Serengeti", route: null, activities: ["Nord ou sud du Serengeti, selon la saison de migration"], estimatedDuration: null },
        { title: "Cratère du Ngorongoro", route: null, activities: ["Descente dans le cratère", "Safari l'après-midi"], estimatedDuration: null },
        { title: "Lac Eyasi", route: null, activities: ["Expériences culturelles avec les chasseurs hadzabe et les forgerons datoga"], estimatedDuration: null },
        { title: "Village maasaï", route: "→ Arusha", activities: ["Visite traditionnelle d'un village maasaï", "Retour à Arusha"], estimatedDuration: null },
        { title: "Départ", route: "Arusha → aéroport international du Kilimandjaro", activities: ["Transfert pour votre vol retour"], estimatedDuration: null },
      ],
    },
  },

  destinations: {
    "serengeti": {
      name: "Serengeti",
      shortDescription: "Des plaines sans fin, et la migration qui les traverse.",
      description: "Serengeti signifie « plaines sans fin » en maa, et le nom n'a rien d'ornemental. C'est un parc immense et stratifié — plaines d'herbe rase au sud, kopjes de granit au centre, forêt-galerie au nord — qui abrite les populations de prédateurs qui ont fait la réputation de la Tanzanie, et la migration des gnous qui le parcourt en un lent cercle annuel.",
      bestTime: "Toute l'année, selon la position de la migration",
      seasons: [
        {"label":"Mise bas","months":"Janvier – mars","note":"Les troupeaux occupent les plaines d'herbe rase du sud. Activité prédatrice concentrée."},
        {"label":"Couloir occidental","months":"Mai – juillet","note":"La migration remonte vers l'ouest puis le nord. Traversées de la Grumeti."},
        {"label":"Traversées du nord","months":"Juillet – octobre","note":"Traversées de la Mara, au nord. Les semaines les plus recherchées de l'année."},
      ],
      wildlife: ["Lion","Léopard","Guépard","Gnou","Zèbre","Éléphant","Hyène"],
    },
    "tarangire": {
      name: "Tarangire",
      shortDescription: "Des baobabs, et les plus grands troupeaux d'éléphants du nord.",
      description: "Tarangire s'organise autour d'une seule rivière, qui garde de l'eau quand les terres alentour n'en ont plus. Pendant les mois secs, elle attire des troupeaux d'éléphants d'une densité rare ailleurs dans le nord de la Tanzanie, sous des baobabs plusieurs fois centenaires. Le parc est plus calme que le Serengeti, et souvent la première étape d'un circuit nord.",
      bestTime: "Juin – octobre",
      seasons: [
        {"label":"Saison sèche","months":"Juin – octobre","note":"Les animaux se concentrent le long de la Tarangire. Les meilleures observations d'éléphants de l'année."},
        {"label":"Saison verte","months":"Novembre – mai","note":"Moins de véhicules, ciels spectaculaires et avifaune remarquable. La faune est plus dispersée."},
      ],
      wildlife: ["Éléphant","Lion","Girafe","Zèbre","Élan du Cap","Oryx beisa"],
    },
    "lake-manyara": {
      name: "Lac Manyara",
      shortDescription: "Forêt de nappe, lac alcalin et flamants roses.",
      description: "Un parc étroit, pris entre l'escarpement de la vallée du Rift et un lac de soude peu profond. On passe d'une forêt de nappe dense à une plaine inondable ouverte en quelques minutes, ce qui en fait l'un des safaris courts les plus variés du pays — et une halte naturelle d'une demi-journée entre Arusha et les hauts plateaux du Ngorongoro.",
      bestTime: "Juin – octobre pour la faune, novembre – avril pour les oiseaux",
      seasons: [],
      wildlife: ["Éléphant","Girafe","Hippopotame","Babouin","Flamant rose","Pélican"],
    },
    "ngorongoro": {
      name: "Ngorongoro",
      shortDescription: "Un volcan effondré qui contient un écosystème entier.",
      description: "Le cratère du Ngorongoro est la plus grande caldeira volcanique intacte au monde, et son fond réunit prairie, forêt, lac de soude et une population résidente de grands mammifères qui n'a pas besoin de migrer. On y descend au premier jour, depuis un rebord froid et brumeux. C'est aussi une aire de conservation où les communautés maasaï et la faune partagent la même terre.",
      bestTime: "Toute l'année",
      seasons: [
        {"label":"Saison sèche","months":"Juin – octobre","note":"Vues dégagées sur le cratère et pistes praticables. Les mois les plus fréquentés au fond."},
        {"label":"Saison verte","months":"Novembre – mai","note":"Fond du cratère verdoyant, mise bas sur les plaines voisines de Ndutu à partir de janvier."},
      ],
      wildlife: ["Rhinocéros noir","Lion","Éléphant","Buffle","Hyène","Flamant rose"],
    },
    "kilimanjaro": {
      name: "Kilimandjaro",
      shortDescription: "Le point culminant de l'Afrique, gravi de la base au sommet.",
      description: "Le Kilimandjaro se gravit, il ne se parcourt pas en véhicule. En cinq à neuf jours, on passe des cultures à la forêt tropicale, puis à la lande et au désert d'altitude, jusqu'à un sommet glaciaire à 5 895 mètres — cinq climats en une semaine. Le choix de la voie, le rythme et l'acclimatation comptent davantage que la condition physique, et nous les organisons autour de vous.",
      bestTime: "Janvier – mars et juin – octobre",
      seasons: [],
      wildlife: ["Colobe guéréza","Cercopithèque à diadème","Souimanga malachite"],
    },
    "nyerere": {
      name: "Nyerere",
      shortDescription: "Safaris en bateau sur le Rufiji, dans le plus vaste parc d'Afrique.",
      description: "Le parc national de Nyerere — détaché de l'ancienne réserve de Selous — se définit par le fleuve Rufiji et son réseau de lacs et de chenaux. C'est l'un des rares endroits de Tanzanie où l'on peut pister la faune à pied le matin et en bateau l'après-midi, avec une fraction des véhicules du circuit nord.",
      bestTime: "Juin – octobre",
      seasons: [],
      wildlife: ["Éléphant","Hippopotame","Crocodile","Lycaon","Buffle","Lion"],
    },
    "ruaha": {
      name: "Ruaha",
      shortDescription: "Pays des baobabs, grands troupeaux, et presque personne d'autre.",
      description: "Ruaha se situe à la rencontre des écosystèmes d'Afrique australe et orientale, ce qui explique la présence du grand et du petit koudou dans un même parc. Isolé, rude et très peu fréquenté, c'est le choix des voyageurs qui ont déjà fait le circuit nord et en veulent la version sauvage.",
      bestTime: "Juin – octobre",
      seasons: [],
      wildlife: ["Éléphant","Lion","Grand koudou","Hippotrague noir","Lycaon"],
    },
    "zanzibar": {
      name: "Zanzibar",
      shortDescription: "Océan Indien, voiles de boutres et Stone Town.",
      description: "Zanzibar est la fin de la plupart des voyages : sable blanc et eaux chaudes et peu profondes sur les côtes nord et est, et Stone Town — site du patrimoine mondial de l'UNESCO, fait de ruelles de corail, de portes sculptées et d'une histoire swahilie, omanaise et indienne — à l'ouest. Deux nuits font une pause ; cinq font un séjour à part entière.",
      bestTime: "Juin – octobre et décembre – février",
      seasons: [],
      wildlife: ["Colobe roux de Zanzibar","Dauphins","Poissons de récif","Tortue verte"],
    },
    "arusha": {
      name: "Arusha",
      shortDescription: "Là où commence chaque voyage — et là où nous vivons.",
      description: "Arusha se tient à l'ombre du mont Meru, au pied du circuit nord. C'est la porte d'entrée du Serengeti et du Ngorongoro, et c'est aussi chez nous : notre bureau, nos guides et nos véhicules sont ici. La plupart des voyages commencent par une nuit à Arusha, un vrai briefing et une première matinée sans hâte.",
      bestTime: "Toute l'année",
      seasons: [],
      wildlife: ["Colobe guéréza","Cercopithèque à diadème","Avifaune forestière"],
    },
  },

  /**
   * Les 5 catégories réelles de la section Experiences de maishaquest.com,
   * chacune avec sa propre page (/thrill-seaker-adventures,
   * /water-activities, /tours, /shopping-and-leisure, /nightlife). La
   * `description` de chacune énumère fidèlement les activités ou adresses
   * publiées sur cette page — rien d'inventé, rien résumé au point de
   * perdre le nom ou le lieu. Aucune de ces activités ou adresses n'a de
   * tarif publié.
   */
  experiences: {
    "thrill-seeker-adventure": {
      name: "Aventure à Sensations",
      shortDescription: "« Safari » signifie « voyage » en swahili : explorez des territoires d’aventure aux quatre coins de la Tanzanie avec les meilleurs opérateurs.",
      description: "Saut en parachute au-dessus de Kendwa Beach, à Zanzibar. Tyrolienne à travers les plantations de bananiers et les forêts de Mto wa Mbu, à deux heures d’Arusha. Parapente en tandem au-dessus de la vallée du Rift, à Monduli, à une heure et demie d’Arusha (saisonnier). VTT à travers les plantations de café et les villages près d’Usa River et de la forêt de Rau, non loin de Moshi et d’Arusha, avec vue sur le Kilimandjaro. Balades à cheval sur les plages de Nungwi, à Zanzibar. Trekking en montagne sur le Kilimandjaro, le mont Meru ou les monts Usambara. Randonnée jusqu’aux chutes de Materuni et de Napuru, près de Moshi et d’Arusha, avec des rencontres culturelles chez les communautés chagga et meru. Baignade avec les dauphins à Kizimkazi, Zanzibar. Et, de façon saisonnière de novembre à mars, baignade avec les requins-baleines au large de l’île de Mafia. Tel qu’indiqué sur la page Thrill Seeker Adventure de maishaquest.com.",
    },
    "water-activities": {
      name: "Activités Nautiques",
      shortDescription: "L’eau est la source de toute vie : quittez la terre ferme pour une variété de sports nautiques le long de la côte et au-delà.",
      description: "Plongée avec tuba à l’atoll de Mnemba, Zanzibar. Plongée sous-marine avec des centres certifiés PADI à Zanzibar et sur l’île de Mafia. Kitesurf à Paje Beach, Zanzibar, l’une des meilleures plages de kitesurf au monde (saisonnier, cours quotidiens). Canoë sur le lac Duluti, un lac de cratère à vingt minutes d’Arusha. Jet-ski à Kendwa et Nungwi, Zanzibar. Pêche sur le lac Victoria et la côte de Zanzibar, des sorties traditionnelles avec des pêcheurs locaux à la pêche au gros. Sorties en bateau sur le lac Victoria et l’océan Indien, des croisières au coucher du soleil aux sorties traditionnelles en boutre. Excursions d’une journée à l’île de Bongoyo et à l’île de Mbudya, toutes deux près de Dar es Salaam, pour le snorkeling et les pique-niques sur la plage. Location de yachts privés au départ de Dar es Salaam et de Zanzibar. Et visites guidées des grottes d’eau douce de Zanzibar. Tel qu’indiqué sur la page Water Activities de maishaquest.com.",
    },
    "tours-and-safaris": {
      name: "Circuits et Safaris",
      shortDescription: "Découvrez des trésors cachés au fil d’un parcours à travers des lieux qui ont chacun leur propre histoire à raconter.",
      description: "Visites de musées à Dar es Salaam et à Arusha, dont le Musée national, le musée de la Déclaration d’Arusha et le musée d’Histoire naturelle. Visites urbaines d’Arusha, Dar es Salaam, Zanzibar et Mwanza. Visites de villages à Mto wa Mbu et dans des villages maasaï. Visites de galeries d’art au Nafasi Art Space de Dar es Salaam et au Cultural Heritage Centre d’Arusha. Une randonnée jusqu’aux chutes de Materuni, près de Moshi, avec une initiation traditionnelle à la préparation du café auprès de la communauté chagga. Les chutes de Napuru, à vingt minutes d’Arusha, pour la randonnée, le quad et les pique-niques. Le lac Duluti, également à vingt minutes d’Arusha, pour le canoë, la pêche et l’observation des oiseaux. Le parc à serpents de Meserani et le musée maasaï, à une demi-heure d’Arusha. Le centre des girafes d’Arusha. Des visites de plantations de café et de bananes à Moshi et Arusha. Et des visites de gemmes et de tanzanite à Arusha et aux mines de Mererani. Tel qu’indiqué sur la page Tours de maishaquest.com.",
    },
    "shopping-and-leisure": {
      name: "Shopping et Loisirs",
      shortDescription: "La meilleure façon de passer son temps libre : reprenez des forces grâce aux meilleures offres à portée de main.",
      description: "Le marché maasaï d’Arusha, à visiter de préférence le samedi. Le Cultural Heritage Centre d’Arusha, avec art, artisanat, bijoux et café. L’AIM Mall d’Arusha, avec ses boutiques, son cinéma et sa restauration. Le Slipway Shopping Centre de Dar es Salaam, pour faire les boutiques et se restaurer en bord de mer. Les boutiques de Stone Town, à Zanzibar, pour l’artisanat swahili traditionnel, les épices et les vêtements. Le Mlimani City Mall, le plus grand centre commercial de Tanzanie, à Dar es Salaam. Le Rock City Mall de Mwanza. Et des journées spa au Lemon Spa d’Arusha, à l’Ocean Spa de Dar es Salaam et de Zanzibar, ou au Honey Spa de Moshi. Tel qu’indiqué sur la page Shopping and Leisure de maishaquest.com.",
    },
    nightlife: {
      name: "Vie Nocturne",
      shortDescription: "La musique ne s’arrête jamais : les adresses les plus branchées de la ville, où que le voyage vous mène.",
      description: "À Arusha : Via Via pour la musique live en plein air et les soirées culturelles, Rafiki Juice Bar pour les cocktails et les DJ, Kesho Café pour le jazz et la poésie, Pillars pour les groupes live, ainsi que des clubs comme Aces, Club D, The Hub et El Toro pour le Bongo Flava et les tubes internationaux. À Dar es Salaam : Samaki Samaki pour dîner et danser, Elements pour des cocktails en rooftop, Tips Lounge pour le hip-hop et le Bongo Flava, Wavuvi Camp pour les fêtes sur la plage, Coco Beach Strip, Cocktails & Dreams, The Reef, ainsi que des clubs comme Uncles, Kitamba Cheupe, Havoc et Warehouse. À Zanzibar : le Sky Bar avec vue sur Stone Town, Jambo Beach, la Full Moon Party de Kendwa Rocks, ainsi que des lounges comme 6 Degrees South, Garage Club et Tatu. À Mwanza : Cask n Grill et Tilapia Lounge. Tel qu’indiqué sur la page Nightlife de maishaquest.com.",
    },
  },

  collections: {
    "explorer": {
      tagline: "Pour les voyageurs attirés par les paysages sauvages, l’aventure et la découverte.",
      description: "La version active de la Tanzanie. Des journées plus longues sur le terrain, des camps qui suivent les animaux, du temps à pied autant qu’en véhicule, et des itinéraires qui atteignent les recoins d’un parc où presque aucun véhicule ne va.",
      travellerProfile: "Voyageurs actifs, photographes, habitués du safari",
      traits: ["Camps mobiles","Sorties en véhicule","Marche et trekking","Itinéraires isolés"],
    },
    "escape": {
      tagline: "Pour les voyageurs en quête d’espace, de confort et d’une vraie coupure.",
      description: "Plus lent, plus doux, entièrement pris en charge. Moins de parcs et plus de nuits dans chacun, des lodges choisis pour leur emplacement et pour ce qu’on voit depuis leur terrasse, et une fin de voyage sur l’océan Indien.",
      travellerProfile: "Couples, voyages de noces, premiers safaris",
      traits: ["Lodges et camps boutique","Couples et lunes de miel","Bien-être","Zanzibar"],
    },
    "enrich": {
      tagline: "Pour les voyageurs qui veulent vivre la Tanzanie plus en profondeur.",
      description: "La Tanzanie au-delà du safari en véhicule. Des journées auprès des communautés et des équipes de conservation, la cuisine et le café là où ils poussent, et des accès privés organisés directement avec celles et ceux qui les accueillent.",
      travellerProfile: "Voyageurs curieux, familles avec grands enfants, habitués",
      traits: ["Culture","Cuisine","Communautés","Conservation"],
    },
  },

  journal: {
    "elevate-your-safari-experience": {
      title: "Sublimez votre expérience de safari : les aventures sur mesure de Maisha Quest",
      excerpt: "Un aperçu des forfaits Explorer, Escape et Enrich de Maisha Quest, et du passage à un nouveau site conçu avec Wix, avec des formulaires de safari sur mesure et un profil d’entreprise complet.",
      category: "Actualités de l’entreprise",
      body: [
        "Rêvez-vous d’une expérience de safari inoubliable qui sorte de l’ordinaire ? Ne cherchez pas plus loin que Maisha Quest, une entreprise de safari de premier plan basée à Arusha, en Tanzanie, spécialisée dans la création d’aventures sur mesure répondant à chacun de vos souhaits.",
        "Maisha Quest a pour mission de redéfinir l’expérience du safari en proposant des voyages uniques, authentiques et durables qui mettent en valeur non seulement les paysages spectaculaires de la Tanzanie, mais aussi sa riche histoire et ses cultures diverses. En misant sur le développement durable de la destination, Maisha Quest veille à ce que chaque voyage contribue à la préservation de la faune, à l’enrichissement des communautés locales et à la promotion de la Tanzanie comme destination vivante et dynamique. Que vous soyez un explorateur aventureux, en quête de détente ou passionné de culture, Maisha Quest a le forfait qu’il vous faut. Les forfaits Explorer sont conçus pour les amateurs de sensations fortes en quête d’expériences chargées d’adrénaline au cœur de la nature sauvage. Si vous cherchez à vous ressourcer au contact de la beauté naturelle, les forfaits Escape offrent une retraite paisible au milieu de paysages à couper le souffle. Et pour ceux qui souhaitent s’immerger dans la culture vibrante et la vie urbaine de la Tanzanie, les forfaits Enrich offrent une plongée en profondeur dans les coutumes et traditions locales. Outre ses expériences de safari soigneusement conçues, Maisha Quest s’engage aussi à offrir un service client de premier ordre et à veiller à ce que chaque aspect de votre voyage soit pris en charge sans accroc. L’entreprise est en train de migrer vers Wix, une évolution qui améliorera le suivi du site, renforcera les capacités de référencement, augmentera les performances, facilitera la gestion et donnera accès à des outils de conception avancés. Le nouveau site arborera un design élégant et raffiné, digne des plus grandes destinations sauvages, ainsi qu’un espace convivial où vous pourrez remplir des formulaires de safari sur mesure et découvrir le profil de l’entreprise. Alors, si vous êtes prêt à sublimer votre expérience de safari et à vivre le voyage d’une vie, faites confiance à Maisha Quest pour concevoir une aventure sur mesure qui dépassera toutes vos attentes. Réservez dès aujourd’hui votre safari sur mesure et préparez-vous à vous immerger dans la magie de la Tanzanie comme jamais auparavant.",
      ],
    },
    "unleash-your-wanderlust": {
      title: "Libérez votre soif de voyage : les aventures de safari de Maisha Quest vous attendent",
      excerpt: "Pourquoi Maisha Quest construit ses forfaits Explorer, Escape et Enrich autour du tourisme durable — et ce qui change avec le passage de l’entreprise à un nouveau site.",
      category: "Actualités de l’entreprise",
      body: [
        "Êtes-vous prêt à vivre l’aventure de safari d’une vie, une aventure qui non seulement éveillera votre soif de voyage, mais contribuera aussi à la préservation de la faune et à l’enrichissement des communautés locales ? Ne cherchez pas plus loin que Maisha Quest Safari Adventures, basée dans les paysages à couper le souffle d’Arusha, en Tanzanie.",
        "Maisha Quest n’est pas une entreprise de safari comme les autres. Elle a pour mission de bousculer les stéréotypes et de mettre en valeur la riche histoire, les cultures diverses et les paysages spectaculaires de l’Afrique. Avec un engagement fort envers le tourisme durable, Maisha Quest propose une gamme d’expériences de safari soigneusement conçues pour différents types de voyageurs. Pour les amateurs d’aventure, les forfaits Explorer sont parfaits pour s’immerger dans une nature sauvage préservée et approcher la majestueuse faune de Tanzanie. Si la détente et la beauté des paysages vous parlent davantage, les forfaits Escape offrent une retraite paisible au cœur de la nature. Et pour ceux qui souhaitent explorer en profondeur la richesse culturelle de la Tanzanie, les forfaits Enrich offrent une expérience véritablement immersive et révélatrice.",
        "En plus de proposer des expériences de safari inoubliables, Maisha Quest se consacre au développement durable de la Tanzanie en tant que destination. En choisissant Maisha Quest pour votre prochaine aventure, vous ne vivez pas seulement un voyage incroyable, vous contribuez aussi à la conservation de la faune et à l’autonomisation des communautés locales. De bonnes nouvelles se profilent pour Maisha Quest, qui s’apprête à lancer un nouveau site amélioré sur Wix. Cette évolution permettra un meilleur suivi, une optimisation du référencement, de meilleures performances, une gestion facilitée et l’accès à des outils de conception de premier ordre. Le design épuré et raffiné du site reflétera l’élégance des plus grands sites de voyage, offrant une expérience fluide aux visiteurs. L’une des fonctionnalités clés du nouveau site sera un espace où les voyageurs pourront remplir des formulaires de safari sur mesure pour personnaliser leur expérience. De plus, un profil d’entreprise complet sera disponible pour permettre aux visiteurs d’en savoir plus sur les valeurs, la mission et l’engagement de Maisha Quest envers le tourisme durable. Alors, si vous êtes prêt à libérer votre soif de voyage et à vivre une aventure de safari comme aucune autre, les aventures de Maisha Quest Safari Adventures vous attendent. Préparez-vous à explorer la beauté sauvage de la Tanzanie, à vous immerger dans ses cultures vivantes et à avoir un impact positif sur le monde.",
      ],
    },
    "discover-tanzanias-hidden-gems": {
      title: "Découvrez les trésors cachés de la Tanzanie : les expériences de safari de Maisha Quest",
      excerpt: "Les forfaits Explorer, Escape et Enrich de Maisha Quest, et un premier aperçu du passage de l’entreprise à un site repensé, conçu avec Wix.",
      category: "Actualités de l’entreprise",
      body: [
        "Êtes-vous un voyageur ou une voyageuse aventureux à la recherche d’une expérience de safari comme aucune autre ? Ne cherchez pas plus loin que Maisha Quest, une entreprise de safari de premier plan basée à Arusha, en Tanzanie, qui propose une gamme d’expériences de safari uniques et durables.",
        "Maisha Quest a pour mission de bousculer les stéréotypes et de mettre en valeur la riche histoire, les cultures diverses et les paysages à couper le souffle de l’Afrique. Avec un engagement fort envers le développement durable de la destination, l’entreprise imagine un monde où chaque voyage contribue à la préservation de la faune, soutient les communautés locales et met en valeur la Tanzanie comme une destination vivante et passionnante. Que vous soyez amateur d’aventure, de détente ou d’immersion culturelle, Maisha Quest a le forfait de safari qu’il vous faut. Des forfaits Explorer pour les amateurs de sensations fortes aux forfaits Escape pour ceux en quête de sérénité et de beauté naturelle, en passant par les forfaits Enrich pour les voyageurs en quête d’expériences culturelles immersives, il y en a pour tous les goûts. Dans le but d’améliorer l’expérience utilisateur et de simplifier ses opérations, le propriétaire de Maisha Quest prévoit de migrer le site vers Wix. Cette évolution améliorera non seulement le suivi, les performances SEO et la gestion, mais offrira aussi de meilleurs outils de conception, donnant aux visiteurs une expérience de navigation plus élégante et raffinée, semblable à celle du célèbre site Wilderness Destinations. L’une des fonctionnalités phares du futur site sera l’intégration de formulaires de safari sur mesure, permettant aux visiteurs de personnaliser leur expérience de safari et de rendre leur voyage vraiment inoubliable. De plus, le site présentera le profil de l’entreprise, donnant un aperçu de l’éthique, des valeurs et de l’engagement de Maisha Quest envers le tourisme durable. Alors, si vous êtes prêt à vivre un voyage de safari comme jamais auparavant, restez attentif au site remanié de Maisha Quest, où vous attendent aventure, détente et immersion culturelle. Il est temps de découvrir les trésors cachés de la Tanzanie et de créer des souvenirs qui dureront toute une vie.",
      ],
    },
  },

  faq: {
    "best-time-to-visit": {
      question: "Quelle est la meilleure période pour partir en Tanzanie ?",
      answer: "Il n'y a pas un seul meilleur mois : il y a le meilleur mois pour ce que vous voulez voir. De juin à octobre, c'est la saison sèche, avec les observations les plus faciles et, à partir de juillet, les traversées de rivière au nord du Serengeti. De janvier à mars viennent les naissances sur les plaines du sud et les mois les plus dégagés pour le Kilimandjaro. De novembre à mai, c'est la saison verte : moins de véhicules, des ciels spectaculaires, une avifaune superbe et une faune plus dispersée. Donnez-nous vos dates et nous vous dirons franchement ce qu'elles permettent.",
    },
    "how-far-in-advance": {
      question: "Combien de temps à l'avance faut-il réserver ?",
      answer: "Les camps et lodges qui valent le détour sont petits, et les mieux placés se remplissent en premier — en particulier pour les traversées du nord du Serengeti et pour les voyages de Noël et du Nouvel An. Si vos dates sont fixées, engagez la conversation tôt. Si elles sont souples, nous avons davantage de marge.",
    },
    "what-does-private-mean": {
      question: "Que signifie réellement un safari « privé » ?",
      answer: "Votre propre véhicule, votre propre guide et un itinéraire qui n'appartient qu'à votre groupe. C'est vous qui décidez de l'heure du départ le matin, du temps passé auprès d'un animal et du moment de la pause déjeuner. Vous ne partagez pas de véhicule avec des inconnus et ne suivez aucun départ de groupe imposé.",
    },
    "single-travellers": {
      question: "Acceptez-vous les voyageurs seuls et les petits groupes ?",
      answer: "Oui. Chaque voyage que nous construisons est privé, qu'il s'agisse d'un voyageur ou d'une famille de dix. Un supplément individuel s'applique dans la plupart des camps et lodges, et nous vous en indiquons le montant avant tout engagement de votre part.",
    },
    "children": {
      question: "Pouvons-nous voyager avec des enfants ?",
      answer: "Oui, et les voyages en famille font partie de ceux que nous organisons le plus. Certains camps fixent un âge minimum et certaines activités — les safaris à pied en particulier — comportent des limites d'âge. Nous les vérifions pour votre famille avant de proposer quoi que ce soit, et non après.",
    },
    "visa-and-entry": {
      question: "Avons-nous besoin d'un visa ?",
      answer: "La plupart des visiteurs ont besoin d'un visa pour entrer en Tanzanie et, pour de nombreuses nationalités, il peut être demandé en ligne à l'avance auprès des services d'immigration tanzaniens. Les conditions dépendent de votre passeport et évoluent de temps à autre : consultez le site officiel de l'immigration correspondant à votre pays peu avant le départ. Nous vous l'indiquerons au moment de la réservation.",
    },
    "vaccinations": {
      question: "Qu'en est-il des vaccins et du paludisme ?",
      answer: "La Tanzanie est une zone de paludisme, et un certificat de fièvre jaune est exigé si vous arrivez d'un pays où la fièvre jaune constitue un risque. Ce dont vous avez besoin dépend de votre santé, de votre itinéraire et de votre lieu de départ : consultez un centre de vaccination internationale ou votre médecin bien avant le voyage. Nous ne sommes pas en mesure de donner un avis médical.",
    },
    "languages": {
      question: "Dans quelles langues travaillez-vous ?",
      answer: "Nous concevons et accompagnons en anglais et en swahili, et Talisa parle également le russe et le mandarin. Pour les autres langues, nous vous dirons clairement ce que nous pouvons organiser plutôt que de promettre un guide que nous ne pourrions pas fournir.",
    },
    "what-to-pack": {
      question: "Que faut-il emporter ?",
      answer: "Des couleurs neutres, des couches pour les matins froids et les midis chauds, un vrai chapeau, des jumelles et plus de cartes mémoire que vous ne le pensez. Les vols intérieurs entre les parcs imposent des limites de bagages strictes, généralement en sacs souples. Vous recevrez une liste d'affaires établie pour votre itinéraire précis.",
    },
    "how-to-start": {
      question: "Comment se déroule la préparation d'un voyage avec vous ?",
      answer: "Vous nous dites à peu près quand, à peu près combien de temps et ce qui compte pour vous. Nous revenons vers vous avec un itinéraire proposé et une vision honnête de son coût et de ce qu'il implique. Vous le modifiez autant de fois qu'il le faut. Rien n'est confirmé tant que vous n'êtes pas satisfait.",
    },
  },

  team: {
    "talisa-tufts": {
      role: "Fondatrice",
      bio: "Talisa a fondé Maisha Quest après un parcours dans le tourisme international et l’hôtellerie. Elle parle anglais, swahili, russe et mandarin : c’est pourquoi les voyageurs de Moscou ou de Shanghai sont accompagnés dans leur langue dès la première conversation sur votre voyage.",
      specialty: "Conception de voyages et relation client multilingue",
      favouritePlace: null,
    },
    "frank-lyatuu": {
      role: "Cofondateur — Opérations",
      bio: "Frank est d’Arusha, et les itinéraires que parcourt Maisha Quest sont ceux qu’il connaît pour les avoir conduits. Il s’occupe des opérations, de l’accueil et du côté pratique d’un safari : les véhicules, les horaires, les gens à chaque porte de parc.",
      specialty: "Opérations de safari et connaissance du terrain",
      favouritePlace: null,
    },
    "tina-ngabo": {
      role: "Cofondatrice — Expérience voyageur",
      bio: "Tina apporte son expérience de l’hôtellerie internationale à la partie du voyage qui se ressent le plus : la façon dont on prend soin de vous. C’est elle qui veille à ce que le détail mentionné une fois dans un e-mail vous attende en Tanzanie.",
      specialty: "Expérience voyageur et standards de service",
      favouritePlace: null,
    },
  },

  impact: {
    "maisha-quest-cares": {
      title: "Maisha Quest Cares — Programme pour adolescents en difficulté",
      description: "Un programme destiné aux adolescents qui ont perdu leurs repères — après la perte de leurs parents, à cause de foyers brisés ou de circonstances difficiles — et qui, pour beaucoup, finissent à la rue, exposés à la délinquance et à la toxicomanie. Il offre un foyer sûr avec repas et hébergement ; une formation professionnelle avec des partenaires dans des secteurs comme la mécanique, la menuiserie, la couture, l’artisanat, l’hôtellerie et l’agriculture ; un parrainage éducatif et un mentorat couvrant les frais de formation et de scolarité ; et un accompagnement continu pour aider chaque jeune à construire son estime de soi, un sentiment d’utilité et l’espoir en l’avenir.",
      location: null,
    },
    empowerment: {
      title: "Empowerment — un emploi équitable pour les jeunes Tanzaniens",
      description: "L’équipe de Maisha Quest elle-même — guides, chauffeurs, cuisiniers et personnel de bureau — est recrutée et formée en Tanzanie. L’entreprise présente l’emploi équitable, le développement des compétences et un environnement de travail bienveillant pour son personnel comme une mesure de son action tout aussi importante que les voyages qu’elle conçoit pour ses clients, et affirme investir dans de jeunes Tanzaniens appelés à devenir des leaders du tourisme bien au-delà de Maisha Quest.",
      location: "Arusha, Tanzanie",
    },
  },

  learnTopics: {
    geography: {
      name: "Géographie et nature",
      description: "La Tanzanie réunit dans un seul pays une gamme d’écosystèmes peu commune : le sommet enneigé du Kilimandjaro, les plaines ouvertes du Serengeti, les eaux profondes du lac Tanganyika et les récifs coralliens au large de Zanzibar. Le cratère du Ngorongoro, la plus grande caldeira volcanique intacte au monde, est parfois appelé le « jardin d’Éden » de l’Afrique pour la densité de faune que porte son sol, dont les Big Five. Au nord, les eaux très alcalines du lac Natron sont hostiles à presque toute vie, mais servent de site de reproduction à des millions de flamants roses.",
    },
    culture: {
      name: "Culture",
      description: "Le swahili et l’anglais sont les langues officielles de la Tanzanie, mais le pays compte plus de 120 groupes ethniques, chacun avec sa propre langue et ses propres traditions. L’art tanzanien est connu internationalement pour le style de peinture Tinga Tinga — des représentations vives et stylisées d’animaux et de la vie quotidienne — et pour la sculpture sur bois makonde. Les Maasaï se reconnaissent à leur shuka aux couleurs vives, drapé sur les épaules.",
    },
    history: {
      name: "Histoire",
      description: "La gorge d’Olduvai, parfois appelée le berceau de l’humanité, est l’un des sites paléoanthropologiques les plus importants au monde. En 1871, l’explorateur Henry Morton Stanley rencontra le missionnaire David Livingstone à Ujiji, au bord du lac Tanganyika. Entre 1905 et 1907, la révolte des Maji Maji unit plusieurs groupes ethniques contre la domination coloniale allemande — l’un des soulèvements les plus importants de cette période en Afrique de l’Est.",
    },
    "wildlife-and-conservation": {
      name: "Faune et conservation",
      description: "Chaque année, des milliers d’éléphants se déplacent entre le Serengeti et le parc national du Tarangire, dans le cadre de l’une des plus grandes migrations d’éléphants d’Afrique. La Tanzanie a aussi réalisé de réels progrès dans la conservation du rhinocéros noir et du lycaon. Au parc national de Gombe Stream, au bord du lac Tanganyika, la Dre Jane Goodall a commencé dans les années 1960 ses recherches sur les chimpanzés sauvages, qui s’y poursuivent encore aujourd’hui.",
    },
    economy: {
      name: "Économie et développement",
      description: "L’agriculture est l’épine dorsale de l’économie tanzanienne et emploie l’essentiel de la population ; le pays est l’un des plus grands producteurs mondiaux de girofle et de sisal. La Tanzanie est aussi le seul endroit au monde où l’on trouve la tanzanite, extraite dans les collines de Mererani, près du Kilimandjaro, prisée pour sa couleur bleu-violet profond.",
    },
    festivals: {
      name: "Événements culturels et festivals",
      description: "Le festival Wanyambo, organisé chaque année à Bukoba, près du lac Victoria, célèbre la culture du peuple haya avec danses traditionnelles, musique et repas. Le Karibu Music Festival, à Bagamoyo, est l’un des plus grands événements musicaux d’Afrique de l’Est, mêlant musique africaine traditionnelle et contemporaine.",
    },
  },

  regions: {
    northern: {
      name: "Région du Nord",
      description: "Foyer de plus de 120 groupes ethniques, dont les Maasaï, les Chagga sur les pentes du Kilimandjaro et les Hadzabe, l’un des derniers peuples chasseurs-cueilleurs d’Afrique. C’est le terrain de safari le plus connu de Tanzanie : le Kilimandjaro, plus haut sommet d’Afrique, s’y élève à travers cinq zones climatiques distinctes ; le Serengeti accueille la Grande Migration annuelle ; et la gorge d’Olduvai, le berceau de l’humanité, a livré des fossiles d’ancêtres humains vieux de 3,6 millions d’années. Le nord de la Tanzanie fut sous domination coloniale allemande jusqu’à la Première Guerre mondiale, puis mandat britannique jusqu’à l’indépendance en 1961 sous Julius Nyerere.",
    },
    "central-southern": {
      name: "Région Centre et Sud",
      description: "Le peuple gogo domine autour de la capitale, Dodoma, traditionnellement pasteur et agriculteur ; plus au sud vivent les Yao, les Makonde — réputés pour leur sculpture sur bois —, les Ngoni et les Hehe. Dodoma est devenue la capitale de la Tanzanie en 1973, dans le cadre d’un plan de développement de l’intérieur du pays. Plus au sud, la réserve de chasse du Selous (aujourd’hui en grande partie le parc national de Nyerere) est l’une des plus grandes réserves de chasse au monde et un site du patrimoine mondial de l’UNESCO, abritant d’importantes populations d’éléphants et de lycaons le long de la rivière Rufiji ; le parc national de Ruaha, le plus grand de Tanzanie, est réputé pour ses prides de lions. La cité-État insulaire de Kilwa Kisiwani, également classée à l’UNESCO, a commercé de l’or, de l’ivoire et des esclaves à travers l’océan Indien du 9ᵉ au 15ᵉ siècle.",
    },
    "lake-zone-western": {
      name: "Région des Lacs et de l’Ouest",
      description: "Autour du lac Victoria, le plus grand d’Afrique, vivent les Sukuma — le plus grand groupe ethnique de Tanzanie — aux côtés des Haya, connus pour la culture de la banane et du café, et de communautés de pêcheurs qui dépendent de la perche du Nil et du tilapia. Sur les rives du lac Tanganyika, l’un des plus anciens et des plus profonds lacs du monde, certaines communautés pêchent encore la nuit depuis des pirogues, à la lanterne. Mwanza, la « ville de roc » au bord du lac Victoria, est le centre économique de la région ; les parcs nationaux de Gombe Stream et des monts Mahale, tous deux sur le lac Tanganyika, comptent parmi les meilleurs endroits d’Afrique pour le trekking avec les chimpanzés. Maisha Quest ne publie pas encore de page de destination propre pour cette région.",
    },
    coastal: {
      name: "Région Côtière",
      description: "Le peuple swahili vit le long de la côte continentale de la Tanzanie depuis des siècles, une culture mêlant influences africaines, arabes et perses, exprimée dans la musique taarab et dans des plats comme le pilau et le mandazi. Dar es Salaam, la plus grande ville du pays, en est le centre économique ; Bagamoyo, ancienne capitale de l’Afrique orientale allemande, et Kilwa Kisiwani, cité-État swahilie classée à l’UNESCO, sont riches d’histoire. Le parc national de Saadani, sur la côte au nord de Dar es Salaam, est la seule réserve faunique de Tanzanie directement sur l’océan. Maisha Quest ne publie pas encore de page de destination propre pour cette région.",
    },
    "zanzibar-island": {
      name: "Île de Zanzibar",
      description: "Connue comme l’île aux Épices, Zanzibar comprend deux îles principales, Unguja et Pemba, à 25 à 50 kilomètres au large de la Tanzanie continentale. Sa population, majoritairement swahiliphone et musulmane, a des racines africaines, arabes, persanes et indiennes, que l’on retrouve dans la musique taarab et dans l’architecture arabisante et les portes en bois sculpté de Stone Town — classée au patrimoine mondial de l’UNESCO. Des marchands arabes s’y sont installés dès le 8ᵉ siècle ; les îles sont devenues au 19ᵉ siècle un centre du commerce des épices sous le sultanat d’Oman, puis rapidement un protectorat britannique, avant d’accéder à l’indépendance en 1963 et de s’unir au Tanganyika en 1964 pour former la Tanzanie. La forêt de Jozani abrite le colobe rouge de Zanzibar, une espèce endémique.",
    },
  },
};
