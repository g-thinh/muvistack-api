import type { InferSelectModel } from 'drizzle-orm'
import { mysqlTable, int, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const accounts = mysqlTable('account', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }).unique(),
  createdAt: timestamp('added_at').defaultNow()
})

export type Account = InferSelectModel<typeof accounts>

export const selectAccountsSchema = createSelectSchema(accounts)

export const createAccountSchema = createInsertSchema(accounts, {
  name: z.string().min(6),
  email: z.string().email()
}).required({ name: true, email: true })

export type CreateAccountDTO = z.infer<typeof createAccountSchema>
