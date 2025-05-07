import type { Metadata } from "next"
import { WebPCompressorClientPage } from "./WebPCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "WebP Compressor - Compress WebP Images Online",
  description:
    "Free online WebP compressor. Reduce WebP file size while maintaining quality. No registration required.",
  keywords: "webp compressor, compress webp, reduce webp size, image compression, webp optimizer",
}

export default function WebPCompressorPage() {
  return (
    <ToolPageLayout
      title="WebP Compressor"
      description="Compress WebP images without losing quality. Reduce file size for faster loading and sharing."
      icon="webp"
      socialShare={
        <SocialShare
          title="WebP Compressor - BulkCompress.com"
          text="Compress your WebP images for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/image/webp-compressor"
        />
      }
    >
      <WebPCompressorClientPage />
    </ToolPageLayout>
  )
}
