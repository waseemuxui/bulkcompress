import Link from "next/link"
import { FileArchive, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-1 px-3 mb-6 text-sm rounded-full bg-primary/10 text-primary">
            <span className="font-medium">100% Free Online Tools</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Compress Files with <span className="gradient-text">AI Magic</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your files instantly with our free AI-powered tool. Reduce file sizes and unleash your creativity
            with perfect results every time.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/all-tools">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools/image/image-compressor">Try Image Compression</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="feature-badge">
              <FileArchive className="mr-1 h-3 w-3" /> 100% Free
            </div>
            <div className="feature-badge">
              <FileArchive className="mr-1 h-3 w-3" /> No Sign-up Required
            </div>
            <div className="feature-badge">
              <FileArchive className="mr-1 h-3 w-3" /> High Quality Results
            </div>
            <div className="feature-badge">
              <FileArchive className="mr-1 h-3 w-3" /> Completely Free
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
