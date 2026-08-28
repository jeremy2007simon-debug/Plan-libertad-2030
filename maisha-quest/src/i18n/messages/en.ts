/**
 * Diccionario de interfaz — inglés.
 *
 * Este archivo es el ORIGEN: su tipo (`Dictionary`) define la forma que deben
 * cumplir los otros cinco idiomas, así que si aquí se añade una clave y no se
 * traduce, TypeScript falla en compilación. No hay fallback silencioso al
 * inglés: un texto sin traducir es un error de build, no algo que se descubre
 * en producción.
 *
 * No se traducen: "Maisha Quest", nombres propios, correos, teléfonos y los
 * nombres de los parques cuando la forma inglesa es la oficial.
 */

import type { PluralForms } from "@/i18n/format";

export const en = {
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main",
    footerNav: "Footer",
    languageMenu: "Change language",
    languageMenuLabel: "Language",
    currentLanguage: "Current language",
    previous: "Previous",
    next: "Next",
    required: "(required)",
    externalLink: "opens in a new tab",
    whatsapp: "Message Maisha Quest on WhatsApp",
    callUs: "Call Maisha Quest",
    emailUs: "Email Maisha Quest",
  },

  nav: {
    homeLabel: "Maisha Quest — home",
    mainNavLabel: "Main",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    siteMenu: "Site menu",
    whatsappLabel: "Message Maisha Quest on WhatsApp",
    language: {
      buttonLabel: "Change language",
      menuLabel: "Language",
      current: "Current",
    },
    items: {
      safaris: "Safaris",
      allSafaris: "All safaris",
      explorer: "Explorer Collection",
      escape: "Escape Collection",
      enrich: "Enrich Collection",
      destinations: "Destinations",
      experiences: "Experiences",
      about: "About",
      ourStory: "Our story",
      team: "The team",
      impact: "Impact",
      journal: "Journal",
      contact: "Contact",
      faq: "FAQ",
      aboutUs: "About us",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      credits: "Photo credits",
      sitemap: "Sitemap",
    },
    descriptions: {
      safaris: "Private journeys, grouped by the way you like to travel.",
      explorer: "Wild landscapes, adventure and discovery.",
      escape: "Space, comfort and effortless connection.",
      enrich: "Culture, cuisine and communities.",
    },
    planCta: "Plan Your Journey",
    planShort: "Plan My Safari",
    speakToExpert: "Speak to a Local Expert",
    chat: "Chat",
    /** Texto que se precarga en WhatsApp. Se codifica al construir la URL. */
    whatsappMessage:
      "Hello Maisha Quest, I would like help planning a safari in Tanzania.",
  },

  footer: {
    navLabel: "Footer",
    blurb:
      "Private journeys through Tanzania, designed and guided from Arusha. Guided by Tanzania. Designed around you.",
    groups: {
      travel: "Travel",
      company: "Maisha Quest",
      legal: "Legal",
    },
    whatsapp: "Message us on WhatsApp",
    rights: "Maisha means life — Journey of Life.",
  },


  /** Etiquetas de enumeraciones que se pintan. La clave vive en la estructura. */
  /** Nombres de las colecciones: son marca y no se traducen en ningún idioma. */
  collectionNames: {
    explorer: "Explorer",
    escape: "Escape",
    enrich: "Enrich",
  },

  safaris: {
    title: "Every journey we build",
    lede:
      "Nothing here is a fixed departure. Each one is a shape of journey we know works, rebuilt around your dates, your pace and the people you are travelling with.",
    collection: "Collection",
    aboutCollection: "About this collection",
    journeyCount: (n: number) => (n === 1 ? "1 journey" : `${n} journeys`),
    noneRightTitle: "None of these quite right?",
    noneRightBody:
      "Good — that is usually the starting point. Tell us what you are imagining and we will build it from scratch.",
  },

  collections: {
    pageTitle: (name: string) => `${name} Collection`,
    typicalLength: "Typical length",
    journeysInCollection: (n: number) =>
      n === 1 ? "1 journey in this collection" : `${n} journeys in this collection`,
    notQuiteYou: "Not quite you?",
  },

  destinations: {
    title: "Nine places, one country",
    lede:
      "Tanzania is not one landscape. These are the places we travel through, what lives in each and when they are at their best.",
    whenToCome: "When to come",
    include: (place: string) => `Include ${place}`,
    journeysThrough: (place: string) => `Journeys through ${place}`,
  },

  experiences: {
    singular: "Experience",
    lede:
      "A safari is not only game drives. These are the ways a day in Tanzania can be spent — mix as many as you like into one journey.",
    whereYouDoThis: "Where you do this",
    addToJourney: "Add this to my journey",
    journeysIncluding: "Journeys that include it",
  },

  planner: {
    stepOf: "Step {n} of {total}",
    progress: "Planner progress",
    draftRestored:
      "We picked up where you left off. Your previous answers are saved on this device only.",
    back: "Back",
    continue: "Continue",
    send: "Send my enquiry",
    sending: "Sending…",
    savedLocally: "Saved on this device as you go",

    steps: {
      trip: {
        label: "Journey",
        title: "What kind of journey are you imagining?",
        help: "Pick the closest one. Nothing here is binding — it just tells us where to start.",
      },
      destinations: {
        label: "Places",
        title: "Where would you like to go?",
        help: "Choose as many as you like, or leave it to us.",
      },
      dates: {
        label: "Dates",
        title: "When, and for how long?",
        help: "Approximate is fine. If your dates are flexible, say so — it usually works in your favour.",
      },
      travellers: {
        label: "Travellers",
        title: "Who is travelling, and how would you like to stay?",
        help: "",
      },
      budget: {
        label: "Budget",
        title: "What budget are you working to?",
        help: "Per person, excluding international flights. An honest range lets us propose something real rather than something optimistic.",
      },
      contact: {
        label: "Contact",
        title: "Where should we send your proposal?",
        help: "",
      },
      review: { label: "Review", title: "Does this look right?", help: "" },
    },

    legends: {
      tripType: "Kind of journey",
      duration: "How long?",
      travellers: "Travellers",
      accommodation: "How would you like to stay?",
      budget: "Budget per person",
    },

    tripTypes: {
      wildlife: { label: "Classic safari", note: "Game drives and the great parks" },
      honeymoon: { label: "Honeymoon", note: "Privacy, comfort and the coast" },
      family: { label: "Family journey", note: "Paced for children" },
      adventure: { label: "Adventure", note: "Walking, camping, remote routes" },
      kilimanjaro: { label: "Kilimanjaro", note: "Trekking the mountain" },
      culture: { label: "Culture & community", note: "People, food and place" },
      "safari-and-zanzibar": {
        label: "Safari & Zanzibar",
        note: "Plains, then ocean",
      },
      "not-sure": { label: "Not sure yet", note: "Help us work it out" },
    },

    durations: {
      "under-7": { label: "Under a week" },
      "7-9": { label: "7 – 9 days" },
      "10-14": { label: "10 – 14 days" },
      "15-plus": { label: "More than two weeks" },
      unsure: { label: "Not decided" },
    },

    accommodationStyles: {
      camp: { label: "Tented camps", note: "Canvas, close to the wildlife" },
      lodge: { label: "Lodges", note: "Comfort and a proper bed" },
      boutique: { label: "Boutique & design", note: "Small, characterful properties" },
      mixed: { label: "A mix", note: "Different styles along the route" },
      guidance: { label: "Advise me", note: "We will suggest what fits" },
    },

    /** Tramos en dólares: orientan la conversación, no son tarifas nuestras. */
    budgets: {
      "under-3000": { label: "Under $3,000" },
      "3000-5000": { label: "$3,000 – $5,000" },
      "5000-8000": { label: "$5,000 – $8,000" },
      "8000-plus": { label: "More than $8,000" },
      open: { label: "Open — advise me" },
    },

    fields: {
      month: "Roughly when?",
      adults: "Adults",
      children: "Children",
      childrenHint: "Under 18",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone or WhatsApp",
      country: "Country",
      replyIn: "Reply to me in",
      consentLabel:
        "I agree that Maisha Quest may use these details to reply to my enquiry.",
      /** Nombre accesible de los botones del contador de viajeros. */
      oneFewer: "One fewer {label}",
      oneMore: "One more {label}",
      /** Nota que se precarga al llegar desde una tarjeta con ?safari=. */
      prefilledNote:
        "Starting point: {name}. I would like to adapt this journey.",

      notes: "Anything else we should know?",
      notesPlaceholder:
        "Celebrations, dietary needs, mobility, photography, animals you are hoping to see…",
    },

    errors: {
      tripType: "Choose the kind of journey you have in mind, or ‘Not sure yet’.",
      travelMonth: "Give us a rough month, or tick ‘my dates are flexible’.",
      durationDays: "Roughly how long do you want to travel for?",
      adultsMin: "There needs to be at least one adult travelling.",
      adultsMax:
        "For groups over twenty, email us directly — we will plan it differently.",
      accommodationStyle: "Pick a style of stay, or ask us to advise.",
      budgetPerPerson: "Choose a range, or ‘Open — advise me’.",
      firstName: "We need a name to reply to.",
      emailMissing: "We need an email address to send your proposal to.",
      emailInvalid: "That email address does not look right — please check it.",
      consent: "Please confirm we can use these details to reply to your enquiry.",
    },

    review: {
      journey: "Journey",
      destinations: "Destinations",
      when: "When",
      length: "Length",
      travellers: "Travellers",
      stays: "Stays",
      budget: "Budget",
      contact: "Contact",
      notes: "Notes",
      edit: "Edit",
      flexible: "Flexible",
      notGiven: "Not given",
      openToSuggestions: "Open to suggestions",
      /* Formas de plural como datos, no como función: el planificador es un
         componente de cliente y las resuelve con `Intl.PluralRules`. El tipo
         explícito permite que el ruso declare `few`/`many` y el chino solo
         `other`. */
      adultCount: { one: "{n} adult", other: "{n} adults" } as PluralForms,
      childCount: { one: ", {n} child", other: ", {n} children" } as PluralForms,
    },

    summary: {
      heading: "Journey enquiry — Maisha Quest",
      name: "Name",
      email: "Email",
      phone: "Phone",
      country: "Country",
      replyIn: "Reply in",
      journeyType: "Journey type",
      budgetPerPerson: "Budget per person",
    },

    status: {
      sentTitle: "Your enquiry is with us.",
      sentBody:
        "Thank you, {name}. One of the team in Arusha will read this properly and come back to you — not with a template, with a route.",
      reference: "Your reference is",
      /* El formulario NO finge un envío cuando no hay webhook: lo dice y
         ofrece la misma solicitud por email o WhatsApp, ya redactada. */
      unconfiguredTitle: "Almost — this form is not connected yet.",
      unconfiguredBody:
        "We are not going to tell you your enquiry was sent when it was not. The submission endpoint has not been connected to email or a CRM yet, so nothing reached us. Your answers are below, ready to send — one tap and they are on their way.",
      sendByEmail: "Send by email",
      sendOnWhatsApp: "Send on WhatsApp",
      yourAnswers: "Your answers",
      sendFailed: "We could not send that just now.",
      offline: "We could not reach our server. Check your connection and try again.",
      orEmailUs: "You can also email us at",
      inTheMeantime: "In the meantime",
    },
  },

  contact: {
    title: "Speak to a local expert",
    lede:
      "We are in Arusha, not in a call centre. Whichever way you get in touch, one of the founders will see it.",
    phone: "Phone",
    email: "Email",
    hours: "Hours",
    whereWeAre: "Where we are",
    messageUs: "Message us",
    languagesBody:
      "We plan and host in English and Swahili, and also speak Russian and Mandarin Chinese.",
    planningTitle: "Planning a trip?",
    planningBody:
      "The planner takes a few minutes and gives us everything we need to come back with a real route rather than a brochure.",
  },

  plan: {
    lede:
      "No obligation and no automated quote. A person in Arusha reads every enquiry and replies with a route.",
    customizeTitle: (name: string) => `Customize: ${name}`,
    customizeLede:
      "We have carried this journey across as a starting point. Change anything — the route, the pace, the length, the style of stay.",
    steps: [
      {
        title: "You tell us the shape of it",
        body: "Seven short steps: when, how long, who is travelling and what you want out of it.",
      },
      {
        title: "We come back with a route",
        body: "A proposed itinerary with an honest view of what it costs and what it involves — written by a person, not generated.",
      },
      {
        title: "We change it until it fits",
        body: "As many rounds as you need. Nothing is confirmed or paid until you are happy with it.",
      },
    ],
  },

  /**
   * Páginas legales.
   *
   * ⚠️ INTERNO — NO SE MUESTRA AL VISITANTE: estos textos son un ESQUELETO en
   * los seis idiomas. Marcan la estructura y los apartados que la web necesita,
   * pero NO son asesoramiento jurídico y NO deben publicarse como definitivos.
   * Las condiciones reales —cancelaciones, pagos, responsabilidad, tratamiento
   * de datos— tiene que redactarlas o revisarlas un profesional con la
   * normativa tanzana y el RGPD europeo, porque Maisha Quest vende a viajeros
   * de la UE. Y la traducción de un texto legal necesita, además de revisión
   * nativa, revisión jurídica en cada jurisdicción.
   *
   * Lo que sí ve el visitante es el aviso `notice`, que dice con claridad que
   * la página está en preparación y cuáles son las condiciones que aplican
   * mientras tanto.
   */
  legal: {
    eyebrow: "Legal",
    notice: {
      before: "This page is being finalised with Maisha Quest’s legal adviser. Until it is, the terms that apply to your booking are the ones set out in writing in your booking confirmation. Ask us at",
      after: "for the current version.",
    },
    pendingSection: "Full wording for this section is pending legal review.",
    terms: {
      title: "Terms & Conditions",
      intro: "The terms that apply when you book a journey with Maisha Quest.",
      sections: [
      {
        heading: "Who you are booking with",
        body: [
          "Maisha Quest is a tour operator based in Arusha, Tanzania, arranging private safaris, treks and coastal stays across the country.",
          "Company registration and tour operator licence details will be published here.",
        ],
        pending: true,
      },
      {
        heading: "Quotations and confirmation",
        body: [
          "A quotation is a proposal, not a booking. Prices, camps and availability are confirmed in writing before anything is held.",
        ],
        pending: true,
      },
      {
        heading: "Payment",
        body: [
          "Deposit, balance and payment method terms are pending.",
        ],
        pending: true,
      },
      {
        heading: "Changes and cancellation",
        body: [
          "Cancellation terms depend on the camps and internal flights held for your journey, and will be set out in full in your booking confirmation.",
        ],
        pending: true,
      },
      {
        heading: "Insurance",
        body: [
          "Comprehensive travel and medical insurance is required for all travellers. Cover should include medical evacuation, and for Kilimanjaro climbs it must cover trekking to 6,000 metres.",
        ],
      },
      {
        heading: "Passports, visas and health",
        body: [
          "Travellers are responsible for holding a valid passport and the correct visa, and for meeting entry health requirements. We will point you to the official sources, but we cannot advise on your specific circumstances.",
        ],
      },
      {
        heading: "Safety on safari",
        body: [
          "Wildlife is wild. Guests must follow their guide's instructions at all times, including in camp, and no sighting is guaranteed.",
        ],
      },
      {
        heading: "Liability and applicable law",
        body: [
          "Governing law and liability wording are pending legal review.",
        ],
        pending: true,
      },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro: "What we collect when you contact us, why, and what we do with it.",
      sections: [
      {
        heading: "What we collect",
        body: [
          "When you use the journey planner or write to us we collect what you give us: your name, email address, optional phone number and country, and the details of the trip you are considering.",
          "We do not ask for passport or payment details through this website.",
        ],
      },
      {
        heading: "Why we hold it",
        body: [
          "To answer your enquiry and, if you book, to arrange your journey. That is the only reason. We do not sell or rent your details to anyone.",
        ],
      },
      {
        heading: "Where it goes",
        body: [
          "Enquiries reach our team in Arusha. To arrange a journey we share only what is necessary with the camps, lodges, airlines and guides on your itinerary.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Retention periods are pending legal review.",
        ],
        pending: true,
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to the email address at the foot of this page and we will action it.",
        ],
      },
      {
        heading: "Draft saved in your browser",
        body: [
          "The journey planner saves your answers in your own browser so you do not lose them if you close the tab. That draft stays on your device, is not sent to us until you submit the form, and is cleared when you do.",
        ],
      },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      intro: "What this website stores in your browser.",
      sections: [
      {
        heading: "This site sets no tracking cookies",
        body: [
          "As built, this website does not set advertising or analytics cookies, and does not load third-party trackers. Fonts are served from this site rather than from an external provider, and the map is drawn by the site itself rather than fetched from a mapping service.",
        ],
      },
      {
        heading: "What is stored locally",
        body: [
          "The journey planner saves your unfinished answers in your browser's local storage so you do not lose them. It never leaves your device until you submit the form, and it is removed once you do. Clearing your browser data removes it immediately.",
        ],
      },
      {
        heading: "If analytics are added later",
        body: [
          "If Maisha Quest adds analytics or advertising tools, this page will be updated and a consent banner will be added before any such cookie is set.",
        ],
        pending: true,
      },
      ],
    },
  },

  credits: {
    eyebrow: "Credits",
    title: "Photography credits",
    lede:
      "The images on this site are provisional documentary photographs of Tanzania, used under Creative Commons licences while Maisha Quest’s own photography is prepared.",
    sourceAndLicence: "Source and licence",
    body:
      "Every image below was selected because its source record confirms both the country and the subject — so no species or landscape that does not belong to Tanzania appears anywhere on this site. None of these photographs were taken by Maisha Quest, and none of them show Maisha Quest guests, guides, vehicles or camps.",
    allOwn: "All photography on this site is now Maisha Quest’s own.",
  },

  meta: {
    keywords: [
      "Tanzania safari",
      "private safari Tanzania",
      "Serengeti safari",
      "Ngorongoro Crater tour",
      "Kilimanjaro trek",
      "Zanzibar and safari",
      "tailor-made safari Arusha",
    ],
    home: {
      title: "Maisha Quest · Private safaris in Tanzania",
      description:
        "Private journeys through Tanzania, guided by local experts and designed around your story. Serengeti, Ngorongoro, Tarangire, Kilimanjaro and Zanzibar, planned from Arusha.",
      ogTitle: "Private journeys through Tanzania · Maisha Quest",
      ogDescription:
        "Guided by local experts. Designed around your story. Tailor-made safaris across Tanzania, from a team based in Arusha.",
    },
    safaris: {
      title: "Safaris",
      description:
        "Every private journey we build in Tanzania, grouped by the way you like to travel. Nothing here is a fixed departure.",
    },
    destinations: {
      title: "Destinations",
      description:
        "Nine places across Tanzania: the northern circuit, the southern parks, Kilimanjaro and the Indian Ocean coast.",
    },
    experiences: {
      title: "Experiences",
      description:
        "Game drives, walking safaris, balloon flights, cultural days, Kilimanjaro and the Zanzibar coast — the ways a day in Tanzania can be spent.",
    },
    about: {
      title: "About us",
      description:
        "Maisha Quest is a Tanzanian safari company based in Arusha. Maisha means life — we build private journeys around who you are and how you want to travel.",
    },
    team: {
      title: "The team",
      description:
        "Talisa Tufts, Frank Lyatuu and Tina Ngabo — the founders behind Maisha Quest, based in Arusha, Tanzania.",
    },
    impact: {
      title: "Impact",
      description:
        "Maisha Quest Cares — Tanzanian guides and suppliers, community visits arranged directly, and the education and conservation work Maisha Quest is building around its journeys.",
    },
    journal: {
      title: "Journal",
      description:
        "Planning guides from our team in Arusha: where the migration is month by month, choosing a Kilimanjaro route, and travelling Tanzania in the green season.",
    },
    contact: {
      title: "Contact",
      description:
        "Talk to Maisha Quest in Arusha, Tanzania. Phone, email and WhatsApp, answered by the team who will host your journey.",
    },
    plan: {
      title: "Plan your journey",
      description:
        "Seven short steps and a person in Arusha reads every one of them. No automated quote, no obligation.",
    },
    faq: {
      title: "Frequently asked questions",
      description:
        "When to visit Tanzania, how far ahead to book, what a private safari means, visas, vaccinations and what to pack — answered by our team in Arusha.",
    },
  },

  notFound: {
    title: "Off the map",
    body:
      "This page does not exist — or it moved when we rebuilt the site. Try one of these instead.",
    contact: "Contact us",
  },

  about: {
    heroTitle: "Guided by Tanzania. Designed around you.",
    heroLede:
      "Maisha Quest was founded in Arusha, at the foot of Mount Meru. We are a small local team building private journeys for travellers who want more than a fixed departure.",
    lede:
      "Maisha Quest translates roughly as the journey of life — and that is the whole idea. A safari is not a product you buy off a shelf; it is a stretch of your life spent somewhere extraordinary, and it should be built accordingly.",
    compass:
      "Our founders describe the idea as living life by a compass — choosing a direction rather than following a fixed route. It is how we plan: we start from where you want to end up, not from a catalogue of packages.",
    ground:
      "Everything is arranged from Arusha, on the ground. Our guides, vehicles and suppliers are Tanzanian, and the people who answer your first email are the people who meet you at the airport.",
    meetTeam: "Meet the team",
    howWeWork: "How we work",
    people: "The people",
    readStories: "Read their stories",
    talkTitle: "Talk to us",
    talkBody: (timezone: string, hours: string) =>
      `We are in Arusha, ${timezone}, ${hours}. The fastest way to start is to tell us roughly when you want to travel and what matters to you.`,
    contactDetails: "Contact details",
  },

  journal: {
    title: "Notes from Arusha",
    lede:
      "Practical writing about travelling Tanzania — the questions we are asked most, answered properly rather than in a paragraph.",
    pendingTitle:
      "This article is being written by our team in Arusha and will be published here shortly.",
    pendingBody:
      "If you need the answer before then, ask us — it is a question we answer for travellers every week, and we would rather tell you properly than have you wait for a blog post.",
    more: "More from the journal",
  },

  faq: {
    title: "Questions we are asked most",
    lede:
      "Straight answers. Where something depends on your passport, your health or your dates, we say so and point you at the official source rather than guessing.",
    stillTitle: "Still not answered?",
    stillBefore: "Write to us at",
    stillAfter: (phone: string, timezone: string) =>
      `or call ${phone}. We are in Arusha, ${timezone}.`,
  },

  impact: {
    noNumbers:
      "We are not going to put numbers on this page that we cannot stand behind. As each programme produces results we can document — schools supported, people employed, projects funded — they will be published here with the detail to back them up.",
    askCta: "Ask about our projects",
  },

  regions: {
    northern: "Northern Circuit",
    southern: "Southern Circuit",
    coast: "Coast & Islands",
    gateway: "Gateway",
  },
  accommodation: {
    "Mobile camp": "Mobile camp",
    "Tented camp": "Tented camp",
    Lodge: "Lodge",
    "Boutique lodge": "Boutique lodge",
    "Beach resort": "Beach resort",
    "City hotel": "City hotel",
  },
  meals: {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
  },
  impactAreas: {
    education: "Education",
    conservation: "Conservation",
    community: "Community",
    employment: "Local employment",
  },
  faqTopics: {
    planning: "Planning",
    travel: "Travel",
    safari: "Safari",
    health: "Health & safety",
    payment: "Payment",
  },
  categories: {
    wildlife: "Wildlife",
    adventure: "Adventure",
    luxury: "Luxury",
    honeymoon: "Honeymoon",
    family: "Family",
    culture: "Culture",
    kilimanjaro: "Kilimanjaro",
    "safari-and-zanzibar": "Safari & Zanzibar",
  },
  /** Idiomas que habla el equipo — dato comercial real, no adorno. */
  languageNames: {
    English: "English",
    Swahili: "Swahili",
    Russian: "Russian",
    "Mandarin Chinese": "Mandarin Chinese",
    Spanish: "Spanish",
    German: "German",
    French: "French",
  },

  /**
   * Datos de la empresa que se muestran al visitante y por tanto se traducen.
   *
   * El horario vivía en `src/lib/site.ts` como una sola cadena en inglés y
   * salía tal cual en el pie, en contacto, en el planificador y en el menú
   * móvil de los seis idiomas. Los datos que no dependen del idioma
   * —teléfono, correo, huso horario— siguen en `site.ts`.
   */
  company: {
    hours: "Monday to Saturday, 8:00–18:00",
    utcNote: "Tanzania is three hours ahead of UTC, all year.",
    arushaCaption: "Arusha, at the foot of Mount Meru — where every journey starts.",
  },

  video: {
    play: "Play",
    pause: "Pause",
    unmute: "Turn sound on",
    mute: "Turn sound off",
    label: "Video",
  },

  team: {
    languages: "Languages",
    specialty: "Specialty",
    favouritePlace: "Favourite place in Tanzania",
    portraitOf: (name: string) => `Portrait of ${name}`,
    pageTitle: "The people behind your journey",
    crewTitle: "Guides, drivers and crew",
    crewBody:
      "Every journey is run by Tanzanian guides and drivers we work with directly. On Kilimanjaro, how a mountain crew is paid and how much it carries is part of choosing one. Profiles of the wider team will be published here.",
    startPlanning: "Start planning",
  },

  safari: {
    sampleTitle: "Sample itinerary.",
    sampleBody:
      "This route shows the shape of the journey. Timings, camps and the final day-by-day are confirmed with you before anything is booked.",
    mapScale: "Distances are shown to scale; driving routes follow park roads.",
    /** Separador entre paradas dentro del nombre accesible del mapa. */
    routeMapJoin: ", then ",
    routeMapLabel: (stops: string) => `Route map: ${stops}`,
    itineraryPending:
      "The day-by-day itinerary for this journey is being finalised with our team in Arusha. Ask us for it and we will send the current version.",
    stay: "Stay",
    stayPending: "Confirmed with your proposal",
    meals: "Meals",
    time: "Time",
    collectionOf: (name: string) => `${name} collection`,
    style: "Style",
    theJourney: "The journey",
    dayByDay: "Day by day",
    whereYouStay: "Where you stay",
    whereYouStayBody: (style: string) =>
      `This journey is planned around ${style.toLowerCase()} accommodation. We propose specific camps and lodges with your itinerary, chosen for where they sit on the route and what is available on your dates — rather than naming properties here we may not be able to hold.`,
    gallery: "Gallery",
    theRoute: "The route",
    included: "What is included",
    notIncluded: "Not included",
    practical: "Practical",
    commonQuestions: "Common questions",
    whatTravellersSaid: "What travellers said",
    noReviews:
      "No reviews for this journey have been published yet, and we are not going to write one ourselves. Ask and we will put you in touch with travellers who have done it.",
    similarJourneys: "Similar journeys",
    askQuestion: "Ask a question",
  },

  home: {
    hero: {
      /* En líneas: el hero las revela una tras otra. El corte es
         editorial y propio de cada idioma, no un salto automático. */
      headline: ["Private journeys", "through Tanzania"],
      subline: "Guided by local experts. Designed around your story.",
      designCta: "Design Your Safari",
      exploreCta: "Explore Journeys",
      pillars: ["Local experts", "Private safaris", "Responsible travel"],
      scroll: "Scroll",
    },
    maisha: {
      eyebrow: "Our name",
      /** Sigue a la palabra swahili "Maisha", que no se traduce. */
      meansLife: "means life.",
      lede:
        "Every journey is a chance to discover, connect and live more fully. We create private Tanzanian safaris shaped around who you are and how you want to travel.",
      body:
        "Maisha Quest was founded in Arusha, at the foot of Mount Meru and the start of the northern circuit. We are a small team: the people who answer your first email are the people who meet you at the airport.",
      cta: "Meet Maisha Quest",
    },
    experiences: {
      eyebrow: "Start here",
      title: "How do you want to experience Tanzania?",
      lede:
        "Every journey we build starts with this question rather than with a package. Pick the one that sounds most like you — you can combine them later.",
      carouselLabel: "Ways to experience Tanzania",
    },
    collections: {
      eyebrow: "The Maisha Collections",
      title: "Three ways to travel Tanzania",
      lede:
        "Not three price tiers — three temperaments. Most travellers know which one is theirs by the end of the first line.",
      explore: (name: string) => `Explore ${name}`,
    },
    featured: {
      eyebrow: "Featured journeys",
      title: "Journeys worth remembering",
      lede:
        "Nothing here is a fixed departure. Each one is a shape of journey we know works.",
    },
    map: {
      eyebrow: "The map",
      title: "Find your place in Tanzania",
      lede:
        "Nine places, four circuits and one coastline. Select one to see when to go, what lives there and which journeys pass through.",
      bestTime: "Best time",
      wildlife: "Wildlife",
      journeysHere: "Journeys that go here",
      chooseDestination: "Choose a destination",
      dayCount: (n: number) => `${n} days`,
      moreOn: (place: string) => `More on ${place}`,
    },
    film: {
      eyebrow: "The film",
      title: "One country. Endless ways to feel alive.",
      watch: "Watch the Journey",
      cta: "Explore experiences",
      threads: [
        { label: "Wildlife", note: "The plains, and what moves across them." },
        { label: "Culture", note: "Time with the people who live here." },
        { label: "Adventure", note: "On foot, on water, on the mountain." },
        { label: "Ocean", note: "Where the journey slows down." },
        { label: "Connection", note: "The reason any of it matters." },
      ],
    },
    why: {
      eyebrow: "Why Maisha Quest",
      title: "Your journey, in trusted hands",
      lede:
        "We are a Tanzanian company. That is not a marketing line — it changes who answers the phone, who drives the vehicle and where the money goes.",
      pillars: [
        {
          title: "Tanzania-based experts",
          body:
            "Our routes come from driving them, not from a brochure.",
        },
        {
          title: "Tailor-made itineraries",
          body:
            "Every journey is built from scratch around your pace, your interests and your dates.",
        },
        {
          title: "Multilingual service",
          body: "Planning and correspondence in English and Swahili. Talisa also speaks Russian and Mandarin Chinese.",
        },
        {
          title: "Carefully selected stays",
          body:
            "Camps and lodges chosen for where they sit, how they are run and what you see from them.",
        },
        {
          title: "Responsible local travel",
          body:
            "Local guides, local suppliers, and communities involved rather than photographed.",
        },
        {
          title: "Support from arrival to departure",
          body:
            "One team from your first message to your flight home — the people who plan your journey are the people you write to.",
        },
      ],
    },
    team: {
      eyebrow: "The team",
      title: "Meet the people behind your journey",
      lede:
        "Three founders in Arusha. Between them they cover journey design, safari operations and everything you feel once you are on the ground.",
      cta: "The full team",
    },
    impact: {
      eyebrow: "Maisha Quest Cares",
      watch: "Watch",
      cta: "How our impact works",
      intro: {
        title: "Travel that gives back",
        lede: "Your journey should leave Tanzania better than you found it.",
        body:
          "Maisha Quest Cares is where that stops being a slogan. It runs on the same trips you take: Tanzanian guides and suppliers, and community visits arranged directly with the people hosting them.",
      },
    },
    testimonials: {
      eyebrow: "Travellers",
      title: "Stories brought home",
      lede:
        "What travellers said after they got back, published with the source so you can check it yourself.",
      emptyTitle:
        "We would rather show you nothing than show you something we wrote ourselves.",
      emptyBody:
        "Reviews will be published here as travellers send them, each one with a link to where it was originally posted. Until then, ask us and we will put you in touch with someone who has travelled with us.",
      emptyBodyWithSources:
        "Reviews will be published here as travellers send them, each one with a link to where it was originally posted. Until then, look us up yourself — or ask, and we will put you in touch with someone who has travelled with us.",
      speakDirectly: "Speak to us directly",
      askReferences: "Ask for references",
      verified: "Verified review",
      rated: (n: number) => `Rated ${n} out of 5`,
    },
    planner: {
      eyebrow: "Plan your journey",
      title: "Let\u2019s design your journey",
      lede:
        "Seven short steps. No obligation, no automated quote — a person in Arusha reads every one of these and replies with a route.",
      ratherTalk: "Rather just talk?",
    },
    closing: {
      title: "Your story in Tanzania starts here.",
      concept: "Guided by Tanzania. Designed around you.",
    },
  },

  common: {
    priceOnRequest: "Price on request",
    sampleItinerary: "Sample itinerary",
    from: "From",
    days: "days",
    day: "Day",
    nights: "nights",
    readMore: "Read more",
    viewJourney: "View journey",
    customize: "Customize",
    customizeThis: "Customize This Journey",
    backToCatalogue: "Back to all safaris",
    exploreAll: "View all safaris",
    suits: "Suits",
    bestTime: "Best time",
    duration: "Duration",
    route: "Route",
    accommodation: "Accommodation",
    wildlife: "Wildlife",
    experiencesHere: "Experiences here",
    minutesRead: "min read",
    /**
     * Funciones en lugar de plantillas con marcadores: el orden de las
     * palabras y el plural cambian de un idioma a otro (el ruso tiene tres
     * formas de plural, el chino ninguna), y una función deja resolverlo en
     * cada idioma sin inventar una mini-gramática en el código.
     */
    dayCount: (n: number) => `${n} days`,
    dayLabel: (n: number) => `Day ${n}`,
    durationRange: ([min, max]: [number, number]) =>
      min === max ? `${min} days` : `${min}\u2013${max} days`,
    safariMeta: (style: string) => `Private safari \u00b7 ${style} accommodation`,
    fromPerPerson: (price: string) => `From ${price} per person`,
    draftNotice: "Sample itinerary — final routing and dates confirmed with you.",
    readingTime: (n: number) => `${n} min read`,
  },
};

/**
 * La forma del diccionario. Los demás idiomas la implementan; si a uno le
 * falta una clave o le sobra, el build no pasa.
 */
export type Dictionary = typeof en;
