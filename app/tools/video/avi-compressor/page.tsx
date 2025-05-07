import type { Metadata } from "next"
import { AVICompressorClientPage } from "./AVICompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "AVI Compressor - Compress AVI Videos Online",
  description: "Free online AVI compressor. Reduce AVI file size while maintaining quality. No registration required.",
  keywords: "avi compressor, compress avi, reduce avi size, video compression, avi optimizer",
}

export default function AVICompressorPage() {
  return (
    <ToolPageLayout
      title="AVI Compressor"
      description="Compress AVI videos without losing quality. Reduce file size for easier sharing and streaming."
      icon="avi"
      socialShare={
        <SocialShare
          title="AVI Compressor - BulkCompress.com"
          text="Compress your AVI videos for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/video/avi-compressor"
        />
      }
    >
      <AVICompressorClientPage />
    </ToolPageLayout>
  )
}
