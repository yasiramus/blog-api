/**custom module */
import Token from '@/models/token';
import { logger } from '@/lib/winston';
import { generateRefreshToken } from '@/lib/jwt';

/**types */
import { Types } from 'mongoose';
import { UserRole } from '@/models/user';

export const saveOrUpdateToken = async (
  userId: Types.ObjectId,
  role: UserRole,
) => {
  const refreshToken = generateRefreshToken(userId, role);

  try {
    const existingToken = await Token.findOne({ userId });
    const isNew = !existingToken;

    const tokenRecord = await Token.findOneAndUpdate(
      { userId },
      { token: refreshToken },
      { upsert: true, new: true },
    );

    logger.info(`Refresh token ${isNew ? 'created' : 'updated'}`, { userId });
    return tokenRecord;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error saving/updating refresh token', errMessage);
    throw error;
  }
};
