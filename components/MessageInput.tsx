'use client'
import { useState, type KeyboardEvent } from 'react'

interface Props {
  onSend: (content: string) => void
  disabled: boolean
}

export function MessageInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-blue-100 bg-white px-4 py-4">
      <div className="flex gap-2 items-end">
        <textarea
          className="flex-1 resize-none rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition-shadow"
          rows={3}
          placeholder="メッセージを入力... (Enter で送信、Shift+Enter で改行)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
        >
          {disabled ? '送信中...' : '送信'}
        </button>
      </div>
    </div>
  )
}
