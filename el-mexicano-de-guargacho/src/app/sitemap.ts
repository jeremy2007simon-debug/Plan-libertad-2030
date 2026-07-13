import type { MetadataRoute } from "next";

const siteUrl = "https://elmexicanodeguargacho.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/privacidad`, lastModified: new Date(), priority: 0.2 },
  ];
}
