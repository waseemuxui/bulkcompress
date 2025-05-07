import type { Metadata } from "next"
import { DocumentCompressorClientPage } from "./DocumentCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "Document Compressor - Compress Documents Online",
  description:
    "Free online document compressor. Reduce document file size while maintaining quality. Supports PDF, DOCX, PPTX, and XLSX.",
  keywords: "document compressor, compress document, reduce document size, pdf compressor, docx compressor",
}

export default function DocumentCompressorPage() {
  return (
    <ToolPageLayout
      title="Document Compressor"
      description="Compress multiple document formats without losing quality. Reduce file size for easier sharing and storage."
      icon="document"
      socialShare={
        <SocialShare
          title="Document Compressor - BulkCompress.com"
          text="Compress your documents for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/document/document-compressor"
        />
      }
    >
      <DocumentCompressorClientPage />
    </ToolPageLayout>
  )
}
