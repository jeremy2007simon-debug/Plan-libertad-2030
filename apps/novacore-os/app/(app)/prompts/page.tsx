import type { Metadata } from "next"
import { Sparkles } from "lucide-react"

import { PromptCard } from "@/components/features/prompts/prompt-card"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { SupabaseConnectionNotice } from "@/components/shared/supabase-connection-notice"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Prompts" }

export default async function PromptsPage() {
  const supabase = await createClient()
  const { data: categories, error } = await supabase
    .from("prompt_categories")
    .select("*, prompts(*)")
    .order("sort_order")

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Prompts"
        description="Biblioteca de prompts de IA, lista para copiar y usar."
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {error ? (
          <SupabaseConnectionNotice resource="los prompts" />
        ) : categories && categories.length > 0 ? (
          <Tabs defaultValue={categories[0].slug}>
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.slug}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.slug}>
                {category.prompts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {category.prompts.map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        title={prompt.title}
                        content={prompt.content}
                        tags={prompt.tags}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Sparkles}
                    title="Sin prompts en esta categoría"
                    description="Añade prompts en Supabase para esta categoría."
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <EmptyState
            icon={Sparkles}
            title="Todavía no hay prompts"
            description="Añade categorías y prompts en Supabase para construir la biblioteca."
          />
        )}
      </div>
    </div>
  )
}
