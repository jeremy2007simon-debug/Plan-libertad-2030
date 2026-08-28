/**
 * AUDITORÍA DE AFIRMACIONES COMERCIALES.
 *
 * Registro interno, NO se renderiza en ninguna página. Existe para que quede
 * escrito qué dice la web sobre el negocio, de dónde sale cada cosa y qué
 * sigue sin confirmar. Sin este archivo, la única forma de saberlo sería
 * releer seis diccionarios.
 *
 * Regla de la web: una afirmación sobre el negocio solo se publica como HECHO
 * si está en `confirmed`. Lo que está en `pending` o bien se ha reescrito para
 * no prometer nada no verificado, o bien no se pinta.
 *
 * Cuando el cliente confirme un punto: mover la entrada a `CONFIRMED_CLAIMS`,
 * anotar la fuente y, si procede, devolver a los diccionarios la formulación
 * fuerte que aquí se indica en `strongerWording`.
 */

export type ClaimStatus = "confirmed" | "pending" | "editorial";

export interface BusinessClaim {
  /** Identificador estable para poder referirse a la afirmación en un email. */
  key: string;
  /** Qué afirma la web, en una línea. */
  claim: string;
  status: ClaimStatus;
  /** De dónde sale, si está confirmada. */
  source?: string;
  /**
   * Cuándo se confirmó, en formato `AAAA-MM-DD`.
   *
   * Sin fecha, «confirmado» envejece mal: una licencia que se verificó hace
   * tres años puede haber caducado, y un dato de plantilla cambia. Toda
   * entrada `confirmed` la lleva; las demás, no.
   */
  confirmedAt?: string;
  /**
   * ¿Hay que preguntarle esto al cliente antes de lanzar?
   *
   * No es lo mismo que `status: "pending"`. Una afirmación puede estar
   * confirmada y aun así necesitar una revisión —porque se confirmó de oído,
   * o porque el dato caduca—, y una editorial no necesita ninguna.
   */
  needsClientReview: boolean;
  /** Qué hay que preguntar exactamente cuando `needsClientReview` es `true`. */
  reviewNote?: string;
  /** Dónde vive el texto hoy. */
  usedIn: string[];
  /**
   * Qué se publica MIENTRAS no esté confirmada. `null` significa que no se
   * publica nada: el elemento entero desaparece.
   */
  publishedAs?: string | null;
  /** Formulación que podría usarse en cuanto el cliente lo confirme. */
  strongerWording?: string;
  note?: string;
}

/* -------------------------------------------------------------------------
 * CONFIRMADAS — proceden de datos que el propio cliente ha facilitado o de su
 * web anterior. Se publican como hechos.
 * ---------------------------------------------------------------------- */

