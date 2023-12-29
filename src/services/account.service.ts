import { db } from '../drizzle'
import type { Account } from '../drizzle/schema'
import { AppError } from '../utils/errors'

const getAll = async (): Promise<Account[] | undefined> => {
  const accounts = await db.query.accounts.findMany()
  return accounts
}

const getOne = async (id: number): Promise<Account | undefined> => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.id, id)
  })

  if (!account) {
    throw new AppError(404, 'Account not found')
  }

  return account
}

export const accountService = {
  getAll,
  getOne
}
