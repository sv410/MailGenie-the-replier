import { CheckCircle2, FileText, ListChecks, Sparkles } from "lucide-react"

const steps = [
  {
    title: "Enter a prompt",
    desc: 'Type something like {"Write an email to HR accepting offer"}.',
    Icon: FileText,
  },
  {
    title: "Fetch templates",
    desc: "MailGenie retrieves helpful templates from the backend.",
    Icon: ListChecks,
  },
  {
    title: "Pick a tone",
    desc: "Formal, Friendly, or Persuasive for the right voice.",
    Icon: Sparkles,
  },
  {
    title: "Get your email",
    desc: "Review, copy, and send—done in seconds.",
    Icon: CheckCircle2,
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="section-aurora p-6 md:p-10">
        <div className="mb-10 text-center">
          <h2 className="heading text-3xl md:text-4xl font-bold text-balance">How It Works</h2>
          <p className="text-muted-foreground mt-2">A simple 4-step flow with smart defaults.</p>
        </div>

        <div className="with-grid rounded-2xl p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="group card-on-aurora gradient-hover p-4 transition hover:shadow-md">
                <div className="flex items-center gap-3">
                  <s.Icon className="size-6" style={{ color: "var(--mg-green)" }} />
                  <span className="pill">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
