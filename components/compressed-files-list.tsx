"use client"

import { useState } from "react"
import { Download, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialShare } from "@/components/social-share"
import { ToolIcon } from "@/components/tool-icon"

interface CompressedFile {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  type: string
}

interface CompressedFilesListProps {
  files: CompressedFile[]
  onDelete: (id: string) => void
  toolName: string
}

export function CompressedFilesList({ files, onDelete, toolName }: CompressedFilesListProps) {
  const [expandedFile, setExpandedFile] = useState<string | null>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const calculateSavings = (original: number, compressed: number) => {
    if (original === 0) return "0%"
    const savings = ((original - compressed) / original) * 100
    return `${savings.toFixed(1)}%`
  }

  const handleDownload = (file: CompressedFile) => {
    const link = document.createElement("a")
    link.href = file.url

    // Rename the file to include bulkcompress.com
    const fileExtension = file.name.split(".").pop()
    const fileName = file.name.substring(0, file.name.lastIndexOf("."))
    const newFileName = `bulkcompress.com-${fileName}.${fileExtension}`

    link.download = newFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (files.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Compressed Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ToolIcon type={file.type} className="h-8 w-8" />
                  <div>
                    <h3 className="font-medium truncate max-w-[200px] sm:max-w-[300px]">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.originalSize)} → {formatFileSize(file.compressedSize)} (
                      {calculateSavings(file.originalSize, file.compressedSize)} saved)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <SocialShare
                    title={`${toolName} - BulkCompress.com`}
                    text={`I just compressed ${file.name} and saved ${calculateSavings(file.originalSize, file.compressedSize)} using ${toolName} on BulkCompress.com!`}
                  />
                  <Button variant="outline" size="icon" onClick={() => handleDownload(file)} title="Download">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onDelete(file.id)} title="Delete">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
