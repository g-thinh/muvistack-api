import { db } from '@/utils/drizzle'
import { accounts, type Account, CreateAccountDTO } from './account.model'
import { AppError } from '@/utils/errors'
import { eq } from 'drizzle-orm'

/**
 * Service responsible for handling operations related to user accounts.
 *
 * @class
 */
export class AccountService {
  /**
   * Retrieves all user accounts.
   *
   * @returns {Promise<Account[]>} - A promise resolving to an array of user accounts.
   */
  async getAll(): Promise<Account[]> {
    const accounts = await db.query.accounts.findMany()
    return accounts
  }

  /**
   * Retrieves a user account by its ID.
   *
   * @param {number} id - The ID of the user account.
   * @returns {Promise<Account | undefined>} - A promise resolving to the user account, or undefined if not found.
   * @throws {AppError} - Throws a 404 error if the account is not found.
   */
  async getById(id: number): Promise<Account | undefined> {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.id, id)
    })

    if (!account) {
      throw new AppError(404, 'Account not found')
    }

    return account
  }

  /**
   * Retrieves a user account by its email address.
   *
   * @param {string} email - The email address of the user account.
   * @returns {Promise<Account | undefined>} - A promise resolving to the user account, or undefined if not found.
   */
  async getByEmail(email: string): Promise<Account | undefined> {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.email, email)
    })
    return account
  }

  /**
   * Deletes a user account by its ID.
   *
   * @param {number} id - The ID of the user account to be deleted.
   * @returns {Promise<void>} - A promise indicating the success of the deletion.
   */
  async deleteById(id: number): Promise<void> {
    await db.delete(accounts).where(eq(accounts.id, id))
  }

  /**
   * Creates a new user account.
   *
   * @param {CreateAccountDTO} input - The input data for creating a new account.
   * @returns {Promise<Account | undefined>} - A promise resolving to the created user account, or undefined if creation fails.
   * @throws {AppError} - Throws a 400 error if the account already exists.
   */
  async create(input: CreateAccountDTO): Promise<Account | undefined> {
    const accountExists = await this.checkIfAccountExists(input.email!)

    if (accountExists) {
      throw new AppError(400, 'Account already exists')
    }

    await db.insert(accounts).values(input)
    const createdAccount = await this.getByEmail(input.email!)
    return createdAccount
  }

  /**
   * Checks if an account with the given email address already exists.
   *
   * @private
   * @param {string} email - The email address to check.
   * @returns {Promise<boolean>} - A promise indicating whether the account exists (true) or not (false).
   */
  private async checkIfAccountExists(email: string): Promise<boolean> {
    const account = await this.getByEmail(email)
    return account ? true : false
  }
}
