import { Router } from 'express'
import { getAccounts, getAccountById } from '../controllers/account.controller'

const router = Router()

router.get('/accounts', getAccounts)

router.get('/accounts/:id', getAccountById)

export default router
