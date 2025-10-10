import jwt from 'jsonwebtoken';

/**custom module */
import Config from '@/config';

/**types*/
import { Types } from 'mongoose';

export const generateAccessToken = (userId: Types.ObjectId): string => {

    return jwt.sign({ userId }, Config.JWT_ACCESS_SECRET, {
        expiresIn: Config.ACCESS_TOKEN_EXPIRES_IN,
        subject: 'accessApi'
    })
};

export const generateRefreshToken = (userId: Types.ObjectId): string => {

    return jwt.sign({ userId }, Config.JWT_REFRESH_SECRET, {
        expiresIn: Config.REFRESH_TOKEN_EXPIRES_IN,
        subject: 'refreshToken'
    })
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, Config.JWT_ACCESS_SECRET)
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, Config.JWT_REFRESH_SECRET)
}