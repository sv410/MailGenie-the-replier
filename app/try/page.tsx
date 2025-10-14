import { PromptDemo } from "@/components/prompt-demo"

export default function TryPage() {
  return (
    <main className="relative try-aurora">
      {/* Hero-like surface for visual consistency */}
      <section className="relative mx-auto max-w-5xl px-4 pt-10 md:pt-14 pb-12">
        <div className="playground-card p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="pill">New</span>
              <span className="pill">MailGenie Playground</span>
            </div>

            <h1 className="text-balance text-3xl md:text-5xl font-extrabold leading-tight">Try MailGenie</h1>
            <p className="text-pretty text-base md:text-lg text-muted-foreground max-w-2xl">
              Enter a short prompt, pick a tone, and generate a professional email.
            </p>

            {/* Playground */}
            <div className="mt-2">
              <PromptDemo />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
