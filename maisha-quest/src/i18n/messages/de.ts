import type { Dictionary } from "./en";

/**
 * Diccionario de interfaz — alemán.
 *
 * Traducción completa, pendiente de revisión por hablante nativo antes del
 * lanzamiento. Terminología según `src/i18n/glossary.ts`.
 *
 * El alemán ocupa más espacio que el inglés (palabras compuestas largas), así
 * que se han preferido formas cortas en botones y etiquetas: "Reise planen" en
 * lugar de "Planen Sie Ihre Reise", que rompía el botón de la cabecera.
 * Tratamiento de usted ("Sie"), que es lo que espera este mercado en un
 * producto de este precio.
 */
export const de: Dictionary = {
  a11y: {
    skipToContent: "Zum Inhalt springen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    mainNav: "Hauptnavigation",
    footerNav: "Fußzeile",
    languageMenu: "Sprache wechseln",
    languageMenuLabel: "Sprache",
    currentLanguage: "Aktuelle Sprache",
    previous: "Zurück",
    next: "Weiter",
    required: "(Pflichtfeld)",
    externalLink: "wird in einem neuen Tab geöffnet",
    whatsapp: "Maisha Quest über WhatsApp schreiben",
    callUs: "Maisha Quest anrufen",
    emailUs: "Maisha Quest eine E-Mail schreiben",
  },

  nav: {
    homeLabel: "Maisha Quest — Startseite",
    mainNavLabel: "Hauptnavigation",
    menu: "Menü",
    close: "Schließen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    siteMenu: "Seitenmenü",
    whatsappLabel: "Maisha Quest über WhatsApp schreiben",
    language: {
      buttonLabel: "Sprache wechseln",
      menuLabel: "Sprache",
      current: "Aktuell",
    },
    items: {
      safaris: "Safaris",
      allSafaris: "Alle Safaris",
      explorer: "Kollektion Explorer",
      escape: "Kollektion Escape",
      enrich: "Kollektion Enrich",
      destinations: "Reiseziele",
      experiences: "Erlebnisse",
      about: "Über uns",
      ourStory: "Unsere Geschichte",
      team: "Das Team",
      impact: "Engagement",
      journal: "Journal",
      contact: "Kontakt",
      faq: "Häufige Fragen",
      aboutUs: "Über uns",
      terms: "Allgemeine Geschäftsbedingungen",
      privacy: "Datenschutzerklärung",
      cookies: "Cookie-Richtlinie",
      credits: "Bildnachweise",
      sitemap: "Sitemap",
    },
    descriptions: {
      safaris: "Private Reisen, sortiert danach, wie Sie gern unterwegs sind.",
      explorer: "Wilde Landschaften, Abenteuer und Entdeckung.",
      escape: "Weite, Komfort und mühelose Erholung.",
      enrich: "Kultur, Küche und Gemeinschaften.",
    },
    planCta: "Reise planen",
    planShort: "Safari planen",
    speakToExpert: "Mit einem Experten sprechen",
    chat: "Chat",
    whatsappMessage:
      "Hallo Maisha Quest, ich hätte gern Hilfe bei der Planung einer Safari in Tansania.",
  },

  footer: {
    navLabel: "Fußzeile",
    blurb:
      "Private Reisen durch Tansania, entworfen und begleitet aus Arusha. Geführt von Tansania. Gestaltet um Sie herum.",
    groups: {
      travel: "Reisen",
      company: "Maisha Quest",
      legal: "Rechtliches",
    },
    whatsapp: "Schreiben Sie uns auf WhatsApp",
    rights: "Maisha bedeutet Leben — die Reise des Lebens.",
  },

  collectionNames: {
    explorer: "Explorer",
    escape: "Escape",
    enrich: "Enrich",
  },

  safaris: {
    title: "Jede Reise, die wir gestalten",
    lede:
      "Hier gibt es keine festen Abfahrten. Jede Reise ist eine Form, von der wir wissen, dass sie funktioniert — neu gebaut um Ihre Termine, Ihr Tempo und die Menschen, mit denen Sie reisen.",
    collection: "Kollektion",
    aboutCollection: "Über diese Kollektion",
    journeyCount: (n: number) => (n === 1 ? "1 Reise" : `${n} Reisen`),
    noneRightTitle: "Nichts davon passt so ganz?",
    noneRightBody:
      "Gut — genau da fängt es meistens an. Erzählen Sie uns, was Ihnen vorschwebt, und wir bauen es von Grund auf.",
  },

  collections: {
    pageTitle: (name: string) => `Kollektion ${name}`,
    typicalLength: "Übliche Dauer",
    journeysInCollection: (n: number) =>
      n === 1 ? "1 Reise in dieser Kollektion" : `${n} Reisen in dieser Kollektion`,
    notQuiteYou: "Nicht ganz das Richtige?",
  },

  destinations: {
    title: "Neun Orte, ein Land",
    lede:
      "Tansania ist nicht eine einzige Landschaft. Das sind die Orte, durch die wir reisen, was dort lebt und wann sie am schönsten sind.",
    whenToCome: "Wann Sie kommen sollten",
    include: (place: string) => `${place} aufnehmen`,
    journeysThrough: (place: string) => `Reisen durch ${place}`,
  },

  experiences: {
    singular: "Erlebnis",
    lede:
      "Eine Safari besteht nicht nur aus Pirschfahrten. So lässt sich ein Tag in Tansania verbringen — kombinieren Sie so viel davon, wie Sie möchten.",
    whereYouDoThis: "Wo Sie das erleben",
    addToJourney: "Zu meiner Reise hinzufügen",
    journeysIncluding: "Reisen, die das enthalten",
  },

  planner: {
    stepOf: "Schritt {n} von {total}",
    progress: "Fortschritt der Reiseplanung",
    draftRestored:
      "Wir machen dort weiter, wo Sie aufgehört haben. Ihre bisherigen Antworten sind nur auf diesem Gerät gespeichert.",
    back: "Zurück",
    continue: "Weiter",
    send: "Anfrage senden",
    sending: "Wird gesendet…",
    savedLocally: "Wird auf diesem Gerät gespeichert",

    steps: {
      trip: {
        label: "Reise",
        title: "Welche Art von Reise schwebt Ihnen vor?",
        help: "Wählen Sie, was am ehesten passt. Nichts davon ist verbindlich — es sagt uns nur, wo wir anfangen.",
      },
      destinations: {
        label: "Orte",
        title: "Wohin möchten Sie?",
        help: "Wählen Sie so viele aus, wie Sie mögen, oder überlassen Sie es uns.",
      },
      dates: {
        label: "Termine",
        title: "Wann und wie lange?",
        help: "Ungefähr genügt. Wenn Ihre Termine flexibel sind, sagen Sie es — das spielt meist zu Ihren Gunsten.",
      },
      travellers: {
        label: "Reisende",
        title: "Wer reist mit, und wie möchten Sie übernachten?",
        help: "",
      },
      budget: {
        label: "Budget",
        title: "Mit welchem Budget planen Sie?",
        help: "Pro Person, ohne internationale Flüge. Eine ehrliche Spanne erlaubt uns einen realistischen Vorschlag statt eines optimistischen.",
      },
      contact: {
        label: "Kontakt",
        title: "Wohin dürfen wir Ihren Vorschlag schicken?",
        help: "",
      },
      review: { label: "Übersicht", title: "Stimmt das so?", help: "" },
    },

    legends: {
      tripType: "Art der Reise",
      duration: "Wie lange?",
      travellers: "Reisende",
      accommodation: "Wie möchten Sie übernachten?",
      budget: "Budget pro Person",
    },

    tripTypes: {
      wildlife: {
        label: "Klassische Safari",
        note: "Pirschfahrten und die großen Parks",
      },
      honeymoon: { label: "Flitterwochen", note: "Ruhe, Komfort und die Küste" },
      family: { label: "Familienreise", note: "Im Tempo der Kinder" },
      adventure: {
        label: "Abenteuer",
        note: "Zu Fuß, im Camp, auf abgelegenen Routen",
      },
      kilimanjaro: { label: "Kilimandscharo", note: "Auf den Berg" },
      culture: { label: "Kultur & Gemeinschaft", note: "Menschen, Küche und Ort" },
      "safari-and-zanzibar": {
        label: "Safari & Sansibar",
        note: "Erst die Ebene, dann das Meer",
      },
      "not-sure": { label: "Noch unklar", note: "Helfen Sie uns weiter" },
    },

    durations: {
      "under-7": { label: "Weniger als eine Woche" },
      "7-9": { label: "7 – 9 Tage" },
      "10-14": { label: "10 – 14 Tage" },
      "15-plus": { label: "Mehr als zwei Wochen" },
      unsure: { label: "Noch offen" },
    },

    accommodationStyles: {
      camp: { label: "Zeltcamps", note: "Zeltdach, nah an der Tierwelt" },
      lodge: { label: "Lodges", note: "Komfort und ein richtiges Bett" },
      boutique: {
        label: "Boutique & Design",
        note: "Kleine Häuser mit Charakter",
      },
      mixed: { label: "Gemischt", note: "Unterschiedliche Stile entlang der Route" },
      guidance: { label: "Beraten Sie mich", note: "Wir schlagen Passendes vor" },
    },

    budgets: {
      "under-3000": { label: "Unter 3.000 $" },
      "3000-5000": { label: "3.000 – 5.000 $" },
      "5000-8000": { label: "5.000 – 8.000 $" },
      "8000-plus": { label: "Mehr als 8.000 $" },
      open: { label: "Offen — beraten Sie mich" },
    },

    fields: {
      month: "Ungefähr wann?",
      adults: "Erwachsene",
      children: "Kinder",
      childrenHint: "Unter 18",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefon oder WhatsApp",
      country: "Land",
      replyIn: "Antwort bitte auf",
      notes: "Sonst noch etwas, das wir wissen sollten?",
      notesPlaceholder:
        "Anlässe, Ernährung, Mobilität, Fotografie, Tiere, die Sie sehen möchten…",
    },

    errors: {
      tripType:
        "Wählen Sie die Art von Reise, die Ihnen vorschwebt, oder „Noch unklar“.",
      travelMonth:
        "Nennen Sie uns einen ungefähren Monat, oder haken Sie „meine Termine sind flexibel“ an.",
      durationDays: "Wie lange möchten Sie ungefähr reisen?",
      adultsMin: "Es muss mindestens eine erwachsene Person mitreisen.",
      adultsMax:
        "Für Gruppen ab zwanzig Personen schreiben Sie uns bitte direkt — das planen wir anders.",
      accommodationStyle:
        "Wählen Sie eine Art der Unterkunft, oder lassen Sie sich beraten.",
      budgetPerPerson: "Wählen Sie eine Spanne, oder „Offen — beraten Sie mich“.",
      firstName: "Wir brauchen einen Namen für die Antwort.",
      emailMissing:
        "Wir brauchen eine E-Mail-Adresse, an die wir Ihren Vorschlag senden können.",
      emailInvalid:
        "Diese E-Mail-Adresse sieht nicht richtig aus — bitte prüfen Sie sie.",
      consent:
        "Bitte bestätigen Sie, dass wir diese Angaben zur Beantwortung Ihrer Anfrage nutzen dürfen.",
    },

    review: {
      journey: "Reise",
      destinations: "Reiseziele",
      when: "Wann",
      length: "Dauer",
      travellers: "Reisende",
      stays: "Unterkunft",
      budget: "Budget",
      contact: "Kontakt",
      notes: "Anmerkungen",
      edit: "Ändern",
      flexible: "Flexibel",
      notGiven: "Keine Angabe",
      openToSuggestions: "Offen für Vorschläge",
      adultCount: { one: "{n} Erwachsener", other: "{n} Erwachsene" },
      childCount: { one: ", {n} Kind", other: ", {n} Kinder" },
    },

    summary: {
      heading: "Reiseanfrage — Maisha Quest",
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      country: "Land",
      replyIn: "Antwort auf",
      journeyType: "Art der Reise",
      budgetPerPerson: "Budget pro Person",
    },

    status: {
      sentTitle: "Ihre Anfrage ist bei uns.",
      sentBody:
        "Vielen Dank, {name}. Jemand aus dem Team in Arusha liest sie in Ruhe und meldet sich bei Ihnen — nicht mit einer Vorlage, sondern mit einer Route.",
      reference: "Ihre Referenz lautet",
      unconfiguredTitle: "Fast — dieses Formular ist noch nicht angebunden.",
      unconfiguredBody:
        "Wir sagen Ihnen nicht, Ihre Anfrage sei abgeschickt, wenn sie es nicht ist. Der Endpunkt ist noch nicht mit E-Mail oder einem CRM verbunden, es hat uns also nichts erreicht. Ihre Antworten stehen unten, versandfertig — ein Tippen, und sie sind unterwegs.",
      sendByEmail: "Per E-Mail senden",
      sendOnWhatsApp: "Über WhatsApp senden",
      yourAnswers: "Ihre Antworten",
      sendFailed: "Wir konnten das gerade nicht senden.",
      offline:
        "Wir konnten unseren Server nicht erreichen. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
      orEmailUs: "Sie können uns auch schreiben an",
      inTheMeantime: "In der Zwischenzeit",
    },
  },

  contact: {
    title: "Sprechen Sie mit einem Experten vor Ort",
    lede:
      "Wir sitzen in Arusha, nicht in einem Callcenter. Auf welchem Weg Sie sich auch melden — einer der Gründer sieht es.",
    phone: "Telefon",
    email: "E-Mail",
    hours: "Zeiten",
    whereWeAre: "Wo wir sind",
    messageUs: "Schreiben Sie uns",
    languagesBody:
      "Wir planen und begleiten auf Englisch und Suaheli und sprechen außerdem Russisch und Mandarin.",
    planningTitle: "Planen Sie eine Reise?",
    planningBody:
      "Die Reiseplanung dauert ein paar Minuten und gibt uns alles, was wir brauchen, um mit einer echten Route zu antworten statt mit einem Prospekt.",
  },

  plan: {
    lede:
      "Unverbindlich und ohne automatisches Angebot. Eine Person in Arusha liest jede Anfrage und antwortet mit einer Route.",
    customizeTitle: (name: string) => `Anpassen: ${name}`,
    customizeLede:
      "Wir haben diese Reise als Ausgangspunkt übernommen. Ändern Sie alles — die Route, das Tempo, die Dauer, die Art der Unterkunft.",
    steps: [
      {
        title: "Sie sagen uns, wie Sie es sich vorstellen",
        body: "Sieben kurze Schritte: wann, wie lange, wer mitreist und was Sie sich davon versprechen.",
      },
      {
        title: "Wir antworten mit einer Route",
        body: "Ein Routenvorschlag mit einer ehrlichen Einschätzung der Kosten und des Aufwands — von einem Menschen geschrieben, nicht generiert.",
      },
      {
        title: "Wir ändern sie, bis sie passt",
        body: "So viele Runden, wie Sie brauchen. Nichts wird bestätigt oder bezahlt, bevor Sie zufrieden sind.",
      },
    ],
  },

  legal: {
    eyebrow: "Rechtliches",
    notice: {
      before:
        "Diese Seite wird gerade mit dem Rechtsberater von Maisha Quest finalisiert. Bis dahin gelten für Ihre Buchung die Bedingungen, die schriftlich in Ihrer Buchungsbestätigung stehen. Die aktuelle Fassung erhalten Sie unter",
      after: "auf Anfrage.",
    },
    pendingSection:
      "Der vollständige Wortlaut dieses Abschnitts steht noch unter juristischem Vorbehalt.",
    terms: {
      title: "Allgemeine Geschäftsbedingungen",
      intro:
        "Die Bedingungen, die gelten, wenn Sie eine Reise bei Maisha Quest buchen.",
      sections: [
        {
          heading: "Mit wem Sie buchen",
          body: [
            "Maisha Quest ist ein Reiseveranstalter mit Sitz in Arusha, Tansania, und organisiert private Safaris, Bergtouren und Aufenthalte an der Küste im ganzen Land.",
            "Handelsregister- und Veranstalterlizenzdaten werden hier veröffentlicht.",
          ],
          pending: true,
        },
        {
          heading: "Angebote und Bestätigung",
          body: [
            "Ein Angebot ist ein Vorschlag, keine Buchung. Preise, Camps und Verfügbarkeiten werden schriftlich bestätigt, bevor etwas reserviert wird.",
          ],
          pending: true,
        },
        {
          heading: "Zahlung",
          body: [
            "Bedingungen zu Anzahlung, Restzahlung und Zahlungsarten stehen noch aus.",
          ],
          pending: true,
        },
        {
          heading: "Änderungen und Stornierung",
          body: [
            "Die Stornobedingungen hängen von den für Ihre Reise reservierten Camps und Inlandsflügen ab und werden vollständig in Ihrer Buchungsbestätigung aufgeführt.",
          ],
          pending: true,
        },
        {
          heading: "Versicherung",
          body: [
            "Alle Reisenden benötigen eine umfassende Reise- und Krankenversicherung. Der Schutz sollte medizinische Evakuierung einschließen und muss bei Kilimandscharo-Besteigungen Trekking bis 6.000 Meter abdecken.",
          ],
        },
        {
          heading: "Reisepass, Visum und Gesundheit",
          body: [
            "Reisende sind selbst dafür verantwortlich, einen gültigen Reisepass und das richtige Visum zu besitzen und die Einreisebestimmungen zu erfüllen. Wir verweisen Sie auf die offiziellen Quellen, können Sie aber nicht zu Ihrem konkreten Fall beraten.",
          ],
        },
        {
          heading: "Sicherheit auf Safari",
          body: [
            "Wildtiere sind wild. Gäste müssen den Anweisungen ihres Guides jederzeit folgen, auch im Camp, und keine Sichtung ist garantiert.",
          ],
        },
        {
          heading: "Haftung und anwendbares Recht",
          body: [
            "Rechtswahl und Haftungsklauseln stehen unter juristischem Vorbehalt.",
          ],
          pending: true,
        },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      intro:
        "Was wir erheben, wenn Sie uns schreiben, warum, und was wir damit tun.",
      sections: [
        {
          heading: "Was wir erheben",
          body: [
            "Wenn Sie die Reiseplanung nutzen oder uns schreiben, erheben wir, was Sie uns geben: Ihren Namen, Ihre E-Mail-Adresse, optional Telefonnummer und Land sowie die Angaben zur geplanten Reise.",
            "Über diese Website fragen wir weder Pass- noch Zahlungsdaten ab.",
          ],
        },
        {
          heading: "Warum wir sie speichern",
          body: [
            "Um Ihre Anfrage zu beantworten und, falls Sie buchen, Ihre Reise zu organisieren. Das ist der einzige Zweck. Wir verkaufen oder vermieten Ihre Daten an niemanden.",
          ],
        },
        {
          heading: "Wohin sie gehen",
          body: [
            "Anfragen erreichen unser Team in Arusha. Zur Organisation einer Reise geben wir nur das Nötigste an die Camps, Lodges, Fluggesellschaften und Guides Ihrer Route weiter.",
          ],
        },
        {
          heading: "Wie lange wir sie aufbewahren",
          body: ["Die Aufbewahrungsfristen stehen unter juristischem Vorbehalt."],
          pending: true,
        },
        {
          heading: "Ihre Rechte",
          body: [
            "Sie können erfragen, welche Daten wir zu Ihnen gespeichert haben, deren Berichtigung oder deren Löschung verlangen. Schreiben Sie an die E-Mail-Adresse am Fuß dieser Seite, und wir setzen es um.",
          ],
        },
        {
          heading: "Der Entwurf in Ihrem Browser",
          body: [
            "Die Reiseplanung speichert Ihre Antworten in Ihrem eigenen Browser, damit sie beim Schließen des Tabs nicht verloren gehen. Dieser Entwurf bleibt auf Ihrem Gerät, erreicht uns erst mit dem Absenden des Formulars und wird dabei gelöscht.",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie-Richtlinie",
      intro: "Was diese Website in Ihrem Browser speichert.",
      sections: [
        {
          heading: "Diese Seite setzt keine Tracking-Cookies",
          body: [
            "So wie sie gebaut ist, setzt diese Website weder Werbe- noch Analyse-Cookies und lädt keine Tracker von Dritten. Die Schriften werden von dieser Seite selbst ausgeliefert und nicht von einem externen Anbieter, und die Karte zeichnet die Seite selbst, statt sie von einem Kartendienst zu holen.",
          ],
        },
        {
          heading: "Was lokal gespeichert wird",
          body: [
            "Die Reiseplanung speichert Ihre unfertigen Antworten im lokalen Speicher Ihres Browsers, damit sie nicht verloren gehen. Sie verlassen Ihr Gerät erst mit dem Absenden des Formulars und werden dann entfernt. Das Löschen der Browserdaten entfernt sie sofort.",
          ],
        },
        {
          heading: "Falls später Analyse hinzukommt",
          body: [
            "Sollte Maisha Quest Analyse- oder Werbewerkzeuge ergänzen, wird diese Seite aktualisiert und ein Einwilligungsbanner ergänzt, bevor ein solches Cookie gesetzt wird.",
          ],
          pending: true,
        },
      ],
    },
  },

  credits: {
    eyebrow: "Nachweise",
    title: "Bildnachweise",
    lede:
      "Die Bilder auf dieser Seite sind vorläufige dokumentarische Aufnahmen aus Tansania unter Creative-Commons-Lizenz, solange die eigene Fotografie von Maisha Quest vorbereitet wird.",
    sourceAndLicence: "Quelle und Lizenz",
    body:
      "Jedes Bild wurde ausgewählt, weil sein Quellendatensatz sowohl das Land als auch das Motiv belegt — so erscheint auf dieser Seite keine Art und keine Landschaft, die nicht nach Tansania gehört. Keine dieser Aufnahmen stammt von Maisha Quest, und auf keiner sind Gäste, Guides, Fahrzeuge oder Camps von Maisha Quest zu sehen.",
    allOwn:
      "Die gesamte Fotografie dieser Seite stammt inzwischen von Maisha Quest selbst.",
  },

  meta: {
    keywords: [
      "Safari Tansania",
      "private Safari Tansania",
      "Serengeti Safari",
      "Ngorongoro Krater Reise",
      "Kilimandscharo Besteigung",
      "Safari und Sansibar",
      "maßgeschneiderte Safari Arusha",
    ],
    home: {
      title: "Maisha Quest · Private Safaris in Tansania",
      description:
        "Private Reisen durch Tansania, geführt von Experten vor Ort und gestaltet um Ihre Geschichte. Serengeti, Ngorongoro, Tarangire, Kilimandscharo und Sansibar, geplant aus Arusha.",
      ogTitle: "Private Reisen durch Tansania · Maisha Quest",
      ogDescription:
        "Geführt von Experten vor Ort. Gestaltet um Ihre Geschichte. Maßgeschneiderte Safaris durch ganz Tansania, von einem Team in Arusha.",
    },
    safaris: {
      title: "Safaris",
      description:
        "Alle privaten Reisen, die wir in Tansania gestalten, sortiert danach, wie Sie gern unterwegs sind. Hier gibt es keine festen Abfahrten.",
    },
    destinations: {
      title: "Reiseziele",
      description:
        "Neun Orte in Tansania: der nördliche Circuit, die südlichen Parks, der Kilimandscharo und die Küste des Indischen Ozeans.",
    },
    experiences: {
      title: "Erlebnisse",
      description:
        "Pirschfahrten, Walking-Safaris, Ballonflüge, Kulturtage, der Kilimandscharo und die Küste Sansibars — so lässt sich ein Tag in Tansania verbringen.",
    },
    about: {
      title: "Über uns",
      description:
        "Maisha Quest ist ein tansanischer Safari-Veranstalter mit Sitz in Arusha. Maisha bedeutet Leben: Wir bauen private Reisen um das herum, wer Sie sind und wie Sie reisen möchten.",
    },
    team: {
      title: "Das Team",
      description:
        "Talisa Tufts, Frank Lyatuu und Tina Ngabo — die Gründer hinter Maisha Quest, mit Sitz in Arusha, Tansania.",
    },
    impact: {
      title: "Engagement",
      description:
        "Maisha Quest Cares — einheimische Guides zu einheimischen Löhnen, direkt bezahlte Gemeindebesuche und Unterstützung für Bildungs- und Naturschutzarbeit nahe unseren Reisezielen.",
    },
    journal: {
      title: "Journal",
      description:
        "Planungshilfen unseres Teams in Arusha: wo die Tierwanderung Monat für Monat steht, welche Kilimandscharo-Route passt und wie es sich in der grünen Saison reist.",
    },
    contact: {
      title: "Kontakt",
      description:
        "Sprechen Sie mit Maisha Quest in Arusha, Tansania. Telefon, E-Mail und WhatsApp, beantwortet von dem Team, das Ihre Reise begleitet.",
    },
    plan: {
      title: "Reise planen",
      description:
        "Sieben kurze Schritte, die eine Person in Arusha allesamt liest. Kein automatisches Angebot, keine Verpflichtung.",
    },
    faq: {
      title: "Häufige Fragen",
      description:
        "Wann Tansania besuchen, wie früh buchen, was eine private Safari bedeutet, Visa, Impfungen und Packliste — beantwortet von unserem Team in Arusha.",
    },
  },

  notFound: {
    title: "Abseits der Karte",
    body:
      "Diese Seite gibt es nicht — oder sie ist beim Neubau der Website umgezogen. Versuchen Sie es stattdessen hiermit.",
    contact: "Kontakt aufnehmen",
  },

  about: {
    heroTitle: "Geführt von Tansania. Gestaltet um Sie herum.",
    heroLede:
      "Maisha Quest wurde in Arusha gegründet, am Fuß des Mount Meru. Wir sind ein kleines einheimisches Team und bauen private Reisen für alle, die mehr wollen als eine feste Abfahrt.",
    lede:
      "Maisha Quest heißt ungefähr „die Reise des Lebens“ — und genau darum geht es. Eine Safari ist kein Produkt aus dem Regal, sondern ein Stück Ihres Lebens an einem außergewöhnlichen Ort, und so sollte sie auch gebaut werden.",
    compass:
      "Unsere Gründer beschreiben es als ein Leben nach dem Kompass: eine Richtung wählen, statt einer festen Route zu folgen. So planen wir auch — wir fangen dort an, wo Sie ankommen möchten, nicht bei einem Katalog.",
    ground:
      "Alles wird aus Arusha organisiert, vor Ort. Unsere Guides, Fahrzeuge und Zulieferer sind tansanisch, und wer Ihre erste E-Mail beantwortet, holt Sie am Flughafen ab.",
    meetTeam: "Das Team kennenlernen",
    foundersSlot: "Die Gründer von Maisha Quest in Arusha",
    howWeWork: "Wie wir arbeiten",
    people: "Die Menschen",
    readStories: "Ihre Geschichten lesen",
    talkTitle: "Sprechen Sie mit uns",
    talkBody: (timezone: string, hours: string) =>
      `Wir sind in Arusha, ${timezone}, ${hours}. Am schnellsten geht es, wenn Sie uns ungefähr sagen, wann Sie reisen möchten und worauf es Ihnen ankommt.`,
    contactDetails: "Kontaktdaten",
  },

  journal: {
    title: "Notizen aus Arusha",
    lede:
      "Praktische Texte über das Reisen in Tansania — die Fragen, die uns am häufigsten gestellt werden, ordentlich beantwortet statt in einem Absatz.",
    pendingTitle:
      "Unser Team in Arusha schreibt gerade an diesem Beitrag; er erscheint hier in Kürze.",
    pendingBody:
      "Wenn Sie die Antwort früher brauchen, fragen Sie uns — wir beantworten diese Frage jede Woche für Reisende und erklären es Ihnen lieber richtig, als dass Sie auf einen Blogbeitrag warten.",
    more: "Mehr aus dem Journal",
  },

  faq: {
    title: "Was uns am häufigsten gefragt wird",
    lede:
      "Klare Antworten. Wo etwas von Ihrem Pass, Ihrer Gesundheit oder Ihren Terminen abhängt, sagen wir das und verweisen auf die offizielle Quelle, statt zu raten.",
    stillTitle: "Immer noch offen?",
    stillBefore: "Schreiben Sie uns an",
    stillAfter: (phone: string, timezone: string) =>
      `oder rufen Sie ${phone} an. Wir sind in Arusha, ${timezone}.`,
  },

  impact: {
    noNumbers:
      "Wir stellen auf diese Seite keine Zahlen, für die wir nicht geradestehen können. Sobald ein Programm belegbare Ergebnisse liefert — unterstützte Schulen, geschaffene Arbeitsplätze, finanzierte Projekte —, veröffentlichen wir sie hier mit den Belegen dazu.",
    askCta: "Fragen Sie nach unseren Projekten",
  },

  regions: {
    northern: "Nördlicher Circuit",
    southern: "Südlicher Circuit",
    coast: "Küste & Inseln",
    gateway: "Ausgangspunkt",
  },
  accommodation: {
    "Mobile camp": "Mobiles Camp",
    "Tented camp": "Zeltcamp",
    Lodge: "Lodge",
    "Boutique lodge": "Boutique-Lodge",
    "Beach resort": "Strandresort",
    "City hotel": "Stadthotel",
  },
  meals: {
    breakfast: "Frühstück",
    lunch: "Mittagessen",
    dinner: "Abendessen",
  },
  impactAreas: {
    education: "Bildung",
    conservation: "Naturschutz",
    community: "Gemeinschaft",
    employment: "Arbeit vor Ort",
  },
  faqTopics: {
    planning: "Planung",
    travel: "Anreise",
    safari: "Safari",
    health: "Gesundheit & Sicherheit",
    payment: "Zahlung",
  },
  categories: {
    wildlife: "Tierwelt",
    adventure: "Abenteuer",
    luxury: "Luxus",
    honeymoon: "Flitterwochen",
    family: "Familie",
    culture: "Kultur",
    kilimanjaro: "Kilimandscharo",
    "safari-and-zanzibar": "Safari & Sansibar",
  },
  languageNames: {
    English: "Englisch",
    Swahili: "Suaheli",
    Russian: "Russisch",
    "Mandarin Chinese": "Mandarin",
    Spanish: "Spanisch",
    German: "Deutsch",
    French: "Französisch",
  },

  video: {
    pause: "Pause",
    pending: "Film folgt",
    filmToFollow: (poster: string) => `${poster} — Film folgt`,
  },

  team: {
    languages: "Sprachen",
    specialty: "Schwerpunkt",
    favouritePlace: "Lieblingsort in Tansania",
    portraitOf: (name: string) => `Porträt von ${name}`,
    pageTitle: "Die Menschen hinter Ihrer Reise",
    crewTitle: "Guides, Fahrer und Crew",
    crewBody:
      "Jede Reise wird von tansanischen Guides und Fahrern durchgeführt, mit denen wir direkt zusammenarbeiten. Am Kilimandscharo folgen Trägerlöhne und Traglastgrenzen den KPAP-Richtlinien. Profile des weiteren Teams erscheinen hier.",
    startPlanning: "Planung beginnen",
  },

  safari: {
    itineraryPending:
      "Unser Team in Arusha stellt den Tag-für-Tag-Ablauf dieser Reise gerade fertig. Fragen Sie danach, und wir senden Ihnen die aktuelle Fassung.",
    stay: "Unterkunft",
    stayPending: "Wird mit Ihrem Vorschlag bestätigt",
    meals: "Mahlzeiten",
    time: "Dauer",
    collectionOf: (name: string) => `Kollektion ${name}`,
    style: "Stil",
    theJourney: "Die Reise",
    dayByDay: "Tag für Tag",
    whereYouStay: "Wo Sie übernachten",
    whereYouStayBody: (style: string) =>
      `Diese Reise ist um Unterkünfte der Kategorie „${style}“ herum geplant. Die konkreten Camps und Lodges schlagen wir zusammen mit Ihrer Route vor — ausgewählt danach, wo sie auf der Strecke liegen und was zu Ihren Terminen verfügbar ist, statt hier Häuser zu nennen, die wir womöglich nicht halten können.`,
    accommodationIn: (place: string) => `Unterkunft in ${place}`,
    gallery: "Galerie",
    theRoute: "Die Route",
    included: "Inbegriffen",
    notIncluded: "Nicht inbegriffen",
    practical: "Praktisches",
    commonQuestions: "Häufige Fragen",
    whatTravellersSaid: "Was Reisende sagten",
    noReviews:
      "Zu dieser Reise sind noch keine Bewertungen veröffentlicht, und wir schreiben selbst keine. Fragen Sie uns, und wir stellen den Kontakt zu Reisenden her, die sie gemacht haben.",
    similarJourneys: "Ähnliche Reisen",
    askQuestion: "Frage stellen",
  },

  home: {
    hero: {
      headline: ["Private Reisen", "durch Tansania"],
      subline: "Geführt von Experten vor Ort. Gestaltet um Ihre Geschichte.",
      designCta: "Safari gestalten",
      exploreCta: "Reisen ansehen",
      pillars: ["Experten vor Ort", "Private Safaris", "Verantwortungsvoll reisen"],
      scroll: "Scrollen",
    },
    maisha: {
      eyebrow: "Unser Name",
      meansLife: "bedeutet Leben.",
      lede:
        "Jede Reise ist eine Gelegenheit, zu entdecken, in Kontakt zu kommen und intensiver zu leben. Wir gestalten private Safaris in Tansania, zugeschnitten darauf, wer Sie sind und wie Sie reisen möchten.",
      body:
        "Maisha Quest wurde in Arusha gegründet, am Fuß des Mount Meru und am Anfang des nördlichen Circuits. Wir sind ein kleines Team: Wer Ihre erste E-Mail beantwortet, holt Sie am Flughafen ab.",
      cta: "Maisha Quest kennenlernen",
      teamSlot: "Das Team von Maisha Quest in Arusha",
    },
    experiences: {
      eyebrow: "Hier beginnen",
      title: "Wie möchten Sie Tansania erleben?",
      lede:
        "Jede Reise, die wir bauen, beginnt mit dieser Frage — nicht mit einem Paket. Wählen Sie, was Ihnen am ähnlichsten klingt; kombinieren können Sie später.",
      carouselLabel: "Wege, Tansania zu erleben",
    },
    collections: {
      eyebrow: "Die Maisha-Kollektionen",
      title: "Drei Arten, Tansania zu bereisen",
      lede:
        "Keine drei Preisklassen, sondern drei Temperamente. Die meisten wissen nach der ersten Zeile, welches ihres ist.",
      explore: (name: string) => `${name} entdecken`,
    },
    featured: {
      eyebrow: "Ausgewählte Reisen",
      title: "Reisen, an die man sich erinnert",
      lede:
        "Ausgangspunkte, keine festen Abfahrten. Jede wird um Ihre Termine, Ihr Tempo und Ihre Mitreisenden herum neu gebaut.",
    },
    map: {
      eyebrow: "Die Karte",
      title: "Finden Sie Ihren Ort in Tansania",
      lede:
        "Neun Orte, vier Circuits und eine Küste. Wählen Sie einen aus, um zu sehen, wann es sich lohnt, was dort lebt und welche Reisen vorbeiführen.",
      bestTime: "Beste Zeit",
      wildlife: "Tierwelt",
      experiences: "Erlebnisse",
      journeysHere: "Reisen, die hierher führen",
      chooseDestination: "Wählen Sie ein Ziel",
      dayCount: (n: number) => (n === 1 ? "1 Tag" : `${n} Tage`),
      moreOn: (place: string) => `Mehr über ${place}`,
    },
    film: {
      eyebrow: "Der Film",
      title: "Ein Land. Unendlich viele Arten, sich lebendig zu fühlen.",
      watch: "Die Reise ansehen",
      posterLabel: "Tansania, in sechsunddreißig Sekunden",
      cta: "Erlebnisse ansehen",
      threads: [
        { label: "Tierwelt", note: "Die Ebene und was sich über sie bewegt." },
        { label: "Kultur", note: "Zeit mit den Menschen, die hier leben." },
        { label: "Abenteuer", note: "Zu Fuß, auf dem Wasser, am Berg." },
        { label: "Ozean", note: "Wo die Reise langsamer wird." },
        { label: "Verbindung", note: "Der Grund, warum all das zählt." },
      ],
    },
    why: {
      eyebrow: "Warum Maisha Quest",
      title: "Ihre Reise, in guten Händen",
      lede:
        "Wir sind ein tansanisches Unternehmen. Das ist keine Marketingzeile: Es ändert, wer ans Telefon geht, wer das Fahrzeug fährt und wohin das Geld fließt.",
      pillars: [
        {
          title: "Experten mit Sitz in Tansania",
          body:
            "Wir leben und arbeiten in Arusha. Unsere Routen entstehen daraus, dass wir sie fahren — nicht aus einem Prospekt.",
        },
        {
          title: "Maßgeschneiderte Routen",
          body:
            "Jede Reise entsteht von Grund auf, rund um Ihr Tempo, Ihre Interessen und Ihre Termine.",
        },
        {
          title: "Mehrsprachige Betreuung",
          body:
            "Wir planen und begleiten auf Englisch, Suaheli, Russisch und Mandarin.",
        },
        {
          title: "Sorgfältig gewählte Unterkünfte",
          body:
            "Camps und Lodges, die wir selbst besucht haben, ausgewählt nach Lage, Service und Charakter.",
        },
        {
          title: "Verantwortungsvoll und lokal",
          body:
            "Einheimische Guides, einheimische Zulieferer und Gemeinschaften, die beteiligt und nicht fotografiert werden.",
        },
        {
          title: "Begleitung von Ankunft bis Abflug",
          body:
            "Ein Team von Ihrer ersten Nachricht bis zum Rückflug, während der ganzen Reise erreichbar.",
        },
      ],
    },
    team: {
      eyebrow: "Das Team",
      title: "Lernen Sie die Menschen hinter Ihrer Reise kennen",
      lede:
        "Drei Gründer in Arusha. Zusammen decken sie Reisegestaltung, Safari-Organisation und alles ab, was Sie vor Ort spüren.",
      cta: "Das ganze Team",
    },
    impact: {
      eyebrow: "Maisha Quest Cares",
      watch: "Ansehen",
      posterLabel: "Maisha Quest Cares, vor Ort",
      cta: "Wie unser Engagement funktioniert",
      intro: {
        title: "Reisen, das etwas zurückgibt",
        lede:
          "Ihre Reise sollte Tansania besser zurücklassen, als Sie es vorgefunden haben.",
        body:
          "Maisha Quest Cares sorgt dafür, dass das kein Slogan bleibt. Es läuft über genau die Reisen, die Sie machen: einheimische Guides zu einheimischen Löhnen, Zulieferer aus Arusha statt aus dem Ausland, und ein Anteil jeder Reise fließt in Arbeit, auf die wir zeigen können.",
      },
    },
    testimonials: {
      eyebrow: "Reisende",
      title: "Geschichten, die mit nach Hause kommen",
      lede:
        "Was Reisende nach der Rückkehr gesagt haben, veröffentlicht mit Quelle, damit Sie es selbst prüfen können.",
      emptyTitle:
        "Lieber zeigen wir Ihnen nichts, als etwas, das wir selbst geschrieben haben.",
      emptyBody:
        "Bewertungen erscheinen hier, sobald Reisende sie uns schicken — jede mit Link zur ursprünglichen Veröffentlichung. Bis dahin: fragen Sie uns, und wir stellen den Kontakt zu jemandem her, der mit uns gereist ist.",
      emptyBodyWithSources:
        "Bewertungen erscheinen hier, sobald Reisende sie uns schicken — jede mit Link zur ursprünglichen Veröffentlichung. Bis dahin finden Sie uns auf den Plattformen unten, oder fragen Sie uns, und wir stellen den Kontakt zu jemandem her, der mit uns gereist ist.",
      speakDirectly: "Direkt mit uns sprechen",
      askReferences: "Referenzen anfragen",
      verified: "Geprüfte Bewertung",
      rated: (n: number) => `Bewertet mit ${n} von 5`,
    },
    planner: {
      eyebrow: "Reise planen",
      title: "Gestalten wir Ihre Reise",
      lede:
        "Sieben kurze Schritte. Unverbindlich, kein automatisches Angebot — eine Person in Arusha liest jeden einzelnen und antwortet mit einer Route.",
      ratherTalk: "Lieber sprechen?",
    },
    closing: {
      title: "Ihre Geschichte in Tansania beginnt hier.",
      concept: "Geführt von Tansania. Gestaltet um Sie herum.",
    },
  },

  common: {
    priceOnRequest: "Preis auf Anfrage",
    sampleItinerary: "Beispielroute",
    from: "Ab",
    days: "Tage",
    day: "Tag",
    nights: "Nächte",
    readMore: "Weiterlesen",
    viewJourney: "Reise ansehen",
    customize: "Anpassen",
    customizeThis: "Diese Reise anpassen",
    backToCatalogue: "Zurück zu allen Safaris",
    exploreAll: "Alle Safaris ansehen",
    suits: "Passt zu",
    bestTime: "Beste Zeit",
    duration: "Dauer",
    route: "Route",
    accommodation: "Unterkunft",
    wildlife: "Tierwelt",
    experiencesHere: "Erlebnisse hier",
    minutesRead: "Min. Lesezeit",
    dayCount: (n: number) => (n === 1 ? "1 Tag" : `${n} Tage`),
    dayLabel: (n: number) => `Tag ${n}`,
    durationRange: ([min, max]: [number, number]) =>
      min === max ? `${min} Tage` : `${min}–${max} Tage`,
    safariMeta: (style: string) => `Private Safari · Unterkunft: ${style}`,
    fromPerPerson: (price: string) => `Ab ${price} pro Person`,
    draftNotice:
      "Beispielroute — endgültiger Verlauf und Termine werden mit Ihnen abgestimmt.",
    readingTime: (n: number) => `${n} Min. Lesezeit`,
  },
};
