import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

const sqlite = new Database(Bun.env.DB_URL)
export const db = drizzle(sqlite)