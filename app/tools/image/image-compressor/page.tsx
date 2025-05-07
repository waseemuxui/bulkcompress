import type { Metadata } from "next"
import { ImageCompressorClientPage } from "./ImageCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "Image Compressor - Compress Images Online",
  description:
    "Free online image compressor. Reduce image file size while maintaining quality. Supports JPEG, PNG, WebP, and GIF.",
  keywords: "image compressor, compress image, reduce image size, image compression, jpeg compressor, png compressor",
}

export default function ImageCompressorPage() {
  return (
    <ToolPageLayout
      title="Image Compressor"
      description="Compress multiple image formats without losing quality. Reduce file size for faster loading and sharing."
      icon="image"
      socialShare={
        <SocialShare
          title="Image Compressor - BulkCompress.com"
          text="Compress your images for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/image/image-compressor"
        />
      }
    >
      <ImageCompressorClientPage />
    </ToolPageLayout>
  )
}
