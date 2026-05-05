# 実装TODO

## 1. プロジェクトセットアップ

- [x] Next.jsプロジェクトを作成する
  ```bash
  npx create-next-app@latest ai-chat --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
  ```
- [x] 依存パッケージをインストールする
  ```bash
  npm install hono @mastra/core
  ```
- [x] `.env.local` を作成し `ANTHROPIC_API_KEY` を設定する
- [x] `.gitignore` に `.env.local` が含まれていることを確認する

---

## 2. 型定義

- [x] `types/chat.ts` を作成する
  - `Role` 型 (`'user' | 'assistant'`)
  - `Message` 型 (`{ role: Role, content: string }`)

---

## 3. バックエンド

- [x] `lib/mastra.ts` を作成する
  - Mastra モデルルーター経由で `claude-sonnet-4-6` を設定
  - Mastra `Agent` インスタンスをエクスポート
- [x] `lib/hono.ts` を作成する
  - `POST /chat` ルートを定義
  - リクエストボディから `messages` を受け取る
  - `chatAgent.generate()` を呼び出す
  - `{ content: string }` をレスポンスとして返す
- [x] `app/api/[[...route]]/route.ts` を作成する
  - Hono アプリを `/api` にマウント
  - `GET` / `POST` をエクスポート

---

## 4. フロントエンド

- [x] `components/MessageItem.tsx` を作成する
  - `role` に応じて左右に吹き出しを表示（user: 右、assistant: 左）
- [x] `components/MessageList.tsx` を作成する
  - `Message[]` を受け取り `MessageItem` を並べる
  - 最新メッセージへ自動スクロール
- [x] `components/MessageInput.tsx` を作成する
  - テキストエリア + 送信ボタン
  - `Enter` キーで送信（`Shift+Enter` で改行）
  - 送信中は入力・ボタンを `disabled` にする
- [x] `components/ChatWindow.tsx` を作成する
  - `useState` で `Message[]` を管理
  - `useState` で `isLoading` を管理
  - `POST /api/chat` を `fetch` で呼び出す
  - `MessageList` + `MessageInput` を組み合わせる
- [x] `app/page.tsx` を更新する
  - `ChatWindow` を中央配置で表示する

---

## 5. スタイリング

- [x] `app/globals.css` を整理する（不要なデフォルトスタイルを削除）
- [x] 全体レイアウトをシンプルに整える
  - 画面全体に広がるチャット画面
  - メッセージ一覧はスクロール可能
  - 入力欄は画面下部に固定

---

## 6. 動作確認

- [x] `npm run dev` でローカル起動（port 3001 で起動）
- [x] ブラウザで `http://localhost:3001` を開く（GET / 200 確認済み）
- [ ] メッセージを送信してAIからの返答が表示されることを確認（`.env.local` に実際の `ANTHROPIC_API_KEY` を設定後）
- [ ] 複数回の会話（コンテキスト保持）が機能することを確認
- [ ] ページリロード後に会話が消えることを確認
