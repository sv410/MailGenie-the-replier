"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 transition-all">
      <div className={`mx-auto max-w-6xl px-4 py-3 navbar-gradient rounded-b-xl transition-all ${
        scrolled ? "backdrop-blur-md border-b border-white/20" : ""
      }`}>
        <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo-mailgenie.png" alt="MailGenie logo" className="h-7 w-auto rounded-sm" />
          <span className="font-bold text-lg text-white">MailGenie</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-white/80 hover:text-white transition">
            Features
          </a>
          <a href="#how" className="text-white/80 hover:text-white transition">
            How it Works
          </a>
          <a href="#pricing" className="text-white/80 hover:text-white transition">
            Pricing
          </a>
          <a href="/try#templates" className="text-white/80 hover:text-white transition">
            Templates
          </a>
          <a href="/try#streams" className="text-white/80 hover:text-white transition">
            Use Cases
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild variant="default" className="btn-navbar">
            <a href="/try">Try MailGenie for Free</a>
          </Button>
        </div>
        </div>
      </div>
    </header>
  )
}
