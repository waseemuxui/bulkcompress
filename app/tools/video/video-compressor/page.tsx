import type { Metadata } from "next"
import { VideoCompressorClientPage } from "./VideoCompressorClientPage"
import { SocialShare } from "@/components/social-share"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { SEOContent } from "@/components/seo-content"

export const metadata: Metadata = {
  title: "Video Compressor - Compress Videos Online",
  description:
    "Free online video compressor. Reduce video file size while maintaining quality. Supports MP4, MOV, and AVI.",
  keywords: "video compressor, compress video, reduce video size, mp4 compressor, mov compressor, avi compressor",
}

export default function VideoCompressorPage() {
  return (
    <ToolPageLayout
      title="Video Compressor"
      description="Compress multiple video formats without losing quality. Reduce file size for easier sharing and streaming."
      icon="video"
      socialShare={
        <SocialShare
          title="Video Compressor - BulkCompress.com"
          text="Compress your videos for free with BulkCompress.com!"
          url="https://bulkcompress.com/tools/video/video-compressor"
        />
      }
    >
      <VideoCompressorClientPage />

      <SEOContent
        title="Video Compressor - Reduce Video File Size Online"
        paragraphs={[
          "Our free online video compressor helps you reduce the file size of your videos without significant quality loss. Perfect for sharing videos on social media, email, or storing them on your device.",
          "This tool supports popular video formats including MP4, MOV, and AVI. Simply upload your video, adjust the compression settings, and download your compressed file.",
          "Video compression works by reducing the bitrate and resolution of your video while maintaining an acceptable level of quality. Our tool uses advanced compression algorithms to ensure the best balance between file size and quality.",
          "Compressed videos are easier to share, take up less storage space, and load faster when streaming online. This makes them ideal for websites, presentations, and social media platforms.",
        ]}
        faqs={[
          {
            question: "How does video compression work?",
            answer:
              "Video compression works by reducing the bitrate, resolution, and frame rate of your video. Our tool uses the H.264 codec which is highly efficient at compressing video while maintaining good quality.",
          },
          {
            question: "Will compressing my video reduce its quality?",
            answer:
              "Some quality reduction is inevitable during compression, but our tool is designed to minimize visible quality loss. You can adjust the quality settings to find the right balance between file size and quality.",
          },
          {
            question: "What video formats are supported?",
            answer:
              "Our video compressor supports MP4, MOV, and AVI formats. The compressed output is delivered in MP4 format, which is widely compatible with most devices and platforms.",
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
