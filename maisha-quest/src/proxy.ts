import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, isLocale, matchLocale } from "@/i18n/config";

/**
 * Redirección de la raíz al idioma correcto.
 *
 * En Next 16 este archivo se llama `proxy.ts` (antes `middleware.ts`).
 *
 * Orden de preferencia, tal y como se pidió:
 *   1. Cookie con la elección explícita del visitante.
 *   2. Idioma compatible del navegador (`Accept-Language`).
 *   3. Inglés.
 *
 * No puede haber bucle: solo se redirige cuando la ruta NO empieza por un
 * idioma válido, y el destino siempre empieza por uno. Una ruta ya prefijada
 * sale por `NextResponse.next()` sin tocarse.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  // Un prefijo con la forma de un idioma pero que no soportamos (`/pt/...`)
  // no se reescribe a ciegas: se manda a la home del idioma preferido en vez
  // de fabricar una ruta que no existe.
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookie && isLocale(cookie)
      ? cookie
      : matchLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;

  const response = NextResponse.redirect(url);
  // Solo se recuerda lo que ya estaba guardado; la preferencia nueva la
  // escribe el selector, que es donde el visitante decide de verdad.
  if (cookie && isLocale(cookie)) {
    response.cookies.set(LOCALE_COOKIE, cookie, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: [
    /**
     * Todo salvo los internos de Next, la API, los archivos estáticos y los
     * documentos que no llevan idioma (sitemap, robots, imágenes).
     */
    "/((?!_next/|api/|images/|video/|favicon|sitemap\\.xml|robots\\.txt|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
