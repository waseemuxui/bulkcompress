"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  className?: string
}

export function FileUploader({
  onFilesSelected,
  accept = "*",
  multiple = true,
  maxSize = 40, // Default 40MB
  className = "",
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const filesArray = Array.from(fileList)
    const validFiles = filesArray.filter((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        console.error(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`)
        return false
      }
      return true
    })

    setFiles(validFiles)
  }

  const simulateUpload = useCallback(() => {
    if (files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // Simulate progress
    progressIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
            progressIntervalRef.current = null
          }
          setIsUploading(false)
          // Call onFilesSelected after the progress is complete
          onFilesSelected(files)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }, [files, onFilesSelected])

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleProcessClick = () => {
    simulateUpload()
  }

  const handleClearClick = () => {
    setFiles([])
    setUploadProgress(0)
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    setIsUploading(false)
  }

  const getFileIcon = (file: File) => {
    return <FileImage className="h-5 w-5" />
  }

  const acceptTypes = accept
    .split(",")
    .filter((t) => t.trim() !== "*")
    .map((t) => t.replace("image/", "").toUpperCase())
    .join(", ")

  return (
    <div className="flex w-full max-w-[1200px] items-center justify-center">
      <div className="w-full max-w-[700px]">
        <div
          role="presentation"
          tabIndex={0}
          className={`relative w-full rounded-2xl border-2 border-dashed p-10 transition-all duration-300 bg-white/60 backdrop-blur-sm overflow-hidden border-gray-300 hover:border-[#6366F1]/50 hover:bg-gray-50/50 ${isDragging ? "border-[#6366F1]" : ""}`}
          style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)" }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#6366F1]/20 to-[#EC4899]/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#EC4899]/20 to-[#6366F1]/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[500px] bg-gradient-to-r from-[#6366F1]/5 via-[#EC4899]/5 to-[#6366F1]/5 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-6 left-6 w-2 h-2 bg-[#6366F1] rounded-full animate-pulse"></div>
            <div
              className="absolute top-6 right-6 w-2 h-2 bg-[#EC4899] rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-6 left-6 w-2 h-2 bg-[#EC4899] rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-6 right-6 w-2 h-2 bg-[#6366F1] rounded-full animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInputChange}
          />

          {files.length === 0 ? (
            <>
              <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#6366F1] to-[#EC4899] rounded-full opacity-20 group-hover:opacity-100 blur transition duration-500"></div>
                  <img
                    alt="Upload illustration"
                    fetchPriority="high"
                    width="60"
                    height="60"
                    src="/dropzone.png"
                    className="w-auto h-auto relative"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#EC4899]">
                    Drop your {accept.includes("image") ? "image" : "file"} here
                  </h2>
                  <p className="text-sm text-gray-600">or click to browse from your device</p>
                </div>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 shadow-lg shadow-[#6366F1]/20"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Select {accept.includes("image") ? "Image" : "File"}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 mt-2">
                  {accept !== "*" && (
                    <>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {acceptTypes || accept}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    </>
                  )}
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Up to {maxSize}MB
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Instant Processing
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">Selected Files</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center rounded-md bg-background/50 p-2">
                        {getFileIcon(file)}
                        <span className="ml-2 text-sm">{file.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isUploading ? (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2 w-full" />
                    <p className="text-xs text-muted-foreground">Processing... {uploadProgress}%</p>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleClearClick}>
                      Clear
                    </Button>
                    <Button
                      onClick={handleProcessClick}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] px-8 py-3 text-base font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 shadow-lg shadow-[#6366F1]/20"
                    >
                      Process Files
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-100">
            <span>⚡</span>
            <span>Instant AI Processing</span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-100">
            <span>🔒</span>
            <span>100% Private & Secure</span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-100">
            <span>💯</span>
            <span>High-Quality Results</span>
          </div>
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-sm border border-gray-100">
            <span>🎁</span>
            <span>Completely Free</span>
          </div>
        </div>
      </div>
    </div>
  )
}
