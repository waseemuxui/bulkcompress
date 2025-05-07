import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Is BulkCompress.com completely free to use?",
      answer:
        "Yes, BulkCompress.com is 100% free to use. There are no hidden fees, subscriptions, or limits on the number of files you can compress.",
    },
    {
      question: "Are my files secure when using BulkCompress.com?",
      answer:
        "Absolutely. Your files are processed directly in your browser and never uploaded to our servers. This means your data never leaves your device, ensuring maximum privacy and security.",
    },
    {
      question: "What file types can I compress with BulkCompress.com?",
      answer:
        "BulkCompress.com supports a wide range of file types including images (JPEG, PNG, WebP), videos (MP4, MOV), audio (MP3, WAV), documents (PDF, DOCX), and archives (ZIP, RAR).",
    },
    {
      question: "How much can BulkCompress.com reduce my file sizes?",
      answer:
        "The amount of compression depends on the file type and content. For images, you can expect reductions of 30-80%. Videos can be reduced by 40-70%, and documents by 20-60%, all while maintaining good quality.",
    },
    {
      question: "Can I compress multiple files at once?",
      answer:
        "Yes, BulkCompress.com supports batch processing, allowing you to compress multiple files simultaneously for all supported file types.",
    },
    {
      question: "Will compression affect the quality of my files?",
      answer:
        "Our compression algorithms are designed to maintain the highest possible quality while reducing file size. For most file types, you can adjust the compression level to find the perfect balance between size and quality for your needs.",
    },
    {
      question: "Do I need to create an account to use BulkCompress.com?",
      answer:
        "No, BulkCompress.com does not require registration or account creation. You can start compressing your files immediately without providing any personal information.",
    },
    {
      question: "Is there a limit to the file size I can compress?",
      answer:
        "Since all processing happens in your browser, the maximum file size depends on your device's memory. Most modern devices can handle files up to 100MB-1GB without issues.",
    },
    {
      question: "How does BulkCompress.com make money if it's free?",
      answer:
        "BulkCompress.com is supported by non-intrusive advertisements. We believe in providing valuable tools without charging users or compromising their privacy.",
    },
    {
      question: "Can I use BulkCompress.com on my mobile device?",
      answer:
        "Yes, BulkCompress.com is fully responsive and works on all modern devices including smartphones and tablets.",
    },
  ]

  return (
    <section className="container py-12 space-y-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">Frequently Asked Questions</h2>
      <div className="mx-auto max-w-[800px]">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
