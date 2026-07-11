// Propuesta conceptual para Grupo Valladares.
//
// Esta web es un ejercicio de diseño para mostrar cómo podría modernizarse
// la presencia digital de la empresa — no se ha incorporado ningún dato
// corporativo real (años de actividad, plantilla, certificaciones, marcas
// distribuidas...). Todo lo marcado entre [corchetes] es un marcador a
// sustituir por el dato real antes de publicar.

export const COMPANY = {
  name: "Grupo Valladares",
  legalNote: "[Razón social pendiente de confirmar]",
  phone: "[Teléfono pendiente]",
  phoneHref: "tel:+34000000000",
  whatsappHref: "https://wa.me/34000000000",
  email: "[Email pendiente]",
  emailHref: "mailto:info@grupovalladares.example",
  hours: "[Horario pendiente de confirmar]",
  social: {
    instagram: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
  },
} as const;

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

// Ubicaciones de ejemplo — estructura preparada para 1..n tiendas reales.
// Sustituir nombre, dirección, teléfono y horario por los datos definitivos.
export const STORES: StoreLocation[] = [
  {
    slug: "central",
    name: "Tienda Central",
    address: "[Dirección pendiente]",
    phone: "[Teléfono pendiente]",
    hours: "[Horario pendiente]",
    mapsHref: "https://www.google.com/maps",
  },
  {
    slug: "norte",
    name: "Tienda Norte",
    address: "[Dirección pendiente]",
    phone: "[Teléfono pendiente]",
    hours: "[Horario pendiente]",
    mapsHref: "https://www.google.com/maps",
  },
  {
    slug: "sur",
    name: "Tienda Sur",
    address: "[Dirección pendiente]",
    phone: "[Teléfono pendiente]",
    hours: "[Horario pendiente]",
    mapsHref: "https://www.google.com/maps",
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
