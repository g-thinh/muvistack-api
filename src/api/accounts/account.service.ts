import { db } from '@/utils/drizzle'
import { accounts, type Account, CreateAccountDTO } from './account.model'
import { AppError } from '@/utils/errors'
import { eq } from 'drizzle-orm'

export class AccountService {
  async getAll(): Promise<Account[]> {
    const accounts = await db.query.accounts.findMany()
    return accounts
  }

  async getById(id: number): Promise<Account | undefined> {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.id, id)
    })

    if (!account) {
      throw new AppError(404, 'Account not found')
    }

    return account
  }

  async getByEmail(email: string): Promise<Account | undefined> {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.email, email)
    })
    return account
  }

  async deleteById(id: number): Promise<void> {
    await db.delete(accounts).where(eq(accounts.id, id))
  }

  async create(input: CreateAccountDTO): Promise<Account | undefined> {
    const accountExists = await this.checkIfAccountExists(input.email!)

    if (accountExists) {
      throw new AppError(400, 'Account already exists')
    }

    await db.insert(accounts).values(input)
    const createdAccount = await this.getByEmail(input.email!)
    return createdAccount
  }

  private async checkIfAccountExists(email: string): Promise<boolean> {
    const account = await this.getByEmail(email)
    return account ? true : false
  }
}
