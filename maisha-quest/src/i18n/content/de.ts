/**
 * CONTENIDO EN ALEMÁN.
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
 * Ein-/Ausschluss-Zeilen, die sich fast alle 18 realen Pakete teilen.
 *
 * Das ist keine Abkürzung: maishaquest.com wiederholt diesen Block, fast
 * wortgleich, auf allen 18 Paketseiten. Zwei Dinge bestätigt die Quelle bei
 * keinem Paket, deshalb fehlen sie hier: ob der Inlandsflug nach Sansibar
 * bei den sechs Escape-Paketen enthalten ist, und ob eine optionale
 * Ballonsafari enthalten ist oder extra kostet. Beides wird bei den Paketen,
 * bei denen es relevant ist, in `practicalInfo` als offene Frage an den
 * Kunden markiert, statt als Annahme in die eine oder andere Richtung.
 */
const STANDARD_INCLUDED = [
  "Flughafentransfers bei An- und Abreise",
  "4x4-Land-Cruiser mit aufklappbarem Dach",
  "Englischsprachiger Guide, mit Betreuung rund um die Uhr",
  "Sämtliche Park- und behördliche Gebühren",
  "Unterkunft wie gebucht",
  "Drei Mahlzeiten täglich während der Safari",
  "Wasser in Flaschen und Softdrinks",
];
const STANDARD_NOT_INCLUDED = [
  "Internationale Flüge und Visum für Tansania",
  "Reise- und Krankenversicherung",
  "Trinkgeld für Ihren Guide",
  "Mahlzeiten im Hotel vor oder nach der Safari",
];

