import crypto from 'crypto';

/**custom module */
import User from '@/models/user';

/**generate a random username */
export const generateUsername = async (length = 8): Promise<string> => {
    let username: string = '';
    let exists = true;

    while (exists) {
        const randomBytes = crypto.randomBytes(length).toString('hex').slice(0, length);
        username = `user_${randomBytes}`;
        exists = !!(await User.exists({ username }));
    }

    return username;
};