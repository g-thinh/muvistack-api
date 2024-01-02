import { NextFunction, type Request, type Response } from 'express'
import { accountService } from './account.service'

export const getAccounts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accounts = await accountService.getAll()
    res.json(accounts)
  } catch (e) {
    next(e)
  }
}

export const getAccountById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accountId = parseInt(req.params.id)
  try {
    const account = await accountService.getById(accountId)

    res.json(account)
  } catch (e) {
    next(e)
  }
}
