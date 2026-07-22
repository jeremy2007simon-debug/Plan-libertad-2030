"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"

export type ActionResult = { error: string | null }

export async function toggleTaskStatus(
  id: string,
  done: boolean
): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("tasks")
    .update({ status: done ? "completada" : "pendiente" })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  return { error: null }
}
