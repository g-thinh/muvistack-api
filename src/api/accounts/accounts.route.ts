import { Router } from 'express'
import {
  getAccounts,
  getAccountById,
  createAccount,
  deleteAccount
} from './account.controller'
import { validateBodyMiddleware } from '@/middlewares/validateBody.middleware'
import { createAccountSchema } from './account.model'

const router = Router()

router.get('/accounts', getAccounts)

router.get('/accounts/:id', getAccountById)

router.post(
  '/accounts',
  validateBodyMiddleware(createAccountSchema),
  createAccount
)

router.delete('/accounts', deleteAccount)

export default router
