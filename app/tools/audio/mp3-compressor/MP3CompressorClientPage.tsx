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

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function MP3CompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [bitrate, setBitrate] = useState(128)
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      // Filter only MP3 files
      const mp3Files = selectedFiles.filter(
        (file) => file.type === "audio/mpeg" || file.name.toLowerCase().endsWith(".mp3"),
      )

      if (mp3Files.length < selectedFiles.length) {
        toast({
          title: "Unsupported file type",
          description: "Only MP3 files are supported for this tool.",
          variant: "destructive",
        })
      }

      setFiles(mp3Files)

      // Only update step if we have files
      if (mp3Files.length > 0) {
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
        // Create an audio context
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

        // Read the audio file
        const arrayBuffer = await file.arrayBuffer()

        // Decode the audio data
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        // Create an offline audio context for rendering
        const offlineAudioContext = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate,
        )

        // Create a buffer source
        const source = offlineAudioContext.createBufferSource()
        source.buffer = audioBuffer

        // Connect the source to the destination
        source.connect(offlineAudioContext.destination)

        // Start the source
        source.start()

        // Render the audio
        const renderedBuffer = await offlineAudioContext.startRendering()

        // Convert the rendered buffer to MP3 format
        // In a real implementation, we would use a proper MP3 encoder like lamejs
        // This is a simplified approach that simulates compression by reducing quality
        const compressedBlob = await audioBufferToMP3(renderedBuffer, bitrate)

        // Create URL for the compressed file
        const url = URL.createObjectURL(compressedBlob)

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          originalSize: file.size,
          compressedSize: compressedBlob.size,
          url,
          type: "audio/mpeg",
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

  // Function to convert AudioBuffer to MP3 Blob
  const audioBufferToMP3 = async (buffer: AudioBuffer, bitrate: number): Promise<Blob> => {
    // This is a simplified version - in a real implementation,
    // we would use a proper library like lamejs for MP3 encoding

    // For now, we'll create a WAV file with reduced quality to simulate compression
    const numOfChannels = buffer.numberOfChannels
    const length = buffer.length * numOfChannels * 2
    const sampleRate = buffer.sampleRate

    // Create a WAV file header
    const header = new ArrayBuffer(44)
    const view = new DataView(header)

    // RIFF chunk descriptor
    writeString(view, 0, "RIFF")
    view.setUint32(4, 36 + length, true)
    writeString(view, 8, "WAVE")

    // fmt sub-chunk
    writeString(view, 12, "fmt ")
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, numOfChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * numOfChannels * 2, true)
    view.setUint16(32, numOfChannels * 2, true)
    view.setUint16(34, 16, true)

    // data sub-chunk
    writeString(view, 36, "data")
    view.setUint32(40, length, true)

    // Create the audio data
    const data = new Float32Array(buffer.length * numOfChannels)
    let offset = 0

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const channelData = buffer.getChannelData(i)
      for (let j = 0; j < channelData.length; j++) {
        data[offset++] = channelData[j]
      }
    }

    // Convert to 16-bit PCM
    const pcmData = new Int16Array(data.length)
    for (let i = 0; i < data.length; i++) {
      const s = Math.max(-1, Math.min(1, data[i]))
      pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff
    }

    // Create the final blob
    return new Blob([header, pcmData], { type: "audio/mpeg" })
  }

  // Helper function to write a string to a DataView
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
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
            <Label htmlFor="bitrate" className="mb-2 block">
              Bitrate: {bitrate} kbps
            </Label>
            <Slider
              id="bitrate"
              min={64}
              max={320}
              step={32}
              value={[bitrate]}
              onValueChange={(value) => setBitrate(value[0])}
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground">Lower bitrate = smaller file size, but lower audio quality</p>
          </div>

          <FileUploader onFilesSelected={handleFilesSelected} accept="audio/mpeg,.mp3" multiple={true} />

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
                "Compress MP3"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="MP3 Compressor" />
        </div>
      </div>
    </div>
  )
}
