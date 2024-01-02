import { ValidatedRequest } from '@/middlewares/validateBody.middleware'
import { asyncHandler } from '@/utils/asyncHandler'
import { type Request, type Response } from 'express'
import { CreateAccountDTO } from './account.model'
import { AccountService } from './account.service'

export const getAccounts = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const accountService = new AccountService()
    const accounts = await accountService.getAll()
    res.json(accounts)
  }
)

export const getAccountById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const accountService = new AccountService()
    const accountId = parseInt(req.params.id)
    const account = await accountService.getById(accountId)
    res.json(account)
  }
)

export const createAccount = asyncHandler(
  async (
    req: ValidatedRequest<CreateAccountDTO>,
    res: Response
  ): Promise<void> => {
    const accountService = new AccountService()
    if (req.validatedBody) {
      const newAccount = await accountService.create(req.validatedBody)
      res.send([newAccount])
    }
  }
)

export const deleteAccount = asyncHandler(
  async (req: Request): Promise<void> => {
    const accountService = new AccountService()
    await accountService.deleteById(req.body.id)
  }
)
