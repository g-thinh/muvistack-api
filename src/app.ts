import express, { type Application } from 'express'
import accountsRoute from './routes/accounts.route'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import logger, { pinoLoggerHandler } from './utils/logger'
import { errorHandler } from './middlewares/error.middleware'

const configureMiddlewares = (app: Application): void => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  app.use(helmet())
  app.use(pinoLoggerHandler)
}

const configureRoutes = (app: Application): void => {
  app.use('/', accountsRoute)
}

const configureApp = (): Application => {
  const app = express()

  configureMiddlewares(app)
  configureRoutes(app)

  app.use(errorHandler)

  logger.info('App configured...')

  return app
}

export default configureApp()
