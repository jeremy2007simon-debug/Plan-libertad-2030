import type { TeamMember } from "@/types/content";

/**
 * Equipo fundador.
 *
 * Los datos vienen de lo que el cliente ha facilitado y de la web actual —
 * nada más. Los idiomas de Talisa (inglés, swahili, ruso y mandarín) y el
 * origen de Frank en Arusha son datos confirmados; los cargos concretos, los
 * años de experiencia y el lugar favorito de cada uno están pendientes de
 * confirmar, así que se quedan en `null` y la interfaz simplemente no
 * muestra ese renglón.
 *
 * TODO (cliente): retratos reales del equipo. Los huecos están dimensionados
 * en 4:5 vertical. Usar fotografía de stock aquí sería directamente falso —
 * son personas concretas — así que el hueco se queda vacío a propósito.
 */

export const TEAM: TeamMember[] = [
  {
    slug: "talisa-tufts",
    name: "Talisa Tufts",
    role: "Founder",
    languages: ["English", "Swahili", "Russian", "Mandarin Chinese"],
    bio: "Talisa founded Maisha Quest after a career in international tourism and hospitality. She speaks four languages, which is why travellers from Moscow, Shanghai and Madrid are all looked after in their own — and why the first conversation about your journey rarely needs a translator.",
    specialty: "Journey design and multilingual guest relations",
    favouritePlace: null,
    portrait: {
      src: null,
      alt: "Talisa Tufts, founder of Maisha Quest",
    },
  },
  {
    slug: "frank-lyatuu",
    name: "Frank Lyatuu",
    role: "Co-founder — Operations",
    languages: ["English", "Swahili"],
    bio: "Frank is from Arusha, and the routes Maisha Quest travels are the ones he knows from driving them. He handles operations, hospitality and the practical side of putting a safari together — the vehicles, the timings, the people at every gate.",
    specialty: "Safari operations and local knowledge",
    favouritePlace: null,
    portrait: {
      src: null,
      alt: "Frank Lyatuu, co-founder of Maisha Quest",
    },
  },
  {
    slug: "tina-ngabo",
    name: "Tina Ngabo",
    role: "Co-founder — Guest Experience",
    languages: ["English", "Swahili"],
    bio: "Tina brings international hospitality experience to the part of the journey travellers feel most: how they are looked after. She is the person making sure the details you mentioned once in an email are waiting for you in Tanzania.",
    specialty: "Guest experience and service standards",
    favouritePlace: null,
    portrait: {
      src: null,
      alt: "Tina Ngabo, co-founder of Maisha Quest",
    },
  },
];

export const TEAM_BY_SLUG = new Map(TEAM.map((member) => [member.slug, member]));
