import Link from "next/link"
import { FileArchive } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white">
                <FileArchive className="h-4 w-4" />
              </div>
              <span className="font-bold">
                <span className="gradient-text">Bulk</span>Compress
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online file compression tools. Compress images, videos, audio, documents, and archives without losing
              quality.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/image/image-compressor" className="text-muted-foreground hover:text-foreground">
                  Image Compression
                </Link>
              </li>
              <li>
                <Link href="/tools/video/video-compressor" className="text-muted-foreground hover:text-foreground">
                  Video Compression
                </Link>
              </li>
              <li>
                <Link href="/tools/audio/audio-compressor" className="text-muted-foreground hover:text-foreground">
                  Audio Compression
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/document/document-compressor"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Document Compression
                </Link>
              </li>
              <li>
                <Link href="/tools/archive/archive-compressor" className="text-muted-foreground hover:text-foreground">
                  Archive Compression
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Image Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/image/jpeg-compressor" className="text-muted-foreground hover:text-foreground">
                  JPEG Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/image/png-compressor" className="text-muted-foreground hover:text-foreground">
                  PNG Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/image/webp-compressor" className="text-muted-foreground hover:text-foreground">
                  WebP Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/image/gif-compressor" className="text-muted-foreground hover:text-foreground">
                  GIF Compressor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">More Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/document/pdf-compressor" className="text-muted-foreground hover:text-foreground">
                  PDF Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/video/mp4-compressor" className="text-muted-foreground hover:text-foreground">
                  MP4 Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/audio/mp3-compressor" className="text-muted-foreground hover:text-foreground">
                  MP3 Compressor
                </Link>
              </li>
              <li>
                <Link href="/all-tools" className="text-muted-foreground hover:text-foreground">
                  All Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BulkCompress.com. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
