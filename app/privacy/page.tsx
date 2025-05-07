import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - BulkCompress.com",
  description: "Privacy policy for BulkCompress.com. Learn how we protect your data and privacy.",
}

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <p>Last updated: May 7, 2023</p>

        <h2>Introduction</h2>
        <p>
          At BulkCompress.com, we take your privacy seriously. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website. Please read this privacy policy
          carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We do not collect personal information unless you voluntarily provide it to us. The files you upload for
          compression are processed entirely in your browser and are not sent to our servers. We do not have access to
          your files.
        </p>

        <h3>Automatically Collected Information</h3>
        <p>
          When you access our website, we may automatically collect certain information about your device, including
          information about your web browser, IP address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the site, we collect information about the individual web pages that you
          view, what websites or search terms referred you to the site, and information about how you interact with the
          site.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect from you to:</p>
        <ul>
          <li>Improve our website and user experience</li>
          <li>Understand how our users as a group use the services and resources provided on our site</li>
          <li>Monitor and analyze usage and trends to improve your experience with our site</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party service providers to help us operate our website, such as analytics providers. These
          third parties may have access to your information only to perform these tasks on our behalf and are obligated
          not to disclose or use it for any other purpose.
        </p>

        <h2>Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information.
          While we have taken reasonable steps to secure the personal information you provide to us, please be aware
          that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission
          can be guaranteed against any interception or other type of misuse.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@bulkcompress.com.</p>
      </div>
    </div>
  )
}
