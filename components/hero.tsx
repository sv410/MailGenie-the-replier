"use client"

import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-10 md:pt-16">
      <div className="soft-card hero-surface gradient-hover p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <span className="pill">New</span>
            <span className="pill">Smarter Email Automation</span>
          </div>

          <h1 className="text-balance text-4xl md:text-6xl font-extrabold leading-tight">
            {"Craft Professional Emails in Seconds with MailGenie"}
          </h1>

          <p className="text-pretty text-base md:text-lg text-muted-foreground max-w-2xl">
            {
              "Turn short prompts into fully written professional emails with AI. Save time, stay professional, and communicate smarter."
            }
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a href="/try" className="btn-primary">
              {"Try MailGenie for Free"}
              <ArrowRight className="ml-2 size-4" />
            </a>
            <a href="#how" className="btn-secondary">
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
