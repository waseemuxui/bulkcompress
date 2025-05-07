import type { Metadata } from "next"
import { JPEGCompressorClientPage } from "./JPEGCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "JPEG Compressor - Compress JPEG Images Online",
  description:
    "Free online JPEG compressor. Reduce JPEG file size while maintaining quality. No registration required.",
  keywords: "jpeg compressor, jpg compressor, compress jpeg, compress jpg, reduce jpeg size, image compression",
}

export default function JPEGCompressorPage() {
  return (
    <ToolPageLayout
      title="JPEG Compressor"
      description="Compress JPEG images without losing quality. Reduce file size for faster loading and sharing."
      icon="jpeg"
      socialShare={
        <SocialShare
          title="JPEG Compressor - BulkCompress.com"
          text="Compress your JPEG images for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/image/jpeg-compressor"
        />
      }
    >
      <JPEGCompressorClientPage />
    </ToolPageLayout>
  )
}
