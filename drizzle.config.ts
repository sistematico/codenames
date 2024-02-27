import type { Config } from 'drizzle-kit' 
import * as dotenv from 'dotenv'
dotenv.config()   

export default {
  schema: './server/schema.ts',
  out: './drizzle',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:./drizzle/sqlite.db'
  }
} satisfies Config