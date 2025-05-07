import type { Metadata } from "next"
import { RARCompressorClientPage } from "./RARCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "RAR Compressor - Compress RAR Archives Online",
  description:
    "Free online RAR compressor. Reduce RAR archive file size for easier sharing and storage. No registration required.",
  keywords: "rar compressor, compress rar, reduce rar size, archive compression, rar optimizer",
}

export default function RARCompressorPage() {
  return (
    <ToolPageLayout
      title="RAR Compressor"
      description="Compress RAR archives to reduce file size. Optimize your archives for easier sharing and storage."
      icon="rar"
      socialShare={
        <SocialShare
          title="RAR Compressor - BulkCompress.com"
          text="Compress your RAR files for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/archive/rar-compressor"
        />
      }
    >
      <RARCompressorClientPage />
    </ToolPageLayout>
  )
}
