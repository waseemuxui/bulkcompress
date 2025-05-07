"use client"

import { useState } from "react"
import { FileImage, FileText, FileVideo, Music, FileArchive } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { FileUploader } from "@/components/file-uploader"
import { ToolProgressIndicator } from "@/components/tool-progress-indicator"

const tools = [
  {
    id: "image",
    label: "Image",
    icon: FileImage,
    accept: ".jpg,.jpeg,.png,.webp,.gif",
    description: "Compress JPEG, PNG, WebP, and GIF images",
  },
  {
    id: "document",
    label: "Document",
    icon: FileText,
    accept: ".pdf,.docx,.pptx,.xlsx",
    description: "Compress PDF, DOCX, PPTX, and XLSX documents",
  },
  {
    id: "video",
    label: "Video",
    icon: FileVideo,
    accept: ".mp4,.mov,.avi",
    description: "Compress MP4, MOV, and AVI videos",
  },
  {
    id: "audio",
    label: "Audio",
    icon: Music,
    accept: ".mp3,.wav",
    description: "Compress MP3 and WAV audio files",
  },
  {
    id: "archive",
    label: "Archive",
    icon: FileArchive,
    accept: ".zip,.rar,.7z",
    description: "Compress ZIP, RAR, and 7Z archives",
  },
]

export function MainTool() {
  const [activeTab, setActiveTab] = useState("image")
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState<File[]>([])

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setCurrentStep(2)
  }

  const handleCompress = () => {
    setCurrentStep(3)
    // Simulate compression process
    setTimeout(() => {
      setCurrentStep(4)
    }, 2000)
  }

  const handleReset = () => {
    setFiles([])
    setCurrentStep(1)
  }

  const activeTool = tools.find((tool) => tool.id === activeTab)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-primary/10">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              {tools.map((tool) => (
                <TabsTrigger key={tool.id} value={tool.id} className="flex flex-col items-center gap-1 py-3">
                  <tool.icon className="h-5 w-5" />
                  <span>{tool.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tools.map((tool) => (
              <TabsContent key={tool.id} value={tool.id} className="mt-0">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">{tool.label} Compression</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>

                <ToolProgressIndicator
                  currentStep={currentStep}
                  steps={[
                    { label: "Upload", description: "Select files" },
                    { label: "Settings", description: "Adjust options" },
                    { label: "Compress", description: "Processing files" },
                    { label: "Download", description: "Get results" },
                  ]}
                />

                <div className="mt-6">
                  {currentStep === 1 && (
                    <FileUploader
                      onFilesSelected={handleFilesSelected}
                      accept={tool.accept}
                      multiple={true}
                      maxFiles={5}
                    />
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Compression Settings</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span>Quality</span>
                            <input type="range" min="1" max="100" defaultValue="80" className="w-1/2" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Method</span>
                            <select className="w-1/2 p-2 border rounded">
                              <option>Balanced</option>
                              <option>Maximum compression</option>
                              <option>Best quality</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button onClick={handleReset} className="px-4 py-2 border rounded hover:bg-muted">
                          Back
                        </button>
                        <button
                          onClick={handleCompress}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                        >
                          Compress Files
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="text-center py-8">
                      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p>Compressing your files...</p>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-4">Compression Results</h4>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <div className="flex items-center">
                                <activeTool.icon className="h-5 w-5 mr-2" />
                                <span>{file.name}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm text-green-600 dark:text-green-400 mr-4">
                                  {Math.round(Math.random() * 50 + 30)}% smaller
                                </span>
                                <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
                                  Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button onClick={handleReset} className="px-4 py-2 border rounded hover:bg-muted">
                          Compress More Files
                        </button>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                          Download All
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
