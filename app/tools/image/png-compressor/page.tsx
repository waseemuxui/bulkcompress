import type { Metadata } from "next"
import { PNGCompressorClientPage } from "./PNGCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "PNG Compressor - Compress PNG Images Online",
  description:
    "Free online PNG compressor. Reduce PNG file size while maintaining quality and transparency. No registration required.",
  keywords: "png compressor, compress png, reduce png size, image compression, transparent png",
}

export default function PNGCompressorPage() {
  return (
    <ToolPageLayout
      title="PNG Compressor"
      description="Compress PNG images while preserving transparency. Reduce file size for faster loading and sharing."
      icon="png"
      socialShare={
        <SocialShare
          title="PNG Compressor - BulkCompress.com"
          text="Compress your PNG images for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/image/png-compressor"
        />
      }
    >
      <PNGCompressorClientPage />
    </ToolPageLayout>
  )
}
