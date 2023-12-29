import app from './app'
import logger from './utils/logger'
import config from './config/config'

app.listen(config.port, () => {
  logger.info(`Server is running on http://localhost:${config.port}`)
})

const unexpectedErrorHandler = (err: unknown) => {
  logger.error(err)
  process.exit(1)
}

// Handle unhandled promise rejections
process.on('unhandledRejection', unexpectedErrorHandler)
process.on('uncaughtException', unexpectedErrorHandler)
