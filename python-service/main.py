import os
from typing import Literal
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Try to import OpenAI client, but handle absence gracefully
try:
    from openai import OpenAI  # type: ignore
except Exception:
    OpenAI = None  # type: ignore

app = FastAPI(title="MailGenie Python Service", version="1.0.0")

Tone = Literal["Formal", "Friendly", "Persuasive"]

TONE_STYLES = {
    "Formal": {
        "greeting": "Dear",
        "signoff": "Sincerely",
        "flair": "I appreciate your time and consideration.",
    },
    "Friendly": {
        "greeting": "Hi",
        "signoff": "Best",
        "flair": "Thanks so much for your help!",
    },
    "Persuasive": {
        "greeting": "Hello",
        "signoff": "Kind regards",
        "flair": "I believe this will be mutually beneficial.",
    },
}

class GenerateRequest(BaseModel):
    prompt: str
    tone: Tone = "Formal"

class GenerateResponse(BaseModel):
    subject: str
    email: str


def _fallback_email(prompt: str, tone: Tone) -> GenerateResponse:
    t = TONE_STYLES[tone]
    subject = f"Regarding Your Request — {tone}"
    body_lines = [
        f"{t['greeting']} [Recipient],",
        "",
        # IMPORTANT: do not echo the user's prompt here
        "I'm writing to follow up and keep things moving forward.",
        "I've prepared the details and next steps based on your needs.",
        "Please share any preferences or constraints so I can refine accordingly.",
        "",
        t["flair"],
        "",
        f"{t['signoff']},",
        "[Your Name]",
    ]
    return GenerateResponse(subject=subject, email="\n".join(body_lines))


@app.post("/generate", response_model=GenerateResponse)
async def generate(req: GenerateRequest):
    prompt = (req.prompt or "Your request").strip()
    tone: Tone = req.tone if req.tone in TONE_STYLES else "Formal"

    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini").strip()

    # If API key or client not available, return a sensible fallback
    if not api_key or OpenAI is None:
        return _fallback_email(prompt, tone)

    try:
        client = OpenAI(api_key=api_key)

        system_instructions = (
            "You are MailGenie, a concise, professional email writer. "
            "Write a short, polished email that does NOT repeat or quote the user's prompt. "
            "Infer the topic and intent from the prompt, and craft helpful, forward-moving language. "
            "Use placeholders [Recipient] and [Your Name]. "
            "Avoid lines like 'I'm reaching out regarding: " + prompt + "'. "
            "Stay within 120-160 words. Keep tone aligned to the provided style. "
            "Do not include a subject line; only return the email body text."
        )

        t = TONE_STYLES[tone]
        style_guide = (
            f"Greeting: {t['greeting']} [Recipient]\n"
            f"Sign-off: {t['signoff']},\n"
            f"Style flair to weave subtly: {t['flair']}\n"
        )

        messages = [
            {"role": "system", "content": system_instructions},
            {
                "role": "user",
                "content": (
                    "Prompt: " + prompt + "\n\n" +
                    "Tone: " + tone + "\n\n" +
                    style_guide +
                    "\nConstraints:\n"
                    "- Never repeat or quote the prompt text.\n"
                    "- Start with the specified greeting.\n"
                    "- Keep paragraphs short; use clear actions and next steps.\n"
                    "- End with the specified sign-off and [Your Name].\n"
                ),
            },
        ]

        # Create a chat completion
        resp = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.6,
        )

        email_body = resp.choices[0].message.content.strip() if resp and resp.choices else ""
        if not email_body:
            return _fallback_email(prompt, tone)

        # Compute subject consistently per requirement
        subject = f"Regarding Your Request — {tone}"
        return GenerateResponse(subject=subject, email=email_body)

    except Exception as e:
        # On any error, return fallback but include minimal diagnostic in server logs
        print("[MailGenie Python] Error generating email:", e)
        return _fallback_email(prompt, tone)