import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const sessions = sqliteTable('sessions', {
  id: integer('id').primaryKey(),
  slug: text('slug')
})

export const visits = sqliteTable('visits', {
  id: integer('id').primaryKey(),
  counter: integer('counter')
})