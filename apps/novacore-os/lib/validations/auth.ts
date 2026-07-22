import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().trim().email("Introduce un email válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
