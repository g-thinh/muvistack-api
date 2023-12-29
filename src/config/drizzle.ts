import type { Config } from 'drizzle-kit'
import config from './config'

export default {
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    uri: config.databaseUrl ?? ''
  },
  out: './src/migrations',
  driver: 'mysql2',
  verbose: true,
  strict: true
} satisfies Config
