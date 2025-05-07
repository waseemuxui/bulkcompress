"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { CompressedFilesList } from "@/components/compressed-files-list"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import JSZip from "jszip"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

export function ZIPCompressorClientPage() {
  const [files, setFiles] = useState<File[]>([])
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([])
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState("6")
  const { toast } = useToast()

  const handleFilesSelected = (selectedFiles: File[]) => {
    // Filter only ZIP files
    const zipFiles = selectedFiles.filter(
      (file) =>
        file.type === "application/zip" || file.type === "application/x-zip-compressed" || file.name.endsWith(".zip"),
    )

    if (zipFiles.length < selectedFiles.length) {
      toast({
        title: "Unsupported file type",
        description: "Only ZIP files are supported for this tool.",
        variant: "destructive",
      })
    }

    setFiles(zipFiles)
  }

  const compressFiles = async () => {
    if (files.length === 0) return

    setIsCompressing(true)
    const compressed: CompressedFile[] = []

    try {
      for (const file of files) {
        // Read the ZIP file
        const fileArrayBuffer = await file.arrayBuffer()

        // Load the ZIP archive
        const zip = new JSZip()
        const loadedZip = await zip.loadAsync(fileArrayBuffer)

        // Create a new ZIP with higher compression
        const newZip = new JSZip()

        // Copy all files with the selected compression level
        for (const [path, zipEntry] of Object.entries(loadedZip.files)) {
          if (!zipEntry.dir) {
            const content = await zipEntry.async("arraybuffer")
            newZip.file(path, content, {
              compression: "DEFLATE",
              compressionOptions: {
                level: Number.parseInt(compressionLevel),
              },
            })
          } else {
            newZip.folder(path)
          }
        }

        // Generate the compressed ZIP
        const compressedContent = await newZip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: Number.parseInt(compressionLevel),
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
          type: "application/zip",
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
            accept=".zip,application/zip,application/x-zip-compressed"
            multiple={true}
          />

          <div className="mt-4 flex justify-center">
            <Button onClick={compressFiles} disabled={files.length === 0 || isCompressing} className="w-full md:w-auto">
              {isCompressing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Compressing...
                </>
              ) : (
                "Compress ZIP"
              )}
            </Button>
          </div>
        </div>

        <div>
          <CompressedFilesList files={compressedFiles} onDelete={handleDeleteFile} toolName="ZIP Compressor" />
        </div>
      </div>
    </div>
  )
}
