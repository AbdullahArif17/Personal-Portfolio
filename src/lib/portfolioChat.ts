export type PortfolioChatRole = "user" | "assistant"

export interface PortfolioChatMessage {
  id: string
  role: PortfolioChatRole
  content: string
}

interface ChatApiResponse {
  reply: string
}

export async function sendPortfolioMessage(
  message: string,
  history: PortfolioChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history: history.map(({ role, content }) => ({ role, content })),
    }),
    signal,
  })

  const data = (await response.json().catch(() => null)) as
    | (Partial<ChatApiResponse> & { error?: string })
    | null

  if (!response.ok) {
    throw new Error(data?.error || "The assistant is unavailable right now.")
  }

  if (!data?.reply || typeof data.reply !== "string") {
    throw new Error("The assistant returned an invalid response.")
  }

  return data.reply
}
