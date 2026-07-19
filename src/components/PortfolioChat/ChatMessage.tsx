import { Bot, UserRound } from "lucide-react"
import type { PortfolioChatMessage } from "@/lib/portfolioChat"

interface ChatMessageProps {
  message: PortfolioChatMessage
}

const LINK_PATTERN = /(https?:\/\/[^\s<]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi

function LinkedMessageContent({ content }: { content: string }) {
  return content.split(LINK_PATTERN).map((part, index) => {
    const urlMatch = part.match(/^(https?:\/\/[^\s]+?)([.,!?;:)]*)$/i)
    const emailMatch = part.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)

    if (urlMatch) {
      const [, url, punctuation] = urlMatch
      return (
        <span key={`${url}-${index}`}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-violet-300 underline decoration-violet-400/50 underline-offset-2 transition-colors hover:text-violet-200"
          >
            {url}
          </a>
          {punctuation}
        </span>
      )
    }

    if (emailMatch) {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${part}`}
          className="font-medium text-violet-300 underline decoration-violet-400/50 underline-offset-2 transition-colors hover:text-violet-200"
        >
          {part}
        </a>
      )
    }

    return part
  })
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
        <LinkedMessageContent content={message.content} />
      </div>

      {!isAssistant && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
          <UserRound className="size-3.5" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}
