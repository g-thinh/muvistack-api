import { Router } from 'express'
import { getAccounts, getAccountById } from '../controllers/accountController'

const router = Router()

router.get('/accounts', getAccounts)

router.get('/accounts/:id', getAccountById)

export default router
