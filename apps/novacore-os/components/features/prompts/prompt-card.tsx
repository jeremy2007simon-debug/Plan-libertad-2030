"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PromptCard({
  title,
  content,
  tags,
}: {
  title: string
  content: string
  tags: string[]
}) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success("Prompt copiado al portapapeles.")
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="flex h-full flex-col gap-3 py-5">
      <CardHeader className="flex flex-row items-start justify-between gap-2 px-5">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Copiar prompt">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 px-5">
        <p className="line-clamp-4 text-sm text-muted-foreground">{content}</p>
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
