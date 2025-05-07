import type { Metadata } from "next"
import { PPTXCompressorClientPage } from "./PPTXCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "PPTX Compressor - Compress PowerPoint Presentations Online",
  description:
    "Free online PPTX compressor. Reduce PowerPoint presentation file size while maintaining quality. No registration required.",
  keywords: "pptx compressor, compress pptx, reduce pptx size, presentation compression, powerpoint compressor",
}

export default function PPTXCompressorPage() {
  return (
    <ToolPageLayout
      title="PPTX Compressor"
      description="Compress PowerPoint presentations without losing quality. Reduce file size for easier sharing and storage."
      icon="pptx"
      socialShare={
        <SocialShare
          title="PPTX Compressor - BulkCompress.com"
          text="Compress your PowerPoint presentations for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/document/pptx-compressor"
        />
      }
    >
      <PPTXCompressorClientPage />
    </ToolPageLayout>
  )
}
