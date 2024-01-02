import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

/**
 * Represents an Express request object extended with a validated body.
 *
 * @template T - The type of the validated body.
 */
export interface ValidatedRequest<T> extends Request {
  validatedBody?: T
}

/**
 * Middleware function to validate the request body using a Zod schema.
 *
 * @template T - The type of the expected request body.
 * @param {ZodSchema<T>} schema - The Zod schema used for validating the request body.
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
