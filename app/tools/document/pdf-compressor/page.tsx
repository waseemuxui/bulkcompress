import type { Metadata } from "next"
import { PDFCompressorClientPage } from "./PDFCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "PDF Compressor - Compress PDF Files Online",
  description: "Free online PDF compressor. Reduce PDF file size while maintaining quality. No registration required.",
  keywords: "pdf compressor, compress pdf, reduce pdf size, document compression, pdf optimizer",
}

export default function PDFCompressorPage() {
  return (
    <ToolPageLayout
      title="PDF Compressor"
      description="Compress PDF files without losing quality. Reduce file size for easier sharing and storage."
      icon="pdf"
      socialShare={
        <SocialShare
          title="PDF Compressor - BulkCompress.com"
          text="Compress your PDF files for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/document/pdf-compressor"
        />
      }
    >
      <PDFCompressorClientPage />
    </ToolPageLayout>
  )
}
