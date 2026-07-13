import type { NextConfig } from "next";

// Desplegado en Vercel con "Root Directory" = el-mexicano-de-guargacho
// (proyecto separado de la web de NovaCore, que vive en la raíz de este
// repo).
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Fotografía de stock provisional (ver public/images/CREDITOS.md),
      // servida directamente desde Unsplash mientras no hay fotografía
      // propia del restaurante. Quitar este patrón en cuanto se sustituya
      // por imágenes propias en /public/images.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
