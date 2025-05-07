import type { Metadata } from "next"
import { FileArchive } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - BulkCompress.com",
  description: "Learn about BulkCompress.com, our mission, and our team.",
}

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="relative flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white mb-4">
          <FileArchive className="h-10 w-10" />
          <div className="absolute inset-0 rounded-full bg-primary/5 blur-sm"></div>
        </div>
        <h1 className="text-4xl font-bold mb-4">About BulkCompress</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to make file compression accessible, private, and free for everyone.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            BulkCompress was founded in 2023 with a simple idea: file compression should be easy, private, and free. We
            noticed that many online compression tools were either limited in functionality, loaded with ads, or
            required users to upload their files to remote servers.
          </p>
          <p className="text-muted-foreground">
            We decided to create a better solution—a comprehensive suite of compression tools that process files
            directly in the browser, ensuring complete privacy and security for our users' data.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <FileArchive className="h-16 w-16 text-muted-foreground/50" />
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              Your files never leave your device. All processing happens locally in your browser, ensuring complete
              privacy.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-bold mb-2">Free Access</h3>
            <p className="text-muted-foreground">
              We believe everyone should have access to quality compression tools without paywalls or hidden fees.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-bold mb-2">User Experience</h3>
            <p className="text-muted-foreground">
              We're committed to creating intuitive, fast, and reliable tools that make file compression a breeze.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Meet the Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & Developer",
              bio: "Alex has over 10 years of experience in web development and a passion for creating useful tools.",
            },
            {
              name: "Sarah Chen",
              role: "UX Designer",
              bio: "Sarah specializes in creating intuitive and accessible user interfaces for web applications.",
            },
            {
              name: "Michael Rodriguez",
              role: "Full-Stack Developer",
              bio: "Michael is an expert in browser-based file processing and compression algorithms.",
            },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-muted mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground/50">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
