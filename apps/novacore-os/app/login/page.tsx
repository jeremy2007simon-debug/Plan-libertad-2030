import type { Metadata } from "next"
import { Suspense } from "react"

import { LoginForm } from "@/components/features/auth/login-form"
import { NovaCoreMark } from "@/components/shared/novacore-mark"

export const metadata: Metadata = {
  title: "Iniciar sesión",
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_60%)]"
      />
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <NovaCoreMark className="size-11 drop-shadow-[0_8px_16px_color-mix(in_oklch,var(--primary)_35%,transparent)]" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">NovaCore OS</h1>
            <p className="text-sm text-muted-foreground">
              El sistema operativo interno de tu empresa.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-card p-7 shadow-[var(--shadow-popover)] ring-1 ring-foreground/[0.04]">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
