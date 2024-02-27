import * as schema from '_/server/schema' // import { game_sessions } from '_/server/schema' // Importe a definição da tabela
import { db } from '_/server/db'
import { eq, and } from 'drizzle-orm'
// import { sql, eq } from 'drizzle-orm'

export async function retrieveGameSession(slug: string) {
  const session = await db.select().from(schema.game_sessions)
    .where(
      and(
        eq(schema.game_sessions.slug, slug), 
        eq(schema.game_sessions.isActive, 1)
      )
    )
    .limit(1)

  return session
}

// retrieveGameSession('unique-game-slug').then(session => console.log(session));

export async function createNewGameSession(slug: string) {
  await db.insert(schema.game_sessions).values({ slug, isActive: 1, winner: '' });
}

export async function deactivateGameSession(sessionId: number) {
  await db.update(schema.game_sessions)
    .set({ isActive: 0 })
    .where(eq(schema.game_sessions.id, sessionId))
}

// deactivateGameSession(1)

export async function assignPlayerToTeam(gameSessionId: number, team: string, role: string = 'agente') {
  await db.insert(schema.players).values({ gameSessionId, role, team })
}

// assignPlayerToTeam(1, 'vermelho', 'agente')

export async function addHint(slug: string, hint: string, hintLen: number) {
  await db.insert(schema.game_sessions).values({ slug, hint, hintLen })
}

export async function retrieveHints(slug: string) {
  const hints = await db.select().from(schema.game_sessions)
    .where(eq(schema.game_sessions.slug, slug))    

  return hints
}