import type { Config } from 'drizzle-kit'

export default {
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    uri: process.env.DATABASE_URL ?? ''
  },
  out: './src/drizzle/migrations',
  driver: 'mysql2',
  verbose: true,
  strict: true
} satisfies Config
