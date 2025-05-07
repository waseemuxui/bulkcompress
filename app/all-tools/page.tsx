import type { Metadata } from "next"
import Link from "next/link"
import { ToolIcon } from "@/components/tool-icon"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "All Tools - BulkCompress.com",
  description: "Browse all compression tools available on BulkCompress.com",
}

const tools = [
  {
    category: "Image Compression",
    items: [
      {
        name: "Image Compressor",
        description: "Compress multiple image formats at once",
        href: "/tools/image/image-compressor",
        type: "image",
      },
      {
        name: "JPEG Compressor",
        description: "Compress JPEG/JPG images with quality control",
        href: "/tools/image/jpeg-compressor",
        type: "jpeg",
      },
      {
        name: "PNG Compressor",
        description: "Compress PNG images while preserving transparency",
        href: "/tools/image/png-compressor",
        type: "png",
      },
      {
        name: "WebP Compressor",
        description: "Compress WebP images for optimal web performance",
        href: "/tools/image/webp-compressor",
        type: "webp",
      },
    ],
  },
  {
    category: "Audio Compression",
    items: [
      {
        name: "Audio Compressor",
        description: "Compress audio files while preserving quality",
        href: "/tools/audio/audio-compressor",
        type: "audio",
      },
    ],
  },
  {
    category: "Document Compression",
    items: [
      {
        name: "Document Compressor",
        description: "Compress multiple document formats at once",
        href: "/tools/document/document-compressor",
        type: "document",
      },
      {
        name: "PDF Compressor",
        description: "Compress PDF files while maintaining quality",
        href: "/tools/document/pdf-compressor",
        type: "pdf",
      },
      {
        name: "DOCX Compressor",
        description: "Compress DOCX files for easier sharing",
        href: "/tools/document/docx-compressor",
        type: "docx",
      },
    ],
  },
  {
    category: "Archive Compression",
    items: [
      {
        name: "Archive Compressor",
        description: "Compress multiple archive formats at once",
        href: "/tools/archive/archive-compressor",
        type: "archive",
      },
      {
        name: "ZIP Compressor",
        description: "Compress ZIP files for optimal storage",
        href: "/tools/archive/zip-compressor",
        type: "zip",
      },
    ],
  },
]

export default function AllToolsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Compression Tools</h1>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Browse our complete collection of free online compression tools
        </p>
      </div>

      <div className="space-y-10">
        {tools.map((category) => (
          <div key={category.category} className="space-y-4">
            <h2 className="text-2xl font-bold">{category.category}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((tool) => (
                <div
                  key={tool.href}
                  className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ToolIcon type={tool.type} className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0 mt-auto">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={tool.href}>Use Tool</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
