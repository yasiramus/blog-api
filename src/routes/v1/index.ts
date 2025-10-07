import { Router } from "express";

/**
 * routes
*/
import authRoutes from '@/routes/v1/auth';

const router = Router();

/**root route */
router.get('/', (_req, res) => {
    res.status(200).json({
        message: "API is live",
        status: 'ok',
        version: '1.0.0',
        docs: 'https://docs.blog-api.com',
        timeStamp: new Date().toISOString()
    })
});

router.use('/auth', authRoutes);

export default router;
