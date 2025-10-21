import { type NextRequest, NextResponse } from "next/server"
import data from "@/data/prompts.json"

type Tone = "Formal" | "Friendly" | "Persuasive"

const TONE_STYLES: Record<Tone, { greeting: string; signoff: string; flair: string }> = {
  Formal: {
    greeting: "Dear",
    signoff: "Sincerely",
    flair: "I appreciate your time and consideration.",
  },
  Friendly: {
    greeting: "Hi",
    signoff: "Best",
    flair: "Thanks so much for your help!",
  },
  Persuasive: {
    greeting: "Hello",
    signoff: "Kind regards",
    flair: "I believe this will be mutually beneficial.",
  },
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function pickTemplate(prompt: string) {
  const p = prompt.toLowerCase()
  if (p.includes("accept") || p.includes("offer")) return "offer-accept"
  if (p.includes("meeting") || p.includes("schedule")) return "meeting"
  if (p.includes("follow") || p.includes("status")) return "follow-up"
  if (p.includes("thank")) return "thank-you"
  return "generic"
}

function buildEmail(prompt: string, tone: Tone) {
  const t = TONE_STYLES[tone]
  const template = pickTemplate(prompt)

  const subjectByTemplate: Record<string, string> = {
    "offer-accept": "Acceptance of Offer",
    meeting: "Meeting Request",
    "follow-up": "Following Up",
    "thank-you": "Thank You",
    generic: "Regarding Your Request",
  }

  const subject = `${subjectByTemplate[template]} — ${tone}`

  const body = [
    `${t.greeting} [Recipient],`,
    "",
    template === "offer-accept"
      ? "I'm pleased to accept the offer and look forward to getting started. Please let me know the next steps and any paperwork to complete."
      : template === "meeting"
        ? "I'd like to schedule a meeting to discuss the details. I'm available Tue–Thu between 10am–2pm. Happy to adjust if needed."
        : template === "follow-up"
          ? "I wanted to follow up on my earlier message and see if there are any updates. I'm happy to provide additional information."
          : template === "thank-you"
            ? "Thank you for your time and support. I truly appreciate the opportunity to connect."
            : "I'm writing to follow up and keep things moving forward. I've prepared the details and next steps based on your needs. Please share any preferences so I can refine accordingly.",
    "",
    t.flair,
    "",
    `${t.signoff},`,
    "[Your Name]",
  ].join("\n")

  return { subject, email: body }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS })
}

export async function POST(req: NextRequest) {
  const { prompt, tone, templateId } = await req.json()

  if (templateId) {
    const item = (data as any[]).find((d) => String(d.id) === String(templateId))
    if (item) {
      const answer: string = String(item.answer || "")
      const subjMatch = answer.split("\n").find((l) => l.trim().toLowerCase().startsWith("subject:"))
      const subject = subjMatch ? subjMatch.replace(/^Subject:\s*/i, "").trim() : "Generated Email"
      return NextResponse.json({ subject, email: answer }, { headers: CORS_HEADERS })
    }
  }

  const safePrompt = typeof prompt === "string" && prompt.trim().length > 0 ? prompt.trim() : "Your request"
  const safeTone: Tone = tone === "Friendly" || tone === "Persuasive" ? tone : "Formal"

  const serviceUrl = process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8001"
  try {
    const res = await fetch(`${serviceUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: safePrompt, tone: safeTone }),
    })
    if (res.ok) {
      const json = await res.json()
      if (json && typeof json.subject === "string" && typeof json.email === "string") {
        return NextResponse.json(json, { headers: CORS_HEADERS })
      }
    }
  } catch {}

  const result = buildEmail(safePrompt, safeTone)
  return NextResponse.json(result, { headers: CORS_HEADERS })
}
