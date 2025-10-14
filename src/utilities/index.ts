import crypto from 'crypto';
import { CookieOptions } from 'express';

/**generate a random username */
export const generateUsername = (length = 8): string => {
  const randomBytes = crypto
    .randomBytes(length)
    .toString('hex')
    .slice(0, length);
  return `user_${randomBytes}`;
};

/**cookie option */
export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  // path: "/",
  // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};
