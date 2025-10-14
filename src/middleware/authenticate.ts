import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

/**custom modules */
import { verifyAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';

/**types */
import type { Request, Response, NextFunction } from 'express';
import type { Types } from 'mongoose';
import { UserRole } from '@/models/user';

/** middleware to verify user access token from the authorization header
 * check for valid token, if userId is  to request obj else an error res
 * req-expect a bearer token in auth header
 * next - pass control to the next middleware
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  //no token
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({
      code: 'AuthenticationError',
      message: 'Access denied, no token provided',
    });
    return;
  }

  const token = authHeader.slice(7); // Skip 'Bearer '

  try {
    // verify token & get the userId from payload
    const jwtPayload = verifyAccessToken(token as string) as {
      userId: Types.ObjectId;
      role: UserRole;
    };

    console.log('role', jwtPayload);

    // attach userId to the req obj for later usage
    req.userId = jwtPayload.userId;
    req.userRole = jwtPayload.role;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message:
          'Access token has expired, request a new one with refresh token',
      });
      return;
    }
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Access token is invalid',
      });
      return;
    }
    const errMessage =
      error instanceof Error
        ? error.message || error.stack
        : 'Internal server error';

    //catch all errors
    res.status(500).json({
      code: 'ServerError',
      message: errMessage,
    });

    logger.error('Error during authentication', errMessage);
  }
};
