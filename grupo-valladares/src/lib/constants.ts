// Propuesta conceptual para Grupo Valladares.
//
// Datos de contacto y tiendas facilitados por la empresa. Lo que queda sin
// confirmar (razón social fiscal, certificaciones, marcas distribuidas...)
// sigue marcado entre [corchetes] hasta que se aporte el dato definitivo.

export const COMPANY = {
  name: "Grupo Valladares",
  legalNote: "[Razón social pendiente de confirmar]",
  phone: "922 231 555",
  phoneHref: "tel:+34922231555",
  // Número de teléfono fijo (central de Santa Cruz) — confirmar si tiene
  // WhatsApp Business habilitado antes de publicar, o sustituir por un móvil.
  whatsappHref: "https://wa.me/34922231555",
  email: "atencionalcliente@grupovalladares.com",
  emailHref: "mailto:atencionalcliente@grupovalladares.com",
  social: {
    instagram: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const SCHEDULE = [
  { label: "Lunes a viernes", value: "07:00 – 18:00" },
  { label: "Sábados", value: "09:00 – 13:00" },
  { label: "Domingos", value: "Cerrado" },
] as const;

export const STORE_HOURS = "Lunes a viernes: 07:00–18:00 · Sábados: 09:00–13:00";

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
};

// Las 12 líneas de producto solicitadas. La descripción es un texto neutro
// de posicionamiento, no un catálogo real — a completar con el detalle de
// cada familia cuando esté disponible.
export const SERVICES: ServiceCategory[] = [
  { slug: "recambios", title: "Recambios", description: "Componentes originales y equivalentes para cada modelo." },
  { slug: "lubricantes", title: "Lubricantes", description: "Aceites y fluidos homologados por tipo de motor." },
  { slug: "filtros", title: "Filtros", description: "Aire, aceite, combustible y habitáculo." },
  { slug: "baterias", title: "Baterías", description: "Arranque y soporte técnico de instalación." },
  { slug: "frenos", title: "Frenos", description: "Discos, pastillas y sistemas completos." },
  { slug: "herramientas", title: "Herramientas", description: "Equipamiento profesional para taller." },
  { slug: "accesorios", title: "Accesorios", description: "Protección, confort y personalización." },
  { slug: "refrigeracion", title: "Refrigeración", description: "Radiadores, bombas y climatización." },
  { slug: "transmision", title: "Transmisión", description: "Embragues, cajas y componentes asociados." },
  { slug: "suspension", title: "Suspensión", description: "Amortiguadores, muelles y estabilidad." },
  { slug: "iluminacion", title: "Iluminación", description: "Óptica delantera, trasera y tecnología LED." },
  { slug: "electronica", title: "Electrónica", description: "Sensores, centralitas y diagnosis." },
];

export type StoreLocation = {
  slug: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapsHref: string;
};

function mapsDirections(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export const STORES: StoreLocation[] = [
  {
    slug: "santa-cruz",
    name: "Santa Cruz de Tenerife (Central)",
    address: "Calle 302, Nave 15, Polígono Industrial Costa Sur, 38009 Santa Cruz de Tenerife",
    phone: "922 231 555",
    hours: STORE_HOURS,
    mapsHref: mapsDirections("Calle 302, Nave 15, Polígono Industrial Costa Sur, 38009 Santa Cruz de Tenerife"),
  },
  {
    slug: "los-majuelos",
    name: "Los Majuelos (La Laguna)",
    address: "Calle Las Macetas 22, Polígono Industrial Los Majuelos, 38108 La Laguna",
    phone: "922 823 066",
    hours: STORE_HOURS,
    mapsHref: mapsDirections("Calle Las Macetas 22, Polígono Industrial Los Majuelos, 38108 La Laguna"),
  },
  {
    slug: "las-chafiras",
    name: "Las Chafiras",
    address: "Avenida Modesto Hernández González 31, Polígono Industrial Las Chafiras, 38639 San Miguel de Abona",
    phone: "922 736 166",
    hours: STORE_HOURS,
    mapsHref: mapsDirections("Avenida Modesto Hernández González 31, Polígono Industrial Las Chafiras, 38639 San Miguel de Abona"),
  },
  {
    slug: "adeje",
    name: "Adeje",
    address: "Calle Bentinerfe 57, Polígono Barranco Las Torres, 38670 Adeje",
    phone: "922 758 667",
    hours: STORE_HOURS,
    mapsHref: mapsDirections("Calle Bentinerfe 57, Polígono Barranco Las Torres, 38670 Adeje"),
  },
  {
    slug: "la-orotava",
    name: "La Orotava",
    address: "Calle Los Molinos de Gofio 35, Polígono Industrial San Jerónimo, 38312 La Orotava",
    phone: "922 326 324",
    hours: STORE_HOURS,
    mapsHref: mapsDirections("Calle Los Molinos de Gofio 35, Polígono Industrial San Jerónimo, 38312 La Orotava"),
  },
  {
    slug: "icod-de-los-vinos",
    name: "Icod de los Vinos",
    address: "Calle El Timple 10, Polígono Industrial Las Almenas, 38430 Icod de los Vinos",
    phone: "922 326 324",
    hours: STORE_HOURS,
    mapsHref: mapsDirections("Calle El Timple 10, Polígono Industrial Las Almenas, 38430 Icod de los Vinos"),
  },
];

export const WHY_US = [
  { title: "Rapidez", description: "Circuitos de suministro pensados para que el taller no pare." },
  { title: "Disponibilidad", description: "Catálogo amplio con reposición constante." },
  { title: "Atención", description: "Equipo técnico que entiende lo que necesitas antes de que lo pidas." },
  { title: "Calidad", description: "Producto seleccionado con criterio profesional." },
  { title: "Asesoramiento", description: "Acompañamiento en cada pedido, sin tecnicismos innecesarios." },
] as const;

export const NAV_LINKS = [
  { href: "#ofrecemos", label: "Qué ofrecemos" },
  { href: "#perfiles", label: "Para quién trabajamos" },
  { href: "#tiendas", label: "Tiendas" },
  { href: "#marcas", label: "Marcas" },
  { href: "#presupuesto", label: "Presupuesto" },
] as const;
