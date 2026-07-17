import type { Metadata } from "next"
import { Suspense } from "react"

import { LoginForm } from "@/components/features/auth/login-form"
import { NovaCoreMark } from "@/components/shared/novacore-mark"

export const metadata: Metadata = {
  title: "Iniciar sesión",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <NovaCoreMark className="size-10" />
          <div>
            <h1 className="text-lg font-semibold">NovaCore OS</h1>
            <p className="text-sm text-muted-foreground">
              El sistema operativo interno de tu empresa.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
