import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const visits = sqliteTable('visits', {
  id: integer('id').primaryKey(),
  counter: integer('counter')
})

// Tabela para as cartas
export const cards = sqliteTable('cards', {
  id: integer('id').primaryKey(),
  name: text('name'), // Nome da carta (animal, local, objeto, filme, etc.)
  type: text('type'), // Tipo da carta (preta, branca, vermelha, azul)
  // game_session_id: integer('game_session_id') // Referência à sessão de jogo
  gameSessionId: integer("game_session_id").references(() => game_sessions.id) // Referência à sessão de jogo
});

// Tabela para os jogadores
export const players = sqliteTable('players', {
  id: integer('id').primaryKey(),
  name: text('name'), // Nome do jogador
  role: text('role'), // Cargo do jogador (spymaster ou agente)
  team: text('team'), // Equipe do jogador (vermelho ou azul)
  // game_session_id: integer('game_session_id') // Referência à sessão de jogo
  gameSessionId: integer("game_session_id").references(() => game_sessions.id) // Referência à sessão de jogo
});

// Tabela para as sessões de jogo
export const game_sessions = sqliteTable('game_sessions', {
  id: integer('id').primaryKey(),
  slug: text('slug'),             // Slug único para a sessão de jogo
  hint: text(''),
  hintLen: integer('hint_len'),
  isActive: integer('is_active'), // Se a sessão de jogo está ativa, 1 para ativo, 0 para inativo
  winner: text('winner')          // Vencedor da sessão de jogo (vermelho, azul, ou null se ainda não decidido)
});

// export const sessions = sqliteTable('sessions', {
//   id: integer('id').primaryKey(),
//   slug: text('slug')
// })