import crypto from 'crypto';

/**generate a random username */
export const generateUsername = (length = 8): string => {
    const randomBytes = crypto.randomBytes(length).toString('hex').slice(0, length);
    return `user_${randomBytes}`;
};