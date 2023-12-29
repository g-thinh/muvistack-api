import pino, { Logger } from 'pino'
import expressPino from 'pino-http'

let logger: Logger

if (process.env.NODE_ENV === 'production') {
  logger = pino()
} else {
  logger = pino({
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  })
}

export const pinoLoggerHandler = expressPino({ logger })

export default logger
