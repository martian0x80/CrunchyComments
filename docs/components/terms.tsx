"use client"

import { motion } from "framer-motion"

export function Terms() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-auto">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="prose prose-invert prose-headings:text-white prose-p:text-gray-200 prose-li:text-gray-200 prose-strong:text-white max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Terms of Service</h1>
          
          <p>By using CrunchyComments, you agree to these terms. Please read them carefully.</p>

          <h2>1. Service Description</h2>
          <p>CrunchyComments is an open source browser extension that enables commenting functionality on Crunchyroll using Comentario's comment system.</p>

          <h2>2. User Responsibilities</h2>
          <ul>
            <li>You must be 13 years or older to use this service</li>
            <li>You are responsible for all content you post</li>
            <li>You agree not to post harmful, offensive, or illegal content</li>
          </ul>

          <h2>3. Open Source License</h2>
          <p>CrunchyComments is open source software. Usage and modification rights are subject to our open source license.</p>

          <h2>4. Third-Party Services</h2>
          <p>We use Comentario for comment functionality. Your use of comments is also subject to Comentario's terms of service.</p>

          <h2>5. Disclaimer of Warranty</h2>
          <p>The service is provided "as is" without warranties of any kind.</p>

          <h2>6. Limitation of Liability</h2>
          <p>We shall not be liable for any indirect, incidental, special, or consequential damages.</p>

          <h2>7. Modifications to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of changes.</p>

          <h2>8. Contact</h2>
          <p>For questions about these terms, please open an issue on our GitHub repository.</p>
        </motion.div>
      </div>
    </div>
  )
}
