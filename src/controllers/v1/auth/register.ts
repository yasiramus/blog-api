/***custom module */

import { logger } from "@/lib/winston";

/**models */

/**types */
import type { Request, Response } from "express";

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(201).json({
            message: 'New user created'
        })

    } catch (error) {
        res.status(500).json({ code: 'ServerError', message: 'Internal server error' });
        logger.error(`Error during user registration: ${error instanceof Error ? error.stack : error}`);
    }
}

export default register;