import { db } from '../drizzle'
import { type SelectAccount } from '../drizzle/schema'
import logger from '../utils/logger'

const getAll = async (): Promise<SelectAccount[] | undefined> => {
  try {
    const accounts = await db.query.accounts.findMany()
    return accounts
  } catch (e) {
    logger.error(e)
  }
}

const getOne = async (id: number): Promise<SelectAccount | undefined> => {
  try {
    const account = await db.query.accounts.findFirst({
      where: (accounts, { eq }) => eq(accounts.id, id)
    })
    return account
  } catch (e) {
    logger.error(e)
  }
}

export const accountService = {
  getAll,
  getOne
}
