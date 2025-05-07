"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileArchive, FileImage, FileText, FileVideo, Menu, Music, Share2, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ToolsNavigation } from "@/components/tools-navigation"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { SocialShare } from "@/components/social-share"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mainCategories = [
    {
      href: "/tools/image/image-compressor",
      label: "Images",
      icon: FileImage,
      active: pathname.includes("/tools/image"),
    },
    {
      href: "/tools/document/document-compressor",
      label: "Documents",
      icon: FileText,
      active: pathname.includes("/tools/document"),
    },
    {
      href: "/tools/video/video-compressor",
      label: "Videos",
      icon: FileVideo,
      active: pathname.includes("/tools/video"),
    },
    {
      href: "/tools/audio/audio-compressor",
      label: "Audio",
      icon: Music,
      active: pathname.includes("/tools/audio"),
    },
    {
      href: "/tools/archive/archive-compressor",
      label: "Archives",
      icon: FileArchive,
      active: pathname.includes("/tools/archive"),
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white">
            <FileArchive className="h-5 w-5" />
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-sm"></div>
          </div>
          <span className="hidden font-bold text-xl sm:inline-block">
            <span className="gradient-text">Bulk</span>Compress
          </span>
        </Link>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-1">
            {mainCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  category.active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.label}
              </Link>
            ))}
            <Link
              href="/all-tools"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/all-tools" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              All Tools
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <SocialShare
                    title="BulkCompress - Free Online File Compression Tools"
                    text="Compress your files for free with BulkCompress.com!"
                    url={`https://bulkcompress.com${pathname}`}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeCustomizer />
          </div>
        </div>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto backdrop-blur-xl bg-background/80">
            <div className="flex items-center mb-6">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white mr-2">
                <FileArchive className="h-5 w-5" />
              </div>
              <span className="font-bold">
                <span className="gradient-text">Bulk</span>Compress
              </span>
            </div>
            <div className="mt-8">
              <ToolsNavigation onClick={() => setMobileMenuOpen(false)} />
              <div className="flex items-center mt-4 space-x-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
                <ThemeCustomizer />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
