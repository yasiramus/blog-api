/**custom module */
import Token from "@/models/token";
import { logger } from "@/lib/winston";
import { generateRefreshToken } from "@/lib/jwt";

/**types */
import { Types } from "mongoose";

const findTokenByUserId = async (userId: Types.ObjectId) => {
    return Token.findOne({ userId });
};

export const saveOrUpdateToken = async (userId: Types.ObjectId) => {
    let tokenRecord = await findTokenByUserId(userId);

    const refreshToken = generateRefreshToken(userId);

    if (!tokenRecord) {
        tokenRecord = await Token.create({ token: refreshToken, userId });
        logger.info("Refresh token created", { userId });
    } else {
        tokenRecord.token = refreshToken;
        await tokenRecord.save();
        logger.info("Refresh token updated", { userId });
    }

    return tokenRecord;
};

// export const deleteToken = async (userId: Types.ObjectId) => {
//     await Token.deleteOne({ userId });
//     logger.info("Refresh token deleted", { userId });
// };
