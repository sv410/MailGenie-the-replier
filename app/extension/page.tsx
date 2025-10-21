import { Puzzle, ArrowRight } from "lucide-react"

export default function ExtensionPage() {
  return (
    <main className="min-h-dvh section-aurora">
      <section className="relative mx-auto max-w-5xl px-4 pt-10 md:pt-16 pb-12">
        <div className="card-on-aurora p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="pill">New</span>
              <span className="pill">MailGenie Browser Extension</span>
            </div>

            <h1 className="heading text-balance text-3xl md:text-5xl font-extrabold leading-tight">
              Add the MailGenie Extension
            </h1>
            <p className="text-pretty text-base md:text-lg text-muted-foreground max-w-2xl">
              Generate professional emails directly from your browser. Install the extension and start creating emails in seconds.
            </p>

            <div className="grid gap-4">
              <div className="soft-card p-4">
                <div className="pill mb-2 w-fit">Install in Chrome</div>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                  <li>Open <code>chrome://extensions</code> in Chrome.</li>
                  <li>Enable <strong>Developer mode</strong> (top-right).</li>
                  <li>Click <strong>Load unpacked</strong> and select the <code>extension</code> folder in this project.</li>
                  <li>Pin the <strong>MailGenie</strong> extension to your toolbar.</li>
                  <li>Open the extension and set <strong>API Base URL</strong> to <code>http://localhost:3000</code> (or your deployed domain).</li>
                  <li>Enter a prompt, choose a tone, and click <strong>Generate</strong>.</li>
                </ol>
              </div>

              <div className="soft-card p-4">
                <div className="pill mb-2 w-fit">Where the data goes</div>
                <p className="text-sm md:text-base text-muted-foreground">
                  The extension calls your site’s <code>/api/generate</code> endpoint. It supports our Python backend via the Next.js route, and includes CORS so calls from the extension succeed.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="/try" className="btn-primary">
                Try MailGenie Playground
                <ArrowRight className="ml-2 size-4" />
              </a>
              <a href="/extension" className="btn-secondary" aria-label="Extension already on this page">
                Extension Instructions
                <Puzzle className="ml-2 size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}