/***custom module */

import { logger } from "@/lib/winston";
import Config from "@/config";

/**models */

/**types */
import type { Request, Response } from "express";

const register = async (reg: Request, res: Response): Promise<void> => {
    try {
        res.status(201).json({
            message: 'New user created'
        })

    } catch (error) {
        res.status(500).json({ code: 'ServerError', message: 'Internal server error', error: error });
        logger.error(`Error during user registration: ${error}`);
    }
}

export default register;