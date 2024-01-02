/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'
import { AppError } from '../utils/errors'
import { ZodError } from 'zod'

/**
 * Express middleware for handling and centralizing errors and sending appropriate responses.
 *
 * @param {AppError | ZodError} err - The error object to handle.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 *
 * @example
 * // Must be used as the LAST middleware in the stack to catch all errors.
 * app.use(errorMiddleware);
 */
export const errorMiddleware = (
  err: AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(err, err.message)

  if (err instanceof AppError) {
    res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message
      }
    })
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        status: 400,
        message: 'Validation failed'
      },
      details: err.errors
    })
  }

  res.status(500).json({
    error: {
      status: 500,
      message: 'Internal Server Error'
    }
  })
}
