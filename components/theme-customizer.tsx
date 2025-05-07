"use client"

import { useEffect, useState } from "react"
import { SunMoon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
      >
        <SunMoon className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
