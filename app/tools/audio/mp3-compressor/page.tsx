import type { Metadata } from "next"
import { MP3CompressorClientPage } from "./MP3CompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "MP3 Compressor - Compress MP3 Audio Files Online",
  description: "Free online MP3 compressor. Reduce MP3 file size while maintaining quality. No registration required.",
  keywords: "mp3 compressor, compress mp3, reduce mp3 size, audio compression, mp3 optimizer",
}

export default function MP3CompressorPage() {
  return (
    <ToolPageLayout
      title="MP3 Compressor"
      description="Compress MP3 audio files without losing quality. Reduce file size for easier sharing and streaming."
      icon="mp3"
      socialShare={
        <SocialShare
          title="MP3 Compressor - BulkCompress.com"
          text="Compress your MP3 files for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/audio/mp3-compressor"
        />
      }
    >
      <MP3CompressorClientPage />
    </ToolPageLayout>
  )
}
