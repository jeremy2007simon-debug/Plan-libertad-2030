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
 * organizaciones (KPAP).
 *
 * ⚠️ INTERNO: traducción completa a nivel técnico, PENDIENTE de revisión
 * final por un hablante nativo antes de publicar en producción. No se
 * presenta como traducción jurada ni certificada.
 */

import type { ContentDictionary } from "./en";

export const deContent: ContentDictionary = {
  safaris: {
    "serengeti-ngorongoro-journey": {
      name: "Serengeti- und Ngorongoro-Reise",
      summary: "Die Nordroute in Ruhe: Baobab-Land, die endlosen Ebenen und im Morgengrauen die Fahrt hinab in den Krater. Durchgehend Lodges, durchgehend ein eigenes Fahrzeug.",
      overview: "So sieht die Reise aus, nach der die meisten Tansania-Erstbesucher suchen – richtig gemacht: drei Parks statt fünf, mindestens zwei Nächte in jedem und kein Tag, der Sie sechs Stunden ins Fahrzeug setzt. Sie enden im Ngorongoro-Hochland und fliegen ab Arusha zurück.",
      travellerProfile: "Paare und Reisende auf ihrer ersten Safari",
      bestTime: "Juni – Oktober sowie Januar – März",
      included: ["Privater 4x4-Safariwagen mit offenem Dach und Maisha-Quest-Guide","Sämtliche Park- und Schutzgebietsgebühren","Unterkunft wie aufgeführt, mit Vollpension","Trinkwasser während der gesamten Safari","Flughafentransfers bei An- und Abreise","Flying-Doctors-Evakuierungsschutz"],
      notIncluded: ["Internationale Flüge und Visum für Tansania","Reise- und Krankenversicherung","Ballonsafari und weitere optionale Aktivitäten","Getränke außer Wasser sowie persönliche Ausgaben","Trinkgelder für Guide und Camp-Personal"],
      practicalInfo: [
        {"label":"Gruppengröße","value":"Private Abreise – nur Ihre Gruppe"},
        {"label":"Fahrzeug","value":"4x4 mit offenem Dach, garantierter Fensterplatz"},
        {"label":"Fahrtzeit","value":"Die längste Einzelstrecke dauert rund 4 Stunden"},
        {"label":"Kondition","value":"Keine besondere Kondition erforderlich"},
      ],
      days: [
        {"title":"Ankunft in Arusha","route":"Kilimanjaro International Airport → Arusha","activities":["Empfang am Flughafen durch Ihren Maisha-Quest-Guide","Transfer nach Arusha und Bezug der Unterkunft","Reisebesprechung beim Abendessen und Blick auf die kommenden Tage"],"estimatedDuration":"1 Std. Transfer"},
        {"title":"Hinein nach Tarangire","route":"Arusha → Tarangire-Nationalpark","activities":["Fahrt am Vormittag nach Süden durch Weideland der Massai","Nachmittägliche Pirschfahrt entlang des Tarangire-Flusses","Sonnenuntergang zwischen den Baobabs"],"estimatedDuration":"2,5 Std. Fahrt, 3 Std. Pirschfahrt"},
        {"title":"Von Tarangire in die Serengeti","route":"Tarangire → Serengeti-Nationalpark","activities":["Früher Aufbruch durch das Ngorongoro-Schutzgebiet","Picknick am Naabi Hill, am Tor zu den Ebenen","Nachmittägliche Pirschfahrt in die zentrale Serengeti"],"estimatedDuration":"Ganzer Reisetag mit Tierbeobachtung unterwegs"},
        {"title":"Die endlosen Ebenen","route":null,"activities":["Ganzer Tag in der Serengeti, nach dem Licht getaktet","Kopjes und Flusslinien, an denen die Katzen ruhen","Optionaler Ballonflug im Morgengrauen, vorab zu buchen"],"estimatedDuration":"Ganzer Tag"},
        {"title":"Von der Serengeti an den Kraterrand","route":"Serengeti → Ngorongoro-Schutzgebiet","activities":["Letzte Pirschfahrt am Morgen in den Ebenen","Auffahrt ins Ngorongoro-Hochland","Später Nachmittag am Kraterrand"],"estimatedDuration":"4 Std. Fahrt mit Stopps"},
        {"title":"Hinab in den Krater","route":"Grund des Ngorongoro-Kraters","activities":["Abfahrt zum Kraterboden im ersten Licht","Pirschfahrt am Kraterboden – die dort lebenden Tiere wandern nicht ab","Nachmittags zurück am Rand oder Besuch einer Massai-Gemeinschaft"],"estimatedDuration":"6 Std. am Kraterboden"},
        {"title":"Zurück nach Arusha","route":"Ngorongoro → Arusha → Kilimanjaro International Airport","activities":["Gemächliches Frühstück am Kraterrand","Rückfahrt nach Arusha mit Kaffeepause","Transfer zum Flughafen für Ihren Rückflug"],"estimatedDuration":"4 Std. Fahrt"},
      ],
    },
    "serengeti-under-canvas": {
      name: "Serengeti unter Zeltdach",
      summary: "Ein mobiles Camp, das mit den Herden zieht, lange Tage im Feld und Nächte unter Zeltdach dort, wo die Tiere tatsächlich sind.",
      overview: "Das Camp wird abgebaut und folgt der Migration – Sie wachen also dort auf, wo die Tiere sind, statt zwei Stunden zu ihnen zu fahren. Bequeme Zelte, richtige Betten, heißes Wasser – und nichts zwischen Ihnen und der Ebene.",
      travellerProfile: "Aktive Reisende und wiederkehrende Safarigäste",
      bestTime: "Januar – März zur Geburtszeit, Juli – Oktober für die Überquerungen im Norden",
      included: ["Privater 4x4-Safariwagen mit offenem Dach und Maisha-Quest-Guide","Sämtliche Park- und Schutzgebietsgebühren","Unterkunft im mobilen Camp mit Vollpension","Camp-Personal und Trinkwasser während der gesamten Reise","Flughafentransfers bei An- und Abreise"],
      notIncluded: ["Internationale Flüge und Visum für Tansania","Reise- und Krankenversicherung","Ballonsafari und weitere optionale Aktivitäten","Getränke außer Wasser sowie persönliche Ausgaben","Trinkgelder für Guide und Camp-Personal"],
      practicalInfo: undefined,
      days: [],
    },
    "serengeti-and-zanzibar": {
      name: "Serengeti & Sansibar",
      summary: "Erst die Ebenen, dann der Indische Ozean. Sechs Tage Safari, vier an der Küste – und ein Team, das den Übergang dazwischen übernimmt.",
      overview: "Die meistgefragte Form einer Tansania-Reise, mit genügend Nächten auf beiden Seiten, damit sich keine der beiden Hälften gehetzt anfühlt. Sie fliegen von der Serengeti direkt nach Sansibar, statt über Arusha zurückzufahren.",
      travellerProfile: "Paare und Hochzeitsreisende",
      bestTime: "Juni – Oktober sowie Dezember – Februar",
      included: ["Privater 4x4-Safariwagen mit offenem Dach und Maisha-Quest-Guide","Sämtliche Park- und Schutzgebietsgebühren","Inlandsflug von der Serengeti nach Sansibar","Unterkunft wie aufgeführt – Vollpension auf Safari, Übernachtung mit Frühstück an der Küste","Sämtliche Flughafen- und Hoteltransfers"],
      notIncluded: ["Internationale Flüge und Visum für Tansania","Reise- und Krankenversicherung","Mahlzeiten außer den aufgeführten sowie persönliche Ausgaben","Wassersport und optionale Ausflüge auf Sansibar","Trinkgelder für Guide und Camp-Personal"],
      practicalInfo: undefined,
      days: [],
    },
    "tanzania-in-depth": {
      name: "Tansania im Detail",
      summary: "Kaffee an den Hängen, an denen er wächst, Tage bei Massai- und Chagga-Gemeinschaften, ein Naturschutzteam im Einsatz – und die Tierwelt ebenso.",
      overview: "Für Reisende, die das Land verstehen wollen, statt eine Liste abzuhaken. Etwa die Hälfte der Tage verbringen Sie mit Menschen statt mit Tieren – und die Safaritage gewinnen dadurch.",
      travellerProfile: "Neugierige Reisende und Familien mit älteren Kindern",
      bestTime: "Juni – Oktober",
      included: ["Privater 4x4-Safariwagen mit offenem Dach und Maisha-Quest-Guide","Sämtliche Park- und Schutzgebietsgebühren","Direkt vereinbarte Gemeindebesuche, deren Gebühren an die Gemeinschaften gehen","Unterkunft wie aufgeführt, mit Vollpension","Sämtliche Transfers"],
      notIncluded: ["Internationale Flüge und Visum für Tansania","Reise- und Krankenversicherung","Getränke außer Wasser sowie persönliche Ausgaben","Trinkgelder für Guide und Camp-Personal"],
      practicalInfo: undefined,
      days: [],
    },
    "southern-wild": {
      name: "Wilder Süden: Nyerere & Ruaha",
      summary: "Bootssafaris auf dem Rufiji, Wanderungen im Baobab-Land und zwei Parks, die einen Bruchteil der Fahrzeuge der Nordroute sehen.",
      overview: undefined,
      travellerProfile: "Wiederkehrende Safarireisende, die Weite suchen",
      bestTime: "Juni – Oktober",
      included: ["Inlandsflüge zwischen Daressalam, Nyerere und Ruaha","Sämtliche Parkgebühren","Unterkunft im Zeltcamp mit Vollpension","Pirschfahrten, Fußsafaris und Bootssafaris laut Programm"],
      notIncluded: ["Internationale Flüge und Visum für Tansania","Reise- und Krankenversicherung","Getränke außer Wasser sowie persönliche Ausgaben","Trinkgelder für Guide und Camp-Personal"],
      practicalInfo: undefined,
      days: [],
    },
    "kilimanjaro-lemosho": {
      name: "Kilimandscharo: die Lemosho-Route",
      summary: "Acht Tage am Berg auf der Route, die am besten akklimatisiert – mit dem zusätzlichen Tag serienmäßig statt als Aufpreis.",
      overview: undefined,
      travellerProfile: "Bergwanderer – technische Klettererfahrung ist nicht nötig",
      bestTime: "Januar – März sowie Juni – Oktober",
      included: ["Bergmannschaft: Guides, Koch und Träger, bezahlt nach KPAP-Richtlinien","Sämtliche Gebühren des Kilimanjaro-Nationalparks und Rettungsgebühren","Campingausrüstung, Mahlzeiten und Trinkwasser am Berg","Zwei Nächte in Arusha, vor und nach dem Aufstieg","Flughafentransfers"],
      notIncluded: ["Internationale Flüge und Visum für Tansania","Reise- und Krankenversicherung mit Deckung für Trekking bis 6.000 m","Persönliche Trekkingausrüstung und Schlafsack","Trinkgelder für die Bergmannschaft"],
      practicalInfo: undefined,
      days: [],
    },
    "highlands-and-communities": {
      name: "Hochland & Gemeinschaften",
      summary: "Die Parks des Nordens, verbunden durch die Hochlandgemeinschaften, die neben ihnen leben – Massai, Datoga und Chagga.",
      overview: undefined,
      travellerProfile: "Reisende, die neben der Tierwelt auch den Zusammenhang suchen",
      bestTime: "Juni – Oktober",
      included: ["Privater 4x4-Safariwagen mit offenem Dach und Maisha-Quest-Guide","Sämtliche Park- und Schutzgebietsgebühren","Direkt vereinbarte Gemeindebesuche, deren Gebühren an die Gemeinschaften gehen","Unterkunft wie aufgeführt, mit Vollpension"],
      notIncluded: ["Internationale Flüge und Visum für Tansania","Reise- und Krankenversicherung","Getränke außer Wasser sowie persönliche Ausgaben","Trinkgelder für Guide und Camp-Personal"],
      practicalInfo: undefined,
      days: [],
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
      description: "Tansania jenseits der Pirschfahrt. Tage mit Gemeinschaften und Naturschutzteams, Essen und Kaffee dort, wo sie wachsen, und private Zugänge über Menschen, mit denen wir seit Jahren arbeiten.",
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
      description: "Zusammenarbeit mit Schulen nahe den Gemeinschaften, durch die wir reisen — das Praktische, das einem Klassenzimmer fehlt, und die Kosten, die Kinder davon fernhalten.",
      location: null,
    },
    "conservation": {
      title: "Wildtierschutz",
      description: "Unterstützung der Naturschutzteams in den Ökosystemen, von denen unsere Reisen abhängen — und die Möglichkeit, einen Tag mit ihnen zu verbringen, statt nur darüber zu lesen.",
      location: null,
    },
    "community": {
      title: "Partnerschaft mit Gemeinschaften",
      description: "Besuche, direkt mit den Gastgebenden vereinbart, zu Zeiten, die ihnen passen, und mit einer Vergütung, die an die Gemeinschaft geht statt an einen Vermittler.",
      location: null,
    },
    "local-employment": {
      title: "Arbeit vor Ort",
      description: "Guides, Fahrer, Köchinnen und Büropersonal werden in Tansania eingestellt und ausgebildet. Am Kilimandscharo folgen Trägerlöhne und Traglastgrenzen den KPAP-Richtlinien.",
      location: "Arusha, Tansania",
    },
  },
};
