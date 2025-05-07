"use client"

import { useState } from "react"
import { FileImage, FileText, Music, FileArchive } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const tools = [
  {
    id: "image",
    label: "Image",
    icon: FileImage,
    accept: ".jpg,.jpeg,.png,.webp,.gif",
    description: "Compress JPEG, PNG, WebP, and GIF images",
    href: "/tools/image/image-compressor",
  },
  {
    id: "document",
    label: "Document",
    icon: FileText,
    accept: ".pdf,.docx,.pptx,.xlsx",
    description: "Compress PDF, DOCX, PPTX, and XLSX documents",
    href: "/tools/document/document-compressor",
  },
  {
    id: "audio",
    label: "Audio",
    icon: Music,
    accept: ".mp3,.wav",
    description: "Compress MP3 and WAV audio files",
    href: "/tools/audio/audio-compressor",
  },
  {
    id: "archive",
    label: "Archive",
    icon: FileArchive,
    accept: ".zip,.rar,.7z",
    description: "Compress ZIP, RAR, and 7Z archives",
    href: "/tools/archive/archive-compressor",
  },
]

export function MainTool() {
  const [activeTab, setActiveTab] = useState("image")

  const activeTool = tools.find((tool) => tool.id === activeTab)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-primary/10">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              {tools.map((tool) => (
                <TabsTrigger key={tool.id} value={tool.id} className="flex flex-col items-center gap-1 py-3">
                  <tool.icon className="h-5 w-5" />
                  <span>{tool.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tools.map((tool) => (
              <TabsContent key={tool.id} value={tool.id} className="mt-0">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">{tool.label} Compression</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>

                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-gray-300 bg-white/60 backdrop-blur-sm">
                  <div className="mb-6 text-center">
                    <tool.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h4 className="text-lg font-medium">Ready to compress your {tool.label.toLowerCase()} files?</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our specialized {tool.label.toLowerCase()} compression tool offers the best results
                    </p>
                  </div>

                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#6366F1] to-[#EC4899] hover:opacity-90 text-white border-0"
                  >
                    <Link href={tool.href}>Go to {tool.label} Compressor</Link>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
