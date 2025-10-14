import { Router } from 'express';

/**
 * routes
 */
import authRoutes from '@/routes/v1/auth';
import userRoutes from '@/routes/v1/user';

const router = Router();

/**root route */
router.get('/', (_req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    docs: 'https://docs.blog-api.com',
    timeStamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);

router.use('/users', userRoutes);
export default router;
