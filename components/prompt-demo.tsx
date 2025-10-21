"use client"

import { useState } from "react"
import useSWR from "swr"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type TemplateItem = { id: string; category: string; title: string; prompt: string; answer: string }

export function PromptDemo() {
  const { data } = useSWR<{ categories: string[]; items: TemplateItem[] }>("/api/templates", fetcher)
  const [prompt, setPrompt] = useState("Write an email to HR accepting offer")
  const [tone, setTone] = useState<"Formal" | "Friendly" | "Persuasive">("Formal")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ subject: string; email: string } | null>(null)

  const REQUESTED_STREAMS = ["Academic", "Business", "Technology", "Fresher", "Experienced", "General", "Job", "Client"]
  const [activeStream, setActiveStream] = useState<string>("All")

  const filtered = (data?.items ?? []).filter((it) => {
    if (activeStream === "All") return true
    return it.category.toLowerCase().includes(activeStream.toLowerCase())
  })

  async function onGenerate() {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone }),
      })
      const json = await res.json()
      setResult(json)
    } finally {
      setLoading(false)
    }
  }

  async function onSelectTemplate(t: TemplateItem) {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: t.id, tone }),
      })
      const json = await res.json()
      setResult(json)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="playground-card">
      <CardHeader>
        <CardTitle>Try MailGenie</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div id="streams" className="flex flex-wrap gap-2">
          <button
            className={`play-chip ${activeStream === "All" ? "play-chip-active" : ""}`}
            onClick={() => setActiveStream("All")}
            aria-pressed={activeStream === "All"}
          >
            All
          </button>
          {REQUESTED_STREAMS.map((s) => (
            <button
              key={s}
              className={`play-chip ${activeStream === s ? "play-chip-active" : ""}`}
              onClick={() => setActiveStream(s)}
              aria-pressed={activeStream === s}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="prompt">Your prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-28 play-input"
            placeholder="e.g., Write a follow-up email after the interview"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2" id="templates">
            <Label>Templates</Label>
            <div className="flex flex-wrap gap-2">
              {(filtered.length ? filtered : (data?.items ?? [])).slice(0, 24).map((t) => (
                <button key={t.id} className="play-template" onClick={() => onSelectTemplate(t)}>
                  {t.title}
                </button>
              ))}
              {!data && <span className="text-muted-foreground">Loading templates…</span>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as any)}>
              <SelectTrigger className="w-full play-select">
                <SelectValue placeholder="Choose tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onGenerate} className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" /> Generating…
              </>
            ) : (
              "Generate Email"
            )}
          </Button>
          <a href="/extension" className="btn-secondary" aria-label="Get the browser extension">
            Add Extension
          </a>
        </div>

        {result && (
          <div className="mt-2 grid gap-2 animate-in fade-in duration-300">
            <div className="pill w-fit">Subject</div>
            <p className="font-semibold">{result.subject}</p>
            <div className="pill w-fit mt-2">Email</div>
            <pre className="whitespace-pre-wrap text-sm leading-6">{result.email}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
