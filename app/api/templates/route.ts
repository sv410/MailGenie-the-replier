import { NextResponse } from "next/server"
import data from "@/data/prompts.json"

export const dynamic = "force-dynamic"

export async function GET() {
  const items = (data as any[]).map((d) => ({
    id: String(d.id),
    category: String(d.category || "General"),
    title: String(d.question || d.prompt || "Template"),
    prompt: String(d.prompt || ""),
    answer: String(d.answer || ""),
  }))
  const categories = Array.from(new Set(items.map((i) => i.category))).sort()
  return NextResponse.json({ categories, items })
}
