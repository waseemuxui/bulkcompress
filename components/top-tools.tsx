"use client"

import { useState } from "react"
import Link from "next/link"
import { FileImage, FileText, FileVideo, Music, FileArchive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolIcon } from "@/components/tool-icon"

export function TopTools() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "image", label: "Images", icon: FileImage },
    { id: "video", label: "Videos", icon: FileVideo },
    { id: "audio", label: "Audio", icon: Music },
    { id: "document", label: "Documents", icon: FileText },
    { id: "archive", label: "Archives", icon: FileArchive },
  ]

  const tools = [
    {
      id: "jpeg-compressor",
      name: "JPEG Compressor",
      description: "Compress JPEG images with quality control",
      href: "/tools/image/jpeg-compressor",
      type: "jpeg",
      category: "image",
      popular: true,
    },
    {
      id: "png-compressor",
      name: "PNG Compressor",
      description: "Compress PNG images while preserving transparency",
      href: "/tools/image/png-compressor",
      type: "png",
      category: "image",
      popular: true,
    },
    {
      id: "pdf-compressor",
      name: "PDF Compressor",
      description: "Compress PDF files while maintaining quality",
      href: "/tools/document/pdf-compressor",
      type: "pdf",
      category: "document",
      popular: true,
    },
    {
      id: "audio-compressor",
      name: "Audio Compressor",
      description: "Compress audio files while preserving quality",
      href: "/tools/audio/audio-compressor",
      type: "audio",
      category: "audio",
      popular: false,
    },
    {
      id: "zip-compressor",
      name: "ZIP Compressor",
      description: "Compress ZIP files for optimal storage",
      href: "/tools/archive/zip-compressor",
      type: "zip",
      category: "archive",
      popular: false,
    },
  ]

  const filteredTools = activeCategory === "all" ? tools : tools.filter((tool) => tool.category === activeCategory)

  return (
    <section className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Top Compression Tools</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground">
          Our most popular tools to compress your files quickly and efficiently
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon && <category.icon className="mr-2 h-4 w-4" />}
            {category.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="flex flex-col rounded-xl border bg-white/60 backdrop-blur-sm text-card-foreground shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="relative">
              {tool.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className="p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#6366F1]/20 to-[#EC4899]/20 flex items-center justify-center">
                  <ToolIcon type={tool.type} className="h-6 w-6 text-[#6366F1]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 text-white border-0"
              >
                <Link href={tool.href}>Use Tool</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/all-tools">View All Tools</Link>
        </Button>
      </div>
    </section>
  )
}
