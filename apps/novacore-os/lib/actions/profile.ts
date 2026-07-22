"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { createClient } from "@/lib/supabase/server"

const profileFormSchema = z.object({
  full_name: z.string().trim().min(2, "Introduce tu nombre completo."),
})

export async function updateProfile(input: unknown): Promise<{ error: string | null }> {
  const parsed = profileFormSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos." }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "No hay sesión activa." }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: parsed.data.full_name })
    .eq("id", user.id)

  if (error) return { error: error.message }

  revalidatePath("/configuracion")
  return { error: null }
}
