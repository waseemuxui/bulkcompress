import Link from "next/link"
import { FileImage, FileText, Music, FileArchive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { SEOContent } from "@/components/seo-content"
import { FAQSection } from "@/components/faq-section"
import { Testimonials } from "@/components/testimonials"
import { TrustedBrands } from "@/components/trusted-brands"
import { TopTools } from "@/components/top-tools"
import { MainTool } from "@/components/main-tool"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />

      <TrustedBrands />

      <section className="container py-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Start Compressing Now</h2>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Select a file type and compress your files instantly
        </p>
        <MainTool />
      </section>

      <TopTools />

      <section className="container py-12 space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Compression Tools</h2>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          BulkCompress.com offers a variety of free online tools to compress your files
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            {
              title: "Image Compression",
              description: "Compress JPEG, PNG, WebP and other image formats",
              href: "/tools/image/image-compressor",
              icon: FileImage,
            },
            {
              title: "Audio Compression",
              description: "Compress MP3, WAV and other audio formats",
              href: "/tools/audio/audio-compressor",
              icon: Music,
            },
            {
              title: "Document Compression",
              description: "Compress PDF, DOCX and other document formats",
              href: "/tools/document/document-compressor",
              icon: FileText,
            },
            {
              title: "Archive Compression",
              description: "Compress ZIP, RAR, 7Z and other archive formats",
              href: "/tools/archive/archive-compressor",
              icon: FileArchive,
            },
            {
              title: "JPEG Compression",
              description: "Compress JPEG/JPG images with quality control",
              href: "/tools/image/jpeg-compressor",
              icon: FileImage,
            },
            {
              title: "PNG Compression",
              description: "Compress PNG images with transparency preservation",
              href: "/tools/image/png-compressor",
              icon: FileImage,
            },
            {
              title: "PDF Compression",
              description: "Compress PDF files while maintaining quality",
              href: "/tools/document/pdf-compressor",
              icon: FileText,
            },
            {
              title: "WebP Compression",
              description: "Compress WebP images for optimal web performance",
              href: "/tools/image/webp-compressor",
              icon: FileImage,
            },
          ].map((tool) => (
            <div
              key={tool.title}
              className="flex flex-col rounded-lg border bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="mb-2 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link href={tool.href}>Use Tool</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FeatureSection />
      <Testimonials />
      <SEOContent />
      <FAQSection />
    </div>
  )
}
