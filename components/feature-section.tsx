import { Shield, Zap, Smartphone, Download, Settings, FileText } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "100% Secure",
      description: "All processing happens in your browser. Your files never leave your device.",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Fast Processing",
      description: "Our optimized algorithms compress your files quickly and efficiently.",
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Works on All Devices",
      description: "Compress files on desktop, tablet, or mobile with our responsive design.",
    },
    {
      icon: <Download className="h-10 w-10" />,
      title: "Batch Processing",
      description: "Save time by compressing multiple files simultaneously.",
    },
    {
      icon: <Settings className="h-10 w-10" />,
      title: "Customizable Settings",
      description: "Adjust compression levels to find the perfect balance between size and quality.",
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Multiple File Types",
      description: "Support for images, videos, audio, documents, and archives.",
    },
  ]

  return (
    <section className="container py-12 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Features</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground">
          BulkCompress.com offers a range of features to make file compression easy and efficient
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="mb-4 text-primary">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
