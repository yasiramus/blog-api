import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

/**custom module */
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/lib/jwt";

/**models */
import Token from "@/models/token";

/**util */
import { cookieOptions } from "@/utilities";

/**types */
import type { Request, Response } from "express";
import { Types } from "mongoose";


const refreshToken = async (req: Request, res: Response) => {

    const tokenFromCookie = req.cookies.refreshToken as string;

    try {

        const tokenExists = await Token.exists({ token: tokenFromCookie })//NB:exist return oly the id

        if (!tokenExists) {
            res.status(401).json({
                code: 'AuthenticationError',
                message: 'Invalid refresh token'
            })
            return
        }

        //verify refresh token
        const jwtPayload = verifyRefreshToken(tokenFromCookie) as { userId: Types.ObjectId }

        const newAccessToken = generateAccessToken(jwtPayload.userId)
        const newRefreshToken = generateRefreshToken(jwtPayload.userId);

        // Improves Security
        //Update DB (invalidate old token)
        await Token.findOneAndUpdate({ userId: jwtPayload.userId }, { token: newRefreshToken });
        //Set new refresh token in cookie
        res.cookie('refreshToken', newRefreshToken, cookieOptions);

        res.status(200).json({
            newAccessToken
        })

    } catch (error) {

        if (error instanceof TokenExpiredError) {
            res.status(401).json({
                code: 'AuthenticationError',
                message: 'Refresh token expired, please login'

            })
            return
        }

        if (error instanceof JsonWebTokenError) {
            res.status(401).json({
                code: 'AuthenticationError',
                message: 'Invalid refresh token'

            })
            return
        }
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal server error',
            error: error
        })
    }
}

export default refreshToken