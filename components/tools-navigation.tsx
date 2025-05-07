"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToolIcon } from "@/components/tool-icon"

interface ToolsNavigationProps {
  onClick?: () => void
}

export function ToolsNavigation({ onClick }: ToolsNavigationProps) {
  const [open, setOpen] = useState(false)

  const tools = [
    {
      category: "Image",
      type: "image",
      items: [
        { name: "Image Compressor", href: "/tools/image/image-compressor", type: "image" },
        { name: "JPEG Compressor", href: "/tools/image/jpeg-compressor", type: "jpeg" },
        { name: "PNG Compressor", href: "/tools/image/png-compressor", type: "png" },
        { name: "WebP Compressor", href: "/tools/image/webp-compressor", type: "webp" },
      ],
    },
    {
      category: "Video",
      type: "video",
      items: [
        { name: "Video Compressor", href: "/tools/video/video-compressor", type: "video" },
        { name: "MP4 Compressor", href: "/tools/video/mp4-compressor", type: "mp4" },
      ],
    },
    {
      category: "Audio",
      type: "audio",
      items: [{ name: "Audio Compressor", href: "/tools/audio/audio-compressor", type: "audio" }],
    },
    {
      category: "Document",
      type: "document",
      items: [
        { name: "Document Compressor", href: "/tools/document/document-compressor", type: "document" },
        { name: "PDF Compressor", href: "/tools/document/pdf-compressor", type: "pdf" },
        { name: "DOCX Compressor", href: "/tools/document/docx-compressor", type: "docx" },
      ],
    },
    {
      category: "Archive",
      type: "archive",
      items: [{ name: "Archive Compressor", href: "/tools/archive/archive-compressor", type: "archive" }],
    },
  ]

  const handleClick = () => {
    setOpen(false)
    onClick && onClick()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto px-2 py-1.5">
          Tools
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {tools.map((category, index) => (
          <div key={category.category}>
            {index > 0 && <DropdownMenuSeparator />}
            <div className="px-2 py-1.5 text-sm font-semibold flex items-center">
              <ToolIcon type={category.type} className="mr-2 h-4 w-4" />
              {category.category}
            </div>
            {category.items.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="flex items-center cursor-pointer" onClick={handleClick}>
                  <ToolIcon type={item.type} className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
