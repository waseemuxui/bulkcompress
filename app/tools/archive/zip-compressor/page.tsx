import type { Metadata } from "next"
import { ZIPCompressorClientPage } from "./ZIPCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "ZIP Compressor - Compress ZIP Files Online",
  description:
    "Free online ZIP compressor. Reduce ZIP file size for easier sharing and storage. No registration required.",
  keywords: "zip compressor, compress zip, reduce zip size, archive compression, zip optimizer",
}

export default function ZIPCompressorPage() {
  return (
    <ToolPageLayout
      title="ZIP Compressor"
      description="Compress ZIP archives to reduce file size. Optimize your archives for easier sharing and storage."
      icon="zip"
      socialShare={
        <SocialShare
          title="ZIP Compressor - BulkCompress.com"
          text="Compress your ZIP files for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/archive/zip-compressor"
        />
      }
    >
      <ZIPCompressorClientPage />
    </ToolPageLayout>
  )
}
