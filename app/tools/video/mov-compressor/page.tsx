import type { Metadata } from "next"
import { MOVCompressorClientPage } from "./MOVCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "MOV Compressor - Compress MOV Videos Online",
  description: "Free online MOV compressor. Reduce MOV file size while maintaining quality. No registration required.",
  keywords: "mov compressor, compress mov, reduce mov size, video compression, mov optimizer",
}

export default function MOVCompressorPage() {
  return (
    <ToolPageLayout
      title="MOV Compressor"
      description="Compress MOV videos without losing quality. Reduce file size for easier sharing and streaming."
      icon="mov"
      socialShare={
        <SocialShare
          title="MOV Compressor - BulkCompress.com"
          text="Compress your MOV videos for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/video/mov-compressor"
        />
      }
    >
      <MOVCompressorClientPage />
    </ToolPageLayout>
  )
}
