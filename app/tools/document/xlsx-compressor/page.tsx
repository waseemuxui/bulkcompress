import type { Metadata } from "next"
import { XLSXCompressorClientPage } from "./XLSXCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"

export const metadata: Metadata = {
  title: "XLSX Compressor - Compress Excel Spreadsheets Online",
  description:
    "Free online XLSX compressor. Reduce Excel spreadsheet file size while maintaining data integrity. No registration required.",
  keywords: "xlsx compressor, compress xlsx, reduce xlsx size, spreadsheet compression, excel compressor",
}

export default function XLSXCompressorPage() {
  return (
    <ToolPageLayout
      title="XLSX Compressor"
      description="Compress Excel spreadsheets without losing data. Reduce file size for easier sharing and storage."
      icon="xlsx"
      socialShare={
        <SocialShare
          title="XLSX Compressor - BulkCompress.com"
          text="Compress your Excel spreadsheets for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/document/xlsx-compressor"
        />
      }
    >
      <XLSXCompressorClientPage />
    </ToolPageLayout>
  )
}
