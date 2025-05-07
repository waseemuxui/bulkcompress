"use client"

import { useState, useCallback } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ToolProgressIndicator } from "@/components/tool-progress-indicator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function WAVCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [sampleRate, setSampleRate] = useState("44100")
  const [bitDepth, setBitDepth] = useState("16")
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      // Filter only WAV files
      const wavFiles = selectedFiles.filter(
        (file) => file.type === "audio/wav" || file.name.toLowerCase().endsWith(".wav"),
      )

      if (wavFiles.length < selectedFiles.length) {
        toast({
          title: "Unsupported file type",
          description: "Only WAV files are supported for this tool.",
          variant: "destructive",
        })
      }

      setFiles(wavFiles)

      // Only update step if we have files
      if (wavFiles.length > 0) {
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

        // Create an offline audio context with the selected sample rate
        const offlineAudioContext = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length * (Number.parseInt(sampleRate) / audioBuffer.sampleRate),
          Number.parseInt(sampleRate),
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

        // Convert the rendered buffer to WAV format with the selected bit depth
        const wavBlob = audioBufferToWav(renderedBuffer, Number.parseInt(bitDepth))

        // Create URL for the compressed file
        const url = URL.createObjectURL(wavBlob)

        compressed.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          originalSize: file.size,
          compressedSize: wavBlob.size,
          url,
          type: "audio/wav",
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

  // Function to convert AudioBuffer to WAV Blob
  const audioBufferToWav = (buffer: AudioBuffer, bitDepth: number): Blob => {
    const numOfChannels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate

    // Calculate bytes per sample based on bit depth
    const bytesPerSample = bitDepth / 8
    const length = buffer.length * numOfChannels * bytesPerSample

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
    view.setUint32(28, sampleRate * numOfChannels * bytesPerSample, true)
    view.setUint16(32, numOfChannels * bytesPerSample, true)
    view.setUint16(34, bitDepth, true)

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

    // Convert to the appropriate bit depth
    let pcmData: Int16Array | Int8Array
    if (bitDepth === 16) {
      pcmData = new Int16Array(data.length)
      for (let i = 0; i < data.length; i++) {
        const s = Math.max(-1, Math.min(1, data[i]))
        pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff
      }
    } else {
      // 8-bit
      pcmData = new Int8Array(data.length)
      for (let i = 0; i < data.length; i++) {
        const s = Math.max(-1, Math.min(1, data[i]))
        pcmData[i] = s < 0 ? s * 0x80 : s * 0x7f
      }
    }

    // Create the final blob
    return new Blob([header, pcmData], { type: "audio/wav" })
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
          <div className="mb-6 space-y-4">
            <div>
              <Label htmlFor="sample-rate" className="mb-2 block">
                Sample Rate
              </Label>
              <Select value={sampleRate} onValueChange={setSampleRate}>
                <SelectTrigger id="sample-rate" className="w-full">
                  <SelectValue placeholder="Select sample rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8000">8 kHz (Low Quality)</SelectItem>
                  <SelectItem value="22050">22.05 kHz (Medium Quality)</SelectItem>
                  <SelectItem value="44100">44.1 kHz (CD Quality)</SelectItem>
                  <SelectItem value="48000">48 kHz (DVD Quality)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Lower sample rate = smaller file size, but lower audio quality
              </p>
            </div>

            <div>
              <Label htmlFor="bit-depth" className="mb-2 block">
                Bit Depth
              </Label>
              <Select value={bitDepth} onValueChange={setBitDepth}>
                <SelectTrigger id="bit-depth" className="w-full">
                  <SelectValue placeholder="Select bit depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8-bit (Low Quality)</SelectItem>
                  <SelectItem value="16">16-bit (CD Quality)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Lower bit depth = smaller file size, but lower audio quality
              </p>
            </div>
          </div>

          <FileUploader onFilesSelected={handleFilesSelected} accept="audio/wav,.wav" multiple={true} />

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
                "Compress WAV"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="WAV Compressor" />
        </div>
      </div>
    </div>
  )
}
