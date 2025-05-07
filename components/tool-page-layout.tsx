import type { ReactNode } from "react"
import { ToolIcon } from "@/components/tool-icon"

interface ToolPageLayoutProps {
  title: string
  description: string
  icon: string
  children: ReactNode
  socialShare?: ReactNode
}

export function ToolPageLayout({ title, description, icon, children, socialShare }: ToolPageLayoutProps) {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="mb-4">
          <ToolIcon type={icon} size="lg" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">{title}</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">{description}</p>
        {socialShare && <div className="mt-4">{socialShare}</div>}
      </div>
      <div className="flex justify-center w-full">{children}</div>
    </div>
  )
}
