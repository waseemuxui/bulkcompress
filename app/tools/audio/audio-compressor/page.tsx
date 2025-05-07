import type { Metadata } from "next"
import { AudioCompressorClientPage } from "./AudioCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "Audio Compressor - Compress Audio Files Online",
  description:
    "Free online audio compressor. Reduce audio file size while maintaining quality. No registration required.",
  keywords: "audio compressor, compress audio, reduce audio size, mp3 compression, wav compression",
}

export default function AudioCompressorPage() {
  return (
    <ToolPageLayout
      title="Audio Compressor"
      description="Compress audio files without losing quality. Reduce file size for easier sharing and streaming."
      icon="audio"
      socialShare={
        <SocialShare
          title="Audio Compressor - BulkCompress.com"
          text="Compress your audio files for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/audio/audio-compressor"
        />
      }
    >
      <AudioCompressorClientPage />
    </ToolPageLayout>
  )
}
