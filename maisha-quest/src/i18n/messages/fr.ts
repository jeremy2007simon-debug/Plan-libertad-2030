import type { Dictionary } from "./en";

/**
 * Diccionario de interfaz — francés.
 *
 * Traducción completa, pendiente de revisión por hablante nativo antes del
 * lanzamiento. Terminología según `src/i18n/glossary.ts`.
 *
 * Tratamiento de usted ("vous"), estándar en el sector del viaje a medida.
 * Se respeta el espacio fino antes de los signos dobles (: ? !) como exige la
 * tipografía francesa.
 */
export const fr: Dictionary = {
  a11y: {
    skipToContent: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNav: "Navigation principale",
    footerNav: "Pied de page",
    languageMenu: "Changer de langue",
    languageMenuLabel: "Langue",
    currentLanguage: "Langue actuelle",
    previous: "Précédent",
    next: "Suivant",
    required: "(obligatoire)",
    externalLink: "s’ouvre dans un nouvel onglet",
    whatsapp: "Écrire à Maisha Quest sur WhatsApp",
    callUs: "Appeler Maisha Quest",
    emailUs: "Écrire à Maisha Quest",
  },

  nav: {
    homeLabel: "Maisha Quest — accueil",
    mainNavLabel: "Navigation principale",
    menu: "Menu",
    close: "Fermer",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    siteMenu: "Menu du site",
    whatsappLabel: "Écrire à Maisha Quest sur WhatsApp",
    language: {
      buttonLabel: "Changer de langue",
      menuLabel: "Langue",
      current: "Actuelle",
    },
    items: {
      safaris: "Safaris",
      allSafaris: "Tous les safaris",
      explorer: "Collection Explorer",
      escape: "Collection Escape",
      enrich: "Collection Enrich",
      destinations: "Destinations",
      experiences: "Expériences",
      about: "À propos",
      ourStory: "Notre histoire",
      team: "L’équipe",
      impact: "Engagement",
      journal: "Journal",
      contact: "Contact",
      faq: "Questions fréquentes",
      aboutUs: "À propos de nous",
      terms: "Conditions générales",
      privacy: "Politique de confidentialité",
      cookies: "Politique de cookies",
      credits: "Crédits photo",
      sitemap: "Plan du site",
    },
    descriptions: {
      safaris: "Des voyages privés, regroupés selon votre façon de voyager.",
      explorer: "Paysages sauvages, aventure et découverte.",
      escape: "De l’espace, du confort et une vraie coupure.",
      enrich: "Culture, cuisine et communautés.",
    },
    planCta: "Composez votre voyage",
    planShort: "Composer mon safari",
    speakToExpert: "Parler à un expert local",
    chat: "Chat",
    whatsappMessage:
      "Bonjour Maisha Quest, j’aimerais de l’aide pour organiser un safari en Tanzanie.",
  },

  footer: {
    navLabel: "Pied de page",
    blurb:
      "Des voyages privés en Tanzanie, conçus et guidés depuis Arusha. Guidés par la Tanzanie. Pensés pour vous.",
    groups: {
      travel: "Voyager",
      company: "Maisha Quest",
      legal: "Mentions légales",
    },
    whatsapp: "Écrivez-nous sur WhatsApp",
    rights: "Maisha signifie la vie — le voyage d’une vie.",
  },

  collectionNames: {
    explorer: "Explorer",
    escape: "Escape",
    enrich: "Enrich",
  },

  safaris: {
    title: "Tous les voyages que nous composons",
    lede:
      "Ici, aucun départ fixe. Chacun est une forme de voyage dont nous savons qu’elle fonctionne, reconstruite autour de vos dates, de votre rythme et de ceux qui vous accompagnent.",
    collection: "Collection",
    aboutCollection: "À propos de cette collection",
    journeyCount: (n: number) => (n === 1 ? "1 voyage" : `${n} voyages`),
    noneRightTitle: "Aucun ne correspond vraiment ?",
    noneRightBody:
      "Tant mieux : c’est en général le point de départ. Dites-nous ce que vous imaginez et nous le construirons de zéro.",
  },

  collections: {
    pageTitle: (name: string) => `Collection ${name}`,
    typicalLength: "Durée habituelle",
    journeysInCollection: (n: number) =>
      n === 1
        ? "1 voyage dans cette collection"
        : `${n} voyages dans cette collection`,
    notQuiteYou: "Pas tout à fait vous ?",
  },

  destinations: {
    title: "Neuf lieux, un pays",
    lede:
      "La Tanzanie n’est pas un seul paysage. Voici les lieux que nous traversons, ce qui y vit et le moment où ils sont au mieux.",
    whenToCome: "Quand venir",
    include: (place: string) => `Inclure ${place}`,
    journeysThrough: (place: string) => `Voyages passant par ${place}`,
  },

  experiences: {
    singular: "Expérience",
    lede:
      "Un safari ne se résume pas aux sorties en véhicule. Voici les façons de vivre une journée en Tanzanie — associez-en autant que vous voulez.",
    whereYouDoThis: "Où la vivre",
    addToJourney: "Ajouter à mon voyage",
    journeysIncluding: "Voyages qui l’incluent",
  },

  planner: {
    stepOf: "Étape {n} sur {total}",
    progress: "Progression du questionnaire",
    draftRestored:
      "Nous reprenons où vous en étiez. Vos réponses précédentes sont enregistrées uniquement sur cet appareil.",
    back: "Retour",
    continue: "Continuer",
    send: "Envoyer ma demande",
    sending: "Envoi…",
    savedLocally: "Enregistré sur cet appareil au fil de la saisie",

    steps: {
      trip: {
        label: "Voyage",
        title: "Quel type de voyage imaginez-vous ?",
        help: "Choisissez le plus proche. Rien n’est engageant : cela nous dit simplement par où commencer.",
      },
      destinations: {
        label: "Lieux",
        title: "Où aimeriez-vous aller ?",
        help: "Choisissez-en autant que vous voulez, ou laissez-nous faire.",
      },
      dates: {
        label: "Dates",
        title: "Quand, et pour combien de temps ?",
        help: "Une approximation suffit. Si vos dates sont souples, dites-le : cela joue souvent en votre faveur.",
      },
      travellers: {
        label: "Voyageurs",
        title: "Qui voyage, et comment aimeriez-vous être logés ?",
        help: "",
      },
      budget: {
        label: "Budget",
        title: "Avec quel budget travaillez-vous ?",
        help: "Par personne, hors vols internationaux. Une fourchette honnête nous permet de proposer quelque chose de réel plutôt que d’optimiste.",
      },
      contact: {
        label: "Contact",
        title: "Où vous envoyons-nous notre proposition ?",
        help: "",
      },
      review: { label: "Récapitulatif", title: "Tout est correct ?", help: "" },
    },

    legends: {
      tripType: "Type de voyage",
      duration: "Combien de temps ?",
      travellers: "Voyageurs",
      accommodation: "Comment aimeriez-vous être logés ?",
      budget: "Budget par personne",
    },

    tripTypes: {
      wildlife: {
        label: "Safari classique",
        note: "Sorties en véhicule et grands parcs",
      },
      honeymoon: { label: "Lune de miel", note: "Intimité, confort et littoral" },
      family: { label: "Voyage en famille", note: "Au rythme des enfants" },
      adventure: {
        label: "Aventure",
        note: "À pied, sous la tente, sur des routes isolées",
      },
      kilimanjaro: { label: "Kilimandjaro", note: "L’ascension de la montagne" },
      culture: {
        label: "Culture et communautés",
        note: "Les gens, la cuisine et le lieu",
      },
      "safari-and-zanzibar": {
        label: "Safari et Zanzibar",
        note: "La savane, puis l’océan",
      },
      "not-sure": { label: "Pas encore décidé", note: "Aidez-nous à y voir clair" },
    },

    durations: {
      "under-7": { label: "Moins d’une semaine" },
      "7-9": { label: "7 – 9 jours" },
      "10-14": { label: "10 – 14 jours" },
      "15-plus": { label: "Plus de deux semaines" },
      unsure: { label: "Non décidé" },
    },

    accommodationStyles: {
      camp: { label: "Camps de toile", note: "La toile, au plus près des animaux" },
      lodge: { label: "Lodges", note: "Du confort et un vrai lit" },
      boutique: {
        label: "Boutique et design",
        note: "De petites adresses de caractère",
      },
      mixed: { label: "Un mélange", note: "Des styles différents au fil de la route" },
      guidance: { label: "Conseillez-moi", note: "Nous proposerons ce qui convient" },
    },

    budgets: {
      "under-3000": { label: "Moins de 3 000 $" },
      "3000-5000": { label: "3 000 – 5 000 $" },
      "5000-8000": { label: "5 000 – 8 000 $" },
      "8000-plus": { label: "Plus de 8 000 $" },
      open: { label: "Ouvert — conseillez-moi" },
    },

    fields: {
      month: "À peu près quand ?",
      adults: "Adultes",
      children: "Enfants",
      childrenHint: "Moins de 18 ans",
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail",
      phone: "Téléphone ou WhatsApp",
      country: "Pays",
      replyIn: "Répondez-moi en",
      notes: "Autre chose à nous signaler ?",
      notesPlaceholder:
        "Célébrations, régime alimentaire, mobilité, photographie, animaux que vous espérez voir…",
    },

    errors: {
      tripType:
        "Choisissez le type de voyage que vous avez en tête, ou « Pas encore décidé ».",
      travelMonth:
        "Indiquez un mois approximatif, ou cochez « mes dates sont souples ».",
      durationDays: "Combien de temps souhaitez-vous voyager, à peu près ?",
      adultsMin: "Il faut au moins un adulte parmi les voyageurs.",
      adultsMax:
        "Pour les groupes de plus de vingt personnes, écrivez-nous directement : nous l’organisons autrement.",
      accommodationStyle:
        "Choisissez un style d’hébergement, ou demandez-nous conseil.",
      budgetPerPerson: "Choisissez une fourchette, ou « Ouvert — conseillez-moi ».",
      firstName: "Il nous faut un nom pour vous répondre.",
      emailMissing:
        "Il nous faut une adresse e-mail pour vous envoyer notre proposition.",
      emailInvalid: "Cette adresse e-mail semble incorrecte : merci de la vérifier.",
      consent:
        "Merci de confirmer que nous pouvons utiliser ces informations pour répondre à votre demande.",
    },

    review: {
      journey: "Voyage",
      destinations: "Destinations",
      when: "Quand",
      length: "Durée",
      travellers: "Voyageurs",
      stays: "Hébergement",
      budget: "Budget",
      contact: "Contact",
      notes: "Remarques",
      edit: "Modifier",
      flexible: "Souples",
      notGiven: "Non précisé",
      openToSuggestions: "Ouvert aux suggestions",
      adultCount: { one: "{n} adulte", other: "{n} adultes" },
      childCount: { one: ", {n} enfant", other: ", {n} enfants" },
    },

    summary: {
      heading: "Demande de voyage — Maisha Quest",
      name: "Nom",
      email: "E-mail",
      phone: "Téléphone",
      country: "Pays",
      replyIn: "Réponse en",
      journeyType: "Type de voyage",
      budgetPerPerson: "Budget par personne",
    },

    status: {
      sentTitle: "Votre demande nous est parvenue.",
      sentBody:
        "Merci, {name}. Quelqu’un de l’équipe à Arusha la lira attentivement et vous répondra — non pas avec un modèle, mais avec un itinéraire.",
      reference: "Votre référence est",
      unconfiguredTitle: "Presque — ce formulaire n’est pas encore connecté.",
      unconfiguredBody:
        "Nous n’allons pas vous dire que votre demande est partie alors qu’elle ne l’est pas. Le point d’envoi n’est pas encore relié à une messagerie ni à un CRM : rien ne nous est parvenu. Vos réponses sont ci-dessous, prêtes à partir — un geste et elles sont envoyées.",
      sendByEmail: "Envoyer par e-mail",
      sendOnWhatsApp: "Envoyer sur WhatsApp",
      yourAnswers: "Vos réponses",
      sendFailed: "Nous n’avons pas pu l’envoyer à l’instant.",
      offline:
        "Nous n’avons pas pu joindre notre serveur. Vérifiez votre connexion et réessayez.",
      orEmailUs: "Vous pouvez aussi nous écrire à",
      inTheMeantime: "En attendant",
    },
  },

  contact: {
    title: "Parlez à un expert local",
    lede:
      "Nous sommes à Arusha, pas dans un centre d’appels. Par quelque moyen que vous nous écriviez, l’un des fondateurs le verra.",
    phone: "Téléphone",
    email: "E-mail",
    hours: "Horaires",
    whereWeAre: "Où nous sommes",
    messageUs: "Écrivez-nous",
    languagesBody:
      "Nous organisons et accompagnons en anglais et en swahili, et parlons également le russe et le mandarin.",
    planningTitle: "Vous préparez un voyage ?",
    planningBody:
      "Le questionnaire prend quelques minutes et nous donne tout ce qu’il faut pour vous répondre avec un vrai itinéraire plutôt qu’une brochure.",
  },

  plan: {
    lede:
      "Sans engagement et sans devis automatique. Une personne à Arusha lit chaque demande et répond avec un itinéraire.",
    customizeTitle: (name: string) => `Personnaliser : ${name}`,
    customizeLede:
      "Nous avons repris ce voyage comme point de départ. Changez ce que vous voulez : l’itinéraire, le rythme, la durée, le style d’hébergement.",
    steps: [
      {
        title: "Vous nous dites ce que vous imaginez",
        body: "Sept étapes courtes : quand, combien de temps, qui voyage et ce que vous en attendez.",
      },
      {
        title: "Nous répondons avec un itinéraire",
        body: "Un itinéraire proposé, avec une idée honnête de son coût et de ce qu’il implique — écrit par une personne, pas généré.",
      },
      {
        title: "Nous l’ajustons jusqu’à ce qu’il vous aille",
        body: "Autant d’allers-retours qu’il faudra. Rien n’est confirmé ni payé tant que vous n’êtes pas satisfait.",
      },
    ],
  },

  legal: {
    eyebrow: "Mentions légales",
    notice: {
      before:
        "Cette page est en cours de finalisation avec le conseil juridique de Maisha Quest. D’ici là, les conditions applicables à votre réservation sont celles figurant par écrit dans votre confirmation. Demandez-nous la version en vigueur à",
      after: "et nous vous l’enverrons.",
    },
    pendingSection:
      "La rédaction complète de cette section est en attente de révision juridique.",
    terms: {
      title: "Conditions générales",
      intro:
        "Les conditions applicables lorsque vous réservez un voyage avec Maisha Quest.",
      sections: [
        {
          heading: "Avec qui vous réservez",
          body: [
            "Maisha Quest est un voyagiste établi à Arusha, en Tanzanie, qui organise des safaris privés, des ascensions et des séjours côtiers dans tout le pays.",
            "Les informations d’immatriculation et de licence de voyagiste seront publiées ici.",
          ],
          pending: true,
        },
        {
          heading: "Devis et confirmation",
          body: [
            "Un devis est une proposition, pas une réservation. Les prix, les camps et les disponibilités sont confirmés par écrit avant tout blocage.",
          ],
          pending: true,
        },
        {
          heading: "Paiement",
          body: [
            "Les conditions d’acompte, de solde et de moyens de paiement restent à définir.",
          ],
          pending: true,
        },
        {
          heading: "Modifications et annulation",
          body: [
            "Les conditions d’annulation dépendent des camps et des vols intérieurs réservés pour votre voyage, et seront détaillées intégralement dans votre confirmation.",
          ],
          pending: true,
        },
        {
          heading: "Assurance",
          body: [
            "Une assurance voyage et santé complète est exigée pour tous les voyageurs. La couverture doit inclure l’évacuation sanitaire et, pour les ascensions du Kilimandjaro, le trekking jusqu’à 6 000 mètres.",
          ],
        },
        {
          heading: "Passeport, visas et santé",
          body: [
            "Il appartient à chaque voyageur de disposer d’un passeport valide et du visa adéquat, et de satisfaire aux exigences sanitaires d’entrée. Nous vous orienterons vers les sources officielles, mais nous ne pouvons pas vous conseiller sur votre situation particulière.",
          ],
        },
        {
          heading: "Sécurité en safari",
          body: [
            "La faune est sauvage. Les voyageurs doivent suivre à tout moment les consignes de leur guide, y compris au camp, et aucune observation n’est garantie.",
          ],
        },
        {
          heading: "Responsabilité et droit applicable",
          body: [
            "Le droit applicable et les clauses de responsabilité sont en attente de révision juridique.",
          ],
          pending: true,
        },
      ],
    },
    privacy: {
      title: "Politique de confidentialité",
      intro:
        "Ce que nous recueillons lorsque vous nous contactez, pourquoi, et ce que nous en faisons.",
      sections: [
        {
          heading: "Ce que nous recueillons",
          body: [
            "Lorsque vous utilisez le questionnaire ou nous écrivez, nous recueillons ce que vous nous donnez : votre nom, votre e-mail, éventuellement un téléphone et un pays, ainsi que les éléments du voyage envisagé.",
            "Nous ne demandons ni données de passeport ni données de paiement sur ce site.",
          ],
        },
        {
          heading: "Pourquoi nous les conservons",
          body: [
            "Pour répondre à votre demande et, si vous réservez, organiser votre voyage. C’est la seule raison. Nous ne vendons ni ne louons vos données à personne.",
          ],
        },
        {
          heading: "Où elles vont",
          body: [
            "Les demandes arrivent à notre équipe à Arusha. Pour organiser un voyage, nous ne transmettons que le strict nécessaire aux camps, lodges, compagnies aériennes et guides de votre itinéraire.",
          ],
        },
        {
          heading: "Combien de temps nous les gardons",
          body: [
            "Les durées de conservation sont en attente de révision juridique.",
          ],
          pending: true,
        },
        {
          heading: "Vos droits",
          body: [
            "Vous pouvez nous demander quelles données nous détenons sur vous, en demander la rectification ou la suppression. Écrivez à l’adresse figurant au bas de cette page et nous y donnerons suite.",
          ],
        },
        {
          heading: "Le brouillon enregistré dans votre navigateur",
          body: [
            "Le questionnaire enregistre vos réponses dans votre propre navigateur afin que vous ne les perdiez pas en fermant l’onglet. Ce brouillon reste sur votre appareil, ne nous parvient qu’à l’envoi du formulaire et est effacé à ce moment-là.",
          ],
        },
      ],
    },
    cookies: {
      title: "Politique de cookies",
      intro: "Ce que ce site enregistre dans votre navigateur.",
      sections: [
        {
          heading: "Ce site ne dépose aucun cookie de suivi",
          body: [
            "En l’état, ce site ne dépose ni cookies publicitaires ni cookies de mesure d’audience, et ne charge aucun traceur tiers. Les polices sont servies depuis le site lui-même et non par un prestataire externe, et la carte est dessinée par le site plutôt que demandée à un service cartographique.",
          ],
        },
        {
          heading: "Ce qui est enregistré en local",
          body: [
            "Le questionnaire enregistre vos réponses inachevées dans le stockage local de votre navigateur afin que vous ne les perdiez pas. Elles ne quittent pas votre appareil avant l’envoi du formulaire et sont supprimées ensuite. Effacer les données du navigateur les supprime immédiatement.",
          ],
        },
        {
          heading: "Si une mesure d’audience est ajoutée plus tard",
          body: [
            "Si Maisha Quest ajoute des outils de mesure d’audience ou de publicité, cette page sera mise à jour et une bannière de consentement sera ajoutée avant le dépôt de tout cookie de ce type.",
          ],
          pending: true,
        },
      ],
    },
  },

  credits: {
    eyebrow: "Crédits",
    title: "Crédits photographiques",
    lede:
      "Les images de ce site sont des photographies documentaires provisoires de Tanzanie, utilisées sous licence Creative Commons le temps que la photographie propre à Maisha Quest soit prête.",
    sourceAndLicence: "Source et licence",
    body:
      "Chaque image a été retenue parce que sa fiche d’origine atteste à la fois du pays et du sujet — de sorte qu’aucune espèce ni aucun paysage étranger à la Tanzanie n’apparaît sur ce site. Aucune de ces photographies n’a été prise par Maisha Quest, et aucune ne montre de voyageurs, de guides, de véhicules ni de camps de Maisha Quest.",
    allOwn:
      "Toute la photographie de ce site est désormais celle de Maisha Quest.",
  },

  meta: {
    keywords: [
      "safari Tanzanie",
      "safari privé Tanzanie",
      "safari Serengeti",
      "cratère du Ngorongoro",
      "ascension du Kilimandjaro",
      "safari et Zanzibar",
      "safari sur mesure Arusha",
    ],
    home: {
      title: "Maisha Quest · Safaris privés en Tanzanie",
      description:
        "Des voyages privés en Tanzanie, guidés par des experts locaux et composés autour de votre histoire. Serengeti, Ngorongoro, Tarangire, Kilimandjaro et Zanzibar, organisés depuis Arusha.",
      ogTitle: "Voyages privés en Tanzanie · Maisha Quest",
      ogDescription:
        "Guidés par des experts locaux. Pensés pour vous. Des safaris sur mesure dans toute la Tanzanie, par une équipe basée à Arusha.",
    },
    safaris: {
      title: "Safaris",
      description:
        "Tous les voyages privés que nous composons en Tanzanie, regroupés selon votre façon de voyager. Ici, aucun départ fixe.",
    },
    destinations: {
      title: "Destinations",
      description:
        "Neuf lieux en Tanzanie : le circuit nord, les parcs du sud, le Kilimandjaro et la côte de l’océan Indien.",
    },
    experiences: {
      title: "Expériences",
      description:
        "Sorties en véhicule, safaris à pied, vols en montgolfière, journées culturelles, le Kilimandjaro et la côte de Zanzibar — les façons de vivre une journée en Tanzanie.",
    },
    about: {
      title: "À propos de nous",
      description:
        "Maisha Quest est un voyagiste tanzanien basé à Arusha. Maisha signifie la vie : nous composons des voyages privés autour de qui vous êtes et de votre façon de voyager.",
    },
    team: {
      title: "L’équipe",
      description:
        "Talisa Tufts, Frank Lyatuu et Tina Ngabo — les fondateurs de Maisha Quest, basés à Arusha, en Tanzanie.",
    },
    impact: {
      title: "Engagement",
      description:
        "Maisha Quest Cares — des guides et des prestataires tanzaniens, des visites communautaires organisées en direct, et le travail éducatif et de conservation que Maisha Quest construit autour de ses voyages.",
    },
    journal: {
      title: "Journal",
      description:
        "Des repères de préparation par notre équipe à Arusha : où se trouve la migration mois par mois, comment choisir une voie du Kilimandjaro et voyager en saison verte.",
    },
    contact: {
      title: "Contact",
      description:
        "Parlez à Maisha Quest à Arusha, en Tanzanie. Téléphone, e-mail et WhatsApp, traités par l’équipe qui vous accompagnera.",
    },
    plan: {
      title: "Composez votre voyage",
      description:
        "Sept étapes courtes, lues une à une par une personne à Arusha. Sans devis automatique et sans engagement.",
    },
    faq: {
      title: "Questions fréquentes",
      description:
        "Quand visiter la Tanzanie, combien de temps à l’avance réserver, ce qu’est un safari privé, visas, vaccins et bagages — répondu par notre équipe à Arusha.",
    },
  },

  notFound: {
    title: "Hors carte",
    body:
      "Cette page n’existe pas — ou elle a changé d’adresse lors de la refonte du site. Essayez plutôt l’une de celles-ci.",
    contact: "Nous contacter",
  },

  about: {
    heroTitle: "Guidés par la Tanzanie. Pensés pour vous.",
    heroLede:
      "Maisha Quest est né à Arusha, au pied du mont Meru. Nous sommes une petite équipe locale qui compose des voyages privés pour ceux qui cherchent autre chose qu’un départ fixe.",
    lede:
      "Maisha Quest se traduit à peu près par « le voyage d’une vie » — et c’est toute l’idée. Un safari n’est pas un produit qu’on prend en rayon : c’est un morceau de votre vie passé dans un lieu extraordinaire, et il mérite d’être construit comme tel.",
    compass:
      "Nos fondateurs décrivent cela comme vivre à la boussole : choisir une direction plutôt que suivre un itinéraire figé. C’est ainsi que nous préparons les voyages — nous partons de là où vous voulez arriver, pas d’un catalogue.",
    ground:
      "Tout est organisé depuis Arusha, sur le terrain. Nos guides, nos véhicules et nos prestataires sont tanzaniens, et la personne qui répond à votre premier message est celle qui vous accueille à l’aéroport.",
    meetTeam: "Rencontrer l’équipe",
    howWeWork: "Comment nous travaillons",
    people: "Les personnes",
    readStories: "Lire leurs histoires",
    talkTitle: "Parlons-en",
    talkBody: (timezone: string, hours: string) =>
      `Nous sommes à Arusha, ${timezone}, ${hours}. Le plus rapide est de nous dire à peu près quand vous souhaitez partir et ce qui compte pour vous.`,
    contactDetails: "Coordonnées",
  },

  journal: {
    title: "Notes d’Arusha",
    lede:
      "Des textes pratiques sur le voyage en Tanzanie — les questions qu’on nous pose le plus, traitées correctement plutôt qu’en un paragraphe.",
    pendingTitle:
      "Notre équipe à Arusha rédige cet article ; il sera publié ici très prochainement.",
    pendingBody:
      "Si vous avez besoin de la réponse avant, demandez-nous : c’est une question à laquelle nous répondons chaque semaine, et nous préférons vous l’expliquer correctement plutôt que vous faire attendre un article.",
    more: "Plus d’articles",
  },

  faq: {
    title: "Les questions qu’on nous pose le plus",
    lede:
      "Des réponses directes. Lorsqu’un point dépend de votre passeport, de votre santé ou de vos dates, nous le disons et vous renvoyons à la source officielle plutôt que de supposer.",
    stillTitle: "Toujours sans réponse ?",
    stillBefore: "Écrivez-nous à",
    stillAfter: (phone: string, timezone: string) =>
      `ou appelez le ${phone}. Nous sommes à Arusha, ${timezone}.`,
  },

  impact: {
    noNumbers:
      "Nous n’afficherons pas sur cette page des chiffres que nous ne pourrions pas assumer. À mesure que chaque programme produira des résultats documentables — écoles soutenues, emplois créés, projets financés —, ils seront publiés ici avec les éléments qui les étayent.",
    askCta: "Posez-nous des questions sur nos projets",
  },

  regions: {
    northern: "Circuit nord",
    southern: "Circuit sud",
    coast: "Côte et îles",
    gateway: "Porte d’entrée",
  },
  accommodation: {
    "Mobile camp": "Camp mobile",
    "Tented camp": "Camp de toile",
    Lodge: "Lodge",
    "Boutique lodge": "Lodge boutique",
    "Beach resort": "Resort de plage",
    "City hotel": "Hôtel de ville",
  },
  meals: {
    breakfast: "Petit-déjeuner",
    lunch: "Déjeuner",
    dinner: "Dîner",
  },
  impactAreas: {
    education: "Éducation",
    conservation: "Conservation",
    community: "Communauté",
    employment: "Emploi local",
  },
  faqTopics: {
    planning: "Préparation",
    travel: "Voyage",
    safari: "Safari",
    health: "Santé et sécurité",
    payment: "Paiement",
  },
  categories: {
    wildlife: "Faune",
    adventure: "Aventure",
    luxury: "Luxe",
    honeymoon: "Lune de miel",
    family: "Famille",
    culture: "Culture",
    kilimanjaro: "Kilimandjaro",
    "safari-and-zanzibar": "Safari et Zanzibar",
  },
  languageNames: {
    English: "Anglais",
    Swahili: "Swahili",
    Russian: "Russe",
    "Mandarin Chinese": "Mandarin",
    Spanish: "Espagnol",
    German: "Allemand",
    French: "Français",
  },

  video: {
    play: "Lire",
    pause: "Pause",
    unmute: "Activer le son",
    mute: "Couper le son",
  },

  team: {
    languages: "Langues",
    specialty: "Spécialité",
    favouritePlace: "Lieu préféré en Tanzanie",
    portraitOf: (name: string) => `Portrait de ${name}`,
    pageTitle: "Les personnes derrière votre voyage",
    crewTitle: "Guides, chauffeurs et équipe",
    crewBody:
      "Chaque voyage est mené par des guides et des chauffeurs tanzaniens avec lesquels nous travaillons directement. Sur le Kilimandjaro, la façon dont une équipe de montagne est rémunérée et ce qu’elle porte fait partie du choix. Les profils du reste de l’équipe seront publiés ici.",
    startPlanning: "Commencer à préparer",
  },

  safari: {
    itineraryPending:
      "Notre équipe à Arusha finalise le programme jour par jour de ce voyage. Demandez-le-nous et nous vous enverrons la version actuelle.",
    stay: "Hébergement",
    stayPending: "Confirmé avec votre proposition",
    meals: "Repas",
    time: "Durée",
    collectionOf: (name: string) => `Collection ${name}`,
    style: "Style",
    theJourney: "Le voyage",
    dayByDay: "Jour par jour",
    whereYouStay: "Où vous logez",
    whereYouStayBody: (style: string) =>
      `Ce voyage est conçu autour d’un hébergement de type « ${style.toLowerCase()} ». Nous vous proposons les camps et lodges précis en même temps que l’itinéraire, choisis selon leur position sur la route et les disponibilités à vos dates, plutôt que de citer ici des adresses que nous ne pourrions pas garantir.`,
    gallery: "Galerie",
    theRoute: "L’itinéraire",
    included: "Ce qui est inclus",
    notIncluded: "Non inclus",
    practical: "Pratique",
    commonQuestions: "Questions fréquentes",
    whatTravellersSaid: "Ce qu’ont dit les voyageurs",
    noReviews:
      "Aucun avis n’a encore été publié sur ce voyage, et nous n’en écrirons pas nous-mêmes. Demandez-nous et nous vous mettrons en relation avec des voyageurs qui l’ont fait.",
    similarJourneys: "Voyages similaires",
    askQuestion: "Poser une question",
  },

  home: {
    hero: {
      headline: ["Voyages privés", "en Tanzanie"],
      subline: "Guidés par des experts locaux. Pensés pour votre histoire.",
      designCta: "Composez votre safari",
      exploreCta: "Découvrir les voyages",
      pillars: ["Experts locaux", "Safaris privés", "Voyage responsable"],
      scroll: "Défiler",
    },
    maisha: {
      eyebrow: "Notre nom",
      meansLife: "signifie la vie.",
      lede:
        "Chaque voyage est une occasion de découvrir, de se relier et de vivre plus pleinement. Nous créons des safaris privés en Tanzanie taillés pour qui vous êtes et pour votre façon de voyager.",
      body:
        "Maisha Quest est né à Arusha, au pied du mont Meru et au début du circuit nord. Nous sommes une petite équipe : la personne qui répond à votre premier message est celle qui vous accueille à l’aéroport.",
      cta: "Découvrir Maisha Quest",
    },
    experiences: {
      eyebrow: "Commencez ici",
      title: "Comment voulez-vous vivre la Tanzanie ?",
      lede:
        "Chaque voyage que nous composons commence par cette question, et non par un forfait. Choisissez celui qui vous ressemble le plus — vous pourrez les combiner ensuite.",
      carouselLabel: "Façons de vivre la Tanzanie",
    },
    collections: {
      eyebrow: "Les collections Maisha",
      title: "Trois façons de parcourir la Tanzanie",
      lede:
        "Non pas trois niveaux de prix, mais trois tempéraments. La plupart des voyageurs savent lequel est le leur dès la première ligne.",
      explore: (name: string) => `Découvrir ${name}`,
    },
    featured: {
      eyebrow: "Voyages à la une",
      title: "Des voyages dont on se souvient",
      lede:
        "Ici, aucun départ n’est fixe. Chacun est une forme de voyage dont nous savons qu’elle fonctionne.",
    },
    map: {
      eyebrow: "La carte",
      title: "Trouvez votre place en Tanzanie",
      lede:
        "Neuf lieux, quatre circuits et un littoral. Choisissez-en un pour voir quand y aller, ce qui y vit et quels voyages y passent.",
      bestTime: "Meilleure période",
      wildlife: "Faune",
      journeysHere: "Voyages qui passent par ici",
      chooseDestination: "Choisissez une destination",
      dayCount: (n: number) => (n === 1 ? "1 jour" : `${n} jours`),
      moreOn: (place: string) => `En savoir plus sur ${place}`,
    },
    film: {
      eyebrow: "Le film",
      title: "Un pays. Une infinité de façons de se sentir vivant.",
      watch: "Voir le voyage",
      cta: "Découvrir les expériences",
      threads: [
        { label: "Faune", note: "La savane, et ce qui la traverse." },
        { label: "Culture", note: "Du temps avec ceux qui vivent ici." },
        { label: "Aventure", note: "À pied, sur l’eau, en montagne." },
        { label: "Océan", note: "Là où le voyage ralentit." },
        { label: "Lien", note: "La raison pour laquelle tout cela compte." },
      ],
    },
    why: {
      eyebrow: "Pourquoi Maisha Quest",
      title: "Votre voyage, entre de bonnes mains",
      lede:
        "Nous sommes une entreprise tanzanienne. Ce n’est pas une formule marketing : cela change qui répond au téléphone, qui conduit le véhicule et où va l’argent.",
      pillars: [
        {
          title: "Des experts basés en Tanzanie",
          body:
            "Nos itinéraires viennent de les avoir parcourus, pas d’une brochure.",
        },
        {
          title: "Des itinéraires sur mesure",
          body:
            "Chaque voyage est construit de zéro autour de votre rythme, de vos centres d’intérêt et de vos dates.",
        },
        {
          title: "Un accompagnement multilingue",
          body:
            "Organisation et correspondance en anglais et en swahili. Talisa parle en outre le russe et le mandarin.",
        },
        {
          title: "Des hébergements choisis un à un",
          body:
            "Des camps et des lodges choisis pour leur emplacement, la façon dont ils sont tenus et ce que l’on voit depuis là.",
        },
        {
          title: "Un voyage local et responsable",
          body:
            "Des guides locaux, des prestataires locaux et des communautés associées plutôt que photographiées.",
        },
        {
          title: "Un suivi de l’arrivée au départ",
          body:
            "Une même équipe de votre premier message à votre vol retour : celui qui conçoit votre voyage est celui qui vous répond.",
        },
      ],
    },
    team: {
      eyebrow: "L’équipe",
      title: "Rencontrez ceux qui préparent votre voyage",
      lede:
        "Trois fondateurs à Arusha. À eux trois, ils couvrent la conception du voyage, la logistique du safari et tout ce que l’on ressent une fois sur place.",
      cta: "Toute l’équipe",
    },
    impact: {
      eyebrow: "Maisha Quest Cares",
      watch: "Regarder",
      cta: "Comment fonctionne notre engagement",
      intro: {
        title: "Un voyage qui rend quelque chose",
        lede:
          "Votre voyage devrait laisser la Tanzanie meilleure que vous ne l’avez trouvée.",
        body:
          "Maisha Quest Cares, c’est là que cela cesse d’être un slogan. Cela repose sur les voyages que vous faites : des guides et des prestataires tanzaniens, et des visites communautaires organisées directement avec celles et ceux qui les accueillent.",
      },
    },
    testimonials: {
      eyebrow: "Voyageurs",
      title: "Des histoires ramenées à la maison",
      lede:
        "Ce que les voyageurs ont dit à leur retour, publié avec sa source pour que vous puissiez le vérifier vous-même.",
      emptyTitle:
        "Nous préférons ne rien vous montrer plutôt que quelque chose que nous aurions écrit nous-mêmes.",
      emptyBody:
        "Les avis seront publiés ici à mesure que les voyageurs nous les envoient, chacun avec un lien vers sa publication d’origine. En attendant, demandez-nous et nous vous mettrons en relation avec quelqu’un qui a voyagé avec nous.",
      emptyBodyWithSources:
        "Les avis seront publiés ici à mesure que les voyageurs nous les envoient, chacun avec un lien vers sa publication d’origine. En attendant, retrouvez-nous sur les plateformes ci-dessous, ou demandez-nous et nous vous mettrons en relation avec quelqu’un qui a voyagé avec nous.",
      speakDirectly: "Parlez-nous directement",
      askReferences: "Demander des références",
      verified: "Avis vérifié",
      rated: (n: number) => `Noté ${n} sur 5`,
    },
    planner: {
      eyebrow: "Préparez votre voyage",
      title: "Composons votre voyage",
      lede:
        "Sept étapes courtes. Sans engagement et sans devis automatique — une personne à Arusha les lit une à une et répond avec un itinéraire.",
      ratherTalk: "Vous préférez en parler ?",
    },
    closing: {
      title: "Votre histoire en Tanzanie commence ici.",
      concept: "Guidés par la Tanzanie. Pensés pour vous.",
    },
  },

  common: {
    priceOnRequest: "Prix sur demande",
    sampleItinerary: "Itinéraire indicatif",
    from: "À partir de",
    days: "jours",
    day: "Jour",
    nights: "nuits",
    readMore: "Lire la suite",
    viewJourney: "Voir le voyage",
    customize: "Personnaliser",
    customizeThis: "Personnaliser ce voyage",
    backToCatalogue: "Retour à tous les safaris",
    exploreAll: "Voir tous les safaris",
    suits: "Idéal pour",
    bestTime: "Meilleure période",
    duration: "Durée",
    route: "Itinéraire",
    accommodation: "Hébergement",
    wildlife: "Faune",
    experiencesHere: "Expériences sur place",
    minutesRead: "min de lecture",
    dayCount: (n: number) => (n === 1 ? "1 jour" : `${n} jours`),
    dayLabel: (n: number) => `Jour ${n}`,
    durationRange: ([min, max]: [number, number]) =>
      min === max ? `${min} jours` : `${min}–${max} jours`,
    safariMeta: (style: string) =>
      `Safari privé · hébergement en ${style.toLowerCase()}`,
    fromPerPerson: (price: string) => `À partir de ${price} par personne`,
    draftNotice:
      "Itinéraire indicatif — le tracé et les dates définitifs sont confirmés avec vous.",
    readingTime: (n: number) => `${n} min de lecture`,
  },
};
