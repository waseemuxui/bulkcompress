"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 mb-6">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <h1 className="text-3xl font-bold mb-2">Something went wrong!</h1>

      <p className="text-muted-foreground max-w-md mb-8">
        We're sorry, but we encountered an error while processing your request.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
