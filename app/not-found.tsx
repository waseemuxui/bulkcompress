import Link from "next/link"
import { FileArchive } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white mb-6">
        <FileArchive className="h-10 w-10" />
        <div className="absolute inset-0 rounded-full bg-primary/5 blur-sm"></div>
      </div>

      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/all-tools">Browse All Tools</Link>
        </Button>
      </div>
    </div>
  )
}
