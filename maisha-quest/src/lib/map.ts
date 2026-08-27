/**
 * Silueta real de Tanzania para el mapa de la home.
 *
 * Generada desde Natural Earth 1:50m (dominio público) y simplificada con
 * Douglas-Peucker. El estilo es esquemático — filete fino sobre marfil, sin
 * proveedor de mapas externo — pero la geometría y la posición de cada
 * destino son correctas: `projectToMap` usa la misma proyección con la que
 * se trazó la silueta, así que los puntos caen donde están de verdad.
 *
 * Al no depender de ningún servicio de terceros, la sección funciona sin
 * clave de API, sin peticiones de red y sin bloquear el renderizado.
 */

export const MAP_VIEWBOX = { width: 1000.0, height: 968.4 } as const;

/** Encuadre geográfico usado al proyectar (grados decimales). */
const BOUNDS = {
  minLon: 29.323438,
  maxLon: 40.463574,
  minLat: -11.716211,
  maxLat: -0.994922,
  /** cos(latitud media): corrige la distorsión este-oeste. */
  cos: 0.9938540657,
} as const;

/** Convierte coordenadas reales a la posición dentro del viewBox del SVG. */
export function projectToMap(lat: number, lng: number): { x: number; y: number } {
  const spanX = (BOUNDS.maxLon - BOUNDS.minLon) * BOUNDS.cos;
  const spanY = BOUNDS.maxLat - BOUNDS.minLat;
  return {
    x: (((lng - BOUNDS.minLon) * BOUNDS.cos) / spanX) * MAP_VIEWBOX.width,
    y: ((BOUNDS.maxLat - lat) / spanY) * MAP_VIEWBOX.height,
  };
}

/** Formatea coordenadas en notación de brújula: 2°19'59"S 34°49'59"E */
export function formatCoordinates(lat: number, lng: number): string {
  const dms = (value: number, positive: string, negative: string) => {
    const hemisphere = value >= 0 ? positive : negative;
    // Se redondea a segundos enteros ANTES de repartir en grados y minutos.
    // Redondear al final produce lecturas imposibles como 2°19'60" en lugar
    // de 2°20'00".
    const totalSeconds = Math.round(Math.abs(value) * 3600);
    const deg = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${deg}°${String(minutes).padStart(2, "0")}'${String(seconds).padStart(2, "0")}"${hemisphere}`;
  };
  return `${dms(lat, "N", "S")}  ${dms(lng, "E", "W")}`;
}

/** Contornos del país: tierra firme, Pemba, Unguja (Zanzíbar) y Mafia. */
export const TANZANIA_PATHS = {
  mainland:
    "M322.8 759.8 L284.0 742.2 L279.1 737.1 L260.1 734.4 L251.9 729.6 L235.1 727.9 L233.3 724.8 L233.0 717.8 L223.9 714.2 L211.0 714.8 L200.4 705.5 L198.5 697.1 L182.0 687.5 L157.4 688.0 L147.7 682.5 L135.3 667.5 L125.4 642.1 L97.2 584.0 L88.8 560.8 L79.8 545.8 L70.3 534.7 L34.7 507.8 L19.5 480.4 L14.1 454.3 L15.0 448.9 L24.5 431.8 L25.5 427.0 L0.0 352.6 L7.2 312.0 L35.4 312.6 L56.0 299.2 L73.9 279.1 L84.8 257.9 L94.8 247.1 L98.9 234.3 L117.5 218.9 L115.6 214.2 L116.9 212.5 L131.7 205.9 L133.6 199.2 L130.8 179.7 L101.6 171.5 L99.6 169.8 L98.8 165.2 L103.2 153.5 L98.8 148.7 L108.6 129.3 L110.4 126.9 L124.9 123.6 L129.2 124.3 L135.1 121.4 L139.4 103.7 L138.3 94.8 L134.3 87.8 L133.1 77.3 L135.0 63.1 L133.7 51.3 L124.5 36.3 L117.5 33.6 L106.3 19.3 L102.9 12.3 L103.6 8.0 L107.4 6.1 L114.5 6.8 L133.4 0.0 L417.9 0.6 L746.9 185.2 L750.8 203.3 L743.7 226.0 L752.9 229.9 L757.1 238.6 L760.7 242.0 L888.5 334.0 L879.7 360.0 L879.3 367.7 L866.7 408.6 L860.6 418.3 L852.4 441.0 L851.1 458.4 L855.6 470.6 L857.3 482.0 L867.0 493.2 L874.7 497.2 L879.9 502.3 L889.1 514.0 L894.4 525.7 L911.0 531.4 L917.6 544.6 L915.2 553.6 L907.5 561.1 L900.3 573.2 L894.5 589.2 L894.4 613.5 L898.3 609.8 L907.1 615.8 L908.2 633.7 L899.1 654.6 L895.9 672.8 L902.5 697.8 L912.5 710.5 L909.1 717.9 L926.2 740.4 L924.8 760.0 L931.2 775.3 L939.0 805.6 L933.7 813.4 L946.2 815.3 L953.5 821.7 L956.9 827.8 L965.9 827.5 L993.3 845.3 L1000.0 855.3 L957.4 887.5 L942.0 895.8 L919.2 901.7 L908.0 906.8 L897.5 914.7 L884.0 918.7 L867.5 918.8 L850.2 924.3 L823.0 941.0 L807.1 931.8 L794.7 928.8 L771.7 930.3 L768.6 932.3 L763.5 947.2 L754.2 956.1 L737.7 964.6 L722.6 967.8 L708.7 965.7 L699.3 962.1 L694.4 957.2 L687.2 954.9 L677.7 955.3 L668.5 958.8 L659.8 965.5 L645.9 968.4 L626.8 967.5 L616.5 964.2 L615.1 958.7 L606.7 952.2 L591.4 944.7 L580.1 944.6 L566.2 956.2 L560.2 958.1 L547.1 956.3 L505.9 955.9 L503.9 945.5 L499.7 939.2 L496.1 935.5 L489.3 934.5 L481.6 919.7 L474.4 910.9 L474.2 902.8 L479.7 884.9 L476.9 869.8 L472.2 860.8 L471.0 835.1 L466.9 816.1 L448.6 789.1 L427.7 771.6 L419.4 767.8 L415.3 774.1 L415.6 782.5 L409.8 783.5 L392.7 777.0 L372.0 779.0 L367.8 777.9 L359.7 769.9 L341.7 767.8 L327.7 758.7 L322.8 759.8 Z",
  pemba:
    "M913.2 467.8 L920.1 487.1 L919.2 490.7 L911.8 493.0 L908.8 490.0 L906.6 483.5 L903.0 485.0 L896.7 477.3 L890.5 476.9 L885.0 467.6 L887.1 459.6 L885.9 445.8 L892.6 438.8 L896.4 427.0 L900.7 435.0 L901.7 447.7 L907.5 462.5 L913.2 467.8 Z",
  unguja:
    "M946.3 353.3 L945.2 384.8 L940.1 397.4 L935.9 401.8 L929.1 398.5 L926.7 395.0 L931.6 372.0 L929.1 355.2 L938.7 356.8 L946.3 353.3 Z",
  mafia:
    "M932.5 630.7 L927.6 631.8 L922.7 626.9 L944.6 608.3 L950.1 601.0 L949.2 608.1 L942.6 623.7 L937.0 624.7 L932.5 630.7 Z",
} as const;
