import { getGoogleReviews } from "@/lib/reviews";
import { GoogleReviews } from "./GoogleReviews";
import { OpinionesPlaceholder } from "./OpinionesPlaceholder";

// Server Component: hace la única llamada a getGoogleReviews() y decide
// qué renderizar. En cuanto GOOGLE_PLACES_API_KEY esté configurada y
// devuelva datos reales, delega por completo en GoogleReviews.tsx — mismo
// id de sección, mismo lugar en la página, sin más cambios. Mientras no
// haya integración, renderiza OpinionesPlaceholder.tsx (componente cliente,
// necesita useT() para las traducciones).
export async function Opiniones() {
  const data = await getGoogleReviews();
  if (data) return <GoogleReviews data={data} />;
  return <OpinionesPlaceholder />;
}
