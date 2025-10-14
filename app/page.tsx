import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-dvh">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
