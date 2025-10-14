import type React from "react"
import type { Metadata } from "next"
import { Sora, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "MailGenie — AI Email Generator",
  description: "Craft professional emails in seconds from short prompts.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} antialiased`}>
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