export const CONFIRMED_CLAIMS: BusinessClaim[] = [
  {
    key: "company.base",
    claim: "Maisha Quest es una empresa tanzana con sede en Arusha.",
    status: "confirmed",
    confirmedAt: "2026-08-28",
    needsClientReview: true,
    reviewNote:
      "Confirmar la forma jurídica exacta y el domicilio social; «empresa tanzana con sede en Arusha» sale de su web anterior, no de un registro.",
    source: "Web anterior del cliente y datos de contacto facilitados (+255, Arusha).",
    usedIn: ["lib/site.ts COMPANY.base", "home.maisha.body", "why.pillars[0]", "footer"],
  },
  {
    key: "company.contact",
    claim: "Teléfono +255 672 426 411, info@maishaquest.com, WhatsApp y horario L–S 8:00–18:00 GMT+3.",
    status: "confirmed",
    confirmedAt: "2026-08-28",
    needsClientReview: true,
    reviewNote:
      "Confirmar que el número tiene WhatsApp Business activo.",
    source: "Facilitados por el cliente y verificados contra su web anterior.",
    usedIn: ["lib/site.ts COMPANY", "contacto", "footer", "planificador"],
    note:
      "Pendiente menor: confirmar que ese número tiene WhatsApp Business activo. " +
      "Ver CLIENT_DATA_PENDING en lib/site.ts.",
  },
  {
    key: "company.social",
    claim: "Perfiles de Instagram, LinkedIn y YouTube.",
    status: "confirmed",
    confirmedAt: "2026-08-28",
    needsClientReview: true,
    reviewNote:
      "Reconfirmar antes del lanzamiento: un perfil puede cambiar de nombre.",
    source: "URLs verificadas por el cliente en la ronda de enlaces.",
    usedIn: ["lib/site.ts COMPANY.social"],
  },
  {
    key: "product.private",
    claim: "Todos los viajes son privados y se construyen a medida.",
    status: "confirmed",
    confirmedAt: "2026-08-28",
    needsClientReview: false,
    source: "Es el modelo de negocio declarado por el cliente; sostiene toda la web.",
    usedIn: ["why.pillars[1]", "faq.what-does-private-mean", "safaris"],
  },
  {
    key: "team.founders",
    claim: "Tres fundadores: Talisa Tufts, Frank Lyatuu y Tina Ngabo, con sus funciones.",
    status: "confirmed",
    confirmedAt: "2026-08-28",
    needsClientReview: true,
    reviewNote:
      "Confirmar los cargos y que los tres siguen en la empresa.",
    source: "Nombres y cargos facilitados por el cliente.",
    usedIn: ["data/structure/team.ts", "home.team", "/about/team"],
  },
  {
    key: "team.languages",
    claim: "El equipo trabaja en inglés y suajili; Talisa habla además ruso y chino mandarín.",
    status: "confirmed",
    confirmedAt: "2026-08-28",
    needsClientReview: true,
    reviewNote:
      "Confirmar el nivel de cada idioma y si se usan al planificar o también sobre el terreno.",
    source: "Idiomas de cada persona facilitados por el cliente.",
    usedIn: ["data/structure/team.ts languageCodes", "faq.languages", "why.pillars[2]"],
    note:
      "OJO con la formulación: que una persona hable un idioma NO es lo mismo " +
      "que ofrecer guiado en ese idioma sobre el terreno. Ver claim " +
      "`service.guiding-languages`.",
  },
];

/* -------------------------------------------------------------------------
 * PENDIENTES — no se publican como hechos. Cada una indica qué dice hoy la web
 * en su lugar.
 * ---------------------------------------------------------------------- */

