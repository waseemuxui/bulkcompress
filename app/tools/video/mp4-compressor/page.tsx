import type { Metadata } from "next"
import { MP4CompressorClientPage } from "./MP4CompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "MP4 Compressor - Compress MP4 Videos Online",
  description: "Free online MP4 compressor. Reduce MP4 file size while maintaining quality. No registration required.",
  keywords: "mp4 compressor, compress mp4, reduce mp4 size, video compression, mp4 optimizer",
}

export default function MP4CompressorPage() {
  return (
    <ToolPageLayout
      title="MP4 Compressor"
      description="Compress MP4 videos without losing quality. Reduce file size for easier sharing and streaming."
      icon="mp4"
      socialShare={
        <SocialShare
          title="MP4 Compressor - BulkCompress.com"
          text="Compress your MP4 videos for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/video/mp4-compressor"
        />
      }
    >
      <MP4CompressorClientPage />
    </ToolPageLayout>
  )
}
