/**
 * ESTRUCTURA — sin una sola palabra traducible.
 *
 * Slugs, duraciones, coordenadas, rutas, relaciones y fotografías viven aquí
 * una única vez, compartidas por los seis idiomas. El texto visible está en
 * `src/i18n/content/<idioma>.ts`. Así la versión alemana no puede declarar un
 * safari de siete días si la francesa dice ocho: la duración solo existe en
 * este archivo.
 *
 * MIGRACIÓN WIX — programas sociales reales.
 * -------------------------------------------
 * Antes de esta migración, `/impact` mostraba cuatro pilares genéricos
 * (education, conservation, community, employment) redactados con cautela
 * pero sin corresponder a ningún programa que Maisha Quest nombre en su
 * propia web. maishaquest.com solo publica dos programas sociales con
 * nombre propio:
 *
 *   - "Maisha Quest Cares — Teenage Troubled Youth Program"
 *     (maishaquest.com/cares): vivienda segura, formación en oficios,
 *     patrocinio educativo y mentoría para adolescentes en riesgo.
 *   - "Empowerment" (maishaquest.com/empowerment): empleo justo y
 *     desarrollo de talento joven tanzano dentro de la propia empresa.
 *
 * "Travel with Purpose", mencionado en la auditoría inicial, no tiene página
 * propia en maishaquest.com (404) ni aparece en su mapa del sitio: no se
 * incluye por no existir contenido oficial que migrar.
 *
 * Sobre la fotografía: la página real de Cares muestra la foto de un tigre
 * en el pie de página — un animal que no existe en Tanzania. No se copia
 * (no es de Maisha Quest y es incoherente con el destino); ninguno de los
 * dos programas tiene todavía una fotografía propia y coherente con
 * Tanzania, así que `image.src` queda en `null` a propósito. La interfaz ya
 * sabe mostrar un proyecto sin fotografía en lugar de inventar un marco.
 */

import type { ImpactStructure } from "@/types/content";

/**
 * `outcomes` vacío en los dos: maishaquest.com no publica cifras para
 * ninguno de los dos programas, y no se inventa ninguna.
 */
export const IMPACT_STRUCTURE: ImpactStructure[] = [
  {
    slug: "maisha-quest-cares",
    area: "youth-cares",
    outcomes: [],
    image: { src: null },
  },
  {
    slug: "empowerment",
    area: "empowerment",
    outcomes: [],
    image: { src: null },
  },
];
