"use client"

import { useState, useCallback } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ToolProgressIndicator } from "@/components/tool-progress-indicator"
import JSZip from "jszip"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function SevenZipCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState("6")
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      // Filter only 7Z files
      const sevenZipFiles = selectedFiles.filter(
        (file) => file.type === "application/x-7z-compressed" || file.name.endsWith(".7z"),
      )

      if (sevenZipFiles.length < selectedFiles.length) {
        toast({
          title: "Unsupported file type",
          description: "Only 7Z files are supported for this tool.",
          variant: "destructive",
        })
      }

      setFiles(sevenZipFiles)

      // Only update step if we have files
      if (sevenZipFiles.length > 0) {
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
        // Note: Browser-based 7Z decompression is limited
        // In a real implementation, we would use a server-side solution
        // For this demo, we'll convert 7Z to ZIP with high compression

        // Create a new ZIP with high compression
        const zip = new JSZip()

        // Add the 7Z file as-is to the ZIP (we can't decompress it in the browser)
        zip.file(file.name, await file.arrayBuffer(), {
          compression: "DEFLATE",
          compressionOptions: {
            level: Number.parseInt(compressionLevel),
          },
        })

        // Generate the compressed ZIP
        const compressedContent = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: Number.parseInt(compressionLevel),
          },
        })

        // Create URL for the compressed file
        const url = URL.createObjectURL(compressedContent)

        // Change the extension from .7z to .zip
        const fileName = file.name.substring(0, file.name.lastIndexOf(".")) + ".zip"

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: fileName,
          originalSize: file.size,
          compressedSize: compressedContent.size,
          url,
          type: "application/zip",
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
          <div className="mb-6">
            <Label htmlFor="compression-level" className="mb-2 block">
              Compression Level
            </Label>
            <Select value={compressionLevel} onValueChange={setCompressionLevel}>
              <SelectTrigger id="compression-level" className="w-full">
                <SelectValue placeholder="Select compression level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Level 1 (Fastest)</SelectItem>
                <SelectItem value="3">Level 3 (Fast)</SelectItem>
                <SelectItem value="6">Level 6 (Default)</SelectItem>
                <SelectItem value="9">Level 9 (Best Compression)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              Higher compression level = smaller file size, but slower compression
            </p>
          </div>

          <FileUploader
            onFilesSelected={handleFilesSelected}
            accept=".7z,application/x-7z-compressed"
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
                "Compress 7Z"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="7Z Compressor" />
        </div>
      </div>
    </div>
  )
}
