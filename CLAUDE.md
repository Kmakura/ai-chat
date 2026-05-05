# AI Chat

汎用AIチャットボット。Next.js App Router + Hono + Mastra (Claude API) で構築するローカル開発用アプリ。

## Tech Stack

| 役割 | 技術 |
|------|------|
| フレームワーク | Next.js 15 (App Router) |
| APIサーバー | Hono (Next.js Route Handler に組み込み) |
| AIエージェント | Mastra |
| AIモデル | claude-sonnet-4-6 (Anthropic) |
| スタイリング | Tailwind CSS |
| 言語 | TypeScript |
| パッケージマネージャー | npm |
| デプロイ | ローカルのみ |

## Architecture

### ディレクトリ構成

```
ai-chat/
├── app/
│   ├── api/
│   │   └── [[...route]]/
│   │       └── route.ts        # Hono をマウント
│   ├── page.tsx                # チャット画面
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ChatWindow.tsx          # 会話全体のコンテナ
│   ├── MessageList.tsx         # メッセージ一覧
│   ├── MessageItem.tsx         # 1件のメッセージ
│   └── MessageInput.tsx        # 入力欄・送信ボタン
├── lib/
│   ├── mastra.ts               # Mastra エージェント定義
│   └── hono.ts                 # Hono アプリ定義
├── types/
│   └── chat.ts                 # Message 型など
└── .env.local                  # ANTHROPIC_API_KEY
```

### データフロー

```
[ユーザー入力]
      ↓
[React State (messages)]   ← セッション中のみ保持、リロードで消える
      ↓
POST /api/chat  (Hono Route)
      ↓
Mastra Agent.generate()
      ↓
Claude API (claude-sonnet-4-6)
      ↓
レスポンス → React State 更新 → UI 再レンダリング
```

## API

### POST /api/chat

**Request**
```json
{
  "messages": [
    { "role": "user", "content": "こんにちは" },
    { "role": "assistant", "content": "こんにちは！" }
  ]
}
```

**Response**
```json
{
  "content": "アシスタントの返答テキスト"
}
```

- ストリーミングなし（全文生成後に返す）
- 会話履歴はクライアント側で管理し、毎リクエストに含める

## Key Implementation Patterns

### Hono in Next.js Route Handler

```typescript
// app/api/[[...route]]/route.ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { chatRoute } from '@/lib/hono'

const app = new Hono().basePath('/api')
app.route('/chat', chatRoute)

export const GET = handle(app)
export const POST = handle(app)
```

### Mastra Agent

```typescript
// lib/mastra.ts
import { Agent } from '@mastra/core/agent'
import { anthropic } from '@ai-sdk/anthropic'

export const chatAgent = new Agent({
  name: 'chat-agent',
  instructions: 'あなたは親切なアシスタントです。',
  model: anthropic('claude-sonnet-4-6'),
})
```

### 会話履歴の型

```typescript
// types/chat.ts
export type Role = 'user' | 'assistant'

export interface Message {
  role: Role
  content: string
}
```

## Environment Variables

```
ANTHROPIC_API_KEY=your_api_key_here
```

`.env.local` に記載。サーバーサイドのみで参照（クライアントに露出させない）。

## Development

```bash
npm install
npm run dev   # http://localhost:3000
```

## Constraints & Decisions

- **会話履歴はサーバー側に保存しない**: React の `useState` で管理。リロードで消える仕様。
- **ストリーミング非使用**: `agent.generate()` で全文生成後にレスポンス。
- **認証なし**: ローカル開発用途のみ。
- **DB不使用**: Prisma は採用しない。永続化は行わない。
