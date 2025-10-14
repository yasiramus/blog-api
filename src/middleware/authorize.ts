/**types */
import type { Request, Response, NextFunction } from 'express';
import { UserRole } from '@/models/user';

const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { userId, userRole } = req;

    if (!userId && !roles.includes(userRole as UserRole)) {
      res.status(403).json({
        code: 'AuthorizationError',
        message: 'Access denied, insufficient permissions',
      });
      return;
    }

    next();
  };
};

export default authorize;
