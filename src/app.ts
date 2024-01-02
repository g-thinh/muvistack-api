import express, { type Application } from 'express'
import accountsRoute from './api/accounts/accounts.route'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import logger, { pinoLoggerHandler } from './utils/logger'
import { errorMiddleware } from './middlewares/error.middleware'

const configureMiddlewares = (app: Application): void => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  app.use(helmet())
  app.use(pinoLoggerHandler)
}

const configureRoutes = (app: Application): void => {
  app.use('/api', accountsRoute)
  app.use('/api/hello', async (req, res) => {
    res.send({ hello: 'world!' })
  })
}

const configureApp = (): Application => {
  const app = express()

  configureMiddlewares(app)
  configureRoutes(app)

  app.use(errorMiddleware)

  logger.info('App configured...')

  return app
}

export default configureApp()
