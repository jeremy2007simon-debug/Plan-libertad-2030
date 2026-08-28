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
    source: "Web anterior del cliente y datos de contacto facilitados (+255, Arusha).",
    usedIn: ["lib/site.ts COMPANY.base", "home.maisha.body", "why.pillars[0]", "footer"],
  },
  {
    key: "company.contact",
    claim: "Teléfono +255 672 426 411, info@maishaquest.com, WhatsApp y horario L–S 8:00–18:00 GMT+3.",
    status: "confirmed",
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
    source: "URLs verificadas por el cliente en la ronda de enlaces.",
    usedIn: ["lib/site.ts COMPANY.social"],
  },
  {
    key: "product.private",
    claim: "Todos los viajes son privados y se construyen a medida.",
    status: "confirmed",
    source: "Es el modelo de negocio declarado por el cliente; sostiene toda la web.",
    usedIn: ["why.pillars[1]", "faq.what-does-private-mean", "safaris"],
  },
  {
    key: "team.founders",
    claim: "Tres fundadores: Talisa Tufts, Frank Lyatuu y Tina Ngabo, con sus funciones.",
    status: "confirmed",
    source: "Nombres y cargos facilitados por el cliente.",
    usedIn: ["data/structure/team.ts", "home.team", "/about/team"],
  },
  {
    key: "team.languages",
    claim: "El equipo trabaja en inglés y suajili; Talisa habla además ruso y chino mandarín.",
    status: "confirmed",
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
    key: "service.guiding-languages",
    claim: "Maisha Quest planifica Y ACOMPAÑA en inglés, suajili, ruso y chino mandarín.",
    status: "pending",
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
    usedIn: ["content collections.enrich.description"],
    publishedAs: "Que el acceso se acuerda directamente con quien lo acoge.",
    strongerWording: "«…con gente con la que trabajamos desde hace N años.»",
    note: "Confirmar desde cuándo opera la empresa y con qué proveedores tiene recorrido.",
  },
  {
    key: "impact.community-fees",
    claim: "Las visitas a comunidades se pagan a la comunidad y no a un intermediario.",
    status: "pending",
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
    usedIn: ["home.impact.intro.body", "content impact.local-employment"],
    publishedAs: "Que la contratación es en Tanzania. Sin afirmar nivel salarial ni formación propia.",
    strongerWording: "«…con salarios por encima del convenio del sector», si es el caso.",
  },
  {
    key: "trust.credentials",
    claim: "Licencias TALA/TATO, seguros, asociaciones, años en operación, viajeros atendidos.",
    status: "pending",
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
    usedIn: ["data/testimonials.ts REVIEW_SOURCES"],
    publishedAs: null,
    note: "REVIEW_SOURCES vacío: los tres enlaces no existen en el DOM.",
  },
  {
    key: "media.impact-video",
    claim: "Vídeo de Maisha Quest Cares grabado en un colegio.",
    status: "pending",
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
    usedIn: ["home.collections.lede"],
  },
  {
    key: "editorial.maisha",
    claim: "«Cada viaje es una oportunidad de descubrir, conectar y vivir más plenamente.»",
    status: "editorial",
    usedIn: ["home.maisha.lede"],
  },
  {
    key: "editorial.destinations",
    claim: "Descripciones de parques, temporadas y fauna.",
    status: "editorial",
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
