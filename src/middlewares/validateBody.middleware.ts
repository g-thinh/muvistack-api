import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export interface ValidatedRequest<T> extends Request {
  validatedBody?: T
}

/**
 * Middleware function to validate the request body using a Zod schema.
 *
 * @example
 * // Using validateBodyMiddleware in a route
 * router.post(
 *   '/create',
 *   validateBodyMiddleware(CreateUserSchema),
 *   async (req: ValidatedRequest<CreateUserDTO>, res: Response) => {
 *     const validatedBody = req.validatedBody;
 *     // Process the validated body...
 *     res.json({ message: 'User created successfully', user: validatedBody });
 *   }
 * );
 */
export const validateBodyMiddleware = <T>(schema: ZodSchema<T>) => {
  return async (
    req: ValidatedRequest<T>,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedBody = await schema.parseAsync(req.body)
      req.validatedBody = validatedBody
      next()
    } catch (error) {
      next(error)
    }
  }
}
