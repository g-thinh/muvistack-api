/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'
import { AppError } from '../utils/errors'

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err, err.message)

  if (err instanceof AppError) {
    res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message
      }
    })
  }

  res.status(500).json({
    error: {
      status: 500,
      message: 'Internal Server Error'
    }
  })

  next(err)
}
