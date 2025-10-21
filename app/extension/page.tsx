import { Puzzle, ArrowRight, Download, Chrome } from "lucide-react"

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

            {/* Download Section */}
            <div className="soft-card p-6 bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Download className="size-6 text-primary" />
                <h2 className="text-xl font-bold">Download Extension</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Download the extension files from our GitHub repository:
              </p>
              <a 
                href="https://github.com/sv410/MailGenie-the-replier/tree/main/extension"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Chrome className="size-4" />
                Get Extension from GitHub
                <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="grid gap-4">
              <div className="soft-card p-4">
                <div className="pill mb-2 w-fit">Install in Chrome / Edge</div>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                  <li>Download the extension folder from <a href="https://github.com/sv410/MailGenie-the-replier" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a></li>
                  <li>Open <code>chrome://extensions</code> in Chrome or <code>edge://extensions</code> in Edge.</li>
                  <li>Enable <strong>Developer mode</strong> (toggle in top-right corner).</li>
                  <li>Click <strong>Load unpacked</strong> and select the <code>extension</code> folder.</li>
                  <li>Pin the <strong>MailGenie</strong> extension to your toolbar.</li>
                  <li>Click the extension icon and set <strong>API Base URL</strong> to your deployed site (e.g., <code>https://your-site.vercel.app</code>).</li>
                  <li>Enter a prompt, choose a tone, and click <strong>Generate Email</strong>.</li>
                </ol>
              </div>

              <div className="soft-card p-4">
                <div className="pill mb-2 w-fit">Configuration</div>
                <div className="space-y-2 text-sm md:text-base">
                  <p className="text-muted-foreground">
                    <strong>For local development:</strong> Set API Base URL to <code>http://localhost:3000</code>
                  </p>
                  <p className="text-muted-foreground">
                    <strong>For production:</strong> Set API Base URL to your deployed domain
                  </p>
                </div>
              </div>

              <div className="soft-card p-4">
                <div className="pill mb-2 w-fit">How it works</div>
                <p className="text-sm md:text-base text-muted-foreground">
                  The extension calls your site's <code>/api/generate</code> endpoint. It supports our Python backend via the Next.js route, and includes CORS so calls from the extension succeed.
                </p>
                <div className="mt-3 p-3 bg-muted/50 rounded-lg font-mono text-xs">
                  Extension → Your Site → Python Service → OpenAI API → Generated Email
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="/try" className="btn-primary">
                Try MailGenie Playground
                <ArrowRight className="ml-2 size-4" />
              </a>
              <a href="https://github.com/sv410/MailGenie-the-replier" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View on GitHub
                <Puzzle className="ml-2 size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}