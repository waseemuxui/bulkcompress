"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function MP4CompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [quality, setQuality] = useState(28) // CRF value (lower is better quality)
  const [resolution, setResolution] = useState("original")
  const { toast } = useToast()

  const ffmpeg = createFFmpeg({
    log: true,
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
  })

  const handleFilesSelected = (selectedFiles: File[]) => {
    // Filter only MP4 files
    const mp4Files = selectedFiles.filter(
      (file) => file.type === "video/mp4" || file.name.toLowerCase().endsWith(".mp4"),
    )

    if (mp4Files.length < selectedFiles.length) {
      toast({
        title: "Unsupported file type",
        description: "Only MP4 files are supported for this tool.",
        variant: "destructive",
      })
    }

    setFiles(mp4Files)
  }

  const compressFiles = async () => {
    if (files.length === 0) return

    setIsCompressing(true)
    const compressed: CompressedFile[] = []

    try {
      // Load FFmpeg if not already loaded
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load()
      }

      for (const file of files) {
        // Write the file to FFmpeg's virtual file system
        ffmpeg.FS("writeFile", file.name, await fetchFile(file))

        // Prepare FFmpeg command
        let scaleFilter = ""
        if (resolution !== "original") {
          scaleFilter = `-vf scale=${resolution}`
        }

        // Run FFmpeg command to compress the video
        await ffmpeg.run(
          "-i",
          file.name,
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
          "output.mp4",
        )

        // Read the compressed file from FFmpeg's virtual file system
        const data = ffmpeg.FS("readFile", "output.mp4")

        // Create a Blob from the compressed file data
        const blob = new Blob([data.buffer], { type: "video/mp4" })

        // Create URL for the compressed file
        const url = URL.createObjectURL(blob)

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          originalSize: file.size,
          compressedSize: blob.size,
          url,
          type: "video/mp4",
        })

        // Clean up FFmpeg's virtual file system
        ffmpeg.FS("unlink", file.name)
        ffmpeg.FS("unlink", "output.mp4")
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

          <FileUploader onFilesSelected={handleFilesSelected} accept="video/mp4,.mp4" multiple={true} maxSize={100} />

          <div className="mt-4 flex justify-center">
            <Button onClick={compressFiles} disabled={files.length === 0 || isCompressing} className="w-full md:w-auto">
              {isCompressing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                "Compress MP4"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="MP4 Compressor" />
        </div>
      </div>
    </div>
  )
}
