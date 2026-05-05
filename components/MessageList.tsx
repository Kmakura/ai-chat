'use client'
import { useEffect, useRef } from 'react'
import type { Message } from '@/types/chat'
import { MessageItem } from './MessageItem'

export function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto bg-blue-50 px-4 py-6 space-y-3">
      {messages.length === 0 && (
        <p className="text-center text-sm text-blue-300 mt-8">
          メッセージを入力して会話を始めましょう
        </p>
      )}
      {messages.map((message, i) => (
        <MessageItem key={i} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
