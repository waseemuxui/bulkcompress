interface ToolSEOContentProps {
  toolName: string
  fileType: string
  benefits?: string[]
}

export function ToolSEOContent({ toolName, fileType, benefits = [] }: ToolSEOContentProps) {
  return (
    <section className="container py-12 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">Why Use Our {toolName}?</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Free and Easy to Use</h3>
          <p className="text-muted-foreground">
            Our {toolName} is completely free to use with no hidden fees or subscriptions. Simply upload your {fileType}{" "}
            files and compress them with a few clicks.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Privacy First</h3>
          <p className="text-muted-foreground">
            Your {fileType} files are processed directly in your browser. They never leave your device, ensuring maximum
            privacy and security for your sensitive data.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">No Registration Required</h3>
          <p className="text-muted-foreground">
            Start compressing your {fileType} files immediately without creating an account or providing any personal
            information.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Quality Control</h3>
          <p className="text-muted-foreground">
            Adjust compression settings to find the perfect balance between file size and quality for your specific
            needs.
          </p>
        </div>

        {benefits.map((benefit, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-xl font-bold">{benefit.split(":")[0]}</h3>
            <p className="text-muted-foreground">{benefit.split(":")[1]}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-4 text-center">
        <h2 className="text-2xl font-bold">How to Use Our {toolName}</h2>
        <p className="mx-auto max-w-[800px] text-muted-foreground">
          Using our {toolName} is simple and straightforward:
        </p>
        <ol className="list-decimal list-inside text-left mx-auto max-w-[800px] space-y-2 text-muted-foreground">
          <li>Upload your {fileType} file(s) by dragging and dropping or clicking the upload area.</li>
          <li>Adjust the compression settings if needed.</li>
          <li>Click the "Compress" button to start the compression process.</li>
          <li>Download your compressed {fileType} file(s) individually or as a batch.</li>
        </ol>
        <p className="mx-auto max-w-[800px] text-muted-foreground mt-4">
          Our compression algorithms are designed to maintain the highest possible quality while significantly reducing
          file sizes. This means your compressed files will look and function just like the originals, but take up much
          less space.
        </p>
      </div>
    </section>
  )
}
