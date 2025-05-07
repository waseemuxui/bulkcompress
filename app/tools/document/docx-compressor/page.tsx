import type { Metadata } from "next"
import { DOCXCompressorClientPage } from "./DOCXCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "DOCX Compressor - Compress Word Documents Online",
  description:
    "Free online DOCX compressor. Reduce Word document file size while maintaining quality. No registration required.",
  keywords: "docx compressor, compress docx, reduce docx size, document compression, word document compressor",
}

export default function DOCXCompressorPage() {
  return (
    <ToolPageLayout
      title="DOCX Compressor"
      description="Compress Word documents without losing quality. Reduce file size for easier sharing and storage."
      icon="docx"
      socialShare={
        <SocialShare
          title="DOCX Compressor - BulkCompress.com"
          text="Compress your Word documents for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/document/docx-compressor"
        />
      }
    >
      <DOCXCompressorClientPage />
    </ToolPageLayout>
  )
}
