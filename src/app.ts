import express, { type Application } from 'express'
import helloRoutes from './routes/helloRoutes'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import logger from './utils/logger'
import expressPino from 'pino-http'

dotenv.config()

const expressLogger = expressPino({ logger })

const configureMiddlewares = (app: Application): void => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
  app.use(helmet())
  app.use(expressLogger)
}

const configureRoutes = (app: Application): void => {
  app.use('/', helloRoutes)
}

const configureApp = (): Application => {
  const app = express()

  configureMiddlewares(app)
  configureRoutes(app)

  logger.info('App configured...')

  return app
}

export default configureApp()
