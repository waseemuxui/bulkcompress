import type { Metadata } from "next"
import { GIFCompressorClientPage } from "./GIFCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "GIF Compressor - Compress GIF Images Online",
  description: "Free online GIF compressor. Reduce GIF file size while maintaining quality. No registration required.",
  keywords: "gif compressor, compress gif, reduce gif size, image compression, gif optimizer",
}

export default function GIFCompressorPage() {
  return (
    <ToolPageLayout
      title="GIF Compressor"
      description="Compress GIF images without losing quality. Reduce file size for faster loading and sharing."
      icon="gif"
      socialShare={
        <SocialShare
          title="GIF Compressor - BulkCompress.com"
          text="Compress your GIF images for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/image/gif-compressor"
        />
      }
    >
      <GIFCompressorClientPage />
    </ToolPageLayout>
  )
}
