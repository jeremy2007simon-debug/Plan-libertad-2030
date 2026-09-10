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
      summary: "Ein sechster Tag, ergänzt zur Camping-Safari durch die Nordroute. Die Quellseite für genau dieses Reiseprogramm ist auf maishaquest.com nicht korrekt verlinkt — siehe die Anmerkung zu Tag 6.",
      overview: "Der bestätigte Inhalt für die Tage 1 bis 5 entspricht der 5-tägigen Camping-Safari durch die Nordroute. Tag 6 muss vor der Veröffentlichung direkt mit Maisha Quest bestätigt werden.",
      travellerProfile: "Abenteurer, die ein ausgewogenes Reiseprogramm ohne Hetze suchen",
      bestTime: "Von Maisha Quest nicht angegeben",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Unterkunft", value: "Camping — verfügbar in Luxus-, Mittel- oder Budgetklasse" },
        { label: "Ausstehend", value: "Das Reiseprogramm für Tag 6 ist nicht bestätigt — die Quellseite verlinkt stattdessen auf das 5-Tage-Paket" },
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
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, wird auf der Quellseite nicht bestätigt" },
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
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, wird auf der Quellseite nicht bestätigt" },
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
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, wird auf der Quellseite nicht bestätigt" },
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
        { label: "Ausstehend", value: "Der Eyasi-See hat auf dieser Website noch keine eigene Zielseite — siehe die Learn-/Regionen-Prüfung" },
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
        { label: "Ausstehend", value: "Ob der Inlandsflug nach Sansibar im Preis enthalten ist, wird auf der Quellseite nicht bestätigt" },
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
        { label: "Ausstehend", value: "Der Eyasi-See hat auf dieser Website noch keine eigene Zielseite — siehe die Learn-/Regionen-Prüfung" },
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
        { label: "Ausstehend", value: "Der Eyasi-See hat auf dieser Website noch keine eigene Zielseite — siehe die Learn-/Regionen-Prüfung" },
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
        { label: "Ausstehend", value: "Der Eyasi-See hat auf dieser Website noch keine eigene Zielseite — siehe die Learn-/Regionen-Prüfung" },
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
      overview: "Ein zwölftägiges Enrich-Programm. Anmerkung: Die Paketbeschreibung auf maishaquest.com verspricht zudem Strandzeit auf Sansibar, die das veröffentlichte Tag-für-Tag-Programm nicht enthält — zur Bestätigung durch den Kunden markiert, welche Angabe korrekt ist.",
      travellerProfile: "Reisende, die Tierwelt, Erholung und Kultur kombiniert suchen",
      bestTime: "Ganzjährig",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Ballonsafari (optional, an Tag 7)"],
      practicalInfo: [
        { label: "Unterkunft", value: "Lodge — verfügbar in Luxus-, Mittel- oder Budgetklasse" },
        { label: "Ausstehend", value: "Die Paketbeschreibung verspricht eine Sansibar-Etappe, die das Tag-für-Tag-Programm nicht enthält — mit dem Kunden klären, welche Angabe korrekt ist" },
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

  experiences: {
    "game-drives": {
      name: "Pirschfahrten",
      shortDescription: "Eigenes Fahrzeug, offenes Dach und ein Guide, der die Spuren liest.",
      description: "Das Herz einer Safari in Tansania. Sie fahren im eigenen Fahrzeug mit Ihrem eigenen Guide — Sie bestimmen also das Tempo: zwei Stunden bei einem Leoparden bleiben, wenn das Licht stimmt, oder weiterfahren. Früh am Morgen und am späten Nachmittag ist auf der Ebene am meisten los.",
    },
    "great-migration": {
      name: "Die Große Tierwanderung",
      shortDescription: "Den Herden folgen, abgestimmt darauf, wo sie wirklich sind.",
      description: "Fast zwei Millionen Gnus und Zebras ziehen in einem langsamen Jahreskreis durch das Serengeti-Ökosystem. Es gibt keine einzelne „Migrationssaison“ — es gibt einen Ort, an dem die Herden in Ihrem Reisemonat sein sollten, und wir bauen die Route darum herum statt um ein festes Programm.",
    },
    "mobile-camping": {
      name: "Mobiles Camping",
      shortDescription: "Ein Camp, das sich mit den Tieren bewegt, nicht gegen sie.",
      description: "Zeltdach, ein richtiges Bett, eine Eimerdusche unter Sternen und ein Camp, das zusammenpackt und den Herden folgt. Näher kommt man der ursprünglichen Art zu reisen nicht — ohne jede Unbequemlichkeit, die Sie sich vielleicht vorstellen.",
    },
    "walking-safari": {
      name: "Walking-Safari",
      shortDescription: "Dieselbe Landschaft, mit drei Kilometern pro Stunde.",
      description: "Zu Fuß, mit bewaffnetem Ranger und Walking-Guide, ändert die Safari den Maßstab: Spuren, Dung, Vogelstimmen, der Geruch des Busches. Sie sehen weniger Tiere und verstehen sehr viel mehr. Möglich in Tarangire, Nyerere und Ruaha sowie am Fuß des Kilimandscharo.",
    },
    "balloon-safari": {
      name: "Ballonsafari",
      shortDescription: "Das erste Licht über der Serengeti, aus dreihundert Metern.",
      description: "Start im Morgengrauen, eine Stunde fast lautloses Treiben über der Ebene und Frühstück im Gras dort, wo Sie landen. Es ist der eine Zusatz, den fast niemand bereut — und er will lange im Voraus gebucht sein.",
    },
    "photographic-safari": {
      name: "Fotosafari",
      shortDescription: "Gebaut um Licht, Position und Geduld.",
      description: "Routen und Tageszeiten rund um die goldene Stunde, Fahrzeugposition zur Sonne, Bohnensäcke statt Stative und Guides, die es gewohnt sind, mit Fotografierenden zu arbeiten. Langsamere Tage, weniger Parks, bessere Bilder.",
    },
    "beach-and-ocean": {
      name: "Strand & Ozean",
      shortDescription: "Der Indische Ozean, nach dem Staub der Ebene.",
      description: "Sansibar und die kleineren Inseln vor der Küste: warmes flaches Wasser, Dhau-Segel im Sonnenuntergang, Riffe zum Schnorcheln oder Tauchen. Es ist die natürliche zweite Hälfte einer Safari — und diejenige, um die die meisten Paare ihre Hochzeitsreise bauen.",
    },
    "family-safari": {
      name: "Familiensafari",
      shortDescription: "Im Tempo der Kinder, ohne für Erwachsene langweilig zu werden.",
      description: "Kürzere Fahrten, Familieneinheiten statt getrennter Zimmer, Guides, die die Aufmerksamkeit einer Siebenjährigen halten können, und Parks nah genug beieinander, dass niemand einen ganzen Tag im Auto sitzt. Mindestalter unterscheiden sich je nach Camp — wir prüfen sie, bevor wir etwas vorschlagen.",
    },
    "cultural-encounters": {
      name: "Kulturelle Begegnungen",
      shortDescription: "Zeit mit Gemeinschaften, zu ihren Bedingungen.",
      description: "Besuche, direkt mit den beteiligten Gemeinschaften vereinbart, zu Zeiten, die ihnen passen, und mit einem fairen Anteil dessen, was Sie zahlen, der vor Ort bleibt. Maasai- und Datoga-Gemeinschaften nahe dem Ngorongoro-Hochland, Chagga-Dörfer an den Hängen des Kilimandscharo und die Swahili-Altstadt Stone Town auf Sansibar.",
    },
    "coffee-and-cuisine": {
      name: "Kaffee & Küche",
      shortDescription: "Tansania über das, was es anbaut und kocht.",
      description: "Kaffee an den Hängen, wo er wächst, Gewürzfarmen vor Stone Town, eine Swahili-Küche, ein Markt in Arusha. Kleine, unaufgeregte halbe Tage, die mehr über das Land erzählen als eine weitere Pirschfahrt.",
    },
    "kilimanjaro-trek": {
      name: "Kilimandscharo-Besteigung",
      shortDescription: "Fünf Klimazonen, ein Berg, eine Woche.",
      description: "Machame, Lemosho, Rongai oder Marangu — die richtige Route hängt davon ab, wie viel Zeit Sie haben, wie Sie sich akklimatisieren und wie sich der Aufstieg anfühlen soll. Den zusätzlichen Akklimatisierungstag planen wir standardmäßig ein, nicht als Aufpreis.",
    },
    "safari-and-zanzibar": {
      name: "Safari & Sansibar",
      shortDescription: "Erst die Ebene, dann das Meer. Die klassische Kombination.",
      description: "Die meistgefragte Form einer Tansania-Reise: der nördliche Circuit und danach ein kurzer Flug nach Osten an die Küste. Genug Tage auf beiden Seiten, damit keine Hälfte gehetzt wirkt, und ein Team, das den Übergang dazwischen übernimmt.",
    },
    "boat-safari": {
      name: "Bootssafari",
      shortDescription: "Tiere vom Wasser aus, auf dem Rufiji.",
      description: "In Nyerere ist der Fluss die Straße. Der späte Nachmittag auf dem Rufiji bringt Flusspferde, Krokodile, Elefanten, die zum Trinken herunterkommen, und eine dreistellige Vogelliste — vom Boot aus, auf Augenhöhe.",
    },
    "birdwatching": {
      name: "Vogelbeobachtung",
      shortDescription: "Über tausend Arten und Guides, die die Rufe kennen.",
      description: "Tansanias Vogelliste ist eine der längsten Afrikas. Der Lake Manyara, die Seen des Rift Valley und die südlichen Parks in der grünen Saison sind das stärkste Terrain, und die Monate November bis April bringen die Zugvögel.",
    },
    "conservation": {
      name: "Naturschutztage",
      shortDescription: "Ein Tag mit denen, die die Arbeit machen.",
      description: "Zeit mit Rangern, Forschenden und gemeindebasierten Schutzprojekten — verstehen, was der Schutz dieser Ökosysteme tatsächlich bedeutet, statt ihn aus dem Fahrzeug zu betrachten.",
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
    "when-to-see-the-great-migration": {
      title: "Wo die Tierwanderung wirklich steht, Monat für Monat",
      excerpt: "Es gibt keine Migrationssaison — es gibt einen Ort, an dem die Herden in Ihrem Reisemonat sein sollten. Für jeden Monat eine klare Antwort und was das für Ihre Übernachtungen bedeutet.",
      category: "Planung",
    },
    "choosing-a-kilimanjaro-route": {
      title: "Die richtige Kilimandscharo-Route wählen",
      excerpt: "Lemosho, Machame, Rongai oder Marangu. Entscheidend sind das Akklimatisierungsprofil und wie viele Tage Sie dem Berg geben können — nicht eine Schwierigkeitsskala.",
      category: "Kilimandscharo",
    },
    "green-season-tanzania": {
      title: "Eine Verteidigung der grünen Saison",
      excerpt: "November bis Mai wird als Regenzeit abgetan. Was Sie tatsächlich bekommen: leere Parks, außergewöhnliche Himmel, Jungtiere und die beste Vogelbeobachtung des Jahres.",
      category: "Planung",
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
      bio: "Talisa gründete Maisha Quest nach einer Laufbahn im internationalen Tourismus und in der Hotellerie. Sie spricht vier Sprachen — deshalb werden Reisende aus Moskau, Shanghai und Madrid in ihrer eigenen betreut, und deshalb braucht das erste Gespräch über Ihre Reise selten einen Dolmetscher.",
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
    "education": {
      title: "Bildungsförderung",
      description: "Schulen in der Nähe der Gemeinden, durch die diese Reisen führen: die praktischen Dinge, die einem Klassenzimmer fehlen, und die Kosten, die Kinder davon fernhalten.",
      location: null,
    },
    "conservation": {
      title: "Wildtierschutz",
      description: "Die Naturschutzteams in den Ökosystemen, von denen diese Reisen leben – und die Möglichkeit, einen Tag mit ihnen zu verbringen, statt nur darüber zu lesen.",
      location: null,
    },
    "community": {
      title: "Partnerschaft mit Gemeinschaften",
      description: "Gemeindebesuche, direkt mit den Gastgebenden vereinbart – zu Zeiten, die ihnen passen, und nicht zu Zeiten, die einem Reisebus passen.",
      location: null,
    },
    "local-employment": {
      title: "Arbeit vor Ort",
      description: "Guides, Fahrer, Köche und Büropersonal werden in Tansania eingestellt. Am Kilimandscharo gehört zur Auswahl einer Bergmannschaft, wie sie bezahlt wird und wie viel sie trägt.",
      location: "Arusha, Tansania",
    },
  },
};
