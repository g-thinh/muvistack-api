import { NextFunction, Response, Request } from 'express'

type AsyncHandler<T = any> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>

/**
 * A utility function to handle asynchronous route handlers by wrapping them in a try-catch block.
 *
 * @param {AsyncHandler<T>} handler - Async route handler
 * @returns {AsyncHandler} - A function that can be used as a route handler with consistent error handling.
 *
 *  * @example
 * // Using asyncHandler in a route
 * router.get(
 *   '/example',
 *   asyncHandler(async (req, res) => {
 *     const result = await someAsyncOperation();
 *     res.json({ result });
 *   })
 * );
 */
export const asyncHandler = <T>(handler: AsyncHandler<T>): AsyncHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
