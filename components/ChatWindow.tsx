'use client'
import { useState } from 'react'
import type { Message } from '@/types/chat'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'

const RESPONSES = [
  'それは面白いですね！もう少し詳しく教えてもらえますか？',
  'なるほど。その点について、どう思われますか？',
  'そうなんですね。他に気になっていることはありますか？',
  '興味深い視点ですね。なぜそう考えるようになったのでしょうか？',
  'ありがとうございます。それに関連して、何か困っていることはありますか？',
  '確かにそうですね。あなたならどう対処しますか？',
  'すごいですね！その経験から何か学んだことはありますか？',
  'もっと聞かせてください。具体的にはどんな状況だったのですか？',
  'とても良い考えだと思います。それをどう活かしていこうと思っていますか？',
  'おもしろい！ちなみに、それを思いついたきっかけは何ですか？',
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = (content: string) => {
    const userMessage: Message = { role: 'user', content }
    const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: 'assistant', content: response },
    ])
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-blue-600 px-4 py-3 shrink-0">
        <h1 className="text-sm font-semibold text-white">AI Chat</h1>
      </header>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} disabled={false} />
    </div>
  )
}
