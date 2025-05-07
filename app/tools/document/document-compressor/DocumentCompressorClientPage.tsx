"use client"

import { useState, useCallback } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ToolProgressIndicator } from "@/components/tool-progress-indicator"
import { Switch } from "@/components/ui/switch"

// Import libraries for document compression
import { PDFDocument } from "pdf-lib"
import JSZip from "jszip"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function DocumentCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [quality, setQuality] = useState(80)
  const [compressionLevel, setCompressionLevel] = useState(6)
  const [optimizeImages, setOptimizeImages] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      // Filter only document files
      const documentFiles = selectedFiles.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.name.toLowerCase().endsWith(".pdf") ||
          file.name.toLowerCase().endsWith(".docx") ||
          file.name.toLowerCase().endsWith(".pptx") ||
          file.name.toLowerCase().endsWith(".xlsx"),
      )

      if (documentFiles.length < selectedFiles.length) {
        toast({
          title: "Unsupported file type",
          description: "Only PDF, DOCX, PPTX, and XLSX files are supported for this tool.",
          variant: "destructive",
        })
      }

      setFiles(documentFiles)

      // Only update step if we have files
      if (documentFiles.length > 0) {
        setCurrentStep(2)
      }
    },
    [toast],
  )

  const compressFiles = async () => {
    if (files.length === 0) return

    setIsCompressing(true)
    setCurrentStep(3)
    const compressed: CompressedFile[] = []

    try {
      for (const file of files) {
        let compressedBlob: Blob
        let url: string

        // Determine file type and apply appropriate compression
        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
          // Compress PDF
          const fileArrayBuffer = await file.arrayBuffer()
          const pdfDoc = await PDFDocument.load(fileArrayBuffer)

          const compressedPdfBytes = await pdfDoc.save({
            useObjectStreams: true,
            updateMetadata: true,
          })

          compressedBlob = new Blob([compressedPdfBytes], { type: "application/pdf" })
          url = URL.createObjectURL(compressedBlob)
        } else if (
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.name.toLowerCase().endsWith(".docx") ||
          file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          file.name.toLowerCase().endsWith(".pptx") ||
          file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.name.toLowerCase().endsWith(".xlsx")
        ) {
          // Compress Office documents (DOCX, PPTX, XLSX)
          const fileArrayBuffer = await file.arrayBuffer()

          // Load the Office document (which is a ZIP archive)
          const zip = new JSZip()
          const loadedZip = await zip.loadAsync(fileArrayBuffer)

          // Create a new ZIP with higher compression
          const newZip = new JSZip()

          // Process each file in the Office document
          for (const [path, zipEntry] of Object.entries(loadedZip.files)) {
            if (!zipEntry.dir) {
              // Apply special handling for images if optimizeImages is true
              if (optimizeImages && (path.includes("media/") || path.includes("image"))) {
                const content = await zipEntry.async("arraybuffer")
                newZip.file(path, content, {
                  compression: "DEFLATE",
                  compressionOptions: {
                    level: 9, // Maximum compression for images
                  },
                })
              } else {
                const content = await zipEntry.async("arraybuffer")
                newZip.file(path, content, {
                  compression: "DEFLATE",
                  compressionOptions: {
                    level: compressionLevel,
                  },
                })
              }
            } else {
              newZip.folder(path)
            }
          }

          // Generate the compressed Office document
          compressedBlob = await newZip.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: {
              level: compressionLevel,
            },
          })

          url = URL.createObjectURL(compressedBlob)
        } else {
          // Unsupported file type
          continue
        }

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          originalSize: file.size,
          compressedSize: compressedBlob.size,
          url,
          type: file.type || "application/octet-stream",
        })
      }

      setCompressedFiles(compressed)
      setCurrentStep(4)
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
      <ToolProgressIndicator currentStep={currentStep} totalSteps={4} />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-6 space-y-4">
            <div>
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

            <div>
              <Label htmlFor="compression-level" className="mb-2 block">
                Compression Level: {compressionLevel}
              </Label>
              <Slider
                id="compression-level"
                min={1}
                max={9}
                step={1}
                value={[compressionLevel]}
                onValueChange={(value) => setCompressionLevel(value[0])}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                Higher compression level = smaller file size, but slower compression
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="optimize-images" checked={optimizeImages} onCheckedChange={setOptimizeImages} />
              <Label htmlFor="optimize-images">Optimize embedded images</Label>
            </div>
          </div>

          <FileUploader
            onFilesSelected={handleFilesSelected}
            accept=".pdf,.docx,.pptx,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            multiple={true}
          />

          <div className="mt-4 flex justify-center">
            <Button
              onClick={compressFiles}
              disabled={files.length === 0 || isCompressing}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 shadow-lg shadow-[#6366F1]/20"
            >
              {isCompressing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                "Compress Documents"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="Document Compressor" />
        </div>
      </div>
    </div>
  )
}
