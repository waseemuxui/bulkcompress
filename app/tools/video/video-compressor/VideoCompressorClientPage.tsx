"use client"

import { useState, useCallback, useEffect } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ToolProgressIndicator } from "@/components/tool-progress-indicator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"

// Define types for FFmpeg
type FFmpeg = {
  load: () => Promise<void>
  isLoaded: () => boolean
  FS: (command: string, ...args: any[]) => any
  run: (...args: string[]) => Promise<void>
}

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

// Create a client-side only component
const VideoCompressorClient = () => {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [quality, setQuality] = useState(28) // CRF value (lower is better quality)
  const [resolution, setResolution] = useState("original")
  const [currentStep, setCurrentStep] = useState(1)
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false)
  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null)
  const [fetchFile, setFetchFile] = useState<((file: File) => Promise<Uint8Array>) | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Dynamically import FFmpeg only on the client side
    const loadFFmpegLibrary = async () => {
      try {
        const FFmpeg = await import("@ffmpeg/ffmpeg")
        const ffmpegInstance = FFmpeg.createFFmpeg({
          log: true,
          corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
        })
        setFfmpeg(ffmpegInstance)
        setFetchFile(() => FFmpeg.fetchFile)

        await ffmpegInstance.load()
        setFfmpegLoaded(true)
      } catch (error) {
        console.error("Error loading FFmpeg:", error)
        toast({
          title: "Error",
          description: "Failed to load video compression library. Please try again later.",
          variant: "destructive",
        })
      }
    }

    loadFFmpegLibrary()
  }, [toast])

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      // Filter only video files
      const videoFiles = selectedFiles.filter(
        (file) =>
          file.type.startsWith("video/") ||
          file.name.toLowerCase().endsWith(".mp4") ||
          file.name.toLowerCase().endsWith(".mov") ||
          file.name.toLowerCase().endsWith(".avi"),
      )

      if (videoFiles.length < selectedFiles.length) {
        toast({
          title: "Unsupported file type",
          description: "Only video files are supported for this tool.",
          variant: "destructive",
        })
      }

      setFiles(videoFiles)

      // Only update step if we have files
      if (videoFiles.length > 0) {
        setCurrentStep(2)
      }
    },
    [toast],
  )

  const compressFiles = async () => {
    if (files.length === 0 || !ffmpeg || !fetchFile) return

    setIsCompressing(true)
    setCurrentStep(3)
    const compressed: CompressedFile[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const safeFileName = `input_${i}_${Date.now()}.${file.name.split(".").pop()}`

        // Write the file to FFmpeg's virtual file system
        ffmpeg.FS("writeFile", safeFileName, await fetchFile(file))

        // Prepare FFmpeg command
        let scaleFilter = ""
        if (resolution !== "original") {
          scaleFilter = `-vf scale=${resolution}`
        }

        const outputFileName = `output_${i}_${Date.now()}.mp4`

        // Run FFmpeg command to compress the video
        await ffmpeg.run(
          "-i",
          safeFileName,
          "-c:v",
          "libx264",
          "-crf",
          quality.toString(),
          "-preset",
          "medium",
          "-c:a",
          "aac",
          "-b:a",
          "128k",
          ...(scaleFilter ? scaleFilter.split(" ") : []),
          outputFileName,
        )

        // Read the compressed file from FFmpeg's virtual file system
        const data = ffmpeg.FS("readFile", outputFileName)

        // Create a Blob from the compressed file data
        const blob = new Blob([data.buffer], { type: "video/mp4" })

        // Create URL for the compressed file
        const url = URL.createObjectURL(blob)

        // Change the extension to .mp4
        const fileName = file.name.substring(0, file.name.lastIndexOf(".")) + ".mp4"

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: fileName,
          originalSize: file.size,
          compressedSize: blob.size,
          url,
          type: "video/mp4",
        })

        // Clean up FFmpeg's virtual file system
        ffmpeg.FS("unlink", safeFileName)
        ffmpeg.FS("unlink", outputFileName)
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
    <div className="space-y-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <ToolProgressIndicator currentStep={currentStep} totalSteps={4} />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-6 space-y-4">
              <div>
                <Label htmlFor="quality" className="mb-2 block">
                  Quality: {quality} CRF
                </Label>
                <Slider
                  id="quality"
                  min={18}
                  max={40}
                  step={1}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  Lower CRF = higher quality, larger file size (18-28 is visually lossless)
                </p>
              </div>

              <div>
                <Label htmlFor="resolution" className="mb-2 block">
                  Resolution
                </Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger id="resolution" className="w-full">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Original Resolution</SelectItem>
                    <SelectItem value="-1:720">720p</SelectItem>
                    <SelectItem value="-1:480">480p</SelectItem>
                    <SelectItem value="-1:360">360p</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  Lower resolution = smaller file size, but lower quality
                </p>
              </div>
            </div>

            <FileUploader
              onFilesSelected={handleFilesSelected}
              accept="video/*,.mp4,.mov,.avi"
              multiple={true}
              maxSize={100}
            />

            <div className="mt-4 flex justify-center">
              <Button
                onClick={compressFiles}
                disabled={files.length === 0 || isCompressing || !ffmpegLoaded}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 shadow-lg shadow-[#6366F1]/20"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Compressing...
                  </>
                ) : !ffmpegLoaded ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Compress Videos"
                )}
              </Button>
            </div>
          </div>

          <div>
            <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="Video Compressor" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Use dynamic import with SSR disabled for the client component
export const VideoCompressorClientPage = dynamic(() => Promise.resolve(VideoCompressorClient), {
  ssr: false,
})
