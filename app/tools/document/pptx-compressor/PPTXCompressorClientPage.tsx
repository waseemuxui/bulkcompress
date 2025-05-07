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

// For PPTX compression, we'll use JSZip to handle the PPTX file (which is a ZIP archive)
import JSZip from "jszip"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function PPTXCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState(6)
  const [compressImages, setCompressImages] = useState(true)
  const [removeNotes, setRemoveNotes] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      // Filter only PPTX files
      const pptxFiles = selectedFiles.filter(
        (file) =>
          file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          file.name.toLowerCase().endsWith(".pptx"),
      )

      if (pptxFiles.length < selectedFiles.length) {
        toast({
          title: "Unsupported file type",
          description: "Only PPTX files are supported for this tool.",
          variant: "destructive",
        })
      }

      setFiles(pptxFiles)

      // Only update step if we have files
      if (pptxFiles.length > 0) {
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
        // Read the PPTX file
        const fileArrayBuffer = await file.arrayBuffer()

        // Load the PPTX file (which is a ZIP archive)
        const zip = new JSZip()
        const loadedZip = await zip.loadAsync(fileArrayBuffer)

        // Create a new ZIP with higher compression
        const newZip = new JSZip()

        // Process each file in the PPTX
        for (const [path, zipEntry] of Object.entries(loadedZip.files)) {
          if (!zipEntry.dir) {
            // Skip notes files if removeNotes is true
            if (removeNotes && path.includes("notesSlide")) {
              continue
            }

            // Compress images if compressImages is true
            if (compressImages && (path.includes("media/") || path.includes("image"))) {
              // For image files, we would normally apply additional compression
              // This is a simplified approach - in a real implementation, we would use image compression libraries
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

        // Generate the compressed PPTX
        const compressedContent = await newZip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: compressionLevel,
          },
        })

        // Create URL for the compressed file
        const url = URL.createObjectURL(compressedContent)

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          originalSize: file.size,
          compressedSize: compressedContent.size,
          url,
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
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
              <Switch id="compress-images" checked={compressImages} onCheckedChange={setCompressImages} />
              <Label htmlFor="compress-images">Compress embedded images</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="remove-notes" checked={removeNotes} onCheckedChange={setRemoveNotes} />
              <Label htmlFor="remove-notes">Remove speaker notes</Label>
            </div>
          </div>

          <FileUploader
            onFilesSelected={handleFilesSelected}
            accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
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
                "Compress PPTX"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="PPTX Compressor" />
        </div>
      </div>
    </div>
  )
}
