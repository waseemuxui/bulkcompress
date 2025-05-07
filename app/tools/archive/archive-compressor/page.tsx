import type { Metadata } from "next"
import { ArchiveCompressorClientPage } from "./ArchiveCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "Archive Compressor - Compress Archives Online",
  description:
    "Free online archive compressor. Reduce archive file size for easier sharing and storage. Supports ZIP, RAR, and 7Z.",
  keywords: "archive compressor, compress archive, reduce archive size, zip compressor, rar compressor, 7z compressor",
}

export default function ArchiveCompressorPage() {
  return (
    <ToolPageLayout
      title="Archive Compressor"
      description="Compress multiple archive formats to reduce file size. Optimize your archives for easier sharing and storage."
      icon="archive"
      socialShare={
        <SocialShare
          title="Archive Compressor - BulkCompress.com"
          text="Compress your archives for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/archive/archive-compressor"
        />
      }
    >
      <ArchiveCompressorClientPage />
    </ToolPageLayout>
  )
}
