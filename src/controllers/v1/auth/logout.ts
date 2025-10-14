/**custom modules */
import { logger } from '@/lib/winston';

/**models */
import Token from '@/models/token';

/**utilities */
import { cookieOptions } from '@/utilities';

/**type */
import type { Request, Response } from 'express';

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken: string = req.cookies.refreshToken;

    if (!refreshToken) throw new Error('You are already logout');

    //delete token from db
    await Token.deleteOne({ token: refreshToken });
    logger.info('User refresh token in db deleted successfully', {
      userId: req.userId,
    });

    //clear cookie
    res.clearCookie('refreshToken', cookieOptions).sendStatus(204);
    logger.info('User logged out successfully');
  } catch (error: any) {
    const errMessage =
      error instanceof Error ? error.message || error.stack : 'Unknown error';
    res.status(400).json({ code: 'LogoutError', message: errMessage });
    logger.error(`Error during user logout: ${errMessage}`);
  }
};

export default logout;
