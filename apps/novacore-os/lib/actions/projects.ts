"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { projectFormSchema } from "@/lib/validations/project"

export type ActionResult = { error: string | null }

function normalize(data: ReturnType<typeof projectFormSchema.parse>) {
  return {
    ...data,
    library_model_id: data.library_model_id || null,
    owner_id: data.owner_id || null,
    start_date: data.start_date || null,
    due_date: data.due_date || null,
  }
}

export async function createProjectRecord(
  input: unknown
): Promise<ActionResult> {
  const parsed = projectFormSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos." }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("projects").insert(normalize(parsed.data))

  if (error) return { error: error.message }

  revalidatePath("/proyectos")
  return { error: null }
}

export async function updateProjectRecord(
  id: string,
  input: unknown
): Promise<ActionResult> {
  const parsed = projectFormSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos." }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("projects")
    .update(normalize(parsed.data))
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/proyectos")
  return { error: null }
}

export async function deleteProjectRecord(id: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/proyectos")
  return { error: null }
}
