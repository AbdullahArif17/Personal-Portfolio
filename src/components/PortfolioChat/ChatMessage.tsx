import { Bot, UserRound } from "lucide-react"
import type { PortfolioChatMessage } from "@/lib/portfolioChat"

interface ChatMessageProps {
  message: PortfolioChatMessage
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant"

  return (
    <div
      className={`flex items-end gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
          <Bot className="size-3.5" aria-hidden="true" />
        </div>
      )}

      <div
        className={`max-w-[82%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isAssistant
            ? "rounded-2xl rounded-bl-sm border border-zinc-800 bg-zinc-900 text-zinc-200"
            : "rounded-2xl rounded-br-sm bg-violet-600 text-white"
        }`}
      >
        {message.content}
      </div>

      {!isAssistant && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
          <UserRound className="size-3.5" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}
