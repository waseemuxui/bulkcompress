import type { Metadata } from "next"
import { AVICompressorClientPage } from "./AVICompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { SEOContent } from "@/components/seo-content"

export const metadata: Metadata = {
  title: "AVI Compressor - Compress AVI Videos Online",
  description: "Free online AVI compressor. Reduce AVI file size while maintaining quality. No registration required.",
  keywords: "avi compressor, compress avi, reduce avi size, video compression, avi optimizer",
}

export default function AVICompressorPage() {
  return (
    <ToolPageLayout
      title="AVI Compressor"
      description="Compress AVI videos without losing quality. Reduce file size for easier sharing and streaming."
      icon="avi"
      socialShare={
        <SocialShare
          title="AVI Compressor - BulkCompress.com"
          text="Compress your AVI videos for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/video/avi-compressor"
        />
      }
    >
      <AVICompressorClientPage />

      <SEOContent
        title="AVI Compressor - Reduce AVI File Size Online"
        paragraphs={[
          "Our free online AVI compressor helps you reduce the file size of your AVI videos without significant quality loss. Perfect for sharing videos on social media, email, or storing them on your device.",
          "This tool converts AVI files to MP4 format while compressing them, which provides better compatibility with modern devices and platforms while reducing file size.",
          "Video compression works by reducing the bitrate and resolution of your video while maintaining an acceptable level of quality. Our tool uses advanced compression algorithms to ensure the best balance between file size and quality.",
          "Compressed videos are easier to share, take up less storage space, and load faster when streaming online. This makes them ideal for websites, presentations, and social media platforms.",
        ]}
        faqs={[
          {
            question: "How does AVI compression work?",
            answer:
              "Our AVI compressor works by converting your AVI file to MP4 format using the H.264 codec, which is highly efficient at compressing video while maintaining good quality. You can adjust the quality settings to find the right balance between file size and quality.",
          },
          {
            question: "Will compressing my AVI video reduce its quality?",
            answer:
              "Some quality reduction is inevitable during compression, but our tool is designed to minimize visible quality loss. You can adjust the quality settings to find the right balance between file size and quality.",
          },
          {
            question: "Why convert AVI to MP4?",
            answer:
              "MP4 is a more modern and widely supported format than AVI. It offers better compression and compatibility with most devices and platforms, making it ideal for sharing and streaming.",
          },
          {
            question: "Is there a file size limit?",
            answer:
              "Yes, the maximum file size for upload is 100MB. This is to ensure optimal performance of our free service.",
          },
          {
            question: "How secure is my data?",
            answer:
              "All compression is done in your browser - your files are never uploaded to our servers. This ensures complete privacy and security of your content.",
          },
        ]}
      />
    </ToolPageLayout>
  )
}
