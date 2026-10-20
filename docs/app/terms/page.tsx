import type { Metadata } from "next"
import { Terms } from "@/components/terms"

export const metadata: Metadata = { title: "Terms of Service" }

export default function TermsPage() {
  return <Terms />
}
