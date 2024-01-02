import dotenv from 'dotenv'
import logger from './logger'

function loadConfig() {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' })
  } else {
    dotenv.config() //load default .env file
  }
  logger.info(`Loading environment variables for ${process.env.ENVIRONMENT}...`)
}

loadConfig()

const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  environment: process.env.ENVIRONMENT
}

export default config
