import { Hono } from 'hono'
import * as schema from '_/server/schema'
import { db } from '_/server/db'
import { sql, eq } from 'drizzle-orm'

const hono = new Hono()

hono.get('/ping', (c) => c.text('pong'))

hono.get('/hit', async (c) => {
  const update = await db.update(schema.visits).set({ counter: sql`${schema.visits.counter} + 1` }).where(eq(schema.visits.id, 1)).returning()
  if (update.length === 0) await db.insert(schema.visits).values({ id: 1, counter: 1 })
  return c.text('OK')  
})

hono.get('/sessions', async (c) => {
  const sessions = await db.select().from(schema.sessions)
  
  console.log(sessions)

  return c.json({ message: 'OK' })
})

export default hono