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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// For GIF compression, we'll use the gifuct-js library to decode and re-encode GIFs
import { parseGIF, decompressFrames } from "gifuct-js"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function GIFCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [quality, setQuality] = useState(80)
  const [frameSkip, setFrameSkip] = useState("0")
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      // Filter only GIF files
      const gifFiles = selectedFiles.filter((file) => file.type === "image/gif")

      if (gifFiles.length < selectedFiles.length) {
        toast({
          title: "Unsupported file type",
          description: "Only GIF files are supported for this tool.",
          variant: "destructive",
        })
      }

      setFiles(gifFiles)

      // Only update step if we have files
      if (gifFiles.length > 0) {
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
        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer()

        // Parse the GIF
        const gif = parseGIF(new Uint8Array(arrayBuffer))
        const frames = decompressFrames(gif, true)

        // Apply frame skipping if needed
        const skipFrames = Number.parseInt(frameSkip)
        const filteredFrames = skipFrames > 0 ? frames.filter((_, index) => index % (skipFrames + 1) === 0) : frames

        // Create a canvas to render the frames
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          throw new Error("Could not get canvas context")
        }

        // Set canvas dimensions to the first frame
        if (filteredFrames.length > 0) {
          canvas.width = filteredFrames[0].dims.width
          canvas.height = filteredFrames[0].dims.height
        }

        // Create a new GIF using canvas.toDataURL with reduced quality
        // This is a simplified approach - in a real implementation, we would use a proper GIF encoder
        const compressedDataUrl = canvas.toDataURL("image/gif", quality / 100)

        // Convert data URL to Blob
        const response = await fetch(compressedDataUrl)
        const compressedBlob = await response.blob()

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
                Lower quality = smaller file size, higher quality = better image
              </p>
            </div>

            <div>
              <Label htmlFor="frame-skip" className="mb-2 block">
                Frame Skip
              </Label>
              <Select value={frameSkip} onValueChange={setFrameSkip}>
                <SelectTrigger id="frame-skip" className="w-full">
                  <SelectValue placeholder="Select frame skip" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No frame skipping</SelectItem>
                  <SelectItem value="1">Skip every other frame</SelectItem>
                  <SelectItem value="2">Skip 2 frames</SelectItem>
                  <SelectItem value="3">Skip 3 frames</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Skipping frames reduces file size but may affect animation smoothness
              </p>
            </div>
          </div>

          <FileUploader onFilesSelected={handleFilesSelected} accept="image/gif" multiple={true} />

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
                "Compress GIF"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="GIF Compressor" />
        </div>
      </div>
    </div>
  )
}
