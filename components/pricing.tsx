const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Generate up to 5 emails/day.",
    features: ["Basic templates", "Formal/Friendly tones", "Copy to clipboard"],
    highlight: true,
  },
  {
    name: "Pro",
    price: "$12",
    desc: "For power users and teams.",
    features: ["Unlimited generations", "All tones", "Saved prompts", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Security and customization for orgs.",
    features: ["SSO/SAML", "Custom templates", "Admin controls", "SLA"],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="section-aurora p-6 md:p-10">
        <div className="mb-10 text-center">
          <h2 className="heading text-3xl md:text-4xl font-bold text-balance">Pricing</h2>
          <p className="text-muted-foreground mt-2">Simple, transparent, and fair.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`card-on-aurora gradient-hover p-6 relative transition ${
                p.highlight
                  ? "ring-2 ring-[color:var(--mg-mint)] shadow-[0_0_40px_-12px_color-mix(in_oklab,var(--mg-mint),transparent_70%)]"
                  : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <span className="text-3xl font-bold">{p.price}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>

              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full" style={{ background: "var(--mg-mint)" }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a href="/playground" className="btn-primary mt-6 block text-center">
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
