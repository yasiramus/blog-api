/***custom module */
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { generateUsername } from "@/utilities";
import { logger } from "@/lib/winston";
import Config from "@/config";

/**models */
import Token from "@/models/token";
import User from "@/models/user";

/**types */
import type { Request, Response } from "express";
import type { IUser } from "@/models/user";

type UserData = Pick<IUser, 'email' | 'password' | 'role'>;

const register = async (req: Request, res: Response): Promise<void> => {

    const { email, password, role }: UserData = req.body;

    if (role === 'admin' && !Config.WHITELIST_ADMIN_MAIL.includes(email)) {
        res.status(403).json({ code: 'AuthorizationError', message: 'You are not allowed to register as admin' });

        logger.warn(`User with email ${email} attempted to register as admin but is not in the whitelist`);
        return;
    }

    try {
        //generate user name
        const username = await generateUsername(); logger.info(`Generated username: ${username}`);

        const newUser = await User.create({
            username, email, password, role
        })

        //generate access and refresh token for new users
        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        //store refresh token in db
        await Token.create({ token: refreshToken, userId: newUser._id });
        logger.info('Refresh token created and stored in database for user', {
            userId: newUser._id,
            token: refreshToken
        });

        //set refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: Config.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(201).json({
            message: 'New user created',
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
            accessToken
        })

        logger.info('User registered successfully', {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        },);

    } catch (error) {
        res.status(500).json({ code: 'ServerError', message: 'Internal server error' });
        logger.error(`Error during user registration: ${error instanceof Error ? error.stack : error}`);
    }
}

export default register;