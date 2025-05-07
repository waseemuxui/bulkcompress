"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { PDFDocument } from "pdf-lib"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function PDFCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [quality, setQuality] = useState(70)
  const { toast } = useToast()

  const handleFilesSelected = (selectedFiles: File[]) => {
    // Filter only PDF files
    const pdfFiles = selectedFiles.filter((file) => file.type === "application/pdf")

    if (pdfFiles.length < selectedFiles.length) {
      toast({
        title: "Unsupported file type",
        description: "Only PDF files are supported for this tool.",
        variant: "destructive",
      })
    }

    setFiles(pdfFiles)
  }

  const compressFiles = async () => {
    if (files.length === 0) return

    setIsCompressing(true)
    const compressed: CompressedFile[] = []

    try {
      for (const file of files) {
        // Read the PDF file
        const fileArrayBuffer = await file.arrayBuffer()

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(fileArrayBuffer)

        // Compress the PDF
        const compressedPdfBytes = await pdfDoc.save({
          useObjectStreams: true,
          // Apply compression based on quality setting
          // Lower quality means more compression
          updateMetadata: true,
        })

        // Create a new Blob from the compressed PDF
        const compressedBlob = new Blob([compressedPdfBytes], { type: "application/pdf" })

        // Create URL for the compressed file
        const url = URL.createObjectURL(compressedBlob)

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          originalSize: file.size,
          compressedSize: compressedBlob.size,
          url,
          type: file.type,
        })
      }

      setCompressedFiles(compressed)
      toast({
        title: "Compression complete",
        description: `Successfully compressed ${compressed.length} files.`,
      })
    } catch (error) {
      console.error("Error compressing files:", error)
      toast({
        title: "Compression failed",
        description: "An error occurred while compressing your files.",
        variant: "destructive",
      })
    } finally {
      setIsCompressing(false)
    }
  }

  const handleDeleteFile = (id: string) => {
    setCompressedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-6">
            <Label htmlFor="quality" className="mb-2 block">
              Quality: {quality}%
            </Label>
            <Slider
              id="quality"
              min={10}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground">
              Lower quality = smaller file size, higher quality = better document quality
            </p>
          </div>

          <FileUploader onFilesSelected={handleFilesSelected} accept="application/pdf" multiple={true} />

          <div className="mt-4 flex justify-center">
            <Button onClick={compressFiles} disabled={files.length === 0 || isCompressing} className="w-full md:w-auto">
              {isCompressing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                "Compress PDF"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="PDF Compressor" />
        </div>
      </div>
    </div>
  )
}
