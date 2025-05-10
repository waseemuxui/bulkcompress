"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileArchive, FileImage, FileText, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MainTool() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("image")

  const handleToolSelect = (path: string) => {
    router.push(path)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <FileImage className="h-4 w-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
            <TabsTrigger value="document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="archive" className="flex items-center gap-2">
              <FileArchive className="h-4 w-4" />
              <span className="hidden sm:inline">Archives</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "JPEG", path: "/tools/image/jpeg-compressor" },
                { name: "PNG", path: "/tools/image/png-compressor" },
                { name: "WebP", path: "/tools/image/webp-compressor" },
                { name: "All Images", path: "/tools/image/image-compressor" },
              ].map((format) => (
                <Button
                  key={format.name}
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-1"
                  onClick={() => handleToolSelect(format.path)}
                >
                  <FileImage className="h-6 w-6 mb-1" />
                  {format.name}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="document" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "PDF", path: "/tools/document/pdf-compressor" },
                { name: "DOCX", path: "/tools/document/docx-compressor" },
                { name: "All Documents", path: "/tools/document/document-compressor" },
              ].map((format) => (
                <Button
                  key={format.name}
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-1"
                  onClick={() => handleToolSelect(format.path)}
                >
                  <FileText className="h-6 w-6 mb-1" />
                  {format.name}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "MP3", path: "/tools/audio/mp3-compressor" },
                { name: "WAV", path: "/tools/audio/wav-compressor" },
                { name: "All Audio", path: "/tools/audio/audio-compressor" },
              ].map((format) => (
                <Button
                  key={format.name}
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-1"
                  onClick={() => handleToolSelect(format.path)}
                >
                  <Music className="h-6 w-6 mb-1" />
                  {format.name}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archive" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "ZIP", path: "/tools/archive/zip-compressor" },
                { name: "All Archives", path: "/tools/archive/archive-compressor" },
              ].map((format) => (
                <Button
                  key={format.name}
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-1"
                  onClick={() => handleToolSelect(format.path)}
                >
                  <FileArchive className="h-6 w-6 mb-1" />
                  {format.name}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
