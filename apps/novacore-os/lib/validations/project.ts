import { z } from "zod"

export const projectStatusValues = [
  "pendiente",
  "en_desarrollo",
  "revision",
  "entregado",
  "archivado",
] as const

export const projectFormSchema = z.object({
  name: z.string().trim().min(2, "Introduce el nombre del proyecto."),
  client_id: z.string().min(1, "Selecciona un cliente."),
  status: z.enum(projectStatusValues),
  library_model_id: z.string(),
  owner_id: z.string(),
  start_date: z.string(),
  due_date: z.string(),
  notes: z.string().trim(),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>