export const PENDING_CLAIMS: BusinessClaim[] = [
  {
    key: "team.frank-routes",
    claim: "Frank es de Arusha y conoce las rutas de conducirlas él mismo.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["content team frank-lyatuu.bio"],
    publishedAs:
      "Se publica tal cual, en su biografía y en primera persona del equipo. " +
      "No es una promesa comercial ni una cifra, pero sí una afirmación sobre " +
      "una persona concreta y debe confirmarla ella.",
    reviewNote:
      "Que Frank confirme que la biografía dice de él lo que él diría, y en " +
      "particular que ha conducido las rutas que la web ofrece.",
  },
  {
    key: "service.airport-welcome",
    claim:
      "Quien responde al primer correo es quien recibe al viajero en el aeropuerto.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["home.maisha.body", "why.pillars[0]", "about.lede"],
    publishedAs:
      "Se publica tal cual. Es la afirmación más comprobable de toda la web " +
      "—un viajero la verifica el primer día— y con un equipo de tres personas " +
      "es plausible, pero no consta confirmada por el cliente.",
    strongerWording:
      "Si no siempre es así, basta con «te recibe alguien del equipo, no un " +
      "proveedor», que sigue siendo un argumento fuerte y no se puede desmentir.",
    reviewNote:
      "¿Recibe SIEMPRE en el aeropuerto alguien de los tres, o a veces un " +
      "conductor o guía contratado? Si es lo segundo, hay que suavizarlo.",
  },
  {
    key: "service.guiding-languages",
    claim: "Maisha Quest planifica Y ACOMPAÑA en inglés, suajili, ruso y chino mandarín.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["why.pillars[2]"],
    publishedAs:
      "Que la planificación y la correspondencia son en inglés y suajili, y que " +
      "Talisa habla además ruso y chino. Es lo que ya decía la FAQ, y ahora " +
      "coinciden.",
    strongerWording:
      "«Planificamos y acompañamos en inglés, suajili, ruso y chino mandarín», " +
      "en cuanto se confirme que hay guía sobre el terreno en esos idiomas.",
    note: "Confirmar: ¿hay guías propios que acompañen en ruso o en chino?",
  },
  {
    key: "service.lodges-visited",
    claim: "Los campamentos y lodges que se ofrecen los ha visitado el equipo en persona.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["why.pillars[3]"],
    publishedAs:
      "El criterio de selección (ubicación, gestión y lo que se ve desde allí), " +
      "sin afirmar la visita personal.",
    strongerWording: "«Campamentos y lodges que hemos visitado nosotros mismos.»",
  },
  {
    key: "service.support-throughout",
    claim: "El equipo está localizable durante todo el viaje.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["why.pillars[5]"],
    publishedAs:
      "Que es un solo equipo de principio a fin —quien planifica es quien " +
      "responde—, sin prometer disponibilidad permanente.",
    strongerWording:
      "«Localizables durante todo el viaje», con el detalle de en qué horario y " +
      "por qué canal (¿teléfono de emergencia 24 h?).",
    note:
      "El horario publicado es L–S 8:00–18:00. Prometer localización permanente " +
      "lo contradice.",
  },
  {
    key: "partners.years",
    claim: "Acceso privado a través de gente con la que se trabaja «desde hace años».",
    status: "pending",
    needsClientReview: true,
    usedIn: ["content collections.enrich.description"],
    publishedAs: "Que el acceso se acuerda directamente con quien lo acoge.",
    strongerWording: "«…con gente con la que trabajamos desde hace N años.»",
    note: "Confirmar desde cuándo opera la empresa y con qué proveedores tiene recorrido.",
  },
  {
    key: "impact.community-fees",
    claim: "Las visitas a comunidades se pagan a la comunidad y no a un intermediario.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["content impact.community.description"],
    publishedAs:
      "Que las visitas se acuerdan directamente con quien las acoge y en el " +
      "momento que les conviene. Sin afirmación sobre el flujo del dinero.",
    strongerWording: "«…con el pago dirigido a la comunidad y no a un intermediario.»",
    note: "Es una afirmación financiera comprobable: no se publica sin confirmación.",
  },
  {
    key: "impact.kpap",
    claim: "En el Kilimanjaro se siguen las pautas de KPAP sobre sueldo y carga de porteadores.",
    status: "pending",
    needsClientReview: true,
    usedIn: [
      "content impact.local-employment.description",
      "team.note",
      "content safaris.kilimanjaro-lemosho.included[0]",
    ],
    publishedAs:
      "Que el trato a la cuadrilla de montaña —sueldo, cargas y equipo— pesa al " +
      "elegirla. Sin nombrar KPAP.",
    strongerWording:
      "«Cuadrilla de montaña retribuida según las pautas de KPAP», si Maisha " +
      "Quest es socio de KPAP o puede acreditarlo.",
    note:
      "KPAP es una organización real y verificable. Nombrar su estándar sin ser " +
      "socio es el tipo de afirmación que un cliente informado comprueba.",
  },
  {
    key: "impact.share-of-revenue",
    claim: "Una parte de cada viaje se destina a trabajo de impacto.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["home.impact.intro.body", "meta.impact.description"],
    publishedAs:
      "Los ámbitos en los que se quiere trabajar y el modelo (guías y " +
      "proveedores tanzanos, visitas acordadas directamente), sin porcentaje ni " +
      "compromiso de aportación.",
    strongerWording: "«Un N % de cada viaje va a…», con el destino concreto.",
  },
  {
    key: "impact.active-programmes",
    claim: "Hay programas activos de educación y conservación en marcha.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["content impact.education", "content impact.conservation"],
    publishedAs:
      "Las áreas de trabajo de Maisha Quest Cares descritas como el foco del " +
      "compromiso, no como programas ya en funcionamiento con resultados.",
    strongerWording:
      "Nombres de los centros y de los equipos de conservación, con lo aportado.",
    note: "`outcomes` sigue vacío en los cuatro proyectos: no hay ni una cifra.",
  },
  {
    key: "impact.local-wages",
    claim: "Guías locales «con salarios locales» y personal formado por la empresa.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["home.impact.intro.body", "content impact.local-employment"],
    publishedAs: "Que la contratación es en Tanzania. Sin afirmar nivel salarial ni formación propia.",
    strongerWording: "«…con salarios por encima del convenio del sector», si es el caso.",
  },
  {
    key: "trust.credentials",
    claim: "Licencias TALA/TATO, seguros, asociaciones, años en operación, viajeros atendidos.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["lib/site.ts TRUST_CREDENTIALS"],
    publishedAs: null,
    note:
      "La franja de acreditaciones no se pinta mientras el array esté vacío. No " +
      "hay hueco: el bloque entero desaparece.",
  },
  {
    key: "product.inclusions",
    claim:
      "Las listas de «incluye» de los siete viajes (cobertura de evacuación, " +
      "tasas, traslados…).",
    status: "pending",
    needsClientReview: true,
    usedIn: ["content safaris.*.included"],
    publishedAs:
      "Se publican bajo el sello de itinerario de muestra: los siete safaris " +
      "llevan `draft: true` y la ficha avisa de que la ruta final se confirma " +
      "con cada viajero.",
    note:
      "Confirmar con el equipo de Arusha antes de quitar `draft`. Sin quitarlo, " +
      "ninguna lista se lee como una oferta cerrada.",
  },
  {
    key: "reviews.profiles",
    claim: "Perfiles de TripAdvisor, SafariBookings y Google Business.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["data/testimonials.ts REVIEW_SOURCES"],
    publishedAs: null,
    note: "REVIEW_SOURCES vacío: los tres enlaces no existen en el DOM.",
  },
  {
    key: "media.impact-video",
    claim: "Vídeo de Maisha Quest Cares grabado en un colegio.",
    status: "pending",
    needsClientReview: true,
    usedIn: ["data/impact.ts IMPACT_VIDEO"],
    publishedAs: null,
    note:
      "Contiene menores identificables. Sin autorización escrita de tutores y " +
      "centro NO se publica, y el módulo de vídeo no se pinta.",
  },
  {
    key: "media.journey-film",
    claim: "Vídeo vertical de 36 s para la sección «The film».",
    status: "pending",
    needsClientReview: true,
    usedIn: ["components/home/VideoStory.tsx JOURNEY_FILM"],
    publishedAs: null,
    note:
      "El archivo no está en el repositorio (pesa ~45 MB sin comprimir). El " +
      "módulo de vídeo no se pinta hasta que exista la versión optimizada.",
  },
];

