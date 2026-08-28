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

export const frContent: ContentDictionary = {
  safaris: {
    "serengeti-ngorongoro-journey": {
      name: "Voyage au Serengeti et au Ngorongoro",
      summary: "Le circuit nord sans hâte : le pays des baobabs, les plaines infinies et une descente dans le cratère à l'aube. Des lodges d'un bout à l'autre, un véhicule privé d'un bout à l'autre.",
      overview: "C'est la forme de voyage que recherchent la plupart des primo-visiteurs de la Tanzanie, faite comme il faut : trois parcs plutôt que cinq, deux nuits au minimum dans chacun, et aucune journée qui vous laisse six heures en véhicule. Le voyage s'achève sur les hauts plateaux du Ngorongoro, avec un départ depuis Arusha.",
      travellerProfile: "Couples et voyageurs partant en safari pour la première fois",
      bestTime: "De juin à octobre, et de janvier à mars",
      included: ["Véhicule 4x4 privé à toit ouvrant et guide Maisha Quest","Tous les droits d'entrée des parcs et aires de conservation","Hébergement tel qu'indiqué, en pension complète","Eau potable pendant toute la durée du safari","Transferts aéroport à l'arrivée et au départ","Couverture d'évacuation Flying Doctors"],
      notIncluded: ["Vols internationaux et visa tanzanien","Assurance voyage et assistance médicale","Safari en montgolfière et autres activités optionnelles","Boissons autres que l'eau et dépenses personnelles","Pourboires pour votre guide et le personnel du camp"],
      practicalInfo: [
        {"label":"Taille du groupe","value":"Départ privé — votre groupe uniquement"},
        {"label":"Véhicule","value":"4x4 à toit ouvrant, place à la fenêtre garantie"},
        {"label":"Route","value":"Le plus long trajet d'une traite dure environ 4 heures"},
        {"label":"Condition physique","value":"Aucune condition physique particulière requise"},
      ],
      days: [
        {"title":"Arrivée à Arusha","route":"Aéroport international du Kilimandjaro → Arusha","activities":["Accueil à l'aéroport par votre guide Maisha Quest","Transfert à Arusha et installation","Briefing autour du dîner et aperçu des journées à venir"],"estimatedDuration":"1 h de transfert"},
        {"title":"Entrée dans le Tarangire","route":"Arusha → parc national du Tarangire","activities":["Route matinale vers le sud, à travers les pâturages maasaï","Safari en fin de journée le long de la rivière Tarangire","Coucher de soleil parmi les baobabs"],"estimatedDuration":"2 h 30 de route, 3 h de safari"},
        {"title":"Du Tarangire au Serengeti","route":"Tarangire → parc national du Serengeti","activities":["Départ matinal à travers l'aire de conservation du Ngorongoro","Déjeuner pique-nique à Naabi Hill, à la porte des plaines","Safari de l'après-midi vers le Serengeti central"],"estimatedDuration":"Journée entière de route, avec observation en chemin"},
        {"title":"Les plaines infinies","route":null,"activities":["Journée entière dans le Serengeti, rythmée par la lumière","Kopjes et lignes de rivière où se reposent les félins","Vol en montgolfière à l'aube, en option, à réserver à l'avance"],"estimatedDuration":"Journée entière"},
        {"title":"Du Serengeti au bord du cratère","route":"Serengeti → aire de conservation du Ngorongoro","activities":["Dernier safari matinal dans les plaines","Montée vers les hauts plateaux du Ngorongoro","Fin d'après-midi sur le rebord du cratère"],"estimatedDuration":"4 h de route avec arrêts"},
        {"title":"Au fond du cratère","route":"Fond du cratère du Ngorongoro","activities":["Descente au fond du cratère aux premières lueurs","Safari sur le plancher du cratère — la population résidente ne migre pas","Après-midi de retour sur le rebord, ou visite d'une communauté maasaï"],"estimatedDuration":"6 h au fond du cratère"},
        {"title":"Retour à Arusha","route":"Ngorongoro → Arusha → aéroport international du Kilimandjaro","activities":["Petit-déjeuner sans hâte sur le rebord","Retour à Arusha avec une pause café","Transfert à l'aéroport pour votre vol"],"estimatedDuration":"4 h de route"},
      ],
    },
    "serengeti-under-canvas": {
      name: "Le Serengeti sous la toile",
      summary: "Un camp mobile qui se déplace avec les troupeaux, de longues journées sur le terrain et des nuits sous la toile, là où la faune se trouve vraiment.",
      overview: "Le camp se démonte et suit la migration : vous vous réveillez là où sont les animaux au lieu de rouler deux heures pour les rejoindre. Toile confortable, vrais lits, eau chaude — et rien entre vous et les plaines.",
      travellerProfile: "Voyageurs actifs et habitués du safari",
      bestTime: "De janvier à mars pour les naissances, de juillet à octobre pour les traversées du nord",
      included: ["Véhicule 4x4 privé à toit ouvrant et guide Maisha Quest","Tous les droits d'entrée des parcs et aires de conservation","Hébergement en camp mobile, en pension complète","Personnel de camp et eau potable pendant tout le séjour","Transferts aéroport à l'arrivée et au départ"],
      notIncluded: ["Vols internationaux et visa tanzanien","Assurance voyage et assistance médicale","Safari en montgolfière et autres activités optionnelles","Boissons autres que l'eau et dépenses personnelles","Pourboires pour votre guide et le personnel du camp"],
      practicalInfo: undefined,
      days: [],
    },
    "serengeti-and-zanzibar": {
      name: "Serengeti et Zanzibar",
      summary: "Les plaines d'abord, l'océan Indien ensuite. Six jours de safari, quatre sur la côte, et une seule équipe pour assurer la jonction.",
      overview: "La forme de voyage tanzanien la plus demandée, avec assez de nuits de chaque côté pour qu'aucune des deux moitiés ne paraisse précipitée. Vous rejoignez Zanzibar en vol direct depuis le Serengeti, sans repasser par Arusha.",
      travellerProfile: "Couples et voyages de noces",
      bestTime: "De juin à octobre, et de décembre à février",
      included: ["Véhicule 4x4 privé à toit ouvrant et guide Maisha Quest","Tous les droits d'entrée des parcs et aires de conservation","Vol intérieur du Serengeti à Zanzibar","Hébergement tel qu'indiqué — pension complète en safari, nuit et petit-déjeuner sur la côte","Tous les transferts aéroport et hôtel"],
      notIncluded: ["Vols internationaux et visa tanzanien","Assurance voyage et assistance médicale","Repas autres que ceux indiqués et dépenses personnelles","Sports nautiques et excursions optionnelles à Zanzibar","Pourboires pour votre guide et le personnel du camp"],
      practicalInfo: undefined,
      days: [],
    },
    "tanzania-in-depth": {
      name: "La Tanzanie en profondeur",
      summary: "Le café sur les pentes où il pousse, des journées auprès des communautés maasaï et chagga, une équipe de conservation sur le terrain — et la faune aussi.",
      overview: "Pour les voyageurs qui veulent comprendre le pays plutôt que cocher une liste. Près de la moitié des journées se passent avec des personnes plutôt qu'avec des animaux, et les journées de safari n'en sont que meilleures.",
      travellerProfile: "Voyageurs curieux et familles avec grands enfants",
      bestTime: "De juin à octobre",
      included: ["Véhicule 4x4 privé à toit ouvrant et guide Maisha Quest","Tous les droits d'entrée des parcs et aires de conservation","Visites communautaires organisées en direct, les contributions revenant aux communautés","Hébergement tel qu'indiqué, en pension complète","Tous les transferts"],
      notIncluded: ["Vols internationaux et visa tanzanien","Assurance voyage et assistance médicale","Boissons autres que l'eau et dépenses personnelles","Pourboires pour votre guide et le personnel du camp"],
      practicalInfo: undefined,
      days: [],
    },
    "southern-wild": {
      name: "Sud sauvage : Nyerere et Ruaha",
      summary: "Safaris en bateau sur le Rufiji, marche au pays des baobabs, et deux parcs qui voient une fraction des véhicules du circuit nord.",
      overview: undefined,
      travellerProfile: "Habitués du safari en quête d'espace",
      bestTime: "De juin à octobre",
      included: ["Vols intérieurs entre Dar es Salaam, Nyerere et Ruaha","Tous les droits d'entrée des parcs","Hébergement en camp de toile, en pension complète","Safaris en véhicule, à pied et en bateau selon le programme"],
      notIncluded: ["Vols internationaux et visa tanzanien","Assurance voyage et assistance médicale","Boissons autres que l'eau et dépenses personnelles","Pourboires pour votre guide et le personnel du camp"],
      practicalInfo: undefined,
      days: [],
    },
    "kilimanjaro-lemosho": {
      name: "Kilimandjaro : la voie Lemosho",
      summary: "Huit jours sur la montagne par la voie qui acclimate le mieux, avec la journée supplémentaire intégrée d'office plutôt que vendue en supplément.",
      overview: undefined,
      travellerProfile: "Randonneurs — aucune expérience d'escalade technique requise",
      bestTime: "De janvier à mars, et de juin à octobre",
      included: ["Équipe de montagne : guides, cuisinier et porteurs, rémunération et limites de charge convenues avant la montée","Tous les droits du parc national du Kilimandjaro et frais de secours","Matériel de campement, repas et eau potable sur la montagne","Deux nuits à Arusha, avant et après l'ascension","Transferts aéroport"],
      notIncluded: ["Vols internationaux et visa tanzanien","Assurance voyage et médicale couvrant le trekking jusqu'à 6 000 m","Matériel de trekking personnel et sac de couchage","Pourboires pour l'équipe de montagne"],
      practicalInfo: undefined,
      days: [],
    },
    "highlands-and-communities": {
      name: "Hauts plateaux et communautés",
      summary: "Les parcs du nord, reliés par les communautés d'altitude qui vivent à leurs côtés — Maasaï, Datoga et Chagga.",
      overview: undefined,
      travellerProfile: "Voyageurs qui cherchent le contexte autant que la faune",
      bestTime: "De juin à octobre",
      included: ["Véhicule 4x4 privé à toit ouvrant et guide Maisha Quest","Tous les droits d'entrée des parcs et aires de conservation","Visites communautaires organisées en direct, les contributions revenant aux communautés","Hébergement tel qu'indiqué, en pension complète"],
      notIncluded: ["Vols internationaux et visa tanzanien","Assurance voyage et assistance médicale","Boissons autres que l'eau et dépenses personnelles","Pourboires pour votre guide et le personnel du camp"],
      practicalInfo: undefined,
      days: [],
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

  experiences: {
    "game-drives": {
      name: "Sorties en véhicule",
      shortDescription: "Véhicule privé, toit ouvert et un guide qui lit le terrain.",
      description: "Le cœur d’un safari en Tanzanie. Vous voyagez dans votre propre véhicule avec votre propre guide, donc vous fixez le rythme : rester deux heures avec un léopard si la lumière est bonne, ou repartir. Le début de matinée et la fin d’après-midi sont les moments où la savane est la plus vivante.",
    },
    "great-migration": {
      name: "La Grande Migration",
      shortDescription: "Suivre les troupeaux, au plus près de là où ils sont vraiment.",
      description: "Près de deux millions de gnous et de zèbres traversent l’écosystème du Serengeti selon un lent cercle annuel. Il n’existe pas une « saison de la migration » : il y a un endroit où les troupeaux devraient être le mois de votre voyage, et nous construisons l’itinéraire autour de cela plutôt qu’autour d’un programme figé.",
    },
    "mobile-camping": {
      name: "Camp mobile",
      shortDescription: "Un camp qui se déplace avec les animaux, pas contre eux.",
      description: "De la toile, un vrai lit, une douche seau sous les étoiles et un camp qui se replie pour suivre les troupeaux. C’est ce qui se rapproche le plus de la manière dont on voyageait à l’origine, sans rien de l’inconfort que vous imaginez peut-être.",
    },
    "walking-safari": {
      name: "Safari à pied",
      shortDescription: "Le même paysage, à trois kilomètres à l’heure.",
      description: "À pied, avec un ranger armé et un guide de marche, le safari change d’échelle : traces, déjections, chants d’oiseaux, l’odeur de la brousse. Vous voyez moins d’animaux et vous comprenez bien davantage. Possible à Tarangire, Nyerere et Ruaha, ainsi que sur les contreforts du Kilimandjaro.",
    },
    "balloon-safari": {
      name: "Safari en montgolfière",
      shortDescription: "Les premières lueurs sur le Serengeti, à trois cents mètres.",
      description: "Décollage à l’aube, une heure de dérive presque silencieuse au-dessus de la savane, et un petit-déjeuner dans l’herbe à l’endroit de l’atterrissage. C’est l’option que presque personne ne regrette — et elle se réserve très à l’avance.",
    },
    "photographic-safari": {
      name: "Safari photo",
      shortDescription: "Construit autour de la lumière, du placement et de la patience.",
      description: "Des itinéraires et des horaires pensés pour l’heure dorée, un placement du véhicule par rapport au soleil, des sacs de riz plutôt que des trépieds, et des guides habitués aux photographes. Des journées plus lentes, moins de parcs, de meilleures images.",
    },
    "beach-and-ocean": {
      name: "Plage et océan",
      shortDescription: "L’océan Indien, après la poussière de la savane.",
      description: "Zanzibar et les petites îles au large : une eau chaude et peu profonde, des voiles de boutres au coucher du soleil, des récifs à explorer en apnée ou en plongée. C’est la seconde moitié naturelle d’un safari, et celle autour de laquelle la plupart des couples construisent leur voyage de noces.",
    },
    "family-safari": {
      name: "Safari en famille",
      shortDescription: "Au rythme des enfants, sans rien enlever aux adultes.",
      description: "Des trajets plus courts, des unités familiales plutôt que des chambres séparées, des guides qui savent retenir l’attention d’un enfant de sept ans, et des parcs assez proches pour que personne ne passe une journée entière en voiture. L’âge minimum varie selon les camps : nous le vérifions avant toute proposition.",
    },
    "cultural-encounters": {
      name: "Rencontres culturelles",
      shortDescription: "Du temps avec les communautés, à leurs conditions.",
      description: "Des visites organisées directement avec les communautés concernées, aux horaires qui leur conviennent, avec une part juste de ce que vous payez qui reste sur place. Communautés maasaï et datoga près des hauts plateaux du Ngorongoro, villages chagga sur les pentes du Kilimandjaro, et Stone Town swahilie à Zanzibar.",
    },
    "coffee-and-cuisine": {
      name: "Café et cuisine",
      shortDescription: "La Tanzanie par ce qu’elle cultive et ce qu’elle cuisine.",
      description: "Le café sur les pentes où il pousse, les fermes à épices aux portes de Stone Town, une cuisine swahilie, un marché à Arusha. De courtes demi-journées sans hâte qui en disent plus sur le pays qu’une sortie en véhicule de plus.",
    },
    "kilimanjaro-trek": {
      name: "Ascension du Kilimandjaro",
      shortDescription: "Cinq climats, une montagne, une semaine.",
      description: "Machame, Lemosho, Rongai ou Marangu — la bonne voie dépend du temps dont vous disposez, de votre acclimatation et de la manière dont vous voulez vivre la marche. Nous prévoyons la journée d’acclimatation supplémentaire par défaut, et non comme une option payante.",
    },
    "safari-and-zanzibar": {
      name: "Safari et Zanzibar",
      shortDescription: "La savane d’abord, l’océan ensuite. L’association classique.",
      description: "La forme de voyage la plus demandée en Tanzanie : le circuit nord, puis un court vol vers l’est jusqu’à la côte. Assez de jours de chaque côté pour qu’aucune moitié ne paraisse précipitée, et une seule équipe pour gérer la jonction.",
    },
    "boat-safari": {
      name: "Safari en bateau",
      shortDescription: "Observer depuis l’eau, sur le Rufiji.",
      description: "À Nyerere, la rivière est la route. La fin d’après-midi sur le Rufiji amène hippopotames, crocodiles, éléphants descendus boire et une liste d’oiseaux à trois chiffres — depuis un bateau, à hauteur d’yeux.",
    },
    "birdwatching": {
      name: "Observation des oiseaux",
      shortDescription: "Plus de mille espèces, et des guides qui reconnaissent les chants.",
      description: "La liste ornithologique de la Tanzanie est l’une des plus longues d’Afrique. Le lac Manyara, les lacs de la vallée du Rift et les parcs du sud en saison verte sont les meilleurs terrains, et les mois de novembre à avril amènent les migrateurs.",
    },
    "conservation": {
      name: "Journées conservation",
      shortDescription: "Une journée avec ceux qui font le travail.",
      description: "Du temps avec des rangers, des chercheurs et des projets communautaires de conservation — comprendre ce que protéger ces écosystèmes implique vraiment, plutôt que de l’observer depuis un véhicule.",
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
    "when-to-see-the-great-migration": {
      title: "Où se trouve vraiment la migration, mois par mois",
      excerpt: "Il n’y a pas de saison de la migration : il y a un endroit où les troupeaux devraient être le mois où vous partez. Une réponse claire pour chaque mois, et ce que cela implique pour vos nuits.",
      category: "Préparation",
    },
    "choosing-a-kilimanjaro-route": {
      title: "Choisir sa voie sur le Kilimandjaro",
      excerpt: "Lemosho, Machame, Rongai ou Marangu. Ce qui compte vraiment, c’est le profil d’acclimatation et le nombre de jours que vous pouvez donner à la montagne — pas une échelle de difficulté.",
      category: "Kilimandjaro",
    },
    "green-season-tanzania": {
      title: "Éloge de la saison verte",
      excerpt: "De novembre à mai, on parle de saison des pluies et on passe. Ce que vous y trouvez en réalité : des parcs vides, des ciels extraordinaires, des nouveau-nés et la meilleure observation d’oiseaux de l’année.",
      category: "Préparation",
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
      bio: "Talisa a fondé Maisha Quest après un parcours dans le tourisme international et l’hôtellerie. Elle parle quatre langues : c’est pourquoi les voyageurs de Moscou, Shanghai ou Madrid sont accompagnés dans la leur — et pourquoi la première conversation sur votre voyage n’a presque jamais besoin d’un traducteur.",
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
    "education": {
      title: "Soutien à l’éducation",
      description: "Les écoles proches des communautés que traversent ces voyages : les choses concrètes qui manquent à une salle de classe, et les frais qui en tiennent les enfants éloignés.",
      location: null,
    },
    "conservation": {
      title: "Conservation de la faune",
      description: "Les équipes de conservation qui travaillent dans les écosystèmes dont dépendent ces voyages — et la possibilité de passer une journée avec elles plutôt que d’en lire seulement le récit.",
      location: null,
    },
    "community": {
      title: "Partenariat avec les communautés",
      description: "Des visites communautaires organisées directement avec celles et ceux qui les accueillent, au moment qui leur convient et non à celui qui arrange un autocar.",
      location: null,
    },
    "local-employment": {
      title: "Emploi local",
      description: "Guides, chauffeurs, cuisiniers et personnel de bureau recrutés en Tanzanie. Sur le Kilimandjaro, la façon dont une équipe de montagne est rémunérée et ce qu’elle porte fait partie du choix.",
      location: "Arusha, Tanzanie",
    },
  },
};
