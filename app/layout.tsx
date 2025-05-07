import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { GoogleScripts } from "@/components/google-scripts"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "BulkCompress - Free Online File Compression Tools",
    template: "%s | BulkCompress.com",
  },
  description:
    "Free online tools to compress images, PDFs, videos, audio files, and more. Reduce file sizes without losing quality. No registration required.",
  keywords:
    "file compression, image compression, pdf compression, video compression, audio compression, bulk compression, online tools",
  authors: [{ name: "BulkCompress.com" }],
  creator: "BulkCompress.com",
  publisher: "BulkCompress.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bulkcompress.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bulkcompress.com",
    title: "BulkCompress - Free Online File Compression Tools",
    description: "Free online tools to compress images, PDFs, videos, audio files, and more. No registration required.",
    siteName: "BulkCompress.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BulkCompress.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BulkCompress - Free Online File Compression Tools",
    description: "Free online tools to compress images, PDFs, videos, audio files, and more. No registration required.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleScripts />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} gradient-bg dot-pattern`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
