// URL pública del sitio. Todavía no hay un dominio real asignado, así que
// sin NEXT_PUBLIC_SITE_URL configurada se usa localhost como valor de
// desarrollo — nunca un dominio de ejemplo inventado. En cuanto haya un
// dominio real, define NEXT_PUBLIC_SITE_URL en las variables de entorno
// de producción (Vercel) y este valor se sustituye automáticamente.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
