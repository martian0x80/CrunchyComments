import type { Metadata } from "next"
import { PrivacyPolicy } from "@/components/privacy-policy"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return <PrivacyPolicy />
}
