import type { Metadata } from "next"
import { SevenZipCompressorClientPage } from "./SevenZipCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "7Z Compressor - Compress 7Z Archives Online",
  description:
    "Free online 7Z compressor. Reduce 7Z archive file size for easier sharing and storage. No registration required.",
  keywords: "7z compressor, compress 7z, reduce 7z size, archive compression, 7z optimizer",
}

export default function SevenZipCompressorPage() {
  return (
    <ToolPageLayout
      title="7Z Compressor"
      description="Compress 7Z archives to reduce file size. Optimize your archives for easier sharing and storage."
      icon="7z"
      socialShare={
        <SocialShare
          title="7Z Compressor - BulkCompress.com"
          text="Compress your 7Z files for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/archive/7z-compressor"
        />
      }
    >
      <SevenZipCompressorClientPage />
    </ToolPageLayout>
  )
}
