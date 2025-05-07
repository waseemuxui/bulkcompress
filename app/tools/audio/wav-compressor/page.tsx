import type { Metadata } from "next"
import { WAVCompressorClientPage } from "./WAVCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "WAV Compressor - Compress WAV Audio Files Online",
  description: "Free online WAV compressor. Reduce WAV file size while maintaining quality. No registration required.",
  keywords: "wav compressor, compress wav, reduce wav size, audio compression, wav optimizer",
}

export default function WAVCompressorPage() {
  return (
    <ToolPageLayout
      title="WAV Compressor"
      description="Compress WAV audio files without losing quality. Reduce file size for easier sharing and streaming."
      icon="wav"
      socialShare={
        <SocialShare
          title="WAV Compressor - BulkCompress.com"
          text="Compress your WAV files for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/audio/wav-compressor"
        />
      }
    >
      <WAVCompressorClientPage />
    </ToolPageLayout>
  )
}
