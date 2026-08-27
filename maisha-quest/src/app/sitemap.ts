import type { MetadataRoute } from "next";
import { COLLECTIONS } from "@/data/collections";
import { DESTINATIONS } from "@/data/destinations";
import { EXPERIENCES } from "@/data/experiences";
import { JOURNAL_POSTS } from "@/data/journal";
import { SAFARIS } from "@/data/safaris";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap generado desde la misma fuente de datos que las páginas: no puede
 * quedarse desincronizado ni listar rutas que ya no existen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}`;

  const staticPages: [string, number][] = [
    ["/", 1],
    ["/safaris", 0.9],
    ["/destinations", 0.8],
    ["/experiences", 0.8],
    ["/plan", 0.9],
    ["/about", 0.7],
    ["/about/team", 0.6],
    ["/impact", 0.6],
    ["/journal", 0.6],
    ["/contact", 0.7],
    ["/faq", 0.6],
  ];

  return [
    ...staticPages.map(([path, priority]) => ({
      url: url(path),
      lastModified: new Date(),
      priority,
    })),
    ...COLLECTIONS.map((collection) => ({
      url: url(`/collections/${collection.id}`),
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...SAFARIS.map((safari) => ({
      url: url(`/safaris/${safari.slug}`),
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...DESTINATIONS.map((destination) => ({
      url: url(`/destinations/${destination.slug}`),
      lastModified: new Date(),
      priority: 0.7,
    })),
    ...EXPERIENCES.map((experience) => ({
      url: url(`/experiences/${experience.slug}`),
      lastModified: new Date(),
      priority: 0.6,
    })),
    ...JOURNAL_POSTS.map((post) => ({
      url: url(`/journal/${post.slug}`),
      lastModified: new Date(post.date),
      priority: 0.5,
    })),
  ];
}
