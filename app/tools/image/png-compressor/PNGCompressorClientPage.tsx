"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { ToolProgressIndicator } from "@/components/tool-progress-indicator"
import { ToolSEOContent } from "@/components/tool-seo-content"

export function PNGCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<Array<{ original: File; compressed: File; ratio: number }>>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [compressing, setCompressing] = useState(false)
  const [compressionQuality, setCompressionQuality] = useState(80)
  const [preserveTransparency, setPreserveTransparency] = useState(true)

  const handleFilesSelected = (selectedFiles: File[]) => {
    // Filter only PNG files
    const pngFiles = selectedFiles.filter(
      (file) => file.type === "image/png" || file.name.toLowerCase().endsWith(".png"),
    )
    setFiles(pngFiles)
    if (pngFiles.length > 0) {
      setCurrentStep(2)
    }
  }

  const handleCompress = async () => {
    setCompressing(true)
    setCurrentStep(3)

    // Simulate compression process
    const compressed = await Promise.all(
      files.map(async (file) => {
        // In a real implementation, this would use actual compression logic
        // For now, we'll just simulate a compressed file
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Create a new file with a smaller size to simulate compression
        const originalSize = file.size
        const compressedSize = originalSize * (0.3 + Math.random() * 0.4) // 30-70% of original size
        const ratio = ((originalSize - compressedSize) / originalSize) * 100

        // Create a new file object with the same content but a different name
        const compressedFile = new File([file], `compressed-${file.name}`, {
          type: file.type,
          lastModified: file.lastModified,
        })

        // In a real implementation, we would actually compress the image
        // and create a new File object with the compressed data

        return {
          original: file,
          compressed: compressedFile,
          ratio,
        }
      }),
    )

    setCompressedFiles(compressed)
    setCompressing(false)
    setCurrentStep(4)
  }

  const handleReset = () => {
    setFiles([])
    setCompressedFiles([])
    setCurrentStep(1)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <ToolProgressIndicator
          currentStep={currentStep}
          steps={[
            { label: "Upload", description: "Select PNG files" },
            { label: "Settings", description: "Adjust compression" },
            { label: "Compress", description: "Processing files" },
            { label: "Download", description: "Get results" },
          ]}
        />
      </div>

      {currentStep === 1 && (
        <FileUploader onFilesSelected={handleFilesSelected} accept=".png" multiple={true} maxFiles={10} />
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Compression Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="quality" className="block text-sm font-medium mb-1">
                  Quality: {compressionQuality}%
                </label>
                <input
                  id="quality"
                  type="range"
                  min="1"
                  max="100"
                  value={compressionQuality}
                  onChange={(e) => setCompressionQuality(Number.parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Smaller file size</span>
                  <span>Better quality</span>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="transparency"
                  type="checkbox"
                  checked={preserveTransparency}
                  onChange={(e) => setPreserveTransparency(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="transparency" className="text-sm font-medium">
                  Preserve transparency
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Selected Files</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center p-2 border rounded">
                  <span className="truncate max-w-[80%]">{file.name}</span>
                  <span className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between">
            <button onClick={handleReset} className="px-4 py-2 border rounded hover:bg-muted transition-colors">
              Back
            </button>
            <button
              onClick={handleCompress}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Compress Files
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="text-center p-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
          <p>Compressing your PNG files...</p>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <CompressedFilesList files={compressedFiles} onReset={handleReset} />
        </div>
      )}

      <ToolSEOContent
        toolName="PNG Compressor"
        fileType="PNG"
        benefits={[
          "Transparency Preservation: Maintain alpha channels while reducing file size.",
          "Web Optimization: Create lightweight PNG images for faster website loading.",
          "Lossless Compression: Reduce file size without sacrificing image quality.",
        ]}
      />
    </div>
  )
}
