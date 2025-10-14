import { BadgeCheck, Clock, MousePointerClick, Pencil } from "lucide-react"

const features = [
  { title: "AI‑Powered Writing", desc: "High‑quality, context‑aware email drafts.", Icon: Pencil },
  { title: "Customizable Tones", desc: "Switch between Formal, Friendly, or Persuasive.", Icon: BadgeCheck },
  { title: "Instant Output", desc: "Get results in seconds—no waiting.", Icon: Clock },
  { title: "No Sign‑up Needed", desc: "Try it right away from the homepage.", Icon: MousePointerClick },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="section-aurora p-6 md:p-10">
        <div className="mb-10 text-center">
          <h2 className="heading text-3xl md:text-4xl font-bold text-balance">Features</h2>
          <p className="text-muted-foreground mt-2">Clean UI, smart defaults, and delightful micro‑interactions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="card-on-aurora gradient-hover p-5 transition will-change-transform group hover:scale-105 hover:shadow-lg"
            >
              <f.Icon className="size-6" style={{ color: "var(--mg-purple)" }} />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
