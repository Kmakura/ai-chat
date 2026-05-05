import type { Message } from '@/types/chat'

export function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-800 border border-blue-100 shadow-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
