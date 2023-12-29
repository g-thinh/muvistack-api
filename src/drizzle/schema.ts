import type { InferSelectModel } from 'drizzle-orm'
import { mysqlTable, int, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const accounts = mysqlTable('account', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  createdAt: timestamp('added_at').defaultNow()
})

export type Account = InferSelectModel<typeof accounts>
export type InsertAccount = InferSelectModel<typeof accounts>
