/** custom modules */
import { generateAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import Config from '@/config';

/**service */
import { saveOrUpdateToken } from '@/services/tokenService';

/**models */
import User from '@/models/user';

/**types */
import type { Request, Response } from 'express';
import { IUser } from '@/models/user';

type UserData = Pick<IUser, 'email' | 'password'>;

const login = async (req: Request, res: Response): Promise<void> => {
  const { email }: UserData = req.body;

  try {
    const user = await User.findOne({ email }).select(
      'username email password role',
    );

    if (!user) {
      res.status(404).json({ code: 'NotFound', message: 'User not found' });
      return;
    }

    //generate access and refresh token for new users
    const accessToken = generateAccessToken(user._id, user.role);

    let tokenRecord = await saveOrUpdateToken(user._id, user.role);

    //set refresh token in cookie
    res.cookie('refreshToken', tokenRecord.token, {
      httpOnly: true,
      secure: Config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      message: `${user.username} logged in successfully`,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });

    logger.info('User login successfully', { user: user._id });
  } catch (error) {
    res
      .status(500)
      .json({ code: 'ServerError', message: 'Internal server error' });
    logger.error(
      `Error during user login: ${error instanceof Error ? error.stack : error}`,
    );
  }
};

export default login;
