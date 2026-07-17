"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { clientFormSchema } from "@/lib/validations/client"

export type ActionResult = { error: string | null }

export async function createClientRecord(
  input: unknown
): Promise<ActionResult> {
  const parsed = clientFormSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos." }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("clients").insert({
    ...parsed.data,
    email: parsed.data.email || null,
  })

  if (error) return { error: error.message }

  revalidatePath("/clientes")
  return { error: null }
}

export async function updateClientRecord(
  id: string,
  input: unknown
): Promise<ActionResult> {
  const parsed = clientFormSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos." }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("clients")
    .update({ ...parsed.data, email: parsed.data.email || null })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/clientes")
  return { error: null }
}

export async function deleteClientRecord(id: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from("clients").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/clientes")
  return { error: null }
}
