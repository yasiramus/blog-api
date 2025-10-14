/**custom module */
import { logger } from '@/lib/winston';

/**models */
import User from '@/models/user';

/**type */
import type { Request, Response } from 'express';

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select('-__v').lean().exec();
    if (!user) {
      res.status(404).json({ code: 'NotFound', message: 'User not found' });
      return;
    }
    logger.info('Retrieved user:', user._id);
    res.status(200).json({ data: { user } });
  } catch (error: any) {
    const errMessage =
      error instanceof Error ? error.message || error.stack : 'Unknown error';
    res.status(500).json({ code: 'ServerError', message: errMessage });
    logger.error(`Error while getting the current_user: ${errMessage}`);
  }
};

export default getCurrentUser;
