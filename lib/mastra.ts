import { Agent } from '@mastra/core/agent'

export const chatAgent = new Agent({
  id: 'chat-agent',
  name: 'chat-agent',
  instructions: 'あなたは親切なアシスタントです。',
  model: 'anthropic/claude-sonnet-4-6',
})
