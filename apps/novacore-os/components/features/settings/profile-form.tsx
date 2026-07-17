"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateProfile } from "@/lib/actions/profile"

const schema = z.object({
  full_name: z.string().trim().min(2, "Introduce tu nombre completo."),
})

export function ProfileForm({
  fullName,
  email,
}: {
  fullName: string
  email: string
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: fullName },
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    const result = await updateProfile(values)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success("Perfil actualizado.")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormLabel>Email</FormLabel>
          <Input value={email} disabled />
        </div>
        <Button type="submit" className="w-fit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          Guardar cambios
        </Button>
      </form>
    </Form>
  )
}
