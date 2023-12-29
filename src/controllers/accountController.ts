import { type Request, type Response } from 'express'
import logger from '../utils/logger'
import { accountService } from '../services/accountService'

export const getAccounts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const accounts = await accountService.getAll()
    res.json(accounts)
  } catch (e) {
    logger.error(e)
    res.status(500)
  }
}

export const getAccountById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const accountId = parseInt(req.params.id)
  try {
    const accounts = await accountService.getOne(accountId)
    res.json(accounts)
  } catch (e) {
    logger.error(e)
    res.status(500)
  }
}
