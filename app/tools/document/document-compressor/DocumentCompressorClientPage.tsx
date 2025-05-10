"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { ToolProgressIndicator } from "@/components/tool-progress-indicator"
import JSZip from "jszip"

interface CompressedFile {
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export default function DocumentCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState([50])
  const { toast } = useToast()

  const handleFilesSelected = (selectedFiles: File[]) => {
    // Filter for document files
    const documentFiles = selectedFiles.filter((file) => {
      const type = file.type.toLowerCase()
      return (
        type.includes("pdf") ||
        type.includes("word") ||
        type.includes("document") ||
        type.includes("presentation") ||
        type.includes("spreadsheet") ||
        type.includes("msword") ||
        type.includes("officedocument") ||
        file.name.endsWith(".pdf") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx") ||
        file.name.endsWith(".ppt") ||
        file.name.endsWith(".pptx") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".odt") ||
        file.name.endsWith(".odp") ||
        file.name.endsWith(".ods")
      )
    })

    if (documentFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload document files (PDF, DOCX, PPTX, etc.)",
        variant: "destructive",
      })
      return
    }

    setFiles(documentFiles)
  }

  const compressDocuments = async () => {
    if (files.length === 0) return

    setIsCompressing(true)
    const compressed: CompressedFile[] = []

    try {
      // Process each file
      for (const file of files) {
        const originalSize = file.size

        // Read the file
        const arrayBuffer = await file.arrayBuffer()

        // Create a new JSZip instance
        const zip = new JSZip()

        // Add the file to the zip
        zip.file(file.name, arrayBuffer)

        // Generate the zip with compression level based on slider
        const compressionOptions = {
          compression: "DEFLATE",
          compressionOptions: {
            level: compressionLevel[0] / 10, // Convert to 0-9 scale
          },
        }

        const compressedBlob = await zip.generateAsync({
          type: "blob",
          ...compressionOptions,
        })

        // Create URL for the compressed file
        const url = URL.createObjectURL(compressedBlob)

        compressed.push({
          name: file.name,
          originalSize,
          compressedSize: compressedBlob.size,
          url,
          type: file.type,
        })
      }

      setCompressedFiles(compressed)
      toast({
        title: "Compression complete",
        description: `Successfully compressed ${compressed.length} document${compressed.length !== 1 ? "s" : ""}`,
      })
    } catch (error) {
      console.error("Error compressing documents:", error)
      toast({
        title: "Compression failed",
        description: "An error occurred while compressing your documents",
        variant: "destructive",
      })
    } finally {
      setIsCompressing(false)
    }
  }

  const clearAll = () => {
    // Revoke object URLs to prevent memory leaks
    compressedFiles.forEach((file) => URL.revokeObjectURL(file.url))
    setFiles([])
    setCompressedFiles([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <FileUploader
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.odt,.odp,.ods"
            maxFiles={10}
            maxSize={50 * 1024 * 1024} // 50MB
            onFilesSelected={handleFilesSelected}
            value={files}
            disabled={isCompressing}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Compression Level: {compressionLevel[0]}%</span>
                  <span className="text-sm text-muted-foreground">
                    {compressionLevel[0] < 30
                      ? "Low (Better Quality)"
                      : compressionLevel[0] > 70
                        ? "High (Smaller Size)"
                        : "Balanced"}
                  </span>
                </div>
                <Slider
                  value={compressionLevel}
                  onValueChange={setCompressionLevel}
                  min={10}
                  max={90}
                  step={10}
                  disabled={isCompressing}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={compressDocuments} disabled={isCompressing || files.length === 0}>
                  {isCompressing ? "Compressing..." : "Compress Documents"}
                </Button>
                <Button variant="outline" onClick={clearAll} disabled={isCompressing}>
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {isCompressing && <ToolProgressIndicator className="mt-6" />}
        </CardContent>
      </Card>

      {compressedFiles.length > 0 && <CompressedFilesList files={compressedFiles} allowDownloadAll />}
    </div>
  )
}
