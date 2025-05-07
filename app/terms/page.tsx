import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - BulkCompress.com",
  description: "Terms of service for BulkCompress.com. Learn about our terms and conditions.",
}

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <p>Last updated: May 7, 2023</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to BulkCompress.com. These Terms of Service govern your use of our website and services. By accessing
          or using BulkCompress.com, you agree to be bound by these Terms. If you disagree with any part of the terms,
          you may not access the service.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          BulkCompress.com provides online file compression tools. You may use our services for lawful purposes only and
          in accordance with these Terms. You agree not to use our services:
        </p>
        <ul>
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>
            To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail",
            "chain letter", "spam", or any other similar solicitation.
          </li>
          <li>
            To impersonate or attempt to impersonate BulkCompress.com, a BulkCompress.com employee, another user, or any
            other person or entity.
          </li>
          <li>
            To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service, or which
            may harm BulkCompress.com or users of the service.
          </li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are and will remain the exclusive property
          of BulkCompress.com and its licensors. The service is protected by copyright, trademark, and other laws of
          both the United States and foreign countries. Our trademarks and trade dress may not be used in connection
          with any product or service without the prior written consent of BulkCompress.com.
        </p>

        <h2>4. User Content</h2>
        <p>
          Our service allows you to upload, compress, and download files. You retain all rights to your content. By
          uploading content to our service, you grant us a non-exclusive, royalty-free license to use, store, and
          process your content solely for the purpose of providing our services to you.
        </p>
        <p>
          You are solely responsible for the content you upload to our service. You represent and warrant that you own
          or have the necessary licenses, rights, consents, and permissions to use and authorize us to use your content.
        </p>

        <h2>5. Privacy</h2>
        <p>
          Your privacy is important to us. Our Privacy Policy explains how we collect, use, and disclose information
          about you. By using our service, you agree to the collection and use of information in accordance with our
          Privacy Policy.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall BulkCompress.com, nor its directors, employees, partners, agents, suppliers, or affiliates,
          be liable for any indirect, incidental, special, consequential or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or
          use of or inability to access or use the service.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
          material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole discretion.
        </p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at terms@bulkcompress.com.</p>
      </div>
    </div>
  )
}
