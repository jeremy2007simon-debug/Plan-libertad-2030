import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // El endpoint del formulario y las páginas legales no aportan nada a un
      // buscador y sí ruido al presupuesto de rastreo.
      disallow: ["/api/", "/legal/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
