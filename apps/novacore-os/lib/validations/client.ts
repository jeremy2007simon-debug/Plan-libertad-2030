import { z } from "zod"

export const clientStatusValues = [
  "potencial",
  "activo",
  "pausado",
  "finalizado",
] as const

export const clientFormSchema = z.object({
  company_name: z.string().trim().min(2, "Introduce el nombre de la empresa."),
  contact_name: z.string().trim(),
  email: z.union([z.literal(""), z.string().trim().email("Email no válido.")]),
  phone: z.string().trim(),
  status: z.enum(clientStatusValues),
  plan: z.string().trim(),
  notes: z.string().trim(),
})

export type ClientFormValues = z.infer<typeof clientFormSchema>
