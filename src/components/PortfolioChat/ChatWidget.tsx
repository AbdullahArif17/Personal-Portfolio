"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react"
import ChatMessage from "./ChatMessage"
import { useChatSession } from "./useChatSession"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const { messages, isTyping, sendMessage } = useChatSession()
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [isOpen, messages, isTyping])

  const handleSend = async () => {
    const message = input.trim()
    if (!message || isTyping) return

    setInput("")
    await sendMessage(message)
    inputRef.current?.focus()
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <div
        id="portfolio-chat-panel"
        role="dialog"
        aria-label="Chat with Abdullah's AI assistant"
        aria-hidden={!isOpen}
        className={`absolute bottom-[4.5rem] right-0 flex h-[min(620px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#08080a]/95 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-200 sm:w-[390px] ${
          isOpen
            ? "visible pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-[0_0_24px_rgba(139,92,246,0.28)]">
              <Bot className="size-5" aria-hidden="true" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-zinc-950 bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-bold text-white">Abdullah&apos;s AI</p>
                <Sparkles className="size-3 text-violet-400" aria-hidden="true" />
              </div>
              <p className="text-[11px] text-zinc-500">Portfolio assistant</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Close chat"
          >
            <X className="size-4" />
          </button>
        </div>

        <div
          className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
          aria-live="polite"
          aria-busy={isTyping}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-end gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
                <Bot className="size-3.5" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-zinc-800 bg-zinc-900 px-4 py-3">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className="size-1.5 animate-bounce rounded-full bg-zinc-500"
                    style={{ animationDelay: `${index * 140}ms` }}
                  />
                ))}
                <span className="sr-only">Assistant is typing</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-zinc-800 bg-zinc-950/80 p-3">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-3 py-1.5 transition focus-within:border-violet-500/70 focus-within:ring-1 focus-within:ring-violet-500/30">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void handleSend()
                }
              }}
              maxLength={2000}
              disabled={isTyping}
              placeholder="Ask about Abdullah..."
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-zinc-600 disabled:opacity-60"
              aria-label="Message Abdullah's AI assistant"
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!input.trim() || isTyping}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-zinc-600">
            Answers are grounded in Abdullah&apos;s CV and GitHub.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group relative flex size-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-[0_10px_35px_rgba(124,58,237,0.45)] transition hover:-translate-y-0.5 hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:size-16"
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
        aria-controls="portfolio-chat-panel"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-violet-500/20 [animation-duration:2.5s]" />
        {isOpen ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle
            className="size-6 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  )
}
