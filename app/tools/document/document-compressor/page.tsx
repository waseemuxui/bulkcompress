import type { Metadata } from "next"
import { ToolPageLayout } from "@/components/tool-page-layout"
import DocumentCompressorClientPage from "./DocumentCompressorClientPage"

export const metadata: Metadata = {
  title: "Document Compressor - Compress Document Files Online",
  description:
    "Free online document compressor. Reduce the size of PDF, DOCX, PPTX, and other document files without losing quality. No registration required.",
  keywords:
    "document compressor, compress document, reduce document size, document compression tool, online document compressor",
}

export default function DocumentCompressorPage() {
  return (
    <ToolPageLayout
      title="Document Compressor"
      description="Compress PDF, DOCX, PPTX, and other document files online"
      clientComponent={<DocumentCompressorClientPage />}
      seoContent={
        <>
          <h2>Free Online Document Compressor</h2>
          <p>
            Our free online Document Compressor tool allows you to reduce the size of your document files without
            compromising quality. Whether you need to compress PDF, DOCX, PPTX, or other document formats, our tool
            makes it easy to reduce file sizes for easier sharing and storage.
          </p>

          <h2>How to Compress Document Files</h2>
          <ol>
            <li>Upload your document file(s) by clicking the upload button or dragging and dropping</li>
            <li>Select your desired compression level</li>
            <li>Click "Compress" to start the compression process</li>
            <li>Download your compressed document files individually or as a ZIP archive</li>
          </ol>

          <h2>Benefits of Compressing Document Files</h2>
          <ul>
            <li>Reduce file size for easier sharing via email or messaging apps</li>
            <li>Save storage space on your device or cloud storage</li>
            <li>Faster upload and download times</li>
            <li>Maintain document quality while reducing file size</li>
            <li>Process multiple documents at once with our batch compression feature</li>
          </ul>

          <h2>Supported Document Formats</h2>
          <p>Our Document Compressor tool supports a wide range of document formats, including:</p>
          <ul>
            <li>PDF (Portable Document Format)</li>
            <li>DOCX (Microsoft Word Document)</li>
            <li>DOC (Microsoft Word Document)</li>
            <li>PPTX (Microsoft PowerPoint Presentation)</li>
            <li>PPT (Microsoft PowerPoint Presentation)</li>
            <li>XLSX (Microsoft Excel Spreadsheet)</li>
            <li>XLS (Microsoft Excel Spreadsheet)</li>
            <li>ODT (OpenDocument Text)</li>
            <li>ODP (OpenDocument Presentation)</li>
            <li>ODS (OpenDocument Spreadsheet)</li>
          </ul>

          <h2>Privacy and Security</h2>
          <p>
            We take your privacy seriously. All document compression is done directly in your browser, which means your
            files never leave your device. We don't store your files on our servers, and we don't have access to your
            documents. This ensures complete privacy and security for your sensitive information.
          </p>

          <h2>No Registration Required</h2>
          <p>
            Our Document Compressor tool is completely free to use, with no registration or account creation required.
            Simply upload your documents, compress them, and download the results.
          </p>
        </>
      }
    />
  )
}