/* -------------------------------------------------------------------------
 * EDITORIALES — opinión, posicionamiento o descripción del país. No son
 * afirmaciones sobre el negocio y no necesitan verificación.
 * ---------------------------------------------------------------------- */

export const EDITORIAL_CLAIMS: BusinessClaim[] = [
  {
    key: "editorial.collections",
    claim: "«No son tres niveles de precio, son tres temperamentos.»",
    status: "editorial",
    needsClientReview: false,
    usedIn: ["home.collections.lede"],
  },
  {
    key: "editorial.maisha",
    claim: "«Cada viaje es una oportunidad de descubrir, conectar y vivir más plenamente.»",
    status: "editorial",
    needsClientReview: false,
    usedIn: ["home.maisha.lede"],
  },
  {
    key: "editorial.destinations",
    claim: "Descripciones de parques, temporadas y fauna.",
    status: "editorial",
    needsClientReview: false,
    usedIn: ["content destinations.*", "content experiences.*"],
    note:
      "Son datos geográficos y de temporada, no afirmaciones sobre la empresa. " +
      "Comprobables en fuentes públicas.",
  },
];

/** Todo junto, para poder recorrerlo desde una revisión. */
export const BUSINESS_CLAIMS: BusinessClaim[] = [
  ...CONFIRMED_CLAIMS,
  ...PENDING_CLAIMS,
  ...EDITORIAL_CLAIMS,
];
