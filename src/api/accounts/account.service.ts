import { db } from '@/utils/drizzle'
import type { Account } from './account.model'
import { AppError } from '@/utils/errors'

export const accountService = {
  getAll: async (): Promise<Account[] | undefined> => {
    const accounts = await db.query.accounts.findMany()
    return accounts
  },
  getById: async (id: number): Promise<Account | undefined> => {
    const account = await db.query.accounts.findFirst({
      where: (accounts, { eq }) => eq(accounts.id, id)
    })

    if (!account) {
      throw new AppError(404, 'Account not found')
    }

    return account
  }
}