export const deContent: ContentDictionary = {
  safaris: {
    /* ======================== EXPLORER — Camping ======================= */
    "manyara-ngorongoro-safari": {
      name: "Lake-Manyara- und Ngorongoro-Krater-Safari",
      summary: "Eine kompakte, zweitägige Einführung in Tansanias klassische Wildtierroute: baumkletternde Löwen am Lake Manyara, dann ein ganzer Tag auf dem Boden des Ngorongoro-Kraters.",
      overview: "Konzipiert für Reisende mit wenig Zeit, die dennoch eine echte Safari wollen statt einer Kostprobe. Durchgehend Camping-Unterkunft, genau wie in den Explorer-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende mit wenig Zeit, die ein klassisches Wildtiererlebnis suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Camping — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Lake-Manyara-Nationalpark", route: "Arusha → Lake-Manyara-Nationalpark", activities: ["Früher Aufbruch aus Arusha", "Pirschfahrt am Lake Manyara: baumkletternde Löwen, Elefanten und Flamingos", "Picknick-Mittagessen im Park", "Abendlicher Transfer zu einem Campingplatz bei Karatu"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: "Karatu → Ngorongoro-Krater → Arusha", activities: ["Früher Abstieg zum Kraterboden", "Ganztägige Tierbeobachtung, mit guten Chancen auf Nashörner und Großkatzen", "Picknick-Mittagessen am Nilpferdteich", "Nachmittägliche Rückfahrt nach Arusha"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-ngorongoro-safari": {
      name: "Tarangire-, Lake-Manyara- und Ngorongoro-Krater-Safari",
      summary: "Drei von Tansanias bekanntesten Parks in drei Tagen: Elefanten und Baobabs in Tarangire, die Rift-Valley-Steilstufe am Lake Manyara und ein halber Tag im Ngorongoro-Krater.",
      overview: "Eine einführende Safari für Erstbesucher, die drei ikonische Parks ohne langes Reiseprogramm kennenlernen möchten. Durchgehend Camping-Unterkunft, genau wie in den Explorer-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Safari-Erstbesucher, die drei ikonische Parks kennenlernen möchten",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Camping — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Tarangire-Nationalpark", route: "Arusha → Tarangire-Nationalpark", activities: ["Pirschfahrt: Elefantenherden und uralte Baobabs", "Picknick-Mittagessen im Park", "Übernachtung im Camp"], estimatedDuration: null },
        { title: "Lake-Manyara-Nationalpark", route: "Tarangire → Lake-Manyara-Nationalpark", activities: ["Morgendliche Pirschfahrt entlang der Rift-Valley-Steilstufe: Giraffen, Elefanten und Vogelwelt", "Abendlicher Transfer zu einem Campingplatz bei Karatu"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: "Karatu → Ngorongoro-Krater → Arusha", activities: ["Früher Abstieg für eine halbtägige Pirschfahrt am Kraterboden", "Picknick-Mittagessen im Krater", "Rückfahrt nach Arusha"], estimatedDuration: null },
      ],
    },
    "serengeti-ngorongoro-manyara-safari": {
      name: "Serengeti-, Ngorongoro- und Lake-Manyara-Safari",
      summary: "Vier Tage zwischen Lake Manyara, dem Ngorongoro-Krater und der Serengeti, auf den Spuren der Großen Migration und der Raubtiere, die ihr folgen.",
      overview: "Eine viertägige Camping-Rundreise durch drei bedeutende Ziele, genau wie in den Explorer-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die in vier Tagen einen umfassenderen Eindruck von der Nordroute suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Camping — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Lake-Manyara-Nationalpark", route: "Arusha → Lake-Manyara-Nationalpark", activities: ["Morgendliche Fahrt zum Lake Manyara: baumkletternde Löwen, Elefanten und Flamingos", "Nachmittäglicher Transfer zu einem Camp im Ngorongoro-Hochland"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: "Ngorongoro-Hochland → Ngorongoro-Krater → Serengeti", activities: ["Frühe Pirschfahrt im Krater", "Nachmittäglicher Transfer in die Serengeti, optional über die Olduvai-Schlucht", "Pirschfahrt bei Sonnenuntergang"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Ganzer Tag mit Pirschfahrten auf den Spuren der Raubtiere und wandernden Herden", "Picknick-Mittagessen", "Übernachtung im Camp"], estimatedDuration: "Ganzer Tag" },
        { title: "Zurück nach Arusha", route: "Serengeti → Ngorongoro → Karatu → Arusha", activities: ["Morgendliche Pirschfahrt beim Aufbruch aus der Serengeti", "Rückfahrt nach Arusha über Ngorongoro und Karatu"], estimatedDuration: null },
      ],
    },
    "northern-circuit-camping-safari": {
      name: "5-tägige Camping-Safari durch die Nordroute",
      summary: "Eine ausgewogene, entspannte Camping-Safari durch Tarangire, Lake Manyara, die Serengeti und den Ngorongoro-Krater.",
      overview: "Für Abenteurer, die ein ausgewogenes Reiseprogramm ohne Hetze zwischen den Parks suchen. Durchgehend Camping-Unterkunft, genau wie in den Explorer-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Abenteurer, die ein ausgewogenes Reiseprogramm ohne Hetze suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Camping — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Tarangire-Nationalpark", route: "Arusha → Tarangire-Nationalpark", activities: ["Pirschfahrt bei Ankunft", "Übernachtung im Camp"], estimatedDuration: null },
        { title: "Von Tarangire in die Serengeti", route: "Tarangire → Serengeti-Nationalpark", activities: ["Tierbeobachtung unterwegs", "Übernachtung in einem Camp in der zentralen Serengeti"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrten am Morgen und am Nachmittag", "Übernachtung im Camp"], estimatedDuration: null },
        { title: "Von der Serengeti nach Ngorongoro", route: "Serengeti → Ngorongoro-Kraterrand", activities: ["Morgendliche Pirschfahrt", "Nachmittäglicher Transfer zu einem Camp am Kraterrand"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: "Ngorongoro-Krater → Arusha", activities: ["Früher Abstieg für eine halbtägige Safari am Kraterboden", "Rückfahrt nach Arusha"], estimatedDuration: null },
      ],
    },
    "six-day-camping-safari": {
      name: "6-tägige Camping-Safari durch Tansania",
      // ⚠️ Auf der eigenen Explorer-Seite von maishaquest.com verweist der
      // Button „EXPLORE SAFARI" dieses Pakets auf dieselbe Seite wie das
      // 5-tägige Paket oben — es gibt kein bestätigtes, eigenständiges
      // Reiseprogramm für einen sechsten Tag. Die Tage 1–5 wiederholen das
      // bestätigte 5-Tage-Programm; Tag 6 bleibt offen, statt erfunden zu
      // werden. Siehe die Anmerkung am Anfang von `safaris.ts`.
      summary: "Ein sechster Tag, ergänzt zur Camping-Safari durch die Nordroute — den Ablauf für Tag 6 bestätigen wir direkt mit Ihnen vor der Buchung.",
      overview: "Die Tage 1 bis 5 folgen unserer bestätigten 5-tägigen Camping-Safari durch die Nordroute. Den genauen Ablauf für Tag 6 bestätigen wir direkt mit Ihnen.",
      travellerProfile: "Abenteurer, die ein ausgewogenes Reiseprogramm ohne Hetze suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Camping — verfügbar in Luxus-, Mittel- oder Budgetklasse" },
        { label: "Ausstehend", value: "Den genauen Ablauf für Tag 6 bestätigen wir direkt mit Ihnen vor der Buchung." },
      ],
      days: [
        { title: "Tarangire-Nationalpark", route: "Arusha → Tarangire-Nationalpark", activities: ["Pirschfahrt bei Ankunft", "Übernachtung im Camp"], estimatedDuration: null },
        { title: "Von Tarangire in die Serengeti", route: "Tarangire → Serengeti-Nationalpark", activities: ["Tierbeobachtung unterwegs", "Übernachtung in einem Camp in der zentralen Serengeti"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrten am Morgen und am Nachmittag", "Übernachtung im Camp"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Weitere Pirschfahrten in einem anderen Teil des Parks", "Übernachtung im Camp"], estimatedDuration: null },
        { title: "Von der Serengeti nach Ngorongoro", route: "Serengeti → Ngorongoro-Kraterrand", activities: ["Morgendliche Pirschfahrt", "Nachmittäglicher Transfer zu einem Camp am Kraterrand"], estimatedDuration: null },
        { title: "Ngorongoro-Krater — Tag noch zu bestätigen", route: "Ngorongoro-Krater → Arusha", activities: ["Noch nicht mit Maisha Quest bestätigt — siehe praktische Informationen"], estimatedDuration: null },
      ],
    },
    "extended-camping-safari": {
      name: "7-tägige erweiterte Camping-Safari durch Tansania",
      summary: "Ein intensives Camping-Programm durch Tarangire, Lake Manyara, die Serengeti und den Ngorongoro-Krater, mit genügend Zeit, um der Großen Migration wirklich zu folgen.",
      overview: "Das längste der Explorer-Camping-Programme, genau wie auf maishaquest.com aufgeführt. Endet mit einer optionalen kulturellen Aktivität auf der Rückfahrt nach Arusha.",
      travellerProfile: "Reisende, die die komplette Nordroute ohne Eile erleben möchten",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Camping — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Tarangire-Nationalpark", route: "Arusha → Tarangire-Nationalpark", activities: ["Nachmittägliche Pirschfahrt bei Ankunft"], estimatedDuration: null },
        { title: "Lake-Manyara-Nationalpark", route: null, activities: ["Morgendliche Erkundung des Lake Manyara", "Übernachtung bei Karatu"], estimatedDuration: null },
        { title: "Weiter in die Serengeti", route: "Karatu → Ngorongoro (optionaler Stopp an der Olduvai-Schlucht) → Serengeti", activities: ["Nachmittägliche Pirschfahrt bei Ankunft in der Serengeti"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Ganzer Tag auf den Spuren der Migration und der Raubtiere"], estimatedDuration: "Ganzer Tag" },
        { title: "Von der Serengeti zum Kraterrand", route: "Serengeti → Ngorongoro-Kraterrand", activities: ["Morgendliche Pirschfahrt", "Nachmittägliche Ankunft am Kraterrand"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: "Ngorongoro-Krater → Karatu", activities: ["Ganztägige Safari im Krater", "Übernachtung bei Karatu"], estimatedDuration: null },
        { title: "Zurück nach Arusha", route: "Karatu → Arusha", activities: ["Landschaftlich reizvolle Rückfahrt", "Optionale kulturelle Aktivität unterwegs"], estimatedDuration: null },
      ],
    },

    /* ==================== ESCAPE — Lodge + Sansibar ===================== */
    "safari-zanzibar-escape": {
      name: "Safari- & Sansibar-Auszeit",
      summary: "Pirschfahrten in Tarangire und im Ngorongoro-Krater, dann ein Flug nach Sansibar zu Stone Town und an den Strand.",
      overview: "Eine siebentägige Auszeit, die die nördliche Safari-Route mit einem Küstenaufenthalt auf Sansibar verbindet, genau wie in den Escape-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die Tierwelt und Strand in einer Reise verbinden möchten",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge während der Safari, Strandhotel auf Sansibar — verfügbar in Luxus-, Mittel- oder Budgetklasse" },
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, bestätigen wir Ihnen bei der Erstellung Ihres persönlichen Angebots." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrem Hotel"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Ganztägige Pirschfahrt: Elefantenherden und Baobabs"], estimatedDuration: "Ganzer Tag" },
        { title: "Ngorongoro-Krater", route: null, activities: ["Ganztägige Erkundung des Kraters"], estimatedDuration: "Ganzer Tag" },
        { title: "Weiter nach Sansibar", route: "Arusha → Sansibar", activities: ["Rückfahrt nach Arusha", "Flug nach Sansibar", "Check-in in Stone Town"], estimatedDuration: null },
        { title: "Stone Town & Gewürzfarmen", route: null, activities: ["Spaziergang durch Stone Town", "Besuch einer Gewürzplantage"], estimatedDuration: null },
        { title: "Strandtag", route: null, activities: ["Erholsamer Tag am Strand", "Optional Schnorcheln, Tauchen oder Kitesurfen"], estimatedDuration: null },
        { title: "Abreise", route: "Sansibar → Flughafen", activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
    "serengeti-zanzibar": {
      name: "Serengeti & Sansibar",
      summary: "Pirschfahrten auf der Suche nach den Big Five in der Serengeti und im Ngorongoro, gefolgt von Stone Town und den weißen Sandstränden Sansibars.",
      overview: "Eine achttägige Auszeit, die Tierbeobachtung mit Inselerholung verbindet, genau wie in den Escape-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die Tierwelt und Strand in einer Reise verbinden möchten",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Luxus-Camp während der Safari, Stone Town oder Resort auf Sansibar" },
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, bestätigen wir Ihnen bei der Erstellung Ihres persönlichen Angebots." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrem Hotel"], estimatedDuration: null },
        { title: "Weiter in die Serengeti", route: "Arusha → Serengeti", activities: ["Nachmittägliche Pirschfahrt bei Ankunft"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Ganzer Tag mit Pirschfahrten", "Picknick-Mittagessen im Busch"], estimatedDuration: "Ganzer Tag" },
        { title: "Von der Serengeti nach Ngorongoro", route: "Serengeti → Ngorongoro-Schutzgebiet", activities: ["Morgendliche Safari", "Transfer zu einer Lodge am Kraterrand"], estimatedDuration: null },
        { title: "Vom Ngorongoro-Krater nach Sansibar", route: "Ngorongoro → Sansibar", activities: ["Safari im Krater", "Nachmittäglicher Flug nach Sansibar", "Check-in in Stone Town"], estimatedDuration: null },
        { title: "Stone Town & Prison Island", route: null, activities: ["Spaziergang durch Stone Town", "Bootsausflug zu Prison Island mit Schnorcheln"], estimatedDuration: null },
        { title: "Strandtag", route: null, activities: ["Erholsamer Tag am Strand", "Optionale Wassersportarten"], estimatedDuration: null },
        { title: "Abreise", route: "Sansibar → Flughafen", activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
    "big-three-zanzibar": {
      name: "Big 3 + Sansibar",
      summary: "Tarangire, die Serengeti und der Ngorongoro-Krater, dann Stone Town und der Strand auf Sansibar.",
      overview: "Eine neuntägige Auszeit, die drei von Tansanias bekanntesten Parks mit Zeit auf Sansibar verbindet, genau wie in den Escape-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die Tierwelt und Strand in einer Reise verbinden möchten",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge während der Safari, Stone Town oder Strandresort auf Sansibar" },
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, bestätigen wir Ihnen bei der Erstellung Ihres persönlichen Angebots." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Abholung am Flughafen", "Briefing am Abend"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Ganztägige Safari", "Picknick-Mittagessen"], estimatedDuration: "Ganzer Tag" },
        { title: "Weiter in die Serengeti", route: "Arusha → Ngorongoro-Hochland → Serengeti", activities: ["Fahrt in die zentrale Serengeti"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrten am Morgen und am Nachmittag"], estimatedDuration: null },
        { title: "Von der Serengeti nach Ngorongoro", route: "Serengeti → Ngorongoro-Kraterrand", activities: ["Frühe Pirschfahrt", "Transfer zum Kraterrand"], estimatedDuration: null },
        { title: "Vom Ngorongoro-Krater nach Sansibar", route: "Ngorongoro → Sansibar", activities: ["Ganztägige Safari im Krater", "Abendlicher Flug nach Stone Town"], estimatedDuration: null },
        { title: "Stone Town & Gewürzfarmen", route: null, activities: ["Spaziergang durch Stone Town", "Besuch einer Gewürzplantage"], estimatedDuration: null },
        { title: "Strandtag", route: null, activities: ["Schwimmen, Schnorcheln oder Tauchen, ganz nach Wunsch"], estimatedDuration: null },
        { title: "Abreise", route: "Sansibar → Flughafen", activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
    "safari-culture-zanzibar": {
      name: "Safari, Kultur & Sansibar",
      summary: "Pirschfahrten durch Tarangire, die Serengeti und Ngorongoro, ein Tag bei den Hadzabe- und Datoga-Gemeinschaften am Eyasi-See, dann Sansibar.",
      overview: "Eine zehntägige Reise, die Safari, kulturelle Begegnungen und einen Strandausklang verbindet, genau wie in den Escape-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die Tierwelt, Kultur und Strand in einer Reise suchen",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge während der Safari, Stone Town oder Strandresort auf Sansibar" },
        { label: "Ausstehend", value: "Weitere Details zur Etappe am Eyasi-See teilen wir Ihnen direkt bei der Erstellung Ihres persönlichen Angebots mit." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Abholung am Flughafen"], estimatedDuration: null },
        { title: "Stadtrundgang durch Arusha", route: null, activities: ["Märkte, das Tanzanit-Museum und das Cultural Heritage Centre"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Ganztägige Safari", "Picknick-Mittagessen"], estimatedDuration: "Ganzer Tag" },
        { title: "Weiter in die Serengeti", route: "Arusha → Ngorongoro-Hochland → Serengeti", activities: ["Nachmittägliche Pirschfahrt bei Ankunft"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrten am Morgen und am Nachmittag"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: null, activities: ["Abstieg in den Krater zur Tierbeobachtung"], estimatedDuration: null },
        { title: "Vom Eyasi-See nach Sansibar", route: "Ngorongoro → Eyasi-See → Sansibar", activities: ["Kulturelle Besuche bei Hadzabe-Jägern und Datoga-Schmieden", "Nachmittäglicher Flug nach Sansibar"], estimatedDuration: null },
        { title: "Stone Town & Gewürzfarmen", route: null, activities: ["Geführte Tour durch Stone Town", "Besuch einer Gewürzfarm"], estimatedDuration: null },
        { title: "Strandtag", route: null, activities: ["Optional Schnorcheln, Kitesurfen oder eine Dhau-Fahrt"], estimatedDuration: null },
        { title: "Abreise", route: "Sansibar → Flughafen", activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
    "luxury-safari-zanzibar": {
      name: "Luxus-Safari & Sansibar",
      summary: "Eine vollständige Safari durch die Nordroute — Tarangire, Lake Manyara, die Serengeti und Ngorongoro, mit optionalem Ballonflug — gefolgt von vier Nächten auf Sansibar.",
      overview: "Eine zwölftägige Auszeit für Paare, Familien und kleine Gruppen, die sowohl Safari als auch Inselzeit möchten, genau wie in den Escape-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Paare, Familien und kleine Gruppen, die Safari-Nervenkitzel und Inselruhe suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Ballonsafari (optional, an Tag 5)"],
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge während der Safari, Stone Town oder Strandresort auf Sansibar" },
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, bestätigen wir Ihnen bei der Erstellung Ihres persönlichen Angebots." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrem Hotel"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Ganztägige Safari: Baobabs, Elefanten und die Big Five"], estimatedDuration: "Ganzer Tag" },
        { title: "Lake-Manyara-Nationalpark", route: null, activities: ["Baumkletternde Löwen und Flamingos"], estimatedDuration: null },
        { title: "Weiter in die Serengeti", route: "Arusha → Ngorongoro-Hochland → Serengeti", activities: ["Fahrt in die zentrale Serengeti"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Optionale Ballonsafari bei Sonnenaufgang mit Buschfrühstück", "Pirschfahrten"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Ganztägige Safari, mit Verfolgung der Migration je nach Saison"], estimatedDuration: "Ganzer Tag" },
        { title: "Ngorongoro-Krater", route: null, activities: ["Abstieg in den Krater zur Tierbeobachtung"], estimatedDuration: null },
        { title: "Weiter nach Sansibar", route: "Arusha → Sansibar", activities: ["Rückfahrt nach Arusha", "Flug nach Sansibar", "Abendliche Sonnenuntergangsfahrt mit einer Dhau"], estimatedDuration: null },
        { title: "Gewürzfarmen & Prison Island", route: null, activities: ["Tour durch eine Gewürzplantage", "Schnorchelausflug zu Prison Island"], estimatedDuration: null },
        { title: "Strandtag", route: null, activities: ["Erholsamer Tag", "Optionale Wassersportarten"], estimatedDuration: null },
        { title: "Freier Tag", route: null, activities: ["Freier Tag", "Abendessen bei Sonnenuntergang am Strand"], estimatedDuration: null },
        { title: "Abreise", route: "Sansibar → Flughafen", activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
    "grand-safari-zanzibar": {
      name: "Große Safari & Sansibar",
      summary: "Die komplette Nordroute, ein Tag bei den Hadzabe- und Datoga-Gemeinschaften am Eyasi-See, dann eine Woche auf Sansibar mit dem Jozani-Wald und Kizimkazi.",
      overview: "Das längste Escape-Programm auf maishaquest.com: vierzehn Tage, die eine ausführliche Safari mit einem verlängerten Aufenthalt auf Sansibar verbinden.",
      travellerProfile: "Reisende, die eine entspannte, umfassende Tansania-Reise suchen",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge während der Safari, Stone Town oder Strandresort auf Sansibar" },
        { label: "Ausstehend", value: "Weitere Details zur Etappe am Eyasi-See teilen wir Ihnen direkt bei der Erstellung Ihres persönlichen Angebots mit." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrem Hotel"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Ganztägige Safari: Elefantenherden und Baobabs"], estimatedDuration: "Ganzer Tag" },
        { title: "Lake-Manyara-Nationalpark", route: null, activities: ["Baumkletternde Löwen und Flamingos"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Verfolgung der Migration, je nach Saison"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Beobachtung von Flussüberquerungen, je nach Saison"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Weitere Pirschfahrten im Park"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: null, activities: ["Abstieg in den Krater für eine ganztägige Safari"], estimatedDuration: "Ganzer Tag" },
        { title: "Ngorongoro-Krater", route: null, activities: ["Weitere Tierbeobachtung im Krater"], estimatedDuration: null },
        { title: "Vom Eyasi-See nach Sansibar", route: "Ngorongoro → Eyasi-See → Sansibar", activities: ["Besuche bei den Hadzabe- und Datoga-Gemeinschaften", "Nachmittäglicher Flug nach Sansibar"], estimatedDuration: null },
        { title: "Stone Town & Gewürzfarmen", route: null, activities: ["Spaziergang durch Stone Town", "Besuch einer Gewürzfarm", "Sonnenuntergangsfahrt mit einer Dhau"], estimatedDuration: null },
        { title: "Strandtag", route: null, activities: ["Erholsamer Tag", "Optional Tauchen, Schnorcheln oder Kitesurfen"], estimatedDuration: null },
        { title: "Jozani-Wald & Kizimkazi", route: null, activities: ["Rote Stummelaffen im Jozani-Wald", "Delfinbegegnung in Kizimkazi"], estimatedDuration: null },
        { title: "Freier Tag", route: null, activities: ["Erholsamer Tag", "Abschiedsessen am Meer"], estimatedDuration: null },
        { title: "Abreise", route: "Sansibar → Flughafen", activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },

    /* =============== ENRICH — Lodge, Tierwelt + Kultur ================= */
    "tarangire-serengeti-ngorongoro-enrich": {
      name: "Tarangire, Serengeti & Ngorongoro",
      summary: "Uralte Baobabs und Elefantenherden in Tarangire, die offenen Ebenen der Serengeti und der Ngorongoro-Krater — oft das Achte Weltwunder genannt.",
      overview: "Eine fünftägige Lodge-Safari durch drei von Tansanias bedeutendsten Parks, genau wie in den Enrich-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die eine Lodge-basierte Einführung in die Nordroute suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Lodge — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrer Lodge"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Pirschfahrten", "Picknick-Mittagessen im Park"], estimatedDuration: null },
        { title: "Weiter in die Serengeti", route: "Arusha → Hochland → Serengeti", activities: ["Abendliche Safari bei Ankunft"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrt bei Sonnenaufgang", "Optionaler Besuch eines Maasai-Dorfes", "Transfer Richtung Ngorongoro"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: "Ngorongoro-Krater → Arusha", activities: ["Abstieg in den Krater", "Halbtägige Safari", "Rückfahrt nach Arusha"], estimatedDuration: null },
      ],
    },
    "manyara-serengeti-ngorongoro-enrich": {
      name: "Lake Manyara, Serengeti & Ngorongoro",
      summary: "Vielfältige Landschaften und reiche Tierwelt, einschließlich der Big Five: baumkletternde Löwen, die Große Migration und die dichte Tierwelt des Ngorongoro-Kraters.",
      overview: "Eine siebentägige Lodge-Safari durch Lake Manyara, die Serengeti und Ngorongoro, genau wie in den Enrich-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die eine umfassendere Lodge-Safari durch die Nordroute suchen",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Lodge — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrem Hotel"], estimatedDuration: null },
        { title: "Lake-Manyara-Nationalpark", route: null, activities: ["Pirschfahrt", "Picknick-Mittagessen"], estimatedDuration: null },
        { title: "Weiter in die Serengeti", route: "Lake Manyara → Ngorongoro-Kraterrand → zentrale Serengeti", activities: ["Fahrt mit Tierbeobachtung unterwegs"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Ganztägige Safari auf den Spuren der Migration und der Raubtiere"], estimatedDuration: "Ganzer Tag" },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Morgendliche Safari im Norden oder Süden der Serengeti, je nach Saison"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: null, activities: ["Abstieg in den Krater", "Halbtägige Safari"], estimatedDuration: null },
        { title: "Zurück nach Arusha", route: "Ngorongoro → Arusha", activities: ["Transfer zum Flughafen"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-serengeti-ngorongoro-enrich": {
      name: "Tarangire, Lake Manyara, Serengeti & Ngorongoro",
      summary: "Elefanten zwischen den Baobabs in Tarangire, baumkletternde Löwen und Flamingos am Lake Manyara, die Ebenen der Serengeti und der Ngorongoro-Krater.",
      overview: "Eine achttägige Lodge-Safari durch vier Parks, genau wie in den Enrich-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die die komplette Nordroute aus komfortablen Lodges erleben möchten",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Unterkunft", value: "Lodge — verfügbar in Luxus-, Mittel- oder Budgetklasse" }],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrem Hotel"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Pirschfahrten: Elefanten und Baobab-Wald"], estimatedDuration: null },
        { title: "Lake-Manyara-Nationalpark", route: null, activities: ["Baumkletternde Löwen und Flamingos"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrt bei Ankunft"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Ganztägige Erkundung, die Route hängt von der Migrationssaison ab"], estimatedDuration: "Ganzer Tag" },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Weitere Pirschfahrten"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: null, activities: ["Halbtägige Safari am Kraterrand"], estimatedDuration: null },
        { title: "Zurück nach Arusha", route: "Ngorongoro → Arusha", activities: ["Transfer zum Flughafen"], estimatedDuration: null },
      ],
    },
    "cultural-safari-combo": {
      name: "Kultur- + Safari-Kombination",
      summary: "Erkundung von Stammeskulturen und authentisches Gemeinschaftsleben neben Wildtiersafaris: Arusha, Tarangire, die Serengeti, Ngorongoro, der Eyasi-See und ein Maasai-Dorf.",
      overview: "Eine zehntägige Reise, die Nationalparks mit traditionellen Gemeindebesuchen ausbalanciert, genau wie in den Enrich-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die kulturelles Eintauchen neben der Tierwelt suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge — verfügbar in Luxus-, Mittel- oder Budgetklasse" },
        { label: "Ausstehend", value: "Weitere Details zur Etappe am Eyasi-See teilen wir Ihnen direkt bei der Erstellung Ihres persönlichen Angebots mit." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer vom Flughafen"], estimatedDuration: null },
        { title: "Stadtrundgang durch Arusha", route: null, activities: ["Märkte und das Cultural Heritage Centre"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Ganztägige Safari"], estimatedDuration: "Ganzer Tag" },
        { title: "Weiter in die Serengeti", route: "Arusha → Ngorongoro → Serengeti", activities: ["Pirschfahrten unterwegs"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrten", "Optionales Abendessen bei Sonnenuntergang"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Expedition zur Verfolgung der Migration"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: null, activities: ["Tierbeobachtung am Kraterboden"], estimatedDuration: null },
        { title: "Eyasi-See", route: null, activities: ["Besuch bei den Hadzabe-Jägern und Datoga-Schmieden"], estimatedDuration: null },
        { title: "Maasai-Dorf", route: null, activities: ["Kultureller Eintauchbesuch"], estimatedDuration: null },
        { title: "Abreise", route: null, activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
    "extended-safari-cultural-immersion": {
      name: "Erweiterte Safari & kulturelles Eintauchen",
      summary: "Tierbeobachtung in vier Parks kombiniert mit Begegnungen mit Gemeinschaften: Hadzabe-Jäger, Datoga-Schmiede und Maasai-Dörfer.",
      overview: "Eine elftägige Reise, die Safari-Aktivitäten mit Gemeindebesuchen ausbalanciert, genau wie in den Enrich-Paketen auf maishaquest.com aufgeführt.",
      travellerProfile: "Reisende, die ein längeres kulturelles Engagement neben der Tierwelt suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge — verfügbar in Luxus-, Mittel- oder Budgetklasse" },
        { label: "Ausstehend", value: "Weitere Details zur Etappe am Eyasi-See teilen wir Ihnen direkt bei der Erstellung Ihres persönlichen Angebots mit." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer vom Flughafen"], estimatedDuration: null },
        { title: "Stadtrundgang durch Arusha", route: null, activities: ["Märkte und das Tanzanit-Museum"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Pirschfahrten"], estimatedDuration: null },
        { title: "Lake-Manyara-Nationalpark", route: null, activities: ["Tierbeobachtung"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Pirschfahrten, Migrationsbeobachtung je nach Saison"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Weitere Pirschfahrten"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Weitere Pirschfahrten"], estimatedDuration: null },
        { title: "Weiter nach Ngorongoro", route: "Serengeti → Ngorongoro", activities: ["Transfer"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: null, activities: ["Ganztägige Safari"], estimatedDuration: "Ganzer Tag" },
        { title: "Eyasi-See & Maasai-Dörfer", route: null, activities: ["Teilnahme an einer traditionellen Jagd und am Feuermachen mit den Hadzabe-Jägern", "Besuche bei Datoga-Schmieden und einem Maasai-Dorf"], estimatedDuration: null },
        { title: "Abreise", route: null, activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
    "wildlife-leisure-culture": {
      name: "Tierwelt + Erholung + Kultur",
      // ⚠️ Die eigene Zusammenfassung von maishaquest.com für dieses Paket
      // verspricht eine Strandetappe auf Sansibar («die perfekte Mischung aus
      // Abenteuer, Entspannung und kulturellem Eintauchen»), doch das
      // Tag-für-Tag-Programm auf derselben Seite verlässt nie das Festland
      // und endet am Flughafen Kilimanjaro. Das Reiseprogramm — der
      // überprüfbare Teil — wird unverändert veröffentlicht; siehe die
      // Anmerkung am Anfang von `safaris.ts`.
      summary: "Tierbeobachtung in den Parks des Nordens, ein Besuch einer Kaffee- und Tanzanit-Farm sowie kulturelle Begegnungen mit den Hadzabe-, Datoga- und Maasai-Gemeinschaften.",
      overview: "Ein zwölftägiges Enrich-Programm. Den genauen Reiseverlauf für diese Reise bestätigen wir direkt mit Ihnen vor der Buchung.",
      travellerProfile: "Reisende, die Tierwelt, Erholung und Kultur kombiniert suchen",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Ballonsafari (optional, an Tag 7)"],
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge — verfügbar in Luxus-, Mittel- oder Budgetklasse" },
        { label: "Ausstehend", value: "Den genauen Reiseverlauf für diese Reise bestätigen wir direkt mit Ihnen vor der Buchung." },
      ],
      days: [
        { title: "Ankunft in Arusha", route: "Kilimanjaro International Airport → Arusha", activities: ["Transfer zu Ihrem Hotel"], estimatedDuration: null },
        { title: "Stadtrundgang durch Arusha", route: null, activities: ["Tanzanit-Erlebnis", "Besuch und Verkostung auf einer Kaffeeplantage"], estimatedDuration: null },
        { title: "Tarangire-Nationalpark", route: null, activities: ["Ganztägige Safari: Elefanten und Baobabs"], estimatedDuration: "Ganzer Tag" },
        { title: "Lake-Manyara-Nationalpark", route: null, activities: ["Baumkletternde Löwen, Nilpferde und Flamingos"], estimatedDuration: null },
        { title: "Weiter in die Serengeti", route: "Ngorongoro-Hochland → zentrale Serengeti", activities: ["Landschaftlich reizvolle Fahrt"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Ganztägige Pirschfahrt"], estimatedDuration: "Ganzer Tag" },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Optionale Ballonsafari mit Champagnerfrühstück", "Nachmittägliche Pirschfahrten"], estimatedDuration: null },
        { title: "Serengeti-Nationalpark", route: null, activities: ["Norden oder Süden der Serengeti, je nach Migrationssaison"], estimatedDuration: null },
        { title: "Ngorongoro-Krater", route: null, activities: ["Abstieg in den Krater", "Nachmittägliche Safari"], estimatedDuration: null },
        { title: "Eyasi-See", route: null, activities: ["Kulturelle Erlebnisse mit Hadzabe-Jägern und Datoga-Schmieden"], estimatedDuration: null },
        { title: "Maasai-Dorf", route: "→ Arusha", activities: ["Traditioneller Besuch eines Maasai-Dorfes", "Rückfahrt nach Arusha"], estimatedDuration: null },
        { title: "Abreise", route: "Arusha → Kilimanjaro International Airport", activities: ["Transfer für Ihren Weiterflug"], estimatedDuration: null },
      ],
    },
  },

  destinations: {
    "serengeti": {
      name: "Serengeti",
      shortDescription: "Endlose Ebenen und die Wanderung, die sie durchquert.",
      description: "Serengeti heißt auf Maa „endlose Ebenen“, und der Name ist keine Verzierung. Es ist ein weiter, geschichteter Park — Kurzgrasebenen im Süden, Granit-Kopjes in der Mitte, Galeriewald im Norden — mit den ganzjährigen Raubtierbeständen, für die Tansania bekannt ist, und der Gnuwanderung, die in einem langsamen Jahreskreis hindurchzieht.",
      bestTime: "Ganzjährig, je nachdem, wo die Wanderung steht",
      wildlife: ["Löwe","Leopard","Gepard","Gnu","Zebra","Elefant","Hyäne"],
      seasons: [
        {"label":"Kalbungszeit","months":"Januar – März","note":"Die Herden stehen auf den südlichen Kurzgrasebenen. Konzentrierte Raubtieraktivität."},
        {"label":"Westlicher Korridor","months":"Mai – Juli","note":"Die Wanderung zieht nach Westen und Norden. Flussquerungen am Grumeti."},
        {"label":"Nördliche Querungen","months":"Juli – Oktober","note":"Querungen des Mara im Norden. Die begehrtesten Wochen des Jahres."},
      ],
    },
    "tarangire": {
      name: "Tarangire",
      shortDescription: "Baobabs und die größten Elefantenherden des Nordens.",
      description: "Tarangire ist um einen einzigen Fluss herum gebaut, der Wasser führt, wenn das Land ringsum trocken ist. In den trockenen Monaten zieht dieser Fluss Elefantenherden in einer Zahl an, wie man sie sonst im Norden Tansanias selten sieht — unter jahrhundertealten Baobabs. Es ist ruhiger als die Serengeti und oft der erste Park einer Nordroute.",
      bestTime: "Juni – Oktober",
      wildlife: ["Elefant","Löwe","Giraffe","Zebra","Elenantilope","Fransenohr-Oryx"],
      seasons: [
        {"label":"Trockenzeit","months":"Juni – Oktober","note":"Die Tiere sammeln sich am Tarangire-Fluss. Die beste Elefantenbeobachtung des Jahres."},
        {"label":"Grüne Saison","months":"November – Mai","note":"Weniger Fahrzeuge, dramatische Himmel und hervorragende Vogelwelt. Das Wild verteilt sich weiter."},
      ],
    },
    "lake-manyara": {
      name: "Lake Manyara",
      shortDescription: "Grundwasserwald, ein alkalischer See und Flamingos.",
      description: "Ein schmaler Park, eingeklemmt zwischen der Steilwand des Rift Valley und einem flachen Sodasee. Innerhalb weniger Minuten fährt man aus dichtem Grundwasserwald in offene Überschwemmungsebene — das macht ihn zu einer der abwechslungsreichsten kurzen Pirschfahrten des Landes und zum natürlichen Halbtagesstopp zwischen Arusha und dem Ngorongoro-Hochland.",
      bestTime: "Juni – Oktober für Tiere, November – April für Vögel",
      wildlife: ["Elefant","Giraffe","Flusspferd","Pavian","Flamingo","Pelikan"],
      seasons: [],
    },
    "ngorongoro": {
      name: "Ngorongoro",
      shortDescription: "Ein eingestürzter Vulkan, der ein ganzes Ökosystem trägt.",
      description: "Der Ngorongoro-Krater ist die größte intakte Vulkancaldera der Welt, und auf seinem Boden finden Grasland, Wald, ein Sodasee und eine ansässige Großsäugerpopulation Platz, die nicht wandern muss. Vom kalten, nebligen Kraterrand steigt man im ersten Licht hinab. Es ist zugleich ein Schutzgebiet, in dem Maasai-Gemeinschaften und Wildtiere sich das Land teilen.",
      bestTime: "Ganzjährig",
      wildlife: ["Spitzmaulnashorn","Löwe","Elefant","Büffel","Hyäne","Flamingo"],
      seasons: [
        {"label":"Trockenzeit","months":"Juni – Oktober","note":"Klare Sicht in den Krater und gut befahrbare Pisten. Die vollsten Monate auf dem Kraterboden."},
        {"label":"Grüne Saison","months":"November – Mai","note":"Grüner Kraterboden, ab Januar Kalbungszeit auf den nahen Ndutu-Ebenen."},
      ],
    },
    "kilimanjaro": {
      name: "Kilimandscharo",
      shortDescription: "Afrikas höchster Punkt, vom Fuß bis zum Gipfel erlaufen.",
      description: "Den Kilimandscharo besteigt man, man fährt ihn nicht an. In fünf bis neun Tagen geht es von Ackerland durch Regenwald, Moorland und alpine Wüste zu einem vergletscherten Gipfel auf 5.895 Metern — fünf Klimazonen in einer Woche. Routenwahl, Tempo und Akklimatisierung zählen mehr als Fitness, und wir planen sie um Sie herum.",
      bestTime: "Januar – März und Juni – Oktober",
      wildlife: ["Stummelaffe","Blaumeerkatze","Malachitnektarvogel"],
      seasons: [],
    },
    "nyerere": {
      name: "Nyerere",
      shortDescription: "Bootssafaris auf dem Rufiji, in Afrikas größtem Park.",
      description: "Der Nyerere-Nationalpark — aus dem früheren Selous-Wildreservat herausgeschnitten — wird vom Rufiji und seinem Netz aus Seen und Kanälen bestimmt. Er ist einer der wenigen Orte Tansanias, an denen man vormittags zu Fuß und nachmittags vom Boot aus Tiere aufspüren kann, mit einem Bruchteil der Fahrzeuge des nördlichen Circuits.",
      bestTime: "Juni – Oktober",
      wildlife: ["Elefant","Flusspferd","Krokodil","Afrikanischer Wildhund","Büffel","Löwe"],
      seasons: [],
    },
    "ruaha": {
      name: "Ruaha",
      shortDescription: "Baobab-Land, große Herden und fast niemand sonst.",
      description: "Ruaha liegt dort, wo süd- und ostafrikanische Ökosysteme überlappen — deshalb findet man Großen und Kleinen Kudu im selben Park. Er ist abgelegen, rau und nur sehr wenig besucht: die Wahl für alle, die den nördlichen Circuit kennen und seine wilde Fassung suchen.",
      bestTime: "Juni – Oktober",
      wildlife: ["Elefant","Löwe","Großer Kudu","Rappenantilope","Afrikanischer Wildhund"],
      seasons: [],
    },
    "zanzibar": {
      name: "Sansibar",
      shortDescription: "Indischer Ozean, Dhau-Segel und Stone Town.",
      description: "Auf Sansibar enden die meisten Reisen: weißer Sand und warmes flaches Wasser an der Nord- und Ostküste, und im Westen Stone Town — UNESCO-Welterbe aus Korallenstein-Gassen, geschnitzten Türen und einer Geschichte aus Swahili, Oman und Indien. Zwei Nächte sind eine Pause; fünf sind ein eigener Urlaub.",
      bestTime: "Juni – Oktober und Dezember – Februar",
      wildlife: ["Roter Stummelaffe","Delfine","Rifffische","Suppenschildkröte"],
      seasons: [],
    },
    "arusha": {
      name: "Arusha",
      shortDescription: "Wo jede Reise beginnt — und wo wir leben.",
      description: "Arusha liegt im Schatten des Mount Meru, am Fuß des nördlichen Circuits. Es ist das Tor zur Serengeti und zum Ngorongoro und zugleich Zuhause: unser Büro, unsere Guides und unsere Fahrzeuge sind hier. Die meisten Reisen beginnen mit einer Nacht in Arusha, einem ordentlichen Briefing und einem entspannten ersten Morgen.",
      bestTime: "Ganzjährig",
      wildlife: ["Stummelaffe","Blaumeerkatze","Waldvögel"],
      seasons: [],
    },
  },

  /**
   * Die 5 realen Kategorien des Experiences-Bereichs von maishaquest.com,
   * jede mit einer eigenen Seite dort (/thrill-seaker-adventures,
   * /water-activities, /tours, /shopping-and-leisure, /nightlife). Die
   * `description` jeder Kategorie listet originalgetreu die auf jener Seite
   * veröffentlichten Aktivitäten bzw. Adressen auf — nichts erfunden, nichts
   * so zusammengefasst, dass Name oder Ort verloren gehen. Für keine dieser
   * Aktivitäten oder Adressen ist ein Preis veröffentlicht.
   */
  experiences: {
    "thrill-seeker-adventure": {
      name: "Nervenkitzel-Abenteuer",
      shortDescription: "„Safari“ bedeutet auf Suaheli „Reise“ – erkunden Sie abenteuerliche Grenzen in jeder Ecke Tansanias mit den besten Anbietern.",
      description: "Fallschirmspringen über dem Kendwa Beach auf Sansibar. Seilrutschen durch die Bananenplantagen und Wälder von Mto wa Mbu, zwei Stunden von Arusha entfernt. Tandem-Gleitschirmfliegen über dem Rift Valley bei Monduli, anderthalb Stunden von Arusha entfernt (saisonal). Mountainbiken durch Kaffeeplantagen und Dörfer bei Usa River und dem Rau-Wald, nahe Moshi und Arusha, mit Blick auf den Kilimandscharo. Reiten am Strand von Nungwi auf Sansibar. Bergtrekking am Kilimandscharo, am Mount Meru oder in den Usambara-Bergen. Wanderungen zu den Wasserfällen von Materuni und Napuru bei Moshi und Arusha, mit kulturellen Begegnungen mit den Chagga- und Meru-Gemeinschaften. Schwimmen mit Delfinen bei Kizimkazi auf Sansibar. Und saisonal von November bis März Schwimmen mit Walhaien vor Mafia Island. Wie auf der Seite Thrill Seeker Adventure von maishaquest.com aufgeführt.",
    },
    "water-activities": {
      name: "Wasseraktivitäten",
      shortDescription: "Wasser ist der Ursprung allen Lebens – verlassen Sie das Festland für eine Vielfalt an Wassersportarten an der Küste und darüber hinaus.",
      description: "Schnorcheln am Mnemba-Atoll, Sansibar. Gerätetauchen mit PADI-zertifizierten Zentren auf Sansibar und Mafia Island. Kitesurfen am Paje Beach, Sansibar, einem der besten Kitesurf-Strände der Welt (saisonal, tägliche Kurse). Kanufahren auf dem Duluti-See, einem Kratersee zwanzig Minuten von Arusha entfernt. Jetski bei Kendwa und Nungwi, Sansibar. Angeln auf dem Viktoriasee und an der Küste Sansibars, von traditionellen Ausflügen mit einheimischen Fischern bis zum Hochseeangeln. Bootsfahrten auf dem Viktoriasee und im Indischen Ozean, von Sonnenuntergangsfahrten bis zu traditionellen Dhau-Ausflügen. Tagesausflüge zur Bongoyo-Insel und zur Mbudya-Insel, beide nahe Daressalam, zum Schnorcheln und für Strandpicknicks. Private Yachtcharter ab Daressalam und Sansibar. Und geführte Besichtigungen der Süßwasserhöhlen Sansibars. Wie auf der Seite Water Activities von maishaquest.com aufgeführt.",
    },
    "tours-and-safaris": {
      name: "Touren & Safaris",
      shortDescription: "Entdecken Sie verborgene Schätze auf einer Reise zu Orten mit eigenen Geschichten.",
      description: "Museumsbesuche in Daressalam und Arusha, darunter das Nationalmuseum, das Arusha-Declaration-Museum und das Naturkundemuseum. Stadtrundgänge durch Arusha, Daressalam, Sansibar und Mwanza. Dorfbesuche in Mto wa Mbu und in Massai-Dörfern. Kunstgalerien im Nafasi Art Space in Daressalam und im Cultural Heritage Centre in Arusha. Eine Wanderung zu den Materuni-Wasserfällen bei Moshi mit traditioneller Kaffeezubereitung bei der Chagga-Gemeinschaft. Die Napuru-Wasserfälle, zwanzig Minuten von Arusha entfernt, für Wanderungen, Quad-Touren und Picknicks. Der Duluti-See, ebenfalls zwanzig Minuten von Arusha entfernt, zum Kanufahren, Angeln und für die Vogelbeobachtung. Der Meserani-Schlangenpark und das Massai-Museum, eine halbe Stunde von Arusha entfernt. Das Giraffenzentrum von Arusha. Kaffee- und Bananenfarmtouren in Moshi und Arusha. Und Edelstein- und Tansanit-Touren in Arusha und den Mererani-Minen. Wie auf der Seite Tours von maishaquest.com aufgeführt.",
    },
    "shopping-and-leisure": {
      name: "Shopping und Freizeit",
      shortDescription: "Die beste Art, Freizeit zu verbringen: neue Energie tanken bei den besten Angeboten vor Ort.",
      description: "Der Massai-Markt in Arusha, am besten samstags zu besuchen. Das Cultural Heritage Centre in Arusha mit Kunst, Artefakten, Schmuck und einem Café. Das AIM Mall in Arusha mit Boutiquen, Kino und Gastronomie. Das Slipway Shopping Centre in Daressalam für Einkaufen und Essen direkt am Meer. Die Geschäfte von Stone Town auf Sansibar mit traditionellem Suaheli-Kunsthandwerk, Gewürzen und Kleidung. Das Mlimani City Mall, das größte Einkaufszentrum Tansanias, in Daressalam. Das Rock City Mall in Mwanza. Und Spa-Tage im Lemon Spa in Arusha, im Ocean Spa in Daressalam und auf Sansibar oder im Honey Spa in Moshi. Wie auf der Seite Shopping and Leisure von maishaquest.com aufgeführt.",
    },
    nightlife: {
      name: "Nachtleben",
      shortDescription: "Die Musik hört nicht auf – die coolsten Adressen der Stadt, wohin die Reise Sie auch führt.",
      description: "In Arusha: Via Via für Live-Musik unter freiem Himmel und kulturelle Abende, Rafiki Juice Bar für Cocktails und DJs, Kesho Café für Jazz und Poesie, Pillars für Live-Bands sowie Clubs wie Aces, Club D, The Hub und El Toro für Bongo Flava und internationale Hits. In Daressalam: Samaki Samaki zum Essen und Tanzen, Elements für Cocktails auf der Dachterrasse, Tips Lounge für Hip-Hop und Bongo Flava, Wavuvi Camp für Strandpartys, Coco Beach Strip, Cocktails & Dreams, The Reef sowie Clubs wie Uncles, Kitamba Cheupe, Havoc und Warehouse. Auf Sansibar: die Sky Bar mit Blick auf Stone Town, Jambo Beach, die Full-Moon-Party im Kendwa Rocks sowie Lounges wie 6 Degrees South, Garage Club und Tatu. In Mwanza: Cask n Grill und Tilapia Lounge. Wie auf der Seite Nightlife von maishaquest.com aufgeführt.",
    },
  },

  collections: {
    "explorer": {
      tagline: "Für Reisende, die wilde Landschaften, Abenteuer und Entdeckung suchen.",
      description: "Die aktive Seite Tansanias. Längere Tage im Gelände, Camps, die mit den Tieren weiterziehen, Zeit zu Fuß statt nur im Fahrzeug, und Routen bis in die Winkel eines Parks, in die kaum ein Wagen kommt.",
      travellerProfile: "Aktive Reisende, Fotografinnen und Fotografen, Safari-Wiederholer",
      traits: ["Mobiles Camping","Pirschfahrten","Wandern & Trekking","Abgelegene Routen"],
    },
    "escape": {
      tagline: "Für Reisende, die Weite, Komfort und mühelose Erholung suchen.",
      description: "Langsamer, weicher und rundum organisiert. Weniger Parks und mehr Nächte in jedem, Lodges, ausgewählt nach ihrer Lage und dem Blick von dort, und ein Abschluss am Indischen Ozean.",
      travellerProfile: "Paare, Hochzeitsreisende und Safari-Einsteiger",
      traits: ["Lodges & Boutique-Camps","Paare & Flitterwochen","Wohlbefinden","Sansibar"],
    },
    "enrich": {
      tagline: "Für Reisende, die Tansania tiefer erleben möchten.",
      description: "Tansania jenseits der Pirschfahrt. Tage bei Gemeinschaften und Naturschutzteams, Essen und Kaffee dort, wo sie wachsen, und privater Zugang, direkt mit den Gastgebenden vereinbart.",
      travellerProfile: "Neugierige Reisende, Familien mit älteren Kindern, Wiederkehrende",
      traits: ["Kultur","Küche","Gemeinschaften","Naturschutz"],
    },
  },

  journal: {
    "elevate-your-safari-experience": {
      title: "Ihre Safari auf ein neues Niveau heben: die maßgeschneiderten Abenteuer von Maisha Quest",
      excerpt: "Ein Blick auf die Explorer-, Escape- und Enrich-Pakete von Maisha Quest sowie auf den Umzug zu einer neuen, mit Wix gebauten Website mit maßgeschneiderten Safari-Formularen und einem vollständigen Unternehmensprofil.",
      category: "Unternehmensnachrichten",
      body: [
        "Träumen Sie von einer unvergesslichen Safari-Erfahrung, die über das Gewöhnliche hinausgeht? Dann sind Sie bei Maisha Quest genau richtig, einem erstklassigen Safari-Unternehmen mit Sitz in Arusha, Tansania, das sich auf maßgeschneiderte Abenteuer spezialisiert hat, die jeden Ihrer Wünsche erfüllen.",
        "Maisha Quest hat es sich zur Aufgabe gemacht, das Safari-Erlebnis neu zu definieren, indem es einzigartige, authentische und nachhaltige Reisen anbietet, die nicht nur die atemberaubenden Landschaften Tansanias zeigen, sondern auch tief in seine reiche Geschichte und vielfältigen Kulturen eintauchen. Mit dem Fokus auf nachhaltige Zielgebietsentwicklung stellt Maisha Quest sicher, dass jede Reise zum Schutz der Tierwelt, zur Bereicherung lokaler Gemeinschaften und zur Förderung Tansanias als lebendiges, dynamisches Reiseziel beiträgt. Ob abenteuerlustiger Entdecker, Erholungssuchender oder Kulturbegeisterter — Maisha Quest hat das passende Paket für Sie. Die Explorer-Pakete sind für Nervenkitzel-Suchende gedacht, die adrenalingeladene Erlebnisse mitten in der Wildnis suchen. Wer abschalten und die Schönheit der Natur genießen möchte, findet in den Escape-Paketen einen ruhigen Rückzugsort inmitten atemberaubender Landschaften. Und wer in die lebendige Kultur und das Stadtleben Tansanias eintauchen möchte, erhält mit den Enrich-Paketen einen tiefen Einblick in die lokalen Bräuche und Traditionen. Neben seinen sorgfältig zusammengestellten Safari-Erlebnissen legt Maisha Quest auch großen Wert auf erstklassigen Kundenservice und darauf, dass jeder Aspekt Ihrer Reise reibungslos organisiert wird. Das Unternehmen befindet sich derzeit im Umzug zu Wix — ein Schritt, der das Website-Monitoring verbessert, die SEO-Fähigkeiten stärkt, die Leistung steigert, die Verwaltung erleichtert und Zugang zu fortschrittlichen Design-Werkzeugen bietet. Die neue Website wird ein elegantes, edles Design bekommen, das an erstklassige Wildnis-Reiseziele erinnert, sowie einen benutzerfreundlichen Bereich, in dem Sie maßgeschneiderte Safari-Formulare ausfüllen und das Unternehmensprofil erkunden können. Wenn Sie also bereit sind, Ihre Safari-Erfahrung auf ein neues Niveau zu heben und die Reise Ihres Lebens anzutreten, vertrauen Sie darauf, dass Maisha Quest ein maßgeschneidertes Abenteuer gestaltet, das alle Ihre Erwartungen übertrifft. Buchen Sie noch heute Ihre maßgeschneiderte Safari und lassen Sie sich wie nie zuvor von der Magie Tansanias verzaubern.",
      ],
    },
    "unleash-your-wanderlust": {
      title: "Lassen Sie Ihrer Fernweh freien Lauf: die Safari-Abenteuer von Maisha Quest warten auf Sie",
      excerpt: "Warum Maisha Quest seine Explorer-, Escape- und Enrich-Pakete auf nachhaltigen Tourismus ausrichtet — und was sich mit dem Umzug des Unternehmens auf eine neue Website ändert.",
      category: "Unternehmensnachrichten",
      body: [
        "Sind Sie bereit für ein einmaliges Safari-Abenteuer, das nicht nur Ihr Fernweh weckt, sondern auch zum Schutz der Tierwelt und zur Bereicherung lokaler Gemeinschaften beiträgt? Dann sind Sie bei Maisha Quest Safari Adventures genau richtig, mitten in der atemberaubenden Landschaft von Arusha, Tansania.",
        "Maisha Quest ist kein gewöhnliches Safari-Unternehmen. Es hat sich zur Aufgabe gemacht, Klischees zu hinterfragen und die reiche Geschichte, die vielfältigen Kulturen und die atemberaubenden Landschaften Afrikas zu zeigen. Mit einem klaren Bekenntnis zu nachhaltigem Tourismus bietet Maisha Quest eine Reihe sorgfältig zusammengestellter Safari-Erlebnisse für verschiedene Reisetypen. Für Abenteuerlustige sind die Explorer-Pakete perfekt geeignet, um in die unberührte Wildnis einzutauchen und der majestätischen Tierwelt Tansanias hautnah zu begegnen. Wer eher Erholung und landschaftliche Schönheit sucht, findet in den Escape-Paketen einen ruhigen Rückzugsort mitten in der Natur. Und wer tief in das kulturelle Geflecht Tansanias eintauchen möchte, erlebt mit den Enrich-Paketen eine wirklich immersive und aufschlussreiche Erfahrung.",
        "Neben unvergesslichen Safari-Erlebnissen setzt sich Maisha Quest auch für die nachhaltige Entwicklung Tansanias als Reiseziel ein. Wer sich für Maisha Quest für sein nächstes Abenteuer entscheidet, tritt nicht nur eine unglaubliche Reise an, sondern trägt auch zum Naturschutz und zur Stärkung lokaler Gemeinschaften bei. Für Maisha Quest stehen spannende Neuigkeiten bevor: Das Unternehmen bereitet den Start einer neuen, verbesserten Website auf Wix vor. Dieser Schritt ermöglicht besseres Monitoring, SEO-Optimierung, verbesserte Leistung, einfachere Verwaltung und Zugang zu erstklassigen Design-Werkzeugen. Das schlichte, edle Design der Website wird die Eleganz führender Reiseseiten widerspiegeln und Besucherinnen und Besuchern ein nahtloses Nutzererlebnis bieten. Eines der zentralen Merkmale der neuen Website wird ein Bereich sein, in dem Reisende maßgeschneiderte Safari-Formulare ausfüllen können, um ihr Erlebnis individuell zu gestalten. Zusätzlich wird ein umfassendes Unternehmensprofil verfügbar sein, damit Besucherinnen und Besucher mehr über die Werte, die Mission und das Engagement von Maisha Quest für nachhaltigen Tourismus erfahren können. Wenn Sie also bereit sind, Ihrem Fernweh freien Lauf zu lassen und ein Safari-Abenteuer wie kein anderes anzutreten, dann warten die Safari-Abenteuer von Maisha Quest auf Sie. Machen Sie sich bereit, die unberührte Schönheit Tansanias zu entdecken, in seine lebendigen Kulturen einzutauchen und einen positiven Beitrag für die Welt zu leisten.",
      ],
    },
    "discover-tanzanias-hidden-gems": {
      title: "Entdecken Sie Tansanias verborgene Schätze: die Safari-Erlebnisse von Maisha Quest",
      excerpt: "Die Explorer-, Escape- und Enrich-Pakete von Maisha Quest und ein erster Blick auf den Umzug des Unternehmens zu einer neu gestalteten, mit Wix gebauten Website.",
      category: "Unternehmensnachrichten",
      body: [
        "Sind Sie eine abenteuerlustige Reisende oder ein abenteuerlustiger Reisender auf der Suche nach einem Safari-Erlebnis wie keinem anderen? Dann sind Sie bei Maisha Quest genau richtig, einem erstklassigen Safari-Unternehmen mit Sitz in Arusha, Tansania, das eine Reihe einzigartiger und nachhaltiger Safari-Erlebnisse anbietet.",
        "Maisha Quest hat es sich zur Aufgabe gemacht, Klischees zu hinterfragen und die reiche Geschichte, die vielfältigen Kulturen und die atemberaubenden Landschaften Afrikas zu zeigen. Mit einem klaren Bekenntnis zu nachhaltiger Zielgebietsentwicklung stellt sich das Unternehmen eine Welt vor, in der jede Reise zum Schutz der Tierwelt beiträgt, lokale Gemeinschaften stärkt und Tansania als spannendes, lebendiges Reiseziel hervorhebt. Ob Abenteuersuchende, Erholungsbegeisterte oder Kulturinteressierte — Maisha Quest hat das passende Safari-Paket für Sie. Von Explorer-Paketen für Nervenkitzel-Suchende über Escape-Pakete für alle, die sich nach Ruhe und Naturschönheit sehnen, bis hin zu Enrich-Paketen für Reisende, die immersive kulturelle Erlebnisse suchen — für jeden ist etwas dabei. Um die Nutzererfahrung zu verbessern und die Abläufe zu straffen, plant der Inhaber von Maisha Quest, die Website zu Wix umzuziehen. Dieser Schritt wird nicht nur Monitoring, SEO-Leistung und Verwaltung verbessern, sondern auch bessere Design-Werkzeuge bieten und Besucherinnen und Besuchern ein eleganteres, edleres Surferlebnis bescheren, ähnlich der bekannten Website Wilderness Destinations. Ein herausragendes Merkmal der kommenden Website wird die Einbindung maßgeschneiderter Safari-Formulare sein, mit denen Besucherinnen und Besucher ihr Safari-Erlebnis individuell gestalten und ihre Reise wirklich unvergesslich machen können. Zusätzlich wird die Website das Unternehmensprofil zeigen und Einblick in das Selbstverständnis, die Werte und das Engagement von Maisha Quest für nachhaltigen Tourismus geben. Wenn Sie also bereit sind, eine Safari-Reise wie nie zuvor anzutreten, halten Sie Ausschau nach der überarbeiteten Website von Maisha Quest, wo Abenteuer, Erholung und kulturelle Eintauchen auf Sie warten. Es ist Zeit, Tansanias verborgene Schätze zu entdecken und Erinnerungen zu schaffen, die ein Leben lang halten.",
      ],
    },
  },

  faq: {
    "best-time-to-visit": {
      question: "Wann ist die beste Reisezeit für Tansania?",
      answer: "Es gibt nicht den einen besten Monat – es gibt den besten Monat für das, was Sie sehen möchten. Juni bis Oktober ist Trockenzeit, mit der einfachsten Tierbeobachtung und ab Juli den Flussüberquerungen in der nördlichen Serengeti. Januar bis März bringt die Geburtszeit auf den südlichen Ebenen und die klarsten Monate für den Kilimandscharo. November bis Mai ist die grüne Jahreszeit: weniger Fahrzeuge, dramatische Himmel, hervorragende Vogelwelt und weiter verteiltes Wild. Nennen Sie uns Ihre Termine, und wir sagen Ihnen ehrlich, wofür sie gut sind.",
    },
    "how-far-in-advance": {
      question: "Wie lange im Voraus sollten wir buchen?",
      answer: "Die Camps und Lodges, in denen es sich zu wohnen lohnt, sind klein, und die am besten gelegenen sind zuerst ausgebucht – besonders für die Überquerungen in der nördlichen Serengeti und für Reisen über Weihnachten und Neujahr. Stehen Ihre Termine fest, beginnen Sie das Gespräch früh. Sind sie flexibel, haben wir mehr Spielraum.",
    },
    "what-does-private-mean": {
      question: "Was bedeutet eine „private“ Safari tatsächlich?",
      answer: "Ihr eigenes Fahrzeug, Ihr eigener Guide und eine Reiseroute, die allein Ihrer Gruppe gehört. Sie entscheiden, wann Sie morgens aufbrechen, wie lange Sie bei einem Tier bleiben und wann Sie zum Essen anhalten. Sie teilen kein Fahrzeug mit Fremden und folgen keiner festen Gruppenabreise.",
    },
    "single-travellers": {
      question: "Nehmen Sie Alleinreisende und kleine Gruppen?",
      answer: "Ja. Jede Reise, die wir entwerfen, ist privat – ob für einen Reisenden oder eine zehnköpfige Familie. In den meisten Camps und Lodges fällt ein Einzelzimmerzuschlag an, und wir zeigen Ihnen dessen Höhe, bevor Sie sich zu irgendetwas verpflichten.",
    },
    "children": {
      question: "Können wir mit Kindern reisen?",
      answer: "Ja, und Familienreisen gehören zu dem, was wir am häufigsten planen. Manche Camps setzen ein Mindestalter, und einige Aktivitäten – vor allem Fußsafaris – haben Altersgrenzen. Wir prüfen das für Ihre Familie, bevor wir etwas vorschlagen, nicht danach.",
    },
    "visa-and-entry": {
      question: "Brauchen wir ein Visum?",
      answer: "Die meisten Besucher benötigen für die Einreise nach Tansania ein Visum, das für viele Staatsangehörigkeiten vorab online über die tansanische Einwanderungsbehörde beantragt werden kann. Die Anforderungen hängen von Ihrem Reisepass ab und ändern sich gelegentlich – prüfen Sie daher kurz vor der Reise die offizielle Einwanderungsseite für Ihr Land. Bei der Buchung verweisen wir Sie darauf.",
    },
    "vaccinations": {
      question: "Wie steht es um Impfungen und Malaria?",
      answer: "Tansania ist Malariagebiet, und ein Gelbfieber-Nachweis ist erforderlich, wenn Sie aus einem Land mit Gelbfieberrisiko einreisen. Was Sie brauchen, hängt von Ihrer Gesundheit, Ihrer Route und Ihrem Abflugort ab – sprechen Sie rechtzeitig vor der Abreise mit einer reisemedizinischen Praxis oder Ihrer Ärztin oder Ihrem Arzt. Medizinische Beratung können wir nicht geben.",
    },
    "languages": {
      question: "In welchen Sprachen arbeiten Sie?",
      answer: "Wir planen und begleiten auf Englisch und Suaheli, und Talisa spricht zusätzlich Russisch und Mandarin. Für andere Sprachen sagen wir Ihnen klar, was wir organisieren können, statt einen Guide zu versprechen, den wir nicht stellen können.",
    },
    "what-to-pack": {
      question: "Was sollten wir einpacken?",
      answer: "Gedeckte Farben, Schichten für kalte frühe Morgen und warme Mittage, einen ordentlichen Hut, ein Fernglas und mehr Speicherkarten, als Sie für nötig halten. Inlandsflüge zwischen den Parks haben strenge Gepäckgrenzen, meist für weiche Taschen. Sie erhalten eine Packliste, die auf Ihre konkrete Route zugeschnitten ist.",
    },
    "how-to-start": {
      question: "Wie läuft die Planung einer Reise mit Ihnen ab?",
      answer: "Sie sagen uns ungefähr wann, ungefähr wie lange und was Ihnen wichtig ist. Wir kommen mit einem Routenvorschlag zurück und einer ehrlichen Einschätzung dessen, was er kostet und bedeutet. Sie ändern ihn so oft, wie Sie möchten. Nichts wird bestätigt, bevor Sie zufrieden sind.",
    },
  },

  team: {
    "talisa-tufts": {
      role: "Gründerin",
      bio: "Talisa gründete Maisha Quest nach einer Laufbahn im internationalen Tourismus und in der Hotellerie. Sie spricht Englisch, Swahili, Russisch und Mandarin — deshalb werden Reisende aus Moskau oder Shanghai von Anfang an in ihrer eigenen Sprache betreut.",
      specialty: "Reisegestaltung und mehrsprachige Gästebetreuung",
      favouritePlace: null,
    },
    "frank-lyatuu": {
      role: "Mitgründer — Betrieb",
      bio: "Frank stammt aus Arusha, und die Routen, die Maisha Quest fährt, kennt er, weil er sie selbst gefahren ist. Er verantwortet Betrieb, Gastfreundschaft und das Praktische einer Safari: die Fahrzeuge, die Zeiten, die Menschen an jedem Parktor.",
      specialty: "Safari-Betrieb und Ortskenntnis",
      favouritePlace: null,
    },
    "tina-ngabo": {
      role: "Mitgründerin — Gästeerlebnis",
      bio: "Tina bringt internationale Hotellerie-Erfahrung in den Teil der Reise ein, den Gäste am stärksten spüren: wie man sich um sie kümmert. Sie sorgt dafür, dass die Kleinigkeit, die Sie einmal in einer E-Mail erwähnt haben, in Tansania auf Sie wartet.",
      specialty: "Gästeerlebnis und Servicestandards",
      favouritePlace: null,
    },
  },

  impact: {
    "maisha-quest-cares": {
      title: "Maisha Quest Cares — Programm für gefährdete Jugendliche",
      description: "Ein Programm für Jugendliche, die vom Weg abgekommen sind – nach dem Verlust der Eltern, durch zerrüttete Familien oder schwierige Umstände –, von denen viele auf der Straße landen und Kriminalität und Drogenmissbrauch ausgesetzt sind. Es bietet ein sicheres Zuhause mit Verpflegung und Unterkunft; Ausbildung in Handwerksberufen mit Partnern aus Bereichen wie Kfz-Technik, Schreinerei, Schneiderei, Kunsthandwerk, Gastgewerbe und Landwirtschaft; gesponserte Ausbildung und Mentoring, das Ausbildungskosten und Schulgebühren abdeckt; sowie fortlaufende Unterstützung, damit jeder junge Mensch Selbstwertgefühl, ein Gefühl von Sinn und Hoffnung für die Zukunft aufbauen kann.",
      location: null,
    },
    empowerment: {
      title: "Empowerment — faire Beschäftigung für junge Tansanier",
      description: "Das eigene Team von Maisha Quest – Guides, Fahrer, Köche und Büropersonal – wird in Tansania eingestellt und ausgebildet. Das Unternehmen beschreibt faire Beschäftigung, Kompetenzentwicklung und ein unterstützendes Arbeitsumfeld für seine Mitarbeitenden als ebenso wichtigen Maßstab seiner Arbeit wie die Reisen, die es für seine Gäste gestaltet, und erklärt, in junge Tansanier zu investieren, die im Tourismus über Maisha Quest hinaus Führungsrollen übernehmen werden.",
      location: "Arusha, Tansania",
    },
  },

  learnTopics: {
    geography: {
      name: "Geografie & Natur",
      description: "Tansania vereint in einem Land eine ungewöhnliche Bandbreite an Ökosystemen: den schneebedeckten Gipfel des Kilimandscharo, die offenen Ebenen der Serengeti, die tiefen Gewässer des Tanganjikasees und die Korallenriffe vor Sansibar. Der Ngorongoro-Krater, die größte intakte Vulkancaldera der Welt, wird manchmal „Afrikas Garten Eden“ genannt – wegen der Wildtierdichte, die sein Boden trägt, einschließlich der Big Five. Im Norden ist das stark alkalische Wasser des Natronsees für fast alles Leben lebensfeindlich, dient aber Millionen Flamingos als Brutstätte.",
    },
    culture: {
      name: "Kultur",
      description: "Suaheli und Englisch sind Tansanias Amtssprachen, doch das Land ist Heimat von mehr als 120 ethnischen Gruppen, jede mit eigener Sprache und eigenen Traditionen. Tansanische Kunst ist international für den Tinga-Tinga-Malstil bekannt – leuchtende, stilisierte Darstellungen von Tieren und Alltag – sowie für die Holzschnitzkunst der Makonde. Die Massai erkennt man an ihrem leuchtend bunten Shuka-Tuch, das über den Schultern getragen wird.",
    },
    history: {
      name: "Geschichte",
      description: "Die Olduvai-Schlucht, manchmal „Wiege der Menschheit“ genannt, ist eine der bedeutendsten paläoanthropologischen Fundstätten der Welt. 1871 traf der Forscher Henry Morton Stanley den Missionar Dr. David Livingstone in Ujiji, am Ufer des Tanganjikasees. Zwischen 1905 und 1907 vereinte der Maji-Maji-Aufstand mehrere ethnische Gruppen gegen die deutsche Kolonialherrschaft – einer der bedeutendsten Aufstände jener Zeit in Ostafrika.",
    },
    "wildlife-and-conservation": {
      name: "Tierwelt & Naturschutz",
      description: "Jedes Jahr ziehen Tausende Elefanten zwischen der Serengeti und dem Tarangire-Nationalpark – Teil einer der größten Elefantenwanderungen Afrikas. Tansania hat auch beim Schutz des Spitzmaulnashorns und des Afrikanischen Wildhundes echte Fortschritte gemacht. Im Gombe-Stream-Nationalpark am Ufer des Tanganjikasees begann Dr. Jane Goodall in den 1960er-Jahren ihre Forschung an wildlebenden Schimpansen – Forschung, die dort bis heute fortgesetzt wird.",
    },
    economy: {
      name: "Wirtschaft & Entwicklung",
      description: "Landwirtschaft ist das Rückgrat der tansanischen Wirtschaft und beschäftigt den Großteil der Bevölkerung; das Land zählt zu den weltweit größten Produzenten von Gewürznelken und Sisal. Tansania ist zudem der einzige Ort der Erde, an dem Tansanit gefunden wird – abgebaut in den Mererani-Hügeln nahe dem Kilimandscharo und geschätzt für seine tiefblau-violette Farbe.",
    },
    festivals: {
      name: "Kulturelle Veranstaltungen & Feste",
      description: "Das Wanyambo-Festival, jährlich in Bukoba am Viktoriasee ausgerichtet, feiert die Kultur der Haya mit traditionellem Tanz, Musik und Speisen. Das Karibu-Musikfestival in Bagamoyo ist eines der größten Musikereignisse Ostafrikas und mischt traditionelle mit zeitgenössischer afrikanischer Musik.",
    },
  },

  regions: {
    northern: {
      name: "Nordregion",
      description: "Heimat von mehr als 120 ethnischen Gruppen, darunter die Massai, die Chagga an den Hängen des Kilimandscharo und die Hadza, eines der letzten Jäger-und-Sammler-Völker Afrikas. Dies ist Tansanias bekanntestes Safari-Gebiet: Hier erhebt sich der Kilimandscharo, Afrikas höchster Berg, mit fünf verschiedenen Klimazonen; die Serengeti ist Schauplatz der jährlichen Großen Tierwanderung; und die Olduvai-Schlucht, die Wiege der Menschheit, hat Fossilien menschlicher Vorfahren von bis zu 3,6 Millionen Jahren hervorgebracht. Nordtansania stand bis zum Ersten Weltkrieg unter deutscher Kolonialherrschaft, danach bis zur Unabhängigkeit 1961 unter Julius Nyerere als britisches Mandatsgebiet.",
    },
    "central-southern": {
      name: "Zentral- & Südregion",
      description: "Die Gogo sind die dominierende Gruppe rund um die Hauptstadt Dodoma, traditionell Viehhirten und Bauern; weiter südlich leben die Yao, die Makonde – berühmt für ihre Holzschnitzkunst –, die Ngoni und die Hehe. Dodoma wurde 1973 Tansanias Hauptstadt, Teil eines Plans zur Entwicklung des Landesinneren. Weiter südlich ist das Selous-Wildreservat (heute größtenteils Nyerere-Nationalpark) eines der größten Wildreservate der Welt und UNESCO-Weltkulturerbe, Heimat großer Elefanten- und Wildhundpopulationen entlang des Rufiji-Flusses; der Ruaha-Nationalpark, Tansanias größter, ist für seine Löwenrudel bekannt. Die vorgelagerte Stadtrepublik Kilwa Kisiwani, ebenfalls UNESCO-Weltkulturerbe, handelte vom 9. bis 15. Jahrhundert über den Indischen Ozean mit Gold, Elfenbein und Sklaven.",
    },
    "lake-zone-western": {
      name: "Seenregion & Westregion",
      description: "Rund um den Viktoriasee, Afrikas größten See, leben die Sukuma – Tansanias größte ethnische Gruppe – neben den Haya, bekannt für Bananen- und Kaffeeanbau, sowie Fischergemeinschaften, die von Nilbarsch und Tilapia leben. Am Tanganjikasee, einem der ältesten und tiefsten Seen der Welt, fischen manche Gemeinschaften nachts noch immer von Einbaumkanus aus mit Laternen. Mwanza, die „Felsenstadt“ am Ufer des Viktoriasees, ist das wirtschaftliche Zentrum der Region; die Nationalparks Gombe Stream und Mahale Mountains, beide am Tanganjikasee, zählen zu den besten Orten Afrikas für Schimpansen-Trekking. Maisha Quest veröffentlicht für diese Region noch keine eigene Zielseite.",
    },
    coastal: {
      name: "Küstenregion",
      description: "Die Suaheli leben seit Jahrhunderten an Tansanias Festlandküste, eine Kultur, die afrikanische, arabische und persische Einflüsse verbindet und sich in der Taarab-Musik sowie in Gerichten wie Pilau und Mandazi ausdrückt. Daressalam, die größte Stadt des Landes, ist sein wirtschaftliches Zentrum; Bagamoyo, einst Hauptstadt Deutsch-Ostafrikas, und Kilwa Kisiwani, eine Suaheli-Stadtrepublik und UNESCO-Weltkulturerbe, sind geschichtsträchtige Orte. Der Saadani-Nationalpark, an der Küste nördlich von Daressalam, ist Tansanias einziges direkt am Ozean gelegenes Wildreservat. Maisha Quest veröffentlicht für diese Region noch keine eigene Zielseite.",
    },
    "zanzibar-island": {
      name: "Insel Sansibar",
      description: "Bekannt als Gewürzinsel, besteht Sansibar aus den beiden Hauptinseln Unguja und Pemba, rund 25 bis 50 Kilometer vor der tansanischen Festlandküste. Die Bevölkerung ist überwiegend suaheli-sprachig und muslimisch, mit afrikanischen, arabischen, persischen und indischen Wurzeln, die sich in der Taarab-Musik sowie in der arabesken Architektur und den geschnitzten Holztüren von Stone Town widerspiegeln – Stone Town ist UNESCO-Weltkulturerbe. Arabische Händler ließen sich hier ab dem 8. Jahrhundert nieder; im 19. Jahrhundert wurden die Inseln unter dem Sultanat Oman zu einem Zentrum des Gewürzhandels und kurz darauf britisches Protektorat, bevor sie 1963 unabhängig wurden und sich 1964 mit Tanganjika zu Tansania vereinigten. Im Jozani-Wald lebt der endemische Sansibar-Stummelaffe.",
    },
  },
};
