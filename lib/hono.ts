import { Hono } from 'hono'
import type { Message } from '@/types/chat'

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

const chatRoute = new Hono()

chatRoute.post('/', async (c) => {
  await c.req.json<{ messages: Message[] }>()
  const content = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
  return c.json({ content })
})

export default chatRoute
