import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const maxDuration = 120

const MAX_MESSAGE_LENGTH = 2000
const MAX_HISTORY_ITEMS = 20
const REQUEST_TIMEOUT_MS = 110_000

type ChatRole = "user" | "assistant"

interface HistoryItem {
  role: ChatRole
  content: string
}

function isHistoryItem(value: unknown): value is HistoryItem {
  if (!value || typeof value !== "object") return false

  const item = value as Record<string, unknown>
  return (
    (item.role === "user" || item.role === "assistant") &&
    typeof item.content === "string" &&
    item.content.trim().length > 0 &&
    item.content.length <= MAX_MESSAGE_LENGTH
  )
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const message = typeof payload.message === "string" ? payload.message.trim() : ""
  const history = Array.isArray(payload.history) ? payload.history : []

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    )
  }

  if (history.length > MAX_HISTORY_ITEMS || !history.every(isHistoryItem)) {
    return NextResponse.json({ error: "Invalid conversation history." }, { status: 400 })
  }

  const apiUrl = (
    process.env.PORTFOLIO_CHAT_API_URL || process.env.NEXT_PUBLIC_CHAT_API_URL
  )?.replace(/\/$/, "")

  if (!apiUrl) {
    return NextResponse.json(
      { error: "The portfolio assistant is not configured yet." },
      { status: 503 },
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${apiUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
      cache: "no-store",
      signal: controller.signal,
    })

    const data = (await response.json().catch(() => null)) as
      | { reply?: unknown; detail?: unknown }
      | null

    if (!response.ok) {
      console.error("Portfolio chat backend error", response.status, data?.detail)
      return NextResponse.json(
        { error: "The portfolio assistant is temporarily unavailable." },
        { status: response.status >= 500 ? 502 : response.status },
      )
    }

    if (typeof data?.reply !== "string" || !data.reply.trim()) {
      return NextResponse.json(
        { error: "The portfolio assistant returned an invalid response." },
        { status: 502 },
      )
    }

    return NextResponse.json({ reply: data.reply })
  } catch (error) {
    const timedOut = controller.signal.aborted
    console.error("Portfolio chat proxy failed", error)
    return NextResponse.json(
      {
        error: timedOut
          ? "The portfolio assistant took too long to respond. Please try again."
          : "The portfolio assistant is temporarily unavailable.",
      },
      { status: timedOut ? 504 : 502 },
    )
  } finally {
    clearTimeout(timeout)
  }
}
