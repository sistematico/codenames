import { Hono } from 'hono'
import { createNewGameSession, addHint } from '_/server/game'

const app = new Hono()

app.get('/ping', (c) => c.text('pong'))

app.get('/game/new/:slug', async (c) => {
  const slug = c.req.param('slug')
  createNewGameSession(slug)
  return c.json({ message: 'Session created: ' + slug })
})

app.post('/hint/add', async (c) => {
  const { sess, hint, len } = await c.req.json()
  await addHint(sess, hint, len)
  return c.text(hint)
})

export default app