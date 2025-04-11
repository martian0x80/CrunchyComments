"use client"

import { motion } from "framer-motion"

export function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-auto">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="prose prose-invert prose-headings:text-white prose-p:text-gray-200 prose-li:text-gray-200 prose-strong:text-white max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Privacy Policy</h1>
          
          <p>Welcome to the CrunchyComments privacy policy! We pride ourselves on being privacy-focused. This document explains what information we collect through your access and use of our service and how we make use of this information.</p>

          <h2>1. Data Collection and Usage</h2>
          <p>We collect minimal data necessary to provide our comment service:</p>
          <ul>
            <li>Authentication data (when you sign in through OAuth providers)</li>
            <li>Comment content and metadata</li>
            <li>Basic usage analytics</li>
          </ul>

          <h2>2. Third-Party Services</h2>
          <p>Our service utilizes Comentario as our comment system provider. When you interact with comments on our platform, you are also subject to Comentario's privacy policy.</p>

          <h2>3. Data Storage</h2>
          <p>Comment data is stored securely through Comentario's infrastructure. We do not maintain separate copies of comment data.</p>

          <h2>4. Open Source</h2>
          <p>CrunchyComments is an open source project. You can review our code and implementation on GitHub.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
          </ul>

          <h2>6. Updates to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify users of any material changes.</p>

          <h2>7. Contact</h2>
          <p>For privacy-related inquiries, please open an issue on our GitHub repository.</p>
        </motion.div>
      </div>
    </div>
  )
}
