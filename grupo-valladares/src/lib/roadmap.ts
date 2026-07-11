// Arquitectura preparada para futuras versiones de la plataforma.
//
// Nada de lo tipado aquí está implementado todavía: son los contratos que
// permitirán añadir estas capacidades sin rediseñar la base. Cada módulo
// futuro debe poder integrarse consumiendo estos tipos, sin tocar las
// secciones ya construidas.

/** Fases previstas de evolución de la plataforma, en orden. */
export type RoadmapPhase =
  | "area-privada-talleres"
  | "seguimiento-presupuestos"
  | "catalogo-inteligente"
  | "buscador-por-vehiculo"
  | "novacore-assistant"
  | "reserva-recogida"
  | "estado-pedidos";

export type RoadmapModule = {
  phase: RoadmapPhase;
  label: string;
  description: string;
  status: "planned";
};

export const ROADMAP: RoadmapModule[] = [
  {
    phase: "area-privada-talleres",
    label: "Área privada para talleres",
    description: "Acceso identificado con condiciones y catálogo propios por cliente profesional.",
    status: "planned",
  },
  {
    phase: "seguimiento-presupuestos",
    label: "Seguimiento de presupuestos",
    description: "Estado de cada solicitud enviada desde el formulario, en tiempo real.",
    status: "planned",
  },
  {
    phase: "catalogo-inteligente",
    label: "Catálogo inteligente",
    description: "Navegación de producto con recomendaciones por compatibilidad.",
    status: "planned",
  },
  {
    phase: "buscador-por-vehiculo",
    label: "Buscador avanzado por vehículo",
    description: "Filtrado de piezas por matrícula, marca, modelo y motorización.",
    status: "planned",
  },
  {
    phase: "novacore-assistant",
    label: "NovaCore Assistant",
    description: "Asistente conversacional para triaje de solicitudes y atención de primer nivel.",
    status: "planned",
  },
  {
    phase: "reserva-recogida",
    label: "Reserva de recogida",
    description: "Franjas horarias para recoger pedidos en tienda sin esperar.",
    status: "planned",
  },
  {
    phase: "estado-pedidos",
    label: "Estado de pedidos",
    description: "Trazabilidad del pedido desde la confirmación hasta la entrega.",
    status: "planned",
  },
];
