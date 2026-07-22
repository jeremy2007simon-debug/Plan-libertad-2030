import type {
  AutomationStatus,
  BudgetStatus,
  ClientStatus,
  InvoiceStatus,
  MemberRole,
  ProjectStatus,
  TaskStatus,
} from "@/lib/types/database.types"

export type StatusTone = "good" | "warning" | "serious" | "critical" | "neutral"

export const memberRoleLabel: Record<MemberRole, string> = {
  owner: "Propietario",
  admin: "Administrador",
  member: "Miembro",
}

export const clientStatusMap: Record<ClientStatus, { label: string; tone: StatusTone }> = {
  potencial: { label: "Potencial", tone: "neutral" },
  activo: { label: "Activo", tone: "good" },
  pausado: { label: "Pausado", tone: "warning" },
  finalizado: { label: "Finalizado", tone: "neutral" },
}

export const projectStatusMap: Record<ProjectStatus, { label: string; tone: StatusTone }> = {
  pendiente: { label: "Pendiente", tone: "neutral" },
  en_desarrollo: { label: "En desarrollo", tone: "warning" },
  revision: { label: "Revisión", tone: "serious" },
  entregado: { label: "Entregado", tone: "good" },
  archivado: { label: "Archivado", tone: "neutral" },
}

export const budgetStatusMap: Record<BudgetStatus, { label: string; tone: StatusTone }> = {
  borrador: { label: "Borrador", tone: "neutral" },
  enviado: { label: "Enviado", tone: "warning" },
  aceptado: { label: "Aceptado", tone: "good" },
  rechazado: { label: "Rechazado", tone: "critical" },
}

export const invoiceStatusMap: Record<InvoiceStatus, { label: string; tone: StatusTone }> = {
  borrador: { label: "Borrador", tone: "neutral" },
  pendiente: { label: "Pendiente", tone: "warning" },
  pagada: { label: "Pagada", tone: "good" },
  vencida: { label: "Vencida", tone: "critical" },
  cancelada: { label: "Cancelada", tone: "neutral" },
}

export const automationStatusMap: Record<AutomationStatus, { label: string; tone: StatusTone }> = {
  activo: { label: "Activo", tone: "good" },
  pausado: { label: "Pausado", tone: "neutral" },
  error: { label: "Error", tone: "critical" },
}

export const taskStatusMap: Record<TaskStatus, { label: string; tone: StatusTone }> = {
  pendiente: { label: "Pendiente", tone: "neutral" },
  completada: { label: "Completada", tone: "good" },
}
