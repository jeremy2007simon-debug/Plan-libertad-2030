import { RESTAURANT } from "@/lib/constants";

// -----------------------------------------------------------------------
// Reseñas de Google (Places API).
//
// Sin GOOGLE_PLACES_API_KEY configurada, devuelve null y la sección
// "Opiniones" muestra el estado "próximamente" — no rompe nada mientras
// no se active. Para activarla:
//
//   1. Crea una API key en Google Cloud Console y habilita "Places API".
//   2. Copia .env.example a .env.local y rellena GOOGLE_PLACES_API_KEY.
//   3. (Opcional) Si conoces el Place ID exacto del restaurante, añádelo
//      en GOOGLE_PLACE_ID para evitar una búsqueda extra. Si lo dejas
//      vacío, se busca automáticamente por nombre y dirección.
// -----------------------------------------------------------------------

export type GoogleReview = {
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GoogleReviewsData = {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
};

type FindPlaceResponse = {
  candidates?: { place_id?: string }[];
};

type PlaceDetailsResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: {
      author_name: string;
      profile_photo_url?: string;
      rating: number;
      text: string;
      relative_time_description: string;
    }[];
  };
};

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID;
  if (configured) return configured;

  const query = `${RESTAURANT.name} ${RESTAURANT.address.full}`;
  const url =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json" +
    `?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return null;
  const data = (await res.json()) as FindPlaceResponse;
  return data.candidates?.[0]?.place_id ?? null;
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const placeId = await resolvePlaceId(apiKey);
    if (!placeId) return null;

    const url =
      "https://maps.googleapis.com/maps/api/place/details/json" +
      `?place_id=${placeId}&fields=rating,user_ratings_total,reviews&language=es&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as PlaceDetailsResponse;
    const result = data.result;
    if (!result) return null;

    return {
      rating: result.rating ?? 0,
      totalReviews: result.user_ratings_total ?? 0,
      reviews: (result.reviews ?? []).slice(0, 5).map((r) => ({
        authorName: r.author_name,
        authorPhotoUrl: r.profile_photo_url ?? null,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
      })),
    };
  } catch {
    return null;
  }
}
