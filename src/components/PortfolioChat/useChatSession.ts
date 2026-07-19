"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  sendPortfolioMessage,
  type PortfolioChatMessage,
  type PortfolioChatRole,
} from "@/lib/portfolioChat"

export const PORTFOLIO_CHAT_GREETING =
  "Hi! I'm Abdullah's AI assistant. Ask me anything about his work, projects, or skills."

let messageSequence = 0

function createMessage(
  role: PortfolioChatRole,
  content: string,
): PortfolioChatMessage {
  messageSequence += 1
  return {
    id: `${Date.now()}-${messageSequence}`,
    role,
    content,
  }
}

export function useChatSession() {
  const [messages, setMessages] = useState<PortfolioChatMessage[]>(() => [
    createMessage("assistant", PORTFOLIO_CHAT_GREETING),
  ])
  const [isTyping, setIsTyping] = useState(false)
  const requestController = useRef<AbortController | null>(null)
  const isSending = useRef(false)

  useEffect(() => {
    return () => requestController.current?.abort()
  }, [])

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim()
      if (!message || isSending.current) return false

      isSending.current = true
      setIsTyping(true)

      const history = messages
      const userMessage = createMessage("user", message)
      setMessages((current) => [...current, userMessage])

      const controller = new AbortController()
      requestController.current = controller

      try {
        const reply = await sendPortfolioMessage(message, history, controller.signal)
        setMessages((current) => [
          ...current,
          createMessage("assistant", reply),
        ])
      } catch (error) {
        if (controller.signal.aborted) return false

        const content =
          error instanceof Error
            ? error.message
            : "I couldn't connect just now. Please try again in a moment."
        setMessages((current) => [
          ...current,
          createMessage("assistant", content),
        ])
      } finally {
        if (requestController.current === controller) {
          requestController.current = null
        }
        isSending.current = false
        setIsTyping(false)
      }

      return true
    },
    [messages],
  )

  return { messages, isTyping, sendMessage }
}
